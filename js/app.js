const STORAGE_KEY = "moinee_phase1_v1";
const BRAND = "CareerMarg";
const BRAND_FULL = "CareerMarg — Career Guidance";

/* ---------- Journey-map visual kit: custom line icons, logo, compass ---------- */
const ICON = (() => {
  const s = (d) =>
    `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  return {
    home: s('<path d="M3 11.2 12 4l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
    assessments: s('<rect x="5" y="4" width="14" height="17" rx="2.2"/><path d="M9 4h6v3H9zM8.5 12h7M8.5 16h4.5"/>'),
    report: s('<path d="M3 21h18M6.5 21v-7M12 21V6M17.5 21v-10"/>'),
    explore: s('<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z"/>'),
    compare: s('<path d="M12 4v16M7 20h10M5 8h14M5 8 2.5 14a3 3 0 0 0 5 0zM19 8l-2.5 6a3 3 0 0 0 5 0z"/>'),
    profile: s('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.2 3.6-6.6 8-6.6s8 2.4 8 6.6"/>'),
    search: s('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
    print: s('<path d="M7 9V3h10v6M7 17H4v-6h16v6h-3M7 14h10v7H7z"/>'),
    counselor: s('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10M6 14h6"/>'),
    students: s('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    calendar: s('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    chart: s('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>')
  };
})();

const LOGO_SVG = `<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">
  <circle cx="20" cy="20" r="18" fill="#fcf7ea" stroke="#1d2733" stroke-width="2"/>
  <circle cx="20" cy="20" r="14" fill="none" stroke="#1d2733" stroke-width=".8" stroke-dasharray="1.5 2.6"/>
  <path d="M20 6.5 25.2 20 20 23.2 14.8 20z" fill="#c9432a" stroke="#1d2733" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M20 33.5 14.8 20 20 23.2 25.2 20z" fill="#1d2733"/>
  <circle cx="20" cy="20" r="2.3" fill="#fcf7ea" stroke="#1d2733" stroke-width="1.2"/>
</svg>`;

function compassSvg() {
  const C = 130;
  const pt = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [C + r * Math.cos(a), C + r * Math.sin(a)];
  };
  let ticks = "";
  for (let i = 0; i < 72; i++) {
    const long = i % 6 === 0;
    const mid = i % 3 === 0;
    const [x1, y1] = pt(117, i * 5);
    const [x2, y2] = pt(long ? 104 : mid ? 108 : 112, i * 5);
    ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-width="${long ? 1.6 : 0.9}"/>`;
  }
  const letters = [["N", 0], ["E", 90], ["S", 180], ["W", 270]]
    .map(([l, d]) => {
      const [x, y] = pt(93, d);
      return `<text x="${x.toFixed(1)}" y="${(y + 5.5).toFixed(1)}" text-anchor="middle" class="cp-letter${l === "N" ? " n" : ""}">${l}</text>`;
    })
    .join("");
  const main = [0, 90, 180, 270]
    .map(
      (d) => `<g transform="rotate(${d} ${C} ${C})">
        <path d="M130 52 122 122 130 130Z" fill="#1d2733"/>
        <path d="M130 52 138 122 130 130Z" fill="#fcf7ea" stroke="#1d2733" stroke-width="1"/>
      </g>`
    )
    .join("");
  const minor = [45, 135, 225, 315]
    .map(
      (d) => `<g transform="rotate(${d} ${C} ${C})">
        <path d="M130 78 125 124 130 130 135 124Z" fill="#cfe6de" stroke="#1d2733" stroke-width=".9"/>
      </g>`
    )
    .join("");
  return `<svg class="compass" viewBox="0 0 260 260" role="img" aria-label="Compass">
    <circle cx="${C}" cy="${C}" r="126" fill="#fcf7ea" stroke="#1d2733" stroke-width="2.4"/>
    <circle cx="${C}" cy="${C}" r="119" fill="none" stroke="#1d2733" stroke-width="1"/>
    <g stroke="#1d2733" stroke-linecap="round">${ticks}</g>
    <circle cx="${C}" cy="${C}" r="70" fill="none" stroke="#1d2733" stroke-width="1" stroke-dasharray="1.5 5" stroke-linecap="round"/>
    ${minor}${main}${letters}
    <g class="needle">
      <path d="M130 46 141 130 130 138 119 130Z" fill="#c9432a" stroke="#1d2733" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M130 214 119 130 130 138 141 130Z" fill="#1d2733" stroke="#1d2733" stroke-width="1.6" stroke-linejoin="round"/>
      <circle cx="${C}" cy="${C}" r="8" fill="#fcf7ea" stroke="#1d2733" stroke-width="2"/>
      <circle cx="${C}" cy="${C}" r="2.6" fill="#1d2733"/>
    </g>
  </svg>`;
}

const App = {
  state: {
    lang: "en",
    theme: "light",
    route: "welcome",
    careerId: null,
    auth: null,
    authModalOpen: false,
    savedModalOpen: false,
    selectedSavedCareerId: null,
    authModalTab: "signin",
    authRole: "student",
    forgotStep: 1,
    forgotOtpSent: false,
    forgotIdentifier: "",
    googleChooserOpen: false,
    googleAccountSelected: null,
    landingCategory: "all",
    activeTier: "tier1_riasec",
    tierIndex: 0,
    tierAnswers: {},
    completedTiers: [],
    traitScores: {},
    shuffleSeed: 0,
    adminStats: null,
    adminStudents: [],
    adminSearch: "",
    adminCohortFilter: "all",
    adminSchoolFilter: "all",
    adminSelectedStudent: null,
    adminModalOpen: false,
    adminSubTab: "dashboard",
    adminLoading: false,
    counselorStats: null,
    counselorStudents: [],
    counselorSearch: "",
    counselorGradeFilter: "all",
    counselorStatusFilter: "all",
    counselorSelectedStudent: null,
    counselorModalOpen: false,
    counselorSubTab: "dashboard",
    counselorLoading: false,
    profile: {
      name: "",
      educationLevel: "class_10",
      educationStatus: "pursuing",
      grade: "10",
      school: "",
      stream: "general",
      roleModelArchetype: "tech",
      roleModelName: "",
      dreamImpact: "",
      aspiration: "",
      interestTags: [],
      workStyle: "analytical",
      city: "",
    },
    selectedInterestCategory: "all",
    riasecAnswers: {},
    aptitudeAnswers: {},
    riasec: null,
    aptitude: null,
    riasecIndex: 0,
    aptitudeIndex: 0,
    exploreQuery: "",
    exploreSector: "all",
    exploreDemand: "all",
    explorePage: 1,
    savedCareers: [],
    compareIds: [],
  },

  isAdmin() {
    const role = String(this.state.auth?.role || "").toLowerCase();
    return role === "school_admin" || role === "admin" || role === "counselor" || role === "teacher" || role === "faculty";
  },

  isCounselor() {
    return this.isAdmin();
  },

  setSector(secId) {
    this.state.exploreSector = secId || "all";
    this.state.explorePage = 1;
    this.render();
  },

  setDemand(demandId) {
    this.state.exploreDemand = demandId || "all";
    this.state.explorePage = 1;
    this.render();
  },

  clearExploreFilters() {
    this.state.exploreQuery = "";
    this.state.exploreSector = "all";
    this.state.exploreDemand = "all";
    this.state.explorePage = 1;
    this.render();
  },

  loadMoreExplore() {
    this.state.explorePage = (this.state.explorePage || 1) + 1;
    this.render();
  },

  addToCompare(id) {
    const list = this.state.compareIds || [];
    if (list.includes(id)) {
      this.toast(this.t("Already in comparison list", "पहले से तुलना सूची में है"));
      return;
    }
    if (list.length >= 6) {
      this.toast(this.t("Maximum 6 careers allowed in comparison", "तुलना में अधिकतम 6 करियर जोड़े जा सकते हैं"));
      return;
    }
    this.state.compareIds = [...list, id];
    this.save();
    this.toast(this.t("Added to compare matrix! ⚖️", "करियर तुलना में जोड़ा गया! ⚖️"));
    this.render();
  },

  removeFromCompare(id) {
    this.state.compareIds = (this.state.compareIds || []).filter((x) => x !== id);
    this.save();
    this.render();
  },

  clearCompare() {
    this.state.compareIds = [];
    this.save();
    this.render();
    this.toast(this.t("Comparison list cleared", "तुलना सूची खाली कर दी गई"));
  },

  async fetchDatabaseData() {
    try {
      const qRes = await fetch("api/questions");
      if (qRes.ok) {
        const qJson = await qRes.json();
        if (qJson.success && Array.isArray(qJson.questions) && qJson.questions.length > 0) {
          window.DISHA_ALL_QUESTIONS = qJson.questions;
        }
      }
    } catch (_) {}

    try {
      const cRes = await fetch("api/careers?limit=1000");
      if (cRes.ok) {
        const cJson = await cRes.json();
        if (cJson.success && Array.isArray(cJson.careers) && cJson.careers.length > 0) {
          window.DISHA_CAREER_DATABASE = cJson.careers;
        }
      }
    } catch (_) {}
  },

  init() {
    window.App = this;
    this.load();
    this.fetchDatabaseData();
    const savedTheme = localStorage.getItem("careermarg_theme") || this.state.theme || "light";
    this.state.theme = savedTheme;
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Global delegated listener for all auth and navigation triggers
    document.addEventListener("click", (e) => {
      // Password Eye / Monkey Visibility Toggle
      const passToggle = e.target.closest("[data-toggle-pass]");
      if (passToggle) {
        e.preventDefault();
        e.stopPropagation();
        const targetId = passToggle.getAttribute("data-toggle-pass");
        this.togglePasswordVisibility(targetId, passToggle);
        return;
      }

      // Demo Switcher triggers (Group I, II, III & Admin)
      const demoG1Btn = e.target.closest("[data-demo-group1]");
      if (demoG1Btn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleDemoGroup1();
        return;
      }

      const demoG2Btn = e.target.closest("[data-demo-group2]");
      if (demoG2Btn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleDemoGroup2();
        return;
      }

      const demoG3Btn = e.target.closest("[data-demo-group3]");
      if (demoG3Btn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleDemoGroup3();
        return;
      }

      const demoAdminBtn = e.target.closest("[data-demo-admin], [data-demo-counselor-login]");
      if (demoAdminBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleDemoAdmin();
        return;
      }

      const openDemoSwitcherBtn = e.target.closest("[data-open-demo-switcher]");
      if (openDemoSwitcherBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.state.authModalOpen = true;
        this.state.authModalTab = "signin";
        this.render();
        return;
      }

      // Launch Side-by-Side Comparison Tool trigger
      const launchCmpBtn = e.target.closest("[data-launch-compare]");
      if (launchCmpBtn) {
        e.preventDefault();
        e.stopPropagation();
        const presetKey = launchCmpBtn.getAttribute("data-launch-compare") || this.state.landingComparePreset || "tech";
        const presets = this.landingComparePresets();
        const p = presets[presetKey] || presets.tech;
        this.state.compareIds = [p.c1.id, p.c2.id];
        this.save();
        this.go("compare");
        return;
      }

      // Finalize Career Goal trigger
      const finCareerBtn = e.target.closest("[data-finalize-career]");
      if (finCareerBtn) {
        e.preventDefault();
        e.stopPropagation();
        const cid = finCareerBtn.getAttribute("data-finalize-career");
        this.finalizeCareer(cid);
        return;
      }

      // Student Demo Login Button
      const demoLoginBtn = e.target.closest("[data-demo-login]");
      if (demoLoginBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleDemoLogin();
        return;
      }

      // Auth Role Selector Tab
      const roleTab = e.target.closest("[data-auth-role]");
      if (roleTab) {
        e.preventDefault();
        e.stopPropagation();
        const r = roleTab.getAttribute("data-auth-role") || "student";
        this.state.authRole = r;
        this.render();
        return;
      }

      // Counselor SubTab Switcher
      const cSubTabBtn = e.target.closest("[data-counselor-subtab]");
      if (cSubTabBtn) {
        e.preventDefault();
        e.stopPropagation();
        const tab = cSubTabBtn.getAttribute("data-counselor-subtab") || "dashboard";
        this.setCounselorSubTab(tab);
        return;
      }

      // Open Counselor Student Diagnostic Modal
      const openCStudentBtn = e.target.closest("[data-open-counselor-student]");
      if (openCStudentBtn) {
        e.preventDefault();
        e.stopPropagation();
        const sid = openCStudentBtn.getAttribute("data-open-counselor-student");
        this.openCounselorStudentModal(sid);
        return;
      }

      // Close Counselor Student Diagnostic Modal
      const closeCStudentBtn = e.target.closest("[data-close-counselor-modal]");
      if (closeCStudentBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.closeCounselorStudentModal();
        return;
      }

      // Save Counselor Note from Modal
      const saveCNoteBtn = e.target.closest("#counselor-save-note-btn");
      if (saveCNoteBtn) {
        e.preventDefault();
        e.stopPropagation();
        const sid = saveCNoteBtn.getAttribute("data-student-id");
        this.saveCounselorNote(sid, e);
        return;
      }

      // Quick Schedule Session from Modal
      const schedCSessBtn = e.target.closest("#counselor-schedule-sess-btn");
      if (schedCSessBtn) {
        e.preventDefault();
        e.stopPropagation();
        const sid = schedCSessBtn.getAttribute("data-student-id");
        this.scheduleCounselorSession(sid, e);
        return;
      }

      // Refresh Counselor Data
      const refreshCBtn = e.target.closest("[data-counselor-refresh]");
      if (refreshCBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.loadCounselorDashboard();
        this.toast(this.t("Refreshing live student data from database…", "डेटाबेस से लाइव डेटा रिफ्रेश हो रहा है…"));
        return;
      }

      // Export Cohort Summary
      const exportCBtn = e.target.closest("[data-export-cohort]");
      if (exportCBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.exportCohortSummary();
        return;
      }

      // Forgot Password Modal Trigger
      const forgotTrigger = e.target.closest("[data-auth-forgot]");
      if (forgotTrigger) {
        e.preventDefault();
        e.stopPropagation();
        this.openForgotModal();
        return;
      }

      // Forgot Password Send OTP Button
      const sendOtpBtn = e.target.closest("#auth-forgot-send-btn");
      if (sendOtpBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleSendOtp(e);
        return;
      }

      // Forgot Password Reset Submit Button
      const resetPassBtn = e.target.closest("#auth-forgot-submit-btn");
      if (resetPassBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleResetPassword(e);
        return;
      }

      // Google Chooser Open
      const googleOpenBtn = e.target.closest("[data-open-google-chooser]");
      if (googleOpenBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.openGoogleChooser();
        return;
      }

      // Google Chooser Close
      const googleCloseBtn = e.target.closest("[data-google-close]");
      if (googleCloseBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.closeGoogleChooser();
        return;
      }

      // Google Account Selected in Chooser
      const googleAccBtn = e.target.closest("[data-select-google-acc]");
      if (googleAccBtn) {
        e.preventDefault();
        e.stopPropagation();
        const accIdx = googleAccBtn.getAttribute("data-select-google-acc");
        if (accIdx === "custom") {
          this.selectGoogleAccount("custom");
        } else {
          const accounts = [
            { name: "Rahul Sharma", email: "rahul.student@gmail.com", avatar: "R" },
            { name: "Priya Singh", email: "priya.s@gmail.com", avatar: "P" },
          ];
          const chosen = accounts[parseInt(accIdx, 10)] || accounts[0];
          this.selectGoogleAccount(chosen);
        }
        return;
      }

      // Google Chooser Confirm Submit
      const googleSubmitBtn = e.target.closest("#google-confirm-signin-btn");
      if (googleSubmitBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleGoogleSignIn(e);
        return;
      }

      const suBtn = e.target.closest("#auth-su-submit");
      if (suBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleSignUp(e);
        return;
      }

      const siBtn = e.target.closest("#auth-si-submit");
      if (siBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.handleSignIn(e);
        return;
      }

      const openBtn = e.target.closest("[data-auth-open]");
      if (openBtn) {
        e.preventDefault();
        e.stopPropagation();
        const tab = openBtn.getAttribute("data-auth-open") || "signin";
        this.openAuthModal(tab);
        return;
      }

      const tabBtn = e.target.closest("[data-auth-tab]");
      if (tabBtn) {
        e.preventDefault();
        e.stopPropagation();
        const tab = tabBtn.getAttribute("data-auth-tab") || "signin";
        this.switchAuthTab(tab);
        return;
      }

      const closeBtn = e.target.closest("[data-auth-close]");
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.closeAuthModal();
        return;
      }
    }, true);

    window.addEventListener("hashchange", () => this.onHash());
    
    // Smart resize listener: only reflow on substantial horizontal orientation changes and NEVER when user is typing in an input
    this._lastWindowWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      const activeEl = document.activeElement;
      const isInputActive = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.tagName === "SELECT");
      if (isInputActive) return; // Never destroy DOM or trigger re-render while virtual keyboard is open or user is typing!
      
      const newWidth = window.innerWidth;
      if (Math.abs(newWidth - (this._lastWindowWidth || newWidth)) > 40) {
        this._lastWindowWidth = newWidth;
        clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(() => this.render(), 150);
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.state.savedModalOpen) this.closeSavedModal();
        if (this.state.authModalOpen) this.closeAuthModal();
      }
    });

    // Global Delegated Click Listeners for Saved Modal & Actions
    document.addEventListener("click", (e) => {
      const openSavedBtn = e.target.closest("[data-open-saved]");
      if (openSavedBtn) {
        e.preventDefault();
        e.stopPropagation();
        const cid = openSavedBtn.getAttribute("data-open-saved-career") || null;
        this.openSavedModal(cid);
        return;
      }

      const closeSavedBtn = e.target.closest("[data-saved-close]");
      if (closeSavedBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.closeSavedModal();
        return;
      }

      const selectSavedBtn = e.target.closest("[data-select-saved-career]");
      if (selectSavedBtn && !e.target.closest("[data-remove-saved-career]")) {
        e.preventDefault();
        e.stopPropagation();
        const cid = selectSavedBtn.getAttribute("data-select-saved-career");
        this.state.selectedSavedCareerId = cid;
        this.render();
        return;
      }

      const removeSavedBtn = e.target.closest("[data-remove-saved-career]");
      if (removeSavedBtn) {
        e.preventDefault();
        e.stopPropagation();
        const cid = removeSavedBtn.getAttribute("data-remove-saved-career");
        this.removeSavedCareer(cid, e);
        return;
      }

      const compareSavedBtn = e.target.closest("[data-compare-saved]");
      if (compareSavedBtn) {
        e.preventDefault();
        e.stopPropagation();
        const list = this.state.savedCareers || [];
        if (list.length === 0) {
          this.toast(this.t("Please save at least 2 careers to compare.", "तुलना के लिए कम से कम 2 करियर सेव करें।"));
          return;
        }
        // Load ALL saved careers cleanly into compareIds
        this.state.compareIds = Array.from(new Set(list));
        this.closeSavedModal();
        this.go("compare");
        return;
      }

      const savedBackdrop = document.getElementById("saved-modal-backdrop");
      if (e.target === savedBackdrop) {
        this.closeSavedModal();
        return;
      }
    });

    this.loadFromDatabase();
    this.onHash();
  },

  isDesktop() {
    return window.matchMedia("(min-width: 900px)").matches;
  },

  async loadFromDatabase() {
    try {
      const userId = this.state.auth?.id || (this.state.auth?.email ? ("usr_" + this.state.auth.email.toLowerCase().replace(/[^a-z0-9]/g, "_")) : (this.state.userId || "usr-demo-1"));
      const res = await fetch(`api/sync?userId=${encodeURIComponent(userId)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.success) {
        if (data.user) {
          this.state.profile = {
            ...this.state.profile,
            name: data.user.full_name || this.state.profile.name,
            grade: data.user.grade_level || this.state.profile.grade,
            school: data.user.school_name || this.state.profile.school,
            educationStatus: data.user.education_status || this.state.profile.educationStatus,
            city: data.user.city || this.state.profile.city,
            stream: data.user.stream || this.state.profile.stream,
            roleModelArchetype: data.user.role_model_archetype || this.state.profile.roleModelArchetype,
            roleModelName: data.user.role_model_name || this.state.profile.roleModelName,
            dreamImpact: data.user.dream_impact || this.state.profile.dreamImpact,
            aspiration: data.user.aspiration || this.state.profile.aspiration,
            workStyle: data.user.work_style || this.state.profile.workStyle,
            interestTags: Array.isArray(data.user.interest_tags) ? data.user.interest_tags : (typeof data.user.interest_tags === 'string' ? JSON.parse(data.user.interest_tags || '[]') : this.state.profile.interestTags)
          };
        }
        if (data.scores && Object.keys(data.scores).length > 0) {
          this.state.traitScores = { ...this.state.traitScores, ...data.scores };
        }
        if (Array.isArray(data.completedTiers) && data.completedTiers.length > 0) {
          this.state.completedTiers = Array.from(new Set([...this.state.completedTiers, ...data.completedTiers]));
        }
        if (data.tierAnswers && Object.keys(data.tierAnswers).length > 0) {
          this.state.tierAnswers = { ...this.state.tierAnswers, ...data.tierAnswers };
        }
        if (Array.isArray(data.savedCareers)) {
          this.state.savedCareers = data.savedCareers;
        }
        this.render();
      }
    } catch (_) {}
  },

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      const cleanAnswers = {};
      if (saved.tierAnswers && typeof saved.tierAnswers === "object") {
        Object.entries(saved.tierAnswers).forEach(([k, v]) => {
          if (v !== null && v !== undefined && v !== "" && v !== "NaN" && !Number.isNaN(v)) {
            cleanAnswers[k] = v;
          }
        });
      }
      this.state = {
        ...this.state,
        ...saved,
        route: this.state.route,
        authModalOpen: false,
        savedModalOpen: false,
        selectedSavedCareerId: null,
        savedCareers: Array.from(new Set(saved.savedCareers || [])),
        compareIds: Array.from(new Set(saved.compareIds || [])),
        tierAnswers: cleanAnswers,
        completedTiers: saved.completedTiers || [],
        traitScores: saved.traitScores || {},
        activeTier: saved.activeTier || "tier1_riasec",
      };
      if (window.MoineeScore && window.DISHA_ALL_QUESTIONS && Object.keys(cleanAnswers).length > 0) {
        const computed = MoineeScore.scoreAllTiers(cleanAnswers, window.DISHA_ALL_QUESTIONS);
        if (computed.traits && Object.keys(computed.traits).length > 0) {
          this.state.traitScores = { ...this.state.traitScores, ...computed.traits };
        }
      }
      if (this.state.auth && this.state.auth.name && !this.state.profile.name) {
        this.state.profile.name = this.state.auth.name;
      }
      if (this.state.auth && this.state.auth.grade && !this.state.profile.grade) {
        this.state.profile.grade = this.state.auth.grade;
      }
      if (this.state.theme) {
        document.documentElement.setAttribute("data-theme", this.state.theme);
      }
    } catch (_) {}
  },

  save() {
    this.getValidSavedCareers();
    const { route, careerId, riasecIndex, aptitudeIndex, exploreQuery, authModalOpen, ...persist } = this.state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    if (this.state.auth?.email) {
      const userKey = STORAGE_KEY + "_" + this.state.auth.email.toLowerCase().replace(/[^a-z0-9]/g, "_");
      localStorage.setItem(userKey, JSON.stringify(persist));
    }
    this.syncWithDatabase();
  },

  async syncWithDatabase() {
    try {
      const userId = this.state.auth?.id || (this.state.auth?.email ? ("usr_" + this.state.auth.email.toLowerCase().replace(/[^a-z0-9]/g, "_")) : (this.state.userId || "usr-demo-1"));
      const userEmail = this.state.auth?.email || "student@careermarg.org";
      const computed = (window.MoineeScore && window.DISHA_ALL_QUESTIONS)
        ? MoineeScore.scoreAllTiers(this.state.tierAnswers, window.DISHA_ALL_QUESTIONS)
        : {};
      const allTraitScores = { ...this.state.traitScores, ...(computed.traits || {}) };

      // Whitelist valid trait keys
      const validTraitKeys = [
        "R", "I", "A", "S", "E", "C",
        "TAMANNA_LA", "TAMANNA_VA", "TAMANNA_NA", "TAMANNA_SA", "TAMANNA_PA", "TAMANNA_MA", "TAMANNA_AR",
        "OCEAN_O", "OCEAN_C", "OCEAN_E", "OCEAN_A", "OCEAN_N",
        "ENABLER_ANXIETY", "ENABLER_SELF_EFFICACY", "ENABLER_RESILIENCE"
      ];
      const cleanTraitScores = {};
      validTraitKeys.forEach((k) => {
        if (allTraitScores[k] !== undefined) {
          cleanTraitScores[k] = allTraitScores[k];
        }
      });

      const topMatches = this.matches().slice(0, 10);

      const payload = {
        userId: userId,
        email: userEmail,
        name: this.state.profile?.name || "Student",
        grade: this.state.profile?.grade || "10",
        school: this.state.profile?.school || "Government High School",
        educationStatus: this.state.profile?.educationStatus || "pursuing",
        city: this.state.profile?.city || "",
        stream: this.state.profile?.stream || "general",
        roleModelArchetype: this.state.profile?.roleModelArchetype || "tech",
        roleModelName: this.state.profile?.roleModelName || "",
        dreamImpact: this.state.profile?.dreamImpact || "",
        aspiration: this.state.profile?.aspiration || "",
        workStyle: this.state.profile?.workStyle || "analytical",
        interestTags: this.state.profile?.interestTags || [],
        savedCareers: this.state.savedCareers || [],
        finalizedCareer: this.state.finalizedCareer || (this.state.savedCareers && this.state.savedCareers.length === 1 ? this.state.savedCareers[0] : null),
        activeTier: this.state.activeTier || "tier1_riasec",
        completedTiers: this.state.completedTiers || [],
        tierAnswers: this.state.tierAnswers || {},
        traitScores: cleanTraitScores,
        careerMatches: topMatches,
        report: {
          hollandCode: computed.hollandCode || "IES",
          riasecSummary: {
            R: allTraitScores.R || 50,
            I: allTraitScores.I || 50,
            A: allTraitScores.A || 50,
            S: allTraitScores.S || 50,
            E: allTraitScores.E || 50,
            C: allTraitScores.C || 50,
          },
          tamannaSummary: {
            TAMANNA_LA: allTraitScores.TAMANNA_LA || 50,
            TAMANNA_VA: allTraitScores.TAMANNA_VA || 50,
            TAMANNA_NA: allTraitScores.TAMANNA_NA || 50,
            TAMANNA_SA: allTraitScores.TAMANNA_SA || 50,
            TAMANNA_PA: allTraitScores.TAMANNA_PA || 50,
            TAMANNA_MA: allTraitScores.TAMANNA_MA || 50,
            TAMANNA_AR: allTraitScores.TAMANNA_AR || 50,
          },
          oceanSummary: {
            OCEAN_O: allTraitScores.OCEAN_O || 50,
            OCEAN_C: allTraitScores.OCEAN_C || 50,
            OCEAN_E: allTraitScores.OCEAN_E || 50,
            OCEAN_A: allTraitScores.OCEAN_A || 50,
            OCEAN_N: allTraitScores.OCEAN_N || 50,
          },
          resilienceSummary: {
            ENABLER_ANXIETY: allTraitScores.ENABLER_ANXIETY || 35,
            ENABLER_SELF_EFFICACY: allTraitScores.ENABLER_SELF_EFFICACY || 75,
            ENABLER_RESILIENCE: allTraitScores.ENABLER_RESILIENCE || 80,
          },
          topCareers: topMatches.map(c => ({ id: c.id, title: c.title, hi: c.hi, fit: c.fit }))
        }
      };

      await fetch("api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) {}
  },

  toggleTheme() {
    this.state.theme = this.state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", this.state.theme);
    localStorage.setItem("careermarg_theme", this.state.theme);
    this.save();
    this.render();
    this.toast(
      this.state.theme === "dark"
        ? this.t("Dark mode active 🌙", "डार्क मोड सक्रिय 🌙")
        : this.t("Light mode active ☀️", "लाइट मोड सक्रिय ☀️")
    );
  },

  
    async handleSignIn(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // If currently on signup tab, forward to handleSignUp
    if (this.state.authModalTab === "signup" && document.getElementById("auth-su-name")) {
      return this.handleSignUp(e);
    }

    const emailInput = document.getElementById("auth-si-email") || document.getElementById("auth-su-email");
    const passInput = document.getElementById("auth-si-password") || document.getElementById("auth-su-pass");

    const email = (emailInput?.value || this._cachedAuthEmail || "").trim();
    const pass = (passInput?.value || this._cachedAuthPass || "").trim();

    if (!email) {
      if (emailInput) { emailInput.focus(); emailInput.style.borderColor = "var(--vermilion)"; }
      this.toast(this.t("Please enter your email or mobile number.", "कृपया अपना ईमेल या मोबाइल नंबर दर्ज करें।"));
      return false;
    }
    if (!pass) {
      if (passInput) { passInput.focus(); passInput.style.borderColor = "var(--vermilion)"; }
      this.toast(this.t("Please enter your password.", "कृपया पासवर्ड दर्ज करें।"));
      return false;
    }

    const submitBtn = document.getElementById("auth-si-submit") || document.getElementById("auth-su-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = this.t("Signing In...", "साइन इन हो रहा है...");
    }

    try {
      const res = await fetch("api/auth?action=signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: pass })
      });
      const data = await res.json();

      if (data && data.success) {
        this.state.auth = data.auth || { name: email.split("@")[0], email: email, role: "Student", grade: "10" };
        if (data.profile) {
          this.state.profile = { ...this.state.profile, ...data.profile };
        }
        if (Array.isArray(data.savedCareers)) {
          this.state.savedCareers = Array.from(new Set(data.savedCareers));
        }
        if (data.finalizedCareer) {
          this.state.finalizedCareer = data.finalizedCareer;
        }
        if (Array.isArray(data.completedTiers)) {
          this.state.completedTiers = Array.from(new Set(data.completedTiers));
        }
        if (data.tierAnswers && Object.keys(data.tierAnswers).length > 0) {
          this.state.tierAnswers = { ...this.state.tierAnswers, ...data.tierAnswers };
        }
        if (data.traitScores && Object.keys(data.traitScores).length > 0) {
          this.state.traitScores = { ...this.state.traitScores, ...data.traitScores };
        }

        this.state.authModalOpen = false;
        this.save();
        this.toast(this.t(`Welcome back, ${this.state.auth.name}!`, `नमस्ते ${this.state.auth.name}, वापसी पर स्वागत है!`));
        if (this.isCounselor()) {
          this.loadCounselorDashboard();
          this.go("counselor");
        } else {
          this.go(this.profileReady() ? "home" : "onboarding");
        }
      } else {
        this.toast(data?.message || this.t("Login failed. Please check credentials.", "लॉगिन विफल रहा। कृपया सही जानकारी भरें।"));
      }
    } catch (err) {
      const namePart = email.includes("@") ? email.split("@")[0] : email;
      const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      this.state.auth = { name: displayName, email: email, role: "Student", grade: "10" };
      this.state.authModalOpen = false;
      this.save();
      this.toast(this.t(`Signed in as ${displayName}`, `नमस्ते ${displayName}!`));
      if (this.isCounselor()) {
        this.loadCounselorDashboard();
        this.go("counselor");
      } else {
        this.go(this.profileReady() ? "home" : "onboarding");
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = this.t("Sign In to CareerMarg →", "CareerMarg में साइन इन करें →");
      }
    }
    return false;
  },

  async handleSignUp(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // If currently on signin tab, forward to handleSignIn
    if (this.state.authModalTab === "signin" && document.getElementById("auth-si-email")) {
      return this.handleSignIn(e);
    }

    const nameInput = document.getElementById("auth-su-name");
    const emailInput = document.getElementById("auth-su-email") || document.getElementById("auth-si-email");
    const gradeInput = document.getElementById("auth-su-grade");
    const passInput = document.getElementById("auth-su-pass") || document.getElementById("auth-si-password");
    const cpassInput = document.getElementById("auth-su-cpass");
    const termsInput = document.getElementById("auth-su-terms");

    const name = (nameInput?.value || "").trim();
    const email = (emailInput?.value || this._cachedAuthEmail || "").trim();
    const grade = gradeInput?.value || "10";
    const pass = (passInput?.value || this._cachedAuthPass || "").trim();
    const cpass = (cpassInput?.value || pass).trim();
    const terms = termsInput ? termsInput.checked : true;
    const selectedRole = this._selectedAuthRole || "Student";

    if (!name) {
      if (nameInput) { nameInput.focus(); nameInput.style.borderColor = "var(--vermilion)"; }
      this.toast(this.t("Please enter your Full Name.", "कृपया अपना पूरा नाम दर्ज करें।"));
      return false;
    }
    if (!email) {
      if (emailInput) { emailInput.focus(); emailInput.style.borderColor = "var(--vermilion)"; }
      this.toast(this.t("Please enter your Email Address or Mobile.", "कृपया अपना ईमेल या मोबाइल नंबर दर्ज करें।"));
      return false;
    }
    if (!pass) {
      if (passInput) { passInput.focus(); passInput.style.borderColor = "var(--vermilion)"; }
      this.toast(this.t("Please create a password.", "कृपया एक पासवर्ड दर्ज करें।"));
      return false;
    }
    if (cpassInput && pass !== cpass) {
      if (cpassInput) { cpassInput.focus(); cpassInput.style.borderColor = "var(--vermilion)"; }
      this.toast(this.t("Passwords do not match.", "पासवर्ड मेल नहीं खाते।"));
      return false;
    }
    if (!terms) {
      this.toast(this.t("Please accept terms of guidance.", "कृपया नियमों से सहमति दें।"));
      return false;
    }

    const submitBtn = document.getElementById("auth-su-submit") || document.getElementById("auth-si-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = this.t("Creating Account...", "खाता बन रहा है...");
    }

    try {
      const res = await fetch("api/auth?action=signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass,
          grade: grade,
          role: selectedRole
        })
      });
      const data = await res.json();

      if (data && data.success) {
        this.state.auth = {
          id: data.user?.id || ("usr_" + email.toLowerCase().replace(/[^a-z0-9]/g, "_")),
          name: name,
          email: email,
          role: selectedRole,
          grade: grade,
        };
        this.state.profile = {
          name: name,
          educationLevel: grade,
          educationStatus: "pursuing",
          grade: grade,
          school: "",
          stream: "general",
          roleModelArchetype: "tech",
          roleModelName: "",
          dreamImpact: "",
          aspiration: "",
          interestTags: [],
          workStyle: "analytical",
          city: "",
        };
        this.state.selectedInterestCategory = "all";
        this.state.tierAnswers = {};
        this.state.completedTiers = [];
        this.state.traitScores = {};
        this.state.riasec = null;
        this.state.aptitude = null;
        this.state.savedCareers = [];
        this.state.compareIds = [];
        this.state.tierIndex = 0;
        this.state.activeTier = "tier1_riasec";
        this.state.authModalOpen = false;

        this.save();
        this.toast(this.t(`🎉 Welcome, ${name}! Your account is ready.`, `🎉 स्वागत है, ${name}! आपका खाता तैयार है।`));
        if (this.isCounselor()) {
          this.loadCounselorDashboard();
          this.go("counselor");
        } else {
          this.go("onboarding");
        }
      } else {
        this.toast(data?.message || this.t("Sign up failed. Please try again.", "खाता नहीं बन सका। कृपया पुनः प्रयास करें।"));
      }
    } catch (err) {
      this.state.auth = { name: name, email: email, role: selectedRole, grade: grade };
      this.state.profile.name = name;
      this.state.profile.grade = grade;
      this.state.authModalOpen = false;
      this.save();
      this.toast(this.t(`Account created! Welcome, ${name}!`, `खाता बन गया! स्वागत है, ${name}!`));
      if (this.isCounselor()) {
        this.loadCounselorDashboard();
        this.go("counselor");
      } else {
        this.go("onboarding");
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = this.t("Create Free Account →", "मुफ़्त खाता बनाएँ →");
      }
    }
    return false;
  },

  openAuthModal(tab = "signin") {
    const curEmail = document.getElementById("auth-su-email")?.value || document.getElementById("auth-si-email")?.value || this._cachedAuthEmail || "";
    const curPass = document.getElementById("auth-su-pass")?.value || document.getElementById("auth-si-password")?.value || this._cachedAuthPass || "";
    if (curEmail) this._cachedAuthEmail = curEmail;
    if (curPass) this._cachedAuthPass = curPass;

    this.state.authModalOpen = true;
    this.state.authModalTab = tab;
    this.render();
  },

  switchAuthTab(tab) {
    const curEmail = document.getElementById("auth-su-email")?.value || document.getElementById("auth-si-email")?.value || this._cachedAuthEmail || "";
    const curPass = document.getElementById("auth-su-pass")?.value || document.getElementById("auth-si-password")?.value || this._cachedAuthPass || "";
    if (curEmail) this._cachedAuthEmail = curEmail;
    if (curPass) this._cachedAuthPass = curPass;

    this.state.authModalTab = tab;
    this.render();
  },

  closeAuthModal() {
    this.state.authModalOpen = false;
    this.state.authModalTab = "signin";
    this.render();
  },

  togglePasswordVisibility(targetInputId, btnEl) {
    const input = document.getElementById(targetInputId);
    if (!input) return;
    const isPass = input.type === "password";
    input.type = isPass ? "text" : "password";
    if (btnEl) {
      btnEl.textContent = isPass ? "🙈" : "👁️";
      btnEl.title = isPass ? (this.state.lang === "hi" ? "पासवर्ड छिपाएँ" : "Hide password") : (this.state.lang === "hi" ? "पासवर्ड दिखाएँ" : "Show password");
      btnEl.setAttribute("aria-label", isPass ? "Hide password" : "Show password");
    }
  },

  openForgotModal() {
    this.state.authModalOpen = true;
    this.state.authModalTab = "forgot";
    this.state.forgotStep = 1;
    this.state.forgotOtpSent = false;
    this.render();
  },

  async handleSendOtp(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const input = document.getElementById("auth-forgot-identifier");
    const val = (input?.value || "").trim();
    if (!val) {
      this.toast(this.t("Please enter your registered Email or Mobile number.", "कृपया पंजीकृत ईमेल या मोबाइल नंबर दर्ज करें।"));
      if (input) input.focus();
      return;
    }
    const sendBtn = document.getElementById("auth-forgot-send-btn");
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.textContent = this.t("Sending OTP...", "OTP भेजा जा रहा है...");
    }
    try {
      const res = await fetch("api/auth?action=send_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: val })
      });
      const data = await res.json();
      if (data && data.success) {
        this.state.forgotOtpSent = true;
        this.state.forgotStep = 2;
        this.state.forgotIdentifier = val;
        this._lastOtp = data.otp || "482910";
        this.render();
        this.toast(this.t(`✅ OTP sent to ${val}! Test code: ${this._lastOtp}`, `✅ OTP ${val} पर भेजा गया! परीक्षण कोड: ${this._lastOtp}`));
      } else {
        this.toast(data?.message || this.t("Failed to send OTP.", "OTP भेजने में विफल।"));
      }
    } catch (_) {
      this.state.forgotOtpSent = true;
      this.state.forgotStep = 2;
      this.state.forgotIdentifier = val;
      this._lastOtp = "482910";
      this.render();
      this.toast(this.t(`✅ Verification OTP sent! Code: 482910`, `✅ सत्यापन OTP भेजा गया! कोड: 482910`));
    }
  },

  async handleResetPassword(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const otpInput = document.getElementById("auth-forgot-otp");
    const passInput = document.getElementById("auth-forgot-newpass");
    const cpassInput = document.getElementById("auth-forgot-cnewpass");
    const otp = (otpInput?.value || "").trim();
    const newPass = (passInput?.value || "").trim();
    const cPass = (cpassInput?.value || "").trim();
    const identifier = this.state.forgotIdentifier || document.getElementById("auth-forgot-identifier")?.value || "";

    if (!otp) {
      this.toast(this.t("Please enter the 6-digit OTP code.", "कृपया 6 अंकों का OTP दर्ज करें।"));
      if (otpInput) otpInput.focus();
      return;
    }
    if (!newPass) {
      this.toast(this.t("Please enter a new password.", "कृपया नया पासवर्ड दर्ज करें।"));
      if (passInput) passInput.focus();
      return;
    }
    if (newPass !== cPass) {
      this.toast(this.t("Passwords do not match.", "पासवर्ड मेल नहीं खाते।"));
      if (cpassInput) cpassInput.focus();
      return;
    }

    const resetBtn = document.getElementById("auth-forgot-submit-btn");
    if (resetBtn) {
      resetBtn.disabled = true;
      resetBtn.textContent = this.t("Updating Password...", "पासवर्ड अपडेट हो रहा है...");
    }

    try {
      const res = await fetch("api/auth?action=reset_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: identifier,
          otp: otp,
          new_password: newPass
        })
      });
      const data = await res.json();
      if (data && data.success) {
        this.toast(this.t("🎉 Password updated successfully! You can now sign in.", "🎉 पासवर्ड सफलतापूर्वक अपडेट हो गया! अब आप साइन इन कर सकते हैं।"));
        this.state.authModalTab = "signin";
        this.state.forgotStep = 1;
        this.state.forgotOtpSent = false;
        this._cachedAuthEmail = identifier;
        this._cachedAuthPass = newPass;
        this.render();
      } else {
        this.toast(data?.message || this.t("Could not update password.", "पासवर्ड अपडेट नहीं हो सका।"));
      }
    } catch (_) {
      this.toast(this.t("🎉 Password updated successfully! Please sign in.", "🎉 पासवर्ड अपडेट हो गया! कृपया साइन इन करें।"));
      this.state.authModalTab = "signin";
      this.state.forgotStep = 1;
      this.render();
    }
  },

  openGoogleChooser() {
    this.state.googleChooserOpen = true;
    this.state.googleAccountSelected = null;
    this.render();
  },

  closeGoogleChooser() {
    this.state.googleChooserOpen = false;
    this.state.googleAccountSelected = null;
    this.render();
  },

  selectGoogleAccount(acc) {
    this.state.googleAccountSelected = acc;
    this.render();
  },

  async handleGoogleSignIn(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const acc = this.state.googleAccountSelected;
    let email = acc?.email || "";
    let name = acc?.name || "";
    let pass = "";

    if (acc === "custom") {
      const emailEl = document.getElementById("g-custom-email");
      const nameEl = document.getElementById("g-custom-name");
      const passEl = document.getElementById("g-custom-pass");
      email = (emailEl?.value || "").trim();
      name = (nameEl?.value || "").trim() || email.split("@")[0];
      pass = (passEl?.value || "").trim();
      if (!email) {
        this.toast(this.t("Please enter your Gmail address.", "कृपया अपना जीमेल पता दर्ज करें।"));
        return;
      }
    } else {
      const passEl = document.getElementById("g-acc-pass");
      pass = (passEl?.value || "").trim();
      if (!pass) {
        this.toast(this.t("Please enter your Google account password.", "कृपया अपना गूगल अकाउंट पासवर्ड दर्ज करें।"));
        if (passEl) passEl.focus();
        return;
      }
    }

    const submitBtn = document.getElementById("google-confirm-signin-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = this.t("Authenticating with Google...", "Google से प्रमाणीकरण हो रहा है...");
    }

    try {
      const res = await fetch("api/auth?action=google_auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: name,
          grade: this.state.profile?.grade || "10"
        })
      });
      const data = await res.json();
      if (data && data.success) {
        this.state.auth = data.auth || { name: name, email: email, role: "Student", grade: this.state.profile?.grade || "10" };
        if (data.profile) this.state.profile = { ...this.state.profile, ...data.profile };
        if (Array.isArray(data.savedCareers)) this.state.savedCareers = Array.from(new Set(data.savedCareers));
        if (Array.isArray(data.completedTiers)) this.state.completedTiers = Array.from(new Set(data.completedTiers));
        if (data.tierAnswers) this.state.tierAnswers = { ...this.state.tierAnswers, ...data.tierAnswers };
        if (data.traitScores) this.state.traitScores = { ...this.state.traitScores, ...data.traitScores };
        
        this.state.googleChooserOpen = false;
        this.state.authModalOpen = false;
        this.save();
        this.toast(this.t(`🎉 Google Account connected! Welcome, ${name}!`, `🎉 Google खाता जुड़ गया! नमस्ते, ${name}!`));
        this.go(this.profileReady() ? "home" : "onboarding");
      } else {
        this.toast(data?.message || this.t("Google login failed.", "गूगल लॉगिन विफल रहा।"));
      }
    } catch (_) {
      this.state.auth = { name: name, email: email, role: "Student", grade: this.state.profile?.grade || "10" };
      this.state.profile.name = name;
      this.state.googleChooserOpen = false;
      this.state.authModalOpen = false;
      this.save();
      this.toast(this.t(`🎉 Signed in with Google as ${name}!`, `🎉 Google से साइन इन सफल!`));
      this.go(this.profileReady() ? "home" : "onboarding");
    }
  },

  onHash() {
    const hash = (location.hash || "#welcome").slice(1);
    const [route, param] = hash.split("/");
    this.state.route = route || "welcome";
    this.state.careerId = param || null;

    if (route === "counselor") {
      if (param) this.state.counselorSubTab = param;
      if (!this.state.counselorStats || !this.state.counselorStudents || this.state.counselorStudents.length === 0) {
        this.loadCounselorDashboard();
      }
    } else if (route === "test" && param) {
      this.state.activeTier = param;
      const questions = (window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === param);
      const firstUnanswered = questions.findIndex((q) => this.state.tierAnswers[q.id] === undefined);
      this.state.tierIndex = firstUnanswered >= 0 ? firstUnanswered : 0;
    } else if (route === "riasec") {
      this.state.route = "test";
      this.state.activeTier = "tier1_riasec";
      const questions = (window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === "tier1_riasec");
      const firstUnanswered = questions.findIndex((q) => this.state.tierAnswers[q.id] === undefined);
      this.state.tierIndex = firstUnanswered >= 0 ? firstUnanswered : 0;
    } else if (route === "aptitude") {
      this.state.route = "test";
      this.state.activeTier = "tier2_tamanna";
      const questions = (window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === "tier2_tamanna");
      const firstUnanswered = questions.findIndex((q) => this.state.tierAnswers[q.id] === undefined);
      this.state.tierIndex = firstUnanswered >= 0 ? firstUnanswered : 0;
    }

    this.render();
  },

  async handleDemoGroup1() {
    try {
      const res = await fetch("api/auth?action=demo_group1", { method: "POST" });
      const data = await res.json();
      if (data && data.success) {
        this.state.auth = data.auth;
        this.state.profile = { ...this.state.profile, ...data.profile };
        this.state.completedTiers = ["tier1_riasec"];
        this.state.traitScores = data.traitScores?.all || { I: 84, A: 80, S: 66, R: 54, E: 48, C: 42 };
        this.state.savedCareers = data.savedCareers || ["ui_ux_designer", "data_scientist", "robotics_engineer"];
        this.state.authModalOpen = false;
        this.save();
        this.toast(this.t("🌱 Loaded Group I (Class 7 · Ananya Sharma) · 1 Assessment Mode", "🌱 ग्रुप I (कक्षा 7वीं · अनन्या शर्मा) लोड हुआ · 1 असेसमेंट मोड"));
        this.go("home");
        return;
      }
    } catch (_) {}

    this.state.auth = { id: "usr_demo_group1", name: "Ananya Sharma", email: "ananya.class7@careermarg.org", role: "student", grade: "7" };
    this.state.profile = { name: "Ananya Sharma", grade: "7", educationLevel: "class_7", school: "Kendriya Vidyalaya No. 1", city: "Jaipur", stream: "general", workStyle: "creative", aspiration: "Wants to explore science and creative arts" };
    this.state.completedTiers = ["tier1_riasec"];
    this.state.traitScores = { I: 84, A: 80, S: 66, R: 54, E: 48, C: 42, R: 54, I: 84, A: 80, S: 66, E: 48, C: 42 };
    this.state.savedCareers = ["ui_ux_designer", "data_scientist", "robotics_engineer"];
    this.state.authModalOpen = false;
    this.save();
    this.toast(this.t("🌱 Loaded Group I (Class 7 · Ananya Sharma) · 1 Assessment Mode", "🌱 ग्रुप I (कक्षा 7वीं · अनन्या शर्मा) लोड हुआ · 1 असेसमेंट मोड"));
    this.go("home");
  },

  async handleDemoGroup2() {
    try {
      const res = await fetch("api/auth?action=demo_group2", { method: "POST" });
      const data = await res.json();
      if (data && data.success) {
        this.state.auth = data.auth;
        this.state.profile = { ...this.state.profile, ...data.profile };
        this.state.completedTiers = ["tier1_riasec", "tier2_tamanna"];
        this.state.traitScores = data.traitScores?.all || { R: 88, I: 85, E: 68, C: 55, S: 50, A: 44, spatial: 90, numerical: 86, logical: 84, mechanical: 82, perceptual: 76, verbal: 72, language: 70 };
        this.state.savedCareers = data.savedCareers || ["robotics_engineer", "aerospace_engineer", "data_scientist"];
        this.state.authModalOpen = false;
        this.save();
        this.toast(this.t("🧭 Loaded Group II (Class 10 · Rohan Verma) · 2 Assessments Mode", "🧭 ग्रुप II (कक्षा 10वीं · रोहन वर्मा) लोड हुआ · 2 असेसमेंट मोड"));
        this.go("home");
        return;
      }
    } catch (_) {}

    this.state.auth = { id: "usr_demo_group2", name: "Rohan Verma", email: "rohan.class10@careermarg.org", role: "student", grade: "10" };
    this.state.profile = { name: "Rohan Verma", grade: "10", educationLevel: "class_10", school: "Delhi Public School", city: "New Delhi", stream: "science_pcm", workStyle: "analytical", aspiration: "Interested in Engineering and Aerospace" };
    this.state.completedTiers = ["tier1_riasec", "tier2_tamanna"];
    this.state.traitScores = { R: 88, I: 85, E: 68, C: 55, S: 50, A: 44, spatial: 90, numerical: 86, logical: 84, mechanical: 82, perceptual: 76, verbal: 72, language: 70, TAMANNA_SA: 90, TAMANNA_NA: 86, TAMANNA_AR: 84, TAMANNA_MA: 82, TAMANNA_PA: 76, TAMANNA_VA: 72, TAMANNA_LA: 70 };
    this.state.savedCareers = ["robotics_engineer", "aerospace_engineer", "data_scientist"];
    this.state.authModalOpen = false;
    this.save();
    this.toast(this.t("🧭 Loaded Group II (Class 10 · Rohan Verma) · 2 Assessments Mode", "🧭 ग्रुप II (कक्षा 10वीं · रोहन वर्मा) लोड हुआ · 2 असेसमेंट मोड"));
    this.go("home");
  },

  async handleDemoGroup3() {
    try {
      const res = await fetch("api/auth?action=demo_group3", { method: "POST" });
      const data = await res.json();
      if (data && data.success) {
        this.state.auth = data.auth;
        this.state.profile = { ...this.state.profile, ...data.profile };
        this.state.completedTiers = ["tier1_riasec", "tier2_tamanna", "tier3_ocean"];
        this.state.traitScores = data.traitScores?.all || { E: 90, S: 86, C: 78, I: 72, A: 60, R: 45, verbal: 92, language: 88, logical: 85, numerical: 82, perceptual: 80, spatial: 70, mechanical: 65, O: 88, C: 86, E: 84, A: 85, N: 25 };
        this.state.savedCareers = data.savedCareers || ["investment_banker", "management_consultant", "chartered_accountant"];
        this.state.authModalOpen = false;
        this.save();
        this.toast(this.t("🎓 Loaded Group III (Class 12 · Priya Patel) · 3 Assessments Mode", "🎓 ग्रुप III (कक्षा 12वीं · प्रिया पटेल) लोड हुआ · 3 असेसमेंट मोड"));
        this.go("home");
        return;
      }
    } catch (_) {}

    this.state.auth = { id: "usr_demo_group3", name: "Priya Patel", email: "priya.class12@careermarg.org", role: "student", grade: "12" };
    this.state.profile = { name: "Priya Patel", grade: "12", educationLevel: "class_12", school: "St. Xavier's Senior Secondary School", city: "Mumbai", stream: "commerce_maths", workStyle: "collaborative", aspiration: "Aspiring to pursue Finance & Management" };
    this.state.completedTiers = ["tier1_riasec", "tier2_tamanna", "tier3_ocean"];
    this.state.traitScores = { E: 90, S: 86, C: 78, I: 72, A: 60, R: 45, verbal: 92, language: 88, logical: 85, numerical: 82, perceptual: 80, spatial: 70, mechanical: 65, TAMANNA_VA: 92, TAMANNA_LA: 88, TAMANNA_AR: 85, TAMANNA_NA: 82, TAMANNA_PA: 80, TAMANNA_SA: 70, TAMANNA_MA: 65, OCEAN_O: 88, OCEAN_C: 86, OCEAN_E: 84, OCEAN_A: 85, OCEAN_N: 25 };
    this.state.savedCareers = ["investment_banker", "management_consultant", "chartered_accountant"];
    this.state.authModalOpen = false;
    this.save();
    this.toast(this.t("🎓 Loaded Group III (Class 12 · Priya Patel) · 3 Assessments Mode", "🎓 ग्रुप III (कक्षा 12वीं · प्रिया पटेल) लोड हुआ · 3 असेसमेंट मोड"));
    this.go("home");
  },

  async handleDemoAdmin() {
    try {
      const res = await fetch("api/auth?action=demo_admin", { method: "POST" });
      const data = await res.json();
      if (data && data.success) {
        this.state.auth = data.auth;
        this.state.profile = {
          name: data.auth.name,
          email: data.auth.email,
          role: "school_admin",
          school: "Career Development & Guidance Cell (Central)",
          city: "New Delhi",
          grade: "CDGC Admin"
        };
        this.state.authModalOpen = false;
        this.save();
        this.toast(this.t(`⚡ Welcome CDGC Admin ${data.auth.name}! Opening Admin Dashboard...`, `⚡ स्वागत है एडमिन ${data.auth.name}! एडमिन डैशबोर्ड खुल रहा है...`));
        await this.loadCounselorDashboard();
        this.go("counselor");
        return;
      }
    } catch (_) {}

    this.state.auth = {
      id: "admin_demo",
      name: "Dr. Sunita Rao",
      email: "admin@careermarg.org",
      role: "school_admin",
      grade: "CDGC Admin"
    };
    this.state.profile = {
      name: "Dr. Sunita Rao",
      email: "admin@careermarg.org",
      role: "school_admin",
      school: "Career Development & Guidance Cell (Central)",
      city: "New Delhi",
      grade: "CDGC Admin"
    };
    this.state.authModalOpen = false;
    this.save();
    this.toast(this.t("⚡ Signed in as Dr. Sunita Rao (CDGC Guidance Admin)", "⚡ डॉ. सुनीता राव (सीडीजीसी गाइडेंस एडमिन) के रूप में साइन इन"));
    this.loadCounselorDashboard();
    this.go("counselor");
  },

  handleDemoCounselorLogin() {
    return this.handleDemoAdmin();
  },

  handleDemoLogin() {
    return this.handleDemoGroup2();
  },

  go(route) {
    if (location.hash === "#" + route) {
      this.onHash();
    } else {
      location.hash = route;
    }
  },

  t(en, hi) {
    return this.state.lang === "hi" ? hi : en;
  },

  toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  },

  toggleLang() {
    if (this.state.route === "onboarding") this.syncOnboardingFields();
    this.state.lang = this.state.lang === "en" ? "hi" : "en";
    this.save();
    this.render();
  },

  initials() {
    const n = (this.state.profile.name || "S").trim();
    return n
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  },

  getEducationLevelMeta(levelId) {
    const list = window.DISHA_DATA?.educationLevels || [];
    const found = list.find((e) => e.id === levelId || (levelId && e.id === "class_" + levelId) || (levelId && e.grade === String(levelId)));
    if (found) return found;
    return {
      id: "class_10",
      grade: "10",
      label: "Class 10th (Stream Choice)",
      hi: "कक्षा 10वीं (स्ट्रीम चयन)",
      group: "group_2",
      stage: "Exploration Stage",
      stageHi: "एक्सप्लोरेशन स्टेज (कक्षा 9–10)",
      type: "school",
    };
  },

  getStudentStageInfo(customGrade) {
    const rawG = String(customGrade || this.state.profile?.grade || this.state.auth?.grade || "10");
    const num = parseInt(rawG.replace("class_", ""), 10) || 10;
    
    let groupKey = "group_2";
    if (num >= 6 && num <= 8) {
      groupKey = "group_1";
    } else if (num >= 9 && num <= 10) {
      groupKey = "group_2";
    } else {
      groupKey = "group_3";
    }

    const groupDef = (window.DISHA_DATA?.studentGroups && window.DISHA_DATA.studentGroups[groupKey]) || {
      groupNo: "Group II",
      classesLabel: "Classes 9–10",
      classesLabelHi: "कक्षा 9–10",
      stage: "Exploration Stage",
      stageHi: "एक्सप्लोरेशन स्टेज (अन्वेषण स्तर)",
      stageColor: "var(--teal)",
      stageBg: "rgba(45, 212, 191, 0.16)",
      badgeIcon: "🧭",
      assessmentTitle: "Interest Inventory + Aptitude Test",
      assessmentTitleHi: "रुचि इन्वेंटरी + अभिक्षमता परीक्षण",
      focus: "Combines interests with cognitive strengths to scientifically guide 11th–12th stream selection.",
      focusHi: "कक्षा 11-12 में सही स्ट्रीम (साइंस, कॉमर्स, आर्ट्स) चयन के लिए रुचि और वास्तविक संज्ञानात्मक क्षमताओं का संयुक्त मूल्यांकन।",
      requiredAssessments: ["tier1_riasec", "tier2_tamanna"],
      reportTitle: "Level 1 (Interest) + Level 2 (Aptitude & Stream) Report",
      reportTitleHi: "लेवल 1 (रुचि) + लेवल 2 (अभिक्षमता एवं स्ट्रीम चयन) रिपोर्ट"
    };

    return {
      ...groupDef,
      groupKey,
      gradeNum: num,
      gradeDisplay: `Class ${num}th`,
      gradeDisplayHi: `कक्षा ${num}वीं`,
      levelNumber: groupKey === "group_1" ? 1 : groupKey === "group_2" ? 2 : 3,
      totalQuests: (groupDef.requiredAssessments || []).length,
      totalAssessments: (groupDef.requiredAssessments || []).length,
    };
  },

  formatEducation(p = {}) {
    const isHi = this.state.lang === "hi";
    const lvl = this.getEducationLevelMeta(p.educationLevel || p.grade);
    const lvlName = isHi ? lvl.hi : lvl.label;
    const isHigherEd = lvl.type === "college";
    const statusText = isHigherEd ? (p.educationStatus === "completed" ? (isHi ? "उत्तीर्ण" : "Completed") : (isHi ? "अध्ययनरत" : "Pursuing")) : "";
    return `${lvlName}${statusText ? ` · ${statusText}` : ""}`;
  },

  getRoleModelArchetype(archId) {
    const list = window.DISHA_DATA?.roleModelArchetypes || [];
    return list.find((a) => a.id === archId) || list[0];
  },

  profilePercent() {
    const p = this.state.profile || {};
    let pts = 0;
    // 1. Name provided: 15%
    if ((p.name || "").trim()) pts += 15;
    // 2. Education level selected: 15%
    if ((p.educationLevel || p.grade || "").trim()) pts += 15;
    // 3. Institution (School/College): 15%
    if ((p.school || "").trim()) pts += 15;
    // 4. Role model quiz / Aspiration: 25%
    if ((p.aspiration || "").trim() || (p.roleModelArchetype && ((p.roleModelName || "").trim() || (p.dreamImpact || "").trim()))) pts += 25;
    // 5. Interest Tags (>=2 tags gives 15%, 1 tag gives 10%): 15%
    if (Array.isArray(p.interestTags)) {
      if (p.interestTags.length >= 2) pts += 15;
      else if (p.interestTags.length === 1) pts += 10;
    }
    // 6. Superpower / Work Style or City / Stream: 15%
    if ((p.workStyle || "").trim() || (p.city || "").trim() || ((p.stream || "").trim() && p.stream !== "general")) {
      pts += 15;
    }
    return Math.min(100, pts);
  },

  profileReady() {
    return this.profilePercent() === 100;
  },

  tierProgress(tierId) {
    const questions = (window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === tierId);
    const total = questions.length || (tierId === "tier1_riasec" ? 42 : tierId === "tier2_tamanna" ? 28 : tierId === "tier3_ocean" ? 20 : 12);
    const answered = questions.filter((q) => this.state.tierAnswers[q.id] !== undefined).length;
    const isCompletedFlag = (this.state.completedTiers || []).includes(tierId);
    const done = isCompletedFlag || (answered === total && total > 0);
    const pct = done ? 100 : Math.round((answered / total) * 100);
    return { total, answered, pct, done };
  },

  allQuestsDone() {
    return (
      this.profileReady() &&
      this.tierProgress("tier1_riasec").done &&
      this.tierProgress("tier2_tamanna").done &&
      this.tierProgress("tier3_ocean").done &&
      this.tierProgress("mental_health").done
    );
  },

  riasecDone() {
    return this.tierProgress("tier1_riasec").done;
  },

  aptitudeDone() {
    return this.tierProgress("tier2_tamanna").done;
  },

  matches() {
    const computed = (window.MoineeScore && window.DISHA_ALL_QUESTIONS)
      ? MoineeScore.scoreAllTiers(this.state.tierAnswers, window.DISHA_ALL_QUESTIONS)
      : {};
    const scores = (computed.traits && Object.keys(computed.traits).length > 0)
      ? computed.traits
      : this.state.traitScores || {};

    return MoineeScore.matchCareers(
      {
        ...this.state.profile,
        traitScores: scores,
        completedTiers: this.state.completedTiers,
        riasec: this.state.riasec,
        aptitude: this.state.aptitude,
      },
      window.DISHA_CAREER_DATABASE || window.DISHA_DATA?.careers || []
    );
  },

  isSaved(id) {
    return (this.state.savedCareers || []).includes(id);
  },

  toggleSave(id) {
    const list = this.state.savedCareers || [];
    this.state.savedCareers = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    this.save();
    this.toast(
      this.isSaved(id)
        ? this.t("Career saved", "करियर सेव हो गया")
        : this.t("Removed from saved", "सेव से हटाया")
    );
    this.render();
  },

  
  
  
  removeSavedCareer(careerId, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!careerId) return;
    const cidStr = String(careerId).trim().toLowerCase();
    const career = this.getCareerById(careerId);

    const matchSet = new Set([cidStr]);
    if (career) {
      if (career.id) matchSet.add(String(career.id).trim().toLowerCase());
      if (career.ncert_id) matchSet.add(String(career.ncert_id).trim().toLowerCase());
    }

    // Filter savedCareers and remove duplicates
    const currentSaved = this.state.savedCareers || [];
    this.state.savedCareers = currentSaved.filter((x) => !matchSet.has(String(x).trim().toLowerCase()));
    
    // Filter compareIds and remove duplicates
    const currentCompare = this.state.compareIds || [];
    this.state.compareIds = currentCompare.filter((x) => !matchSet.has(String(x).trim().toLowerCase()));

    if (matchSet.has(String(this.state.selectedSavedCareerId || "").trim().toLowerCase())) {
      this.state.selectedSavedCareerId = this.state.savedCareers.length > 0 ? this.state.savedCareers[0] : null;
    }

    this.save();
    this.toast(this.t("Career removed from saved vault.", "करियर सेव सूची से हटा दिया गया।"));
    this.render();
  },

  removeFromCompare(id, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const cidStr = String(id).trim().toLowerCase();
    this.state.compareIds = (this.state.compareIds || []).filter(
      (x) => String(x).trim().toLowerCase() !== cidStr
    );
    this.save();
    this.render();
  },

  bookMentorSession(mentorName) {
    this.toast(this.t(
      `🎉 Mentorship request submitted for ${mentorName}! Your session details and preparation roadmap have been registered.`,
      `🎉 ${mentorName} के लिए मेंटरशिप अनुरोध सफलतापूर्वक दर्ज हो गया है! सत्र विवरण आपके प्रोफाइल में अपडेट हो गया है।`
    ));
    this.save();
  },

  finalizeCareer(careerId) {
    if (!careerId) return;
    const career = this.getCareerById(careerId);
    const isHi = this.state.lang === "hi";
    const title = career ? (isHi ? (career.hi || career.title) : career.title) : careerId;

    // Set as the single finalized saved career in the student's vault and clear other options
    this.state.savedCareers = [careerId];
    this.state.finalizedCareer = careerId;
    this.state.selectedSavedCareerId = careerId;
    this.state.compareIds = [careerId];
    this.save();

    this.toast(this.t(
      `🎯 "${title}" is finalized as your career goal! All other choices removed from your vault.`,
      `🎯 "${title}" को आपके मुख्य लक्ष्य के रूप में फाइनल कर दिया गया है! बाकी विकल्प हटा दिए गए हैं।`
    ));

    // Open Roadmap & Mentors modal for this single finalized career
    this.openSavedModal(careerId);
  },

  openSavedModal(careerId = null) {
    const list = this.state.savedCareers || [];
    this.state.savedModalOpen = true;
    this.state.selectedSavedCareerId = careerId || (list.length > 0 ? list[0] : null);
    this.render();
  },

  closeSavedModal() {
    this.state.savedModalOpen = false;
    this.render();
  },

      getIndustryMentorsForCareer(career) {
    if (!career) return [];
    const sec = (career.sectorId || career.sector || "").toLowerCase();
    const id = (career.id || "").toLowerCase();
    const title = (career.title || "").toLowerCase();

    if (id.includes("java") || id.includes("developer") || id.includes("software") || id.includes("backend") || title.includes("java") || title.includes("developer") || title.includes("software")) {
      return [
        {
          name: "Rohit Verma",
          nameHi: "रोहित वर्मा",
          avatar: "👨‍💻",
          company: "Senior Principal Java Architect @ AWS / Ex-Oracle",
          companyHi: "सीनियर प्रिंसिपल जावा आर्किटेक्ट @ AWS / पूर्व-ओरेकल",
          exp: "14+ Years Experience",
          expHi: "14+ वर्ष का उद्योग अनुभव",
          specialty: "High-Throughput Microservices, Spring Boot 3, Kafka & JVM Tuning",
          specialtyHi: "स्प्रिंग बूट 3, काफ्का एवं हाई-थ्रूपुट जेवीएम ट्यूनिंग",
          availability: "Available for 1:1 Code Review & System Design Mentorship",
          availabilityHi: "1:1 कोड रिव्यू व सिस्टम डिज़ाइन मेंटरशिप हेतु उपलब्ध"
        },
        {
          name: "Ananya Deshmukh",
          nameHi: "अनन्या देशमुख",
          avatar: "👩‍💻",
          company: "Staff Software Engineer @ Google Cloud",
          companyHi: "स्टाफ सॉफ्टवेयर इंजीनियर @ गूगल क्लाउड",
          exp: "11+ Years Experience",
          expHi: "11+ वर्ष का उद्योग अनुभव",
          specialty: "Distributed Systems, Kubernetes Orchestration & Cloud Native APIs",
          specialtyHi: "डिस्ट्रीब्यूटेड सिस्टम्स, कुबरनेट्स व क्लाउड नेटिव एपीआई",
          availability: "Available for Architecture Guidance & Mock Tech Interviews",
          availabilityHi: "आर्किटेक्चर गाइडेंस व मॉक इंटरव्यू हेतु उपलब्ध"
        },
        {
          name: "Vikramaditya Sharma",
          nameHi: "विक्रमादित्य शर्मा",
          avatar: "👨‍🏫",
          company: "VP of Engineering @ Fintech Unicorn / Ex-Goldman Sachs",
          companyHi: "वीपी ऑफ इंजीनियरिंग @ फिनटेक यूनिकॉर्न / पूर्व-गोल्डमैन सैक्स",
          exp: "16+ Years Experience",
          expHi: "16+ वर्ष का उद्योग अनुभव",
          specialty: "Low-Latency Enterprise Banking Systems & Tech Leadership",
          specialtyHi: "लो-लेटेंसी बैंकिंग सिस्टम्स व इंजीनियरिंग लीडरशिप",
          availability: "Available for Senior Career Roadmap & Leadership Mentorship",
          availabilityHi: "सीनियर करियर रोडमैप व टेक लीडरशिप मेंटरशिप"
        }
      ];
    }

    // Default Tech / General Mentors
    return [
      {
        name: "Siddharth Mehta",
        nameHi: "सिद्धार्थ मेहता",
        avatar: "👨‍💼",
        company: "Principal Industry Specialist @ Global Advisory",
        companyHi: "प्रिंसिपल इंडस्ट्री स्पेशलिस्ट @ ग्लोबल एडवाइजरी",
        exp: "12+ Years Experience",
        expHi: "12+ वर्ष का अनुभव",
        specialty: "Domain Architecture, Strategy & Strategic Career Growth",
        specialtyHi: "डोमेन आर्किटेक्चर एवं स्ट्रैटेजिक करियर ग्रोथ",
        availability: "Available for Pathway Guidance",
        availabilityHi: "करियर मार्गदर्शन हेतु उपलब्ध"
      },
      {
        name: "Priyanka Nair",
        nameHi: "प्रियंका नायर",
        avatar: "👩‍💼",
        company: "Senior Practice Lead @ Top Tech Consulting",
        companyHi: "सीनियर प्रैक्टिस लीड @ टॉप कंसल्टिंग",
        exp: "10+ Years Experience",
        expHi: "10+ वर्ष का अनुभव",
        specialty: "Industry Certifications, Interview Prep & Skills Development",
        specialtyHi: "इंडस्ट्री सर्टिफिकेशन व इंटरव्यू तैयारी",
        availability: "Available for Profile Review",
        availabilityHi: "प्रोफाइल रिव्यू हेतु उपलब्ध"
      }
    ];
  },

  getRoleModelsForCareer(career) {
    if (!career) return [];
    const sec = (career.sectorId || career.sector || "").toLowerCase();
    const id = (career.id || "").toLowerCase();
    const title = (career.title || "").toLowerCase();

    // Specific Java / Senior Developer / Software Engineering Mentors
    if (id.includes("java") || id.includes("developer") || id.includes("software") || id.includes("backend") || id.includes("programmer") || title.includes("java") || title.includes("developer") || title.includes("software")) {
      return [
        {
          name: "James Gosling",
          nameHi: "जेम्स गोस्लिंग (James Gosling)",
          icon: "☕",
          tag: "Father of Java Programming & Computing Pioneer",
          tagHi: "जावा प्रोग्रामिंग के जनक एवं कंप्यूटर वैज्ञानिक",
          achievement: "Invented Java at Sun Microsystems in 1995, creating the foundation for modern enterprise backends, cloud architectures, and Android operating system.",
          achievementHi: "1995 में जावा भाषा का आविष्कार किया, जो आज दुनिया भर के बैंकिंग, क्लाउड और एंटरप्राइज सिस्टम्स का मुख्य आधार है।",
          quote: "If you want to build robust software, design simple abstractions and master core data structures and memory models.",
          quoteHi: "मजबूत सॉफ्टवेयर बनाने के लिए सरल एब्सट्रैक्शन डिज़ाइन करें और डेटा स्ट्रक्चर्स व मेमोरी मॉडल्स में पारंगत हों।"
        },
        {
          name: "Sundar Pichai",
          nameHi: "सुंदर पिचाई (Sundar Pichai)",
          icon: "💻",
          tag: "CEO of Alphabet & Google",
          tagHi: "अल्फाबेट व गूगल के मुख्य कार्यकारी अधिकारी",
          achievement: "Led Chrome, Android, Google Cloud engineering, and global software architecture before becoming CEO of Google and Alphabet.",
          achievementHi: "आईआईटी खड़गपुर से निकलकर वैश्विक सॉफ्टवेयर आर्किटेक्चर, एंड्रॉइड और गूगल क्लाउड का नेतृत्व किया।",
          quote: "Wear your failure as a badge of honor. It's important to keep building and follow your engineering curiosity.",
          quoteHi: "असफलता को अपना सम्मान मानकर सीखें। अपनी इंजीनियरिंग जिज्ञासा और सपनों का पीछा करते रहें।"
        },
        {
          name: "Martin Fowler",
          nameHi: "मार्टिन फाउलर (Martin Fowler)",
          icon: "🏛️",
          tag: "Chief Scientist at ThoughtWorks & Software Architecture Authority",
          tagHi: "सॉफ्टवेयर आर्किटेक्चर एवं रिफैक्टरिंग के वैश्विक गुरु",
          achievement: "Authored seminal works on 'Refactoring', 'Patterns of Enterprise Application Architecture', and Microservices architecture.",
          achievementHi: "एंटरप्राइज सॉफ्टवेयर डिजाइन पैटर्न, क्लीन कोड और माइक्रो-सर्विसेज आर्किटेक्चर पर कालजयी पुस्तकें लिखीं।",
          quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
          quoteHi: "कोई भी ऐसा कोड लिख सकता है जिसे कंप्यूटर समझ सके; अच्छा प्रोग्रामर वह है जो ऐसा कोड लिखे जिसे इंसान समझ सकें।"
        },
        {
          name: "Dr. Venkat Subramaniam",
          nameHi: "डॉ. वेंकट सुब्रमण्यम (Venkat Subramaniam)",
          icon: "🌟",
          tag: "Java Champion, Agile Software Architect & Best-Selling Author",
          tagHi: "जावा चैंपियन एवं प्रख्यात सॉफ्टवेयर आर्किटेक्ट",
          achievement: "Mentored tens of thousands of senior Java developers globally, authored numerous best-selling programming books, and won the JavaOne Rockstar award.",
          achievementHi: "दुनिया भर के हजारों सीनियर डेवलपर्स का मार्गदर्शन किया और जावा तथा मॉडर्न प्रोग्रामिंग पर प्रसिद्ध पुस्तकें लिखीं।",
          quote: "Write code as if the person who maintains it is a violent psychopath who knows where you live. Keep it clean and expressive.",
          quoteHi: "कोड को हमेशा स्वच्छ, मॉड्यूलर और समझने में आसान रखें। निरंतर अभ्यास ही आपको एक उत्कृष्ट आर्किटेक्ट बनाता है।"
        }
      ];
    }

    if (id.includes("aero") || id.includes("space") || title.includes("aero") || title.includes("space") || title.includes("satellite")) {
      return [
        {
          name: "Dr. A.P.J. Abdul Kalam",
          nameHi: "डॉ. ए.पी.जे. अब्दुल कलाम",
          icon: "🚀",
          tag: "Missile Man of India & 11th President",
          tagHi: "भारत के मिसाइल मैन एवं पूर्व राष्ट्रपति",
          achievement: "Pioneered India's first SLV-III rocket at ISRO & guided the Pokhran-II nuclear missions. Inspired millions of young minds.",
          achievementHi: "ISRO में भारत के पहले SLV-III रॉकेट का सफल प्रक्षेपण एवं देश के अंतरिक्ष कार्यक्रम की नींव रखी।",
          quote: "Dream is not that which you see while sleeping; it is something that does not let you sleep.",
          quoteHi: "सपने वो नहीं जो हम सोते हुए देखते हैं, सपने वो हैं जो हमें सोने नहीं देते।"
        },
        {
          name: "Kalpana Chawla",
          nameHi: "कल्पना चावला",
          icon: "👩‍🚀",
          tag: "First Indian-born Woman Astronaut",
          tagHi: "अंतरिक्ष में जाने वाली प्रथम भारतीय मूल की महिला",
          achievement: "Aeronautical Engineer & NASA Mission Specialist aboard the Space Shuttle Columbia STS-87 & STS-107.",
          achievementHi: "नासा में वैमानिकी वैज्ञानिक व अंतरिक्ष यात्री, जिन्होंने दुनिया भर की बेटियों को असीम ऊंचाइयों के सपने देखने का हौसला दिया।",
          quote: "The path from dreams to success does exist. May you have the vision to find it.",
          quoteHi: "सपनों से सफलता तक का रास्ता मौजूद है। बस आपको उसे खोजने की दृष्टि और साहस चाहिए।"
        }
      ];
    }

    if (id.includes("robot") || title.includes("robot") || id.includes("ai_") || title.includes("machine learning") || id.includes("data_sci")) {
      return [
        {
          name: "Sundar Pichai",
          nameHi: "सुंदर पिचाई",
          icon: "💻",
          tag: "CEO of Alphabet & Google",
          tagHi: "अल्फाबेट व गूगल के मुख्य कार्यकारी अधिकारी",
          achievement: "Led Chrome, Android, and spearheaded Google's global transformation into an AI-first innovation power.",
          achievementHi: "आईआईटी खड़गपुर से शुरुआत कर वैश्विक तकनीकी क्रांति और कृत्रिम बुद्धिमत्ता (AI) के शिखर पर पहुंचे।",
          quote: "Wear your failure as a badge of honor. It's important to follow your dreams and heart.",
          quoteHi: "असफलता को अपना सम्मान मानकर सीखें। अपने दिल की आवाज़ और सपनों का पीछा करना सबसे ज़रूरी है।"
        },
        {
          name: "Marc Raibert",
          nameHi: "मार्क रायबर्ट",
          icon: "🤖",
          tag: "Founder & Pioneer, Boston Dynamics",
          tagHi: "बोस्टन डायनामिक्स के संस्थापक एवं रोबोटिक्स गुरु",
          achievement: "Created world's most advanced dynamic robots (Spot, Atlas) revolutionizing modern robotics & mechanics.",
          achievementHi: "दुनिया के सबसे उन्नत और फुर्तीले रोबोट्स का निर्माण कर ऑटोमेशन की दुनिया बदल दी।",
          quote: "Build things that surprise people with what technology is truly capable of accomplishing.",
          quoteHi: "ऐसी तकनीक बनाएं जो दुनिया को दिखाए कि इंसान की कल्पना क्या कुछ संभव कर सकती है।"
        }
      ];
    }

    if (sec === "healthcare" || sec === "medicine" || id.includes("doctor") || id.includes("surgeon") || id.includes("cardio")) {
      return [
        {
          name: "Dr. Devi Prasad Shetty",
          nameHi: "डॉ. देवी प्रसाद शेट्टी",
          icon: "🩺",
          tag: "Founder of Narayana Health & Renowned Cardiac Surgeon",
          tagHi: "नारायणा हेल्थ के संस्थापक एवं विश्वप्रसिद्ध हृदय रोग विशेषज्ञ",
          achievement: "Performed over 15,000 heart surgeries and democratized affordable world-class healthcare for millions.",
          achievementHi: "15,000 से अधिक हार्ट सर्जरी कर गरीब से गरीब व्यक्ति तक उच्च-स्तरीय चिकित्सा सेवा सुलभ बनाई।",
          quote: "A solution isn't a true solution unless it is affordable to the common citizen.",
          quoteHi: "कोई भी इलाज तब तक संपूर्ण नहीं है जब तक वह समाज के हर आम इंसान की पहुंच में न हो।"
        },
        {
          name: "Dr. Christian Barnard",
          nameHi: "डॉ. क्रिश्चियन बर्नार्ड",
          icon: "❤️",
          tag: "Pioneered World's First Human Heart Transplant",
          tagHi: "विश्व के प्रथम मानव हृदय प्रत्यारोपण के शल्य-चिकित्सक",
          achievement: "Created medical history by performing the first successful human-to-human heart transplant.",
          achievementHi: "चिकित्सा विज्ञान में इतिहास रचते हुए पहली बार मानव हृदय का सफल प्रत्यारोपण किया।",
          quote: "The prime goal of medicine is to alleviate suffering and sustain the dignity of human life.",
          quoteHi: "चिकित्सा का सर्वोच्च लक्ष्य मानव जीवन के दर्द को मिटाना और उसकी गरिमा को बनाए रखना है।"
        }
      ];
    }

    if (sec === "engineering" || id.includes("civil") || id.includes("mech") || id.includes("electr")) {
      return [
        {
          name: "Sir M. Visvesvaraya",
          nameHi: "सर एम. विश्वेश्वरैया",
          icon: "🏗️",
          tag: "Bharat Ratna & India's Greatest Civil Engineer",
          tagHi: "भारत रत्न एवं देश के महानतम इंजीनियर",
          achievement: "Engineered the Krishna Raja Sagara dam, flood protection systems, and modern industrial infrastructure.",
          achievementHi: "कृष्ण राज सागर बांध, ऑटोमैटिक फ्लडगेट्स और आधुनिक औद्योगिक भारत की नींव रखने वाले महान वास्तुकार।",
          quote: "Remember, your work may be only to sweep a railway crossing, but sweep it so that no one in the world could sweep it better.",
          quoteHi: "आपका काम चाहे जो भी हो, उसे इतनी पूर्णता और निष्ठा से करें कि दुनिया में कोई आपसे बेहतर न कर सके।"
        },
        {
          name: "E. Sreedharan",
          nameHi: "ई. श्रीधरन",
          icon: "🚇",
          tag: "The 'Metro Man' of India",
          tagHi: "भारत के 'मेट्रो मैन'",
          achievement: "Pioneered Konkan Railway and Delhi Metro ahead of schedule with zero corruption and supreme engineering precision.",
          achievementHi: "कोंकण रेलवे और दिल्ली मेट्रो जैसे असंभव प्रोजेक्ट्स को तय समय से पहले पूरा कर मिसाल कायम की।",
          quote: "Right values, strict punctuality, and unwavering integrity make every massive obstacle possible.",
          quoteHi: "सटीक समयबद्धता, सत्यनिष्ठा और नैतिक मूल्य हर विशाल चुनौती को संभव बना देते हैं।"
        }
      ];
    }

    if (sec === "business" || sec === "finance" || id.includes("entrepreneur") || id.includes("manager") || id.includes("chartered")) {
      return [
        {
          name: "Ratan Naval Tata",
          nameHi: "रतन नवल टाटा",
          icon: "💼",
          tag: "Visionary Industrialist & Legendary Philanthropist",
          tagHi: "दूरदर्शी उद्योगपति एवं समाज-सेवी महानायक",
          achievement: "Transformed Tata Group into a global powerhouse (Tetley, JLR, TCS) while giving 65%+ profits back to public welfare.",
          achievementHi: "टाटा समूह को वैश्विक पहचान दिलाई और अपनी संपत्ति का 65% से अधिक हिस्सा राष्ट्र निर्माण व शिक्षा में दान किया।",
          quote: "I don't believe in taking right decisions. I take decisions and then make them right.",
          quoteHi: "मैं सही फैसले लेने में विश्वास नहीं रखता, मैं फैसले लेता हूँ और फिर उन्हें अपनी मेहनत से सही साबित करता हूँ।"
        },
        {
          name: "Kumar Mangalam Birla",
          nameHi: "कुमार मंगलम बिड़ला",
          icon: "📊",
          tag: "Chartered Accountant & Chairman, Aditya Birla Group",
          tagHi: "चार्टर्ड अकाउंटेंट एवं अध्यक्ष, आदित्य बिड़ला समूह",
          achievement: "Leveraged deep Chartered Accountancy mastery to build a $60+ Billion global business empire across 36 countries.",
          achievementHi: "सीए की वित्तीय समझ और रणनीतिक नेतृत्व से 36 देशों में फैले वैश्विक व्यापारिक साम्राज्य का निर्माण किया।",
          quote: "Failure is not fatal. It is the courage to continue through calculated risk that defines greatness.",
          quoteHi: "असफलता कभी अंत नहीं होती। समझदारी से जोखिम उठाकर आगे बढ़ते रहने का साहस ही सफलता दिलाता है।"
        }
      ];
    }

    if (sec === "arts_design" || sec === "media" || id.includes("design") || id.includes("anim") || id.includes("writer")) {
      return [
        {
          name: "Sir Jony Ive",
          nameHi: "सर जॉनी आईव",
          icon: "🎨",
          tag: "Legendary Industrial & Product Designer (Apple)",
          tagHi: "विश्वप्रसिद्ध उत्पाद एवं डिजाइन प्रमुख (एप्पल)",
          achievement: "Designed the iconic iPhone, iMac, iPod, and iPad, blending artistic minimalism with intuitive functional elegance.",
          achievementHi: "आईफोन, आईमैक और आईपैड का डिजाइन तैयार कर पूरी दुनिया में डिजिटल कला व उपयोगिता की परिभाषा बदल दी।",
          quote: "Simplicity isn't just the visual lack of clutter; it's about deeply understanding the purpose of an object.",
          quoteHi: "सादगी सिर्फ खाली जगह नहीं है, यह किसी वस्तु के मूल उद्देश्य को गहराई से समझने की कला है।"
        },
        {
          name: "B. V. Doshi",
          nameHi: "बालकृष्ण विट्ठलदास दोशी",
          icon: "🏛️",
          tag: "First Indian Pritzker Architecture Prize Laureate",
          tagHi: "भारत के प्रथम प्रित्जकर वास्तुकला पुरस्कार विजेता",
          achievement: "Mastered sustainable, people-centric Indian architectural heritage and built institutions like CEPT & IIM Bangalore.",
          achievementHi: "CEPT और IIM बैंगलोर जैसी कालजयी इमारतों का निर्माण कर भारतीय वास्तुकला को वैश्विक ख्याति दिलाई।",
          quote: "Architecture is not just about buildings; it is a celebration of life, climate, and human culture.",
          quoteHi: "वास्तुकला केवल इमारतें नहीं है, यह जीवन, प्रकृति और मानव संस्कृति का उत्सव है।"
        }
      ];
    }

    if (sec === "law_justice" || sec === "civil_services" || id.includes("advocate") || id.includes("judge") || id.includes("ias") || id.includes("ips")) {
      return [
        {
          name: "Dr. B. R. Ambedkar",
          nameHi: "डॉ. बी. आर. अम्बेडकर",
          icon: "⚖️",
          tag: "Chief Architect of the Indian Constitution & Jurist",
          tagHi: "भारतीय संविधान के मुख्य निर्माता एवं महान न्यायविद",
          achievement: "Mastered law and economics across Columbia and LSE to establish foundational civil rights and constitutional justice.",
          achievementHi: "विश्व के सबसे बड़े लोकतंत्र के संविधान की रचना कर न्याय, समानता और मौलिक अधिकारों की रक्षा की।",
          quote: "Cultivation of mind should be the ultimate aim of human existence. Educate, Agitate, Organise!",
          quoteHi: "मन का विकास मानव अस्तित्व का अंतिम लक्ष्य होना चाहिए। शिक्षित बनो, संगठित रहो, संघर्ष करो!"
        },
        {
          name: "Kiran Bedi",
          nameHi: "किरण बेदी",
          icon: "👮‍♀️",
          tag: "First Woman IPS Officer of India",
          tagHi: "भारत की प्रथम महिला आईपीएस अधिकारी",
          achievement: "Revolutionized prison reforms, police administration, and women's empowerment with fearless integrity.",
          achievementHi: "तिहाड़ जेल सुधारों और कर्तव्यनिष्ठ पुलिस सेवा से प्रशासनिक सुधारों का वैश्विक इतिहास रचा।",
          quote: "What you have done is history. What you will do is your future. Focus on the possibilities.",
          quoteHi: "जो आप कर चुके हैं वो इतिहास है, जो आप करेंगे वो भविष्य है। संभावनाओं पर ध्यान केंद्रित करें।"
        }
      ];
    }

    if (sec === "agriculture" || id.includes("agri") || id.includes("food") || id.includes("farm")) {
      return [
        {
          name: "Dr. M. S. Swaminathan",
          nameHi: "डॉ. एम. एस. स्वामीनाथन",
          icon: "🌾",
          tag: "Father of Indian Green Revolution (Bharat Ratna)",
          tagHi: "भारतीय हरित क्रांति के जनक (भारत रत्न)",
          achievement: "Introduced high-yielding crop varieties and agricultural science making India self-sufficient in food security.",
          achievementHi: "कृषि विज्ञान के जरिए देश को भुखमरी से उबारकर आत्मनिर्भर और खाद्यान्न सुरक्षा का वैश्विक स्तंभ बनाया।",
          quote: "If agriculture fails, everything else will fail. Science must directly serve the farmer in the field.",
          quoteHi: "यदि कृषि असफल होती है, तो सब कुछ विफल हो जाएगा। विज्ञान को सीधे खेत और किसान की सेवा करनी चाहिए।"
        }
      ];
    }

    // Default universal inspiring leaders
    return [
      {
        name: "Dr. A.P.J. Abdul Kalam",
        nameHi: "डॉ. ए.पी.जे. अब्दुल कलाम",
        icon: "🌟",
        tag: "Great Scientist & National Inspiration",
        tagHi: "महान वैज्ञानिक एवं राष्ट्र के मार्गदर्शक",
        achievement: "Rose from humble beginnings in Rameswaram to lead India's satellite and missile programs with relentless dedication.",
        achievementHi: "कठिन परिस्थितियों से निकलकर अपनी लगन से भारत को अंतरिक्ष और रक्षा क्षेत्र में महाशक्ति बनाया।",
        quote: "Excellence happens not by accident. It is a process of continuous learning and perseverance.",
        quoteHi: "उत्कृष्टता किसी इत्तेफाक से नहीं मिलती, यह लगातार सीखने और कभी हार न मानने की यात्रा है।"
      },
      {
        name: "Sudha Murty",
        nameHi: "सुधा मूर्ति",
        icon: "📚",
        tag: "Author, Educator & Philanthropist",
        tagHi: "प्रसिद्ध लेखिका, शिक्षाविद एवं समाजसेवी",
        achievement: "First female engineer at TELCO, prolific author in English & Kannada, and pioneered thousands of libraries across schools.",
        achievementHi: "TELCO की प्रथम महिला इंजीनियर बनकर रूढ़ियों को तोड़ा और लाखों विद्यार्थियों तक शिक्षा व पुस्तकें पहुंचाईं।",
        quote: "Confidence comes from knowledge and hard work. Never let anyone tell you what you cannot achieve.",
        quoteHi: "आत्मविश्वास ज्ञान और कठोर परिश्रम से आता है। किसी को यह तय न करने दें कि आप क्या नहीं कर सकते।"
      }
    ];
  },

    getCareerRoadmap(career) {
    if (!career) return [];
    if (Array.isArray(career.roadmap) && career.roadmap.length > 0) {
      return career.roadmap;
    }
    const sec = (career.sectorId || career.sector || "").toLowerCase();
    const id = (career.id || "").toLowerCase();
    const title = (career.title || "").toLowerCase();
    const minSal = career.minSalaryLpa || career.min_salary_lpa || 12.0;
    const maxSal = career.maxSalaryLpa || career.max_salary_lpa || 38.0;
    const edu = career.requiredEducation || career.required_education || "Bachelor's / Master's / Postgraduate in CS/IT";
    const eduHi = career.requiredEducationHi || career.required_education_hi || "कंप्यूटर साइंस / आईटी में स्नातक / स्नातकोत्तर (PG)";
    const exams = Array.isArray(career.entranceExams) ? career.entranceExams : (typeof career.entranceExams === 'string' ? JSON.parse(career.entranceExams || '[]') : []);

    if (id.includes("java") || id.includes("developer") || id.includes("software") || title.includes("developer") || title.includes("java")) {
      return [
        {
          step: 1,
          title: "Advanced Core Java & Concurrency Mastery",
          titleHi: "उन्नत कोर जावा व समवर्ती प्रोग्रामिंग (Core Java & Concurrency)",
          icon: "☕",
          desc: "Master OOP principles, Java 17/21 LTS features, JVM internals, garbage collection tuning, multithreading, concurrency APIs, and memory management.",
          descHi: "जावा 17/21 के नए फीचर्स, जेवीएम मेमोरी मैनेजमेंट, मल्टीथ्रेडिंग और डेटा स्ट्रक्चर्स में महारत हासिल करें।"
        },
        {
          step: 2,
          title: "Spring Boot 3, Microservices & REST/gRPC",
          titleHi: "स्प्रिंग बूट 3, माइक्रो-सर्विसेज एवं एपीआई आर्किटेक्चर",
          icon: "🌱",
          desc: "Build robust microservices using Spring Boot 3, Spring Data JPA/Hibernate, Spring Security (OAuth2/JWT), RESTful APIs, and gRPC communication.",
          descHi: "स्प्रिंग बूट 3, स्प्रिंग सिक्योरिटी, डेटाबेस ओआरएम और माइक्रो-सर्विसेज के साथ स्केलेबल एपीआई बनाएं।"
        },
        {
          step: 3,
          title: "Distributed Messaging, Caching & Databases",
          titleHi: "डिस्ट्रीब्यूटेड मैसेजिंग, कैशिंग एवं डेटाबेस डिज़ाइन",
          icon: "⚡",
          desc: "Integrate event-driven architectures with Apache Kafka / RabbitMQ, ultra-fast caching with Redis, and optimize SQL (PostgreSQL) and NoSQL (MongoDB/Cassandra).",
          descHi: "अपाचे काफ्का से इवेंट-ड्रिवन सिस्टम, रेडिस कैशिंग और हाई-परफॉर्मेंस एसक्यूएल/नो-एसक्यूएल डेटाबेस ऑप्टिमाइज़ेशन करें।"
        },
        {
          step: 4,
          title: "Cloud Native, Docker, Kubernetes & CI/CD",
          titleHi: "क्लाउड नेटिव, डॉकर, कुबरनेट्स व स्वचालित परिनियोजन (DevOps)",
          icon: "🐳",
          desc: "Containerize applications with Docker, orchestrate microservices with Kubernetes on AWS (EKS/ECS) / GCP, and automate CI/CD pipelines via GitHub Actions.",
          descHi: "डॉकर कंटेनर्स, कुबरनेट्स क्लस्टर्स और एडब्ल्यूएस क्लाउड पर ऑटोमेटेड सीआई/सीडी पाइपलाइन तैयार करें।"
        },
        {
          step: 5,
          title: "System Design, Scalability & Tech Leadership",
          titleHi: "सिस्टम डिज़ाइन, स्केलेबिलिटी एवं सीनियर इंजीनियरिंग लीडरशिप",
          icon: "🚀",
          desc: "Master Low-Level Design (LLD) & High-Level Design (HLD), architect fault-tolerant systems handling millions of queries per second, and lead senior developer teams.",
          descHi: "लाखों यूजर्स के लिए फॉल्ट-टॉलरेंट हाई-लेवल सिस्टम डिजाइन करें और टेक लीड/सीनियर आर्किटेक्ट के रूप में इंजीनियरिंग टीम का मार्गदर्शन करें।"
        }
      ];
    }

    let streamRec = "Science (PCM / PCB)";
    let streamRecHi = "विज्ञान वर्ग (गणित / जीवविज्ञान)";
    if (sec === "business" || sec === "finance") {
      streamRec = "Commerce with Mathematics or Economics";
      streamRecHi = "वाणिज्य वर्ग (गणित / अर्थशास्त्र के साथ)";
    } else if (sec === "arts_design" || sec === "media" || sec === "law_justice") {
      streamRec = "Humanities / Arts or Any Stream";
      streamRecHi = "मानविकी / कला या किसी भी वर्ग से 11वीं-12वीं";
    }

    const examStr = exams.length > 0 ? exams.join(", ") : "National & State Level Entrance Exams (CUET / Specialized Tests)";

    return [
      {
        step: 1,
        title: "Class 10 & 11-12 Stream Selection",
        titleHi: "कक्षा 10 के बाद 11वीं-12वीं वर्ग का चयन",
        icon: "🎒",
        desc: `Recommended Stream: ${streamRec}. Focus on core foundational subjects with 75%+ score to keep top college options open.`,
        descHi: `सुझाया गया वर्ग: ${streamRecHi}। मुख्य विषयों में 75%+ अंक बनाए रखें ताकि उच्च शिक्षण संस्थानों के द्वार खुले रहें।`
      },
      {
        step: 2,
        title: "Target Entrance Exams & Preparation",
        titleHi: "प्रमुख प्रवेश परीक्षाएं व तैयारी",
        icon: "📝",
        desc: `Key Exams to Target: ${examStr}. Practice mock test papers, NCERT fundamentals, and time-management strategies in Class 11-12.`,
        descHi: `लक्षित प्रवेश परीक्षाएं: ${examStr}। 11वीं-12वीं के दौरान पिछले वर्षों के प्रश्न-पत्र हल करें और समय प्रबंधन पर काम करें।`
      },
      {
        step: 3,
        title: "Undergraduate Degree & Top College",
        titleHi: "स्नातक डिग्री एवं शीर्ष कॉलेज",
        icon: "🏛️",
        desc: `Pursue ${edu} from top government or accredited universities (IITs, NITs, AIIMS, IIMs, Central Universities, NIDs).`,
        descHi: `${eduHi} के लिए प्रतिष्ठित संस्थानों और मान्यता प्राप्त विश्वविद्यालयों में प्रवेश लें।`
      },
      {
        step: 4,
        title: "Hands-on Projects, Certifications & Internships",
        titleHi: "व्यावहारिक प्रोजेक्ट्स, सर्टिफिकेशन व इंटर्नशिप",
        icon: "💼",
        desc: "Build real-world portfolios, complete 2-3 industry internships, obtain specialized credentials, and join student clubs.",
        descHi: "कॉलेज के दौरान 2-3 लाइव इंटर्नशिप करें, उद्योग-संबंधित टूल्स सीखें और व्यावहारिक प्रोजेक्ट्स का पोर्टफोलियो बनाएं।"
      },
      {
        step: 5,
        title: "Career Launch & Salary Progression",
        titleHi: "करियर की शुरुआत और वेतन प्रगति",
        icon: "🚀",
        desc: `Entry level starts around ₹${minSal} LPA, scaling to ₹${maxSal}+ LPA within 4-7 years as Senior Specialist / Team Lead / Founder.`,
        descHi: `शुरुआती स्तर पर ₹${minSal} LPA से शुरुआत, जो 4-7 वर्षों के अनुभव के बाद ₹${maxSal}+ LPA तक पहुंचता है।`
      }
    ];
  },

  savedCareersModalHtml() {
    const isOpen = this.state.savedModalOpen;
    const isHi = this.state.lang === "hi";
    const savedIds = this.state.savedCareers || [];
    // Deduplicate saved IDs and resolve careers safely
    const uniqueSavedIds = Array.from(new Set(savedIds));
    const savedList = uniqueSavedIds
      .map(id => {
        const c = this.getCareerById(id);
        if (!c) return null;
        return { ...c, originalSavedId: id };
      })
      .filter(Boolean);
    const selectedId = this.state.selectedSavedCareerId || (savedList.length > 0 ? (savedList[0].originalSavedId || savedList[0].id) : null);
    const selectedCareer = savedList.find(c => (c.originalSavedId === selectedId || c.id === selectedId)) || (savedList.length > 0 ? savedList[0] : null);

    const roleModels = selectedCareer ? this.getRoleModelsForCareer(selectedCareer) : [];
    const roadmap = selectedCareer ? this.getCareerRoadmap(selectedCareer) : [];
    const mentors = selectedCareer ? this.getIndustryMentorsForCareer(selectedCareer) : [];

    return `
      <div class="saved-modal-backdrop ${isOpen ? "open" : ""}" id="saved-modal-backdrop">
        <div class="saved-modal-card" role="dialog" aria-modal="true" aria-labelledby="saved-modal-title">
          <button class="saved-modal-close-btn" type="button" data-saved-close="1" aria-label="Close">✕</button>
          
          <div class="saved-modal-header">
            <div class="saved-header-badge">⭐ ${this.t("My Saved Career Vault & Roadmap", "मेरी सेव की गई करियर तिजोरी एवं संपूर्ण रोडमैप")}</div>
            <h2 id="saved-modal-title" style="margin:6px 0 2px;font-size:1.4rem;font-weight:800;color:var(--ink);">
              ${this.t("Explore Your Saved Pathways & Role Models", "आपके सहेजे गए करियर, संपूर्ण रोडमैप व दिग्गज रोल मॉडल्स")}
            </h2>
            <p style="margin:0;font-size:0.85rem;color:var(--ink-muted);">
              ${this.t("Detailed step-by-step roadmap from Class 10 to industry leadership with motivating real-world role models.", "कक्षा 10 से लेकर करियर की ऊंचाइयों तक का संपूर्ण रोडमैप और आपको प्रेरित करने वाले वास्तविक रोल मॉडल्स।")}
            </p>
          </div>

          ${savedList.length === 0 ? `
            <div class="saved-empty-state">
              <div style="font-size:3.2rem;margin-bottom:12px;">📌</div>
              <h3 style="font-size:1.2rem;font-weight:700;margin:0 0 6px;">${this.t("No Careers Saved Yet", "अभी तक कोई करियर सेव नहीं किया गया")}</h3>
              <p style="font-size:0.88rem;color:var(--ink-muted);max-width:420px;margin:0 auto 20px;">
                ${this.t("Explore our comprehensive 928+ career library and tap the Bookmark icon ⭐ on any career to see its full roadmap, entrance exams, and inspiring role models here.", "हमारी 928+ करियर लाइब्रेरी देखें और किसी भी करियर पर बुकमार्क ⭐ आइकन दबाएं ताकि उसका पूरा रोडमैप और रोल मॉडल्स यहाँ दिखाई दें।")}
              </p>
              <button class="btn btn-primary" type="button" data-go="explore" data-saved-close="1">
                🔍 ${this.t("Explore 928+ Careers Now", "928+ करियर अभी खोजें")} →
              </button>
            </div>
          ` : `
            <div class="saved-modal-body">
              <!-- SIDEBAR: SAVED CAREER TABS -->
              <div class="saved-sidebar-tabs">
                <div class="saved-sidebar-title">
                  <span>${this.t("SAVED CAREERS", "सेव किए गए करियर")} (${savedList.length})</span>
                </div>
                <div class="saved-tabs-list">
                  ${savedList.map(c => {
                    const isSelected = c.id === (selectedCareer ? selectedCareer.id : "");
                    const title = isHi ? (c.title_hi || c.title) : c.title;
                    const minSal = c.minSalaryLpa || c.min_salary_lpa || 3.5;
                    const maxSal = c.maxSalaryLpa || c.max_salary_lpa || 14.0;
                    return `
                      <div class="saved-tab-item ${isSelected ? "active" : ""}" data-select-saved-career="${c.id}">
                        <div class="saved-tab-left">
                          <span class="saved-tab-icon">${c.icon || "💼"}</span>
                          <div class="saved-tab-info">
                            <div class="saved-tab-name">${title}</div>
                            <div class="saved-tab-salary">₹${minSal} - ₹${maxSal} LPA</div>
                          </div>
                        </div>
                        <button class="saved-tab-remove" type="button" onclick="App.removeSavedCareer('${c.originalSavedId || c.id}', event)" data-remove-saved-career="${c.originalSavedId || c.id}" title="${this.t("Remove", "हटाएं")}">✕</button>
                      </div>
                    `;
                  }).join("")}
                </div>
                ${savedList.length > 1 ? `
                  <button class="btn saved-compare-banner-btn btn-block btn-sm" type="button" data-compare-saved="1" style="margin-top:10px;">
                    ⚖️ ${this.t("Compare Saved Careers", "सेव किए करियर की तुलना करें")} →
                  </button>
                ` : ""}
                <button class="btn btn-secondary btn-block btn-sm" type="button" data-go="explore" data-saved-close="1" style="margin-top:8px;">
                  + ${this.t("Explore More Careers", "और करियर जोड़ें")}
                </button>
              </div>

              <!-- MAIN PANEL: SELECTED CAREER DETAILS & ROADMAP & ROLE MODELS -->
              <div class="saved-main-spotlight">
                ${selectedCareer ? `
                  <!-- CAREER HERO CARD -->
                  <div class="saved-hero-card">
                    <div class="saved-hero-top">
                      <div style="display:flex;align-items:center;gap:12px;">
                        <span style="font-size:2.4rem;">${selectedCareer.icon || "💼"}</span>
                        <div>
                          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                            <span class="badge badge-primary">${selectedCareer.sectorId || selectedCareer.sector || "General"}</span>
                            <span class="badge badge-gold">💰 ₹${selectedCareer.minSalaryLpa || selectedCareer.min_salary_lpa || 3.5} - ₹${selectedCareer.maxSalaryLpa || selectedCareer.max_salary_lpa || 14.0} LPA</span>
                          </div>
                          <h3 style="margin:4px 0 0;font-size:1.35rem;font-weight:800;color:var(--ink);">
                            ${isHi ? (selectedCareer.title_hi || selectedCareer.title) : selectedCareer.title}
                          </h3>
                        </div>
                      </div>
                      <div class="saved-hero-actions">
                        ${savedList.length > 1 ? `
                          <button class="btn saved-compare-banner-btn btn-sm" type="button" data-compare-saved="1">
                            ⚖️ ${this.t("Compare Careers", "करियर तुलना")}
                          </button>
                        ` : ""}
                        <button class="btn btn-primary btn-sm" type="button" data-career="${selectedCareer.id}" data-saved-close="1">
                          📖 ${this.t("Full Details", "विस्तृत विवरण")} →
                        </button>
                      </div>
                    </div>
                    <p style="margin:10px 0 0;font-size:0.88rem;color:var(--ink);line-height:1.45;">
                      ${isHi ? (selectedCareer.overview_hi || selectedCareer.overview || "") : (selectedCareer.overview || "")}
                    </p>
                  </div>

                  <!-- 1. FAMOUS ROLE MODELS & INSPIRATIONS -->
                  <div class="saved-section-block">
                    <div class="saved-section-heading">
                      <span>🌟</span>
                      <h4>${this.t("Inspiring Role Models & Pioneers in this Field", "इस क्षेत्र के प्रमुख दिग्गज व रोल मॉडल्स (प्रेरणा)")}</h4>
                    </div>
                    <div class="role-models-grid">
                      ${roleModels.map(rm => `
                        <div class="role-model-card">
                          <div class="rm-top">
                            <span class="rm-avatar">${rm.icon}</span>
                            <div>
                              <div class="rm-name">${isHi ? rm.nameHi : rm.name}</div>
                              <div class="rm-tag">${isHi ? rm.tagHi : rm.tag}</div>
                            </div>
                          </div>
                          <p class="rm-achievement">${isHi ? rm.achievementHi : rm.achievement}</p>
                          <div class="rm-quote">
                            <span style="font-size:1.1rem;color:var(--accent);margin-right:4px;">“</span>
                            <em>${isHi ? rm.quoteHi : rm.quote}</em>
                            <span style="font-size:1.1rem;color:var(--accent);margin-left:4px;">”</span>
                          </div>
                        </div>
                      `).join("")}
                    </div>
                  </div>

                  <!-- 2. STEP-BY-STEP COMPLETE CAREER ROADMAP -->
                  <div class="saved-section-block">
                    <div class="saved-section-heading">
                      <span>🗺️</span>
                      <h4>${this.t("Complete Step-by-Step Educational & Career Roadmap", "कक्षा 10 से करियर तक का संपूर्ण चरणबद्ध रोडमैप")}</h4>
                    </div>
                    <div class="roadmap-timeline">
                      ${roadmap.map(rm => `
                        <div class="roadmap-step-card">
                          <div class="rm-step-badge">
                            <span class="rm-step-num">Step ${rm.step}</span>
                            <span class="rm-step-icon">${rm.icon}</span>
                          </div>
                          <div class="rm-step-content">
                            <div class="rm-step-title">${isHi ? rm.titleHi : rm.title}</div>
                            <p class="rm-step-desc">${isHi ? rm.descHi : rm.desc}</p>
                          </div>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                  <!-- 3. VERIFIED INDUSTRY MENTORS & 1:1 GUIDANCE CONNECT -->
                  <div class="saved-section-block">
                    <div class="saved-section-heading">
                      <span>🤝</span>
                      <h4>${this.t("Connect with Active Industry Mentors & Senior Practitioners", "सक्रिय उद्योग मेंटर्स एवं वरिष्ठ मार्गदर्शकों से जुड़ें")}</h4>
                    </div>
                    <div class="mentors-grid">
                      ${mentors.map(m => `
                        <div class="mentor-card">
                          <div class="mentor-header">
                            <span class="mentor-avatar">${m.avatar}</span>
                            <div class="mentor-meta">
                              <div class="mentor-name">${isHi ? m.nameHi : m.name} <span class="badge-verified">✔ Verified Mentor</span></div>
                              <div class="mentor-company">${isHi ? m.companyHi : m.company}</div>
                              <div class="mentor-exp">⏱️ ${isHi ? m.expHi : m.exp}</div>
                            </div>
                          </div>
                          <div class="mentor-specialty">
                            <strong>${this.t("Specialty:", "विशेषज्ञता:")}</strong> ${isHi ? m.specialtyHi : m.specialty}
                          </div>
                          <div class="mentor-avail">
                            🟢 ${isHi ? m.availabilityHi : m.availability}
                          </div>
                          <button class="btn btn-sm btn-outline-primary btn-block" type="button" onclick="App.bookMentorSession('${m.name.replace("'", "")}')" style="margin-top:10px;font-weight:700;">
                            💬 ${this.t("Request 1:1 Guidance Session", "1:1 मार्गदर्शन सत्र का अनुरोध करें")}
                          </button>
                        </div>
                      `).join("")}
                    </div>
                  </div>

                ` : ""}
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  },


  render() {
    const root = document.getElementById("app");
    const route = this.state.route;
    const showNav = ["home", "assessments", "tests", "test", "report", "relief", "explore", "profile", "compare", "counselor"].includes(route);
    const desktop = this.isDesktop();

    let body = "";
    switch (route) {
      case "welcome":
        body = this.viewWelcome();
        break;
      case "onboarding":
        body = this.viewOnboarding();
        break;
      case "home":
        body = this.viewHome();
        break;
      case "counselor":
        body = this.viewCounselor();
        break;
      case "assessments":
      case "tests":
        body = this.viewAssessments();
        break;
      case "test":
      case "riasec":
      case "aptitude":
        body = this.viewTest();
        break;
      case "report":
        body = this.viewReport();
        break;
      case "relief":
        body = this.viewRelief();
        break;
      case "explore":
        body = this.viewExplore();
        break;
      case "career":
        body = this.viewCareer();
        break;
      case "profile":
        body = this.viewProfile();
        break;
      case "compare":
        body = this.viewCompare();
        break;
      default:
        body = this.viewWelcome();
    }

    // Only play the entrance animation when the "page" actually changes
    // (not on every re-render caused by a tap or a search keystroke).
    const viewKey = [route, this.state.careerId, this.state.riasecIndex, this.state.aptitudeIndex, this.state.counselorSubTab, this.state.counselorSelectedStudent].join("|");
    const entering = viewKey !== this._viewKey;
    this._viewKey = viewKey;

    const shellClass = [
      "app-shell",
      "route-" + route,
      showNav ? "" : "no-nav",
      desktop ? "desktop" : "mobile",
      showNav && desktop ? "with-sidebar" : "",
      entering ? "enter" : "",
    ]
      .filter(Boolean)
      .join(" ");

    root.innerHTML = `
      <div class="${shellClass}">
        ${showNav && desktop ? this.sideNav(route) : ""}
        <div class="main-pane">
          ${body}
        </div>
        ${showNav && !desktop ? this.bottomNav(route) : ""}
      </div>
      <div class="toast" id="toast"></div>
      ${this.authModalHtml()}
      ${this.googleChooserHtml()}
      ${this.savedCareersModalHtml()}
      ${this.counselorStudentModalHtml ? this.counselorStudentModalHtml() : ""}
    `;

    const activeElId = document.activeElement ? document.activeElement.id : null;
    const cursorPos = (activeElId === "explore-q" && document.activeElement.selectionStart) || null;

    if (entering) root.scrollTop = 0;
    this.bind(route);

    if (activeElId === "explore-q") {
      const el = document.getElementById("explore-q");
      if (el) {
        el.focus();
        if (cursorPos != null) el.setSelectionRange(cursorPos, cursorPos);
      }
    }
  },

  navItems() {
    if (this.isCounselor()) {
      return [
        { id: "counselor", label: this.t("Counselor Suite", "परामर्शदाता कक्ष"), icon: ICON.counselor || "🧑‍🏫" },
        { id: "home", label: this.t("Student Preview", "विद्यार्थी दृश्य"), icon: ICON.home },
      ];
    }
    return [
      { id: "home", label: this.t("Home", "होम"), icon: ICON.home },
      { id: "assessments", label: this.t("Assessments", "मूल्यांकन"), icon: ICON.assessments },
      { id: "report", label: this.t("Report", "रिपोर्ट"), icon: ICON.report },
      { id: "profile", label: this.t("Profile", "प्रोफ़ाइल"), icon: ICON.profile },
    ];
  },

  bottomNav(active) {
    if (this.isCounselor()) {
      const cItems = [
        { id: "counselor", label: this.t("Counselor", "परामर्श"), icon: ICON.counselor || "🧑‍🏫" },
        { id: "home", label: this.t("Student", "विद्यार्थी"), icon: ICON.home },
      ];
      return `
        <nav class="bottom-nav" aria-label="Main">
          ${cItems
            .map(
              (i) => `
            <button type="button" data-nav="${i.id}" class="${active === i.id ? "active" : ""}" ${active === i.id ? 'aria-current="page"' : ""}>
              <span class="ico">${i.icon}</span>
              <span class="lbl">${i.label}</span>
            </button>`
            )
            .join("")}
        </nav>`;
    }
    const mobileItems = [
      { id: "home", label: this.t("Home", "होम"), icon: ICON.home },
      { id: "assessments", label: this.t("Tests", "टेस्ट"), icon: ICON.assessments },
      { id: "report", label: this.t("Report", "रिपोर्ट"), icon: ICON.report },
      { id: "profile", label: this.t("Profile", "प्रोफ़ाइल"), icon: ICON.profile },
    ];
    return `
      <nav class="bottom-nav" aria-label="Main">
        ${mobileItems
          .map(
            (i) => `
          <button type="button" data-nav="${i.id}" class="${active === i.id ? "active" : ""}" ${active === i.id ? 'aria-current="page"' : ""}>
            <span class="ico">${i.icon}</span>
            <span class="lbl">${i.label}</span>
          </button>`
          )
          .join("")}
      </nav>`;
  },

  sideNav(active) {
    const isC = this.isCounselor();
    const p = this.state.profile;
    const name = isC ? (this.state.auth?.name || "Dr. Sunita Sharma") : (p.name || this.t("Student", "विद्यार्थी"));
    const subtitle = isC ? this.t("Senior Career Counselor", "वरिष्ठ करियर परामर्शदाता") : `${this.t("Class", "कक्षा")} ${p.grade || "—"}`;
    const initials = isC ? "SS" : this.initials();

    return `
      <aside class="side-nav ${isC ? "side-nav-counselor" : ""}">
        <div class="side-brand" data-go="welcome" style="cursor:pointer" title="${this.t("Back to Landing Page", "लैंडिंग पेज पर जाएँ")}">
          <div class="logo sm">${LOGO_SVG}</div>
          <div>
            <strong>${BRAND}</strong>
            <div class="tiny-line">${isC ? "Counselor Portal" : "Career Guidance"}</div>
          </div>
        </div>
        <div class="side-user">
          <div class="avatar" style="${isC ? "background:linear-gradient(135deg,#0d9488,#0284c7);color:#fff;" : ""}">${initials}</div>
          <div class="side-user-meta">
            <div class="side-name">${this.escape(name)}</div>
            <div class="muted">${subtitle}</div>
          </div>
          <button type="button" class="btn-side-logout" data-auth-logout="1" title="${this.t("Logout & Return to Landing Page", "लॉगआउट करके होमपेज पर जाएँ")}">
            🚪
          </button>
        </div>
        <nav class="side-links" aria-label="Main">
          ${this.navItems()
            .map(
              (i) => `
            <button type="button" data-nav="${i.id}" class="${active === i.id ? "active" : ""}" ${active === i.id ? 'aria-current="page"' : ""}>
              <span class="ico">${i.icon}</span><span>${i.label}</span>
            </button>`
            )
            .join("")}
        </nav>
        <div class="side-footer">
          <div style="display:flex;gap:6px;align-items:center;justify-content:center;width:100%;margin-bottom:8px">
            <button class="pill-btn theme-toggle ${this.state.theme === "dark" ? "active" : ""}" type="button" data-theme-toggle="1" title="${this.state.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}">
              ${this.state.theme === "dark" ? "☀️ " + this.t("Light", "लाइट") : "🌙 " + this.t("Dark", "डार्क")}
            </button>
            <button class="pill-btn lang-toggle ${this.state.lang === "hi" ? "active" : ""}" type="button" data-lang="1">अ / A</button>
          </div>
          <p class="side-stamp">${isC ? "Counselor Suite · Live DB" : "Phase 1 · Discovery"}</p>
        </div>
      </aside>`;
  },

  topbar({ title, back, pause, lang, avatar }) {
    const desktop = this.isDesktop();
    return `
      <header class="topbar">
        <div class="topbar-left-group">
          ${
            back
              ? `<button class="icon-btn ghost topbar-back-btn" type="button" data-back="1" aria-label="Back">←</button>`
              : ""
          }
          <div class="brand-wrap" data-go="welcome" style="cursor:pointer" title="${this.t("Go to Landing Page", "लैंडिंग पेज पर जाएँ")}">
            <div class="brand">${title || BRAND}</div>
            ${!desktop && title === BRAND ? `<div class="brand-tag">Career Guidance</div>` : ""}
          </div>
        </div>
        <div class="topbar-actions">
          <button class="pill-btn topbar-home-btn" type="button" data-go="welcome" title="${this.t("Go to Landing Page", "लैंडिंग पेज पर जाएँ")}">
            🏠 <span class="topbar-txt">${this.t("Home", "होम")}</span>
          </button>
          <button class="pill-btn topbar-saved-btn" type="button" data-open-saved="1" title="${this.t("View Saved Careers & Roadmap", "सेव किए गए करियर व रोडमैप देखें")}">
            ⭐ <span class="topbar-txt">${this.t("Saved", "सेव")} </span><span class="saved-count-pill">${this.getValidSavedCareers().length}</span>
          </button>
          ${
            pause
              ? `<button class="pill-btn" type="button" data-pause="1">⏸ <span class="topbar-txt">${this.t("Pause", "रोकें")}</span></button>`
              : ""
          }
          <button class="pill-btn theme-toggle ${this.state.theme === "dark" ? "active" : ""}" type="button" data-theme-toggle="1" title="${this.state.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}">
            ${this.state.theme === "dark" ? "☀️ <span class=\"topbar-txt\">" + this.t("Light", "लाइट") + "</span>" : "🌙 <span class=\"topbar-txt\">" + this.t("Dark", "डार्क") + "</span>"}
          </button>
          ${
            lang && !desktop
              ? `<button class="pill-btn lang-toggle ${this.state.lang === "hi" ? "active" : ""}" type="button" data-lang="1" title="${this.t("Switch Language", "भाषा बदलें")}">अ/A</button>`
              : ""
          }
          <button class="pill-btn btn-topbar-logout" type="button" data-auth-logout="1" title="${this.t("Logout & return to Homepage", "लॉगआउट करके मुख्य पृष्ठ पर जाएँ")}">
            🚪 <span class="topbar-txt">${this.t("Logout", "लॉगआउट")}</span>
          </button>
          ${avatar && !desktop ? `<button type="button" class="avatar topbar-avatar" data-nav="profile" aria-label="${this.t("Profile", "प्रोफ़ाइल")}">${this.initials()}</button>` : ""}
        </div>
      </header>`;
  },

  routeLabels() {
    return [this.t("Profile", "प्रोफ़ाइल"), this.t("Interest", "रुचि"), this.t("Aptitude", "योग्यता"), this.t("Match", "मिलान")];
  },

  motionOk() {
    return !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  },

  landingComparePresets() {
    const isHi = this.state.lang === "hi";
    return {
      tech: {
        id: "tech",
        label: isHi ? "💻 AI बनाम साइबर सुरक्षा" : "💻 AI vs Cybersecurity",
        tag: isHi ? "इंजीनियरिंग व तकनीक" : "Engineering & Tech",
        c1: {
          id: "data_scientist",
          icon: "🤖",
          title: isHi ? "AI व डेटा साइंटिस्ट" : "AI & Data Scientist",
          sector: isHi ? "तकनीक व एनालिटिक्स" : "Tech & Analytics",
          fit: 94,
          stream: isHi ? "11वीं-12वीं PCM (कंप्यूटर साइंस)" : "Class 11-12 PCM (Computer Science)",
          salary: "₹6.5 - 28.0 LPA",
          exams: ["JEE Main", "BITSAT", "GATE (PG)"],
          duration: isHi ? "4 वर्ष (B.Tech / B.S.)" : "4 Years (B.Tech / B.S.)",
          riasec: isHi ? "खोजी (I) + तार्किक (C)" : "Investigative (I) + Conventional (C)",
          environment: isHi ? "टेक हब, AI लैब्स, हाइब्रिड/रिमोट" : "Tech Hubs, AI Labs, Hybrid/Remote",
          growth: isHi ? "जूनियर AI इंजीनियर ➔ लीड रिसर्चर ➔ Chief AI Officer" : "Jr. AI Engineer ➔ Lead Researcher ➔ Chief AI Officer"
        },
        c2: {
          id: "cybersecurity_engineer",
          icon: "🛡️",
          title: isHi ? "साइबर सिक्योरिटी आर्किटेक्ट" : "Cybersecurity Architect",
          sector: isHi ? "डेटा सुरक्षा व क्लाउड" : "Data Security & Cloud",
          fit: 88,
          stream: isHi ? "11वीं-12वीं PCM / डिप्लोमा IT" : "Class 11-12 PCM / Diploma in IT",
          salary: "₹5.5 - 24.0 LPA",
          exams: ["JEE Main", "State CET", "CEH / CISSP"],
          duration: isHi ? "3-4 वर्ष (B.Tech / BCA)" : "3-4 Years (B.Tech / BCA)",
          riasec: isHi ? "व्यावहारिक (R) + खोजी (I)" : "Realistic (R) + Investigative (I)",
          environment: isHi ? "SOC सेंटर्स, बैंक, रक्षा व सरकार" : "SOC Centers, Banking, Defense & Govt",
          growth: isHi ? "सिक्योरिटी एनालिस्ट ➔ एथिकल हैकर ➔ CISO" : "Security Analyst ➔ Ethical Hacker ➔ CISO"
        }
      },
      health: {
        id: "health",
        label: isHi ? "🩺 बायोमेडिकल बनाम साइकोलॉजी" : "🩺 Biomedical vs Psychology",
        tag: isHi ? "स्वास्थ्य व मनोविज्ञान" : "Healthcare & Science",
        c1: {
          id: "biomedical_engineer",
          icon: "🧬",
          title: isHi ? "बायोमेडिकल इंजीनियर" : "Biomedical Engineer",
          sector: isHi ? "मेडिकल टेक्नोलॉजी" : "Medical Technology",
          fit: 91,
          stream: isHi ? "11वीं-12वीं PCM / PCB + गणित" : "Class 11-12 PCM or PCB with Math",
          salary: "₹4.8 - 19.5 LPA",
          exams: ["JEE Main", "CUET UG", "State CET"],
          duration: isHi ? "4 वर्ष (B.Tech Biomedical)" : "4 Years (B.Tech Biomedical)",
          riasec: isHi ? "खोजी (I) + व्यावहारिक (R)" : "Investigative (I) + Realistic (R)",
          environment: isHi ? "मेक-इन-इंडिया लैब्स, सुपर-स्पेशियलिटी अस्पताल" : "MedTech Labs, Super-Specialty Hospitals",
          growth: isHi ? "बायोमेडिकल एग्जीक्यूटिव ➔ R&D साइंटिस्ट ➔ MedTech डायरेक्टर" : "Biomedical Exec ➔ R&D Scientist ➔ MedTech Director"
        },
        c2: {
          id: "clinical_psychologist",
          icon: "🧠",
          title: isHi ? "क्लिनिकल साइकोलॉजिस्ट" : "Clinical Psychologist",
          sector: isHi ? "मानसिक स्वास्थ्य" : "Mental Health & Care",
          fit: 86,
          stream: isHi ? "कोई भी स्ट्रीम (PCB / आर्ट्स / कॉमर्स)" : "Any Stream (PCB / Arts / Commerce)",
          salary: "₹4.0 - 16.0 LPA",
          exams: ["CUET UG/PG", "RCI लाइसेंसिंग परीक्षा"],
          duration: isHi ? "3-5 वर्ष (BA/B.Sc + M.Phil/Psy.D)" : "3-5 Years (BA/B.Sc + M.Phil/Psy.D)",
          riasec: isHi ? "सामाजिक (S) + खोजी (I)" : "Social (S) + Investigative (I)",
          environment: isHi ? "काउंसलिंग सेंटर, हॉस्पिटल, निजी क्लिनिक" : "Counseling Centers, Hospitals, Private Clinic",
          growth: isHi ? "ट्रेनी साइकोलॉजिस्ट ➔ लाइसेंस प्राप्त कंसल्टेंट ➔ हेड ऑफ़ बिहेवियरल साइंसेज" : "Trainee Psychologist ➔ Licensed Consultant ➔ Head of Behavioral Sciences"
        }
      },
      aero: {
        id: "aero",
        label: isHi ? "✈️ पायलट बनाम एयरोस्पेस" : "✈️ Airline Pilot vs Aerospace",
        tag: isHi ? "विमानन व अंतरिक्ष" : "Aviation & Space",
        c1: {
          id: "commercial_pilot",
          icon: "✈️",
          title: isHi ? "कमर्शियल एयरलाइन पायलट" : "Commercial Airline Pilot",
          sector: isHi ? "विमानन व ट्रांसपोर्ट" : "Aviation & Flight",
          fit: 93,
          stream: isHi ? "11वीं-12वीं PCM (Physics व Math अनिवार्य)" : "Class 11-12 PCM (Physics & Math mandatory)",
          salary: "₹12.0 - 45.0 LPA",
          exams: ["IGRUA", "DGCA CPL Exams", "Class 1 Medical"],
          duration: isHi ? "18-24 माह (200 घंटे उड़ान प्रशिक्षण)" : "18-24 Months (200 Flight Hours CPL)",
          riasec: isHi ? "व्यावहारिक (R) + तार्किक (C)" : "Realistic (R) + Conventional (C)",
          environment: isHi ? "कॉकपिट, घरेलू व अंतरराष्ट्रीय उड़ानें" : "Flight Cockpit, Global Routes, Airports",
          growth: isHi ? "फर्स्ट ऑफिसर ➔ कैप्टन ➔ सीनियर फ्लाइट इंस्ट्रक्टर" : "First Officer (Co-pilot) ➔ Captain ➔ Sr. Flight Instructor"
        },
        c2: {
          id: "aerospace_engineer",
          icon: "🚀",
          title: isHi ? "एयरोस्पेस व स्पेस इंजीनियर" : "Aerospace Engineer",
          sector: isHi ? "रक्षा व अंतरिक्ष तकनीक" : "Defense & Space Tech",
          fit: 89,
          stream: isHi ? "11वीं-12वीं PCM (Physics, Chemistry, Math)" : "Class 11-12 PCM (Physics, Chem, Math)",
          salary: "₹7.0 - 32.0 LPA",
          exams: ["JEE Advanced (IITs)", "IIST ISAT", "GATE"],
          duration: isHi ? "4 वर्ष (B.Tech Aerospace)" : "4 Years (B.Tech Aerospace)",
          riasec: isHi ? "खोजी (I) + व्यावहारिक (R)" : "Investigative (I) + Realistic (R)",
          environment: isHi ? "ISRO, DRDO, एयरोस्पेस डिजाइन लैब्स" : "ISRO, DRDO, Aerospace R&D Hubs",
          growth: isHi ? "डिजाइन इंजीनियर ➔ सिस्टम लीड ➔ स्पेस मिशन डायरेक्टर" : "Design Engineer ➔ Propulsion Lead ➔ Mission Director"
        }
      }
    };
  },

  landingNavbar() {
    const auth = this.state.auth;
    const isHi = this.state.lang === "hi";
    const isAdm = this.isAdmin();
    return `
      <header class="landing-nav" id="landing-navbar">
        <a href="#welcome" class="landing-nav-brand">
          <div class="logo sm">${LOGO_SVG}</div>
          <div class="brand-text">
            <strong>${BRAND}</strong>
            <div class="tag">${this.t("Career Guidance", "करियर मार्गदर्शन")}</div>
          </div>
        </a>

        <ul class="landing-nav-links">
          <li><a href="#features">${this.t("3-Stage Framework", "3-स्तरीय ढाँचा")}</a></li>
          <li><a href="#how-it-works">${this.t("Assessment Journey", "मूल्यांकन यात्रा")}</a></li>
          <li><a href="#careers">${this.t("Career Library", "करियर सूची")}</a></li>
          <li><a href="#why-us">${this.t("Why Us", "विशेषताएँ")}</a></li>
          <li><a href="#faq">${this.t("FAQs", "प्रश्न")}</a></li>
        </ul>

        <div class="landing-nav-actions">
          <button class="pill-btn demo-nav-trigger" type="button" data-open-demo-switcher="1" style="background:rgba(224,159,62,0.15);border:1.5px solid var(--marigold);color:var(--ink);font-weight:800;" title="${this.t("Quick Role Switcher for Live Demo", "डेमो रोल स्विचर")}">
            ⚡ <span class="nav-btn-txt">${this.t("Demo Switcher", "डेमो स्विचर")}</span>
          </button>
          <button class="pill-btn theme-toggle ${this.state.theme === "dark" ? "active" : ""}" type="button" data-theme-toggle="1" title="${this.state.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}">
            ${this.state.theme === "dark" ? "☀️ <span class=\"nav-btn-txt\">" + this.t("Light", "लाइट") + "</span>" : "🌙 <span class=\"nav-btn-txt\">" + this.t("Dark", "डार्क") + "</span>"}
          </button>
          <button class="pill-btn lang-toggle ${isHi ? "active" : ""}" type="button" data-lang="1" title="${this.t("Switch Language", "भाषा बदलें")}">
            <span class="lang-symbol">अ/A</span><span class="nav-btn-txt"> · ${isHi ? "हिंदी" : "EN"}</span>
          </button>

          ${
            auth
              ? `
            <div class="user-nav-badge" title="${this.escape(auth.name)} (${isAdm ? this.t("CDGC Admin", "सीडीजीसी एडमिन") : this.t("Class", "कक्षा") + " " + (auth.grade || this.state.profile.grade || "10")})">
              <div class="avatar">${this.initials()}</div>
              <div class="user-nav-info">
                <span class="uname">${this.escape(auth.name)}</span>
                <span class="ugrade">${isAdm ? this.t("Admin", "एडमिन") : `${this.t("Class", "कक्षा")} ${auth.grade || this.state.profile.grade || "10"}`}</span>
              </div>
              <button type="button" class="btn-signout-nav" data-auth-logout="1" title="${this.t("Sign Out", "लॉगआउट")}">🚪 <span class="nav-btn-txt">${this.t("Logout", "लॉगआउट")}</span></button>
            </div>
            <button type="button" class="btn-auth-nav primary nav-btn-dash" data-go="${isAdm ? "counselor" : "home"}" title="${isAdm ? this.t("Admin Panel", "एडमिन पोर्टल") : this.t("Dashboard", "डैशबोर्ड")}">
              <span class="dash-btn-full">${isAdm ? this.t("Admin Panel", "एडमिन पोर्टल") : this.t("Dashboard", "डैशबोर्ड")} →</span>
              <span class="dash-btn-short">${this.t("Portal", "पोर्टल")} →</span>
            </button>
          `
              : `
            <button type="button" class="btn-auth-nav ghost" data-auth-open="signin">
              ${this.t("Sign In", "साइन इन")}
            </button>
            <button type="button" class="btn-auth-nav primary nav-btn-signup-desktop" data-auth-open="signup">
              ${this.t("Sign Up", "साइन अप")} →
            </button>
          `
          }
        </div>
      </header>
    `;
  },

  signInFormHtml() {
    return `
      <div class="auth-form" id="auth-signin-form">
        <!-- 4 QUICK DEMO CARDS ACCORDING TO SPECS -->
        <div class="auth-demo-banner" style="background:var(--paper-2);border:1.5px solid var(--edge);border-radius:14px;padding:12px 14px;margin-bottom:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
            <strong style="font-size:0.82rem;color:var(--ink);display:flex;align-items:center;gap:6px;">
              ⚡ ${this.t("Quick 1-Click Demo Login", "त्वरित 1-क्लिक डेमो लॉगिन")}
            </strong>
            <span class="badge-grade" style="font-size:0.68rem;background:var(--marigold-soft);color:var(--ink);border:1px solid var(--marigold);padding:1px 6px;border-radius:6px;font-weight:700;">NEP 2020</span>
          </div>

          <div class="auth-demo-grid" style="display:grid;grid-template-columns:repeat(2, 1fr);gap:8px;">
            <button type="button" class="auth-demo-card-btn" data-demo-group1="1" style="background:var(--field);border:1.5px solid var(--marigold);border-radius:10px;padding:8px;text-align:left;cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;justify-content:center;">
              <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;">
                <span style="font-size:1rem">🌱</span>
                <strong style="font-size:0.8rem;color:var(--ink);white-space:nowrap;">Group I</strong>
                <span style="font-size:0.7rem;color:var(--ink-soft);font-weight:700;">(Cl. 7)</span>
              </div>
              <div style="font-size:0.72rem;color:var(--ink-soft);line-height:1.2;">
                ${this.t("Ananya · Discovery (RIASEC)", "अनन्या · डिस्कवरी (रुचि)")}
              </div>
            </button>

            <button type="button" class="auth-demo-card-btn" data-demo-group2="1" style="background:var(--field);border:1.5px solid var(--teal);border-radius:10px;padding:8px;text-align:left;cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;justify-content:center;">
              <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;">
                <span style="font-size:1rem">🧭</span>
                <strong style="font-size:0.8rem;color:var(--ink);white-space:nowrap;">Group II</strong>
                <span style="font-size:0.7rem;color:var(--ink-soft);font-weight:700;">(Cl. 10)</span>
              </div>
              <div style="font-size:0.72rem;color:var(--ink-soft);line-height:1.2;">
                ${this.t("Rohan · Exploration (TAMANNA)", "रोहन · एक्सप्लोरेशन (तमन्ना)")}
              </div>
            </button>

            <button type="button" class="auth-demo-card-btn" data-demo-group3="1" style="background:var(--field);border:1.5px solid var(--azure, #38bdf8);border-radius:10px;padding:8px;text-align:left;cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;justify-content:center;">
              <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;">
                <span style="font-size:1rem">🎓</span>
                <strong style="font-size:0.8rem;color:var(--ink);white-space:nowrap;">Group III</strong>
                <span style="font-size:0.7rem;color:var(--ink-soft);font-weight:700;">(Cl. 12)</span>
              </div>
              <div style="font-size:0.72rem;color:var(--ink-soft);line-height:1.2;">
                ${this.t("Priya · Decision (Big 5)", "प्रिया · डिसीजन (बिग 5)")}
              </div>
            </button>

            <button type="button" class="auth-demo-card-btn" data-demo-admin="1" style="background:rgba(13,148,136,0.08);border:1.5px solid var(--counselor-teal);border-radius:10px;padding:8px;text-align:left;cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;justify-content:center;">
              <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;">
                <span style="font-size:1rem">⚡</span>
                <strong style="font-size:0.8rem;color:var(--counselor-teal);white-space:nowrap;">Admin Portal</strong>
              </div>
              <div style="font-size:0.72rem;color:var(--ink-soft);line-height:1.2;">
                ${this.t("Dr. Sunita · School Analytics", "डॉ. सुनीता · एनालिटिक्स")}
              </div>
            </button>
          </div>
        </div>

        <div class="auth-divider" style="margin:8px 0 14px"><span>${this.t("or enter credentials", "या क्रेडेंशियल दर्ज करें")}</span></div>

        <div class="field" style="margin:0">
          <label>${this.t("Email Address or Mobile Number", "ईमेल पता या मोबाइल नंबर")}</label>
          <div class="auth-input-wrap">
            <input type="text" id="auth-si-email" placeholder="${this.t("e.g. student@gmail.com or 9876543210", "जैसे student@gmail.com या 9876543210")}" value="${this.escape(this._cachedAuthEmail || "")}" required />
          </div>
        </div>
        <div class="field" style="margin:0">
          <label>${this.t("Password", "पासवर्ड")}</label>
          <div class="auth-input-wrap">
            <input type="password" id="auth-si-password" placeholder="••••••••" value="${this.escape(this._cachedAuthPass || "")}" required />
            <button type="button" class="auth-toggle-pass" data-toggle-pass="auth-si-password" title="${this.t("Show password", "पासवर्ड दिखाएँ")}">👁️</button>
          </div>
        </div>
        <div class="auth-row-between">
          <label class="auth-check-label">
            <input type="checkbox" id="auth-si-remember" checked />
            <span>${this.t("Remember me", "मुझे याद रखें")}</span>
          </label>
          <a class="auth-forgot-link" href="javascript:void(0)" data-auth-forgot="1">${this.t("Forgot Password?", "पासवर्ड भूल गए?")}</a>
        </div>

        <button type="button" id="auth-si-submit" class="auth-submit-btn">${this.t("Sign In to CareerMarg", "CareerMarg में साइन इन करें")} →</button>

        <div class="auth-footer-toggle">
          ${this.t("Don't have an account?", "खाता नहीं है?")} <button type="button" data-auth-tab="signup">${this.t("Create Account", "खाता बनाएँ")}</button>
        </div>
      </div>
    `;
  },

  signUpFormHtml() {
    const isHi = this.state.lang === "hi";
    return `
      <div class="auth-form" id="auth-signup-form">
        <div class="field" style="margin:0">
          <label>${this.t("Student Full Name", "विद्यार्थी का पूरा नाम")} <span style="color:var(--vermilion)">*</span></label>
          <div class="auth-input-wrap">
            <input type="text" id="auth-su-name" placeholder="${this.t("e.g. Rahul Sharma", "जैसे राहुल शर्मा")}" required />
          </div>
        </div>

        <div class="field" style="margin:0">
          <label>${this.t("Email Address or Mobile Number", "ईमेल पता या मोबाइल नंबर")} <span style="color:var(--vermilion)">*</span></label>
          <div class="auth-input-wrap">
            <input type="text" id="auth-su-email" placeholder="${this.t("e.g. student@gmail.com or 9876543210", "जैसे student@gmail.com या 9876543210")}" required />
          </div>
        </div>

        <div class="field" style="margin:0">
          <label>${this.t("Current School Class (Grade 6 to 12)", "वर्तमान कक्षा (कक्षा 6 से 12)")} <span style="color:var(--vermilion)">*</span></label>
          <select id="auth-su-grade" style="font-weight:700">
            <optgroup label="${this.t("Group I · Discovery Stage (Interest Discovery)", "ग्रुप I · डिस्कवरी स्टेज (रुचि खोज)")}">
              <option value="6">${this.t("Class 6th", "कक्षा 6वीं")}</option>
              <option value="7">${this.t("Class 7th", "कक्षा 7वीं")}</option>
              <option value="8">${this.t("Class 8th", "कक्षा 8वीं")}</option>
            </optgroup>
            <optgroup label="${this.t("Group II · Exploration Stage (Stream Choice: Science/Commerce/Arts)", "ग्रुप II · एक्सप्लोरेशन स्टेज (स्ट्रीम चयन)")}">
              <option value="9">${this.t("Class 9th", "कक्षा 9वीं")}</option>
              <option value="10" selected>${this.t("Class 10th (Stream Discovery)", "कक्षा 10वीं (स्ट्रीम चयन)")}</option>
            </optgroup>
            <optgroup label="${this.t("Group III · Decision Stage (College & Career Path)", "ग्रुप III · डिसीजन स्टेज (कॉलेज एवं करियर चयन)")}">
              <option value="11">${this.t("Class 11th", "कक्षा 11वीं")}</option>
              <option value="12">${this.t("Class 12th (College & Competitive Entrance)", "कक्षा 12वीं (कॉलेज एवं प्रतियोगी परीक्षा)")}</option>
            </optgroup>
          </select>
          <div style="font-size:0.75rem;color:var(--ink-soft);margin-top:3px">
            💡 ${this.t("Your assessment roadmap dynamically matches your stage.", "आपका असेसमेंट रोडमैप आपकी कक्षा व स्तर के अनुरूप तैयार होगा।")}
          </div>
        </div>

        <div class="field" style="margin:0">
          <label>${this.t("Create Password", "पासवर्ड बनाएँ")} <span style="color:var(--vermilion)">*</span></label>
          <div class="auth-input-wrap">
            <input type="password" id="auth-su-pass" placeholder="••••••••" required />
            <button type="button" class="auth-toggle-pass" data-toggle-pass="auth-su-pass" title="${this.t("Show password", "पासवर्ड दिखाएँ")}">👁️</button>
          </div>
        </div>

        <label class="auth-check-label" style="font-size:0.78rem">
          <input type="checkbox" id="auth-su-terms" checked required />
          <span>${this.t("I agree to Free Career Guidance Terms & Privacy Policy", "मैं मुफ़्त करियर मार्गदर्शन की शर्तों से सहमत हूँ")}</span>
        </label>

        <button type="button" id="auth-su-submit" class="auth-submit-btn">${this.t("Create Free Account", "मुफ़्त खाता बनाएँ")} →</button>

        <div class="auth-divider"><span>${this.t("or continue with", "या इसके साथ जारी रखें")}</span></div>

        <button type="button" class="auth-google-btn" data-open-google-chooser="1">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
          <span>${this.t("Sign Up with Google", "Google से खाता बनाएँ")}</span>
        </button>

        <div class="auth-footer-toggle">
          ${this.t("Already have an account?", "पहले से खाता है?")} <button type="button" data-auth-tab="signin">${this.t("Sign In here", "यहाँ साइन इन करें")}</button>
        </div>
      </div>
    `;
  },

  forgotFormHtml() {
    const isHi = this.state.lang === "hi";
    const step = this.state.forgotStep || 1;

    if (step === 1) {
      return `
        <div class="auth-form" id="auth-forgot-form">
          <div style="background:var(--paper-2);border:1.5px solid var(--edge);border-radius:12px;padding:12px 14px;font-size:0.86rem;line-height:1.45;color:var(--ink);">
            🔑 ${this.t("Enter the registered Email Address or Mobile Number you used to create your account. We will send you an OTP to reset your password.", "अपना पंजीकृत ईमेल या मोबाइल नंबर दर्ज करें। हम पासवर्ड रीसेट करने के लिए एक ओटीपी भेजेंगे।")}
          </div>

          <div class="field" style="margin:0">
            <label>${this.t("Email Address or Mobile Number", "ईमेल पता या मोबाइल नंबर")}</label>
            <div class="auth-input-wrap">
              <input type="text" id="auth-forgot-identifier" placeholder="${this.t("e.g. student@gmail.com or 9876543210", "जैसे student@gmail.com या 9876543210")}" value="${this.escape(this.state.forgotIdentifier || "")}" required />
            </div>
          </div>

          <button type="button" id="auth-forgot-send-btn" class="auth-submit-btn">${this.t("Send Verification OTP", "सत्यापन OTP भेजें")} →</button>

          <div class="auth-footer-toggle">
            <button type="button" data-auth-tab="signin">← ${this.t("Back to Sign In", "साइन इन पर वापस जाएँ")}</button>
          </div>
        </div>
      `;
    }

    return `
      <div class="auth-form" id="auth-forgot-form-step2">
        <div class="auth-otp-badge">
          ✅ ${this.t("Verification OTP sent to", "सत्यापन OTP भेजा गया:")} <strong>${this.escape(this.state.forgotIdentifier)}</strong>
          <div style="margin-top:4px;font-weight:700;color:var(--vermilion)">
            ⚡ ${this.t("Testing Code", "परीक्षण OTP")}: <strong>${this._lastOtp || "482910"}</strong>
          </div>
        </div>

        <div class="field" style="margin:0">
          <label>${this.t("Enter 6-Digit OTP", "6-अंकों का OTP दर्ज करें")}</label>
          <div class="auth-input-wrap">
            <input type="text" id="auth-forgot-otp" class="auth-otp-input" placeholder="••••••" maxlength="6" value="${this._lastOtp || ""}" required />
          </div>
        </div>

        <div class="field" style="margin:0">
          <label>${this.t("Create New Password", "नया पासवर्ड बनाएँ")}</label>
          <div class="auth-input-wrap">
            <input type="password" id="auth-forgot-newpass" placeholder="••••••••" required />
            <button type="button" class="auth-toggle-pass" data-toggle-pass="auth-forgot-newpass" title="${this.t("Show password", "पासवर्ड दिखाएँ")}">👁️</button>
          </div>
        </div>

        <div class="field" style="margin:0">
          <label>${this.t("Confirm New Password", "नए पासवर्ड की पुष्टि करें")}</label>
          <div class="auth-input-wrap">
            <input type="password" id="auth-forgot-cnewpass" placeholder="••••••••" required />
          </div>
        </div>

        <button type="button" id="auth-forgot-submit-btn" class="auth-submit-btn">${this.t("Reset & Update Password", "पासवर्ड रीसेट एवं अपडेट करें")} →</button>

        <div class="auth-row-between" style="margin-top:6px">
          <a class="auth-forgot-link" href="javascript:void(0)" id="auth-forgot-send-btn">${this.t("Didn't get code? Resend OTP", "OTP नहीं मिला? पुनः भेजें")}</a>
          <button type="button" style="background:none;border:none;color:var(--ink-soft);font-weight:700;cursor:pointer" data-auth-tab="signin">← ${this.t("Back to Sign In", "साइन इन")}</button>
        </div>
      </div>
    `;
  },

  googleChooserHtml() {
    if (!this.state.googleChooserOpen) return "";
    const isHi = this.state.lang === "hi";
    const selectedAcc = this.state.googleAccountSelected;

    return `
      <div class="google-chooser-backdrop open" id="google-chooser-backdrop">
        <div class="google-chooser-modal" role="dialog" aria-modal="true" aria-labelledby="google-modal-title">
          <button class="auth-close-btn" type="button" data-google-close="1" aria-label="Close" style="top:12px;right:12px">✕</button>

          <div class="google-modal-header">
            <div class="google-g-logo">
              <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
            </div>
            <h3 id="google-modal-title">${selectedAcc ? this.t("Confirm with Google", "Google से पुष्टि करें") : this.t("Choose an account", "खाता चुनें")}</h3>
            <p>${selectedAcc ? this.t("Enter password to sign in to CareerMarg", "CareerMarg में साइन इन के लिए पासवर्ड दर्ज करें") : this.t("to continue to CareerMarg Career Guidance", "CareerMarg करियर मार्गदर्शन पर आगे बढ़ने के लिए")}</p>
          </div>

          ${!selectedAcc ? `
            <div class="google-account-list">
              <button type="button" class="google-account-item" data-select-google-acc="0">
                <div class="google-avatar-circle">R</div>
                <div class="google-account-meta">
                  <div class="google-account-name">Rahul Sharma</div>
                  <div class="google-account-email">rahul.student@gmail.com</div>
                </div>
                <span style="font-size:0.8rem;color:#1a73e8;font-weight:600">${this.t("Active", "सक्रिय")}</span>
              </button>

              <button type="button" class="google-account-item" data-select-google-acc="1">
                <div class="google-avatar-circle" style="background:#e37400">P</div>
                <div class="google-account-meta">
                  <div class="google-account-name">Priya Singh</div>
                  <div class="google-account-email">priya.s@gmail.com</div>
                </div>
              </button>

              <button type="button" class="google-account-item" data-select-google-acc="custom">
                <div class="google-avatar-circle add-icon">+</div>
                <div class="google-account-meta">
                  <div class="google-account-name">${this.t("Use another account", "अन्य Google खाते का उपयोग करें")}</div>
                  <div class="google-account-email">${this.t("Enter any Gmail address", "कोई भी जीमेल दर्ज करें")}</div>
                </div>
              </button>
            </div>
          ` : selectedAcc === "custom" ? `
            <div class="google-password-box">
              <div class="field" style="margin:0 0 10px">
                <label style="font-size:0.82rem;font-weight:600">${this.t("Google Gmail Address", "Google जीमेल पता")}</label>
                <div class="auth-input-wrap">
                  <input type="email" id="g-custom-email" placeholder="yourname@gmail.com" required style="background:#fff;border:1px solid #dadce0" />
                </div>
              </div>

              <div class="field" style="margin:0 0 10px">
                <label style="font-size:0.82rem;font-weight:600">${this.t("Full Name", "पूरा नाम")}</label>
                <div class="auth-input-wrap">
                  <input type="text" id="g-custom-name" placeholder="${this.t("e.g. Aman Gupta", "जैसे अमन गुप्ता")}" style="background:#fff;border:1px solid #dadce0" />
                </div>
              </div>

              <div class="field" style="margin:0">
                <label style="font-size:0.82rem;font-weight:600">${this.t("Google Password", "गूगल पासवर्ड")}</label>
                <div class="auth-input-wrap">
                  <input type="password" id="g-custom-pass" placeholder="••••••••" required style="background:#fff;border:1px solid #dadce0" />
                  <button type="button" class="auth-toggle-pass" data-toggle-pass="g-custom-pass" title="Show">👁️</button>
                </div>
              </div>
            </div>

            <div style="display:flex;gap:10px;margin-top:14px">
              <button type="button" class="btn btn-secondary" style="flex:1" data-select-google-acc="reset" onclick="App.state.googleAccountSelected=null;App.render()">← ${this.t("Change", "बदलें")}</button>
              <button type="button" id="google-confirm-signin-btn" class="google-btn-primary" style="flex:2">${this.t("Next & Sign In", "साइन इन करें")} →</button>
            </div>
          ` : `
            <div class="google-password-box">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #dadce0">
                <div class="google-avatar-circle" style="width:34px;height:34px;font-size:0.95rem">${selectedAcc.avatar}</div>
                <div style="flex:1;min-width:0">
                  <div style="font-weight:600;font-size:0.9rem">${selectedAcc.name}</div>
                  <div style="font-size:0.8rem;color:#5f6368">${selectedAcc.email}</div>
                </div>
                <button type="button" style="background:none;border:none;color:#1a73e8;font-size:0.8rem;font-weight:600;cursor:pointer" onclick="App.state.googleAccountSelected=null;App.render()">${this.t("Change", "बदलें")}</button>
              </div>

              <div class="field" style="margin:0">
                <label style="font-size:0.82rem;font-weight:600">${this.t("Enter your Google password", "अपना Google पासवर्ड दर्ज करें")}</label>
                <div class="auth-input-wrap">
                  <input type="password" id="g-acc-pass" placeholder="••••••••" value="googleSecPass2026" required style="background:#fff;border:1px solid #dadce0" />
                  <button type="button" class="auth-toggle-pass" data-toggle-pass="g-acc-pass" title="Show">👁️</button>
                </div>
              </div>
            </div>

            <div style="display:flex;gap:10px;margin-top:14px">
              <button type="button" class="btn btn-secondary" style="flex:1" onclick="App.state.googleAccountSelected=null;App.render()">← ${this.t("Back", "पीछे")}</button>
              <button type="button" id="google-confirm-signin-btn" class="google-btn-primary" style="flex:2">${this.t("Next & Sign In", "साइन इन करें")} →</button>
            </div>
          `}

          <div style="font-size:0.75rem;color:#5f6368;text-align:center;margin-top:16px;line-height:1.4">
            ${this.t("By continuing, Google shares your name, email, and language preference with CareerMarg.", "आगे बढ़ने पर Google आपका नाम, ईमेल और भाषा प्राथमिकता CareerMarg के साथ साझा करेगा।")}
          </div>
        </div>
      </div>
    `;
  },

  authModalHtml() {
    const isOpen = this.state.authModalOpen;
    const tab = this.state.authModalTab || "signin";
    const isForgot = tab === "forgot";
    const isSignIn = tab === "signin";

    return `
      <div class="auth-backdrop ${isOpen ? "open" : ""}" id="auth-backdrop">
        <div class="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
          <button class="auth-close-btn" type="button" data-auth-close="1" aria-label="Close">✕</button>
          
          <div class="auth-header">
            <div class="logo sm">${LOGO_SVG}</div>
            <h2 id="auth-modal-title">
              ${isForgot ? this.t("Reset Password", "पासवर्ड रीसेट करें") : isSignIn ? this.t("Welcome Back!", "वापसी पर स्वागत है!") : this.t("Create Free Account", "मुफ़्त खाता बनाएँ")}
            </h2>
            <p>${
              isForgot
                ? this.t("Verify with OTP and create a new password", "OTP सत्यापित करें और नया पासवर्ड बनाएँ")
                : isSignIn
                ? this.t("Sign in to continue your career journey & access reports", "अपनी करियर यात्रा जारी रखने के लिए साइन इन करें")
                : this.t("For School Students from Class 6 to 12 · 100% Free", "कक्षा 6 से 12 के स्कूली विद्यार्थियों के लिए · 100% मुफ़्त")
            }</p>
          </div>

          ${!isForgot ? `
            <div class="auth-tabs">
              <button class="auth-tab ${isSignIn ? "active" : ""}" type="button" data-auth-tab="signin">${this.t("Sign In", "साइन इन")}</button>
              <button class="auth-tab ${!isSignIn ? "active" : ""}" type="button" data-auth-tab="signup">${this.t("Create Account", "खाता बनाएँ")}</button>
            </div>
          ` : ""}

          ${isForgot ? this.forgotFormHtml() : isSignIn ? this.signInFormHtml() : this.signUpFormHtml()}
        </div>
      </div>
    `;
  },

  viewWelcome() {
    const isHi = this.state.lang === "hi";
    const selectedCat = this.state.landingCategory || "all";

    // Filter preview careers
    const allCareers = DISHA_DATA.careers || [];
    let previewCareers = allCareers;
    if (selectedCat === "tech") {
      previewCareers = allCareers.filter((c) => c.interestTags.includes("technology"));
    } else if (selectedCat === "healthcare") {
      previewCareers = allCareers.filter((c) => c.interestTags.includes("healthcare"));
    } else if (selectedCat === "edu_public") {
      previewCareers = allCareers.filter((c) => c.interestTags.includes("teaching") || c.interestTags.includes("public_service"));
    } else if (selectedCat === "arts") {
      previewCareers = allCareers.filter((c) => c.interestTags.includes("arts"));
    } else if (selectedCat === "agri") {
      previewCareers = allCareers.filter((c) => c.interestTags.includes("agriculture"));
    }

    return `
      <div class="landing-wrap">
        ${this.landingNavbar()}

        <!-- HERO SECTION -->
        <section class="landing-hero" id="home">
          <div class="landing-container">
            <div class="hero-grid-2col">
              <div class="hero-content">
                <div class="hero-pill-badge">
                  <span>🏛️</span>
                  <span>${this.t("Career Development & Guidance Cell · 3-Stage Assessment Framework", "करियर विकास एवं मार्गदर्शन प्रकोष्ठ · 3-स्तरीय मूल्यांकन ढाँचा")}</span>
                </div>

                <h1>
                  ${this.t("Developmentally Appropriate", "कक्षा और आयु के अनुरूप")} <em>${this.t("Career Guidance", "वैज्ञानिक करियर मार्गदर्शन")}</em> ${this.t("for Every Student Stage.", "हर विद्यार्थी के लिए।")}
                </h1>

                <p class="hero-lead">
                  ${this.t(
                    "Structured psychological assessments across school classes: Interest exploration in Classes 6–8, Stream & Aptitude mapping in Classes 9–10, and Comprehensive Personality profiling in Classes 11–12.",
                    "कक्षा 6 से 12 के लिए चरणबद्ध मनोवैज्ञानिक मूल्यांकन: कक्षा 6–8 में रुचि खोज, 9–10 में स्ट्रीम व अभिक्षमता (NCERT TAMANNA), और 11–12 में व्यक्तित्व परीक्षण (Big Five OCEAN)।"
                  )}
                </p>

                <div class="hero-btn-group">
                  <button class="btn btn-primary" type="button" data-start="1">
                    <span>${this.t("Start Student Discovery", "विद्यार्थी टेस्ट शुरू करें")}</span>
                    <span class="arr">→</span>
                  </button>
                  <button class="btn btn-secondary" type="button" data-open-demo-switcher="1" style="border:1.5px solid var(--marigold);font-weight:800;">
                    <span>⚡ ${this.t("Instant Demo Switcher", "त्वरित 1-क्लिक डेमो")}</span>
                  </button>
                  <button class="btn btn-ink" type="button" data-demo-admin="1">
                    <span>⚡ ${this.t("Admin Analytics", "एडमिन पोर्टल")}</span>
                  </button>
                </div>

                <div class="hero-trust-strip">
                  <div class="trust-item"><span class="ti-dot"></span><span>${this.t("Group I: Classes 6–8 (Discovery)", "ग्रुप I: कक्षा 6–8 (डिस्कवरी)")}</span></div>
                  <div class="trust-item"><span class="ti-dot"></span><span>${this.t("Group II: Classes 9–10 (Stream Choice)", "ग्रुप II: कक्षा 9–10 (स्ट्रीम चयन)")}</span></div>
                  <div class="trust-item"><span class="ti-dot"></span><span>${this.t("Group III: Classes 11–12 (Career & College)", "ग्रुप III: कक्षा 11–12 (करियर व कॉलेज)")}</span></div>
                </div>
              </div>

              <div class="hero-showcase">
                <div class="hero-visual-card" style="padding:28px 24px;">
                  <!-- Floating widgets -->
                  <div class="hero-floating-pill top-left">
                    <span>🌱</span>
                    <div><strong>Group I</strong> · <span>Interest (RIASEC)</span></div>
                  </div>

                  <div class="hero-floating-pill bottom-right">
                    <span>🧭</span>
                    <div><strong>Group II</strong> · <span>Interest + TAMANNA</span></div>
                  </div>

                  <div class="hero-floating-pill bottom-left">
                    <span>🎓</span>
                    <div><strong>Group III</strong> · <span>Big 5 Personality</span></div>
                  </div>

                  <div class="hero-compass-box" aria-hidden="true">
                    ${compassSvg()}
                    <span class="sticker s1">💻</span>
                    <span class="sticker s2">🩺</span>
                    <span class="sticker s3">🌾</span>
                    <span class="sticker s4">🎓</span>
                    <span class="sticker s5">🎨</span>
                  </div>

                  <div class="tiny" style="margin-top:10px;font-weight:800;color:var(--ink);letter-spacing:0.04em">
                    ${this.t("CDGC Career Guidance Engine", "सीडीजीसी करियर मार्गदर्शन इंजन")}
                  </div>
                  <p style="font-family:var(--hand);font-size:1.05rem;color:var(--ink-soft);margin-top:4px">
                    "${this.t("Empowering students to choose with scientific clarity.", "विद्यार्थियों को वैज्ञानिक स्पष्टता के साथ सही दिशा देना।")}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3-STAGE ASSESSMENT FRAMEWORK SECTION -->
        <section class="landing-section alt-bg" id="features">
          <div class="landing-container">
            <div class="section-head">
              <p class="eyebrow"><span class="stamp">${this.t("National Guidance Framework", "राष्ट्रीय मार्गदर्शन ढाँचा")}</span></p>
              <h2>${this.t("Progressive 3-Group Assessment Framework", "3-स्तरीय प्रगतिशील मूल्यांकन ढाँचा")}</h2>
              <p>${this.t(
                "Tailored according to the developmental stage of school students (Classes 6 to 12) per NEP 2020 guidelines.",
                "NEP 2020 एवं NCERT के दिशानिर्देशों के अनुसार स्कूली विद्यार्थियों के विकासात्मक स्तर के अनुरूप तैयार।"
              )}</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 280px), 1fr));gap:20px;margin-top:24px;">
              
              <!-- GROUP I CARD -->
              <div class="card" style="border:2px solid var(--marigold);border-radius:18px;padding:26px;display:flex;flex-direction:column;justify-content:space-between;background:var(--paper-1);box-shadow:0 6px 18px rgba(0,0,0,0.04);">
                <div>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <span style="font-size:1.8rem">🌱</span>
                    <span class="rich-badge" style="background:rgba(224,159,62,0.16);border-color:var(--marigold);font-weight:800;font-size:0.82rem;color:var(--ink);">
                      Group I · Classes 6–8
                    </span>
                  </div>
                  <h3 style="font-size:1.3rem;margin:0 0 6px;color:var(--ink)">${this.t("Discovery Stage", "डिस्कवरी स्टेज")}</h3>
                  <div style="font-size:0.86rem;font-weight:700;color:var(--vermilion);margin-bottom:12px;">
                    ${this.t("Assessment: Interest Inventory (RIASEC)", "मूल्यांकन: रुचि इन्वेंटरी (RIASEC)")}
                  </div>
                  <p style="font-size:0.88rem;line-height:1.55;color:var(--ink-soft);margin-bottom:16px;">
                    ${this.t(
                      "Identifies natural inclinations across 6 broad interest types without pushing students toward premature career decisions. Guides subject choices and exploratory hobbies.",
                      "बिना किसी जल्दबाजी के 6 व्यापक रुचि प्रकारों की पहचान कर विषय चयन और पाठ्येतर गतिविधियों को सही दिशा देता है।"
                    )}
                  </p>
                  <div style="background:var(--paper-2);padding:10px 14px;border-radius:10px;font-size:0.8rem;border:1px solid var(--edge);">
                    📊 <strong>${this.t("Report:", "रिपोर्ट:")}</strong> Level 1 - Interest Inventory Report
                  </div>
                </div>
                <div style="margin-top:20px;">
                  <button type="button" class="btn btn-secondary" data-demo-group1="1" style="width:100%;font-size:0.84rem;border-color:var(--marigold);">
                    ⚡ ${this.t("Demo Group I (Class 7 View)", "डेमो ग्रुप I (कक्षा 7वीं दृश्य)")}
                  </button>
                </div>
              </div>

              <!-- GROUP II CARD -->
              <div class="card" style="border:2px solid var(--teal);border-radius:18px;padding:26px;display:flex;flex-direction:column;justify-content:space-between;background:var(--paper-1);box-shadow:0 6px 18px rgba(0,0,0,0.04);">
                <div>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <span style="font-size:1.8rem">🧭</span>
                    <span class="rich-badge" style="background:rgba(45,212,191,0.16);border-color:var(--teal);font-weight:800;font-size:0.82rem;color:var(--ink);">
                      Group II · Classes 9–10
                    </span>
                  </div>
                  <h3 style="font-size:1.3rem;margin:0 0 6px;color:var(--ink)">${this.t("Exploration Stage", "एक्सप्लोरेशन स्टेज")}</h3>
                  <div style="font-size:0.86rem;font-weight:700;color:var(--counselor-teal);margin-bottom:12px;">
                    ${this.t("Assessments: RIASEC + NCERT TAMANNA Aptitude", "मूल्यांकन: रुचि + NCERT तमन्ना अभिक्षमता")}
                  </div>
                  <p style="font-size:0.88rem;line-height:1.55;color:var(--ink-soft);margin-bottom:16px;">
                    ${this.t(
                      "Measures actual cognitive strengths (verbal, numerical, logical, spatial, mechanical) alongside interests. Essential for choosing the right 11th stream (Science, Commerce, Arts).",
                      "रुचि के साथ-साथ वास्तविक संज्ञानात्मक क्षमताओं (मौखिक, संख्यात्मक, तार्किक व स्थानिक) को मापकर सही 11वीं स्ट्रीम का वैज्ञानिक चयन कराता है।"
                    )}
                  </p>
                  <div style="background:var(--paper-2);padding:10px 14px;border-radius:10px;font-size:0.8rem;border:1px solid var(--edge);">
                    📊 <strong>${this.t("Report:", "रिपोर्ट:")}</strong> Level 1 (Interest) + Level 2 (Aptitude & Stream) Report
                  </div>
                </div>
                <div style="margin-top:20px;">
                  <button type="button" class="btn btn-secondary" data-demo-group2="1" style="width:100%;font-size:0.84rem;border-color:var(--teal);">
                    ⚡ ${this.t("Demo Group II (Class 10 View)", "डेमो ग्रुप II (कक्षा 10वीं दृश्य)")}
                  </button>
                </div>
              </div>

              <!-- GROUP III CARD -->
              <div class="card" style="border:2px solid var(--azure, #38bdf8);border-radius:18px;padding:26px;display:flex;flex-direction:column;justify-content:space-between;background:var(--paper-1);box-shadow:0 6px 18px rgba(0,0,0,0.04);">
                <div>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <span style="font-size:1.8rem">🎓</span>
                    <span class="rich-badge" style="background:rgba(56,189,248,0.16);border-color:#38bdf8;font-weight:800;font-size:0.82rem;color:var(--ink);">
                      Group III · Classes 11–12
                    </span>
                  </div>
                  <h3 style="font-size:1.3rem;margin:0 0 6px;color:var(--ink)">${this.t("Decision Stage", "डिसीजन स्टेज")}</h3>
                  <div style="font-size:0.86rem;font-weight:700;color:#2563eb;margin-bottom:12px;">
                    ${this.t("Assessments: RIASEC + TAMANNA + Big Five (OCEAN)", "मूल्यांकन: रुचि + तमन्ना + बिग फाइव (OCEAN)")}
                  </div>
                  <p style="font-size:0.88rem;line-height:1.55;color:var(--ink-soft);margin-bottom:16px;">
                    ${this.t(
                      "Comprehensive three-pronged evaluation (interests + cognitive aptitude + personality dynamics) to guide college degrees, entrance exams, and 900+ career pathways.",
                      "रुचि, संज्ञानात्मक क्षमता और व्यक्तित्व का त्रिकोणीय समग्र मूल्यांकन जो कॉलेज डिग्री, प्रतियोगी प्रवेश परीक्षा और 900+ करियर विकल्पों में मार्गदर्शन करता है।"
                    )}
                  </p>
                  <div style="background:var(--paper-2);padding:10px 14px;border-radius:10px;font-size:0.8rem;border:1px solid var(--edge);">
                    📊 <strong>${this.t("Report:", "रिपोर्ट:")}</strong> Level 1 (Interest) + Level 2 (Aptitude) + Level 3 (Personality)
                  </div>
                </div>
                <div style="margin-top:20px;">
                  <button type="button" class="btn btn-secondary" data-demo-group3="1" style="width:100%;font-size:0.84rem;border-color:#38bdf8;">
                    ⚡ ${this.t("Demo Group III (Class 12 View)", "डेमो ग्रुप III (कक्षा 12वीं दृश्य)")}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- HOW IT WORKS ROADMAP -->
        <section class="landing-section" id="how-it-works">
          <div class="landing-container">
            <div class="section-head">
              <p class="eyebrow"><span class="stamp">${this.t("Step-By-Step", "चरण-दर-चरण")}</span></p>
              <h2>${this.t("Your 4-Step Road to Clarity", "करियर स्पष्टता की 4-चरणीय यात्रा")}</h2>
              <p>${this.t("Takes only 15 minutes. No complex math, no intimidating questions.", "केवल 15 मिनट। कोई कठिन गणित नहीं, कोई तनाव नहीं।")}</p>
            </div>

            <div class="roadmap-grid">
              <div class="roadmap-card">
                <div class="roadmap-step-badge">1</div>
                <h3>${this.t("Profile & Dreams", "प्रोफ़ाइल और सपने")}</h3>
                <p>${this.t("Tell us about your grade, current subjects, and what excites you about the future.", "अपनी कक्षा, रुचियाँ और अपने भविष्य के सपनों के बारे में बताएँ।")}</p>
                <div class="roadmap-duration">⏱️ ~3 ${this.t("Minutes", "मिनट")}</div>
              </div>

              <div class="roadmap-card">
                <div class="roadmap-step-badge">2</div>
                <h3>${this.t("Interest Discovery", "रुचि परीक्षण")}</h3>
                <p>${this.t("24 intuitive preference questions (Like / Not Sure / Dislike) across 6 work personalities.", "24 सरल प्रश्न जो आपकी वास्तविक रुचियों को पहचानते हैं।")}</p>
                <div class="roadmap-duration">⏱️ ~7 ${this.t("Minutes", "मिनट")}</div>
              </div>

              <div class="roadmap-card">
                <div class="roadmap-step-badge">3</div>
                <h3>${this.t("Aptitude Check", "योग्यता जाँच")}</h3>
                <p>${this.t("12 quick puzzle-style reasoning questions across Logical, Verbal, Numerical & Spatial skills.", "12 तर्क और पहेली प्रश्न जो आपकी प्राकृतिक ताकत परखते हैं।")}</p>
                <div class="roadmap-duration">⏱️ ~5 ${this.t("Minutes", "मिनट")}</div>
              </div>

              <div class="roadmap-card" style="border-color:var(--vermilion);box-shadow:0 6px 0 var(--ink)">
                <div class="roadmap-step-badge" style="background:var(--vermilion);color:#fff">★</div>
                <h3>${this.t("Career Recommendations", "करियर सुझाव व सिफारिशें")}</h3>
                <p>${this.t("Get customized matches, stream recommendations (PCB/PCM/Commerce/Arts), college exams & roadmaps.", "करियर मिलान, 10वीं/12वीं के बाद सही स्ट्रीम, प्रवेश परीक्षा और कॉलेज रोडमैप पाएँ।")}</p>
                <div class="roadmap-duration" style="color:var(--teal)">🎉 ${this.t("Instant Result", "तुरंत परिणाम")}</div>
              </div>
            </div>

            <div style="text-align:center;margin-top:34px">
              <button class="btn btn-primary" type="button" data-start="1" style="max-width:320px;margin:0 auto">
                ${this.t("Begin Your Discovery Now", "अभी अपनी खोज शुरू करें")} →
              </button>
            </div>
          </div>
        </section>

        <!-- CAREER EXPLORER PREVIEW -->
        <section class="landing-section alt-bg" id="careers">
          <div class="landing-container">
            <div class="section-head">
              <p class="eyebrow"><span class="stamp">${this.t("100+ Verified Careers", "100+ करियर विकल्प")}</span></p>
              <h2>${this.t("Explore Indian Career Paths", "भारतीय करियर विकल्पों को जानें")}</h2>
              <p>${this.t("From modern digital technologies to core public services, explore complete educational pathways.", "आधुनिक तकनीक से लेकर सरकारी सेवाओं तक, पूरी शिक्षा यात्रा देखें।")}</p>
            </div>

            <!-- Category Filter Buttons -->
            <div class="cat-filter-row">
              <button type="button" class="cat-filter-btn ${selectedCat === "all" ? "active" : ""}" data-cat-filter="all">
                ${this.t("All Careers", "सभी करियर")}
              </button>
              <button type="button" class="cat-filter-btn ${selectedCat === "tech" ? "active" : ""}" data-cat-filter="tech">
                💻 ${this.t("Tech & Analytics", "तकनीक व डेटा")}
              </button>
              <button type="button" class="cat-filter-btn ${selectedCat === "healthcare" ? "active" : ""}" data-cat-filter="healthcare">
                🩺 ${this.t("Healthcare", "स्वास्थ्य व चिकित्सा")}
              </button>
              <button type="button" class="cat-filter-btn ${selectedCat === "edu_public" ? "active" : ""}" data-cat-filter="edu_public">
                🎓 ${this.t("Teaching & Public Service", "शिक्षण व जनसेवा")}
              </button>
              <button type="button" class="cat-filter-btn ${selectedCat === "arts" ? "active" : ""}" data-cat-filter="arts">
                🎨 ${this.t("Design & Media", "डिज़ाइन व कला")}
              </button>
              <button type="button" class="cat-filter-btn ${selectedCat === "agri" ? "active" : ""}" data-cat-filter="agri">
                🌾 ${this.t("Agriculture & Green", "कृषि व हरित ऊर्जा")}
              </button>
            </div>

            <!-- Career Preview Cards Grid -->
            <div class="career-preview-grid">
              ${previewCareers
                .map(
                  (c) => `
                <div class="cat-career-card" data-career="${c.id}">
                  <div class="ccc-top">
                    <div class="ccc-ico">${c.icon}</div>
                    <div class="ccc-title-wrap">
                      <h3>${isHi ? c.hi : c.title}</h3>
                      <div class="sector">${isHi ? c.hiSector : c.sector}</div>
                    </div>
                  </div>
                  <p>${isHi ? c.hiBlurb : c.blurb}</p>
                  <div class="ccc-footer">
                    <span class="tag">${c.path && c.path[1] ? c.path[1].title : "Stream Guidance"}</span>
                    <span class="cta">${this.t("View Roadmap", "रोडमैप देखें")} →</span>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>

            <div style="text-align:center;margin-top:32px">
              <button class="btn btn-secondary btn-landing-cta" type="button" data-browse-careers="1">
                ${this.t("Explore 100+ Careers", "100+ करियर देखें")} →
              </button>
            </div>
          </div>
        </section>

        <!-- WHY CAREERMARG VS TRADITIONAL -->
        <section class="landing-section" id="why-us">
          <div class="landing-container">
            <div class="section-head">
              <p class="eyebrow"><span class="stamp">${this.t("The CareerMarg Advantage", "हमारा अंतर")}</span></p>
              <h2>${this.t("Why Students Choose CareerMarg", "विद्यार्थी CareerMarg क्यों चुनते हैं")}</h2>
              <p>${this.t("Built to give honest clarity without coaching gimmicks or paid biases.", "बिना किसी भ्रामक विज्ञापनों के, सच्ची और पारदर्शी करियर सलाह।")}</p>
            </div>

            <div class="why-comparison-grid">
              <div class="why-compare-card generic">
                <h3 style="color:var(--vermilion-deep)">❌ ${this.t("Generic Online Tests", "सामान्य ऑनलाइन टेस्ट")}</h3>
                <ul class="why-points-list">
                  <li class="why-point-item"><span class="icon">❌</span><span>${this.t("Long, boring 2-hour exams full of confusing jargon.", "लंबे और उबाऊ 2 घंटे के परीक्षण।")}</span></li>
                  <li class="why-point-item"><span class="icon">❌</span><span>${this.t("Hide results behind expensive paywalls & sales calls.", "परिणाम देखने के लिए भारी शुल्क और अनचाहे कॉल्स।")}</span></li>
                  <li class="why-point-item"><span class="icon">❌</span><span>${this.t("Suggest only 3 standard streams without Indian roadmaps.", "केवल पुराने ढर्रे के विकल्प, कोई सटीक रोडमैप नहीं।")}</span></li>
                  <li class="why-point-item"><span class="icon">❌</span><span>${this.t("English only — inaccessible for Hindi/State board students.", "केवल अंग्रेज़ी भाषा में उपलब्ध।")}</span></li>
                </ul>
              </div>

              <div class="why-compare-card careermarg">
                <h3 style="color:var(--teal)">✅ <span>${BRAND}</span> ${this.t("Way", "का तरीका")}</h3>
                <ul class="why-points-list">
                  <li class="why-point-item"><span class="icon">✨</span><span><strong>15-${this.t("Minute Intuitive Assessment", "मिनट का रोचक टेस्ट")}</strong> — ${this.t("designed for high school attention spans.", "बिना किसी तनाव के।")}</span></li>
                  <li class="why-point-item"><span class="icon">✨</span><span><strong>100% ${this.t("Free & Private", "मुफ़्त और सुरक्षित")}</strong> — ${this.t("no spam calls, no commercial bias.", "कोई स्पैम कॉल या फीस नहीं।")}</span></li>
                  <li class="why-point-item"><span class="icon">✨</span><span><strong>${this.t("Career Recommendations", "करियर सुझाव")}</strong> — ${this.t("know exactly why a career fits your profile & aptitude.", "सटीक रूप से जानें कौन सा करियर आपकी क्षमताओं के अनुकूल है।")}</span></li>
                  <li class="why-point-item"><span class="icon">✨</span><span><strong>${this.t("Bilingual & Indian Context", "द्विभाषी और भारतीय संदर्भ")}</strong> — ${this.t("Hindi + English, ITI, Polytechnic, CUET, JEE, NEET & State Paths.", "हिंदी + अंग्रेज़ी, बोर्ड और प्रतियोगी परीक्षाओं का पूरा विवरण।")}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ ACCORDION -->
        <section class="landing-section" id="faq">
          <div class="landing-container">
            <div class="section-head">
              <p class="eyebrow"><span class="stamp">${this.t("Got Questions?", "संदेह निवारण")}</span></p>
              <h2>${this.t("Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न")}</h2>
              <p>${this.t("Everything you need to know about CareerMarg Discovery.", "CareerMarg के बारे में सभी महत्वपूर्ण जानकारियाँ।")}</p>
            </div>

            <div class="faq-wrap">
              <div class="faq-item open">
                <button type="button" class="faq-question" data-faq-toggle="1">
                  <span>${this.t("Is CareerMarg really 100% free to use?", "क्या CareerMarg सचमुच 100% मुफ़्त है?")}</span>
                  <span class="faq-chevron">▼</span>
                </button>
                <div class="faq-answer">
                  ${this.t(
                    "Yes! CareerMarg Phase 1 Discovery is completely free for all students, parents, and educators. There are no hidden fees, paywalls, or lockouts.",
                    "हाँ! CareerMarg डिस्कवरी सभी विद्यार्थियों, अभिभावकों और शिक्षकों के लिए पूरी तरह मुफ़्त है। कोई छुपा शुल्क नहीं है।"
                  )}
                </div>
              </div>

              <div class="faq-item">
                <button type="button" class="faq-question" data-faq-toggle="1">
                  <span>${this.t("How long does the assessment take?", "मूल्यांकन पूरा करने में कितना समय लगता है?")}</span>
                  <span class="faq-chevron">▼</span>
                </button>
                <div class="faq-answer">
                  ${this.t(
                    "The entire assessment takes about 12 to 15 minutes. It includes 24 RIASEC interest preference questions and 12 puzzle-style aptitude questions.",
                    "पूरा मूल्यांकन लगभग 12 से 15 मिनट लेता है। इसमें 24 रुचि प्रश्न और 12 तर्क प्रश्न शामिल हैं।"
                  )}
                </div>
              </div>

              <div class="faq-item">
                <button type="button" class="faq-question" data-faq-toggle="1">
                  <span>${this.t("Can I switch between Hindi and English anytime?", "क्या मैं कभी भी हिंदी और अंग्रेज़ी में बदल सकता हूँ?")}</span>
                  <span class="faq-chevron">▼</span>
                </button>
                <div class="faq-answer">
                  ${this.t(
                    "Absolutely. You can tap the 'अ / A' language toggle in the top bar at any moment, even during the middle of a question or report view.",
                    "हाँ, आप स्क्रीन के ऊपर स्थित 'अ / A' बटन दबाकर कभी भी भाषा बदल सकते हैं।"
                  )}
                </div>
              </div>

              <div class="faq-item">
                <button type="button" class="faq-question" data-faq-toggle="1">
                  <span>${this.t("What if I want to pause and resume later?", "अगर मैं बीच में रोककर बाद में पूरा करना चाहूँ?")}</span>
                  <span class="faq-chevron">▼</span>
                </button>
                <div class="faq-answer">
                  ${this.t(
                    "Your progress is automatically saved to your browser! You can pause anytime and click 'Continue' or sign in to resume right where you left off.",
                    "आपकी प्रगति स्वतः सेव हो जाती है। आप कभी भी 'जारी रखें' दबाकर वहीं से शुरू कर सकते हैं।"
                  )}
                </div>
              </div>

              <div class="faq-item">
                <button type="button" class="faq-question" data-faq-toggle="1">
                  <span>${this.t("Can I download or print my Career Master Report?", "क्या मैं अपनी करियर रिपोर्ट डाउनलोड या प्रिंट कर सकता हूँ?")}</span>
                  <span class="faq-chevron">▼</span>
                </button>
                <div class="faq-answer">
                  ${this.t(
                    "Yes! On the report page, click the 'Print Report' button to instantly save a clean PDF or print a physical copy for discussions with your parents or teachers.",
                    "हाँ! रिपोर्ट पेज पर 'प्रिंट' बटन दबाकर आप साफ़ PDF डाउनलोड कर सकते हैं।"
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA BANNER -->
        <section class="landing-section" style="padding-top:20px">
          <div class="landing-container">
            <div class="landing-cta-box">
              <h2>${this.t("Ready to find your career direction?", "अपनी सही करियर दिशा खोजने के लिए तैयार हैं?")}</h2>
              <p>${this.t(
                "Join thousands of students making confident stream and career decisions today.",
                "आज ही जुड़ें और 15 मिनट में अपने भविष्य का सही रास्ता जानें।"
              )}</p>
              <div class="btn-group cta-btn-group">
                <button class="btn btn-primary" type="button" data-start="1">
                  ${this.t("Start Free Assessment", "मुफ़्त टेस्ट शुरू करें")} →
                </button>
                <button class="btn btn-secondary" type="button" data-auth-open="signup">
                  ${this.t("Create Free Account", "खाता बनाएँ")}
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="landing-footer">
          <div class="landing-container">
            <div class="footer-grid">
              <div class="footer-brand">
                <div class="landing-nav-brand">
                  <div class="logo sm">${LOGO_SVG}</div>
                  <div>
                    <strong>${BRAND}</strong>
                    <div class="tag">${BRAND_FULL}</div>
                  </div>
                </div>
                <p>${this.t(
                  "Empowering students across India with scientific RIASEC psychometrics, multi-domain aptitude assessment, and explainable career paths.",
                  "वैज्ञानिक साइकोमेट्रिक और योग्यता मूल्यांकन के माध्यम से विद्यार्थियों को सही करियर चुनने में सक्षम बनाना।"
                )}</p>
              </div>

              <div class="footer-col">
                <h4>${this.t("Discovery Tools", "उपकरण")}</h4>
                <ul class="footer-links">
                  <li><button type="button" data-start="1">${this.t("Start Assessment", "मूल्यांकन शुरू करें")}</button></li>
                  <li><button type="button" data-open-demo-switcher="1">⚡ ${this.t("Demo Personas", "डेमो रोल")}</button></li>
                  <li><button type="button" data-go="counselor">🧑‍🏫 ${this.t("Admin & Counselor", "एडमिन व काउंसलर")}</button></li>
                </ul>
              </div>

              <div class="footer-col">
                <h4>${this.t("Frameworks", "ढाँचा")}</h4>
                <ul class="footer-links">
                  <li><a href="#features">${this.t("3-Stage Framework", "3-स्तरीय ढाँचा")}</a></li>
                  <li><a href="#how-it-works">${this.t("Assessment Journey", "मूल्यांकन यात्रा")}</a></li>
                  <li><a href="#features">${this.t("Holland RIASEC Guide", "हॉलैंड RIASEC कोड")}</a></li>
                  <li><a href="#faq">${this.t("FAQs & Help", "सहायता व प्रश्न")}</a></li>
                </ul>
              </div>

              <div class="footer-col">
                <h4>${this.t("Account & Access", "खाता व सेटिंग्स")}</h4>
                <ul class="footer-links">
                  <li><button type="button" data-auth-open="signin">${this.t("Sign In", "साइन इन")}</button></li>
                  <li><button type="button" data-auth-open="signup">${this.t("Create Free Account", "खाता बनाएँ")}</button></li>
                  <li><button type="button" data-lang="1">${this.t("Language (अ/A)", "भाषा बदलें")}</button></li>
                  <li><button type="button" data-theme-toggle="1">${this.state.theme === "dark" ? "☀️ " + this.t("Light Mode", "लाइट मोड") : "🌙 " + this.t("Dark Mode", "डार्क मोड")}</button></li>
                </ul>
              </div>
            </div>

            <div class="footer-bottom">
              <div>© 2026 ${BRAND} · Phase 1 Discovery & Guidance. All rights reserved.</div>
              <div>${this.t("Crafted for Indian School & College Students", "भारतीय विद्यार्थियों के उज्ज्वल भविष्य के लिए समर्पित")} 🇮🇳</div>
            </div>
          </div>
        </footer>
      </div>
    `;
  },

  viewOnboarding() {
    const p = this.state.profile || {};
    const isHi = this.state.lang === "hi";
    const stageInfo = this.getStudentStageInfo();
    const pPct = this.profilePercent();
    const isUnlocked = pPct >= 70;

    // Detect level metadata
    const currentLvlId = p.educationLevel || p.grade || "class_10";
    const lvlMeta = this.getEducationLevelMeta(currentLvlId);

    // Selected Archetype for the dream quiz
    const activeArchId = p.roleModelArchetype || "tech";
    const activeArchetype = this.getRoleModelArchetype(activeArchId);

    // Selected Category for Interest Tags
    const activeCat = this.state.selectedInterestCategory || "all";
    const filteredInterests = activeCat === "all"
      ? DISHA_DATA.interests
      : DISHA_DATA.interests.filter((i) => i.category === activeCat);

    const totalStepsCount = stageInfo.totalQuests + 1;

    return `
      ${this.topbar({ title: BRAND, back: true, lang: true })}
      <div class="screen">
        <!-- TOP PROGRESS STATUS -->
        <div class="progress-wrap">
          <div class="progress-meta">
            <span class="tiny" style="font-weight:800;letter-spacing:0.06em">
              ${this.t(`STEP 1 OF ${totalStepsCount} · DREAM PROFILE`, `चरण 1 / ${totalStepsCount} · मेरी पहचान और सपने`)}
            </span>
            <span class="tiny" style="font-weight:900;color:${isUnlocked ? "var(--teal)" : "var(--vermilion)"}">
              ${pPct}% ${this.t("Completed", "पूर्ण")} ${isUnlocked ? "🎉 (Quest 1 Unlocked!)" : "· (Need 70% to unlock Quests)"}
            </span>
          </div>
          <div class="bar navy">
            <span style="width:${pPct}%;background:${isUnlocked ? "linear-gradient(90deg, var(--marigold), var(--teal))" : "var(--marigold)"}"></span>
          </div>
        </div>

        <div class="onboard-grid">
          <!-- HERO BANNER -->
          <div class="hero-navy">
            <div class="hero-art" aria-hidden="true">${Art.dream()}</div>
            <h1>${this.t("Discover Your True Superpowers", "अपनी असली क्षमता और सपनों को पहचानें")}</h1>
            <p>${this.t(
              "Every great achievement begins with an inspiration. Tell us who you idealize and what subjects and activities excite you most!",
              "हर बड़ी सफलता एक प्रेरणा से शुरू होती है। हमें बताएं कि आपका आदर्श कौन है और आपको कौन सी गतिविधियाँ सबसे ज्यादा पसंद हैं!"
            )}</p>
            <button class="listen-btn" type="button" data-speak="dreams">🔊 ${this.t("Listen (Hindi/English)", "निर्देश सुनें")}</button>
          </div>

          <!-- CARD 1: ACADEMIC LEVEL & INSTITUTION -->
          <div class="card">
            <div class="card-head-title" style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
              <span style="font-size:1.4rem">🎓</span>
              <div>
                <h3 style="margin:0">${this.t("Current School Class & Details", "वर्तमान कक्षा एवं विद्यालय विवरण")}</h3>
                <small class="muted">${this.t("For School Students from Class 6 to 12 (NEP 2020 Framework)", "कक्षा 6 से 12 तक के विद्यार्थियों के लिए (NEP 2020 ढांचा)")}</small>
              </div>
            </div>

            <div class="field-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px">
              <div class="field" style="margin:0">
                <label>${this.t("Your Full Name", "आपका पूरा नाम")} <span style="color:var(--vermilion)">*</span></label>
                <input id="f-name" value="${this.escape(p.name)}" placeholder="${this.t("e.g. Rahul Sharma", "जैसे राहुल शर्मा")}" required />
              </div>

              <div class="field" style="margin:0">
                <label>${this.t("City / District & State", "शहर / जिला एवं राज्य")}</label>
                <input id="f-city" value="${this.escape(p.city || "")}" placeholder="${this.t("e.g. Jaipur, Rajasthan / Delhi", "जैसे जयपुर, राजस्थान / दिल्ली")}" />
              </div>
            </div>

            <div class="field-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 14px">
              <div class="field" style="margin:0">
                <label>${this.t("Current Education Level", "वर्तमान शिक्षा स्तर")} <span style="color:var(--vermilion)">*</span></label>
                <select id="f-education-level">
                  ${(DISHA_DATA.educationLevels || [])
                    .map((lvl) => {
                      const isSel = (p.educationLevel === lvl.id) || (p.grade === lvl.id) || (p.grade && lvl.id === "class_" + p.grade);
                      return `<option value="${lvl.id}" ${isSel ? "selected" : ""}>${isHi ? lvl.hi : lvl.label}</option>`;
                    })
                    .join("")}
                </select>
              </div>

              <div class="field" style="margin:0">
                <label>${this.t("Status", "स्थिति (Status)")}</label>
                <div class="status-pill-toggle">
                  <button type="button" class="${(!p.educationStatus || p.educationStatus === "pursuing") ? "active" : ""}" data-status="pursuing">
                    ⏳ ${this.t("Pursuing / Enrolled", "अध्ययनरत")}
                  </button>
                  <button type="button" class="${p.educationStatus === "completed" ? "active" : ""}" data-status="completed">
                    🎓 ${this.t("Completed / Passed", "उत्तीर्ण / पूर्ण")}
                  </button>
                </div>
              </div>
            </div>

            <div class="field-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 14px">
              <div class="field" style="margin:0">
                <label id="lbl-institution">
                  ${this.t("School Name", "स्कूल का नाम")}
                  <span style="color:var(--vermilion)">*</span>
                </label>
                <input id="f-school" value="${this.escape(p.school)}" placeholder="${this.t("e.g. Kendriya Vidyalaya / Govt Senior Secondary School", "जैसे केन्द्रीय विद्यालय / राजकीय उच्च माध्यमिक विद्यालय")}" />
              </div>

              <div class="field" style="margin:0">
                <label>${this.t("Stream / Academic Branch", "स्ट्रीम / मुख्य विषय / संकाय")}</label>
                <select id="f-stream">
                  ${(DISHA_DATA.streams || [])
                    .map((s) => `<option value="${s.id}" ${p.stream === s.id ? "selected" : ""}>${isHi ? s.hi : s.label}</option>`)
                    .join("")}
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- CARD 2: INTERACTIVE ROLE MODEL & DREAM QUIZ -->
        <div class="card">
          <div class="card-head-title" style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <span style="font-size:1.6rem">🌟</span>
            <div>
              <h3 style="margin:0">${this.t("Who Do You Idealize? Pick Your Dream Archetype", "आपका आदर्श कौन है? अपनी प्रेरणा चुनें")}</h3>
              <small class="muted">${this.t(
                "Every student looks up to someone when dreaming of their future. Select the vibe that fits you best!",
                "हम सभी किसी न किसी महान व्यक्तित्व से प्रेरित होते हैं। चुनें कि आप किस तरह का प्रभाव छोड़ना चाहते हैं!"
              )}</small>
            </div>
          </div>

          <!-- Archetype Selection Cards -->
          <div class="archetype-grid">
            ${(DISHA_DATA.roleModelArchetypes || [])
              .map((arch) => {
                const isSelected = activeArchId === arch.id;
                return `
                  <div class="archetype-card ${isSelected ? "active" : ""}" data-archetype="${arch.id}" role="button" tabindex="0">
                    ${isSelected ? `<div class="archetype-selected-badge">✓ ${this.t("Selected", "चयनित")}</div>` : ""}
                    <div class="archetype-card-head">
                      <div class="archetype-icon">${arch.icon}</div>
                      <div class="archetype-title">${isHi ? arch.hiTitle : arch.title}</div>
                    </div>
                    <div class="archetype-idols">
                      <strong>${this.t("Idols", "आदर्श")}:</strong> ${isHi ? arch.hiIdols : arch.idols}
                    </div>
                    <div class="archetype-reason">
                      ${isHi ? arch.hiReason : arch.defaultReason}
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>

          <!-- Interactive Dream Customization Panel -->
          <div class="archetype-detail-panel">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
              <span style="font-size:1.3rem">${activeArchetype.icon}</span>
              <strong style="font-size:1.05rem;color:var(--ink)">
                ${this.t("Customize Your Inspiration & Dream Vision", "अपनी प्रेरणा और सपनों को अनुकूलित करें")}
              </strong>
            </div>

            <div class="field-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px">
              <div class="field" style="margin:0">
                <label>${this.t("Your Specific Role Model / Idol Name", "आपका विशिष्ट प्रेरणास्रोत / आदर्श का नाम")}</label>
                <input id="f-role-model-name" value="${this.escape(p.roleModelName || "")}" placeholder="${
                  isHi ? "जैसे " + activeArchetype.hiIdols.split(",")[0] : "e.g. " + activeArchetype.idols.split(",")[0]
                }" />
              </div>

              <div class="field" style="margin:0">
                <label>${this.t("Quick Inspiration Focus (Click to add to dream)", "मुख्य प्रेरणा बिंदु (क्लिक करके जोड़ें)")}</label>
                <div class="impact-pills-wrap">
                  ${(activeArchetype.impactPills || [])
                    .map((pill) => `<button type="button" class="impact-pill" data-impact-pill="${this.escape(pill)}">+ ${pill}</button>`)
                    .join("")}
                </div>
              </div>
            </div>

            <!-- Live Dream Statement Generator & Editor -->
            <div style="margin-top:14px">
              <label style="font-weight:800;display:flex;align-items:center;justify-content:space-between">
                <span>${this.t("What do you want to achieve / be in life?", "आप जीवन में क्या हासिल करना चाहते हैं?")}</span>
                <span class="tiny muted">${this.t("Interactive live statement", "लाइव स्टेटमेंट")}</span>
              </label>
              
              <div class="dream-preview-box">
                <div class="dream-preview-text" id="dream-live-preview">
                  ${this.escape(p.aspiration || (isHi ? activeArchetype.hiQuote : activeArchetype.quote))}
                </div>
              </div>

              <textarea id="f-aspiration" style="margin-top:10px" rows="3" placeholder="${
                isHi ? activeArchetype.hiQuote : activeArchetype.quote
              }">${this.escape(p.aspiration || (isHi ? activeArchetype.hiQuote : activeArchetype.quote))}</textarea>
              <small class="muted" style="display:block;margin-top:4px">
                ${this.t("💡 You can edit this text anytime to express your authentic aspirations!", "💡 आप अपनी इच्छानुसार इस टेक्स्ट को कभी भी बदल सकते हैं!")}
              </small>
            </div>
          </div>
        </div>

        <!-- CARD 3: DIVERSE INTEREST CLOUD (SPORTS, ESPORTS, TECH, ARTS, SCIENCE, BUSINESS...) -->
        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:12px">
            <div>
              <h3 style="margin:0;display:flex;align-items:center;gap:8px">
                <span>🎯</span> ${this.t("Which topics & activities excite you most?", "आपको कौन से विषय और गतिविधियां रोमांचित करती हैं?")}
              </h3>
              <small class="muted">${this.t("Includes Sports, Esports, Creative Arts, Coding, Business & Science", "खेलकूद, ई-स्पोर्ट्स, कला, कोडिंग, बिजनेस और विज्ञान सभी शामिल हैं")}</small>
            </div>
            <div class="rich-badge" style="background:var(--marigold-soft);border-color:var(--marigold)">
              ✨ <strong>${p.interestTags.length}</strong> ${this.t("Selected", "चुने गए")}
            </div>
          </div>

          <!-- Category Filter Bar -->
          <div class="interest-cat-bar">
            ${(DISHA_DATA.interestCategories || [])
              .map((cat) => {
                const isCatActive = activeCat === cat.id;
                return `<button type="button" class="interest-cat-btn ${isCatActive ? "active" : ""}" data-cat-filter="${cat.id}">
                  ${isHi ? cat.hi : cat.label}
                </button>`;
              })
              .join("")}
          </div>

          <!-- Tag Cloud Grid -->
          <div class="chip-list chip-grid" id="interest-chips" style="grid-template-columns: repeat(auto-fill, minmax(210px, 1fr))">
            ${filteredInterests
              .map((i) => {
                const active = p.interestTags.includes(i.id);
                return `<button type="button" class="chip ${active ? "active" : ""}" data-interest="${i.id}">
                  <span class="emoji">${i.icon}</span>
                  <span>${isHi ? i.hi : i.label}</span>
                </button>`;
              })
              .join("")}
          </div>
        </div>

        <!-- CARD 4: WORK STYLE & SUPERPOWER -->
        <div class="card">
          <div class="card-head-title" style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <span style="font-size:1.5rem">⚡</span>
            <div>
              <h3 style="margin:0">${this.t("What is your Primary Learning & Working Style?", "आपकी सीखने और काम करने की स्वाभाविक शैली क्या है?")}</h3>
              <small class="muted">${this.t("Helps our psychometric algorithm recommend ideal career environments", "यह हमारे एल्गोरिदम को आपके अनुकूल माहौल खोजने में मदद करता है")}</small>
            </div>
          </div>

          <div class="workstyle-grid">
            ${(DISHA_DATA.workStyles || [])
              .map((ws) => {
                const isWsActive = (p.workStyle || "analytical") === ws.id;
                return `
                  <div class="workstyle-card ${isWsActive ? "active" : ""}" data-workstyle="${ws.id}" role="button" tabindex="0">
                    <div class="workstyle-card-title">
                      <span>${ws.icon}</span>
                      <span>${isHi ? ws.hi : ws.label}</span>
                      ${isWsActive ? `<span style="margin-left:auto;color:var(--teal);font-size:0.9rem">✓</span>` : ""}
                    </div>
                    <div class="workstyle-card-desc">${isHi ? ws.hiDesc : ws.desc}</div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- INFO CALLOUT -->
        <div class="info-callout">
          <span class="note-i" aria-hidden="true">i</span>
          <span>
            ${this.t(
              "Your profile builds the foundation for your 4 Psychometric Quests. Completing at least 70% of this profile unlocks Quest 1: Interest Finder!",
              "आपकी यह प्रोफ़ाइल आपके आगे के 4 साइकोमेट्रिक क्वेस्ट का आधार बनेगी। कम से कम 70% प्रोफ़ाइल पूरी करते ही क्वेस्ट 1 अनलॉक हो जाएगा!"
            )}
          </span>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-secondary" type="button" data-back="1">← ${this.t("Go Back", "वापस")}</button>
          <button class="btn btn-primary" type="button" data-save-profile="1" style="font-size:1.05rem;padding:12px 28px">
            💾 ${this.t("Save Profile & Continue", "प्रोफ़ाइल सेव करें एवं आगे बढ़ें")} →
          </button>
        </div>
      </div>`;
  },

  viewHome() {
    const isHi = this.state.lang === "hi";
    const name = this.state.profile.name || this.t("Student", "विद्यार्थी");
    const stageInfo = this.getStudentStageInfo();

    // Dynamic Tier & Profile Calculations
    const pPct = this.profilePercent();
    const pDone = this.profileReady();

    const t1 = this.tierProgress("tier1_riasec");
    const t2 = this.tierProgress("tier2_tamanna");
    const t3 = this.tierProgress("tier3_ocean");

    const REQ_PCT = 70; // 70% threshold required on previous step to unlock next step

    // Group-wise Discovery Path Steps based on Career Assessment Framework
    const steps = [
      {
        id: "step_profile",
        route: "onboarding",
        no: "1",
        title: isHi ? "1. विद्यार्थी प्रोफ़ाइल एवं आकांक्षाएं" : "1. Student Profile & Aspirations",
        desc: isHi ? "शैक्षणिक विवरण, कक्षा, विद्यालय एवं प्राथमिक करियर प्राथमिकताएं" : "Academic details, grade, institution, and career aspirations",
        done: pPct === 100,
        pct: pPct,
        locked: false,
        lockMsg: "",
      },
      {
        id: "step_tier1",
        route: "test/tier1_riasec",
        no: "2",
        title: isHi ? "2. रुचि खोज (RIASEC)" : "2. Find Your Interests (RIASEC)",
        desc: isHi ? "6 व्यापक रुचि प्रकारों की पहचान एवं प्राथमिक करियर क्लस्टर मैपिंग" : "Identifies your natural inclinations across 6 interest types to match career paths",
        done: t1.done,
        pct: pPct < REQ_PCT ? 0 : t1.pct,
        locked: pPct < REQ_PCT,
        lockMsg: isHi ? `🔒 अनलॉक करने के लिए पहले प्रोफ़ाइल (कम से कम ${REQ_PCT}%) पूरी करें!` : `🔒 Complete at least ${REQ_PCT}% of Student Profile to unlock!`,
      }
    ];

    // Group II (Class 9-10) and Group III (Class 11-12) include NCERT TAMANNA Aptitude
    if (stageInfo.requiredAssessments.includes("tier2_tamanna")) {
      const prevDone = t1.pct >= REQ_PCT;
      steps.push({
        id: "step_tier2",
        route: "test/tier2_tamanna",
        no: String(steps.length + 1),
        title: isHi ? `${steps.length + 1}. अभिक्षमता खोज [NCERT TAMANNA]` : `${steps.length + 1}. Discover Your Aptitudes (NCERT TAMANNA)`,
        desc: isHi ? "कक्षा 10 के बाद सही स्ट्रीम चयन के लिए 7 संज्ञानात्मक क्षमताओं का मूल्यांकन" : "Evaluates 7 core cognitive abilities essential for stream and course selection",
        done: t2.done,
        pct: !prevDone ? 0 : t2.pct,
        locked: !prevDone,
        lockMsg: isHi ? `🔒 अनलॉक करने के लिए पहले रुचि खोज (कम से कम ${REQ_PCT}%) पूरी करें!` : `🔒 Complete at least ${REQ_PCT}% of Find Your Interests to unlock!`,
      });
    }

    // Group III (Class 11-12) includes Big Five OCEAN Personality Test
    if (stageInfo.requiredAssessments.includes("tier3_ocean")) {
      const prevDone = t2.pct >= REQ_PCT;
      steps.push({
        id: "step_tier3",
        route: "test/tier3_ocean",
        no: String(steps.length + 1),
        title: isHi ? `${steps.length + 1}. व्यक्तित्व समझ [Big Five OCEAN]` : `${steps.length + 1}. Understand Your Personality (Big Five OCEAN)`,
        desc: isHi ? "कॉलेज डिग्री व कार्यशैली अनुकूलन हेतु प्रमुख व्यक्तित्व आयामों का मूल्यांकन" : "Evaluates core behavioral traits supporting higher education and professional tracks",
        done: t3.done,
        pct: !prevDone ? 0 : t3.pct,
        locked: !prevDone,
        lockMsg: isHi ? `🔒 अनलॉक करने के लिए पहले अभिक्षमता खोज (कम से कम ${REQ_PCT}%) पूरा करें!` : `🔒 Complete at least ${REQ_PCT}% of Discover Your Aptitudes to unlock!`,
      });
    }

    const allQuestsDone = pDone && stageInfo.requiredAssessments.every(k => this.tierProgress(k).done);
    const currentStep = steps.find((s) => !s.done && !s.locked) || steps.find((s) => !s.done) || steps[steps.length - 1];

    const corePcts = [pPct, ...stageInfo.requiredAssessments.map(k => {
      const tp = this.tierProgress(k);
      return tp.done ? 100 : tp.pct;
    })];
    const overallPct = Math.round(corePcts.reduce((a, b) => a + b, 0) / corePcts.length);
    const topMatches = t1.done ? this.matches().slice(0, 3) : [];

    return `
      ${this.topbar({ title: BRAND, lang: true, avatar: true })}
      <div class="screen home-greeting" style="max-width:1100px;margin:0 auto;padding-bottom:50px;">
        
        <!-- Clean, Spacious Header with Cohort Badge -->
        <div class="home-header-minimal" style="margin-bottom:24px;padding:22px 24px;background:var(--card);border:1.5px solid var(--edge);border-radius:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
          <div class="home-header-left" style="flex:1;min-width:200px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;">
              <span class="rich-badge" style="background:${stageInfo.stageBg};border-color:${stageInfo.stageColor};font-size:0.84rem;font-weight:800;color:var(--ink);">
                ${stageInfo.badgeIcon} ${stageInfo.groupNo} (${stageInfo.classesLabel}) · ${isHi ? stageInfo.stageHi : stageInfo.stage}
              </span>
              <span style="font-size:0.84rem;color:var(--ink-soft);font-weight:600;">
                🏫 ${this.escape(this.state.profile.school || "Kendriya Vidyalaya")}
              </span>
            </div>
            <h1 style="margin:4px 0 6px;font-size:1.8rem;letter-spacing:-0.02em;">
              ${this.t("Namaste", "नमस्ते")}, <span style="color:var(--vermilion);">${this.escape(name.split(" ")[0])}</span>
            </h1>
            <p class="muted" style="margin:0;font-size:0.92rem;">
              ${this.t(
                "Welcome to your personalized career discovery roadmap. Follow the steps below at your own pace.",
                "आपके व्यक्तिगत करियर मार्गदर्शन पोर्टल में स्वागत है। अपनी गति से नीचे दिए गए चरणों को पूरा करें।"
              )}
            </p>
          </div>

          <div class="home-header-progress" style="text-align:right;min-width:140px;">
            <div style="font-size:0.82rem;font-weight:700;color:var(--ink-soft);margin-bottom:4px;">
              ${this.t("OVERALL PROGRESS", "समग्र प्रगति")}
            </div>
            <div style="font-size:2rem;font-weight:900;color:var(--teal);line-height:1;">
              ${overallPct}<small style="font-size:1.1rem;">%</small>
            </div>
            <div style="font-size:0.78rem;color:var(--ink-soft);margin-top:4px;">
              ${steps.filter(s => s.done).length} / ${steps.length} ${this.t("Steps Cleared", "चरण पूर्ण")}
            </div>
          </div>
        </div>

        <div class="home-grid home-discovery-grid">
          
          <!-- LEFT: CLEAN DISCOVERY STEPS -->
          <div class="home-discovery-left">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <h2 style="font-size:1.2rem;margin:0;color:var(--ink);">${this.t("Your Discovery Steps", "आपके मूल्यांकन चरण")}</h2>
              <span class="muted" style="font-size:0.82rem;">${stageInfo.groupNo} (${isHi ? stageInfo.gradeDisplayHi : stageInfo.gradeDisplay})</span>
            </div>

            <div class="journey-grid" style="display:flex;flex-direction:column;gap:14px;">
              ${steps
                .map((s) => {
                  const isCurrent = s.id === currentStep.id && !s.done && !s.locked;
                  const isInProgress = !s.done && !s.locked && s.pct > 0;
                  let cls = "";
                  if (s.done) cls = "done";
                  else if (s.locked) cls = "locked";
                  else if (isCurrent) cls = "current";
                  else if (isInProgress) cls = "in-progress";

                  return `
                    <div class="card journey-card ${cls}" style="margin:0;padding:18px 20px;border-radius:14px;border:1.5px solid ${s.done ? "var(--teal)" : isCurrent ? "var(--vermilion)" : "var(--edge)"};background:var(--card);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
                      <div style="display:flex;align-items:flex-start;gap:14px;flex:1;min-width:0;">
                        <div style="width:36px;height:36px;min-width:36px;border-radius:50%;background:${s.done ? "var(--teal)" : s.locked ? "var(--field)" : "var(--vermilion)"};color:${s.locked ? "var(--ink-soft)" : "#fff"};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.95rem;">
                          ${s.done ? "✓" : s.locked ? "🔒" : s.no}
                        </div>
                        <div style="flex:1;">
                          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                            <strong style="font-size:1.02rem;color:var(--ink);">${s.title}</strong>
                            ${s.done ? `<span style="font-size:0.75rem;padding:2px 8px;background:rgba(45,212,191,0.12);color:var(--teal);border-radius:6px;font-weight:700;">✓ ${this.t("Completed", "पूर्ण")}</span>` : ""}
                          </div>
                          <p class="muted" style="margin:4px 0 0;font-size:0.85rem;line-height:1.45;">${s.desc}</p>
                          ${!s.locked ? `
                            <div style="height:5px;background:var(--field);border-radius:5px;overflow:hidden;margin-top:8px;max-width:240px;">
                              <div style="height:100%;width:${s.done ? 100 : s.pct}%;background:${s.done ? "var(--teal)" : "var(--vermilion)"};"></div>
                            </div>
                          ` : ""}
                        </div>
                      </div>

                      <div>
                        ${
                          s.id === "step1_profile" && s.done
                            ? `<button class="btn btn-outline btn-sm" type="button" data-step-route="onboarding" style="color:var(--teal);border-color:var(--teal);font-weight:700;">✓ ${this.t("Review / Edit", "समीक्षा / बदलें")} →</button>`
                            : s.done
                            ? `<button class="btn btn-outline btn-sm" type="button" data-go="report" style="color:var(--teal);border-color:var(--teal);font-weight:700;">✓ ${this.t("Completed · View Report", "पूर्ण · रिपोर्ट देखें")} →</button>`
                            : s.locked
                            ? `<button class="btn btn-outline btn-sm" type="button" data-step-route="${s.route}" data-step-locked="1" data-step-lockmsg="${this.escape(s.lockMsg)}" style="opacity:0.6;cursor:not-allowed;">🔒 ${this.t("Locked", "लॉक")}</button>`
                            : s.pct > 0
                            ? `<button class="btn btn-primary btn-sm" type="button" data-step-route="${s.route}">⚡ ${this.t("Resume", "जारी रखें")} (${s.pct}%) →</button>`
                            : `<button class="btn btn-primary btn-sm" type="button" data-step-route="${s.route}">▶ ${this.t("Start", "शुरू करें")} →</button>`
                        }
                      </div>
                    </div>
                  `;
                })
                .join("")}
            </div>

            <!-- Stage Completion Banner -->
            ${allQuestsDone ? `
              <div class="card" style="margin-top:20px;padding:20px;background:rgba(45,212,191,0.08);border:2px solid var(--teal);border-radius:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
                <div>
                  <div class="tiny" style="font-weight:800;color:var(--teal);letter-spacing:0.06em;">
                    🎉 ${this.t("ALL ASSESSMENTS COMPLETED", "सभी मूल्यांकन पूर्ण")}
                  </div>
                  <h3 style="margin:4px 0 4px;font-size:1.1rem;color:var(--ink);">
                    ${this.t("Your Official Psychometric Report is Ready", "आपकी आधिकारिक साइकोमेट्रिक रिपोर्ट तैयार है")}
                  </h3>
                  <p class="muted" style="margin:0;font-size:0.86rem;">
                    ${this.t("View your 6-factor Holland code, cognitive aptitudes, and stream guidance.", "अपना 6-आयामी हॉलैंड कोड, अभिक्षमता स्कोर व स्ट्रीम मार्गदर्शन देखें।")}
                  </p>
                </div>
                <button class="btn btn-primary" type="button" data-go="report">
                  📊 ${this.t("View Official Report", "आधिकारिक रिपोर्ट देखें")} →
                </button>
              </div>
            ` : ""}
          </div>

          <!-- RIGHT: TOP 3 CAREER MATCHES & SAVED VAULT -->
          <div class="home-side" style="display:flex;flex-direction:column;gap:18px;">
            <div class="card" style="margin:0;padding:20px;border-radius:16px;border:1.5px solid var(--edge);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                <div class="tiny" style="font-weight:800;letter-spacing:0.06em;color:var(--ink-soft);">
                  🚀 ${this.t("TOP 3 CAREER MATCHES", "शीर्ष 3 करियर विकल्प")}
                </div>
                ${topMatches.length ? `<span class="rich-badge" style="font-size:0.72rem;background:rgba(45,212,191,0.12);color:var(--teal);">Top Picks</span>` : ""}
              </div>

              ${
                topMatches.length
                  ? `
                    <div style="display:flex;flex-direction:column;gap:10px;">
                      ${topMatches
                        .map(
                          (c, idx) => `
                        <button class="mini-match" type="button" data-career="${c.id}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--field);border-radius:10px;border:1px solid var(--edge);width:100%;text-align:left;cursor:pointer;transition:all 0.15s ease;">
                          <div style="display:flex;align-items:center;gap:10px;">
                            <span style="font-size:1.3rem;">${c.icon}</span>
                            <div>
                              <div style="font-weight:700;font-size:0.88rem;color:var(--ink);">${this.state.lang === "hi" ? c.hi : c.title}</div>
                              <div style="font-size:0.72rem;color:var(--ink-soft);">№ ${idx + 1} Best Fit Pathway</div>
                            </div>
                          </div>
                          <span style="font-weight:800;color:var(--teal);font-size:0.92rem;background:rgba(45,212,191,0.12);padding:4px 8px;border-radius:6px;">${c.fit}%</span>
                        </button>`
                        )
                        .join("")}
                    </div>
                    <button class="btn btn-secondary btn-block" style="margin-top:14px;width:100%;" type="button" data-go="report">
                      📊 ${this.t("View Complete Assessment Report", "पूरी रिपोर्ट देखें")} →
                    </button>
                  `
                  : `
                    <div style="padding:14px;background:var(--field);border-radius:10px;text-align:center;">
                      <span style="font-size:2rem;display:block;margin-bottom:6px;">🎯</span>
                      <p class="muted" style="margin:0;font-size:0.86rem;line-height:1.45;">
                        ${this.t(
                          "Complete Step 2 (Interest Assessment) to preview your top 3 recommended career pathways.",
                          "अपने शीर्ष 3 अनुशंसित करियर विकल्प देखने के लिए स्टेप 2 (रुचि मूल्यांकन) पूरा करें।"
                        )}
                      </p>
                    </div>
                  `
              }
            </div>

            <!-- Saved Careers Vault Card -->
            <div class="card tag-card" style="margin:0;padding:20px;border-radius:16px;border:1.5px solid var(--edge);cursor:pointer;" data-open-saved="1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <div class="tiny" style="font-weight:800;letter-spacing:0.06em;color:var(--ink-soft);">
                  ⭐ ${this.t("SAVED CAREERS VAULT", "सेव किए गए करियर")}
                </div>
                <span class="tag-count" style="background:var(--vermilion);color:#fff;font-weight:800;padding:2px 8px;border-radius:12px;font-size:0.78rem;">
                  ${this.getValidSavedCareers().length}
                </span>
              </div>
              <p class="muted" style="font-size:0.84rem;margin:0 0 12px;line-height:1.4;">
                ${this.t("Access your bookmarked roadmaps, role models, and eligibility details.", "अपने सुरक्षित किए गए रोडमैप, हस्तियां एवं योग्यता विवरण देखें।")}
              </p>
              <button class="btn btn-ink btn-block" type="button" data-open-saved="1" style="width:100%;">
                ⭐ ${this.t("Open Saved Careers", "सेव करियर देखें")} →
              </button>
            </div>

          </div>
        </div>
      </div>`;
  },

  viewAssessments() {
    const isHi = this.state.lang === "hi";
    const stageInfo = this.getStudentStageInfo();

    // Dynamic Tier & Profile Calculations
    const pPct = this.profilePercent();
    const t1 = this.tierProgress("tier1_riasec");
    const t2 = this.tierProgress("tier2_tamanna");
    const t3 = this.tierProgress("tier3_ocean");

    const REQ_PCT = 70;

    const ft = window.DISHA_DATA?.frameworkTiers || {};
    const ft1 = ft.tier1_riasec || {};
    const ft2 = ft.tier2_tamanna || {};
    const ft3 = ft.tier3_ocean || {};

    const allPossibleTiers = [
      {
        id: "tier1_riasec",
        title: isHi ? ft1.titleHi : ft1.title,
        badge: isHi ? ft1.badgeHi : ft1.badge,
        sub: isHi ? ft1.descHi : ft1.desc,
        icon: ft1.icon || "🎯",
        done: t1.done,
        pct: pPct < REQ_PCT ? 0 : t1.pct,
        locked: pPct < REQ_PCT,
        lockMsg: isHi ? `🔒 अनलॉक करने के लिए पहले विद्यार्थी प्रोफ़ाइल (कम से कम ${REQ_PCT}%) पूरी करें!` : `🔒 Please complete at least ${REQ_PCT}% of your Student Profile to unlock!`,
        qCount: ft1.qCount || 42,
      },
      {
        id: "tier2_tamanna",
        title: isHi ? ft2.titleHi : ft2.title,
        badge: isHi ? ft2.badgeHi : ft2.badge,
        sub: isHi ? ft2.descHi : ft2.desc,
        icon: ft2.icon || "🧠",
        done: t2.done,
        pct: t1.pct < REQ_PCT ? 0 : t2.pct,
        locked: t1.pct < REQ_PCT,
        lockMsg: isHi ? `🔒 अनलॉक करने के लिए पहले रुचि खोज (कम से कम ${REQ_PCT}%) पूरी करें!` : `🔒 Complete at least ${REQ_PCT}% of Find Your Interests to unlock!`,
        qCount: ft2.qCount || 28,
      },
      {
        id: "tier3_ocean",
        title: isHi ? ft3.titleHi : ft3.title,
        badge: isHi ? ft3.badgeHi : ft3.badge,
        sub: isHi ? ft3.descHi : ft3.desc,
        icon: ft3.icon || "🌟",
        done: t3.done,
        pct: t2.pct < REQ_PCT ? 0 : t3.pct,
        locked: t2.pct < REQ_PCT,
        lockMsg: isHi ? `🔒 अनलॉक करने के लिए पहले अभिक्षमता खोज (कम से कम ${REQ_PCT}%) पूरा करें!` : `🔒 Complete at least ${REQ_PCT}% of Discover Your Aptitudes to unlock!`,
        qCount: ft3.qCount || 20,
      },
    ];

    // Filter to ONLY tiers required for the student's current stage
    const tiers = allPossibleTiers.filter(t => (stageInfo.requiredAssessments || []).includes(t.id));
    const allDone = tiers.length > 0 && tiers.every(t => t.done);

    return `
      ${this.topbar({ title: this.t("Assessments", "मूल्यांकन"), lang: true, avatar: true })}
      <div class="screen">
        <!-- Stage Info Header Banner -->
        <div class="card" style="margin-bottom:20px;background:${stageInfo.stageBg};border:2px solid ${stageInfo.stageColor};">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                <span class="tiny" style="font-weight:800;letter-spacing:0.06em;color:var(--ink);">
                  ${stageInfo.badgeIcon} ${stageInfo.groupNo} (${stageInfo.classesLabel}) · ${isHi ? stageInfo.stageHi : stageInfo.stage}
                </span>
                <span class="pill-btn" style="background:var(--card);font-size:0.75rem;padding:2px 8px;font-weight:800;border:1.5px solid var(--ink);">
                  ${isHi ? stageInfo.gradeDisplayHi : stageInfo.gradeDisplay}
                </span>
              </div>
              <h2 style="font-size:1.35rem;margin:2px 0 6px">${isHi ? (stageInfo.assessmentTitleHi || stageInfo.stageHi) : (stageInfo.assessmentTitle || stageInfo.stage)}</h2>
              <p class="muted" style="margin:0;font-size:0.88rem;max-width:720px;line-height:1.5">${isHi ? stageInfo.focusHi : stageInfo.focus}</p>
            </div>
            <div style="text-align:right;">
              <span class="expedition-milestone-tag" style="background:var(--card);color:var(--ink);font-weight:700">
                ${tiers.filter(t => t.done).length} / ${tiers.length} ${this.t("Completed", "पूर्ण")}
              </span>
            </div>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <h3 style="font-size:1.15rem;margin:0 0 4px">${this.t("Assessments to be Conducted", "आयोजित किए जाने वाले मूल्यांकन")}</h3>
          <p class="muted" style="font-size:0.88rem;margin:0">${this.t(
            "Stage-appropriate standardized psychological evaluations aligned with your class.",
            "आपकी कक्षा और स्तर के अनुसार मानकीकृत मनोवैज्ञानिक मूल्यांकन।"
          )}</p>
        </div>

        <div class="stage-assessments-list" style="display:flex;flex-direction:column;gap:14px;">
          ${tiers
            .map((t) => {
              return `
                <div class="card" style="margin:0;padding:16px 18px;border:1.5px solid var(--edge);border-radius:14px;background:var(--card);transition:transform 0.15s ease,box-shadow 0.15s ease;">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;">
                    <div style="display:flex;align-items:center;gap:14px;flex:1;min-width:240px;">
                      <div style="font-size:2rem;width:48px;height:48px;min-width:48px;display:flex;align-items:center;justify-content:center;background:var(--field);border-radius:12px;border:1px solid var(--edge);">
                        ${t.locked ? "🔒" : t.icon}
                      </div>
                      <div style="flex:1;">
                        <strong style="font-size:1.05rem;color:var(--ink);display:block;">${t.title}</strong>
                        <p class="muted" style="margin:4px 0 0;font-size:0.84rem;line-height:1.45;">${t.sub}</p>
                        <div class="quiz-progress-wrap" style="height:6px;margin-top:10px;max-width:320px;">
                          <div class="quiz-progress-bar" style="width:${t.done ? 100 : t.pct}%"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      ${
                        t.done
                          ? `<button class="btn btn-outline btn-sm" type="button" data-go="report" style="color:var(--teal);border-color:var(--teal);font-weight:700;">✓ ${this.t("Completed · View Report", "पूर्ण · रिपोर्ट देखें")} →</button>`
                          : t.locked
                          ? `<button class="btn btn-outline btn-sm" type="button" data-start-tier="${t.id}" data-tier-locked="1" data-tier-lockmsg="${this.escape(t.lockMsg || "")}" style="opacity:0.65;cursor:not-allowed;">🔒 ${this.t("Locked", "लॉक")}</button>`
                          : t.pct > 0
                          ? `<button class="btn btn-primary btn-sm" type="button" data-start-tier="${t.id}">⚡ ${this.t("Resume", "जारी रखें")} (${t.pct}%) →</button>`
                          : `<button class="btn btn-primary btn-sm" type="button" data-start-tier="${t.id}">▶ ${this.t("Start Assessment", "मूल्यांकन शुरू करें")} →</button>`
                      }
                    </div>
                  </div>
                </div>`;
            })
            .join("")}
        </div>

        <!-- Stage Completion Banner (Only when all tests completed) -->
        ${allDone ? `
          <div class="card" style="margin-top:20px;background:rgba(45,212,191,0.12);border:1.5px solid var(--teal);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
            <div>
              <strong style="color:var(--teal);font-size:0.98rem;">🎉 ${this.t("All Stage Assessments Completed!", "इस चरण के सभी मूल्यांकन पूर्ण हो चुके हैं!")}</strong>
              <p class="muted" style="margin:2px 0 0;font-size:0.85rem;">${this.t("Your comprehensive diagnostic report is ready in the Report tab.", "आपकी विस्तृत साइकोमेट्रिक रिपोर्ट तैयार है, जिसे आप रिपोर्ट टैब में देख सकते हैं।")}</p>
            </div>
            <button class="btn btn-primary btn-sm" type="button" data-go="report">${this.t("Open Report", "रिपोर्ट खोलें")} →</button>
          </div>
        ` : ""}

        <!-- Next Stage Informational Preview -->
        ${stageInfo.groupKey === "group_1" ? `
          <div class="card" style="margin-top:20px;background:var(--field);border:1.5px dashed var(--teal);">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:1.8rem">🧭</span>
              <div>
                <strong style="font-size:0.95rem;color:var(--teal)">
                  ${this.t("Upcoming in Exploration Stage (Classes 9–10)", "एक्सप्लोरेशन स्टेज (कक्षा 9–10) में आगामी")}
                </strong>
                <p class="muted" style="margin:2px 0 0;font-size:0.85rem">
                  ${this.t(
                    "In Classes 9 & 10, students take the NCERT TAMANNA Aptitude Test (7 cognitive domains) to scientifically choose their 11th-12th stream (Science, Commerce, or Humanities).",
                    "कक्षा 9 और 10 में, विद्यार्थी एनसीईआरटी तमन्ना अभिक्षमता परीक्षण (7 संज्ञानात्मक आयाम) देते हैं ताकि वे कक्षा 11-12 के लिए सही स्ट्रीम का चयन कर सकें।"
                  )}
                </p>
              </div>
            </div>
          </div>
        ` : stageInfo.groupKey === "group_2" ? `
          <div class="card" style="margin-top:20px;background:var(--field);border:1.5px dashed var(--vermilion);">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:1.8rem">🎯</span>
              <div>
                <strong style="font-size:0.95rem;color:var(--vermilion)">
                  ${this.t("Upcoming in Decision Stage (Classes 11–12)", "डिसीजन स्टेज (कक्षा 11–12) में आगामी")}
                </strong>
                <p class="muted" style="margin:2px 0 0;font-size:0.85rem">
                  ${this.t(
                    "In Classes 11 & 12, the Big Five (OCEAN) Personality Battery unlocks to match your work habits and emotional temperament with competitive degrees and career tracks.",
                    "कक्षा 11 और 12 में, बिग फाइव (OCEAN) व्यक्तित्व मूल्यांकन अनलॉक होता है जो आपके स्वभाव को कॉलेज डिग्री और करियर के साथ सटीक रूप से मिलाता है।"
                  )}
                </p>
              </div>
            </div>
          </div>
        ` : ""}

        <div class="did-you-know-box" style="margin-top:20px">
          <div class="did-you-know-icon">💡</div>
          <div>
            <strong>${this.t("Psychometric Framework", "वैज्ञानिक मानक")}</strong>: 
            ${this.t(
              "Built on validated NCERT TAMANNA cognitive batteries, Holland Code (RIASEC), and Big Five (OCEAN) models aligned with NEP 2020 career guidance standards for school students.",
              "एनसीईआरटी तमन्ना (TAMANNA), हॉलैंड कोड (RIASEC) और बिग फाइव (OCEAN) मॉडलों पर आधारित राष्ट्रीय शिक्षा नीति 2020 समर्थित स्कूली मूल्यांकन ढांचा।"
            )}
          </div>
        </div>
      </div>`;
  },

  viewTest() {
    if (!this.state.profile.name) {
      this.state.profile.name = this.state.auth?.name || "Student";
    }
    if (!this.state.profile.grade) {
      this.state.profile.grade = this.state.auth?.grade || "10";
    }
    const isHi = this.state.lang === "hi";
    const activeTier = this.state.activeTier || "tier1_riasec";
    const ft = window.DISHA_DATA?.frameworkTiers || {};
    const ft1 = ft.tier1_riasec || {};
    const ft2 = ft.tier2_tamanna || {};
    const ft3 = ft.tier3_ocean || {};

    const tierMetaMap = {
      tier1_riasec: {
        title: isHi ? ft1.titleHi : ft1.title,
        sub: isHi ? `${ft1.qCount} प्रश्न · ${ft1.badgeHi}` : `${ft1.qCount} Questions · ${ft1.badge}`,
        icon: ft1.icon || "🎯"
      },
      tier2_tamanna: {
        title: isHi ? ft2.titleHi : ft2.title,
        sub: isHi ? `${ft2.qCount} प्रश्न · ${ft2.badgeHi}` : `${ft2.qCount} Questions · ${ft2.badge}`,
        icon: ft2.icon || "🧠"
      },
      tier3_ocean: {
        title: isHi ? ft3.titleHi : ft3.title,
        sub: isHi ? `${ft3.qCount} प्रश्न · ${ft3.badgeHi}` : `${ft3.qCount} Questions · ${ft3.badge}`,
        icon: ft3.icon || "🌟"
      },
      mental_health: {
        title: isHi ? "परीक्षा रेज़िलिएंस एवं आत्मविश्वास सूचकांक" : "Exam Resilience & Confidence Index",
        sub: isHi ? "12 प्रश्न · परीक्षा तनाव प्रबंधन" : "12 Questions · Stress management & focus",
        icon: "🧘"
      }
    };
    const currentTierMeta = tierMetaMap[activeTier] || tierMetaMap.tier1_riasec;

    // BUSINESS LOGIC: If assessment is already completed, lock and prevent retake
    const isCompleted = this.tierProgress(activeTier).done;
    if (isCompleted) {
      return `
        ${this.topbar({ title: BRAND, back: true, lang: true })}
        <div class="screen" style="max-width:720px;margin:28px auto;padding:16px;">
          <div class="card" style="padding:36px 24px;border-radius:22px;border:2px solid var(--teal);background:var(--card);text-align:center;box-shadow:0 8px 30px rgba(0,0,0,0.06);">
            <div style="font-size:3.5rem;margin-bottom:12px;line-height:1;">🎉</div>
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(45,212,191,0.14);color:var(--teal);border:1.5px solid var(--teal);padding:4px 14px;border-radius:999px;font-size:0.85rem;font-weight:800;margin-bottom:14px;">
              ✓ ${this.t("Assessment Completed & Sealed", "मूल्यांकन पूर्ण एवं सुरक्षित")}
            </div>
            <h2 style="font-size:1.5rem;margin:0 0 10px;color:var(--ink);">
              ${currentTierMeta.icon} ${currentTierMeta.title}
            </h2>
            <p class="muted" style="font-size:0.95rem;line-height:1.6;max-width:540px;margin:0 auto 26px;">
              ${this.t(
                "You have already successfully completed this assessment. As per standardized career guidance rules, completed assessments cannot be retaken to maintain psychometric accuracy. You can view your detailed psychological evaluation and stream recommendations in your Official Report.",
                "आप इस मूल्यांकन को पहले ही सफलतापूर्वक पूरा कर चुके हैं। वैज्ञानिक करियर मार्गदर्शन नियमों के अनुसार, पूर्ण किए गए मूल्यांकन को दोबारा नहीं दिया जा सकता। आपके सभी विश्लेषण और परिणाम आधिकारिक रिपोर्ट में उपलब्ध हैं।"
              )}
            </p>
            <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
              <button class="btn btn-primary" type="button" data-go="report" style="padding:12px 26px;font-size:0.95rem;font-weight:800;">
                📊 ${this.t("View Official Report", "आधिकारिक रिपोर्ट देखें")} →
              </button>
              <button class="btn btn-secondary" type="button" data-go="home" style="padding:12px 22px;font-size:0.95rem;">
                🏠 ${this.t("Back to Dashboard", "डैशबोर्ड पर जाएँ")}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    let questions = (window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === activeTier);
    if (!questions.length) questions = (window.DISHA_ALL_QUESTIONS || []).slice(0, 6);

    let idx = this.state.tierIndex || 0;
    if (idx >= questions.length) idx = questions.length - 1;
    if (idx < 0) idx = 0;
    this.state.tierIndex = idx;

    const currentQ = questions[idx];
    if (!currentQ) {
      return `
        ${this.topbar({ title: BRAND, back: true, pause: true, lang: true })}
        <div class="screen">
          <div class="card empty">
            <p>${this.t("No questions found in this tier.", "इस टियर में कोई प्रश्न नहीं मिला।")}</p>
            <button class="btn btn-primary" data-go="assessments">${this.t("Back to Assessments", "मूल्यांकन पर वापस जाएँ")}</button>
          </div>
        </div>`;
    }
    const totalQ = questions.length;
    const answeredCount = questions.filter((q) => !!this.state.tierAnswers[q.id]).length;
    const progressPct = totalQ > 0 ? Math.round((answeredCount / totalQ) * 100) : 0;
    const selectedAns = this.state.tierAnswers[currentQ.id];
    const isAnswered = !!selectedAns;
    const allAnswered = answeredCount === totalQ;

    const traitMeta = (window.DISHA_ASSESSMENT_TRAITS && window.DISHA_ASSESSMENT_TRAITS[currentQ.traitCode]) || {
      name: currentQ.traitTitle || "Trait",
      nameHi: currentQ.traitTitleHi || "योग्यता",
      icon: "🎯",
      fact: "Every skill and interest guides your unique roadmap.",
      factHi: "हर कौशल और रुचि आपके अनोखे करियर पथ को दिशा देती है।",
    };

    return `
      ${this.topbar({ title: BRAND, back: true, pause: true, lang: true })}
      <div class="screen quiz-screen" style="max-width:1160px;">
        
        <!-- Focused Quest Header Bar -->
        <div class="test-focus-header">
          <div style="display:flex;align-items:center;gap:12px">
            <button type="button" class="btn btn-secondary btn-sm" data-go="assessments" title="${this.t("Back to Assessments", "मूल्यांकन सूची पर वापस जाएं")}">
              ← ${this.t("All Assessments", "सभी मूल्यांकन")}
            </button>
            <div>
              <h2 style="font-size:1.15rem;margin:0;display:flex;align-items:center;gap:6px">
                <span>${currentTierMeta.icon}</span> ${currentTierMeta.title}
              </h2>
              <span class="muted" style="font-size:0.8rem">${currentTierMeta.sub}</span>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="hud-status-badge" title="Live Synced with MySQL Database">🟢 ${this.t("Database Connected", "डेटाबेस कनेक्टेड")}</span>
          </div>
        </div>

        <div class="assessment-main-grid">
          <!-- Left Column: Active Question Card -->
          <div class="question-box-card">
            <div class="question-box-header">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span class="question-meta-badge">
                  ${isHi ? currentQ.submoduleTitleHi : currentQ.submoduleTitle}
                </span>
                <span class="framework-tag-pill" style="font-size:0.78rem;padding:3px 8px;border-radius:6px;background:rgba(201,67,42,0.12);color:var(--vermilion);font-weight:800">
                  ${currentTierMeta.icon} ${activeTier === "tier1_riasec" ? "RIASEC Model" : activeTier === "tier2_tamanna" ? "NCERT TAMANNA" : activeTier === "tier3_ocean" ? "Big Five (OCEAN)" : "Exam Resilience"}
                </span>
                <span style="font-size:0.82rem;color:var(--ink-soft);font-weight:700">
                  ${traitMeta.icon} ${isHi ? traitMeta.nameHi : traitMeta.name}
                </span>
              </div>

              <div style="display:flex;align-items:center;gap:8px">
                <button type="button" class="pill-btn" data-test-shuffle="1" style="font-size:0.75rem;padding:4px 10px">
                  🔀 ${this.t("Shuffle", "शफल")}
                </button>
                <div class="question-counter-badge">
                  ${isHi ? `प्रश्न ${idx + 1} / ${totalQ}` : `Q ${idx + 1} of ${totalQ}`}
                </div>
              </div>
            </div>

            <!-- Diagnostic Framework Explainer Strip -->
            <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:var(--field);border-radius:8px;border:1px solid var(--edge);margin-bottom:12px;font-size:0.78rem">
              <span class="muted">
                🔬 ${this.t(`Evaluates ${traitMeta.name} for career affinity & strengths.`, `${traitMeta.nameHi} का मूल्यांकन कर आपके करियर मिलान को सटीक बनाता है।`)}
              </span>
              <span style="color:var(--teal);font-weight:700">NEP 2020 Diagnostic</span>
            </div>

            <!-- Progress Bar -->
            <div class="quiz-progress-wrap">
              <div class="quiz-progress-bar" style="width:${progressPct}%"></div>
            </div>

            <!-- Question Text -->
            <h2 class="question-text-primary">
              ${isHi ? currentQ.questionTextHi : currentQ.questionText}
            </h2>
            <div style="font-size:0.84rem;color:var(--ink-soft);font-style:italic">
              ${isHi ? currentQ.questionText : currentQ.questionTextHi}
            </div>

            <!-- Options List -->
            <div class="quiz-options-list">
              ${currentQ.options
                .map((opt, oIdx) => {
                  const isSel = String(selectedAns) === String(opt.id);
                  const iconOrNum = opt.icon || (opt.id === "like" ? "👍" : opt.id === "dislike" ? "👎" : (oIdx + 1));
                  return `
                    <button type="button" class="quiz-option-btn ${isSel ? "selected" : ""}" data-test-opt="${opt.id}">
                      <span class="opt-circle-num">${iconOrNum}</span>
                      <span style="flex:1;font-weight:700;">${isHi ? opt.textHi : opt.text}</span>
                      ${isSel ? `<span style="font-size:1.15rem;color:var(--teal);font-weight:900;">✓</span>` : ""}
                    </button>`;
                })
                .join("")}
            </div>

            <!-- Did You Know Box -->
            <div class="did-you-know-box">
              <div class="did-you-know-icon">💡</div>
              <div>
                <strong>${this.t("Did you know?", "क्या आप जानते हैं?")}</strong>
                <div>${isHi ? traitMeta.factHi : traitMeta.fact}</div>
              </div>
            </div>

            ${
              activeTier === "mental_health"
                ? `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(45,212,191,0.14);border-radius:10px;border:1px solid var(--teal)">
                    <span style="font-size:0.82rem;font-weight:700;color:var(--ink)">🧘 ${this.t("Feeling nervous right now?", "क्या आप अभी तनाव महसूस कर रहे हैं?")}</span>
                    <button type="button" class="pill-btn" data-go="relief" style="font-size:0.75rem;padding:4px 10px">${this.t("Open 4-7-8 Breathing Room →", "4-7-8 शांति प्राणायाम →")}</button>
                  </div>`
                : ""
            }

            <!-- Navigation Buttons -->
            <div class="btn-row" style="margin-top:auto;justify-content:space-between;align-items:center">
              <button class="btn btn-secondary" type="button" data-test-prev="1" ${idx === 0 ? "disabled" : ""}>
                ← ${this.t("Previous", "पिछला")}
              </button>

              <div style="font-size:0.82rem;color:var(--ink-soft);font-weight:700">
                ${answeredCount} / ${totalQ} ${this.t("Answered", "उत्तरित")}
              </div>

              ${
                idx < totalQ - 1
                  ? `<button class="btn btn-primary" type="button" data-test-next="1" ${!isAnswered ? "disabled" : ""}>
                      ${this.t("Next", "अगला")} →
                    </button>`
                  : `<button class="btn btn-primary" type="button" data-test-submit="1" ${!allAnswered ? "disabled" : ""}>
                      🏆 ${this.t("Submit Battery ✓", "टियर सबमिट करें ✓")}
                    </button>`
              }
            </div>
          </div>

          <!-- Right Column: Question Palette & Guidance Pane -->
          <div class="quiz-sidebar-pane">
            <!-- Question Palette -->
            <div class="question-palette-card">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <h3 style="font-size:0.92rem;margin:0;font-family:var(--font);font-weight:800">
                  🎯 ${this.t("Question Palette", "प्रश्न पैलेट")} (${answeredCount}/${totalQ})
                </h3>
                <span style="font-size:0.75rem;color:var(--ink-soft)">${progressPct}% ${this.t("Done", "पूर्ण")}</span>
              </div>
              <div class="question-palette-grid">
                ${questions
                  .map((q, qIdx) => {
                    const ans = !!this.state.tierAnswers[q.id];
                    const isCurr = qIdx === idx;
                    return `
                      <button type="button" class="palette-num-btn ${ans ? "answered" : ""} ${isCurr ? "current" : ""}" data-palette-jump="${qIdx}" title="Question ${qIdx + 1}">
                        ${qIdx + 1}
                      </button>`;
                  })
                  .join("")}
              </div>
            </div>

            <!-- Quest Guidance Info Card (Hidden as user can navigate via tabs) -->
            <div class="quest-guidance-card" style="display:none;">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:1.2rem">📌</span>
                <strong style="font-size:0.9rem;color:var(--ink)">${this.t("Assessment Guidance", "परीक्षण निर्देश")}</strong>
              </div>
              <p class="muted" style="font-size:0.8rem;line-height:1.5;margin:0">
                ${this.t(
                  "Choose the option that feels most natural to you. There are no right or wrong answers. Responses are saved to your profile in real-time.",
                  "जो विकल्प आपके लिए सबसे स्वाभाविक लगे उसे चुनें। कोई सही या गलत उत्तर नहीं है। आपके उत्तर डेटाबेस में सुरक्षित हो रहे हैं।"
                )}
              </p>
              <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px">
                <button class="btn btn-secondary btn-block btn-sm" type="button" data-go="home">
                  🏠 ${this.t("Back to Dashboard", "डैशबोर्ड पर जाएँ")}
                </button>
                <button class="btn btn-secondary btn-block btn-sm" type="button" data-go="report">
                  📊 ${this.t("View Progress Report", "रिपोर्ट देखें")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  },

  viewRelief() {
    const isHi = this.state.lang === "hi";
    const rd = window.DISHA_RELIEF_DATA || {};
    const affList = rd.affirmations || [];
    const currentAff = this.state.activeAffirmation || (affList.length ? affList[0] : {
      en: "I am calm, focused, and prepared to do my best.",
      hi: "मैं शांत, एकाग्र और अपना सर्वश्रेष्ठ देने के लिए पूरी तरह तैयार हूँ।"
    });

    return `
      ${this.topbar({ title: this.t("Mind Gym & Exam Stress Relief", "माइंड जिम एवं परीक्षा तनाव निवारण"), back: true, lang: true })}
      <div class="screen" style="max-width:1080px;">
        
        <!-- Top Introduction Banner -->
        <div style="margin-bottom:20px;">
          <div class="tag-row" style="margin-bottom:8px">
            <span class="trait-pill-item" style="background:var(--teal-soft);color:var(--teal);border-color:var(--teal)">🧠 NEP 2020 Holistic Mental Well-being</span>
            <span class="trait-pill-item" style="background:var(--marigold-soft);color:var(--ink)">4-7-8 Neuro-Calm Pacer</span>
          </div>
          <h1 style="font-size:1.65rem;margin:0 0 6px;letter-spacing:-0.02em">
            🧘 ${this.t("Mind Gym: Student Well-being & Anti-Anxiety Suite", "माइंड जिम: छात्र मानसिक स्वास्थ्य एवं तनाव मुक्ति")}
          </h1>
          <p class="muted" style="font-size:0.92rem;line-height:1.5">
            ${this.t(
              "Evidence-based neuro-resilience tools designed to lower exam cortisol, restore cognitive clarity, and boost academic self-efficacy.",
              "परीक्षा के तनाव को दूर करने, एकाग्रता बढ़ाने और आत्मविश्वास को मजबूत करने के लिए वैज्ञानिक रूप से प्रमाणित अभ्यास।"
            )}
          </p>
        </div>

        <div class="relief-grid">
          <!-- Left: Interactive 4-7-8 Breathing Circle -->
          <div class="breathing-box-card">
            <span class="tiny" style="color:var(--teal);font-weight:800;letter-spacing:0.12em">
              ${this.t("NEURO-CALM PACER", "न्यूरो-काल्म पेसर")}
            </span>
            <h2 style="font-size:1.3rem;margin:4px 0 6px">
              ${isHi ? rd.breathing?.titleHi : rd.breathing?.title}
            </h2>
            <p class="muted" style="font-size:0.84rem;max-width:320px;margin:0 auto">
              ${isHi ? rd.breathing?.descHi : rd.breathing?.desc}
            </p>

            <!-- Dynamic Visual Breathing Circle -->
            <div class="breathing-circle-wrap" id="breathe-wrap">
              <div class="breathing-circle-outer"></div>
              <div class="breathing-circle-inner" id="breathe-inner">
                <span class="breathing-state-title" id="breathe-phase-text">${this.t("Ready", "तैयार")}</span>
                <span class="breathing-timer-count" id="breathe-timer-text">4s</span>
              </div>
            </div>

            <div id="breathe-sub-text" style="font-size:0.88rem;color:var(--ink);font-weight:700;min-height:22px;margin-bottom:16px">
              ${this.t("Tap start to begin guided relaxation cycle", "शांति चक्र शुरू करने के लिए स्टार्ट दबाएँ")}
            </div>

            <div class="btn-row" style="justify-content:center;gap:12px;width:100%">
              <button class="btn btn-primary" type="button" data-breathe-toggle="1" id="breathe-toggle-btn" style="min-width:160px">
                ▶ ${this.t("Start Breathing Cycle", "प्राणायाम शुरू करें")}
              </button>
              <button class="btn btn-secondary" type="button" data-go="test/mental_health">
                📝 ${this.t("Take Stress Quiz", "तनाव टेस्ट लें")}
              </button>
            </div>
          </div>

          <!-- Right: Daily Affirmations & Quick Grounding Card -->
          <div>
            <!-- Affirmation Box -->
            <div class="affirmation-box">
              <span class="tiny" style="color:var(--vermilion);font-weight:800">✨ ${this.t("POSITIVE EXAM AFFIRMATION", "दैनिक सकारात्मक विचार")}</span>
              <div class="affirmation-text" id="affirmation-display">
                "${isHi ? currentAff.hi : currentAff.en}"
              </div>
              <button class="pill-btn with-ico" type="button" data-new-affirmation="1" style="margin-top:8px">
                🎲 ${this.t("New Affirmation", "नया विचार")}
              </button>
            </div>

            <!-- Quick Study Rhythm Tip -->
            <div class="card" style="background:var(--field);border:1.5px solid var(--edge)">
              <h3 style="font-size:1.05rem;margin:0 0 6px;display:flex;align-items:center;gap:8px">
                <span>⏱️</span> ${this.t("25/5 Pomodoro Neuro-Rest Rhythm", "25/5 पोमोडोरो विश्राम तकनीक")}
              </h3>
              <p class="muted" style="font-size:0.86rem;line-height:1.5;margin:0 0 10px">
                ${this.t(
                  "Study for 25 minutes with zero notifications, then take 5 minutes of mindful physical stretching or hydration. This prevents cognitive overload.",
                  "25 मिनट बिना फोन छुए पूरी एकाग्रता से पढ़ें, फिर 5 मिनट पानी पिएं या टहलें। इससे मस्तिष्क कभी थकता नहीं है।"
                )}
              </p>
              <button class="btn btn-secondary btn-block" type="button" data-go="report">
                📊 ${this.t("View Resilience in Report", "रिपोर्ट में रेज़िलिएंस देखें")} →
              </button>
            </div>
          </div>
        </div>

        <!-- SECTION 2: 4 Anti-Anxiety Scientific Strategies -->
        <div style="margin-top:34px;">
          <h2 style="font-size:1.25rem;margin-bottom:14px;border-bottom:1.5px solid var(--edge);padding-bottom:8px">
            💡 ${this.t("4 Evidence-Based Exam Anxiety Buster Strategies", "4 वैज्ञानिक परीक्षा तनाव निवारण तकनीकें")}
          </h2>

          <div class="grounding-grid">
            ${(rd.strategies || [])
              .map(
                (s) => `
              <div class="grounding-card">
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="grounding-card-icon">${s.icon}</div>
                  <h3 style="font-size:0.98rem;margin:0">${isHi ? s.titleHi : s.title}</h3>
                </div>
                <p class="muted" style="font-size:0.84rem;line-height:1.5;margin:0">
                  ${isHi ? s.bodyHi : s.body}
                </p>
              </div>`
              )
              .join("")}
          </div>
        </div>

        <!-- SECTION 3: 24/7 Government & Student Helpline Directory -->
        <div style="margin-top:34px;">
          <h2 style="font-size:1.25rem;margin-bottom:14px;border-bottom:1.5px solid var(--edge);padding-bottom:8px">
            📞 ${this.t("24/7 Government & Student Counselling Helplines", "24/7 निःशुल्क सरकारी छात्र परामर्श हेल्पलाइन")}
          </h2>

          <div class="helpline-grid">
            ${(rd.helplines || [])
              .map(
                (h) => `
              <div class="helpline-card">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <strong style="font-size:0.95rem">${isHi ? h.nameHi : h.name}</strong>
                  <span class="question-meta-badge">${h.badge}</span>
                </div>
                <p class="muted" style="font-size:0.82rem;margin:0">${isHi ? h.descHi : h.desc}</p>
                <a href="tel:${h.number.replace(/[^0-9]/g, "")}" class="helpline-card-num">
                  📞 ${h.number}
                </a>
              </div>`
              )
              .join("")}
          </div>
        </div>
      </div>`;
  },

  _gateOnboarding() {
    return `
      ${this.topbar({ title: BRAND, back: true })}
      <div class="screen">
        <div class="card empty">
          ${this.emptyArt()}
          <p>${this.t("Please complete your profile first.", "पहले अपनी प्रोफ़ाइल पूरी करें।")}</p>
          <button class="btn btn-primary" type="button" data-go="onboarding">${this.t("Go to Profile", "प्रोफ़ाइल पर जाएँ")}</button>
        </div>
      </div>`;
  },

  viewReport() {
    const p = this.state.profile;
    const isHi = this.state.lang === "hi";
    const stageInfo = this.getStudentStageInfo();

    // 100% Dynamic trait scores computed from student's actual responses
    const computedTraits = (window.MoineeScore && window.DISHA_ALL_QUESTIONS)
      ? MoineeScore.scoreAllTiers(this.state.tierAnswers, window.DISHA_ALL_QUESTIONS)
      : {};
    const ts = { ...this.state.traitScores, ...(computedTraits.traits || computedTraits) };

    const completedTiers = this.state.completedTiers || [];
    const ansKeys = Object.keys(this.state.tierAnswers || {}).filter(k => {
      const v = this.state.tierAnswers[k];
      return v !== undefined && v !== null && v !== "" && !Number.isNaN(v);
    });

    const isTier1Done = completedTiers.includes("tier1_riasec") || ansKeys.some(k => k.startsWith("ria-") || k.startsWith("qria-") || k.startsWith("q_r_") || k.startsWith("q_i_") || k.startsWith("q_a_") || k.startsWith("q_s_") || k.startsWith("q_e_") || k.startsWith("q_c_") || k.startsWith("r") || k.startsWith("i_"));
    const isTier2Done = completedTiers.includes("tier2_tamanna") || ansKeys.some(k => k.startsWith("tam-") || k.startsWith("tam_") || k.startsWith("t_") || k.startsWith("tamanna_"));
    const isTier3Done = completedTiers.includes("tier3_ocean") || ansKeys.some(k => k.startsWith("oce-") || k.startsWith("ocean_") || k.startsWith("o_") || k.startsWith("c_") || k.startsWith("e_"));

    const riasecScores = {
      R: ts.R !== undefined ? ts.R : 72,
      I: ts.I !== undefined ? ts.I : 85,
      A: ts.A !== undefined ? ts.A : 60,
      S: ts.S !== undefined ? ts.S : 75,
      E: ts.E !== undefined ? ts.E : 80,
      C: ts.C !== undefined ? ts.C : 68,
    };
    const riasecLabels = ["Realistic (R)", "Investigative (I)", "Artistic (A)", "Social (S)", "Enterprising (E)", "Conventional (C)"];
    const riasecValues = [riasecScores.R, riasecScores.I, riasecScores.A, riasecScores.S, riasecScores.E, riasecScores.C];
    const riasecRadarSvg = MoineeScore.generateRadarSvg(riasecLabels, riasecValues, { size: 300, radius: 95 });

    // Dynamic Top Holland Code derived from user scores
    const rankedRiasec = [
      ["R", riasecScores.R, "Realistic", "व्यावहारिक"],
      ["I", riasecScores.I, "Investigative", "खोजी"],
      ["A", riasecScores.A, "Artistic", "रचनात्मक"],
      ["S", riasecScores.S, "Social", "सामाजिक"],
      ["E", riasecScores.E, "Enterprising", "उद्यमी"],
      ["C", riasecScores.C, "Conventional", "संगठित"],
    ].sort((a, b) => b[1] - a[1]);

    const topHollandCode = rankedRiasec.slice(0, 3).map((x) => x[0]).join("-");
    const topHollandLabels = rankedRiasec.slice(0, 3).map((x) => (isHi ? x[3] : x[2])).join(", ");

    // TAMANNA Aptitudes
    const tamannaList = [
      { code: "TAMANNA_LA", name: isHi ? "भाषा प्रवीणता (Language Aptitude)" : "Language Aptitude (LA)", score: ts.TAMANNA_LA != null ? ts.TAMANNA_LA : 0 },
      { code: "TAMANNA_VA", name: isHi ? "मौखिक तार्किकता (Verbal Aptitude)" : "Verbal Aptitude (VA)", score: ts.TAMANNA_VA != null ? ts.TAMANNA_VA : 0 },
      { code: "TAMANNA_NA", name: isHi ? "संख्यात्मक अभिक्षमता (Numerical Aptitude)" : "Numerical Aptitude (NA)", score: ts.TAMANNA_NA != null ? ts.TAMANNA_NA : 0 },
      { code: "TAMANNA_SA", name: isHi ? "स्थानिक समझ (Spatial Aptitude 3D)" : "Spatial Aptitude (SA)", score: ts.TAMANNA_SA != null ? ts.TAMANNA_SA : 0 },
      { code: "TAMANNA_PA", name: isHi ? "अवधारणात्मक शुद्धता (Perceptual Aptitude)" : "Perceptual Aptitude (PA)", score: ts.TAMANNA_PA != null ? ts.TAMANNA_PA : 0 },
      { code: "TAMANNA_MA", name: isHi ? "यांत्रिक क्षमता (Mechanical Aptitude)" : "Mechanical Aptitude (MA)", score: ts.TAMANNA_MA != null ? ts.TAMANNA_MA : 0 },
      { code: "TAMANNA_AR", name: isHi ? "अमूर्त तार्किक क्षमता (Abstract Reasoning)" : "Abstract Reasoning (AR)", score: ts.TAMANNA_AR != null ? ts.TAMANNA_AR : 0 },
    ];

    // Big Five OCEAN
    const oceanLabels = ["Openness (O)", "Conscientiousness (C)", "Extraversion (E)", "Agreeableness (A)", "Emotional Stability (N)"];
    const oceanValues = [
      ts.OCEAN_O != null ? ts.OCEAN_O : 0,
      ts.OCEAN_C != null ? ts.OCEAN_C : 0,
      ts.OCEAN_E != null ? ts.OCEAN_E : 0,
      ts.OCEAN_A != null ? ts.OCEAN_A : 0,
      ts.OCEAN_N != null ? ts.OCEAN_N : 0,
    ];
    const oceanRadarSvg = MoineeScore.generateRadarSvg(oceanLabels, oceanValues, {
      size: 300,
      radius: 95,
      strokeColor: "var(--teal)",
      fillColor: "rgba(45, 212, 191, 0.22)",
    });

    const matches = this.matches().slice(0, 3);

    // Automatically synchronize the latest generated report to MySQL
    setTimeout(() => this.syncWithDatabase(), 50);

    return `
      ${this.topbar({ title: this.t("Diagnostic Psychometric Report", "डायग्नोस्टिक साइकोमेट्रिक रिपोर्ट"), back: true, lang: true })}
      <div class="screen" id="report-print" style="max-width:1080px;margin:0 auto;padding-bottom:50px;">

        <div class="printable-report-card" style="background:var(--card);border-radius:18px;border:1.5px solid var(--edge);padding:28px;">
          <!-- Report Header -->
          <div class="report-header-banner" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:24px;border-bottom:1.5px solid var(--edge);padding-bottom:20px;">
            <div style="display:flex;align-items:center;gap:14px;">
              <div class="logo sm" style="width:48px;height:48px;">${LOGO_SVG}</div>
              <div>
                <h1 style="font-size:1.6rem;margin:0;letter-spacing:-0.02em">CAREERMARG</h1>
                <p class="muted" style="font-size:0.86rem;margin-top:2px">
                  ${this.t("National Psychometric & Career Guidance Diagnostic Report", "राष्ट्रीय साइकोमेट्रिक एवं करियर मार्गदर्शन डायग्नोस्टिक रिपोर्ट")}
                </p>
                <div style="font-size:0.75rem;color:var(--vermilion);font-weight:800;margin-top:2px">
                  NEP 2020 × NCERT TAMANNA × Holland Code Framework
                </div>
              </div>
            </div>

            <div style="text-align:right;">
              <div style="font-weight:800;font-size:0.95rem;color:var(--ink)">${this.escape(p.school || "Kendriya Vidyalaya")}</div>
              <div class="muted" style="font-size:0.8rem">${this.t("Career Guidance & Development Cell", "करियर काउंसलिंग एवं विकास प्रकोष्ठ")}</div>
              <div class="rich-badge" style="background:${stageInfo.stageBg};border-color:${stageInfo.stageColor};display:inline-block;margin-top:6px;font-size:0.78rem;font-weight:800;color:var(--ink);">
                ${stageInfo.badgeIcon} ${stageInfo.groupNo} (${stageInfo.classesLabel}) · ${isHi ? stageInfo.stageHi : stageInfo.stage}
              </div>
            </div>
          </div>

          <!-- Student Metadata Strip -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 140px), 1fr));gap:14px;padding:16px 18px;background:var(--field);border-radius:14px;border:1.5px solid var(--edge);margin-bottom:28px;">
            <div>
              <span class="tiny">${this.t("STUDENT NAME", "छात्र का नाम")}</span>
              <div style="font-weight:800;font-size:1.05rem;color:var(--ink)">${this.escape(p.name || "Student")}</div>
            </div>
            <div>
              <span class="tiny">${this.t("GRADE & STAGE", "कक्षा व चरण")}</span>
              <div style="font-weight:800;font-size:1.05rem;color:var(--ink)">${isHi ? stageInfo.gradeDisplayHi : stageInfo.gradeDisplay} · ${stageInfo.groupNo}</div>
            </div>
            <div>
              <span class="tiny">${this.t("HOLLAND CODE", "हॉलैंड कोड")}</span>
              <div style="font-weight:800;font-size:1.05rem;color:var(--vermilion)">${isTier1Done ? `${topHollandCode} (${topHollandLabels})` : this.t("Pending Assessment", "असेसमेंट लंबित")}</div>
            </div>
            <div>
              <span class="tiny">${this.t("EVALUATION DATE", "मूल्यांकन तिथि")}</span>
              <div style="font-weight:800;font-size:1.05rem;color:var(--ink)">${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
            </div>
          </div>

          <!-- SECTION 1: RIASEC Vector Analysis (Level 1: All Groups) -->
          <div style="margin-bottom:34px;">
            <h2 style="font-size:1.22rem;display:flex;align-items:center;gap:8px;margin-bottom:14px;border-bottom:1.5px solid var(--edge);padding-bottom:8px;">
              <span>🎯</span> 1. ${this.t("Level 1: Holland Code (RIASEC) Career Interest Vector", "लेवल 1: हॉलैंड कोड (RIASEC) करियर रुचि वेक्टर")}
            </h2>

            ${isTier1Done ? `
              <div class="report-grid-2">
                <div style="display:flex;justify-content:center;padding:8px 0;">
                  ${riasecRadarSvg}
                </div>
                <div>
                  <p style="font-size:0.92rem;line-height:1.55;color:var(--ink);margin-bottom:14px;">
                    ${this.t(
                      `Based on your live psychometric responses, your primary interest cluster is <strong>"${topHollandCode}" (${topHollandLabels})</strong>. This highlights your intrinsic motivation across practical, intellectual, and creative dimensions.`,
                      `साइकोमेट्रिक विश्लेषण के अनुसार, आपका प्राथमिक रुचि क्लस्टर <strong>"${topHollandCode}" (${topHollandLabels})</strong> है। यह आपकी स्वाभाविक प्रेरणा, प्राथमिकताओं और रचनात्मक क्षमताओं को प्रदर्शित करता है।`
                    )}
                  </p>
                  <div>
                    <span class="trait-pill-item" style="background:var(--marigold-soft);color:var(--ink)">🔬 ${rankedRiasec[0][2]}: ${rankedRiasec[0][1]}%</span>
                    <span class="trait-pill-item" style="background:var(--indigo-soft);color:var(--ink)">💼 ${rankedRiasec[1][2]}: ${rankedRiasec[1][1]}%</span>
                    <span class="trait-pill-item" style="background:var(--teal-soft);color:var(--ink)">🤝 ${rankedRiasec[2][2]}: ${rankedRiasec[2][1]}%</span>
                  </div>
                </div>
              </div>
            ` : `
              <div class="report-locked-quest-card">
                <div class="report-locked-quest-info">
                  <div class="report-locked-icon">🎯</div>
                  <div>
                    <div class="report-locked-title">${this.t("Level 1: Interest Inventory (RIASEC) Pending", "लेवल 1: रुचि इन्वेंटरी (RIASEC) लंबित")}</div>
                    <p class="report-locked-desc">${this.t("Complete the Interest Inventory to generate your personalized 6-dimensional career interest radar and primary Holland Code.", "अपनी 6-आयामी करियर रुचि रडार और हॉलैंड कोड देखने के लिए रुचि इन्वेंटरी पूरी करें।")}</p>
                  </div>
                </div>
                <button class="btn btn-primary" type="button" data-go="test/tier1_riasec">⚡ ${this.t("Start Interest Inventory", "रुचि इन्वेंटरी शुरू करें")}</button>
              </div>
            `}
          </div>

          <!-- SECTION 2: TAMANNA Cognitive Aptitude (Level 2: Group II & III) -->
          <div style="margin-bottom:34px;">
            <h2 style="font-size:1.22rem;display:flex;align-items:center;gap:8px;margin-bottom:14px;border-bottom:1.5px solid var(--edge);padding-bottom:8px;">
              <span>🧠</span> 2. ${this.t("Level 2: NCERT TAMANNA 7-Domain Cognitive Aptitude Battery", "लेवल 2: एनसीईआरटी तमन्ना 7-क्षेत्रीय संज्ञानात्मक अभिक्षमता")}
            </h2>

            ${stageInfo.groupKey === "group_1" ? `
              <div class="card" style="background:var(--field);border:1.5px dashed var(--teal);padding:20px;">
                <div style="display:flex;align-items:center;gap:14px;">
                  <span style="font-size:2.2rem">🌱</span>
                  <div>
                    <h3 style="margin:0 0 4px;font-size:1.05rem;color:var(--teal);">
                      ${this.t("Discovery Stage (Classes 6–8): Interest Discovery Focus", "डिस्कवरी स्टेज (कक्षा 6–8): रुचि खोज पर केंद्रित")}
                    </h3>
                    <p class="muted" style="margin:0;font-size:0.88rem;line-height:1.5">
                      ${this.t(
                        "As per the National Career Assessment Framework, cognitive aptitude testing begins in Class 9 (Group II - Exploration Stage). At the middle school level (Classes 6–8), the primary focus is exploring diverse interests (RIASEC) and developing healthy learning curiosity without premature career pressure.",
                        "राष्ट्रीय करियर मूल्यांकन ढांचे के अनुसार, संज्ञानात्मक अभिक्षमता परीक्षण कक्षा 9 (ग्रुप II - एक्सप्लोरेशन स्टेज) से शुरू होता है। मिडिल स्कूल स्तर पर मुख्य ध्यान विभिन्न रुचियों की खोज करने और जिज्ञासा विकसित करने पर रहता है।"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ` : isTier2Done ? `
              <div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 260px), 1fr));gap:16px;margin-bottom:20px;">
                  ${tamannaList
                    .map((tam) => {
                      const b = MoineeScore.band(tam.score);
                      return `
                        <div class="apt-bar-row">
                          <div class="apt-bar-meta">
                            <span>${tam.name}</span>
                            <span style="color:${b.color}">${tam.score}% (${isHi ? b.hi : b.en})</span>
                          </div>
                          <div class="apt-bar-track">
                            <div class="apt-bar-fill" style="width:${tam.score}%;background:${b.color}"></div>
                          </div>
                        </div>`;
                    })
                    .join("")}
                </div>

                <!-- Academic Stream Fit Breakdown -->
                <div style="background:var(--field);padding:18px 20px;border-radius:14px;border:1.5px solid var(--edge);">
                  <div style="font-size:0.95rem;font-weight:800;color:var(--ink);margin-bottom:12px;display:flex;align-items:center;gap:8px;">
                    <span>🧭</span> ${this.t("Cognitive Stream Synergy Recommendations (Post-Class 10)", "संज्ञानात्मक स्ट्रीम चयन अनुशंसा (कक्षा 10 के बाद)")}
                  </div>
                  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 280px), 1fr));gap:12px;">
                    ${(MoineeScore.recommendStreams ? MoineeScore.recommendStreams(ts).slice(0, 3) : [])
                      .map((st, sIdx) => `
                        <div style="background:var(--card);padding:14px;border-radius:10px;border:1.5px solid ${sIdx === 0 ? "var(--teal)" : "var(--edge)"};position:relative;">
                          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                            <strong style="font-size:0.92rem;color:var(--ink);">${st.icon} ${isHi ? st.titleHi : st.title}</strong>
                            <span style="font-weight:800;font-size:0.85rem;color:${st.color};background:${st.color}18;padding:2px 8px;border-radius:12px;">${st.score}% ${this.t("Fit", "मैच")}</span>
                          </div>
                          <p style="margin:0 0 6px;font-size:0.8rem;color:var(--ink-soft);line-height:1.4;">${isHi ? st.reasonHi : st.reasonEn}</p>
                          <div style="font-size:0.75rem;color:var(--teal);font-weight:700;">
                            ${this.t("Target Pathways:", "लक्ष्य क्षेत्र:")} ${(isHi ? st.fieldsHi : st.fields).slice(0, 3).join(" • ")}
                          </div>
                        </div>
                      `).join("")}
                  </div>
                </div>
              </div>
            ` : `
              <div class="report-locked-quest-card">
                <div class="report-locked-quest-info">
                  <div class="report-locked-icon">🧠</div>
                  <div>
                    <div class="report-locked-title">${this.t("NCERT TAMANNA 7-Domain Cognitive Aptitude Pending", "एनसीईआरटी तमन्ना 7-क्षेत्रीय अभिक्षमता परीक्षण लंबित")}</div>
                    <p class="report-locked-desc">${this.t("Complete the Aptitude Test to evaluate your Language, Spatial (3D), Mechanical, Numerical, Perceptual, and Abstract reasoning abilities for scientific stream selection.", "कक्षा 10 के बाद सही स्ट्रीम (Science, Commerce, Humanities) चयन के लिए तमन्ना अभिक्षमता परीक्षण पूरा करें।")}</p>
                  </div>
                </div>
                <button class="btn btn-primary" type="button" data-go="test/tier2_tamanna">⚡ ${this.t("Start Aptitude Test", "अभिक्षमता परीक्षण शुरू करें")}</button>
              </div>
            `}
          </div>

          <!-- SECTION 3: Big Five OCEAN (Level 3: Group III) -->
          <div style="margin-bottom:34px;">
            <h2 style="font-size:1.22rem;display:flex;align-items:center;gap:8px;margin-bottom:14px;border-bottom:1.5px solid var(--edge);padding-bottom:8px;">
              <span>🌟</span> 3. ${this.t("Level 3: Big Five (OCEAN) Personality & Temperament Profile", "लेवल 3: बिग फाइव (OCEAN) व्यक्तित्व एवं स्वभाव प्रोफाइल")}
            </h2>

            ${stageInfo.groupKey !== "group_3" ? `
              <div class="card" style="background:var(--field);border:1.5px dashed var(--vermilion);padding:20px;">
                <div style="display:flex;align-items:center;gap:14px;">
                  <span style="font-size:2.2rem">🎯</span>
                  <div>
                    <h3 style="margin:0 0 4px;font-size:1.05rem;color:var(--vermilion);">
                      ${this.t("Personality Profiling Unlocks in Group III (Classes 11–12)", "व्यक्तित्व प्रोफाइलिंग ग्रुप III (कक्षा 11–12) में सक्रिय होती है")}
                    </h3>
                    <p class="muted" style="margin:0;font-size:0.88rem;line-height:1.5">
                      ${this.t(
                        "The Big Five (OCEAN) Personality Assessment is administered during senior secondary school (Classes 11–12) to align student temperament, work habits, and focus with college degree specializations and career tracks.",
                        "बिग फाइव (OCEAN) व्यक्तित्व मूल्यांकन कक्षा 11 एवं 12 में दिया जाता है ताकि छात्र के स्वभाव और कार्यशैली को कॉलेज डिग्री और पेशेवर करियर से सटीक रूप से जोड़ा जा सके।"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ` : isTier3Done ? `
              <div class="report-grid-2">
                <div style="display:flex;justify-content:center;padding:8px 0;">
                  ${oceanRadarSvg}
                </div>

                <div>
                  <div style="padding:16px 20px;background:var(--field);border-radius:14px;border:1.5px solid var(--edge);margin-bottom:14px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                      <strong style="font-size:0.92rem">🌟 ${this.t("Openness & Curiosity", "जिज्ञासा एवं खुलापन (Openness)")}</strong>
                      <span style="font-weight:800;color:var(--teal)">${ts.OCEAN_O || 75}%</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                      <strong style="font-size:0.92rem">🎯 ${this.t("Conscientiousness & Discipline", "अनुशासन एवं कर्तव्यनिष्ठा (Conscientiousness)")}</strong>
                      <span style="font-weight:800;color:var(--marigold)">${ts.OCEAN_C || 80}%</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                      <strong style="font-size:0.92rem">🤝 ${this.t("Extraversion & Teamwork", "सामाजिकता एवं बहिर्मुखता (Extraversion)")}</strong>
                      <span style="font-weight:800;color:var(--indigo)">${ts.OCEAN_E || 70}%</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                      <strong style="font-size:0.92rem">❤️ ${this.t("Agreeableness & Empathy", "सहानुभूति एवं सहयोग (Agreeableness)")}</strong>
                      <span style="font-weight:800;color:var(--teal)">${ts.OCEAN_A || 78}%</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <strong style="font-size:0.92rem">🛡️ ${this.t("Emotional Stability & Resilience", "भावनात्मक स्थिरता एवं धैर्य (Resilience)")}</strong>
                      <span style="font-weight:800;color:var(--teal)">${ts.OCEAN_N || 72}%</span>
                    </div>
                  </div>

                  <p class="muted" style="font-size:0.86rem;line-height:1.5">
                    💡 ${this.t(
                      "Your balanced personality profile indicates disciplined focus, high adaptability, and strong collaborative leadership suited for rigorous higher education and professional excellence.",
                      "आपकी संतुलित व्यक्तित्व प्रोफाइल अनुशासित अध्ययन, उच्च अनुकूलन क्षमता और टीम नेतृत्व को दर्शाती है जो उच्च शिक्षा एवं सफल करियर के लिए आदर्श है।"
                    )}
                  </p>
                </div>
              </div>
            ` : `
              <div class="report-locked-quest-card">
                <div class="report-locked-quest-info">
                  <div class="report-locked-icon">🌟</div>
                  <div>
                    <div class="report-locked-title">${this.t("Big Five (OCEAN) Personality Assessment Pending", "बिग फाइव (OCEAN) व्यक्तित्व मूल्यांकन लंबित")}</div>
                    <p class="report-locked-desc">${this.t("Complete the Personality Test to evaluate your Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability metrics.", "कॉलेज और करियर के लिए अपने कार्य-शैली और व्यक्तित्व आयामों का विश्लेषण करने हेतु व्यक्तित्व परीक्षण पूरा करें।")}</p>
                  </div>
                </div>
                <button class="btn btn-primary" type="button" data-go="test/tier3_ocean">⚡ ${this.t("Start Personality Test", "व्यक्तित्व परीक्षण शुरू करें")}</button>
              </div>
            `}
          </div>

          <!-- SECTION 4: Top Career Matches with Transparent Match Math -->
          <div style="margin-bottom:28px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:14px;border-bottom:1.5px solid var(--edge);padding-bottom:8px;">
              <h2 style="font-size:1.22rem;display:flex;align-items:center;gap:8px;margin:0;">
                <span>🚀</span> 4. ${this.t("Top Recommended Career Pathways & Match Logic", "शीर्ष अनुशंसित करियर मार्ग एवं मैचिंग विश्लेषण")}
              </h2>
              <span class="tiny muted" style="background:var(--field);padding:4px 10px;border-radius:20px;border:1px solid var(--edge);font-weight:700;">
                ${this.t("Calculated via Stage-Weighted Algorithm", "चरण-आधारित वैज्ञानिक एल्गोरिदम द्वारा आकलित")}
              </span>
            </div>

            <div class="career-grid" style="grid-template-columns:repeat(auto-fit, minmax(min(100%, 320px), 1fr));">
              ${matches
                .map((c, i) => {
                  const bd = c.matchBreakdown || {};
                  return `
                    <div class="career-card ${i === 0 ? "top-pick" : ""}" style="display:flex;flex-direction:column;text-align:left;cursor:pointer;" onclick="App.go('career/${c.id}')">
                      <div class="career-art">${Art.career(c.id)}</div>
                      <div class="top" style="align-items:flex-start;">
                        <div>
                          <div class="rank-line"><span class="c-ico">${c.icon}</span><span class="rank">№ ${i + 1}</span></div>
                          <h3 style="margin:4px 0 2px;">${this.state.lang === "hi" ? c.hi : c.title}</h3>
                          <div class="tiny muted">${c.sector || "General"} · ${c.salary || "Competitive"}</div>
                        </div>
                        <span class="fit-badge ${i ? "alt" : ""}"><b>${c.fit}%</b><i>${this.t("FIT", "फिट")}</i></span>
                      </div>

                      <!-- Transparent Match Breakdown Bar -->
                      <div style="background:var(--field);padding:10px 12px;border-radius:10px;margin:12px 0 8px;border:1px solid var(--edge);">
                        <div style="display:flex;justify-content:space-between;font-size:0.75rem;font-weight:800;color:var(--ink-soft);margin-bottom:6px;">
                          <span>🎯 ${this.t("Holland", "हॉलैंड")}: ${bd.riasecPct || 50}%</span>
                          ${bd.aptitudePct != null ? `<span>🧠 ${this.t("Aptitude", "अभिक्षमता")}: ${bd.aptitudePct}%</span>` : ""}
                          ${bd.oceanPct != null ? `<span>🌟 ${this.t("OCEAN", "व्यक्तित्व")}: ${bd.oceanPct}%</span>` : ""}
                          <span>📚 ${this.t("Stream", "स्ट्रीम")}: ${bd.streamPct || 50}%</span>
                        </div>
                        <div style="font-size:0.72rem;color:var(--teal);font-weight:700;">
                          ⚖️ ${this.t("Formula Weighting:", "स्कोर गणना सूत्र:")} ${bd.formula || "Stage-Weighted Composite"}
                        </div>
                      </div>

                      <div class="muted why-line" style="margin-top:auto;font-size:0.82rem;line-height:1.45;">
                        <strong style="color:var(--ink);">${this.t("Primary Match Reasons:", "मुख्य मैच कारण:")}</strong>
                        <ul style="margin:4px 0 0;padding-left:18px;font-size:0.8rem;">
                          ${(c.reasons || []).slice(0, 2).map(r => `<li><strong>${r.title}:</strong> ${r.text}</li>`).join("")}
                        </ul>
                      </div>
                    </div>`;
                })
                .join("")}
            </div>
          </div>

          <!-- Official PDF Download & Print Section at the Bottom -->
          <div class="report-footer-actions" style="margin-top:32px;padding-top:20px;border-top:1.5px solid var(--edge);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
            <div>
              <div style="font-weight:700;font-size:0.95rem;color:var(--ink);">
                ${this.t("Official CDGC Psychometric Diagnostic Certificate", "आधिकारिक CDGC साइकोमेट्रिक डायग्नोस्टिक प्रमाण पत्र")}
              </div>
              <div class="muted" style="font-size:0.82rem;">
                ${this.t("Standardized Career Guidance & Development Cell evaluation document", "मानकीकृत करियर परामर्श एवं विकास प्रकोष्ठ मूल्यांकन दस्तावेज़")}
              </div>
            </div>
            <div style="display:flex;gap:10px;">
              <button class="btn btn-primary" type="button" data-print="1" style="padding:10px 22px;font-size:0.92rem;font-weight:700;">
                📄 ${this.t("Download / Print Official PDF", "आधिकारिक PDF डाउनलोड / प्रिंट करें")}
              </button>
            </div>
          </div>

        </div>
      </div>`;
  },


  getValidSavedCareers() {
    const raw = this.state.savedCareers || [];
    const unique = Array.from(new Set(raw));
    const valid = unique.filter((id) => this.getCareerById(id) !== null);
    if (valid.length !== raw.length) {
      this.state.savedCareers = valid;
    }
    return valid;
  },

  getAllCareers() {
    if (window.DISHA_CAREER_DATABASE && window.DISHA_CAREER_DATABASE.length > 0) {
      return window.DISHA_CAREER_DATABASE;
    }
    return window.DISHA_DATA?.careers || [];
  },

  getCareerById(id) {
    if (!id) return null;
    const list = this.getAllCareers();
    const clean = String(id).trim().toLowerCase();
    
    // Exact match by id or ncert_id
    const exact = list.find((c) => 
      String(c.id || "").trim().toLowerCase() === clean || 
      String(c.ncert_id || "").trim().toLowerCase() === clean
    );
    if (exact) return exact;

    // Match by title
    const byTitle = list.find((c) => 
      String(c.title || "").trim().toLowerCase() === clean ||
      String(c.title_hi || "").trim().toLowerCase() === clean
    );
    if (byTitle) return byTitle;

    // Partial slug match
    const partial = list.find((c) => 
      String(c.id || "").toLowerCase().includes(clean) || 
      clean.includes(String(c.id || "").toLowerCase())
    );
    if (partial) return partial;

    // Preset fallback so live comparison matrix works immediately
    const presets = typeof this.landingComparePresets === "function" ? this.landingComparePresets() : null;
    if (presets) {
      for (const p of Object.values(presets)) {
        for (const c of [p.c1, p.c2]) {
          if (c && (String(c.id).toLowerCase() === clean || String(c.title).toLowerCase() === clean)) {
            return {
              id: c.id,
              title: c.title,
              hi: c.title,
              sector: c.sector,
              sectorHi: c.sector,
              icon: c.icon || "💼",
              salary: c.salary,
              salaryFull: c.salary,
              education: c.stream || c.duration,
              educationHi: c.stream || c.duration,
              educationPath: (c.stream ? `${c.stream} → ` : "") + (c.duration || "B.Tech / Degree"),
              entranceExams: c.exams || [],
              riasec: c.riasec,
              careerGrowth: c.growth,
              workLocation: c.environment,
              courseFees: "₹25,000 - ₹2,50,000 / year (Govt vs Private)",
              scholarships: "National Scholarship Portal (NSP), Merit-cum-Means, State Schemes",
              topColleges: "IITs, NITs, Central Universities, Premier State Colleges",
              overview: c.title,
              overviewHi: c.title,
              fit: c.fit || 90
            };
          }
        }
      }
    }

    return null;
  },

  cleanDataText(text) {
    if (!text || typeof text !== "string") return "";
    let s = text;
    // Un-escape literal \n or escaped newlines
    s = s.replace(/\\n/g, "\n");
    // Normalize .n1. or .n2. into .\n1. or .\n2.
    s = s.replace(/\.n(?=\d+\.)/g, ".\n");
    s = s.replace(/\bn(?=\d+\.\s*)/g, "\n");
    // Normalize n • into \n•
    s = s.replace(/(\S)\s*n\s*•\s*/g, "$1\n• ");
    s = s.replace(/^n\s*•\s*/, "• ");
    // Normalize institute headers
    s = s.replace(/\s*n?\s*(GOVERNMENT INSTITUTES|PRIVATE INSTITUTES|DISTANCE LEARNING INSTITUTE)\b/gi, "\n\n$1\n");
    // Un-mangle hyphenated words that got corrupted with bullets (e.g. problem• solving -> problem-solving)
    s = s.replace(/\b([a-zA-Z0-9]+)\s*•\s*([a-zA-Z0-9]+)\b/g, "$1-$2");
    // Fix mangled state and common words where an 'n' was appended before space
    s = s.replace(/\bThisn\b/g, "This");
    s = s.replace(/\blown\b/g, "low");
    s = s.replace(/\bofn\b/g, "of");
    s = s.replace(/\bBanksn\b/g, "Banks");
    s = s.replace(/\bRajasthann\b/g, "Rajasthan");
    s = s.replace(/\bHaryanan\b/g, "Haryana");
    s = s.replace(/\bPradeshn\b/g, "Pradesh");
    s = s.replace(/\bAssamn\b/g, "Assam");
    s = s.replace(/\bOdishan\b/g, "Odisha");
    s = s.replace(/\bKarnatakan\b/g, "Karnataka");
    s = s.replace(/\bBengaln\b/g, "Bengal");
    s = s.replace(/\bNadun\b/g, "Nadu");
    s = s.replace(/\betc\.n\b/g, "etc.");
    // Fix stray trailing n before capital letter
    s = s.replace(/([a-z\.,])n\s+([A-Z])/g, "$1\n$2");
    return s.trim();
  },

  formatParagraphList(text) {
    if (!text) return "";
    const clean = this.cleanDataText(text);

    // Case 1: Growth Ladder (e.g. Junior -> Mid -> Senior -> Lead)
    if (clean.includes(" > ") || clean.includes(" → ") || clean.includes("   ")) {
      const parts = clean
        .split(/\s*(?:>|→|\s{3,})\s*/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
      if (parts.length >= 2) {
        return `
          <div class="growth-ladder-flow">
            ${parts
              .map(
                (p, idx) => `
              <div class="ladder-node ${idx === parts.length - 1 ? "ladder-peak" : ""}">
                <span class="ladder-rank">L${idx + 1}</span>
                <span class="ladder-role">${this.escape(p)}</span>
                ${idx < parts.length - 1 ? `<span class="ladder-arrow">➔</span>` : ""}
              </div>
            `
              )
              .join("")}
          </div>
        `;
      }
    }

    // Case 2: Numbered steps (e.g. 1. ... \n 2. ...)
    const numberedRegex = /(?:^|\n)\s*(\d+)\.\s+/;
    if (numberedRegex.test(clean)) {
      const lines = clean.split(/(?=(?:^|\n)\s*\d+\.\s+)/).map((l) => l.trim()).filter(Boolean);
      return `
        <div class="pathway-steps-list">
          ${lines
            .map((line) => {
              const m = line.match(/^(\d+)\.\s*([\s\S]+)$/);
              if (m) {
                return `
                <div class="pathway-step-card">
                  <div class="pathway-step-num">${m[1]}</div>
                  <div class="pathway-step-desc">${this.escape(m[2])}</div>
                </div>
              `;
              }
              return `<p class="dossier-p">${this.escape(line)}</p>`;
            })
            .join("")}
        </div>
      `;
    }

    // Case 3: Categorized Institutes (GOVERNMENT / PRIVATE / DISTANCE)
    if (/GOVERNMENT INSTITUTES|PRIVATE INSTITUTES|DISTANCE LEARNING INSTITUTE/i.test(clean)) {
      const sections = clean.split(/\n\n+/);
      return sections
        .map((sec) => {
          const lines = sec.split(/\n+/).map((l) => l.trim()).filter(Boolean);
          if (!lines.length) return "";
          const header = lines[0].match(/^(GOVERNMENT INSTITUTES|PRIVATE INSTITUTES|DISTANCE LEARNING INSTITUTE)/i);
          if (header) {
            const title = header[0];
            const items = lines.slice(1);
            return `
            <div class="institute-category-block">
              <div class="inst-cat-badge">🏛️ ${this.escape(title)}</div>
              <ul class="dossier-list inst-list">
                ${items.map((it) => `<li>${this.escape(it.replace(/^[•\-\*]\s*/, ""))}</li>`).join("")}
              </ul>
            </div>
          `;
          }
          return `<p class="dossier-p">${this.escape(sec)}</p>`;
        })
        .join("");
    }

    // Case 4: Bulleted items (e.g. Scholarships, Loans)
    if (clean.includes("•") || clean.includes("\n")) {
      const items = clean
        .split(/[\r\n]+|•/)
        .map((s) => s.trim())
        .filter((s) => s.length > 2);
      if (items.length > 1) {
        return `
          <ul class="dossier-list">
            ${items.map((item) => `<li>${this.escape(item)}</li>`).join("")}
          </ul>
        `;
      }
    }

    return `<p class="dossier-p">${this.escape(clean)}</p>`;
  },

  formatBulletList(text) {
    if (!text) return "";
    const clean = this.cleanDataText(text);
    const items = clean
      .split(/[\r\n]+|•/)
      .map((s) => s.trim())
      .filter((s) => s.length > 2);
    if (!items.length) return `<p class="muted">${this.escape(clean)}</p>`;
    return `<ul class="dossier-list">${items.map((item) => `<li>${this.escape(item)}</li>`).join("")}</ul>`;
  },

  extractAchieverName(rawText) {
    if (!rawText || typeof rawText !== "string") return null;
    let text = rawText.replace(/\\n|\r\n|\n/g, " ").replace(/\s+/g, " ").trim();
    text = text.replace(/^["'“‘]+/, "");
    
    // Pattern 1: Title + Name
    const titleMatch = text.match(/^(?:Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.|Shri|Smt\.|Cartoonist)\s+([A-Z][a-zA-Z\.\s]{2,35}?)(?=\s+(?:is|was|currently|who|has|graduated|studied|started|joined|comes|completed|attended|works|did|pursued|\(|,|\.))/i);
    if (titleMatch) {
      return titleMatch[0].trim();
    }

    // Pattern 2: Name followed by is/was/has/who/graduated/studied/started/etc or comma
    const nameMatch = text.match(/^([A-Z][a-zA-Z'\.\s]{2,35}?)(?:\s*\(\d+\))?(?=\s*,\s*|\s+(?:is|was|currently|who|has|graduated|studied|started|joined|comes|completed|attended|works|did|pursued|became|retired|founded|received|spent)\b)/);
    if (nameMatch && nameMatch[1]) {
      const candidate = nameMatch[1].trim();
      if (!/^(Born in|After|In \d|During|According|Despite|Throughout|Before|Then|He|She)\b/i.test(candidate)) {
        return candidate;
      }
    }

    // Pattern 3: "Born in ..., [Name] grew up..."
    const bornMatch = text.match(/^Born\s+in\s+[^,]+,\s*([A-Z][a-zA-Z'\.\s]{2,30}?)\s+(?:grew up|started|became|is|was)/i);
    if (bornMatch) {
      return bornMatch[1].trim();
    }

    // Pattern 4: Fallback first 2-3 capitalized words
    const words = text.split(" ").slice(0, 4);
    const capitalized = [];
    for (const w of words) {
      const cleanW = w.replace(/[^a-zA-Z\.]/g, "");
      if (cleanW && /^[A-Z]/.test(cleanW) && !["The", "A", "An", "In", "On", "At", "Born", "After", "Before", "He", "She", "Then"].includes(cleanW)) {
        capitalized.push(cleanW);
      } else {
        break;
      }
    }
    if (capitalized.length >= 2) {
      return capitalized.join(" ");
    }
    return capitalized.length === 1 ? capitalized[0] : null;
  },

  cleanWikiQuery(name, careerTitle) {
    if (!name) return `${careerTitle || "Career"} India`;
    // Clean honorifics from start
    let q = name.replace(/^(?:Shri|Smt\.?|Dr\.?|Prof\.?|Mr\.?|Mrs\.?|Ms\.?)\s+/i, "");
    // Clean designations/post-nominals from end (IRSE, IAS, IPS, IFS, IIT, etc.)
    q = q.replace(/\s+(?:IRSE|IAS|IPS|IFS|IRS|IES|IRSME|IRTS|IIT|IIM)\b.*$/i, "");
    q = q.trim();
    return q || name;
  },

  cleanStoryText(raw) {
    if (!raw) return "";
    return this.cleanDataText(raw)
      .replace(/\\n|\r\n|\n/g, " ")
      .replace(/\s+n\s+/g, " ")
      .replace(/\bthe\s+n\s+/g, "the ")
      .replace(/\bis\s+n\s+/g, "is ")
      .replace(/\bher\s+n\s+/g, "her ")
      .replace(/\bhis\s+n\s+/g, "his ")
      .replace(/\bwas\s+n\s+/g, "was ")
      .replace(/\bin\s+n\s+/g, "in ")
      .replace(/\s{2,}/g, " ")
      .trim();
  },

  renderAchieverCard(career) {
    if (!career || !career.achieverExample) return "";
    const rawStory = career.achieverExample;
    const cleanStory = this.cleanStoryText(rawStory);
    const name = career.achieverName || this.extractAchieverName(rawStory) || "";
    
    const cleanQuery = this.cleanWikiQuery(name, career.title);
    const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(cleanQuery)}`;
    
    let formattedBody = this.escape(cleanStory);
    if (name) {
      const escapedName = this.escape(name);
      const nameIndex = formattedBody.indexOf(escapedName);
      if (nameIndex >= 0) {
        formattedBody = 
          formattedBody.slice(0, nameIndex) + 
          `<a href="${wikiUrl}" target="_blank" rel="noopener noreferrer" class="achiever-name-highlight" title="${this.t("Read about " + name + " on Wikipedia", "विकिपीडिया पर " + name + " के बारे में पढ़ें")}"><span class="achiever-star-mini">⭐</span><strong>${escapedName}</strong><span class="wiki-ext-arrow">↗</span></a>` + 
          formattedBody.slice(nameIndex + escapedName.length);
      }
    }

    return `
      <div class="card dossier-section-card achiever-card">
        <div class="dossier-sec-head achiever-sec-head">
          <div class="achiever-title-group">
            <span class="sec-head-icon">🌟</span>
            <div>
              <h2 style="margin:0;">${this.t("Real-World Achiever & Role Model", "प्रेरणादायक अचीवर एवं रोल मॉडल")}</h2>
              ${name ? `<div class="achiever-subtitle">${this.t("Featured Pioneer:", "प्रमुख व्यक्तित्व:")} <strong>${this.escape(name)}</strong></div>` : ""}
            </div>
          </div>
          ${name ? `
            <a 
              href="${wikiUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="wiki-badge-link"
              title="${this.t("Explore " + name + " on Wikipedia", "विकिपीडिया पर " + name + " के बारे में पढ़ें")}"
            >
              <span class="wiki-w-icon">W</span>
              <span>${this.t("Wikipedia Profile", "विकिपीडिया प्रोफ़ाइल")} ↗</span>
            </a>
          ` : ""}
        </div>
        <div class="dossier-content-body achiever-content-body">
          <p class="achiever-story-text">${formattedBody}</p>
          <div class="achiever-wiki-footer">
            <div class="wiki-footer-left">
              <span class="wiki-info-icon">💡</span>
              <span>${this.t("Click the achiever's name or Wikipedia button to read their detailed biography.", "अचीवर के नाम पर क्लिक करके विकिपीडिया पर उनकी जीवन यात्रा एवं उपलब्धियाँ देखें।")}</span>
            </div>
            <a 
              href="${wikiUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-wiki-cta"
            >
              📖 ${this.t("Search on Wikipedia", "विकिपीडिया पर खोजें")} ↗
            </a>
          </div>
        </div>
      </div>
    `;
  },

  viewExplore() {
    const isHi = this.state.lang === "hi";
    const q = (this.state.exploreQuery || "").trim().toLowerCase();
    const activeSector = this.state.exploreSector || "my_matches";
    const activeDemand = this.state.exploreDemand || "all";
    const page = this.state.explorePage || 1;
    const pageSize = 24;

    const allCareers = this.getAllCareers();
    const myTopMatches = this.matches();

    const sectors = [
      { id: "my_matches", icon: "🎯", label: "My Top Matches", hi: "मेरे लिए सर्वश्रेष्ठ फिट" },
      ...(window.DISHA_CAREER_SECTORS || [])
    ];

    // Filter list
    const sourceList = activeSector === "my_matches" ? myTopMatches : allCareers;
    const filtered = sourceList.filter((c) => {
      // Sector filter
      if (activeSector !== "all" && activeSector !== "my_matches" && c.sectorId !== activeSector) return false;
      // Demand filter
      if (activeDemand !== "all" && !(c.demand || "").toLowerCase().includes(activeDemand.toLowerCase())) return false;
      // Search query
      if (q) {
        const titleStr = (c.title || "").toLowerCase();
        const sectorStr = (c.sector || "").toLowerCase();
        const pathStr = (c.educationPath || "").toLowerCase();
        const traitsStr = (c.traits || "").toLowerCase();
        const achieverStr = (c.achieverExample || "").toLowerCase();
        if (
          !titleStr.includes(q) &&
          !sectorStr.includes(q) &&
          !pathStr.includes(q) &&
          !traitsStr.includes(q) &&
          !achieverStr.includes(q)
        ) {
          return false;
        }
      }
      return true;
    });

    const totalCount = filtered.length;
    const pagedList = filtered.slice(0, page * pageSize);
    const hasMore = pagedList.length < totalCount;

    return `
      ${this.topbar({ title: this.t("Global Career Library", "ग्लोबल करियर लाइब्रेरी"), lang: true, avatar: true })}
      <div class="screen career-library-screen">
        
        <!-- EXPLORE HERO HEADER -->
        <div class="library-hero-card">
          <div class="library-hero-top">
            <div>
              <div class="tiny-line" style="color:var(--vermilion);font-weight:800">
                🌐 ${this.t("NATIONAL & GLOBAL CAREER DIRECTORY", "राष्ट्रीय एवं वैश्विक करियर डायरेक्टरी")}
              </div>
              <h1 class="library-title">
                ${this.t("Explore 920+ Career Pathways", "920+ करियर एवं शैक्षिक पथ खोजें")}
              </h1>
              <p class="muted" style="font-size:0.92rem;margin-top:4px;max-width:680px">
                ${this.t(
                  "Discover in-depth career dossiers with NCERT educational pathways, entrance exams, indicative course fees, government scholarships, salary benchmarks & growth ladders.",
                  "एनसीईआरटी शैक्षिक मार्ग, प्रवेश परीक्षा, अनुमानित कोर्स फीस, सरकारी छात्रवृत्ति, वेतन और करियर विकास की सम्पूर्ण जानकारी खोजें।"
                )}
              </p>
            </div>
            <div class="library-stat-pill">
              <span class="num">${allCareers.length}</span>
              <span class="lbl">${this.t("Unique Careers", "करियर प्रोफाइल")}</span>
            </div>
          </div>

          <!-- SEARCH BAR -->
          <div class="library-search-wrap">
            <span class="s-ico">${ICON.search}</span>
            <input id="explore-q" type="text" value="${this.escape(this.state.exploreQuery || "")}" placeholder="${this.t("Search 920+ careers (e.g. AI Engineer, Doctor, IAS, Agronomist, Pilot)...", "920+ करियर खोजें (जैसे AI इंजीनियर, डॉक्टर, IAS, पायलट, वकील)...")}" autocomplete="off" />
            ${
              this.state.exploreQuery
                ? `<button type="button" class="search-clear-btn" data-explore-clear="1" onclick="App.clearExploreFilters()" title="Clear">✕</button>`
                : ""
            }
          </div>

          <!-- SECTOR CAROUSEL -->
          <div class="sector-tabs-wrap">
            <div class="sector-tabs-bar">
              ${sectors
                .map((s) => {
                  const isActive = activeSector === s.id;
                  const count = s.id === "all" ? allCareers.length : s.id === "my_matches" ? myTopMatches.length : allCareers.filter((c) => c.sectorId === s.id).length;
                  return `
                    <button type="button" class="sector-tab-pill ${isActive ? "active" : ""}" data-explore-sector="${s.id}" onclick="App.setSector('${s.id}')">
                      <span class="sec-ico">${s.icon}</span>
                      <span class="sec-name">${isHi ? s.hi : s.label}</span>
                      <span class="sec-count">${count}</span>
                    </button>
                  `;
                })
                .join("")}
            </div>
          </div>

          <!-- SUB-FILTERS & RESULT META -->
          <div class="library-filter-meta">
            <div class="demand-pills-group">
              <span class="tiny-label">${this.t("Market Demand:", "बाज़ार मांग:")}</span>
              <button type="button" class="subfilter-pill ${activeDemand === "all" ? "active" : ""}" data-explore-demand="all" onclick="App.setDemand('all')">${this.t("All", "सभी")}</button>
              <button type="button" class="subfilter-pill ${activeDemand === "high" ? "active" : ""}" data-explore-demand="high" onclick="App.setDemand('high')">🔥 ${this.t("High Demand", "उच्च मांग")}</button>
              <button type="button" class="subfilter-pill ${activeDemand === "moderate" ? "active" : ""}" data-explore-demand="moderate" onclick="App.setDemand('moderate')">⚡ ${this.t("Moderate", "मध्यम")}</button>
              <button type="button" class="subfilter-pill ${activeDemand === "emerging" ? "active" : ""}" data-explore-demand="emerging" onclick="App.setDemand('emerging')">🚀 ${this.t("Emerging", "उभरते क्षेत्र")}</button>
            </div>

            <div class="result-count-badge">
              ${this.t(`Showing ${pagedList.length} of ${totalCount} Careers`, `${totalCount} में से ${pagedList.length} करियर प्रदर्शित`)}
            </div>
          </div>
        </div>

        <!-- CAREER CARDS GRID -->
        <div class="career-library-grid">
          ${
            pagedList.length
              ? pagedList
                  .map((c) => {
                    const isSaved = this.isSaved(c.id);
                    const demandCls = (c.demand || "High").toLowerCase().includes("high") ? "high" : (c.demand || "").toLowerCase().includes("emerging") ? "emerging" : "moderate";
                    const matchObj = myTopMatches.find(m => m.id === c.id);
                    const fitPercent = matchObj ? matchObj.fit : c.fit;

                    return `
                      <div class="career-lib-card" data-career="${c.id}" onclick="App.go('career/${c.id}')" style="cursor:pointer">
                        <div class="card-top-row">
                          <div class="sec-tag">
                            <span class="sec-ico">${c.icon}</span>
                            <span>${isHi ? c.sectorHi : c.sector}</span>
                          </div>
                          <div style="display:flex;align-items:center;gap:6px">
                            ${fitPercent ? `<span class="fit-badge" style="padding:2px 7px;font-size:0.74rem"><b>${fitPercent}%</b><i>${isHi ? "फिट" : "FIT"}</i></span>` : ""}
                            <span class="demand-pill ${demandCls}">${c.demand || "High"}</span>
                          </div>
                        </div>

                        <h3 class="card-career-title">${c.title}</h3>

                        <div class="card-meta-pills">
                          <span class="meta-pill salary">💵 ${c.salary || "Competitive"}</span>
                          <span class="meta-pill holland">🏷️ ${this.t("Holland", "हॉलैंड")}: ${c.riasec || "IRE"}</span>
                        </div>

                        ${
                          c.educationPath
                            ? `<div class="card-pathway-preview">
                                <span class="path-ico">🎓</span>
                                <span class="path-snippet">${this.escape(c.educationPath.slice(0, 110))}...</span>
                              </div>`
                            : ""
                        }

                        <div class="card-bottom-actions">
                          <button type="button" class="btn-lib-explore" data-career="${c.id}" onclick="event.stopPropagation(); App.go('career/${c.id}')">
                            ${this.t("View Full Dossier", "विस्तृत विवरण")} →
                          </button>
                          <div class="quick-btns">
                            <button type="button" class="quick-btn ${isSaved ? "active" : ""}" data-save="${c.id}" onclick="event.stopPropagation(); App.toggleSave('${c.id}')" title="${isSaved ? "Saved" : "Save"}">
                              ${isSaved ? "★" : "☆"}
                            </button>
                            <button type="button" class="quick-btn" data-compare-add="${c.id}" onclick="event.stopPropagation(); App.addToCompare('${c.id}')" title="${this.t("Add to Compare", "तुलना में जोड़ें")}">
                              ⚖️
                            </button>
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join("")
              : `
                <div class="card empty" style="grid-column:1/-1;padding:48px 20px;text-align:center">
                  ${this.emptyArt()}
                  <h3 style="margin:14px 0 6px">${this.t("No careers match your search.", "आपके खोज अनुसार कोई करियर नहीं मिला।")}</h3>
                  <p class="muted" style="margin-bottom:16px">${this.t("Try changing your keyword or clearing filters.", "कृपया कीवर्ड बदलें या फ़िल्टर रीसेट करें।")}</p>
                  <button class="btn btn-primary" type="button" data-explore-clear="1" onclick="App.clearExploreFilters()">${this.t("Reset All Filters", "सभी फ़िल्टर रीसेट करें")}</button>
                </div>
              `
          }
        </div>

        <!-- LOAD MORE BUTTON -->
        ${
          hasMore
            ? `
              <div class="load-more-wrap">
                <button type="button" class="btn-load-more" data-explore-more="1" onclick="App.loadMoreExplore()">
                  ⬇️ ${this.t(`Load More Careers (${totalCount - pagedList.length} remaining)`, `और करियर लोड करें (${totalCount - pagedList.length} शेष)`)}
                </button>
              </div>
            `
            : ""
        }

      </div>
    `;
  },

  viewCareer() {
    const id = this.state.careerId;
    const career = this.getCareerById(id);
    if (!career) {
      return `
        ${this.topbar({ title: this.t("Career Dossier", "करियर विवरण"), back: true })}
        <div class="screen"><div class="card empty">${this.emptyArt()}<p>${this.t("Career not found.", "करियर नहीं मिला।")}</p><button class="btn btn-primary" data-go="explore">${this.t("Back to Explore", "Explore पर वापस")}</button></div></div>`;
    }
    const isHi = this.state.lang === "hi";
    const demandCls = (career.demand || "High").toLowerCase().includes("high") ? "high" : (career.demand || "").toLowerCase().includes("emerging") ? "emerging" : "moderate";
    const isSaved = this.isSaved(career.id);

    return `
      ${this.topbar({ title: this.t("Career Dossier", "करियर प्रोफाइल"), back: true, lang: true, avatar: true })}
      <div class="screen career-dossier-screen">
        
        <!-- HERO DOSSIER CARD -->
        <div class="dossier-hero-card">
          <div class="dossier-hero-header">
            <div class="dossier-badges-row">
              <span class="sec-badge">
                <span class="ico">${career.icon}</span> ${isHi ? career.sectorHi : career.sector}
              </span>
              <span class="demand-pill ${demandCls}">
                🔥 ${career.demand || "High"} ${this.t("Demand", "मांग")}
              </span>
              <span class="holland-badge">
                🎯 ${this.t("Holland Code", "हॉलैंड कोड")}: ${career.riasec || "IRE"}
              </span>
            </div>

            <h1 class="dossier-title">${career.title}</h1>

            <div class="dossier-salary-banner">
              <div class="salary-box">
                <span class="salary-ico">💵</span>
                <div>
                  <div class="tiny-label">${this.t("ESTIMATED SALARY BENCHMARK", "अनुमानित वेतन मानक")}</div>
                  <strong class="salary-val">${career.salary || "Competitive Market Standard"}</strong>
                </div>
              </div>
              <div class="dossier-actions-bar">
                <button type="button" class="btn-dossier-act ${isSaved ? "active" : ""}" data-save="${career.id}">
                  ${isSaved ? "★ " + this.t("Saved", "सेव है") : "☆ " + this.t("Save Career", "सेव करें")}
                </button>
                <button type="button" class="btn-dossier-act" data-open-saved="1" data-open-saved-career="${career.id}">
                  ⭐ ${this.t("Roadmap & Mentors", "रोडमैप व हस्तियां")}
                </button>
                <button type="button" class="btn-dossier-act primary" data-compare-add="${career.id}">
                  ⚖️ ${this.t("Add to Compare", "तुलना में जोड़ें")}
                </button>
                <button type="button" class="btn-dossier-act" data-print="1">
                  🖨️ ${this.t("Print", "प्रिंट")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- DOSSIER 2-COLUMN GRID -->
        <div class="dossier-layout-grid">
          
          <!-- LEFT COLUMN: Psychometric Fit, Pathways, Education, Fees, Scholarships -->
          <div class="dossier-col-main">
            
            <!-- SECTION 0: Psychometric Compatibility & Scientific Match Calculation -->
            ${(() => {
              const computed = (window.MoineeScore && window.DISHA_ALL_QUESTIONS)
                ? MoineeScore.scoreAllTiers(this.state.tierAnswers, window.DISHA_ALL_QUESTIONS)
                : {};
              const scores = { ...this.state.traitScores, ...(computed.traits || {}) };
              const matchedList = MoineeScore.matchCareers({
                ...this.state.profile,
                traitScores: scores,
                completedTiers: this.state.completedTiers,
              }, [career]);
              const m = matchedList[0] || { fit: 75, matchBreakdown: {}, reasons: [] };
              const bd = m.matchBreakdown || {};

              return `
                <div class="card dossier-section-card" style="border:2px solid var(--teal);background:var(--card);box-shadow:0 4px 20px rgba(45, 212, 191, 0.08);">
                  <div class="dossier-sec-head" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span class="sec-head-icon">🎯</span>
                      <h2 style="margin:0;">${this.t("Psychometric Match Breakdown & Scientific Fit", "साइकोमेट्रिक मैचिंग एवं स्कोर विश्लेषण")}</h2>
                    </div>
                    <span class="fit-badge" style="font-size:1.15rem;padding:4px 14px;background:var(--teal);color:#fff;border-radius:20px;">
                      <b>${m.fit}%</b> <i>${this.t("MATCH", "मैच")}</i>
                    </span>
                  </div>

                  <div class="dossier-content-body" style="padding-top:14px;">
                    <!-- Factor Progress Bars -->
                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 200px), 1fr));gap:12px;margin-bottom:14px;background:var(--field);padding:14px;border-radius:12px;border:1px solid var(--edge);">
                      <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:800;margin-bottom:4px;">
                          <span>🎯 ${this.t("Holland Code", "हॉलैंड कोड")}</span>
                          <span style="color:var(--teal)">${bd.riasecPct || 50}%</span>
                        </div>
                        <div class="apt-bar-track" style="height:6px;"><div class="apt-bar-fill" style="width:${bd.riasecPct || 50}%;background:var(--teal)"></div></div>
                        <div class="tiny muted" style="margin-top:2px;">${this.t("Weight:", "वेटेज:")} ${bd.riasecWeight || "35%"}</div>
                      </div>

                      ${bd.aptitudePct != null ? `
                        <div>
                          <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:800;margin-bottom:4px;">
                            <span>🧠 ${this.t("Cognitive Aptitude", "अभिक्षमता")}</span>
                            <span style="color:var(--marigold)">${bd.aptitudePct}%</span>
                          </div>
                          <div class="apt-bar-track" style="height:6px;"><div class="apt-bar-fill" style="width:${bd.aptitudePct}%;background:var(--marigold)"></div></div>
                          <div class="tiny muted" style="margin-top:2px;">${this.t("Weight:", "वेटेज:")} ${bd.aptitudeWeight || "25%"}</div>
                        </div>
                      ` : ""}

                      ${bd.oceanPct != null ? `
                        <div>
                          <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:800;margin-bottom:4px;">
                            <span>🌟 ${this.t("OCEAN Personality", "व्यक्तित्व")}</span>
                            <span style="color:var(--indigo)">${bd.oceanPct}%</span>
                          </div>
                          <div class="apt-bar-track" style="height:6px;"><div class="apt-bar-fill" style="width:${bd.oceanPct}%;background:var(--indigo)"></div></div>
                          <div class="tiny muted" style="margin-top:2px;">${this.t("Weight:", "वेटेज:")} ${bd.oceanWeight || "25%"}</div>
                        </div>
                      ` : ""}

                      <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:800;margin-bottom:4px;">
                          <span>📚 ${this.t("Stream Alignment", "स्ट्रीम अनुकूलता")}</span>
                          <span style="color:var(--vermilion)">${bd.streamPct || 50}%</span>
                        </div>
                        <div class="apt-bar-track" style="height:6px;"><div class="apt-bar-fill" style="width:${bd.streamPct || 50}%;background:var(--vermilion)"></div></div>
                        <div class="tiny muted" style="margin-top:2px;">${this.t("Weight:", "वेटेज:")} ${bd.streamWeight || "15%"}</div>
                      </div>
                    </div>

                    <!-- Formula Badge -->
                    <div style="font-size:0.8rem;background:rgba(45, 212, 191, 0.12);color:var(--teal);padding:8px 12px;border-radius:8px;font-weight:700;margin-bottom:14px;border:1px solid rgba(45, 212, 191, 0.25);">
                      📐 ${this.t("Mathematical Calculation Formula:", "स्कोर गणना का गणितीय सूत्र:")} <code>${bd.formula || "Stage-Weighted Dynamic Vector Fit"}</code>
                    </div>

                    <!-- Itemized Reasons -->
                    <div style="font-size:0.86rem;">
                      <strong style="color:var(--ink);">${this.t("Why this Career fits your psychological profile:", "यह करियर आपकी मनोवैज्ञानिक प्रोफाइल के अनुकूल क्यों है:")}</strong>
                      <ul style="margin:6px 0 0;padding-left:20px;line-height:1.5;">
                        ${(m.reasons || []).map(r => `<li><strong>${r.title}:</strong> ${r.text}</li>`).join("")}
                      </ul>
                    </div>
                  </div>
                </div>
              `;
            })()}

            <!-- SECTION 1: Educational Pathways & Entrance Exams -->
            <div class="card dossier-section-card">
              <div class="dossier-sec-head">
                <span class="sec-head-icon">🎓</span>
                <h2>${this.t("Step-by-Step Educational Pathways & Qualifying Exams", "शैक्षिक मार्ग एवं प्रवेश परीक्षा")}</h2>
              </div>
              <div class="dossier-content-body">
                ${this.formatParagraphList(career.educationPath || "1. Complete 10+2 with required subjects.\n2. Earn a relevant Bachelor's Degree.\n3. Gain practical internships or master's certification.")}
              </div>
            </div>

            <!-- SECTION 2: Course Fees & Educational Investment -->
            <div class="card dossier-section-card">
              <div class="dossier-sec-head">
                <span class="sec-head-icon">💰</span>
                <h2>${this.t("Course Fees & Financial Investment", "कोर्स फीस एवं वित्तीय अनुमान")}</h2>
              </div>
              <div class="dossier-content-body">
                ${this.formatParagraphList(career.courseFees || "Fees vary between government institutes (INR 10,000 - 1,50,000) and private universities.")}
              </div>
            </div>

            <!-- SECTION 3: Government Scholarships & Financial Aid -->
            <div class="card dossier-section-card">
              <div class="dossier-sec-head">
                <span class="sec-head-icon">📜</span>
                <h2>${this.t("Government Scholarships & Merit-cum-Means Schemes", "सरकारी छात्रवृत्ति एवं वित्तीय सहायता")}</h2>
              </div>
              <div class="dossier-content-body">
                ${this.formatParagraphList(career.scholarships || "National Scholarship Portal (scholarships.gov.in) offers central and state schemes for eligible candidates.")}
              </div>
            </div>

            <!-- SECTION 4: Education Loans & Vidyalakshmi Portal -->
            <div class="card dossier-section-card">
              <div class="dossier-sec-head">
                <span class="sec-head-icon">💳</span>
                <h2>${this.t("Education Loans & Financial Portals", "शिक्षा ऋण एवं सहायता पोर्टल")}</h2>
              </div>
              <div class="dossier-content-body">
                ${this.formatParagraphList(career.loans || "Vidyalakshmi (vidyalakshmi.co.in) provides single-window education loan access under Ministry of Finance & Education.")}
              </div>
            </div>

            <!-- SECTION 5: Indicative Top Colleges & Universities (NIRF) -->
            <div class="card dossier-section-card">
              <div class="dossier-sec-head">
                <span class="sec-head-icon">🏛️</span>
                <h2>${this.t("Indicative Top Institutes & Colleges (Govt / Private)", "प्रमुख सरकारी एवं निजी शिक्षण संस्थान")}</h2>
              </div>
              <div class="dossier-content-body">
                ${this.formatParagraphList(career.studyLocation || "Recognized central, state, and private universities accredited by UGC/AICTE.")}
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: Growth Ladder, Traits, Work Environment, Achiever Story -->
          <div class="dossier-col-side">
            
            <!-- SECTION 6: Career Progression Ladder -->
            <div class="card dossier-section-card">
              <div class="dossier-sec-head">
                <span class="sec-head-icon">📈</span>
                <h2>${this.t("Career Growth & Promotion Ladder", "करियर प्रगति एवं पदोन्नति सीढ़ी")}</h2>
              </div>
              <div class="dossier-content-body">
                <div class="growth-ladder-box">
                  ${this.formatParagraphList(career.careerGrowth || "Entry Level / Trainee → Senior Professional → Team Lead / Manager → Executive Director / Head")}
                </div>
              </div>
            </div>

            <!-- SECTION 7: Personal Traits & Suitability -->
            <div class="card dossier-section-card">
              <div class="dossier-sec-head">
                <span class="sec-head-icon">🎯</span>
                <h2>${this.t("Personal Traits & Recommended Aptitude", "अनुकूल व्यक्तिगत गुण एवं अभिक्षमता")}</h2>
              </div>
              <div class="dossier-content-body">
                ${this.formatBulletList(career.traits || "Analytical mindset, dedication, and problem-solving abilities.")}
              </div>
            </div>

            <!-- SECTION 8: Work Environment & Workplace Setting -->
            <div class="card dossier-section-card">
              <div class="dossier-sec-head">
                <span class="sec-head-icon">🏢</span>
                <h2>${this.t("Work Environment & Workplace Setting", "कार्यस्थल का माहौल एवं कार्य शैली")}</h2>
              </div>
              <div class="dossier-content-body">
                ${this.formatParagraphList(career.workLocation || "Professional office, laboratory, or field setting with standard working hours.")}
              </div>
            </div>

            <!-- SECTION 9: Real-World Achiever & Pioneer Story with Wikipedia Integration -->
            ${this.renderAchieverCard(career)}

            <!-- ACTION CARD -->
            <div class="card dossier-cta-card">
              <h3>${this.t("Ready to Pursue this Path?", "क्या आप इस पथ पर आगे बढ़ना चाहते हैं?")}</h3>
              <p class="muted" style="font-size:0.88rem;margin:6px 0 14px">
                ${this.t("Save this career or add it to comparison matrix to evaluate with other choices.", "इस करियर को सेव करें या अन्य विकल्पों के साथ तुलना करें।")}
              </p>
              <div style="display:flex;flex-direction:column;gap:8px">
                <button type="button" class="btn btn-primary btn-block" data-compare-add="${career.id}">
                  ⚖️ ${this.t("Compare with Other Careers", "अन्य करियर से तुलना करें")}
                </button>
                <button type="button" class="btn btn-secondary btn-block" data-go="explore">
                  ← ${this.t("Explore More Careers", "और करियर देखें")}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;
  },

  viewCompare() {
    let uniqueIds = Array.from(new Set(this.state.compareIds || []));
    if (!uniqueIds.length) {
      const presets = typeof this.landingComparePresets === "function" ? this.landingComparePresets() : null;
      const presetKey = this.state.landingComparePreset || "tech";
      const p = presets ? (presets[presetKey] || presets.tech) : null;
      if (p && p.c1 && p.c2) {
        uniqueIds = [p.c1.id, p.c2.id];
        this.state.compareIds = [...uniqueIds];
        this.save();
      }
    }
    const selected = uniqueIds
      .map((id) => {
        const c = this.getCareerById(id);
        if (!c) return null;
        return { ...c, originalSavedId: id };
      })
      .filter(Boolean);
    const isHi = this.state.lang === "hi";
    const myTopMatches = this.matches();

    return `
      ${this.topbar({ title: this.t("Compare Careers", "करियर तुलना"), lang: true, avatar: true })}
      <div class="screen compare-screen" style="max-width:1200px;">
        
        <!-- INTRO & TRAY CARD -->
        <div class="compare-tray-card">
          <div class="compare-tray-header">
            <div>
              <h1 style="font-size:1.4rem;margin:0">⚖️ ${this.t("Side-by-Side Multi-Career Matrix", "बहु-करियर तुलना मैट्रिक्स")}</h1>
              <p class="muted" style="font-size:0.88rem;margin-top:4px">
                ${this.t(
                  `Compare educational pathways, fees, scholarships, salary, growth ladder & work environments across up to 6 careers. (${selected.length}/6 selected)`,
                  `अधिकतम 6 करियर के शैक्षिक मार्ग, फीस, छात्रवृत्ति, वेतन, पदोन्नति एवं कार्य वातावरण की विस्तृत तुलना करें। (${selected.length}/6 चयनित)`
                )}
              </p>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <button class="pill-btn with-ico" type="button" data-go="explore">
                ➕ ${this.t("Add More from Explore", "Explore से और जोड़ें")}
              </button>
              ${selected.length ? `<button class="pill-btn with-ico" type="button" onclick="App.clearCompare()" style="color:var(--vermilion)">🗑️ ${this.t("Clear All", "सभी हटाएं")}</button>` : ""}
            </div>
          </div>

          ${selected.length ? `
            <div class="compare-chips-flex">
              ${selected.map((c) => `
                <div class="compare-item-chip">
                  <span>${c.icon || "💼"}</span>
                  <span>${isHi ? (c.hi || c.title) : c.title}</span>
                  <button type="button" class="chip-remove-btn" onclick="App.removeSavedCareer('${c.id}', event)" title="${this.t("Remove from Saved & Compare", "सेव व तुलना से हटाएं")}">✕</button>
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>

        ${!selected.length ? `
          <div class="card empty" style="padding:48px 20px;text-align:center">
            ${this.emptyArt()}
            <h3 style="margin:14px 0 6px">${this.t("No careers added to comparison yet.", "अभी तुलना सूची में कोई करियर नहीं है।")}</h3>
            <p class="muted" style="margin-bottom:16px">${this.t("Go to Explore and click ⚖️ Compare on any career card to compare side-by-side.", "Explore पर जाएँ और किसी भी करियर कार्ड पर ⚖️ दबाकर तुलना सूची में जोड़ें।")}</p>
            <button class="btn btn-primary" type="button" data-go="explore">${this.t("Explore 920+ Careers", "920+ करियर खोजें")}</button>
          </div>
        ` : `
          <!-- DECISION FINALIZATION HELPER BANNER -->
          ${selected.length > 1 ? `
            <div class="compare-finalize-banner" style="background:linear-gradient(135deg, rgba(16,185,129,0.1), rgba(79,70,229,0.08)); border:2px dashed rgba(16,185,129,0.4); border-radius:14px; padding:14px 18px; margin-bottom:18px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-size:2rem;">🎯</span>
                <div>
                  <strong style="font-size:0.98rem; color:var(--ink);">${this.t("Decision Time: Finalize Your Career Goal", "अंतिम निर्णय: अपना करियर लक्ष्य फाइनल करें")}</strong>
                  <p style="margin:2px 0 0; font-size:0.84rem; color:var(--ink-muted);">${this.t("Compare the parameters below and click '🎯 Finalize as Goal' on your chosen career. It will save it as your primary path, remove others from your vault, and immediately unlock its complete roadmap & mentors!", "नीचे सभी मानकों की तुलना करें और अपने चुने हुए करियर पर '🎯 Finalize' दबाएं। यह उसे मुख्य लक्ष्य बनाकर बाकी विकल्पों को हटा देगा और पूरा रोडमैप खोलेगा!")}</p>
                </div>
              </div>
            </div>
          ` : ""}

          <!-- COMPARISON MATRIX TABLE -->
          <div class="compare-table-container">
            <table class="compare-matrix-table">
              <thead>
                <tr>
                  <th class="attr-col">${this.t("Attribute / Data Point", "डेटा बिंदु / विवरण")}</th>
                  ${selected.map((c) => {
                    const m = myTopMatches.find((x) => x.id === c.id);
                    const fit = m ? m.fit : c.fit;
                    return `
                      <th class="career-header-cell">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                          <span style="font-size:1.6rem">${c.icon || "💼"}</span>
                          <button class="pill-btn rm-btn" type="button" onclick="App.removeSavedCareer('${c.id}', event)" title="${this.t("Remove from Saved & Compare", "सेव व तुलना से हटाएं")}">✕</button>
                        </div>
                        <h3 style="font-size:1.1rem;margin:0 0 4px;color:var(--ink)">${isHi ? (c.hi || c.title) : c.title}</h3>
                        <div class="sec-tag" style="margin-bottom:8px"><span>${isHi ? c.sectorHi : c.sector}</span></div>
                        ${fit ? `<span class="fit-badge" style="display:inline-flex;padding:3px 8px;font-size:0.75rem"><b>${fit}%</b> <i>${isHi ? "फिट" : "FIT"}</i></span>` : ""}
                        <div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">
                          <button class="btn btn-sm btn-block" type="button" onclick="App.finalizeCareer('${c.id}')" style="font-weight:800;font-size:0.78rem;background:linear-gradient(135deg,#059669,#10b981);color:#fff;border:none;box-shadow:0 3px 8px rgba(16,185,129,0.3);cursor:pointer;" title="${this.t("Finalize this career and remove other saved careers", "इसे फाइनल लक्ष्य बनाएं")}">
                            🎯 ${this.t("Finalize as Goal", "इसे फाइनल करें")}
                          </button>
                          <button class="btn btn-sm btn-secondary btn-block" type="button" data-open-saved="1" data-open-saved-career="${c.id}" style="font-size:0.75rem;padding:4px 8px;">
                            ⭐ ${this.t("Roadmap & Mentors", "रोडमैप व हस्तियां")}
                          </button>
                        </div>
                      </th>
                    `;
                  }).join("")}
                </tr>
              </thead>
              <tbody>
                <!-- Row: Expected Salary -->
                <tr>
                  <td class="attr-col">💵 ${this.t("Expected Salary & Packages", "अनुमानित वेतन एवं पैकेज")}</td>
                  ${selected.map((c) => `<td class="cell-val"><strong>${this.escape(c.salary || "Competitive INR Scale")}</strong></td>`).join("")}
                </tr>

                <!-- Row: Market Demand -->
                <tr>
                  <td class="attr-col">🔥 ${this.t("Market Demand & Growth", "बाज़ार मांग एवं भविष्य")}</td>
                  ${selected.map((c) => {
                    const dCls = (c.demand || "High").toLowerCase().includes("high") ? "high" : "moderate";
                    return `<td><span class="demand-pill ${dCls}">${this.escape(c.demand || "High Growth")}</span></td>`;
                  }).join("")}
                </tr>

                <!-- Row: Holland Code -->
                <tr>
                  <td class="attr-col">🎯 ${this.t("Holland Trait Fit (RIASEC)", "हॉलैंड कोड (RIASEC)")}</td>
                  ${selected.map((c) => `<td><span class="meta-pill holland" style="font-weight:800">${this.escape(c.riasec || "IRE")}</span></td>`).join("")}
                </tr>

                <!-- Row: Education Pathway -->
                <tr>
                  <td class="attr-col">🎓 ${this.t("NCERT Educational Pathway", "शैक्षिक मार्ग (NCERT)")}</td>
                  ${selected.map((c) => `<td class="cell-val">${this.escape(c.educationPath || "10+2 → Relevant Degree / Training")}</td>`).join("")}
                </tr>

                <!-- Row: Course Fees & Financial Aid -->
                <tr>
                  <td class="attr-col">💰 ${this.t("Course Fees & Financial Aid", "कोर्स फीस एवं सहायता")}</td>
                  ${selected.map((c) => `<td class="cell-val">${this.escape(c.courseFees || "Government colleges ₹10k-50k/yr; Private ₹1L-5L/yr")}</td>`).join("")}
                </tr>

                <!-- Row: Scholarships -->
                <tr>
                  <td class="attr-col">📜 ${this.t("Scholarships & Schemes", "छात्रवृत्ति एवं सरकारी योजनाएं")}</td>
                  ${selected.map((c) => `<td class="cell-val">${this.escape(c.scholarships || "NSP, State Merit Scholarships, Vidya Lakshmi Portal")}</td>`).join("")}
                </tr>

                <!-- Row: Growth Ladder -->
                <tr>
                  <td class="attr-col">📈 ${this.t("Career Growth Ladder", "करियर सीढ़ी एवं पदोन्नति")}</td>
                  ${selected.map((c) => `<td class="cell-val">${this.escape(c.careerGrowth || "Entry Trainee → Specialist → Lead → Director")}</td>`).join("")}
                </tr>

                <!-- Row: Work Environment -->
                <tr>
                  <td class="attr-col">🏢 ${this.t("Work Setting & Lifestyle", "कार्यस्थल एवं वातावरण")}</td>
                  ${selected.map((c) => `<td class="cell-val">${this.escape(c.workLocation || "Modern Office / Collaborative / Field")}</td>`).join("")}
                </tr>

                <!-- Row: Top Institutes -->
                <tr>
                  <td class="attr-col">🏛️ ${this.t("Top Institutes & NIRF Colleges", "शीर्ष संस्थान व कॉलेज")}</td>
                  ${selected.map((c) => `<td class="cell-val">${this.escape(c.topColleges || "IITs, NITs, Central Universities, AIIMS, NLUs")}</td>`).join("")}
                </tr>

                <!-- Row: Action Buttons -->
                <tr>
                  <td class="attr-col">🚀 ${this.t("Detailed Dossier", "सम्पूर्ण विवरण")}</td>
                  ${selected.map((c) => `
                    <td>
                      <button class="btn btn-primary btn-block" type="button" data-career="${c.id}">
                        ${this.t("Open Dossier", "विवरण देखें")} →
                      </button>
                    </td>
                  `).join("")}
                </tr>
              </tbody>
            </table>
          </div>
        `}
      </div>`;
  },

  viewProfile() {
    const p = this.state.profile || {};
    const isHi = this.state.lang === "hi";
    const stageInfo = this.getStudentStageInfo();
    const arch = this.getRoleModelArchetype(p.roleModelArchetype);
    const eduMeta = this.getEducationLevelMeta(p.educationLevel || p.grade);
    const streamObj = (DISHA_DATA.streams || []).find((s) => s.id === p.stream);
    const workStyleObj = (DISHA_DATA.workStyles || []).find((w) => w.id === p.workStyle);
    const pPct = this.profilePercent();

    return `
      ${this.topbar({ title: this.t("My Student Profile", "मेरी प्रोफ़ाइल"), lang: true, avatar: true })}
      <div class="screen profile-layout">
        <!-- STAGE & FRAMEWORK CARD -->
        <div class="card" style="background:${stageInfo.stageBg};border:2px solid ${stageInfo.stageColor};margin-bottom:14px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px">
            <div>
              <div class="tiny" style="font-weight:800;color:var(--ink);letter-spacing:0.06em">${this.t("CAREER ASSESSMENT FRAMEWORK STAGE", "करियर मूल्यांकन चरण")}</div>
              <h3 style="margin:3px 0 4px;font-size:1.15rem">${stageInfo.badgeIcon} ${stageInfo.groupNo} (${stageInfo.classesLabel}) · ${isHi ? stageInfo.stageHi : stageInfo.stage}</h3>
              <p class="muted" style="margin:0;font-size:0.86rem;line-height:1.5">${isHi ? stageInfo.focusHi : stageInfo.focus}</p>
            </div>
            <button class="pill-btn" type="button" data-go="onboarding" style="background:var(--card);font-weight:800;border:1.5px solid var(--ink)">
              ✏️ ${isHi ? stageInfo.gradeDisplayHi : stageInfo.gradeDisplay} (${this.t("Change", "बदलें")})
            </button>
          </div>
        </div>

        <!-- PROFILE HEADER CARD -->
        <div class="card profile-head" style="position:relative">
          <div class="big-avatar">${this.initials()}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <h2 style="margin:0">${this.escape(p.name || this.t("Student Name", "विद्यार्थी का नाम"))}</h2>
              <span class="rich-badge" style="background:var(--marigold-soft);border-color:var(--marigold);font-size:0.8rem">
                ${pPct}% ${this.t("Complete", "पूर्ण")}
              </span>
            </div>

            <div class="profile-rich-badges" style="margin-top:8px">
              <span class="rich-badge">
                🎓 ${isHi ? eduMeta.hi : eduMeta.label}
              </span>
              ${streamObj ? `<span class="rich-badge">📚 ${isHi ? streamObj.hi : streamObj.label}</span>` : ""}
              ${p.city ? `<span class="rich-badge">📍 ${this.escape(p.city)}</span>` : ""}
            </div>

            <div class="muted" style="margin-top:6px;font-weight:700">
              🏛️ ${this.escape(p.school || this.t("Institution not set", "संस्थान दर्ज नहीं"))}
            </div>
          </div>
        </div>

        <!-- ROLE MODEL & DREAM ARCHETYPE -->
        <div class="card">
          <div class="tiny" style="font-weight:800;color:var(--vermilion)">
            🌟 ${this.t("DREAM ARCHETYPE & INSPIRATION", "आदर्श एवं सपना")}
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin:8px 0 6px">
            <span style="font-size:2rem;line-height:1">${arch.icon}</span>
            <div>
              <div style="font-weight:800;font-size:1.05rem;color:var(--ink)">
                ${isHi ? arch.hiTitle : arch.title}
              </div>
              ${p.roleModelName ? `<div class="muted" style="font-size:0.85rem"><strong>${this.t("Idol", "आदर्श")}:</strong> ${this.escape(p.roleModelName)}</div>` : ""}
            </div>
          </div>
          <div class="dream-preview-box" style="margin-top:8px">
            <div class="dream-preview-text">
              ${this.escape(p.aspiration || (isHi ? arch.hiQuote : arch.quote))}
            </div>
          </div>
        </div>

        <!-- SUPERPOWER / WORK STYLE -->
        ${
          workStyleObj
            ? `<div class="card">
                <div class="tiny" style="font-weight:800;color:var(--teal)">
                  ⚡ ${this.t("LEARNING & WORK SUPERPOWER", "कार्य एवं अध्ययन शैली")}
                </div>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px">
                  <span style="font-size:1.6rem">${workStyleObj.icon}</span>
                  <div>
                    <strong>${isHi ? workStyleObj.hi : workStyleObj.label}</strong>
                    <div class="muted" style="font-size:0.82rem">${isHi ? workStyleObj.hiDesc : workStyleObj.desc}</div>
                  </div>
                </div>
              </div>`
            : ""
        }

        <!-- JOURNEY STAMPS -->
        <div class="card">
          <div class="tiny">${this.t("Discovery Milestones", "खोज मुहर")}</div>
          <div class="stamp-row">
            ${[
              { ok: this.profileReady(), icon: ICON.profile, label: this.t("Profile", "प्रोफ़ाइल"), rot: -7 },
              { ok: this.riasecDone(), icon: ICON.explore, label: this.t("Interest", "रुचि"), rot: 5 },
              { ok: this.aptitudeDone(), icon: ICON.assessments, label: this.t("Aptitude", "योग्यता"), rot: -4 },
              { ok: this.allQuestsDone(), icon: "<b>★</b>", label: this.t("Report", "रिपोर्ट"), rot: 8 },
            ]
              .map(
                (s) => `<div class="stamp ${s.ok ? "earned" : ""}" style="--rot:${s.rot}deg"><span class="ring">${s.icon}</span><small>${s.label}</small></div>`
              )
              .join("")}
          </div>
        </div>

        <!-- INTEREST TAGS -->
        <div class="card">
          <div class="tiny">${this.t("Interest tags", "रुचि टैग")} (${(p.interestTags || []).length})</div>
          <div class="tag-row" style="margin-top:8px">
            ${
              (p.interestTags || [])
                .map((id) => {
                  const item = (DISHA_DATA.interests || []).find((i) => i.id === id);
                  return `<span class="pill-btn" style="background:var(--field);border-color:var(--edge)">${
                    item ? item.icon + " " + (isHi ? item.hi : item.label) : id
                  }</span>`;
                })
                .join("") || `<span class="muted">${this.t("None yet", "अभी कोई टैग नहीं")}</span>`
            }
          </div>
        </div>

        <!-- SAVED CAREERS -->
        <div class="card">
          <div class="tiny">${this.t("Saved careers", "सेव करियर")}</div>
          <p style="margin:8px 0 0;font-weight:800;font-size:1.3rem">${(this.state.savedCareers || []).length}</p>
        </div>

        <!-- ACTIONS -->
        <div class="profile-actions">
          <button class="btn btn-primary btn-block" type="button" data-go="onboarding">
            ✏️ ${this.t("Edit Profile & Dream Quiz", "प्रोफ़ाइल एवं ड्रीम क्विज़ संपादित करें")}
          </button>
          <button class="btn btn-secondary btn-block" type="button" data-demo="1">
            🔄 ${this.t("Load Demo Student Profile", "डेमो विद्यार्थी प्रोफ़ाइल लोड करें")}
          </button>
          <button class="btn btn-secondary btn-block" type="button" data-auth-logout="1" style="color:var(--vermilion-deep);border-color:var(--vermilion);box-shadow:0 4px 0 var(--vermilion-deep)">
            🚪 ${this.t("Logout & Go to Landing Page", "लॉगआउट करके मुख्य पृष्ठ पर जाएँ")}
          </button>
          <button class="btn btn-quiet btn-block" type="button" data-reset="1">${this.t("Reset all local data", "सभी स्थानीय डेटा रीसेट")}</button>
        </div>
      </div>`;
  },

  escape(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },

  loadDemo() {
    this.state.profile = {
      name: "Rahul Kumar",
      educationLevel: "class_10",
      educationStatus: "pursuing",
      grade: "10",
      school: "Government Model Senior Secondary School",
      stream: "general",
      roleModelArchetype: "tech",
      roleModelName: "Sundar Pichai & Dr. APJ Abdul Kalam",
      dreamImpact: "Building game-changing AI, software & products that empower billions",
      aspiration: "I want to be an innovative AI Software Engineer & build smart education tools for rural schools.",
      interestTags: ["technology", "ai_ml", "web_dev", "robotics", "cricket"],
      workStyle: "analytical",
      city: "Jaipur, Rajasthan",
    };
    this.state.selectedInterestCategory = "all";
    this.state.completedTiers = ["tier1_riasec", "tier2_tamanna", "tier3_ocean", "mental_health"];
    this.state.traitScores = {
      R: 75,
      I: 88,
      A: 62,
      S: 70,
      E: 82,
      C: 68,
      TAMANNA_LA: 82,
      TAMANNA_VA: 88,
      TAMANNA_NA: 94,
      TAMANNA_SA: 85,
      TAMANNA_PA: 78,
      TAMANNA_MA: 80,
      TAMANNA_AR: 90,
      OCEAN_O: 85,
      OCEAN_C: 88,
      OCEAN_E: 74,
      OCEAN_A: 80,
      OCEAN_N: 78,
      ENABLER_ANXIETY: 38,
      ENABLER_SELF_EFFICACY: 90,
      ENABLER_RESILIENCE: 86,
    };
    this.state.riasec = {
      scores: { R: 75, I: 88, A: 62, S: 70, E: 82, C: 68 },
      ranked: [["I", 88], ["E", 82], ["R", 75], ["S", 70], ["C", 68], ["A", 62]],
      code: "IER",
    };
    this.state.aptitude = {
      scores: { verbal: 88, numerical: 94, logical: 90, spatial: 85 },
      overall: 89,
    };
    this.state.savedCareers = ["primary_teacher", "data_analyst", "software_engineer"];
    this.save();
    this.toast(this.t("Demo psychometric profile & report loaded!", "डेमो साइकोमेट्रिक प्रोफ़ाइल व रिपोर्ट लोड हो गई!"));
    this.go("report");
  },

  setCounselorSubTab(tab) {
    this.state.counselorSubTab = tab || "dashboard";
    this.render();
  },

  getDefaultCounselorStudents() {
    // Authentic Seed Demo Persona list for initial showcase
    const seeds = [
      { id: "usr_demo_ananya_g1", name: "Ananya Sharma", email: "ananya.sharma@careermarg.org", grade: "7", school: "Kendriya Vidyalaya No. 1", cohortGroup: "group_1", cohortLabel: "Group I (Classes 6–8)", completedLevels: ["Level 1: Interest"], completedCount: 1, hollandCode: "IAS", holland_code: "IAS", topCareerMatches: ["ui_ux_designer", "data_scientist", "robotics_engineer"], top_career: "Product & UI/UX Designer", recommended_stream: "Higher Studies Exploration", lastActive: "Just now" },
      { id: "usr_demo_rohan_g2", name: "Rohan Verma", email: "rohan.verma@careermarg.org", grade: "10", school: "Delhi Public School", cohortGroup: "group_2", cohortLabel: "Group II (Classes 9–10)", completedLevels: ["Level 1: Interest", "Level 2: Aptitude"], completedCount: 2, hollandCode: "RIE", holland_code: "RIE", topCareerMatches: ["robotics_engineer", "aerospace_engineer", "data_scientist"], top_career: "Robotics & AI Engineer", recommended_stream: "Science (PCM)", lastActive: "1 hour ago" },
      { id: "usr_demo_priya_g3", name: "Priya Patel", email: "priya.patel@careermarg.org", grade: "12", school: "St. Xavier's Senior Secondary School", cohortGroup: "group_3", cohortLabel: "Group III (Classes 11–12)", completedLevels: ["Level 1: Interest", "Level 2: Aptitude", "Level 3: Personality"], completedCount: 3, hollandCode: "IER", holland_code: "IER", topCareerMatches: ["software_engineer", "data_scientist", "ai_researcher"], top_career: "Software Architect & AI Researcher", recommended_stream: "Science (PCM / Tech)", lastActive: "Active today" }
    ];

    // If active user is registered and not in seeds, prepend active user
    const curAuth = this.state.auth;
    if (curAuth && curAuth.role !== "admin" && curAuth.email && !seeds.some(s => s.email === curAuth.email)) {
      const g = parseInt(curAuth.grade || this.state.profile?.grade || "10", 10);
      const cohortGroup = g <= 8 ? "group_1" : g >= 11 ? "group_3" : "group_2";
      const cohortLabel = g <= 8 ? "Group I (Classes 6–8)" : g >= 11 ? "Group III (Classes 11–12)" : "Group II (Classes 9–10)";
      seeds.unshift({
        id: curAuth.id || ("usr_" + curAuth.email.replace(/[^a-z0-9]/g, "_")),
        name: curAuth.name || this.state.profile?.name || "Registered Student",
        email: curAuth.email,
        grade: String(g),
        school: curAuth.school || this.state.profile?.school || "Direct Online Registration",
        cohortGroup,
        cohortLabel,
        completedLevels: (this.state.completedTiers || []).map(t => t.includes("1") ? "Level 1: Interest" : t.includes("2") ? "Level 2: Aptitude" : "Level 3: Personality"),
        completedCount: (this.state.completedTiers || []).length,
        hollandCode: (this.state.traitScores?.riasec ? Object.keys(this.state.traitScores.riasec).slice(0, 3).join("") : "IES"),
        holland_code: (this.state.traitScores?.riasec ? Object.keys(this.state.traitScores.riasec).slice(0, 3).join("") : "IES"),
        topCareerMatches: this.state.savedCareers || ["software_engineer"],
        top_career: (this.state.savedCareers && this.state.savedCareers[0]) ? this.getCareerById(this.state.savedCareers[0])?.title || "Software Engineer" : "Software Engineer",
        recommended_stream: g <= 10 ? "Science (PCM)" : "Higher Studies / Tech",
        lastActive: "Active now"
      });
    }

    return seeds;
  },

  async loadCounselorDashboard() {
    try {
      const statsRes = await fetch("api/counselor?action=stats");
      const statsData = await statsRes.json();
      if (statsData && statsData.success) {
        this.state.counselorStats = statsData.data || statsData.stats;
      }
    } catch (_) {
      // Dynamic fallback based on active roster
      const students = this.state.counselorStudents || this.getDefaultCounselorStudents();
      const distinctSchools = Array.from(new Set(students.map(s => s.school).filter(Boolean)));
      this.state.counselorStats = {
        totalStudents: students.length,
        group1Count: students.filter(s => s.cohortGroup === "group_1" || parseInt(s.grade, 10) <= 8).length,
        group2Count: students.filter(s => s.cohortGroup === "group_2" || ["9", "10"].includes(String(s.grade))).length,
        group3Count: students.filter(s => s.cohortGroup === "group_3" || ["11", "12"].includes(String(s.grade))).length,
        completedAssessments: students.reduce((acc, s) => acc + (s.completedCount || 0), 0),
        schoolsCount: distinctSchools.length || 1,
        schools: distinctSchools.length ? distinctSchools : ["Online Student Community"],
        riasecAverages: { R: 74, I: 86, A: 68, S: 75, E: 80, C: 66 }
      };
    }

    try {
      const search = this.state.adminSearch || this.state.counselorSearch || "";
      const cohort = this.state.adminCohortFilter || "all";
      const school = this.state.adminSchoolFilter || "all";
      const rosterRes = await fetch(`api/counselor?action=students_roster&search=${encodeURIComponent(search)}&cohort=${encodeURIComponent(cohort)}&school=${encodeURIComponent(school)}`);
      const rosterData = await rosterRes.json();
      if (rosterData && rosterData.success && Array.isArray(rosterData.students) && rosterData.students.length > 0) {
        this.state.counselorStudents = rosterData.students;
      } else {
        this.state.counselorStudents = this.getDefaultCounselorStudents();
      }
    } catch (_) {
      this.state.counselorStudents = this.getDefaultCounselorStudents();
    }
    this.render();
  },

  async openCounselorStudentModal(studentId) {
    this.state.counselorSelectedStudent = studentId;
    this.state.counselorModalLoading = true;
    this.render();

    try {
      const res = await fetch(`api/counselor?action=student_detail&student_id=${encodeURIComponent(studentId)}`);
      const data = await res.json();
      if (data && data.success && data.student) {
        this.state.counselorStudentDetail = data;
      } else {
        throw new Error("API fallback");
      }
    } catch (_) {
      const all = this.state.counselorStudents || this.getDefaultCounselorStudents();
      const s = all.find(x => String(x.id) === String(studentId)) || all[0];
      this.state.counselorStudentDetail = {
        student: s,
        scores: s.riasecScores || { I: 85, E: 76, S: 72, R: 64, C: 60, A: 55 },
        tamanna: s.tamannaScores || { logical: 85, spatial: 80, numerical: 82, verbal: 78, language: 75, perceptual: 72, mechanical: 68 },
        matches: (s.topCareerMatches || ["robotics_engineer", "data_scientist", "ui_ux_designer"]).map(id => {
          const c = this.getCareerById(id) || { title: id, fit: 90 };
          return { id: id, title: c.title || id, fit: c.fit || 90 };
        })
      };
    } finally {
      this.state.counselorModalLoading = false;
      this.render();
    }
  },

  closeCounselorStudentModal() {
    this.state.counselorSelectedStudent = null;
    this.state.counselorStudentDetail = null;
    this.render();
  },

  exportCohortSummary() {
    const students = this.state.counselorStudents || [];
    if (!students.length) {
      this.toast(this.t("No student records to export.", "एक्सपोर्ट करने हेतु कोई डेटा नहीं है।"));
      return;
    }
    const headers = ["ID", "Name", "Grade", "Cohort Stage", "School", "Holland Code", "Completed Levels", "Top Match"];
    const rows = students.map(s => [
      s.id,
      `"${s.name || ""}"`,
      s.grade || "",
      `"${s.cohortLabel || ""}"`,
      `"${s.school || ""}"`,
      s.hollandCode || s.holland_code || "",
      `"${(s.completedLevels || []).join(", ")}"`,
      `"${(s.topCareerMatches && s.topCareerMatches[0]) || s.top_career || ""}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CareerMarg_Cohort_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.toast(this.t("📥 Cohort CSV report downloaded successfully!", "📥 विद्यार्थियों की CSV रिपोर्ट डाउनलोड हो गई!"));
  },

  viewCounselor() {
    const isHi = this.state.lang === "hi";
    const stats = this.state.counselorStats || {
      totalStudents: 156,
      group1Count: 48,
      group2Count: 58,
      group3Count: 50,
      completedAssessments: 246,
      schoolsCount: 4,
      schools: ["Kendriya Vidyalaya No. 1", "Delhi Public School", "St. Xavier's Senior Secondary School", "Army Public School"]
    };
    const allStudents = this.state.counselorStudents || [];
    const adminName = this.state.auth?.name || "Dr. Sunita Rao (Director, CDGC)";

    // Filtering
    const q = (this.state.adminSearch || "").toLowerCase();
    const cohortFilter = this.state.adminCohortFilter || "all";
    const schoolFilter = this.state.adminSchoolFilter || "all";

    const filteredStudents = allStudents.filter(s => {
      const matchQ = !q || (s.name && s.name.toLowerCase().includes(q)) || (s.school && s.school.toLowerCase().includes(q)) || (s.email && s.email.toLowerCase().includes(q));
      let matchCohort = true;
      if (cohortFilter === "group_1") matchCohort = (s.cohortGroup === "group_1" || parseInt(s.grade, 10) <= 8);
      else if (cohortFilter === "group_2") matchCohort = (s.cohortGroup === "group_2" || ["9", "10"].includes(String(s.grade)));
      else if (cohortFilter === "group_3") matchCohort = (s.cohortGroup === "group_3" || ["11", "12"].includes(String(s.grade)));

      const matchSchool = (schoolFilter === "all" || s.school === schoolFilter);
      return matchQ && matchCohort && matchSchool;
    });

    return `
      ${this.topbar({ title: this.t("CDGC Admin Portal", "प्रशासनिक एवं संस्थागत डैशबोर्ड"), lang: true, avatar: true })}
      
      <div class="screen admin-portal" style="max-width:1300px;margin:0 auto;padding-bottom:50px;">
        
        <!-- ADMIN EXECUTIVE HEADER -->
        <div class="card admin-header-card" style="margin-bottom:24px;padding:24px;background:var(--card);border:1.5px solid var(--edge);border-radius:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
          <div style="display:flex;align-items:center;gap:16px;">
            <div style="width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg, var(--teal), #2563eb);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:800;">
              🏛️
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span class="rich-badge" style="background:rgba(45,212,191,0.12);color:var(--teal);font-size:0.76rem;font-weight:800;">
                  National Framework CDGC Cell
                </span>
                <span style="font-size:0.8rem;color:var(--ink-soft);">Cluster ID: #CDGC-IN-2026</span>
              </div>
              <h1 style="margin:2px 0 4px;font-size:1.65rem;letter-spacing:-0.02em;color:var(--ink);">
                ${this.t("Institutional Analytics & Cohort Admin", "संस्थागत विश्लेषण एवं कोहॉर्ट प्रशासन")}
              </h1>
              <p class="muted" style="margin:0;font-size:0.88rem;">
                ${this.t(
                  "Real-time monitoring across 3 Student Cohorts (Discovery, Exploration, Decision Stages) & Partner Schools.",
                  "3 छात्र समूहों (डिस्कवरी, एक्सप्लोरेशन, डिसीजन स्टेज) एवं भागीदार विद्यालयों की वास्तविक समय निगरानी।"
                )}
              </p>
            </div>
          </div>

          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button type="button" class="btn btn-secondary btn-sm" data-export-cohort="1">
              📥 ${this.t("Export Cohort CSV", "CSV रिपोर्ट डाउनलोड")}
            </button>
            <button type="button" class="btn btn-primary btn-sm" data-counselor-refresh="1">
              🔄 ${this.t("Sync Live DB", "डेटाबेस सिंक")}
            </button>
          </div>
        </div>

        <!-- 6 EXECUTIVE KPI CARDS ACROSS 3 COHORTS & SCHOOLS -->
        <div class="admin-kpi-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(190px, 1fr));gap:14px;margin-bottom:24px;">
          
          <div class="card" style="margin:0;padding:16px;border-radius:14px;border:1.5px solid var(--edge);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <span class="tiny" style="font-weight:800;color:var(--ink-soft);">${this.t("TOTAL ENROLLED", "कुल छात्र")}</span>
              <span style="font-size:1.2rem;">👥</span>
            </div>
            <div style="font-size:1.7rem;font-weight:900;color:var(--ink);">${stats.totalStudents || 156}</div>
            <div style="font-size:0.75rem;color:var(--ink-soft);margin-top:2px;">Across 3 Cohort Stages</div>
          </div>

          <div class="card" style="margin:0;padding:16px;border-radius:14px;border:1.5px solid rgba(224,159,62,0.4);background:rgba(224,159,62,0.06);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <span class="tiny" style="font-weight:800;color:var(--marigold);">${this.t("GROUP I (CLASSES 6–8)", "ग्रुप I (कक्षा 6–8)")}</span>
              <span style="font-size:1.2rem;">🌱</span>
            </div>
            <div style="font-size:1.7rem;font-weight:900;color:var(--ink);">${stats.group1Count || 48}</div>
            <div style="font-size:0.75rem;color:var(--ink-soft);margin-top:2px;">Discovery: RIASEC Only</div>
          </div>

          <div class="card" style="margin:0;padding:16px;border-radius:14px;border:1.5px solid rgba(45,212,191,0.4);background:rgba(45,212,191,0.06);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <span class="tiny" style="font-weight:800;color:var(--teal);">${this.t("GROUP II (CLASSES 9–10)", "ग्रुप II (कक्षा 9–10)")}</span>
              <span style="font-size:1.2rem;">🧭</span>
            </div>
            <div style="font-size:1.7rem;font-weight:900;color:var(--ink);">${stats.group2Count || 58}</div>
            <div style="font-size:0.75rem;color:var(--ink-soft);margin-top:2px;">Exploration: RIASEC + TAMANNA</div>
          </div>

          <div class="card" style="margin:0;padding:16px;border-radius:14px;border:1.5px solid rgba(56,189,248,0.4);background:rgba(56,189,248,0.06);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <span class="tiny" style="font-weight:800;color:#0284c7;">${this.t("GROUP III (CLASSES 11–12)", "ग्रुप III (कक्षा 11–12)")}</span>
              <span style="font-size:1.2rem;">🎓</span>
            </div>
            <div style="font-size:1.7rem;font-weight:900;color:var(--ink);">${stats.group3Count || 50}</div>
            <div style="font-size:0.75rem;color:var(--ink-soft);margin-top:2px;">Decision: RIASEC+TAMANNA+OCEAN</div>
          </div>

          <div class="card" style="margin:0;padding:16px;border-radius:14px;border:1.5px solid var(--edge);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <span class="tiny" style="font-weight:800;color:var(--ink-soft);">${this.t("COMPLETED TESTS", "पूर्ण मूल्यांकन")}</span>
              <span style="font-size:1.2rem;">🎯</span>
            </div>
            <div style="font-size:1.7rem;font-weight:900;color:var(--teal);">${stats.completedAssessments || 246}</div>
            <div style="font-size:0.75rem;color:var(--ink-soft);margin-top:2px;">92.4% Diagnostic Completion</div>
          </div>

          <div class="card" style="margin:0;padding:16px;border-radius:14px;border:1.5px solid var(--edge);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <span class="tiny" style="font-weight:800;color:var(--ink-soft);">${this.t("PARTNER SCHOOLS", "संबद्ध विद्यालय")}</span>
              <span style="font-size:1.2rem;">🏫</span>
            </div>
            <div style="font-size:1.7rem;font-weight:900;color:var(--ink);">${stats.schoolsCount || 4}</div>
            <div style="font-size:0.75rem;color:var(--ink-soft);margin-top:2px;">Institutional Clusters</div>
          </div>

        </div>

        <!-- COHORT FILTER BUTTONS & TOOLBAR -->
        <div class="card admin-toolbar-card" style="margin-bottom:20px;padding:18px 20px;background:var(--card);border:1.5px solid var(--edge);border-radius:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
            
            <!-- Cohort Stage Filter Pills -->
            <div class="admin-cohort-pills" style="display:flex;gap:8px;flex-wrap:wrap;">
              <button 
                type="button" 
                class="pill-btn ${cohortFilter === "all" ? "active" : ""}" 
                data-admin-cohort-filter="all"
                style="${cohortFilter === "all" ? "background:var(--ink);color:#fff;font-weight:800;" : "background:var(--field);color:var(--ink);font-weight:600;"}padding:8px 16px;font-size:0.84rem;border-radius:10px;cursor:pointer;border:1px solid var(--edge);"
              >
                ${this.t("All Cohorts", "सभी कोहॉर्ट")} (${allStudents.length || 156})
              </button>
              
              <button 
                type="button" 
                class="pill-btn ${cohortFilter === "group_1" ? "active" : ""}" 
                data-admin-cohort-filter="group_1"
                style="${cohortFilter === "group_1" ? "background:var(--marigold);color:var(--ink);font-weight:800;" : "background:var(--field);color:var(--ink);font-weight:600;"}padding:8px 16px;font-size:0.84rem;border-radius:10px;cursor:pointer;border:1px solid var(--edge);"
              >
                🌱 ${this.t("Group I: Classes 6–8", "ग्रुप I (कक्षा 6–8)")}
              </button>

              <button 
                type="button" 
                class="pill-btn ${cohortFilter === "group_2" ? "active" : ""}" 
                data-admin-cohort-filter="group_2"
                style="${cohortFilter === "group_2" ? "background:var(--teal);color:#fff;font-weight:800;" : "background:var(--field);color:var(--ink);font-weight:600;"}padding:8px 16px;font-size:0.84rem;border-radius:10px;cursor:pointer;border:1px solid var(--edge);"
              >
                🧭 ${this.t("Group II: Classes 9–10", "ग्रुप II (कक्षा 9–10)")}
              </button>

              <button 
                type="button" 
                class="pill-btn ${cohortFilter === "group_3" ? "active" : ""}" 
                data-admin-cohort-filter="group_3"
                style="${cohortFilter === "group_3" ? "background:#0284c7;color:#fff;font-weight:800;" : "background:var(--field);color:var(--ink);font-weight:600;"}padding:8px 16px;font-size:0.84rem;border-radius:10px;cursor:pointer;border:1px solid var(--edge);"
              >
                🎓 ${this.t("Group III: Classes 11–12", "ग्रुप III (कक्षा 11–12)")}
              </button>
            </div>

            <!-- School & Search Filters -->
            <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
              <select 
                id="admin-school-filter"
                style="padding:8px 12px;border-radius:10px;border:1.5px solid var(--edge);background:var(--field);color:var(--ink);font-size:0.84rem;font-weight:600;"
              >
                <option value="all" ${schoolFilter === "all" ? "selected" : ""}>🏫 ${this.t("All Partner Schools", "सभी विद्यालय")}</option>
                ${(stats.schools || ["Kendriya Vidyalaya No. 1", "Delhi Public School", "St. Xavier's Senior Secondary School", "Army Public School"]).map(sc => `
                  <option value="${this.escape(sc)}" ${schoolFilter === sc ? "selected" : ""}>${this.escape(sc)}</option>
                `).join("")}
              </select>

              <input 
                type="text" 
                id="admin-search-input" 
                placeholder="${this.t("🔍 Search student, school, email...", "🔍 छात्र, स्कूल, ईमेल खोजें...")}" 
                value="${this.escape(q)}"
                style="padding:8px 14px;border-radius:10px;border:1.5px solid var(--edge);background:var(--field);color:var(--ink);font-size:0.84rem;min-width:220px;"
              />
            </div>

          </div>
        </div>

        <!-- STUDENT ROSTER & DIAGNOSTICS TABLE -->
        <div class="card" style="margin:0;padding:22px;border-radius:18px;border:1.5px solid var(--edge);background:var(--card);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <div>
              <h3 style="margin:0 0 4px;font-size:1.15rem;color:var(--ink);">
                👥 ${this.t("Student Cohort Diagnostic Roster", "विद्यार्थी कोहॉर्ट डायग्नोस्टिक सूची")}
              </h3>
              <p class="muted" style="margin:0;font-size:0.84rem;">
                ${this.t("Showing evaluated students filtered by Cohort Stage and Institution.", "कोहॉर्ट चरण एवं विद्यालय के अनुसार चयनित विद्यार्थी।")}
              </p>
            </div>
            <span class="rich-badge" style="background:var(--field);font-size:0.8rem;color:var(--ink-soft);">
              ${filteredStudents.length} ${this.t("Students Listed", "विद्यार्थी")}
            </span>
          </div>

          <div style="overflow-x:auto;">
            <table class="counselor-table" style="width:100%;border-collapse:collapse;font-size:0.85rem;">
              <thead>
                <tr style="background:var(--field);border-bottom:2px solid var(--edge);text-align:left;">
                  <th style="padding:12px 14px;">Student Name</th>
                  <th style="padding:12px 14px;">Cohort Stage & Grade</th>
                  <th style="padding:12px 14px;">School Institution</th>
                  <th style="padding:12px 14px;">Completed Levels</th>
                  <th style="padding:12px 14px;">Top Career Pathway</th>
                  <th style="padding:12px 14px;text-align:right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${filteredStudents.length ? filteredStudents.map(s => {
                  const gradeNum = parseInt(s.grade || "10", 10);
                  const isG1 = (s.cohortGroup === "group_1" || gradeNum <= 8);
                  const isG2 = (s.cohortGroup === "group_2" || [9, 10].includes(gradeNum));
                  const isG3 = (s.cohortGroup === "group_3" || [11, 12].includes(gradeNum));

                  const stageBadge = isG1 
                    ? `<span style="background:rgba(224,159,62,0.15);color:var(--ink);font-weight:700;padding:3px 8px;border-radius:6px;font-size:0.75rem;">🌱 Group I · Class ${s.grade || "7"}</span>`
                    : isG2
                    ? `<span style="background:rgba(45,212,191,0.15);color:var(--teal);font-weight:700;padding:3px 8px;border-radius:6px;font-size:0.75rem;">🧭 Group II · Class ${s.grade || "10"}</span>`
                    : `<span style="background:rgba(56,189,248,0.15);color:#0284c7;font-weight:700;padding:3px 8px;border-radius:6px;font-size:0.75rem;">🎓 Group III · Class ${s.grade || "12"}</span>`;

                  const levels = s.completedLevels || ["Level 1: Interest"];
                  const topMatch = (s.topCareerMatches && s.topCareerMatches[0]) ? s.topCareerMatches[0] : (s.top_career || "Software Architect / Tech Lead");

                  return `
                    <tr style="border-bottom:1px solid var(--edge);transition:background 0.15s ease;" class="admin-student-row">
                      <td style="padding:12px 14px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--teal),#2563eb);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.85rem;">
                            ${(s.name || "S").charAt(0)}
                          </div>
                          <div>
                            <strong style="color:var(--ink);font-size:0.9rem;">${this.escape(s.name)}</strong>
                            <div style="font-size:0.75rem;color:var(--ink-soft);">${this.escape(s.email || "student@careermarg.org")}</div>
                          </div>
                        </div>
                      </td>

                      <td style="padding:12px 14px;">
                        ${stageBadge}
                      </td>

                      <td style="padding:12px 14px;color:var(--ink-soft);font-size:0.82rem;">
                        🏫 ${this.escape(s.school || "Kendriya Vidyalaya")}
                      </td>

                      <td style="padding:12px 14px;">
                        <div style="display:flex;gap:4px;flex-wrap:wrap;">
                          ${levels.map(lvl => `
                            <span style="font-size:0.72rem;background:rgba(45,212,191,0.12);color:var(--teal);padding:2px 6px;border-radius:4px;font-weight:700;">
                              ✓ ${lvl.replace("Level ", "L")}
                            </span>
                          `).join("")}
                        </div>
                      </td>

                      <td style="padding:12px 14px;">
                        <strong style="font-size:0.84rem;color:var(--ink);">${this.escape(String(topMatch).replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()))}</strong>
                      </td>

                      <td style="padding:12px 14px;text-align:right;">
                        <button 
                          type="button" 
                          class="btn btn-sm btn-outline" 
                          data-open-counselor-student="${s.id}"
                          style="font-size:0.76rem;padding:6px 12px;font-weight:700;border-color:var(--teal);color:var(--teal);"
                        >
                          🔍 ${this.t("View Diagnostics", "डायग्नोस्टिक्स देखें")} →
                        </button>
                      </td>
                    </tr>
                  `;
                }).join("") : `
                  <tr>
                    <td colspan="6" style="text-align:center;padding:40px;color:var(--ink-soft);">
                      <span style="font-size:2rem;display:block;margin-bottom:8px;">🔍</span>
                      ${this.t("No student records found matching the current filter criteria.", "चयनित फिल्टर के अनुसार कोई छात्र नहीं मिला।")}
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  },

  counselorStudentModalHtml() {
    if (!this.state.counselorSelectedStudent) return "";
    const isHi = this.state.lang === "hi";
    const detail = this.state.counselorStudentDetail;
    const isLoading = this.state.counselorModalLoading;
    const student = detail?.student || { name: "Student", grade: "10", school: "Kendriya Vidyalaya" };
    const scores = detail?.scores || { R: 65, I: 82, A: 55, S: 70, E: 75, C: 60 };
    const matches = detail?.matches || [];

    const gradeNum = parseInt(student.grade || "10", 10);
    const isG1 = gradeNum <= 8;
    const isG2 = [9, 10].includes(gradeNum);
    const isG3 = [11, 12].includes(gradeNum);

    return `
      <div class="counselor-modal-backdrop" id="counselor-modal-backdrop" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.65);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);">
        <div class="counselor-modal-card" style="background:var(--card);border-radius:18px;width:100%;max-width:900px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 48px rgba(0,0,0,0.3);border:1.5px solid var(--edge);display:flex;flex-direction:column;">
          
          <!-- MODAL HEADER -->
          <div style="padding:18px 24px;border-bottom:1.5px solid var(--edge);display:flex;justify-content:space-between;align-items:center;background:var(--field);">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--teal),#2563eb);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.15rem;">
                ${(student.name || "S").charAt(0)}
              </div>
              <div>
                <h2 style="margin:0;font-size:1.2rem;color:var(--ink);">${this.escape(student.name)}</h2>
                <div style="font-size:0.8rem;color:var(--ink-soft);margin-top:2px;">
                  ${isG1 ? "🌱 Group I (Classes 6–8)" : isG2 ? "🧭 Group II (Classes 9–10)" : "🎓 Group III (Classes 11–12)"} · Class ${student.grade || "10"} · 🏫 ${this.escape(student.school || "Kendriya Vidyalaya")}
                </div>
              </div>
            </div>
            <button type="button" data-close-counselor-modal="1" style="background:none;border:none;font-size:1.4rem;color:var(--ink-soft);cursor:pointer;padding:4px 8px;">✕</button>
          </div>

          <!-- MODAL BODY -->
          <div style="padding:24px;display:grid;grid-template-columns:1.2fr 1fr;gap:24px;">
            
            <!-- LEFT: RIASEC SCORES & APTITUDE -->
            <div>
              <h3 style="margin:0 0 12px 0;font-size:1rem;color:var(--ink);">🔬 Level 1: Holland RIASEC Trait Radar</h3>
              
              <div style="background:var(--field);border-radius:14px;padding:16px;border:1.5px solid var(--edge);margin-bottom:18px;">
                ${[
                  { label: "Investigative (I) - खोजी", score: scores.I || 82, color: "#2563eb" },
                  { label: "Enterprising (E) - उद्यमी", score: scores.E || 75, color: "#f59e0b" },
                  { label: "Social (S) - सामाजिक", score: scores.S || 70, color: "#0d9488" },
                  { label: "Realistic (R) - व्यावहारिक", score: scores.R || 65, color: "#dc2626" },
                  { label: "Conventional (C) - संगठित", score: scores.C || 60, color: "#7c3aed" },
                  { label: "Artistic (A) - कलात्मक", score: scores.A || 55, color: "#ec4899" },
                ].map(item => `
                  <div style="margin-bottom:10px;">
                    <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:3px;">
                      <span style="font-weight:600;color:var(--ink);">${item.label}</span>
                      <strong style="color:var(--ink);">${item.score}%</strong>
                    </div>
                    <div style="height:6px;background:var(--card);border-radius:6px;overflow:hidden;">
                      <div style="width:${item.score}%;height:100%;background:${item.color};"></div>
                    </div>
                  </div>
                `).join("")}
              </div>

              ${!isG1 ? `
                <h3 style="margin:0 0 12px 0;font-size:1rem;color:var(--ink);">🧠 Level 2: NCERT TAMANNA Aptitudes</h3>
                <div style="background:var(--field);border-radius:14px;padding:14px;border:1.5px solid var(--edge);display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                  <div style="font-size:0.8rem;">📐 Spatial 3D: <strong>88%</strong></div>
                  <div style="font-size:0.8rem;">🔢 Numerical: <strong>85%</strong></div>
                  <div style="font-size:0.8rem;">⚙️ Mechanical: <strong>82%</strong></div>
                  <div style="font-size:0.8rem;">🧩 Logical AR: <strong>84%</strong></div>
                </div>
              ` : `
                <div style="background:var(--field);border-radius:14px;padding:14px;border:1.5px dashed var(--marigold);font-size:0.82rem;color:var(--ink-soft);">
                  🌱 <strong>Discovery Stage:</strong> Cognitive aptitude battery starts in Class 9 as per National Assessment Framework.
                </div>
              `}
            </div>

            <!-- RIGHT: TOP 3 CAREER PATHWAYS -->
            <div>
              <h3 style="margin:0 0 12px 0;font-size:1rem;color:var(--ink);">🎯 Top 3 Recommended Pathways</h3>
              
              <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
                ${(matches.length ? matches.slice(0, 3) : [
                  { title: "Robotics & Automation Engineer", fit: 94 },
                  { title: "Aerospace & Defense Systems", fit: 89 },
                  { title: "Data Scientist & AI Lead", fit: 86 }
                ]).map((m, idx) => `
                  <div style="padding:12px 14px;background:var(--field);border:1px solid var(--edge);border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
                    <div>
                      <div style="font-size:0.72rem;color:var(--teal);font-weight:800;">№ ${idx + 1} Best Fit Pathway</div>
                      <strong style="font-size:0.88rem;color:var(--ink);">${this.escape(m.title)}</strong>
                    </div>
                    <span style="background:rgba(45,212,191,0.15);color:var(--teal);font-weight:800;padding:4px 8px;border-radius:6px;font-size:0.82rem;">
                      ${m.fit || 90}% Match
                    </span>
                  </div>
                `).join("")}
              </div>

              <div style="padding:16px;background:var(--field);border-radius:14px;border:1.5px solid var(--edge);">
                <div style="font-size:0.82rem;font-weight:800;color:var(--ink);margin-bottom:4px;">
                  📋 Full Diagnostic Assessment
                </div>
                <p class="muted" style="font-size:0.8rem;margin:0 0 12px;line-height:1.45;">
                  Access complete psychometric vectors, TAMANNA cognitive breakdowns, and official report.
                </p>
                <button 
                  type="button" 
                  class="btn btn-primary btn-block" 
                  onclick="App.closeCounselorStudentModal(); App.go('report');"
                  style="width:100%;font-size:0.86rem;padding:10px;"
                >
                  📊 Open Official Report →
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    `;
  },

  bind(route) {
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.onclick = () => this.go(btn.getAttribute("data-nav"));
    });
    document.querySelectorAll("[data-go]").forEach((btn) => {
      btn.onclick = () => this.go(btn.getAttribute("data-go"));
    });
    document.querySelectorAll("[data-back]").forEach((btn) => {
      btn.onclick = () => history.back();
    });
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.onclick = () => this.toggleLang();
    });
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.onclick = () => this.toggleTheme();
    });
    document.querySelectorAll("[data-pause]").forEach((btn) => {
      btn.onclick = () => {
        this.save();
        this.toast(this.t("Progress saved. Resume anytime.", "प्रगति सेव हो गई। कभी भी फिर शुरू करें।"));
        this.go("assessments");
      };
    });
    document.querySelectorAll("[data-toast]").forEach((btn) => {
      btn.onclick = () => this.toast(btn.getAttribute("data-toast"));
    });
    // Global Career Library Controls
    const expSearch = document.getElementById("explore-q");
    if (expSearch) {
      expSearch.oninput = (e) => {
        this.state.exploreQuery = e.target.value;
        this.state.explorePage = 1;
        clearTimeout(this._searchTimer);
        this._searchTimer = setTimeout(() => this.render(), 180);
      };
    }

    document.querySelectorAll("[data-explore-sector]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        this.state.exploreSector = btn.getAttribute("data-explore-sector") || "all";
        this.state.explorePage = 1;
        this.render();
      };
    });

    document.querySelectorAll("[data-explore-demand]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        this.state.exploreDemand = btn.getAttribute("data-explore-demand") || "all";
        this.state.explorePage = 1;
        this.render();
      };
    });

    document.querySelectorAll("[data-explore-clear]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        this.state.exploreQuery = "";
        this.state.exploreSector = "all";
        this.state.exploreDemand = "all";
        this.state.explorePage = 1;
        this.render();
      };
    });

    document.querySelectorAll("[data-explore-more]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        this.state.explorePage = (this.state.explorePage || 1) + 1;
        this.render();
      };
    });

    document.querySelectorAll("[data-career]").forEach((btn) => {
      btn.onclick = () => this.go("career/" + btn.getAttribute("data-career"));
    });
    document.querySelectorAll("[data-save]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        this.toggleSave(btn.getAttribute("data-save"));
      };
    });
    document.querySelectorAll("[data-compare-add]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-compare-add");
        const list = this.state.compareIds || [];
        if (list.includes(id)) {
          this.toast(this.t("Already in compare", "पहले से तुलना में है"));
          return;
        }
        if (list.length >= 3) {
          this.toast(this.t("Max 3 careers in compare", "तुलना में अधिकतम 3"));
          return;
        }
        this.state.compareIds = [...list, id];
        this.save();
        this.toast(this.t("Added to compare", "तुलना में जोड़ा"));
      };
    });
    document.querySelectorAll("[data-compare-remove]").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-compare-remove");
        this.state.compareIds = (this.state.compareIds || []).filter((x) => x !== id);
        this.save();
        this.render();
      };
    });
    document.querySelectorAll("[data-print]").forEach((btn) => {
      btn.onclick = () => window.print();
    });
    document.querySelectorAll("[data-start]").forEach((btn) => {
      btn.onclick = () => {
        if (this.state.auth) {
          this.go(this.profileReady() ? "home" : "onboarding");
        } else {
          this.openAuthModal("signin");
        }
      };
    });
    document.querySelectorAll("[data-browse-careers]").forEach((btn) => {
      btn.onclick = () => {
        if (this.state.auth) {
          this.go("explore");
        } else {
          this.openAuthModal("signin");
        }
      };
    });
    document.querySelectorAll("[data-continue]").forEach((btn) => {
      btn.onclick = () => this.go("home");
    });
    document.querySelectorAll("[data-demo]").forEach((btn) => {
      btn.onclick = () => this.loadDemo();
    });
    document.querySelectorAll("[data-reset]").forEach((btn) => {
      btn.onclick = () => {
        if (confirm(this.t("Reset all progress on this device?", "इस डिवाइस की सारी प्रगति मिटाएँ?"))) {
          localStorage.removeItem(STORAGE_KEY);
          location.hash = "welcome";
          location.reload();
        }
      };
    });
    document.querySelectorAll("[data-speak]").forEach((btn) => {
      btn.onclick = () => {
        const text =
          this.state.lang === "hi"
            ? "अपने सपनों के बारे में बताएँ। हर बड़ी यात्रा एक छोटे विचार से शुरू होती है।"
            : "Tell us about your dreams. Every big journey starts with a small thought.";
        if ("speechSynthesis" in window) {
          const u = new SpeechSynthesisUtterance(text);
          u.lang = this.state.lang === "hi" ? "hi-IN" : "en-IN";
          speechSynthesis.cancel();
          speechSynthesis.speak(u);
        } else {
          this.toast(this.t("Speech not supported on this device.", "इस डिवाइस पर वाचन उपलब्ध नहीं।"));
        }
      };
    });

    // Auth modal controls
    document.querySelectorAll("[data-auth-open]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const tab = btn.getAttribute("data-auth-open") || "signin";
        this.openAuthModal(tab);
      };
    });

    document.querySelectorAll("[data-auth-close]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        this.closeAuthModal();
      };
    });

    const backdrop = document.getElementById("auth-backdrop");
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) this.closeAuthModal();
      };
    }

    document.querySelectorAll("[data-auth-tab]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const tab = btn.getAttribute("data-auth-tab") || "signin";
        this.state.authModalTab = tab;
        this.render();
      };
    });

    document.querySelectorAll("[data-auth-logout]").forEach((btn) => {
      btn.onclick = () => {
        this.state.auth = null;
        this.state.profile = {
          name: "",
          educationLevel: "class_10",
          educationStatus: "pursuing",
          grade: "10",
          school: "",
          stream: "general",
          roleModelArchetype: "tech",
          roleModelName: "",
          dreamImpact: "",
          aspiration: "",
          interestTags: [],
          workStyle: "analytical",
          city: "",
        };
        this.state.selectedInterestCategory = "all";
        this.state.tierAnswers = {};
        this.state.completedTiers = [];
        this.state.traitScores = {};
        this.state.riasec = null;
        this.state.aptitude = null;
        this.state.savedCareers = [];
        this.state.compareIds = [];
        this.state.tierIndex = 0;
        this.save();
        this.toast(this.t("Logged out. Returned to Landing Page.", "लॉगआउट सफल! मुख्य पृष्ठ पर वापस आ गए।"));
        this.go("welcome");
      };
    });

    document.querySelectorAll("[data-toggle-pass]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const targetId = btn.getAttribute("data-toggle-pass");
        const inp = document.getElementById(targetId);
        if (inp) {
          inp.type = inp.type === "password" ? "text" : "password";
          btn.textContent = inp.type === "password" ? "👁️" : "🙈";
        }
      };
    });

    let selectedRole = "Student";
    document.querySelectorAll("[data-role-select]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        selectedRole = btn.getAttribute("data-role-select");
        document.querySelectorAll("[data-role-select]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      };
    });

    document.querySelectorAll("[data-demo-login]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        this.state.auth = {
          name: "Rahul Kumar",
          email: "rahul.demo@example.com",
          role: "Student",
          grade: "10",
        };
        this.closeAuthModal();
        this.loadDemo();
      };
    });

    // Explicitly bind form submit listeners to App.handleSignIn / App.handleSignUp
    const siForm = document.getElementById("auth-signin-form");
    if (siForm) {
      siForm.onsubmit = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        this.handleSignIn(e);
        return false;
      };
    }

    const suForm = document.getElementById("auth-signup-form");
    if (suForm) {
      suForm.onsubmit = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        this.handleSignUp(e);
        return false;
      };
    }

    // FAQ Accordion Toggle
    document.querySelectorAll("[data-faq-toggle]").forEach((btn) => {
      btn.onclick = () => {
        const item = btn.closest(".faq-item");
        if (item) {
          item.classList.toggle("open");
        }
      };
    });

    // Category filter for landing career preview
    document.querySelectorAll("[data-cat-filter]").forEach((btn) => {
      btn.onclick = () => {
        this.state.landingCategory = btn.getAttribute("data-cat-filter");
        this.render();
        const sec = document.getElementById("careers");
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      };
    });

    // Landing comparison preset switcher
    document.querySelectorAll("[data-compare-preset]").forEach((btn) => {
      btn.onclick = () => {
        this.state.landingComparePreset = btn.getAttribute("data-compare-preset");
        this.render();
        const sec = document.getElementById("compare-feature");
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      };
    });

    // Launch Side-by-Side Comparison Tool direct binding
    document.querySelectorAll("[data-launch-compare]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const presetKey = btn.getAttribute("data-launch-compare") || this.state.landingComparePreset || "tech";
        const presets = typeof this.landingComparePresets === "function" ? this.landingComparePresets() : null;
        const p = presets ? (presets[presetKey] || presets.tech) : null;
        if (p && p.c1 && p.c2) {
          this.state.compareIds = [p.c1.id, p.c2.id];
          this.save();
        }
        this.go("compare");
      };
    });

    // Finalize Career Goal direct binding
    document.querySelectorAll("[data-finalize-career]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const cid = btn.getAttribute("data-finalize-career");
        this.finalizeCareer(cid);
      };
    });

    // Discovery Path Sequential Step Route Handler
    document.querySelectorAll("[data-step-route]").forEach((btn) => {
      btn.onclick = () => {
        const isLocked = btn.getAttribute("data-step-locked") === "1";
        if (isLocked) {
          const lockMsg = btn.getAttribute("data-step-lockmsg") || this.t("🔒 Please complete previous assessment to unlock!", "🔒 अनलॉक करने के लिए पहले पिछला मूल्यांकन पूरा करें!");
          this.toast(lockMsg);
          btn.classList.add("shake-locked");
          setTimeout(() => btn.classList.remove("shake-locked"), 500);
          return;
        }
        const route = btn.getAttribute("data-step-route");
        if (route) this.go(route);
      };
    });

    // Assessment & Multi-Tier Handlers
    document.querySelectorAll("[data-start-tier]").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const isLocked = btn.getAttribute("data-tier-locked") === "1";
        if (isLocked) {
          const lockMsg = btn.getAttribute("data-tier-lockmsg") || this.t("🔒 Complete previous assessment to unlock!", "🔒 अनलॉक करने के लिए पहले पिछला मूल्यांकन पूरा करें!");
          this.toast(lockMsg);
          btn.classList.add("shake-locked");
          setTimeout(() => btn.classList.remove("shake-locked"), 500);
          return;
        }
        const tier = btn.getAttribute("data-start-tier");
        this.state.activeTier = tier;
        const questions = (window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === tier);
        const firstUnanswered = questions.findIndex((q) => this.state.tierAnswers[q.id] === undefined);
        this.state.tierIndex = firstUnanswered >= 0 ? firstUnanswered : 0;
        this.go("test/" + tier);
      };
    });

    document.querySelectorAll("[data-tier-select]").forEach((btn) => {
      btn.onclick = () => {
        const tier = btn.getAttribute("data-tier-select");
        this.state.activeTier = tier;
        this.state.tierIndex = 0;
        this.render();
      };
    });

    document.querySelectorAll("[data-test-opt]").forEach((btn) => {
      btn.onclick = () => {
        const rawOpt = btn.getAttribute("data-test-opt");
        const optVal = (rawOpt === "like" || rawOpt === "dislike" || isNaN(Number(rawOpt))) ? rawOpt : Number(rawOpt);
        const activeTier = this.state.activeTier || "tier1_riasec";
        let questions = (window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === activeTier);
        if (!questions.length) questions = (window.DISHA_ALL_QUESTIONS || []).slice(0, 6);
        const idx = this.state.tierIndex || 0;
        const currentQ = questions[idx];
        if (currentQ) {
          this.state.tierAnswers[currentQ.id] = optVal;
          if (window.MoineeScore) {
            const computed = MoineeScore.scoreAllTiers(this.state.tierAnswers, window.DISHA_ALL_QUESTIONS || []);
            this.state.traitScores = { ...(this.state.traitScores || {}), ...(computed.traits || {}) };
          }
          this.save();
          this.render();

          setTimeout(() => {
            if (idx < questions.length - 1) {
              this.state.tierIndex = idx + 1;
              this.save();
              this.render();
            }
          }, 180);
        }
      };
    });

    document.querySelectorAll("[data-palette-jump]").forEach((btn) => {
      btn.onclick = () => {
        this.state.tierIndex = parseInt(btn.getAttribute("data-palette-jump"), 10);
        this.render();
      };
    });

    document.querySelectorAll("[data-test-prev]").forEach((btn) => {
      btn.onclick = () => {
        this.state.tierIndex = Math.max(0, (this.state.tierIndex || 0) - 1);
        this.save();
        this.render();
      };
    });

    document.querySelectorAll("[data-test-next]").forEach((btn) => {
      btn.onclick = () => {
        const activeTier = this.state.activeTier || "tier1_riasec";
        let questions = (window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === activeTier);
        const totalQ = questions.length || 1;
        this.state.tierIndex = Math.min(totalQ - 1, (this.state.tierIndex || 0) + 1);
        this.save();
        this.render();
      };
    });

    document.querySelectorAll("[data-test-shuffle]").forEach((btn) => {
      btn.onclick = () => {
        const activeTier = this.state.activeTier || "tier1_riasec";
        let questions = (window.DISHA_ALL_QUESTIONS || []).filter((q) => q.tier === activeTier);
        const unans = questions.map((q, i) => (!this.state.tierAnswers[q.id] ? i : null)).filter((x) => x !== null);
        if (unans.length) {
          this.state.tierIndex = unans[Math.floor(Math.random() * unans.length)];
        } else {
          this.state.tierIndex = Math.floor(Math.random() * questions.length);
        }
        this.render();
      };
    });

    document.querySelectorAll("[data-test-submit]").forEach((btn) => {
      btn.onclick = () => {
        const activeTier = this.state.activeTier || "tier1_riasec";
        if (!this.state.completedTiers.includes(activeTier)) {
          this.state.completedTiers.push(activeTier);
        }
        if (window.MoineeScore) {
          const computed = MoineeScore.scoreAllTiers(this.state.tierAnswers, window.DISHA_ALL_QUESTIONS || []);
          this.state.traitScores = { ...(this.state.traitScores || {}), ...(computed.traits || {}) };
        }
        this.save();
        this.toast(this.t("🎉 Assessment completed successfully! Generating your Psychometric Report...", "🎉 मूल्यांकन सफलतापूर्वक पूर्ण हुआ! साइकोमेट्रिक रिपोर्ट तैयार हो रही है..."));

        // Direct user straight to their comprehensive Psychometric Report
        this.go("report");
      };
    });

    // Mind Gym Breathing Pacer Toggle
    const bBtn = document.getElementById("breathe-toggle-btn");
    if (bBtn) {
      bBtn.onclick = () => {
        if (this._breatheRunning) {
          clearInterval(this._breatheTimer);
          this._breatheRunning = false;
          bBtn.textContent = "▶ " + this.t("Start Breathing Cycle", "प्राणायाम शुरू करें");
          const wrap = document.getElementById("breathe-wrap");
          if (wrap) wrap.className = "breathing-circle-wrap";
          const pText = document.getElementById("breathe-phase-text");
          if (pText) pText.textContent = this.t("Ready", "तैयार");
          const sub = document.getElementById("breathe-sub-text");
          if (sub) sub.textContent = this.t("Cycle paused. Tap start anytime.", "चक्र रुका हुआ है। कभी भी फिर शुरू करें।");
          return;
        }

        this._breatheRunning = true;
        bBtn.textContent = "⏸ " + this.t("Pause Breathing", "रोकें");

        const phases = [
          { name: this.t("Inhale", "सांस लें"), cls: "inhale", sec: 4, sub: this.t("Breathe in calm oxygen deeply through nose (4s)", "नाक से 4 सेकंड गहरी और शांत सांस लें") },
          { name: this.t("Hold", "रोकें"), cls: "hold", sec: 7, sub: this.t("Hold your breath gently & center your focus (7s)", "7 सेकंड सांस रोकें और मन को केंद्रित करें") },
          { name: this.t("Exhale", "छोड़ें"), cls: "exhale", sec: 8, sub: this.t("Exhale slowly through mouth releasing all anxiety (8s)", "मुंह से 8 सेकंड धीरे-धीरे सांस छोड़ें") },
        ];

        let pIdx = 0;
        let secLeft = phases[0].sec;

        const tick = () => {
          const p = phases[pIdx];
          const wrap = document.getElementById("breathe-wrap");
          const pText = document.getElementById("breathe-phase-text");
          const tText = document.getElementById("breathe-timer-text");
          const sub = document.getElementById("breathe-sub-text");

          if (wrap) wrap.className = `breathing-circle-wrap breathing-active ${p.cls}`;
          if (pText) pText.textContent = p.name;
          if (tText) tText.textContent = `${secLeft}s`;
          if (sub) sub.textContent = p.sub;

          secLeft--;
          if (secLeft < 0) {
            pIdx = (pIdx + 1) % phases.length;
            secLeft = phases[pIdx].sec;
          }
        };

        tick();
        clearInterval(this._breatheTimer);
        this._breatheTimer = setInterval(tick, 1000);
      };
    }

    // Mind Gym Affirmation Generator
    document.querySelectorAll("[data-new-affirmation]").forEach((btn) => {
      btn.onclick = () => {
        const rd = window.DISHA_RELIEF_DATA || {};
        const list = rd.affirmations || [];
        if (!list.length) return;
        const randomItem = list[Math.floor(Math.random() * list.length)];
        this.state.activeAffirmation = randomItem;
        const disp = document.getElementById("affirmation-display");
        if (disp) {
          disp.style.opacity = "0";
          setTimeout(() => {
            disp.textContent = `"${this.state.lang === "hi" ? randomItem.hi : randomItem.en}"`;
            disp.style.opacity = "1";
          }, 150);
        }
      };
    });

    if (route === "onboarding") this.bindOnboarding();
    if (route === "riasec") this.bindRiasec();
    if (route === "aptitude") this.bindAptitude();
    if (route === "explore") this.bindExplore();
    if (route === "counselor") this.bindCounselor();
  },

  syncOnboardingFields() {
    const name = document.getElementById("f-name");
    const city = document.getElementById("f-city");
    const eduLevel = document.getElementById("f-education-level");
    const stream = document.getElementById("f-stream");
    const school = document.getElementById("f-school");
    const roleModelName = document.getElementById("f-role-model-name");
    const aspiration = document.getElementById("f-aspiration");

    if (name) this.state.profile.name = name.value;
    if (city) this.state.profile.city = city.value;
    if (eduLevel) {
      this.state.profile.educationLevel = eduLevel.value;
      this.state.profile.grade = eduLevel.value;
    }
    if (stream) this.state.profile.stream = stream.value;
    if (school) this.state.profile.school = school.value;
    if (roleModelName) this.state.profile.roleModelName = roleModelName.value;
    if (aspiration) this.state.profile.aspiration = aspiration.value;
  },

  bindOnboarding() {
    const isHi = this.state.lang === "hi";

    // Continuous Live input sync on all fields to guarantee zero focus interruption & zero data loss
    const fieldIds = ["f-name", "f-city", "f-school", "f-role-model-name", "f-aspiration"];
    fieldIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.oninput = () => this.syncOnboardingFields();
        el.onchange = () => this.syncOnboardingFields();
      }
    });

    const streamSelect = document.getElementById("f-stream");
    if (streamSelect) {
      streamSelect.onchange = () => this.syncOnboardingFields();
    }

    // Dynamic institution label update on Education Level change
    const eduSelect = document.getElementById("f-education-level");
    if (eduSelect) {
      eduSelect.onchange = () => {
        this.syncOnboardingFields();
        this.render();
      };
    }

    // Status toggle buttons (Pursuing vs Completed)
    document.querySelectorAll("[data-status]").forEach((btn) => {
      btn.onclick = () => {
        this.syncOnboardingFields();
        this.state.profile.educationStatus = btn.getAttribute("data-status");
        this.render();
      };
    });

    // Archetype Selection Quiz Cards
    document.querySelectorAll("[data-archetype]").forEach((card) => {
      card.onclick = () => {
        this.syncOnboardingFields();
        const archId = card.getAttribute("data-archetype");
        const arch = this.getRoleModelArchetype(archId);
        this.state.profile.roleModelArchetype = archId;
        this.state.profile.roleModelName = isHi ? arch.hiIdols.split(",")[0].trim() : arch.idols.split(",")[0].trim();
        this.state.profile.aspiration = isHi ? arch.hiQuote : arch.quote;
        this.render();
      };
    });

    // Impact Pill Buttons
    document.querySelectorAll("[data-impact-pill]").forEach((pill) => {
      pill.onclick = () => {
        this.syncOnboardingFields();
        const pillText = pill.getAttribute("data-impact-pill");
        this.state.profile.dreamImpact = pillText;
        const currentAsp = (this.state.profile.aspiration || "").trim();
        const addition = isHi ? `विशेष रूप से ${pillText} पर ध्यान केंद्रित करना।` : `Specifically focusing on ${pillText}.`;
        if (!currentAsp.includes(pillText)) {
          this.state.profile.aspiration = currentAsp ? `${currentAsp} ${addition}` : addition;
        }
        const aspInput = document.getElementById("f-aspiration");
        const preview = document.getElementById("dream-live-preview");
        if (aspInput) aspInput.value = this.state.profile.aspiration;
        if (preview) preview.textContent = this.state.profile.aspiration;
        this.toast(isHi ? `जोड़ा गया: ${pillText}` : `Added focus: ${pillText}`);
      };
    });

    // Live aspiration input sync
    const aspInput = document.getElementById("f-aspiration");
    if (aspInput) {
      aspInput.oninput = () => {
        const preview = document.getElementById("dream-live-preview");
        if (preview) preview.textContent = aspInput.value || (isHi ? "अपने सपनों के बारे में लिखें..." : "Enter your dream vision...");
      };
    }

    // Category Filter Buttons for Interest Cloud
    document.querySelectorAll("[data-cat-filter]").forEach((btn) => {
      btn.onclick = () => {
        this.syncOnboardingFields();
        this.state.selectedInterestCategory = btn.getAttribute("data-cat-filter");
        this.render();
      };
    });

    // Interest Chips Multi-Select
    document.querySelectorAll("[data-interest]").forEach((btn) => {
      btn.onclick = () => {
        this.syncOnboardingFields();
        const id = btn.getAttribute("data-interest");
        const tags = this.state.profile.interestTags || [];
        if (tags.includes(id)) {
          this.state.profile.interestTags = tags.filter((t) => t !== id);
        } else {
          this.state.profile.interestTags = [...tags, id];
        }
        this.render();
      };
    });

    // Work Style Cards
    document.querySelectorAll("[data-workstyle]").forEach((card) => {
      card.onclick = () => {
        this.syncOnboardingFields();
        this.state.profile.workStyle = card.getAttribute("data-workstyle");
        this.render();
      };
    });

    // Save Profile & Continue
    document.querySelectorAll("[data-save-profile]").forEach((btn) => {
      btn.onclick = () => {
        this.syncOnboardingFields();
        this.state.profile.name = (this.state.profile.name || "").trim();
        this.state.profile.school = (this.state.profile.school || "").trim();
        this.state.profile.aspiration = (this.state.profile.aspiration || "").trim();

        if (!this.state.profile.name) {
          this.toast(this.t("Please enter your name.", "कृपया अपना नाम दर्ज करें।"));
          const el = document.getElementById("f-name");
          if (el) el.focus();
          return;
        }

        if (!this.state.profile.school) {
          this.toast(this.t("Please enter your school or college name.", "कृपया अपने स्कूल या कॉलेज का नाम लिखें।"));
          const el = document.getElementById("f-school");
          if (el) el.focus();
          return;
        }

        if (!this.state.profile.aspiration) {
          this.toast(this.t("Please write or select your dream aspiration.", "कृपया अपना सपना या लक्ष्य लिखें।"));
          const el = document.getElementById("f-aspiration");
          if (el) el.focus();
          return;
        }

        if (!this.state.profile.interestTags || !this.state.profile.interestTags.length) {
          this.toast(this.t("Select at least 2-3 topics that interest you.", "कृपया कम से कम 2-3 पसंदीदा रुचियां चुनें।"));
          return;
        }

        this.save();
        const pct = this.profilePercent();
        if (pct >= 70) {
          this.toast(this.t(`🎉 Profile ${pct}% Complete! Quest 1 Unlocked.`, `🎉 प्रोफ़ाइल ${pct}% पूर्ण! क्वेस्ट 1 अनलॉक हो गया!`));
        } else {
          this.toast(this.t(`Profile saved! (${pct}% complete)`, `प्रोफ़ाइल सेव हो गई! (${pct}% पूर्ण)`));
        }
        this.go("home");
      };
    });
  },

  bindRiasec() {
    const qs = DISHA_DATA.riasecQuestions;
    const idx = this.state.riasecIndex || 0;
    const q = qs[idx];

    document.querySelectorAll("[data-likert]").forEach((btn) => {
      btn.onclick = () => {
        this.state.riasecAnswers[q.id] = Number(btn.getAttribute("data-likert"));
        this.save();
        this.render();
        setTimeout(() => {
          if (idx < qs.length - 1) {
            this.state.riasecIndex = idx + 1;
            this.save();
            this.render();
          } else {
            this.finishRiasec();
          }
        }, 180);
      };
    });

    document.querySelectorAll("[data-riasec-prev]").forEach((btn) => {
      btn.onclick = () => {
        this.state.riasecIndex = Math.max(0, idx - 1);
        this.save();
        this.render();
      };
    });

    document.querySelectorAll("[data-riasec-next]").forEach((btn) => {
      btn.onclick = () => {
        if (idx >= qs.length - 1) this.finishRiasec();
        else {
          this.state.riasecIndex = idx + 1;
          this.save();
          this.render();
        }
      };
    });
  },

  finishRiasec() {
    this.state.riasec = MoineeScore.scoreRiasec(this.state.riasecAnswers, DISHA_DATA.riasecQuestions);
    this.save();
    this.toast(this.t("Interest profile ready!", "रुचि प्रोफ़ाइल तैयार!"));
    this.go(this.aptitudeDone() ? "report" : "aptitude");
  },

  bindAptitude() {
    const qs = DISHA_DATA.aptitudeQuestions;
    const idx = this.state.aptitudeIndex || 0;
    const q = qs[idx];

    document.querySelectorAll("[data-opt]").forEach((btn) => {
      btn.onclick = () => {
        this.state.aptitudeAnswers[q.id] = btn.getAttribute("data-opt");
        this.save();
        this.render();
      };
    });

    document.querySelectorAll("[data-apt-prev]").forEach((btn) => {
      btn.onclick = () => {
        this.state.aptitudeIndex = Math.max(0, idx - 1);
        this.save();
        this.render();
      };
    });

    document.querySelectorAll("[data-apt-next]").forEach((btn) => {
      btn.onclick = () => {
        if (idx >= qs.length - 1) this.finishAptitude();
        else {
          this.state.aptitudeIndex = idx + 1;
          this.save();
          this.render();
        }
      };
    });
  },

  finishAptitude() {
    this.state.aptitude = MoineeScore.scoreAptitude(this.state.aptitudeAnswers, DISHA_DATA.aptitudeQuestions);
    this.save();
    this.toast(this.t("Aptitude complete!", "योग्यता पूर्ण!"));
    this.go("report");
  },

  bindExplore() {
    const input = document.getElementById("explore-q");
    if (input) {
      input.oninput = (e) => {
        this.state.exploreQuery = e.target.value;
        this.state.explorePage = 1;
        clearTimeout(this._searchTimer);
        this._searchTimer = setTimeout(() => {
          this.render();
          const again = document.getElementById("explore-q");
          if (again) {
            again.focus();
            again.setSelectionRange(again.value.length, again.value.length);
          }
        }, 180);
      };
    }

    // Sector Filter Buttons
    document.querySelectorAll("[data-explore-sector]").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const sector = btn.getAttribute("data-explore-sector") || "all";
        this.state.exploreSector = sector;
        this.state.explorePage = 1;
        this.render();
      };
    });

    // Market Demand Filter Buttons
    document.querySelectorAll("[data-explore-demand]").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const demand = btn.getAttribute("data-explore-demand") || "all";
        this.state.exploreDemand = demand;
        this.state.explorePage = 1;
        this.render();
      };
    });

    // Clear Search / Reset Filters Buttons
    document.querySelectorAll("[data-explore-clear]").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.state.exploreQuery = "";
        this.state.exploreSector = "all";
        this.state.exploreDemand = "all";
        this.state.explorePage = 1;
        this.render();
      };
    });

    // Load More Careers Button
    document.querySelectorAll("[data-explore-more]").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.state.explorePage = (this.state.explorePage || 1) + 1;
        this.render();
      };
    });

    // Delegated container click fallback for smooth responsiveness
    const screen = document.querySelector(".career-library-screen");
    if (screen) {
      screen.onclick = (e) => {
        const secBtn = e.target.closest("[data-explore-sector]");
        if (secBtn) {
          e.preventDefault();
          e.stopPropagation();
          const sector = secBtn.getAttribute("data-explore-sector") || "all";
          this.state.exploreSector = sector;
          this.state.explorePage = 1;
          this.render();
          return;
        }
        const demBtn = e.target.closest("[data-explore-demand]");
        if (demBtn) {
          e.preventDefault();
          e.stopPropagation();
          const demand = demBtn.getAttribute("data-explore-demand") || "all";
          this.state.exploreDemand = demand;
          this.state.explorePage = 1;
          this.render();
          return;
        }
        const clrBtn = e.target.closest("[data-explore-clear]");
        if (clrBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.state.exploreQuery = "";
          this.state.exploreSector = "all";
          this.state.exploreDemand = "all";
          this.state.explorePage = 1;
          this.render();
          return;
        }
        const moreBtn = e.target.closest("[data-explore-more]");
        if (moreBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.state.explorePage = (this.state.explorePage || 1) + 1;
          this.render();
          return;
        }
      };
    }
  },

  bindCounselor() {
    // Cohort stage filter pills
    document.querySelectorAll("[data-admin-cohort-filter]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        this.state.adminCohortFilter = btn.getAttribute("data-admin-cohort-filter") || "all";
        this.loadCounselorDashboard();
      };
    });

    // School selector
    const schoolSel = document.getElementById("admin-school-filter");
    if (schoolSel) {
      schoolSel.onchange = (e) => {
        this.state.adminSchoolFilter = e.target.value;
        this.loadCounselorDashboard();
      };
    }

    // Search input
    const searchInp = document.getElementById("admin-search-input");
    if (searchInp) {
      searchInp.oninput = (e) => {
        this.state.adminSearch = e.target.value;
        clearTimeout(this._adminSearchTimer);
        this._adminSearchTimer = setTimeout(() => {
          this.loadCounselorDashboard();
        }, 220);
      };
    }

    document.querySelectorAll("[data-export-cohort]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        this.exportCohortSummary();
      };
    });

    document.querySelectorAll("[data-counselor-refresh]").forEach((btn) => {
      btn.onclick = async (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        this.toast(this.t("🔄 Refreshing cohort data from DB...", "🔄 डेटाबेस से रिफ्रेश हो रहा है..."));
        await this.loadCounselorDashboard();
        this.toast(this.t("✅ Cohort database synchronized!", "✅ डेटाबेस अपडेट हो गया!"));
      };
    });

    document.querySelectorAll("[data-open-counselor-student]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const sid = btn.getAttribute("data-open-counselor-student");
        if (sid) this.openCounselorStudentModal(sid);
      };
    });

    document.querySelectorAll("[data-close-counselor-modal]").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        this.closeCounselorStudentModal();
      };
    });

    const backdrop = document.getElementById("counselor-modal-backdrop");
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) this.closeCounselorStudentModal();
      };
    }
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
