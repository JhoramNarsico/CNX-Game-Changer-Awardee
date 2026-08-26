/* ==========================================================================
   CNX 6100 ROCKSTARS HALL OF FAME - APPLICATION LOGIC
   ========================================================================== */

// --- DEFAULT INITIAL DATASET (From Screenshots & Concentrix Bacolod Rockstars) ---
const DEFAULT_ROCKSTARS = [
  {
    id: "wall_273qn0j51406sfj",
    name: "Adriel Jarred Maja",
    program: "FENWICK ATSX",
    award: "Q3 2026 Top Advisor",
    year: "2026",
    quarter: "Q2",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    messages: [
      { id: "m1", author: "Coach Sarah", text: "Incredible performance this quarter, Adriel! Keep soaring high!", timestamp: "2026-08-20 14:30" }
    ]
  },
  {
    id: "wall_891kn3f92019a12",
    name: "Alvarez Maybelyn",
    program: "TRAVELLING TIGERS",
    award: "Q3 2026 Top Advisor",
    year: "2026",
    quarter: "Q2",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    messages: [
      { id: "m1", author: "Team Captain Mark", text: "Maybelyn's customer satisfaction scores are off the charts! Proud of you!", timestamp: "2026-08-21 09:15" },
      { id: "m2", author: "Jenny - CS", text: "Always helpful to teammates. Truly a MassKara Rockstar!", timestamp: "2026-08-22 11:40" },
      { id: "m3", author: "HR Team", text: "Congratulations Maybelyn! Keep shining bright!", timestamp: "2026-08-24 16:00" }
    ]
  },
  {
    id: "wall_443pl1o99281x77",
    name: "Angel Bert Hayawon",
    program: "FENWICK ATSX",
    award: "Q3 2026 Top Advisor",
    year: "2026",
    quarter: "Q2",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    messages: [
      { id: "m1", author: "Operations Director", text: "Bert's dedication to quality is unmatched. Congrats on making the Hall of Fame!", timestamp: "2026-08-25 10:05" }
    ]
  },
  {
    id: "wall_552kk3l11029z88",
    name: "Francis James Dela Cruz",
    program: "SMILE SHINE SERVE",
    award: "Q2 2026 Leadership Excellence",
    year: "2026",
    quarter: "Q2",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    messages: [
      { id: "m1", author: "Bacolod Site Lead", text: "Francis embodies the true MassKara spirit of service!", timestamp: "2026-08-18 17:20" }
    ]
  },
  {
    id: "wall_771aa9p44820m33",
    name: "Clarisse Anne Santos",
    program: "TRAVELLING TIGERS",
    award: "Q1 2026 Quality Champion",
    year: "2026",
    quarter: "Q1",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    messages: [
      { id: "m1", author: "Quality Team", text: "Perfect 100% QA score for 3 consecutive months!", timestamp: "2026-04-10 13:00" },
      { id: "m2", author: "Leo M.", text: "Way to go Clarisse!", timestamp: "2026-04-12 08:30" }
    ]
  },
  {
    id: "wall_112bb8c33910q55",
    name: "Jerome Vance Tan",
    program: "FENWICK ATSX",
    award: "Q4 2025 Hall of Fame Legend",
    year: "2025",
    quarter: "Q4",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    messages: [
      { id: "m1", author: "Team Alpha", text: "A legend then, a legend now!", timestamp: "2025-12-28 19:45" }
    ]
  }
];

// --- STATE MANAGEMENT ---
let rockstars = [];
let activeYear = "all";
let activeQuarter = "all";
let currentSearch = "";
let currentSelectedWallId = null;
let uploadedPhotoBase64 = "";

// --- DOM ELEMENTS ---
const rockstarsGrid = document.getElementById("rockstarsGrid");
const emptyState = document.getElementById("emptyState");
const yearFilterGroup = document.getElementById("yearFilterGroup");
const quarterFilterGroup = document.getElementById("quarterFilterGroup");
const searchInput = document.getElementById("searchInput");
const btnClearSearch = document.getElementById("btnClearSearch");
const btnResetFilters = document.getElementById("btnResetFilters");

// Stats Elements
const statInducted = document.getElementById("statInducted");
const statCrownedYear = document.getElementById("statCrownedYear");
const statYearsLegends = document.getElementById("statYearsLegends");

