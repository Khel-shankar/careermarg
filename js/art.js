/* ==========================================================================
   CareerMarg · Artwork kit  ("Journey Map" style)
   All illustrations are inline SVG so the app stays a static folder:
   no image files to host, they scale to any screen and follow the palette.
   ========================================================================== */
window.Art = (() => {
  const INK = "#1d2733";
  const CARD = "#fcf7ea";
  const VERM = "#c9432a";
  const VERM_D = "#9c3018";
  const TEAL = "#1f6f66";
  const TEAL_S = "#cfe6de";
  const GOLD = "#eaa42a";
  const GOLD_S = "#f8e3ae";
  const INDIGO = "#34508a";
  const INDIGO_S = "#d7e0f2";
  const PAPER2 = "#e9dcbc";
  const WOOD = "#8a6a3a";

  const S = `stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
  const S1 = `stroke="${INK}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"`;

  /* ---------- tiny shape helpers ---------- */
  const heart = (x, y, k, fill = VERM) =>
    `<path transform="translate(${x} ${y}) scale(${k})" d="M12 21s-7.5-4.6-9.5-9.2C1 8 3.5 4.5 7 4.5c2 0 3.7 1.1 5 3 1.3-1.9 3-3 5-3 3.5 0 6 3.5 4.5 7.3C19.5 16.4 12 21 12 21z" fill="${fill}" ${S1}/>`;

  // plus sign centred on (x,y), arm half-length s
  const plus = (x, y, s, fill = "#fff") => {
    const t = s * 0.66;
    const a = s - t / 2;
    return `<path d="M${x - t / 2} ${y - s} h${t} v${a} h${a} v${t} h${-a} v${a} h${-t} v${-a} h${-a} v${-t} h${a}z" fill="${fill}"/>`;
  };

  const star4 = (x, y, r, fill) =>
    `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z" fill="${fill}"/>`;

  const star5 = (x, y, r, fill) => {
    let d = "";
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 ? r * 0.45 : r;
      const a = (Math.PI / 5) * i - Math.PI / 2;
      d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1);
    }
    return `<path d="${d}Z" fill="${fill}" ${S1}/>`;
  };

  const gear = (x, y, r, fill = GOLD) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${INK}" stroke-width="${(r * 0.55).toFixed(1)}" stroke-dasharray="${((2 * Math.PI * r) / 16).toFixed(1)} ${((2 * Math.PI * r) / 16).toFixed(1)}"/>
     <circle cx="${x}" cy="${y}" r="${(r * 0.78).toFixed(1)}" fill="${fill}" ${S1}/>
     <circle cx="${x}" cy="${y}" r="${(r * 0.28).toFixed(1)}" fill="${CARD}" ${S1}/>`;

  /* ==========================================================================
     CAREER SCENES  (320 x 130 canvas, one bespoke scene per career)
     ========================================================================== */
  const base = (sky, far, near, sunX = 262) => `
    <rect width="320" height="130" fill="${sky}"/>
    <circle cx="${sunX}" cy="30" r="15" fill="${GOLD}" ${S1}/>
    <circle cx="${sunX}" cy="30" r="22" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="2 5" stroke-linecap="round"/>
    <path d="M0 84 Q52 56 108 80 T214 74 T320 70 V130 H0Z" fill="${far}" ${S1}/>
    <path d="M0 108 Q84 86 168 104 T320 98 V130 H0Z" fill="${near}" ${S}/>`;

  const SCENES = {
    primary_teacher: () => `
      ${base(GOLD_S, TEAL_S, "#9ccbb8")}
      <rect x="196" y="58" width="76" height="44" fill="${CARD}" ${S}/>
      <polygon points="188,60 234,34 280,60" fill="${VERM}" ${S}/>
      <rect x="226" y="78" width="16" height="24" fill="${INDIGO}" ${S1}/>
      <rect x="204" y="68" width="12" height="12" fill="${GOLD_S}" ${S1}/>
      <rect x="252" y="68" width="12" height="12" fill="${GOLD_S}" ${S1}/>
      <line x1="234" y1="34" x2="234" y2="16" ${S}/>
      <polygon points="234,16 254,22 234,28" fill="${TEAL}" ${S1}/>
      <line x1="50" y1="92" x2="42" y2="114" ${S}/><line x1="106" y1="92" x2="114" y2="114" ${S}/>
      <rect x="34" y="40" width="88" height="54" rx="4" fill="#24364a" ${S}/>
      <text x="78" y="76" text-anchor="middle" font-family="Kalam, cursive" font-weight="700" font-size="26" fill="${CARD}">ABC</text>
      <path d="M46 86 H72" stroke="${CARD}" stroke-width="2" stroke-dasharray="3 4" stroke-linecap="round"/>
      <rect x="150" y="84" width="5" height="20" fill="${WOOD}" ${S1}/>
      <circle cx="152" cy="76" r="15" fill="#7fb8a4" ${S1}/>`,

    social_worker: () => `
      ${base("#f7dccf", TEAL_S, "#a7cfae")}
      <path d="M104 130 Q150 108 195 102" fill="none" stroke="${CARD}" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 11"/>
      <rect x="150" y="60" width="90" height="42" fill="${CARD}" ${S}/>
      <polygon points="142,62 195,32 248,62" fill="${TEAL}" ${S}/>
      <rect x="186" y="78" width="18" height="24" fill="${INDIGO}" ${S1}/>
      <rect x="160" y="70" width="14" height="12" fill="${GOLD_S}" ${S1}/>
      <rect x="216" y="70" width="14" height="12" fill="${GOLD_S}" ${S1}/>
      <circle cx="195" cy="51" r="10" fill="${CARD}" ${S1}/>${plus(195, 51, 6.5, VERM)}
      <path d="M66 80 v-7 a4 4 0 0 1 4 -4 h8 a4 4 0 0 1 4 4 v7" fill="none" ${S}/>
      <rect x="56" y="80" width="36" height="24" rx="5" fill="${VERM}" ${S}/>${plus(74, 92, 7)}
      ${heart(96, 20, 1.1)}${heart(122, 12, 0.7, GOLD)}${heart(70, 34, 0.6, TEAL)}`,

    data_analyst: () => `
      ${base(INDIGO_S, "#c3d0ec", "#9db4dd", 286)}
      <rect x="34" y="24" width="150" height="80" rx="6" fill="${CARD}" ${S}/>
      <line x1="44" y1="90" x2="174" y2="90" ${S1}/>
      <rect x="52" y="64" width="18" height="26" fill="${INDIGO}" ${S1}/>
      <rect x="82" y="50" width="18" height="40" fill="${TEAL}" ${S1}/>
      <rect x="112" y="58" width="18" height="32" fill="${GOLD}" ${S1}/>
      <rect x="142" y="34" width="18" height="56" fill="${VERM}" ${S1}/>
      <polyline points="61,54 91,40 121,48 151,28" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="1 6" stroke-linecap="round"/>
      <circle cx="61" cy="54" r="3.6" fill="${CARD}" ${S1}/><circle cx="91" cy="40" r="3.6" fill="${CARD}" ${S1}/>
      <circle cx="121" cy="48" r="3.6" fill="${CARD}" ${S1}/><circle cx="151" cy="28" r="3.6" fill="${CARD}" ${S1}/>
      <line x1="236" y1="82" x2="262" y2="108" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="224" cy="70" r="26" fill="${CARD}" fill-opacity=".8" stroke="${INK}" stroke-width="4"/>
      <path d="M210 78 L218 66 L226 72 L238 56" fill="none" stroke="${TEAL}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,

    renewable_tech: () => `
      ${base("#dff0ea", "#bfe0d6", "#8fc9a8", 282)}
      <line x1="70" y1="104" x2="70" y2="50" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
      <g class="art-spin" style="transform-origin:70px 46px">
        <path d="M70 46 L64 8 Q70 4 76 8Z" fill="${CARD}" ${S1}/>
        <path d="M70 46 L64 8 Q70 4 76 8Z" fill="${CARD}" ${S1} transform="rotate(120 70 46)"/>
        <path d="M70 46 L64 8 Q70 4 76 8Z" fill="${CARD}" ${S1} transform="rotate(240 70 46)"/>
      </g>
      <circle cx="70" cy="46" r="5" fill="${VERM}" ${S1}/>
      <line x1="130" y1="104" x2="130" y2="70" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
      <g class="art-spin slow" style="transform-origin:130px 66px">
        <path d="M130 66 L126 40 Q130 37 134 40Z" fill="${CARD}" ${S1}/>
        <path d="M130 66 L126 40 Q130 37 134 40Z" fill="${CARD}" ${S1} transform="rotate(120 130 66)"/>
        <path d="M130 66 L126 40 Q130 37 134 40Z" fill="${CARD}" ${S1} transform="rotate(240 130 66)"/>
      </g>
      <circle cx="130" cy="66" r="3.4" fill="${VERM}" ${S1}/>
      <line x1="196" y1="104" x2="192" y2="118" ${S}/><line x1="232" y1="104" x2="236" y2="118" ${S}/>
      <polygon points="172,84 254,84 270,106 156,106" fill="${INDIGO}" ${S}/>
      <path d="M190 84 L182 106 M208 84 L204 106 M226 84 L226 106 M244 84 L248 106 M163 95 H262" stroke="${CARD}" stroke-opacity=".7" stroke-width="1.2" fill="none"/>`,

    software_dev: () => `
      ${base("#e6ddf0", "#d2c6e6", "#b7a8d6", 42)}
      <rect x="86" y="28" width="148" height="74" rx="6" fill="#24364a" ${S}/>
      <rect x="98" y="40" width="26" height="4" rx="2" fill="${TEAL_S}"/><rect x="98" y="49" width="16" height="4" rx="2" fill="${GOLD}"/>
      <rect x="98" y="58" width="30" height="4" rx="2" fill="${TEAL_S}"/>
      <rect x="196" y="40" width="26" height="4" rx="2" fill="${GOLD}"/><rect x="204" y="49" width="18" height="4" rx="2" fill="${TEAL_S}"/>
      <text x="160" y="80" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-weight="700" font-size="34" fill="${GOLD}">&lt;/&gt;</text>
      <rect x="140" y="90" width="4" height="6" fill="${CARD}"/>
      <polygon points="72,102 248,102 262,114 58,114" fill="#cfc7b2" ${S}/>
      <line x1="140" y1="106" x2="180" y2="106" ${S1}/>
      ${gear(280, 58, 12, VERM)}${gear(48, 76, 9, GOLD)}
      <rect x="252" y="90" width="9" height="9" fill="${TEAL}" ${S1}/><rect x="264" y="98" width="6" height="6" fill="${GOLD}" ${S1}/>
      <rect x="28" y="42" width="7" height="7" fill="${INDIGO}" ${S1}/>`,

    nurse: () => `
      ${base("#fbe1e1", TEAL_S, "#a9d6c8", 60)}
      <rect x="186" y="48" width="92" height="56" fill="${CARD}" ${S}/>
      <rect x="196" y="58" width="14" height="12" fill="${GOLD_S}" ${S1}/><rect x="254" y="58" width="14" height="12" fill="${GOLD_S}" ${S1}/>
      <rect x="196" y="78" width="14" height="12" fill="${GOLD_S}" ${S1}/><rect x="254" y="78" width="14" height="12" fill="${GOLD_S}" ${S1}/>
      <rect x="224" y="80" width="16" height="24" fill="${INDIGO}" ${S1}/>
      <circle cx="232" cy="38" r="15" fill="${VERM}" ${S}/>${plus(232, 38, 9)}
      <path d="M14 76 H48 L56 62 L66 94 L76 50 L86 76 H120 L128 68 L136 76 H172" fill="none" stroke="${VERM}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      ${heart(104, 18, 1.3)}${heart(134, 30, 0.7, GOLD)}`,

    graphic_designer: () => `
      ${base("#f6dce8", "#e9c4d6", "#d9a9c2", 286)}
      <path d="M60 30 C30 34 22 70 46 86 C64 98 84 90 82 78 C80 68 96 66 104 60 C124 44 100 14 60 30Z" fill="${CARD}" ${S}/>
      <circle cx="84" cy="58" r="6" fill="#f6dce8" ${S1}/>
      <circle cx="54" cy="46" r="6" fill="${VERM}" ${S1}/><circle cx="68" cy="34" r="6" fill="${GOLD}" ${S1}/>
      <circle cx="90" cy="38" r="6" fill="${TEAL}" ${S1}/><circle cx="46" cy="70" r="6" fill="${INDIGO}" ${S1}/>
      <circle cx="64" cy="82" r="6" fill="${VERM}" ${S1}/>
      <path d="M150 96 C170 22 232 22 252 82" fill="none" stroke="${INDIGO}" stroke-width="5" stroke-linecap="round"/>
      <path d="M150 96 L170 26 M252 82 L232 26" fill="none" stroke="${INK}" stroke-width="1.4" stroke-dasharray="3 3"/>
      <circle cx="170" cy="26" r="4.5" fill="${CARD}" ${S1}/><circle cx="232" cy="26" r="4.5" fill="${CARD}" ${S1}/>
      <rect x="145" y="91" width="10" height="10" fill="${CARD}" ${S1}/><rect x="247" y="77" width="10" height="10" fill="${CARD}" ${S1}/>
      <path d="M204 62 V84 L210 79 L215 90 L220 88 L215 77 L223 77Z" fill="${INK}" stroke="${CARD}" stroke-width="1.4" stroke-linejoin="round"/>`,

    agri_officer: () => {
      const rows = [-60, -10, 40, 90, 140, 190, 240, 290, 340]
        .map((x) => `<line x1="160" y1="92" x2="${x}" y2="130" stroke="#b98a3a" stroke-width="1.6"/>`)
        .join("");
      const wheat = (x) =>
        `<line x1="${x}" y1="120" x2="${x}" y2="72" ${S}/>` +
        [0, 1, 2, 3, 4]
          .map((i) => {
            const y = 74 + i * 7;
            return `<ellipse cx="${x - 5}" cy="${y}" rx="3" ry="6" transform="rotate(-28 ${x - 5} ${y})" fill="${GOLD}" ${S1}/><ellipse cx="${x + 5}" cy="${y}" rx="3" ry="6" transform="rotate(28 ${x + 5} ${y})" fill="${GOLD}" ${S1}/>`;
          })
          .join("") +
        `<ellipse cx="${x}" cy="68" rx="3" ry="6" fill="${GOLD}" ${S1}/>`;
      return `
      ${base("#fdecc0", "#cfe6b8", "#e2be72")}
      <path d="M0 92 H320 V130 H0Z" fill="#e2be72" ${S}/>
      ${rows}
      <rect x="34" y="52" width="58" height="40" fill="${VERM}" ${S}/>
      <polygon points="28,54 63,28 98,54" fill="${VERM_D}" ${S}/>
      <rect x="52" y="66" width="22" height="26" fill="${CARD}" ${S1}/><path d="M52 66 L74 92 M74 66 L52 92" ${S1}/>
      <rect x="100" y="42" width="22" height="50" fill="${CARD}" ${S}/>
      <path d="M100 42 a11 11 0 0 1 22 0" fill="${GOLD_S}" ${S}/>
      ${wheat(226)}${wheat(246)}${wheat(266)}`;
    },
  };

  const genericScene = () => `
    ${base(GOLD_S, TEAL_S, "#9ccbb8")}
    <line x1="160" y1="98" x2="160" y2="40" ${S}/>
    <polygon points="160,40 196,52 160,64" fill="${VERM}" ${S}/>`;

  const career = (id) =>
    `<svg viewBox="0 0 320 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${(SCENES[id] || genericScene)()}</svg>`;

  /* ==========================================================================
     WELCOME · the journey banner (route climbing from home to the summit)
     ========================================================================== */
  const journey = (W, H, labels, animate) => {
    const k = W > 600 ? 1.25 : 0.95;
    const pts = [
      [W * 0.11, H * 0.83],
      [W * 0.36, H * 0.73],
      [W * 0.63, H * 0.62],
      [W * 0.88, H * 0.45],
    ];
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const mx = ((x0 + x1) / 2).toFixed(1);
      d += ` C${mx} ${y0.toFixed(1)} ${mx} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    }
    const f = (a) => (H * a).toFixed(1);
    const g = (a) => (W * a).toFixed(1);

    const peaks = [
      [0.12, 0.36],
      [0.36, 0.28],
      [0.66, 0.2],
      [0.9, 0.14],
    ];
    const mountains = `<path d="M0 ${f(0.72)} L${g(0.12)} ${f(0.36)} L${g(0.23)} ${f(0.6)} L${g(0.36)} ${f(0.28)} L${g(0.5)} ${f(0.6)} L${g(0.66)} ${f(0.2)} L${g(0.8)} ${f(0.52)} L${g(0.9)} ${f(0.14)} L${W} ${f(0.46)} V${H} H0Z" fill="${TEAL_S}" ${S1}/>`;
    const caps = peaks
      .map(([px, py]) => {
        const x = W * px;
        const y = H * py;
        const w = 20 * (W > 600 ? 1.2 : 0.9);
        return `<path d="M${x} ${y} L${x - w} ${y + w * 1.25} L${x - w * 0.45} ${y + w * 1.0} L${x} ${y + w * 1.3} L${x + w * 0.5} ${y + w * 1.0} L${x + w} ${y + w * 1.25}Z" fill="${CARD}" ${S1}/>`;
      })
      .join("");
    const hills =
      `<path d="M0 ${f(0.86)} Q${g(0.2)} ${f(0.62)} ${g(0.4)} ${f(0.82)} T${g(0.75)} ${f(0.72)} T${W} ${f(0.68)} V${H} H0Z" fill="#a7cfae" ${S1}/>` +
      `<path d="M0 ${f(0.95)} Q${g(0.3)} ${f(0.84)} ${g(0.55)} ${f(0.94)} T${W} ${f(0.9)} V${H} H0Z" fill="#7fb8a4" ${S}/>`;

    const cloud = (cx, cy, s) =>
      `<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M-26 8 a12 12 0 0 1 4 -22 a16 16 0 0 1 30 -4 a12 12 0 0 1 20 10 a9 9 0 0 1 -2 16Z" fill="${CARD}" ${S1}/></g>`;
    const bird = (x, y, s) =>
      `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 q5 -6 10 0 q5 -6 10 0" fill="none" ${S1}/>`;

    // landmarks (local coords: 0,0 = ground point)
    const hut = `<rect x="-14" y="-18" width="28" height="18" fill="${CARD}" ${S1}/><polygon points="-19,-18 0,-33 19,-18" fill="${VERM}" ${S1}/><rect x="-4" y="-11" width="8" height="11" fill="${INDIGO}" ${S1}/>`;
    const sign = `<rect x="-2" y="-34" width="4" height="34" fill="${WOOD}" ${S1}/><polygon points="-2,-34 -24,-34 -30,-27 -24,-20 -2,-20" fill="${GOLD}" ${S1}/><polygon points="2,-24 24,-24 30,-17 24,-10 2,-10" fill="${CARD}" ${S1}/>`;
    const school = `<rect x="-22" y="-24" width="44" height="24" fill="${CARD}" ${S1}/><polygon points="-27,-24 0,-42 27,-24" fill="${GOLD}" ${S1}/><rect x="-5" y="-13" width="10" height="13" fill="${INDIGO}" ${S1}/><rect x="-17" y="-18" width="8" height="8" fill="${GOLD_S}" ${S1}/><rect x="9" y="-18" width="8" height="8" fill="${GOLD_S}" ${S1}/><line x1="0" y1="-42" x2="0" y2="-54" ${S1}/><polygon points="0,-54 13,-50 0,-46" fill="${TEAL}" ${S1}/>`;
    const flag = `<ellipse cx="0" cy="1" rx="22" ry="5" fill="${PAPER2}" ${S1}/><line x1="0" y1="0" x2="0" y2="-50" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><polygon points="0,-50 30,-41 0,-32" fill="${VERM}" ${S1}/>${star5(0, -58, 8, GOLD)}`;
    const marks = [hut, sign, school, flag];

    const label = (x, y, text) => {
      const w = Math.max(46, text.length * 8.4 + 18);
      return `<g><rect x="${(x - w / 2).toFixed(1)}" y="${(y + 8).toFixed(1)}" width="${w.toFixed(1)}" height="24" rx="8" fill="${CARD}" ${S1}/><text x="${x.toFixed(1)}" y="${(y + 25).toFixed(1)}" text-anchor="middle" font-family="Kalam, 'Mukta', cursive" font-weight="700" font-size="15" fill="${INK}">${text}</text></g>`;
    };

    const traveler = animate
      ? `<g><circle r="8" fill="${VERM}" ${S}/><circle r="2.6" fill="${CARD}"/><animateMotion dur="10s" repeatCount="indefinite" path="${d}" keyPoints="0;1" keyTimes="0;1" calcMode="linear"/></g>`
      : `<g transform="translate(${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)})"><circle r="8" fill="${VERM}" ${S}/><circle r="2.6" fill="${CARD}"/></g>`;

    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <circle cx="${g(0.08)}" cy="${f(0.2)}" r="${W > 600 ? 22 : 17}" fill="${GOLD}" ${S1}/>
      <circle cx="${g(0.08)}" cy="${f(0.2)}" r="${W > 600 ? 32 : 25}" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="2 5" stroke-linecap="round"/>
      ${cloud(W * 0.3, H * 0.17, k * 0.9)}${cloud(W * 0.58, H * 0.1, k * 0.7)}
      ${bird(W * 0.46, H * 0.3, k)}${bird(W * 0.5, H * 0.24, k * 0.7)}${bird(W * 0.78, H * 0.18, k * 0.8)}
      ${mountains}${caps}${hills}
      <path d="${d}" fill="none" stroke="${CARD}" stroke-opacity=".9" stroke-width="8" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="9 9" stroke-linecap="round"/>
      ${pts.map(([x, y], i) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${k})">${marks[i]}</g>`).join("")}
      ${pts.map(([x, y], i) => label(x, y, labels[i])).join("")}
      ${traveler}
    </svg>`;
  };

  /* ==========================================================================
     ONBOARDING · "dream sky" (paper plane, moon, stars) for the dark card
     ========================================================================== */
  const dream = () => `<svg viewBox="0 0 170 120" aria-hidden="true" focusable="false">
    <path d="M124 14 a22 22 0 1 0 24 34 a17 17 0 1 1 -24 -34z" fill="${GOLD_S}"/>
    ${star4(30, 22, 8, "#efe3c8")}${star4(78, 12, 5, "#efe3c8")}${star4(150, 76, 6, "#efe3c8")}${star4(108, 60, 4, GOLD)}
    <path d="M6 108 C34 116 50 84 30 84 C16 84 20 102 46 96 C70 90 78 76 96 64" fill="none" stroke="#efe3c8" stroke-opacity=".7" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round"/>
    <polygon points="92,62 132,40 108,82" fill="${CARD}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
    <polygon points="92,62 108,82 106,66" fill="${INDIGO_S}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
    <polygon points="108,82 110,68 104,76" fill="${GOLD}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
  </svg>`;

  /* ==========================================================================
     EMPTY STATE · a folded map with an X marking the spot
     ========================================================================== */
  const empty = () => `<svg viewBox="0 0 140 96" aria-hidden="true" focusable="false">
    <polygon points="12,26 48,16 48,74 12,84" fill="${CARD}" ${S}/>
    <polygon points="48,16 90,26 90,84 48,74" fill="${GOLD_S}" ${S}/>
    <polygon points="90,26 128,16 128,74 90,84" fill="${CARD}" ${S}/>
    <path d="M20 62 Q42 36 62 58 T108 40" fill="none" stroke="${VERM}" stroke-width="2.5" stroke-dasharray="1 6" stroke-linecap="round"/>
    <path d="M104 34 L114 44 M114 34 L104 44" stroke="${VERM}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="26" cy="36" r="6" fill="none" ${S1}/><path d="M26 31 l2 5 -2 5 -2 -5z" fill="${VERM}"/>
  </svg>`;

  /* ==========================================================================
     HOME · interactive expedition summit progress (mountain path with 6 waypoints)
     ========================================================================== */
  const summit = (pct, steps = [], isHi = false) => {
    const safePct = Math.max(0, Math.min(100, Number(pct) || 0));
    
    // Dynamic waypoints generated from the student's actual stage steps
    const stepList = Array.isArray(steps) && steps.length > 0 ? steps : [
      { id: "step_profile", no: 1, title: isHi ? "1. प्रोफ़ाइल" : "1. Profile" },
      { id: "step_tier1", no: 2, title: isHi ? "2. रुचि खोज" : "2. Interest" },
    ];
    const N = stepList.length;

    // Coordinate templates for 2, 3, 4, 5, 6 steps
    let coords = [];
    if (N === 2) {
      coords = [{ x: 80, y: 142 }, { x: 624, y: 34 }];
    } else if (N === 3) {
      coords = [{ x: 75, y: 142 }, { x: 340, y: 88 }, { x: 624, y: 34 }];
    } else if (N === 4) {
      coords = [{ x: 70, y: 144 }, { x: 250, y: 106 }, { x: 440, y: 72 }, { x: 624, y: 34 }];
    } else {
      coords = stepList.map((_, i) => {
        const t = N > 1 ? i / (N - 1) : 0;
        return {
          x: Math.round(65 + t * (624 - 65)),
          y: Math.round(145 - Math.pow(t, 0.85) * (145 - 34))
        };
      });
    }

    const WAYPOINTS = stepList.map((s, i) => {
      const coord = coords[i] || coords[coords.length - 1];
      let shortLabel = s.shortLabel || s.no || (i + 1);
      if (s.id === "step_profile") shortLabel = isHi ? "1. प्रोफ़ाइल" : "1. Profile";
      else if (s.id === "step_tier1") shortLabel = isHi ? "2. रुचि (RIASEC)" : "2. Interest";
      else if (s.id === "step_tier2") shortLabel = isHi ? "3. दिमाग (TAMANNA)" : "3. Aptitude";
      else if (s.id === "step_tier3") shortLabel = isHi ? "4. व्यक्तित्व (BIG 5)" : "4. Personality";

      return {
        id: s.id,
        no: s.no || (i + 1),
        label: shortLabel,
        x: coord.x,
        y: coord.y,
        step: s
      };
    });

    // Compute Hiker Pin coordinates along the milestone segments
    let hx = WAYPOINTS[0].x;
    let hy = WAYPOINTS[0].y;
    const numSegments = Math.max(1, WAYPOINTS.length - 1);
    const segmentVal = (safePct / 100) * numSegments;
    const segIdx = Math.min(numSegments - 1, Math.floor(segmentVal));
    const fraction = segmentVal - segIdx;
    const wpA = WAYPOINTS[segIdx];
    const wpB = WAYPOINTS[segIdx + 1] || wpA;
    hx = wpA.x + (wpB.x - wpA.x) * fraction;
    hy = wpA.y + (wpB.y - wpA.y) * fraction;

    // Build smooth cubic SVG trail path
    let trailPath = `M ${WAYPOINTS[0].x} ${WAYPOINTS[0].y}`;
    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      const p1 = WAYPOINTS[i];
      const p2 = WAYPOINTS[i + 1];
      const cx1 = p1.x + (p2.x - p1.x) * 0.45;
      const cy1 = p1.y;
      const cx2 = p1.x + (p2.x - p1.x) * 0.55;
      const cy2 = p2.y;
      trailPath += ` C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${p2.x} ${p2.y}`;
    }

    return `<svg class="interactive-summit-svg" viewBox="0 0 680 185" width="100%" height="auto" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Student Journey Progress: ${safePct}%">
      <defs>
        <!-- Gradients -->
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--paper-2)" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="var(--paper)" stop-opacity="0"/>
        </linearGradient>

        <linearGradient id="mountainBackGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${INDIGO}" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="${INDIGO_S}" stop-opacity="0.12"/>
        </linearGradient>

        <linearGradient id="mountainFrontGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${TEAL}" stop-opacity="0.55"/>
          <stop offset="60%" stop-color="${TEAL_S}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="var(--card)" stop-opacity="0.95"/>
        </linearGradient>

        <linearGradient id="trailActiveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${GOLD}"/>
          <stop offset="50%" stop-color="${VERM}"/>
          <stop offset="100%" stop-color="${TEAL}"/>
        </linearGradient>

        <!-- Filter Glow -->
        <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      <!-- Background Sky & Distant Mountain Ridges -->
      <path d="M0,185 L0,80 L75,40 L160,75 L260,20 L370,68 L480,15 L590,55 L680,25 L680,185 Z" fill="url(#mountainBackGrad)"/>

      <!-- Foreground Mountain Ridge -->
      <path d="M0,185 L0,150 L60,145 L115,160 L172,112 L230,135 L288,76 L345,130 L402,110 L458,135 L514,70 L568,105 L624,34 L680,55 L680,185 Z" fill="url(#mountainFrontGrad)" stroke="var(--ink)" stroke-opacity="0.4" stroke-width="1.5" stroke-linejoin="round"/>

      <!-- Expedition Trail (Dashed Background Path) -->
      <path d="${trailPath}" fill="none" stroke="var(--ink)" stroke-opacity="0.3" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>

      <!-- Active Glowing Trail Path -->
      <path d="${trailPath}" fill="none" stroke="url(#trailActiveGrad)" stroke-width="5" stroke-linecap="round" stroke-dasharray="650" stroke-dashoffset="${(650 * (1 - safePct / 100)).toFixed(1)}" class="summit-active-trail"/>

      <!-- Mountain Peak Summit Flagpole -->
      <line x1="624" y1="34" x2="624" y2="8" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="624,8 650,16 624,24" fill="${safePct >= 100 ? GOLD : VERM}" stroke="var(--ink)" stroke-width="1.5" class="summit-waving-flag" filter="url(#glowEffect)"/>

      <!-- Dynamic Interactive Waypoints -->
      ${WAYPOINTS.map((wp) => {
        const s = wp.step || {};
        const isDone = s.done || (wp.no === 1 && s.pct >= 70);
        const isLocked = s.locked;
        const isCurrent = !isDone && !isLocked;
        const nodePct = isDone ? 100 : (s.pct || 0);

        let statusClass = "ready";
        if (isDone) statusClass = "done";
        else if (isLocked) statusClass = "locked";
        else if (isCurrent) statusClass = "current";

        return `
          <g class="summit-waypoint-node ${statusClass}" 
             data-step-route="${s.route || ""}" 
             data-step-locked="${s.locked ? "1" : "0"}" 
             data-step-lockmsg="${s.lockMsg ? s.lockMsg.replace(/"/g, '&quot;') : ""}"
             data-step-no="${wp.no}"
             data-step-title="${s.title ? s.title.replace(/"/g, '&quot;') : wp.label}"
             data-step-pct="${nodePct}"
             tabindex="0"
             role="button"
             aria-label="${wp.label}: ${nodePct}%">
            
            <!-- Click Target -->
            <circle cx="${wp.x}" cy="${wp.y}" r="22" fill="transparent" class="node-hit-area"/>

            <!-- Current Pulse Beacon -->
            ${isCurrent ? `<circle cx="${wp.x}" cy="${wp.y}" r="17" class="summit-beacon-halo"/>` : ""}

            <!-- Node Outer Ring & Fill -->
            <circle cx="${wp.x}" cy="${wp.y}" r="${isCurrent ? 13 : 11}" class="summit-node-circle"/>

            <!-- Node Inner Glyph / Number -->
            <text x="${wp.x}" y="${wp.y + 4.5}" text-anchor="middle" class="summit-node-glyph">
              ${isDone ? "✓" : isLocked ? "🔒" : wp.no}
            </text>

            <!-- Node Label Pill -->
            <g class="summit-node-label-group" transform="translate(${wp.x}, ${wp.y + 24})">
              <rect x="-42" y="-9" width="84" height="18" rx="9" class="summit-node-label-bg"/>
              <text x="0" y="3.5" text-anchor="middle" class="summit-node-label-text">${wp.label}</text>
            </g>
          </g>
        `;
      }).join("")}

      <!-- Current Hiker Position Marker Pin -->
      <g class="summit-hiker-pin" transform="translate(${hx.toFixed(1)}, ${(hy - 14).toFixed(1)})" filter="url(#glowEffect)">
        <ellipse cx="0" cy="14" rx="8" ry="3" fill="rgba(0,0,0,0.25)"/>
        <circle cx="0" cy="0" r="10" fill="${GOLD}" stroke="var(--ink)" stroke-width="2"/>
        <text x="0" y="4" text-anchor="middle" font-size="10px">🧭</text>
      </g>
    </svg>`;
  };

  /* ==========================================================================
     ASSESSMENTS · little illustrations for the two test cards
     ========================================================================== */
  const hexPts = (cx, cy, R, vals) =>
    vals
      .map((v, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        return `${(cx + R * v * Math.cos(a)).toFixed(1)},${(cy + R * v * Math.sin(a)).toFixed(1)}`;
      })
      .join(" ");

  const assess = (kind) => {
    if (kind === "riasec") {
      return `<svg viewBox="0 0 72 72" aria-hidden="true" focusable="false">
        <polygon points="${hexPts(36, 36, 30, [1, 1, 1, 1, 1, 1])}" fill="${CARD}" ${S}/>
        <polygon points="${hexPts(36, 36, 30, [0.5, 0.5, 0.5, 0.5, 0.5, 0.5])}" fill="none" stroke="${INK}" stroke-opacity=".35" stroke-width="1"/>
        <polygon points="${hexPts(36, 36, 30, [0.9, 0.5, 0.75, 1, 0.6, 0.4])}" fill="${GOLD}" fill-opacity=".75" stroke="${VERM}" stroke-width="2.2" stroke-linejoin="round"/>
        <circle cx="36" cy="36" r="2.6" fill="${INK}"/>
      </svg>`;
    }
    return `<svg viewBox="0 0 72 72" aria-hidden="true" focusable="false">
      <rect x="6" y="6" width="28" height="28" rx="7" fill="${INDIGO_S}" ${S}/>
      <rect x="38" y="6" width="28" height="28" rx="7" fill="${GOLD_S}" ${S} transform="rotate(4 52 20)"/>
      <rect x="6" y="38" width="28" height="28" rx="7" fill="${TEAL_S}" ${S} transform="rotate(-4 20 52)"/>
      <rect x="38" y="38" width="28" height="28" rx="7" fill="#f6dce8" ${S}/>
      <text x="20" y="27" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="16" fill="${INK}">Aa</text>
      <text x="52" y="28" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="20" fill="${INK}" transform="rotate(4 52 20)">+</text>
      <text x="20" y="60" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="20" fill="${INK}" transform="rotate(-4 20 52)">?</text>
      <path d="M52 44 L60 60 H44Z" fill="${VERM}" ${S1}/>
    </svg>`;
  };

  /* ==========================================================================
     REPORT · interest radar (RIASEC hexagon)
     One series, direct axis labels, table view = the trait list below it.
     ========================================================================== */
  const radar = (scores, names) => {
    const order = ["R", "I", "A", "S", "E", "C"];
    const cx = 180;
    const cy = 148;
    const R = 84;
    const pt = (i, r) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    const ring = (f) =>
      order
        .map((_, i) => pt(i, R * f).map((n) => n.toFixed(1)).join(","))
        .join(" ");
    const shape = order.map((t, i) => pt(i, (R * Math.max(scores[t] || 0, 3)) / 100).map((n) => n.toFixed(1)).join(",")).join(" ");
    const spokes = order.map((_, i) => `<line x1="${cx}" y1="${cy}" x2="${pt(i, R)[0].toFixed(1)}" y2="${pt(i, R)[1].toFixed(1)}" stroke="${INK}" stroke-opacity=".22" stroke-width="1"/>`).join("");
    const rings = [0.25, 0.5, 0.75, 1]
      .map((f) => `<polygon points="${ring(f)}" fill="${f === 1 ? "rgba(252,247,234,.7)" : "none"}" stroke="${INK}" stroke-opacity="${f === 1 ? 0.55 : 0.22}" stroke-width="${f === 1 ? 1.6 : 1}" ${f === 0.5 ? 'stroke-dasharray="3 4"' : ""}/>`)
      .join("");
    const dots = order
      .map((t, i) => {
        const [x, y] = pt(i, (R * Math.max(scores[t] || 0, 3)) / 100);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${CARD}" stroke="${TEAL}" stroke-width="2.5"><title>${names[t]}: ${scores[t] || 0}%</title></circle>`;
      })
      .join("");
    const labels = order
      .map((t, i) => {
        const [x, y] = pt(i, R + 20);
        const side = Math.abs(x - cx) < 6 ? "middle" : x > cx ? "start" : "end";
        const dx = side === "start" ? 2 : side === "end" ? -2 : 0;
        const dy = i === 0 ? -8 : i === 3 ? 12 : 0;
        return `<text x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" text-anchor="${side}" font-family="Nunito, Mukta, sans-serif" font-weight="800" font-size="12.5" fill="${INK}">${names[t]}<tspan x="${(x + dx).toFixed(1)}" dy="14" font-weight="700" font-size="12" fill="#5b6672">${scores[t] || 0}%</tspan></text>`;
      })
      .join("");
    const top = order
      .slice()
      .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
      .slice(0, 3)
      .map((t) => `${names[t]} ${scores[t] || 0}%`)
      .join(", ");
    return `<svg viewBox="0 0 360 300" role="img" aria-label="Interest map. Highest: ${top}">
      ${rings}${spokes}
      <polygon points="${shape}" fill="${TEAL}" fill-opacity=".28" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round"/>
      ${dots}${labels}
    </svg>`;
  };

  return { career, journey, dream, empty, summit, assess, radar };
})();
