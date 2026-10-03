/**
 * CAREERMARG - Psychometric & Cognitive Scoring Engine
 * Conforms to:
 * - Group I (Classes 6–8): Foundation Stage - Holland RIASEC Interest Battery
 * - Group II (Classes 9–10): Exploration Stage - Holland RIASEC + NCERT TAMANNA 7-Domain Aptitude
 * - Group III (Classes 11–12 & Beyond): Decision Stage - RIASEC + TAMANNA + Big Five (OCEAN) Personality
 *
 * Features:
 * - Multi-tier trait scoring (RIASEC, TAMANNA 7-domain, Big 5 OCEAN, Exam Resilience)
 * - Pure Vector SVG Radar Chart Generator
 * - Transparent, Explainable Career Matching Engine with mathematical factor breakdown
 * - Stream & Subject Recommendation Engine (PCM, PCB, Commerce w/ Math, Commerce w/o Math, Humanities)
 */

window.MoineeScore = {
  band(pct) {
    if (pct >= 75) return { key: "high", en: "Superior / High", hi: "उच्च / उत्कृष्ट", color: "#10b981" };
    if (pct >= 45) return { key: "moderate", en: "Moderate / Solid", hi: "मध्यम / संतुलित", color: "#f59e0b" };
    return { key: "emerging", en: "Developing / Emerging", hi: "विकासशील", color: "#3b82f6" };
  },

  scoreTier(tierId, answers, allQuestions) {
    const questions = (allQuestions || window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === tierId);
    if (!questions.length) return {};

    const answeredList = questions.filter(
      (q) => answers && answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "" && !Number.isNaN(answers[q.id])
    );
    if (!answeredList.length) return {};

    const traitScores = {};
    const traitTotals = {};
    const traitMax = {};

    questions.forEach((q) => {
      const trait = q.traitCode;
      if (!trait) return;
      if (traitTotals[trait] === undefined) {
        traitTotals[trait] = 0;
        traitMax[trait] = 0;
      }

      const ans = answers[q.id];
      if (ans === undefined || ans === null || ans === "" || Number.isNaN(ans)) return;

      if (q.type === "mcq_single" || q.correctKey) {
        traitMax[trait] += 100;
        if (ans === q.correctKey) {
          traitTotals[trait] += 100;
        }
      } else if (q.type === "binary_choice" || (q.options && q.options.length === 2)) {
        traitMax[trait] += 1;
        if (ans === "like" || ans === "yes" || ans === "1" || ans === 1 || ans === true) {
          traitTotals[trait] += 1;
        }
      } else {
        // Likert 1-5 scale (Calibrated POMP Psychometric Standard: 1=0%, 2=25%, 3=50%, 4=75%, 5=100%)
        traitMax[trait] += 4;
        let num = Number(ans);
        if (isNaN(num)) {
          const letterMap = { a: 1, b: 2, c: 3, d: 4, e: 5 };
          num = letterMap[String(ans).toLowerCase()] || 3;
        }
        traitTotals[trait] += Math.max(0, Math.min(4, num - 1));
      }
    });

    Object.keys(traitTotals).forEach((t) => {
      const max = traitMax[t];
      if (max > 0) {
        traitScores[t] = Math.round((traitTotals[t] / max) * 100);
      } else {
        traitScores[t] = 0;
      }
    });

    return traitScores;
  },

  scoreAllTiers(answers, allQuestions) {
    const qList = allQuestions || window.DISHA_ALL_QUESTIONS || [];
    const validTraitList = [
      "R", "I", "A", "S", "E", "C",
      "TAMANNA_LA", "TAMANNA_VA", "TAMANNA_NA", "TAMANNA_SA", "TAMANNA_PA", "TAMANNA_MA", "TAMANNA_AR",
      "OCEAN_O", "OCEAN_C", "OCEAN_E", "OCEAN_A", "OCEAN_N",
      "ENABLER_ANXIETY", "ENABLER_SELF_EFFICACY", "ENABLER_RESILIENCE"
    ];

    const traits = {};
    const tiers = ["tier1_riasec", "tier1_quick_riasec", "tier2_tamanna", "tier3_ocean", "mental_health"];

    tiers.forEach((tier) => {
      const tierQs = qList.filter((q) => q.tier === tier);
      const hasAnswers = tierQs.some(
        (q) => answers && answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== ""
      );
      if (hasAnswers) {
        const tierScores = this.scoreTier(tier, answers, qList);
        Object.entries(tierScores).forEach(([k, v]) => {
          if (validTraitList.includes(k)) {
            traits[k] = v;
          }
        });
      }
    });

    // Extract RIASEC dominant code
    const riasecKeys = ["R", "I", "A", "S", "E", "C"];
    const hasRiasec = riasecKeys.some((k) => traits[k] !== undefined);
    const riasecRanked = hasRiasec
      ? riasecKeys.map((k) => [k, traits[k] || 0]).sort((a, b) => b[1] - a[1])
      : [];
    const hollandCode = riasecRanked.length >= 3 ? riasecRanked.slice(0, 3).map(([k]) => k).join("") : "IRC";

    return {
      traits,
      hollandCode,
      riasecRanked,
      ...traits,
    };
  },

  // Stream Recommendation based on TAMANNA & RIASEC
  recommendStreams(traits) {
    const na = traits.TAMANNA_NA || 50;
    const sa = traits.TAMANNA_SA || 50;
    const ma = traits.TAMANNA_MA || 50;
    const va = traits.TAMANNA_VA || 50;
    const la = traits.TAMANNA_LA || 50;
    const ar = traits.TAMANNA_AR || 50;
    const pa = traits.TAMANNA_PA || 50;

    const r = traits.R || 50;
    const i = traits.I || 50;
    const e = traits.E || 50;
    const c = traits.C || 50;
    const a = traits.A || 50;
    const s = traits.S || 50;

    const streams = [
      {
        id: "science_pcm",
        title: "Science (PCM / PCMB)",
        titleHi: "विज्ञान (गणित / भौतिकी / रसायन)",
        icon: "🔬",
        color: "#3b82f6",
        score: Math.round(na * 0.35 + sa * 0.25 + ma * 0.20 + (r * 0.10 + i * 0.10)),
        fields: ["Engineering", "Robotics", "Architecture", "Data Science", "Aviation"],
        fieldsHi: ["इंजीनियरिंग", "रोबोटिक्स", "आर्किटेक्चर", "डेटा साइंस", "विमानन"],
        reasonEn: "High numerical, spatial, and mechanical aptitudes indicate strong potential in engineering and technical sciences.",
        reasonHi: "उच्च संख्यात्मक, स्थानिक और यांत्रिक क्षमताएं इंजीनियरिंग और तकनीकी क्षेत्रों के लिए उपयुक्त हैं।"
      },
      {
        id: "science_pcb",
        title: "Science (PCB / Healthcare)",
        titleHi: "विज्ञान (जीव विज्ञान / चिकित्सा)",
        icon: "🩺",
        color: "#10b981",
        score: Math.round(i * 0.35 + s * 0.25 + ar * 0.20 + na * 0.20),
        fields: ["Medicine (MBBS)", "Biotechnology", "Psychology", "Genetics", "Pharmacy"],
        fieldsHi: ["चिकित्सा (एमबीबीएस)", "बायोटेक्नोलॉजी", "मनोविज्ञान", "आनुवंशिकी", "फार्मेसी"],
        reasonEn: "Strong investigative inquiry combined with social empathy aligns with medical and life sciences.",
        reasonHi: "खोजी स्वभाव और सामाजिक सेवा भावना चिकित्सा एवं जीवन विज्ञान के लिए आदर्श है।"
      },
      {
        id: "commerce_math",
        title: "Commerce with Mathematics",
        titleHi: "वाणिज्य (गणित सहित)",
        icon: "📈",
        color: "#f59e0b",
        score: Math.round(na * 0.35 + pa * 0.25 + e * 0.20 + c * 0.20),
        fields: ["Chartered Accountancy (CA)", "Investment Banking", "Actuarial Science", "Economics", "Fintech"],
        fieldsHi: ["सीए (चार्टर्ड अकाउंटेंसी)", "इन्वेस्टमेंट बैंकिंग", "एक्चुरियल साइंस", "अर्थशास्त्र", "फिनटेक"],
        reasonEn: "Excellent quantitative precision and conventional accuracy suit high-finance and actuarial paths.",
        reasonHi: "उत्कृष्ट गणितीय सटीकता और संगठनात्मक क्षमताएं उच्च वित्त एवं बैंकिंग के अनुकूल हैं।"
      },
      {
        id: "commerce_general",
        title: "Commerce & Business Management",
        titleHi: "वाणिज्य एवं व्यवसाय प्रबंधन",
        icon: "💼",
        color: "#8b5cf6",
        score: Math.round(e * 0.35 + c * 0.25 + va * 0.20 + pa * 0.20),
        fields: ["Business Administration (BBA)", "Marketing", "International Trade", "Entrepreneurship"],
        fieldsHi: ["बिजनेस एडमिनिस्ट्रेशन (बीबीए)", "मार्केटिंग", "अंतरराष्ट्रीय व्यापार", "स्टार्टअप / उद्यमिता"],
        reasonEn: "High enterprising drive and verbal clarity empower leadership and corporate management.",
        reasonHi: "उद्यमी नेतृत्व और मौखिक संवाद क्षमताएं कॉर्पोरेट प्रबंधन के लिए उपयुक्त हैं।"
      },
      {
        id: "humanities",
        title: "Humanities, Law & Liberal Arts",
        titleHi: "मानविकी, कानून एवं कला संकाय",
        icon: "⚖️",
        color: "#ec4899",
        score: Math.round(va * 0.30 + la * 0.25 + ar * 0.25 + (a * 0.10 + s * 0.10)),
        fields: ["Law (LLB)", "Civil Services (UPSC)", "Psychology", "Journalism", "Public Policy", "Design"],
        fieldsHi: ["कानून (एलएलबी)", "सिविल सेवा (यूपीएससी)", "मनोविज्ञान", "पत्रकारिता", "पब्लिक पॉलिसी", "डिजाइन"],
        reasonEn: "Superb linguistic mastery, verbal reasoning, and abstract thinking excel in law, civil services, and media.",
        reasonHi: "उत्कृष्ट भाषाई कौशल, अमूर्त तार्किकता और सामाजिक संवेदनशीलता कानून व लोक सेवा के लिए सर्वोत्तम हैं।"
      }
    ];

    return streams.sort((a, b) => b.score - a.score);
  },

  // Pure Vector SVG Radar Chart Generator
  generateRadarSvg(labels, values, options = {}) {
    const width = options.width || 380;
    const height = options.height || 320;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = options.radius || 80;
    const numVars = labels.length;
    const angleStep = (Math.PI * 2) / numVars;
    const strokeColor = options.strokeColor || "var(--vermilion, #c9432a)";
    const fillColor = options.fillColor || "rgba(201, 67, 42, 0.22)";
    const gridColor = options.gridColor || "var(--route, rgba(29, 39, 51, 0.22))";
    const textColor = options.textColor || "var(--ink, #1d2733)";

    // Concentric Web Grid Polygons
    let gridPolygons = "";
    [0.25, 0.5, 0.75, 1.0].forEach((level) => {
      const pts = [];
      for (let i = 0; i < numVars; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const r = radius * level;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      gridPolygons += `<polygon points="${pts.join(" ")}" fill="none" stroke="${gridColor}" stroke-width="1" stroke-dasharray="${level < 1 ? "2,3" : "none"}"/>`;
    });

    // Spoke Lines
    let spokeLines = "";
    for (let i = 0; i < numVars; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      spokeLines += `<line x1="${centerX}" y1="${centerY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${gridColor}" stroke-width="1"/>`;
    }

    // Data polygon and points
    const dataPts = [];
    let vertexCircles = "";
    let labelElements = "";

    for (let i = 0; i < numVars; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const val = Math.max(10, Math.min(100, values[i] || 0));
      const valPercent = val / 100;
      const r = radius * valPercent;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      dataPts.push(`${x.toFixed(1)},${y.toFixed(1)}`);

      vertexCircles += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${strokeColor}" stroke="var(--card, #fff)" stroke-width="1.5"/>`;

      const cosVal = Math.cos(angle);
      const sinVal = Math.sin(angle);
      const labelDist = radius + 22;
      const lx = centerX + labelDist * cosVal;
      const ly = centerY + labelDist * sinVal;

      let anchor = "middle";
      if (cosVal > 0.3) anchor = "start";
      else if (cosVal < -0.3) anchor = "end";

      const labelText = labels[i];
      const valText = `${Math.round(values[i] || 0)}%`;

      labelElements += `
        <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="central" fill="${textColor}" font-size="10" font-weight="700" font-family="var(--font, sans-serif)">
          ${labelText} <tspan font-weight="800" fill="${strokeColor}">(${valText})</tspan>
        </text>
      `;
    }

    return `
      <svg class="radar-svg" width="100%" height="auto" viewBox="0 0 ${width} ${height}" style="max-width:380px;width:100%;display:block;margin:0 auto;overflow:visible;" role="img" aria-label="Vector Radar Chart">
        <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="rgba(255,255,255,0.03)"/>
        ${gridPolygons}
        ${spokeLines}
        <polygon points="${dataPts.join(" ")}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
        ${vertexCircles}
        ${labelElements}
      </svg>
    `;
  },

  // Stream-to-Sector Synergy Map
  _streamSectors: {
    eng_tech: { primary: ["it_tech", "engineering"], secondary: ["technical_skills", "research"] },
    science_pcm: { primary: ["engineering", "it_tech", "research"], secondary: ["agriculture", "technical_skills"] },
    science_pcb: { primary: ["healthcare", "research", "agriculture"], secondary: ["education"] },
    science_pcmb: { primary: ["engineering", "healthcare", "it_tech", "research"], secondary: ["agriculture"] },
    commerce: { primary: ["business_finance", "management"], secondary: ["logistics"] },
    management: { primary: ["management", "business_finance"], secondary: ["logistics"] },
    humanities: { primary: ["arts_media", "education", "public_policy", "government"], secondary: ["management"] },
    design_media: { primary: ["arts_media", "it_tech"], secondary: ["education"] },
    law: { primary: ["public_policy", "government"], secondary: ["management"] },
    med_health: { primary: ["healthcare", "research"], secondary: ["education"] },
    general: { primary: ["it_tech", "engineering", "business_finance", "healthcare", "arts_media", "government"], secondary: [] },
  },

  _archetypeSectors: {
    tech: ["it_tech", "engineering"],
    entrepreneur: ["business_finance", "management", "it_tech"],
    healer: ["healthcare", "research"],
    scientist: ["research", "engineering", "healthcare"],
    artist: ["arts_media"],
    creator: ["arts_media", "it_tech"],
    civil_service: ["government", "public_policy"],
    athlete: ["sports", "healthcare"],
    gamer: ["it_tech", "arts_media"],
  },

  _tagKeywords: {
    ai_ml: ["ai", "artificial intelligence", "machine learning", "data", "deep learning", "neural", "analytics"],
    web_dev: ["software", "developer", "web", "frontend", "backend", "full stack", "coding", "programmer", "apps", "engineer"],
    robotics: ["robot", "automation", "mechatronics", "hardware", "embedded", "iot"],
    cybersecurity: ["security", "cyber", "ethical hacking", "network", "cryptography", "forensics"],
    esports_comp: ["game", "gaming", "vr", "ar", "metaverse", "virtual"],
    game_design: ["game", "vr", "ar", "3d", "level", "animator", "developer"],
    chess_strategy: ["strategy", "analyst", "architect", "consultant", "intelligence", "tactical"],
    stock_market: ["finance", "stock", "investment", "equity", "trading", "portfolio", "banker"],
    psychology: ["psychology", "counselling", "behaviour", "social", "user experience", "hr", "mentor"],
    cricket: ["sports", "coach", "fitness", "athletic"],
    football: ["sports", "athlete", "fitness"],
    badminton: ["sports", "racket", "fitness"],
    athletics_fitness: ["fitness", "trainer", "athletics", "gym"],
    music: ["audio", "music", "sound", "multimedia", "composer"],
    fashion: ["design", "fashion", "styling", "creative", "apparel"],
    arts: ["artist", "creative", "painter", "illustrator", "visual"],
  },

  /**
   * Transparent Multi-Factor Career Matching Algorithm
   * Integrates:
   * 1. RIASEC Holland Interest Code Congruence
   * 2. NCERT TAMANNA Cognitive Aptitude Alignment
   * 3. Big Five (OCEAN) Personality Trait Fit
   * 4. Academic Stream / Subject Synergy
   */
  matchCareers(profile, careers) {
    const traits = profile.traitScores || {};
    const tags = profile.interestTags || [];
    const studentStream = profile.stream || "general";
    const archetype = profile.roleModelArchetype || "";
    const aspiration = (profile.aspiration || "").toLowerCase();

    // Check which assessments have been completed
    const completed = profile.completedTiers || [];
    const hasRiasec = completed.includes("tier1_riasec") || ["R", "I", "A", "S", "E", "C"].some(k => traits[k] !== undefined);
    const hasTamanna = completed.includes("tier2_tamanna") || Object.keys(traits).some(k => k.startsWith("TAMANNA_") && Number(traits[k]) > 0);
    const hasOcean = completed.includes("tier3_ocean") || Object.keys(traits).some(k => k.startsWith("OCEAN_") && Number(traits[k]) > 0);

    const streamInfo = this._streamSectors[studentStream] || this._streamSectors.general;
    const archetypeSectors = this._archetypeSectors[archetype] || [];
    const careerList = careers || window.DISHA_CAREER_DATABASE || window.DISHA_DATA?.careers || [];

    return careerList
      .map((career) => {
        const cSec = career.sectorId || career.sector || "";

        // 1. RIASEC Alignment (0 to 100)
        let riasecPct = 55;
        let riasecReason = "Vocational interest alignment with your profile.";
        if (typeof career.riasec === "string" && career.riasec.length > 0) {
          const code = career.riasec;
          const weights = [0.45, 0.35, 0.20];
          let sum = 0, totalW = 0;
          for (let i = 0; i < code.length && i < 3; i++) {
            const char = code[i];
            const userScore = traits[char] !== undefined ? traits[char] : 50;
            sum += userScore * weights[i];
            totalW += weights[i];
          }
          riasecPct = Math.round(totalW ? sum / totalW : 55);
          const firstChar = code[0];
          const secondChar = code[1] || "";
          riasecReason = `High alignment with your Holland Code traits: ${firstChar} (${traits[firstChar] || 50}%)${secondChar ? ` & ${secondChar} (${traits[secondChar] || 50}%)` : ""}.`;
        } else if (career.riasec && typeof career.riasec === "object") {
          let sum = 0, totalW = 0;
          Object.entries(career.riasec).forEach(([t, w]) => {
            sum += (traits[t] || 50) * w;
            totalW += w;
          });
          riasecPct = Math.round(totalW ? sum / totalW : 55);
        }

        // 2. TAMANNA Cognitive Aptitude Fit (0 to 100)
        let aptitudePct = 60;
        let aptitudeReason = "General cognitive aptitude benchmark satisfied.";
        if (hasTamanna) {
          let aptScore = 0, aptWeight = 0;
          const matchedAptitudes = [];
          if (career.aptitude && typeof career.aptitude === "object" && Object.keys(career.aptitude).length > 0) {
            Object.entries(career.aptitude).forEach(([domain, w]) => {
              const directVal = traits[domain] || traits[`TAMANNA_${domain.toUpperCase()}`] || traits[`TAMANNA_${domain}`] || 50;
              aptScore += directVal * w;
              aptWeight += w;
              matchedAptitudes.push(`${domain.toUpperCase()}: ${directVal}%`);
            });
            aptitudePct = Math.round(aptWeight ? aptScore / aptWeight : 60);
          } else {
            // General domain mapping based on sector
            if (cSec === "it_tech" || cSec === "engineering") {
              aptitudePct = Math.round(((traits.TAMANNA_NA || 50) * 0.4 + (traits.TAMANNA_SA || 50) * 0.3 + (traits.TAMANNA_MA || 50) * 0.3));
            } else if (cSec === "healthcare" || cSec === "research") {
              aptitudePct = Math.round(((traits.TAMANNA_AR || 50) * 0.4 + (traits.TAMANNA_NA || 50) * 0.3 + (traits.TAMANNA_VA || 50) * 0.3));
            } else if (cSec === "business_finance" || cSec === "management") {
              aptitudePct = Math.round(((traits.TAMANNA_NA || 50) * 0.4 + (traits.TAMANNA_PA || 50) * 0.3 + (traits.TAMANNA_VA || 50) * 0.3));
            } else {
              aptitudePct = Math.round(((traits.TAMANNA_VA || 50) * 0.4 + (traits.TAMANNA_LA || 50) * 0.3 + (traits.TAMANNA_AR || 50) * 0.3));
            }
          }
          if (matchedAptitudes.length > 0) {
            aptitudeReason = `Cognitive domain strengths: ${matchedAptitudes.slice(0, 2).join(", ")}.`;
          }
        }

        // 3. Big Five (OCEAN) Personality Fit (0 to 100)
        let oceanPct = 65;
        let oceanReason = "Balanced personality dynamics suitable for professional practice.";
        if (hasOcean) {
          const o = traits.OCEAN_O || 50;
          const c = traits.OCEAN_C || 50;
          const e = traits.OCEAN_E || 50;
          const a = traits.OCEAN_A || 50;
          const n = traits.OCEAN_N || 50;

          if (cSec === "it_tech" || cSec === "engineering" || cSec === "research") {
            oceanPct = Math.round(c * 0.4 + o * 0.35 + n * 0.25);
            oceanReason = `Disciplined Conscientiousness (${c}%) and Openness (${o}%) suit complex problem solving.`;
          } else if (cSec === "business_finance" || cSec === "management") {
            oceanPct = Math.round(e * 0.4 + c * 0.35 + o * 0.25);
            oceanReason = `High Extraversion (${e}%) and Conscientiousness (${c}%) support strategic leadership.`;
          } else if (cSec === "healthcare" || cSec === "education") {
            oceanPct = Math.round(a * 0.4 + c * 0.35 + n * 0.25);
            oceanReason = `Strong Agreeableness (${a}%) and Empathy support patient and student care.`;
          } else {
            oceanPct = Math.round(o * 0.4 + e * 0.3 + a * 0.3);
            oceanReason = `Creative Openness (${o}%) and Expressiveness suit media and communication.`;
          }
        }

        // 4. Stream & Sector Synergy (0 to 100)
        let streamPct = 50;
        let streamReason = "Open career pathway accessible across academic streams.";
        if (streamInfo.primary && streamInfo.primary.includes(cSec)) {
          streamPct = 95;
          streamReason = `Directly aligned with your ${studentStream.replace(/_/g, " ").toUpperCase()} curriculum.`;
        } else if (streamInfo.secondary && streamInfo.secondary.includes(cSec)) {
          streamPct = 75;
          streamReason = `Cross-disciplinary progression supported from ${studentStream.replace(/_/g, " ")}.`;
        } else if (studentStream === "general") {
          streamPct = 70;
          streamReason = "Broad foundational curriculum allows exploration.";
        } else {
          streamPct = 40;
          streamReason = "May require supplementary elective bridge courses.";
        }

        // 5. Interest Tags & Archetype Boosts (0 to 10)
        let tagBoost = 0;
        const careerText = ((career.title || "") + " " + (career.traits || "") + " " + (career.sector || "") + " " + (career.educationPath || "")).toLowerCase();
        let matchedTagLabels = [];
        tags.forEach((t) => {
          const kws = this._tagKeywords[t] || [t.toLowerCase().replace(/_/g, " ")];
          if (kws.some((kw) => careerText.includes(kw))) {
            tagBoost += 3;
            matchedTagLabels.push(t.replace(/_/g, " "));
          }
        });
        tagBoost = Math.min(10, tagBoost);

        let archetypeBoost = archetypeSectors.includes(cSec) ? 5 : 0;

        // 6. Dynamic Composite Fit & Weighting Formula
        let fit = 50;
        let breakdown = {};

        if (hasTamanna && hasOcean) {
          // Group 3: 3-Pronged Comprehensive Model
          // RIASEC 35%, TAMANNA 25%, OCEAN 25%, Stream 15%
          fit = (riasecPct * 0.35) + (aptitudePct * 0.25) + (oceanPct * 0.25) + (streamPct * 0.15) + tagBoost + archetypeBoost;
          breakdown = {
            riasecPct,
            aptitudePct,
            oceanPct,
            streamPct,
            riasecWeight: "35%",
            aptitudeWeight: "25%",
            oceanWeight: "25%",
            streamWeight: "15%",
            formula: "35% RIASEC + 25% Aptitude + 25% OCEAN + 15% Stream"
          };
        } else if (hasTamanna) {
          // Group 2: Interest + Aptitude
          // RIASEC 50%, TAMANNA 35%, Stream 15%
          fit = (riasecPct * 0.50) + (aptitudePct * 0.35) + (streamPct * 0.15) + tagBoost + archetypeBoost;
          breakdown = {
            riasecPct,
            aptitudePct,
            oceanPct: null,
            streamPct,
            riasecWeight: "50%",
            aptitudeWeight: "35%",
            oceanWeight: "0%",
            streamWeight: "15%",
            formula: "50% RIASEC + 35% Aptitude + 15% Stream"
          };
        } else {
          // Group 1: Foundation RIASEC Interest
          // RIASEC 70%, Stream 15%, Passion/Tags 15%
          fit = (riasecPct * 0.70) + (streamPct * 0.15) + (tagBoost * 1.5) + (archetypeBoost * 1.5) + 5;
          breakdown = {
            riasecPct,
            aptitudePct: null,
            oceanPct: null,
            streamPct,
            riasecWeight: "70%",
            aptitudeWeight: "0%",
            oceanWeight: "0%",
            streamWeight: "15%",
            formula: "70% Holland RIASEC + 15% Stream + 15% Personal Passions"
          };
        }

        fit = Math.max(35, Math.min(99, Math.round(fit)));
        breakdown.overallPct = fit;

        // Structured Explainable Reasons
        const reasons = [
          {
            type: "interest",
            title: `Holland Code Fit (${riasecPct}%)`,
            text: riasecReason,
          }
        ];

        if (hasTamanna) {
          reasons.push({
            type: "aptitude",
            title: `Cognitive Aptitude (${aptitudePct}%)`,
            text: aptitudeReason,
          });
        }

        if (hasOcean) {
          reasons.push({
            type: "personality",
            title: `Personality Dynamics (${oceanPct}%)`,
            text: oceanReason,
          });
        }

        reasons.push({
          type: "stream",
          title: `Academic Synergy (${streamPct}%)`,
          text: streamReason,
        });

        if (matchedTagLabels.length > 0) {
          reasons.push({
            type: "tags",
            title: "Passions & Interests",
            text: `Matches your declared hobbies: ${matchedTagLabels.slice(0, 3).join(", ")}.`,
          });
        }

        return {
          ...career,
          fit,
          matchBreakdown: breakdown,
          reasons
        };
      })
      .sort((a, b) => b.fit - a.fit);
  },
};