// Modals
const wallModal = document.getElementById("wallModal");
const crewConsoleModal = document.getElementById("crewConsoleModal");
const revealModal = document.getElementById("revealModal");
const loginModal = document.getElementById("loginModal");

// Wall Modal Controls
const wallModalPhoto = document.getElementById("wallModalPhoto");
const wallModalProgram = document.getElementById("wallModalProgram");
const wallModalQuarter = document.getElementById("wallModalQuarter");
const wallModalName = document.getElementById("wallModalName");
const wallModalAward = document.getElementById("wallModalAward");
const wallModalMessageCount = document.getElementById("wallModalMessageCount");
const wallMessagesList = document.getElementById("wallMessagesList");
const postMessageForm = document.getElementById("postMessageForm");
const msgSenderInput = document.getElementById("msgSenderInput");
const msgTextInput = document.getElementById("msgTextInput");

// Console Admin Form Controls
const rockstarForm = document.getElementById("rockstarForm");
const formRockstarId = document.getElementById("formRockstarId");
const inputName = document.getElementById("inputName");
const inputProgram = document.getElementById("inputProgram");
const inputAward = document.getElementById("inputAward");
const selectYear = document.getElementById("selectYear");
const selectQuarter = document.getElementById("selectQuarter");
const uploadZone = document.getElementById("uploadZone");
const inputFilePhoto = document.getElementById("inputFilePhoto");
const uploadPrompt = document.getElementById("uploadPrompt");
const uploadPreviewWrap = document.getElementById("uploadPreviewWrap");
const uploadPreviewImg = document.getElementById("uploadPreviewImg");
const btnRemovePhoto = document.getElementById("btnRemovePhoto");
const btnSaveRockstar = document.getElementById("btnSaveRockstar");
const btnCancelEdit = document.getElementById("btnCancelEdit");
const manageTableBody = document.getElementById("manageTableBody");
const consoleTotalCount = document.getElementById("consoleTotalCount");

// Console Tabs
const tabBtnAddEdit = document.getElementById("tabBtnAddEdit");
const tabBtnManage = document.getElementById("tabBtnManage");
const tabAddEdit = document.getElementById("tabAddEdit");
const tabManage = document.getElementById("tabManage");

// Action Buttons
const btnCrewSignIn = document.getElementById("btnCrewSignIn");
const btnOpenConsoleHeader = document.getElementById("btnOpenConsoleHeader");
const btnOpenConsoleHero = document.getElementById("btnOpenConsoleHero");
const btnPlayReveal = document.getElementById("btnPlayReveal");
const btnTriggerConfetti = document.getElementById("btnTriggerConfetti");
const btnResetDefaultData = document.getElementById("btnResetDefaultData");
const btnScrollTop = document.getElementById("btnScrollTop");

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  render();
  animateCounters();
});

// --- DATA LOCAL STORAGE HANDLING ---
function loadData() {
  const stored = localStorage.getItem("cnx_rockstars_data");
  if (stored) {
    try {
      rockstars = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse local storage, reverting to default dataset", e);
      rockstars = [...DEFAULT_ROCKSTARS];
      saveData();
    }
  } else {
    rockstars = [...DEFAULT_ROCKSTARS];
    saveData();
  }
}

function saveData() {
  localStorage.setItem("cnx_rockstars_data", JSON.stringify(rockstars));
}

// --- MAIN RENDER FUNCTION ---
function render() {
  // Filter rockstars based on activeYear, activeQuarter, currentSearch
  const filtered = rockstars.filter(item => {
    const matchYear = activeYear === "all" || item.year === activeYear;
    const matchQuarter = activeQuarter === "all" || item.quarter === activeQuarter;
    const q = currentSearch.toLowerCase().trim();
    const matchSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      item.program.toLowerCase().includes(q) || 
      item.award.toLowerCase().includes(q);

    return matchYear && matchQuarter && matchSearch;
  });

  // Render Grid
  if (filtered.length === 0) {
    rockstarsGrid.style.display = "none";
    emptyState.style.display = "block";
  } else {
    rockstarsGrid.style.display = "grid";
    emptyState.style.display = "none";
    rockstarsGrid.innerHTML = filtered.map(item => createRockstarCardHTML(item)).join("");
  }

  // Update Header Stats
  updateStatsCounters();

  // Render Admin Manage Table if Open
  renderManageTable();
}

