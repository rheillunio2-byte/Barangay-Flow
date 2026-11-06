const navItems = document.querySelectorAll(".nav-item");
const views = document.querySelectorAll(".view");
const crumb = document.getElementById("crumb");

function showView(name) {
  views.forEach(v => v.classList.toggle("active", v.id === name));
  navItems.forEach(n => n.classList.toggle("active", n.dataset.view === name));
  const active = document.querySelector(`.nav-item[data-view="${name}"]`);
  crumb.textContent = active ? active.querySelector("span").textContent : ({
    documents:"Document services", analytics:"Community insights"
  }[name] || name);
  window.scrollTo({top:0, behavior:"smooth"});
}
navItems.forEach(item => item.addEventListener("click", () => showView(item.dataset.view)));
document.querySelectorAll("[data-go]").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.go)));

let toastTimer;
function toast(message, title="You're all set.") {
  const el = document.getElementById("toast");
  el.querySelector("b").textContent = title;
  document.getElementById("toastMessage").textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 4300);
}
document.getElementById("toastClose").addEventListener("click", () => document.getElementById("toast").classList.remove("show"));
document.getElementById("notificationBtn").addEventListener("click", () => toast("You're all caught up. New updates will appear here.", "Notifications"));
document.getElementById("helpBtn").addEventListener("click", () => toast("Visit the barangay hall during office hours or call your local help desk.", "Contact the barangay desk"));

document.querySelectorAll("[data-service]").forEach(btn => btn.addEventListener("click", () => {
  showView("documents");
  document.getElementById("documentType").value = btn.dataset.service;
  document.getElementById("requestFormPanel").scrollIntoView({behavior:"smooth", block:"center"});
}));

const modal = document.getElementById("modal");
function openModal(title, text) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalText").textContent = text;
  modal.classList.add("show");
}
document.getElementById("modalClose").addEventListener("click", () => modal.classList.remove("show"));
document.getElementById("modalDone").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });
document.querySelectorAll("[data-detail]").forEach(btn => btn.addEventListener("click", () => openModal(btn.dataset.detail, "Your request is safely recorded. The barangay team will update its status as it moves through review and release.")));

document.querySelectorAll(".filter-tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("selected"));
  tab.classList.add("selected");
  const filter = tab.dataset.filter;
  document.querySelectorAll(".table-row").forEach(row => row.style.display = filter === "all" || (filter === "ready" && row.dataset.status === "ready") || (filter === "processing" && row.dataset.status === "processing") ? "grid" : "none");
}));

function addRequestRow(type, ref) {
  const row = document.createElement("div");
  row.className = "table-row";
  row.dataset.status = "processing";
  row.innerHTML = `<div class="table-doc"><div class="doc-icon green">▤</div><div><b>${type}</b><small>${ref}</small></div></div><span>Nov 7, 2026</span><span class="pill pill-review">Submitted</span><span>To be confirmed</span><button class="row-more" type="button">···</button>`;
  row.querySelector(".row-more").addEventListener("click", () => openModal(type, "Your new request has been submitted. The barangay office will review the details and notify you of the next step."));
  document.getElementById("requestList").prepend(row);
  const count = document.querySelector(".nav-count");
  if (count) count.textContent = String(Number(count.textContent) + 1);
}
document.getElementById("documentForm").addEventListener("submit", e => {
  e.preventDefault();
  const type = document.getElementById("documentType").value;
  const ref = "BF-2026-" + Math.floor(1000 + Math.random() * 8999);
  addRequestRow(type, ref);
  e.target.reset();
  toast(`Reference ${ref}. We'll notify you when it is reviewed.`, "Request submitted");
  showView("requests");
});
document.getElementById("appointmentForm").addEventListener("submit", e => {
  e.preventDefault();
  toast("Your appointment request has been received. A confirmation will follow.", "Appointment requested");
  e.target.reset();
});
document.getElementById("concernForm").addEventListener("submit", e => {
  e.preventDefault();
  const ref = "CN-2026-" + Math.floor(1000 + Math.random() * 8999);
  e.target.reset();
  toast(`Your concern reference is ${ref}. Keep it for future follow-ups.`, "Concern submitted");
});
const dateInput = document.getElementById("appointmentDate");
if (dateInput) dateInput.min = new Date().toISOString().slice(0,10);


// Subtle ambient particles and drifting leaves add motion without distracting from tasks.
(function createAmbientParticles(){
  const layer = document.getElementById("ambientParticles");
  if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.setProperty("--left", `${(i * 37 + 11) % 100}%`);
    dot.style.setProperty("--duration", `${13 + (i % 9) * 2.1}s`);
    dot.style.setProperty("--delay", `${-((i * 7) % 24)}s`);
    dot.style.setProperty("--drift", `${((i % 2) ? 1 : -1) * (18 + (i % 5) * 12)}px`);
    layer.appendChild(dot);
  }
  for (let i = 0; i < 9; i++) {
    const leaf = document.createElement("span");
    leaf.className = "leaf-particle";
    leaf.style.setProperty("--left", `${(i * 19 + 8) % 100}%`);
    leaf.style.setProperty("--duration", `${19 + (i % 5) * 3}s`);
    leaf.style.setProperty("--delay", `${-((i * 5) % 19)}s`);
    leaf.style.setProperty("--rotation", `${(i * 41) % 180}deg`);
    layer.appendChild(leaf);
  }
})();
