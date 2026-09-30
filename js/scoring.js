/**
 * CAREERMARG (DISHA V2) - Psychometric & Cognitive Scoring Engine
 * Includes:
 * - Multi-tier trait scoring (RIASEC, TAMANNA 7-domain, Big 5 OCEAN, Exam Resilience)
 * - Pure Vector SVG Radar Chart Generator
 * - Multi-dimensional Explainable Career Matching Engine with dynamic stage awareness
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

    const answeredList = questions.filter(q => answers && answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "");
    if (!answeredList.length) return {};

    const traitScores = {};
    const traitTotals = {};
    const traitMax = {};

    questions.forEach((q) => {
      const trait = q.traitCode;
      if (!trait) return;
      if (!traitTotals[trait]) {
        traitTotals[trait] = 0;
        traitMax[trait] = 0;
      }

      const ans = answers[q.id];
      if (q.type === "mcq_single") {
        traitMax[trait] += 100;
        if (ans === q.correctKey) {
          traitTotals[trait] += 100;
        }
      } else {
        traitMax[trait] += 5;
        if (ans) {
          traitTotals[trait] += Number(ans);
        }
      }
    });

    Object.keys(traitTotals).forEach((t) => {
      const max = traitMax[t] || 1;
      const val = traitTotals[t];
      traitScores[t] = Math.round((val / max) * 100);
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
    const tiers = ["tier1_riasec", "tier2_tamanna", "tier3_ocean", "mental_health"];

    tiers.forEach((tier) => {
      const tierQs = qList.filter((q) => q.tier === tier);
      const hasAnswers = tierQs.some((q) => answers && answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "");
      if (hasAnswers) {
        const tierScores = this.scoreTier(tier, answers, qList);
        Object.entries(tierScores).forEach(([k, v]) => {
          if (validTraitList.includes(k)) {
            traits[k] = v;
          }
        });
      }
    });

    // Extract RIASEC dominant code if RIASEC has scores
    const riasecKeys = ["R", "I", "A", "S", "E", "C"];
    const hasRiasec = riasecKeys.some((k) => traits[k] !== undefined);
    const riasecRanked = hasRiasec
      ? riasecKeys.map((k) => [k, traits[k] || 0]).sort((a, b) => b[1] - a[1])
      : [];
    const hollandCode = riasecRanked.length >= 3 ? riasecRanked.slice(0, 3).map(([k]) => k).join("") : "IES";

    return {
      traits,
      hollandCode,
      riasecRanked,
      ...traits,
    };
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

      // Smart label positioning & text-anchor to avoid clipping on canvas edges
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

  scoreRiasec(answers, questions) {
    const totals = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    (questions || []).forEach((q) => {
      const val = answers[q.id];
      if (val === undefined || val === null) return;
      const tr = q.traitCode || q.trait;
      if (tr && totals[tr] !== undefined) {
        totals[tr] += Number(val);
        counts[tr] += 1;
      }
    });

    const scores = {};
    Object.keys(totals).forEach((trait) => {
      const max = Math.max(counts[trait] * 5, 1);
      scores[trait] = Math.round((totals[trait] / max) * 100);
    });

    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return { scores, ranked, code: ranked.slice(0, 3).map(([t]) => t).join("") };
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
    general: { primary: ["it_tech", "engineering", "business_finance", "healthcare", "arts_media"], secondary: [] },
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
    ai_ml: ["ai", "artificial intelligence", "machine learning", "data", "deep learning", "neural", "analytics", "metaverse"],
    web_dev: ["software", "developer", "web", "frontend", "backend", "full stack", "coding", "programmer", "apps", "engineer", "systems"],
    robotics: ["robot", "automation", "mechatronics", "hardware", "embedded", "iot"],
    cybersecurity: ["security", "cyber", "ethical hacking", "network", "cryptography", "forensics"],
    esports_comp: ["game", "gaming", "vr", "ar", "metaverse", "virtual"],
    game_design: ["game", "vr", "ar", "3d", "level", "animator", "developer"],
    chess_strategy: ["strategy", "analyst", "architect", "consultant", "intelligence", "tactical"],
    stock_market: ["finance", "stock", "investment", "equity", "trading", "portfolio", "financial", "banker"],
    psychology: ["psychology", "counselling", "behaviour", "social", "user experience", "hr", "mentor"],
    cricket: ["sports", "coach", "fitness", "athletic"],
    football: ["sports", "athlete", "fitness"],
    badminton: ["sports", "racket", "fitness"],
    athletics_fitness: ["fitness", "trainer", "athletics", "gym"],
    music: ["audio", "music", "sound", "multimedia", "composer"],
    fashion: ["design", "fashion", "styling", "creative", "apparel"],
    arts: ["artist", "creative", "painter", "illustrator", "visual"],
  },

  matchCareers(profile, careers) {
    const riasec = (profile.riasec && profile.riasec.scores) || profile.traitScores || {};
    const aptitude = (profile.aptitude && profile.aptitude.scores) || profile.traitScores || {};
    const tags = profile.interestTags || [];
    const studentStream = profile.stream || "general";
    const archetype = profile.roleModelArchetype || "";
    const aspiration = (profile.aspiration || "").toLowerCase();

    // Check completed tiers strictly
    const completed = profile.completedTiers || [];
    const hasTamanna = completed.includes("tier2_tamanna") && Object.keys(aptitude).some(k => k.startsWith("TAMANNA_") && Number(aptitude[k]) > 0);

    const streamInfo = this._streamSectors[studentStream] || this._streamSectors.general;
    const archetypeSectors = this._archetypeSectors[archetype] || [];

    const careerList = careers || window.DISHA_CAREER_DATABASE || window.DISHA_DATA?.careers || [];

    return careerList
      .map((career) => {
        // 1. RIASEC Alignment (0 to 1)
        let interestFit = 0.55;
        if (typeof career.riasec === "string" && career.riasec.length > 0) {
          const code = career.riasec;
          const weights = [0.45, 0.35, 0.20];
          let sum = 0, totalW = 0;
          for (let i = 0; i < code.length && i < 3; i++) {
            const char = code[i];
            const userScore = riasec[char] !== undefined ? riasec[char] : 50;
            sum += (userScore / 100) * weights[i];
            totalW += weights[i];
          }
          interestFit = totalW ? sum / totalW : 0.55;
        } else if (career.riasec && typeof career.riasec === "object") {
          let sum = 0, totalW = 0;
          Object.entries(career.riasec).forEach(([trait, w]) => {
            sum += ((riasec[trait] || 50) / 100) * w;
            totalW += w;
          });
          interestFit = totalW ? sum / totalW : 0.55;
        }

        // 2. Stream & Sector Synergy Boost
        let sectorBoost = 0;
        const cSec = career.sectorId || "";
        if (streamInfo.primary && streamInfo.primary.includes(cSec)) {
          sectorBoost += 0.12;
        } else if (streamInfo.secondary && streamInfo.secondary.includes(cSec)) {
          sectorBoost += 0.06;
        } else if (studentStream !== "general") {
          sectorBoost -= 0.08; // Penalty for unrelated stream sector
        }

        // 3. Role Model Archetype Synergy
        let archetypeBoost = 0;
        if (archetypeSectors.includes(cSec)) {
          archetypeBoost += 0.06;
        }

        // 4. Interest Tags Boost
        let tagBoost = 0;
        const careerText = ((career.title || "") + " " + (career.traits || "") + " " + (career.sector || "") + " " + (career.educationPath || "")).toLowerCase();
        let matchedTagLabels = [];
        tags.forEach((t) => {
          const kws = this._tagKeywords[t] || [t.toLowerCase().replace(/_/g, " ")];
          const hit = kws.some((kw) => careerText.includes(kw));
          if (hit) {
            tagBoost += 0.04;
            matchedTagLabels.push(t);
          }
        });
        tagBoost = Math.min(0.16, tagBoost);

        // 5. Aspiration Boost
        let aspirationBoost = 0;
        if (aspiration) {
          const titleWords = (career.title || "").toLowerCase().split(/\s+/);
          const hits = titleWords.filter((w) => w.length > 3 && aspiration.includes(w)).length;
          if (hits >= 2) aspirationBoost += 0.08;
          else if (hits === 1) aspirationBoost += 0.04;
        }

        // 6. Optional TAMANNA Aptitude Fit (only if actually taken)
        let aptFit = 0;
        if (hasTamanna) {
          let aptScore = 0, aptWeight = 0;
          if (career.aptitude && typeof career.aptitude === "object") {
            Object.entries(career.aptitude).forEach(([domain, w]) => {
              const directVal = aptitude[domain] || aptitude[`TAMANNA_${domain.toUpperCase()}`] || 50;
              aptScore += (directVal / 100) * w;
              aptWeight += w;
            });
          }
          aptFit = aptWeight ? aptScore / aptWeight : 0.70;
        }

        // 7. Dynamic Composite Fit Calculation
        let fit;
        if (hasTamanna) {
          fit = interestFit * 0.55 + aptFit * 0.25 + sectorBoost + archetypeBoost + tagBoost + aspirationBoost;
        } else {
          // When only Tier 1 is completed: weight RIASEC interest fit heavily (80%) + profile boosts
          fit = interestFit * 0.80 + sectorBoost + archetypeBoost + tagBoost + aspirationBoost + 0.05;
        }

        fit = Math.max(0.40, Math.min(0.98, fit));
        const pct = Math.round(fit * 100);

        // Explainable Reasons
        const reasons = [];
        let cleanReasonText = "High vocational affinity with your personality profile.";
        if (career.traits) {
          const rawItems = career.traits
            .replace(/\b([a-zA-Z0-9]+)\s*•\s*([a-zA-Z0-9]+)\b/g, "$1-$2")
            .split(/[\r\n]+|•|\.n|n\s*•/)
            .map((s) => s.trim().replace(/^n\s*/, ""))
            .filter((s) => s.length > 8);
          if (rawItems.length > 0) {
            cleanReasonText = rawItems[0].replace(/n$/, "").trim();
            if (!cleanReasonText.endsWith(".")) cleanReasonText += ".";
          }
        }

        if (typeof career.riasec === "string" && career.riasec.length > 0) {
          reasons.push({
            type: "interest",
            title: `Holland Code Fit: ${career.riasec.split("").join(" + ")}`,
            text: cleanReasonText,
          });
        } else if (career.riasec && typeof career.riasec === "object") {
          const rKeys = Object.keys(career.riasec).slice(0, 3);
          reasons.push({
            type: "interest",
            title: `Holland Code Fit: ${rKeys.join(" + ")}`,
            text: cleanReasonText,
          });
        }
        if (streamInfo.primary && streamInfo.primary.includes(cSec)) {
          reasons.push({
            type: "stream",
            title: "Stream Synergy",
            text: `Directly aligns with your ${studentStream} curriculum and technical career pathway.`,
          });
        }
        if (matchedTagLabels.length > 0) {
          reasons.push({
            type: "tags",
            title: "Interest Tag Match",
            text: `Matches your passions: ${matchedTagLabels.slice(0, 3).join(", ")}`,
          });
        }

        return { ...career, fit: pct, reasons };
      })
      .sort((a, b) => b.fit - a.fit);
  },
};