// --- CARD HTML GENERATOR ---
function createRockstarCardHTML(item) {
  const msgCount = item.messages ? item.messages.length : 0;
  const msgText = msgCount === 1 ? "1 message" : `${msgCount} messages`;
  const isAltBadge = item.program.toUpperCase().includes("TIGERS");

  return `
    <div class="rockstar-card" data-id="${item.id}" onclick="openWallModal('${item.id}')">
      <img src="${item.photo}" alt="${item.name}" class="card-bg-photo" loading="lazy" onError="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'">
      <div class="card-overlay"></div>
      <div class="card-quarter-tag">${item.quarter} ${item.year}</div>
      <div class="card-content">
        <span class="card-program-badge ${isAltBadge ? 'alt-color' : ''}">${escapeHTML(item.program)}</span>
        <h3 class="card-name">${escapeHTML(item.name)}</h3>
        <p class="card-award-title">${escapeHTML(item.award)}</p>
        <div class="card-footer-bar">
          <span class="card-msg-count">${msgText}</span>
          <span class="card-wall-link">Open wall &rarr;</span>
        </div>
      </div>
    </div>
  `;
}

// --- STATS COUNTERS ---
function updateStatsCounters() {
  const totalInducted = rockstars.length;
  const year2026Count = rockstars.filter(r => r.year === "2026").length;
  
  statInducted.innerText = totalInducted;
  statCrownedYear.innerText = year2026Count;
  statYearsLegends.innerText = "1";
  consoleTotalCount.innerText = totalInducted;
}

function animateCounters() {
  [statInducted, statCrownedYear].forEach(el => {
    const target = parseInt(el.innerText) || 0;
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 20));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target;
        clearInterval(timer);
      } else {
        el.innerText = current;
      }
    }, 40);
  });
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
  // Year Filter Buttons
  yearFilterGroup.addEventListener("click", (e) => {
    if (e.target.classList.contains("pill-btn")) {
      yearFilterGroup.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      activeYear = e.target.getAttribute("data-year");
      render();
    }
  });

  // Quarter Filter Buttons
  quarterFilterGroup.addEventListener("click", (e) => {
    if (e.target.classList.contains("pill-btn")) {
      quarterFilterGroup.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("active-orange"));
      e.target.classList.add("active-orange");
      activeQuarter = e.target.getAttribute("data-quarter");
      render();
    }
  });

  // Search Input Handler
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    btnClearSearch.style.display = currentSearch ? "block" : "none";
    render();
  });

  btnClearSearch.addEventListener("click", () => {
    searchInput.value = "";
    currentSearch = "";
    btnClearSearch.style.display = "none";
    render();
  });

  btnResetFilters.addEventListener("click", () => {
    activeYear = "all";
    activeQuarter = "all";
    currentSearch = "";
    searchInput.value = "";
    btnClearSearch.style.display = "none";

    yearFilterGroup.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("active"));
    yearFilterGroup.querySelector('[data-year="all"]').classList.add("active");

    quarterFilterGroup.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("active-orange"));
    quarterFilterGroup.querySelector('[data-quarter="all"]').classList.add("active-orange");

    render();
  });

  // Scroll to Top
  btnScrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- MODALS TOGGLE ---
  // Wall Modal Close
  document.getElementById("btnCloseWallModal").addEventListener("click", () => closeModal(wallModal));

  // Console Modal Open / Close
  btnOpenConsoleHeader.addEventListener("click", openConsoleModal);
  btnOpenConsoleHero.addEventListener("click", openConsoleModal);
  document.getElementById("btnCloseConsoleModal").addEventListener("click", () => closeModal(crewConsoleModal));

  // Sign In Modal
  btnCrewSignIn.addEventListener("click", () => openModal(loginModal));
  document.getElementById("btnCloseLoginModal").addEventListener("click", () => closeModal(loginModal));

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const pass = document.getElementById("inputPasscode").value;
    if (pass === "6100" || pass === "admin") {
      closeModal(loginModal);
      showToast("Access granted! Welcome to Crew Console", "success");
      openConsoleModal();
    } else {
      showToast("Invalid HR Passcode. Please try '6100'", "error");
    }
  });

  // Reveal Modal
  btnPlayReveal.addEventListener("click", () => {
    openModal(revealModal);
    triggerConfettiBurst();
  });
  document.getElementById("btnCloseRevealModal").addEventListener("click", () => closeModal(revealModal));
  btnTriggerConfetti.addEventListener("click", triggerConfettiBurst);
  document.getElementById("btnExploreWallFromReveal").addEventListener("click", () => closeModal(revealModal));

  // Post Wall Message Form
  postMessageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentSelectedWallId) return;

    const author = msgSenderInput.value.trim();
    const text = msgTextInput.value.trim();

    if (!author || !text) return;

    const rockstar = rockstars.find(r => r.id === currentSelectedWallId);
    if (rockstar) {
      if (!rockstar.messages) rockstar.messages = [];
      const newMsg = {
        id: "msg_" + Date.now(),
        author: author,
        text: text,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
      };
      rockstar.messages.push(newMsg);
      saveData();
      renderWallModalMessages(rockstar);
      render(); // Update counts in grid
      msgTextInput.value = "";
      showToast("Your appreciation message was posted!", "success");
    }
  });

  // --- HR CONSOLE TABS ---
  tabBtnAddEdit.addEventListener("click", () => switchConsoleTab("addEdit"));
  tabBtnManage.addEventListener("click", () => switchConsoleTab("manage"));

  // --- HR IMAGE UPLOAD ZONE ---
  uploadZone.addEventListener("click", () => inputFilePhoto.click());
  inputFilePhoto.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        uploadedPhotoBase64 = event.target.result;
        showPhotoPreview(uploadedPhotoBase64);
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemovePhoto.addEventListener("click", (e) => {
    e.stopPropagation();
    uploadedPhotoBase64 = "";
    inputFilePhoto.value = "";
    uploadPrompt.style.display = "block";
    uploadPreviewWrap.style.display = "none";
    uploadPreviewImg.src = "";
  });

  // Cancel Edit Form
  btnCancelEdit.addEventListener("click", resetAdminForm);

  // Save Rockstar Form Handler
  rockstarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = formRockstarId.value;

    const name = inputName.value.trim();
    const program = inputProgram.value.trim();
    const award = inputAward.value.trim();
    const year = selectYear.value;
    const quarter = selectQuarter.value;
    const photo = uploadedPhotoBase64 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

    if (editId) {
      // Edit existing
      const index = rockstars.findIndex(r => r.id === editId);
      if (index !== -1) {
        rockstars[index] = {
          ...rockstars[index],
          name, program, award, year, quarter, photo
        };
        showToast(`Updated award details for ${name}!`, "success");
      }
    } else {
      // Add new
      const newRockstar = {
        id: "wall_" + Date.now(),
        name, program, award, year, quarter, photo,
        messages: []
      };
      rockstars.unshift(newRockstar);
      showToast(`New Rockstar ${name} crowned successfully! 🌟`, "success");
    }

    saveData();
    resetAdminForm();
    render();
    switchConsoleTab("manage");
  });

  // Reset Default Data Handler
  btnResetDefaultData.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset the database to original default rockstars?")) {
      rockstars = [...DEFAULT_ROCKSTARS];
      saveData();
      render();
      resetAdminForm();
      showToast("Database restored to default Rockstars!", "success");
    }
  });

  // Close Modals on Overlay Click
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });
}

// --- WALL MODAL FUNCTIONS ---
function openWallModal(id) {
  const rockstar = rockstars.find(r => r.id === id);
  if (!rockstar) return;

  currentSelectedWallId = id;
  wallModalPhoto.src = rockstar.photo;
  wallModalProgram.innerText = rockstar.program;
  wallModalQuarter.innerText = `${rockstar.quarter} ${rockstar.year}`;
  wallModalName.innerText = rockstar.name;
  wallModalAward.innerText = rockstar.award;

  renderWallModalMessages(rockstar);
  openModal(wallModal);
}

function renderWallModalMessages(rockstar) {
  const msgs = rockstar.messages || [];
  wallModalMessageCount.innerText = msgs.length;

  if (msgs.length === 0) {
    wallMessagesList.innerHTML = `
      <div class="empty-messages" style="text-align: center; color: var(--text-dim); padding: 20px;">
        <p>No notes on the wall yet. Be the first to leave a message of appreciation! 💖</p>
      </div>
    `;
  } else {
    wallMessagesList.innerHTML = msgs.slice().reverse().map(m => `
      <div class="msg-item">
        <div class="msg-author">From: ${escapeHTML(m.author)}</div>
        <div class="msg-text">${escapeHTML(m.text)}</div>
        <div class="msg-time">${m.timestamp}</div>
      </div>
    `).join("");
  }
}

// --- HR CONSOLE ADMIN PANEL FUNCTIONS ---
function openConsoleModal() {
  renderManageTable();
  openModal(crewConsoleModal);
}

function switchConsoleTab(tab) {
  if (tab === "addEdit") {
    tabBtnAddEdit.classList.add("active");
    tabBtnManage.classList.remove("active");
    tabAddEdit.classList.add("active");
    tabManage.classList.remove("active");
  } else {
    tabBtnManage.classList.add("active");
    tabBtnAddEdit.classList.remove("active");
    tabManage.classList.add("active");
    tabAddEdit.classList.remove("active");
    renderManageTable();
  }
}

function renderManageTable() {
  if (!manageTableBody) return;

  if (rockstars.length === 0) {
    manageTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color: var(--text-dim);">No Rockstars in records. Click Add Rockstar to create one.</td></tr>`;
    return;
  }

  manageTableBody.innerHTML = rockstars.map(item => `
    <tr>
      <td><img src="${item.photo}" class="table-img" alt="${item.name}"></td>
      <td><strong>${escapeHTML(item.name)}</strong></td>
      <td><span class="badge-program">${escapeHTML(item.program)}</span></td>
      <td>${escapeHTML(item.award)}</td>
      <td><span class="badge-quarter">${item.quarter} ${item.year}</span></td>
      <td>${item.messages ? item.messages.length : 0} msgs</td>
      <td>
        <div class="table-actions">
          <button class="btn-table-edit" onclick="editRockstar('${item.id}')">Edit</button>
          <button class="btn-table-delete" onclick="deleteRockstar('${item.id}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function editRockstar(id) {
  const item = rockstars.find(r => r.id === id);
  if (!item) return;

  formRockstarId.value = item.id;
  inputName.value = item.name;
  inputProgram.value = item.program;
  inputAward.value = item.award;
  selectYear.value = item.year;
  selectQuarter.value = item.quarter;

  uploadedPhotoBase64 = item.photo;
  showPhotoPreview(item.photo);

  btnSaveRockstar.innerText = "Update Rockstar Details ✏️";
  btnCancelEdit.style.display = "inline-flex";

  switchConsoleTab("addEdit");
}

function deleteRockstar(id) {
  const item = rockstars.find(r => r.id === id);
  if (!item) return;

  if (confirm(`Are you sure you want to delete ${item.name} from the Hall of Fame?`)) {
    rockstars = rockstars.filter(r => r.id !== id);
    saveData();
    render();
    showToast(`Removed ${item.name} from Hall of Fame.`, "info");
  }
}

function resetAdminForm() {
  formRockstarId.value = "";
  rockstarForm.reset();
  uploadedPhotoBase64 = "";
  inputFilePhoto.value = "";
  uploadPrompt.style.display = "block";
  uploadPreviewWrap.style.display = "none";
  uploadPreviewImg.src = "";
  btnSaveRockstar.innerText = "Save Rockstar ✨";
  btnCancelEdit.style.display = "none";
}

function showPhotoPreview(src) {
  uploadPrompt.style.display = "none";
  uploadPreviewWrap.style.display = "flex";
  uploadPreviewImg.src = src;
}

// --- MODAL UTILS ---
function openModal(modalEl) {
  modalEl.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modalEl) {
  modalEl.classList.remove("active");
  document.body.style.overflow = "";
}

// --- CANVAS CONFETTI EFFECT ---
function triggerConfettiBurst() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  const particles = [];
  const colors = ["#FF3B94", "#00F2FE", "#FFD13B", "#39FF14", "#7B2CBF"];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 + 50,
      radius: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.7) * 14,
      gravity: 0.25,
      alpha: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= 0.015;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    if (alive) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
    <span>${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- HELPER SANITIZER ---
function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
