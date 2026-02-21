
/* ===== EDIT LOGIN ===== */
const AUTH = { username: "pushpita", password: "pritam" };

/* ===== SLIDE DURATION ===== */
const SLIDE_MS = 6000;

/* ===== CAPTIONS (12 items) ===== */
const MOMENTS = [
  { title: "1st meet", desc: "The beginning of everything 🤍🤍🤍" },
  { title: "1st Selfie", desc: "Still feels like a dream 🤍 " },
  { title: "First date", desc: "I knew you were special 🤍" },
  { title: "Starting the journey", desc: "A memory I treasure 💙💙💙" },
  { title: "Most memorable day of my life", desc: "Starting the journey with you 💙🤍💙" },
  { title: "A sweet moment", desc: "Pure happiness." },
  { title: "Our Shadows were also together at that moment", desc: "Another favorite view 🤍" },
  { title: "A warm day", desc: "You are my favourite 💙🤍💙" },
  { title: "A calm moment", desc: "Your smile makes everything better 🤍 " },
  { title: "A long cherished moment", desc: "Always cheering for you💙" },
  { title: "A cozy moment", desc: "Holding your hand feels like heaven 💙" },
  { title: "The journey continues", desc: "And I will always choose you 💙🤍💙" }
];
"use strict";

/* ===== FINAL MESSAGE ===== */
const FINAL = {
  title: "To my favorite person(Pushpita)",
  sub: "Always and forever",
  message: [
    "Happy 5th monthanniversary, my love!",
    "Five months.",
"Not a lifetime.",
"Not a fairy tale ending.",
"Just five honest, real, beautifully imperfect months of choosing each other.",
"And somehow, in those five months, you’ve become my favorite part of every day.",
"You are the quiet comfort in my chaos.",
"The smile I don’t have to force.",
"The place my heart feels most at home.",
"We’ve laughed, learned, grown, and maybe even argued a little — but through it all, we kept showing up for each other.",
"That’s what makes this special.",
"Not perfection.",
"Commitment.",
"Five months of memories.",
"Five months of building something that feels steady and real.",
"I don’t just celebrate the date.",
"I celebrate you.",
"Happy 5th month anniversary.",
"Thank you for being my peace, my excitement, and my person.",
    "Thank you for choosing me, again and again.",
    "Your presence makes ordinary days feel magical.",
    "I love you more than words can responsibly carry 💙💙💙"
  ].join(" "),
  signature: "— Always yours (pritam)"
};

/* ===== FLOWER SETTINGS ===== */
const PETAL_COUNT = 90;       // steady falling petals
const BURST_EXTRA = 50;       // extra petals when celebrating

const $ = (id) => document.getElementById(id);

/* ===== SCREENS ===== */
const screens = {
  login: $("screenLogin"),
  congrats: $("screenCongrats"),
  loveQ: $("screenLoveQuestion"),
  gallery: $("screenGallery"),
  final: $("screenFinal")
};

function showScreen(key){
  Object.values(screens).forEach(s => { if (s) s.hidden = true; });
  const el = screens[key];
  if (!el) return;
  el.hidden = false;
}

/* ===== LOGIN DOM ===== */
const loginForm = $("loginForm");
const loginError = $("loginError");
const userInput = $("username");
const passInput = $("password");
const togglePassBtn = $("togglePass");

/* ===== FLOW BUTTONS ===== */
const toLoveQuestionBtn = $("toLoveQuestionBtn");
const loveYesBtn = $("loveYesBtn");
const loveNoBtn = $("loveNoBtn");
const loveChoiceArea = $("loveChoiceArea");
const logoutBtn = $("logoutBtn");
const replaySlideshowBtn = $("replaySlideshowBtn");

/* ===== GALLERY DOM ===== */
const momentTitle = $("momentTitle");
const momentDesc = $("momentDesc");
const track = $("track");
const slides = track ? Array.from(track.querySelectorAll(".slide")) : [];
const progressBar = $("progressBar");
const slideCountText = $("slideCountText");
const exploreCta = $("exploreCta");
const exploreMoreBtn = $("exploreMoreBtn");

/* ===== FINAL DOM ===== */
const finalTitle = $("finalTitle");
const finalSub = $("finalSub");
const typedMessageEl = $("typedMessage");
const typeAgainBtn = $("typeAgainBtn");
const signatureEl = $("signature");
const backToGalleryBtn = $("backToGalleryBtn");

/* ===== CANVAS FLOWERS ===== */
const canvas = $("petalCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

/* ---------------- FLOWERS / PETALS ENGINE ---------------- */
function resizeCanvas(){
  if (!canvas || !ctx) return;
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const petals = [];
function rand(min, max){ return Math.random() * (max - min) + min; }

function createPetal(spawnTop = true){
  const w = window.innerWidth;
  const h = window.innerHeight;

  // petal colors: pink variants
  const color = Math.random() < 0.5 ? "rgba(255,95,162," : "rgba(255,154,200,";

  return {
    x: rand(0, w),
    y: spawnTop ? rand(-h * 0.3, -20) : rand(0, h),
    r: rand(6, 14),
    speedY: rand(0.9, 2.4),
    driftX: rand(-0.8, 0.8),
    rot: rand(0, Math.PI * 2),
    rotSpeed: rand(-0.04, 0.04),
    wobble: rand(0, Math.PI * 2),
    wobbleSpeed: rand(0.01, 0.035),
    color,
    alpha: rand(0.35, 0.75)
  };
}

function initPetals(){
  petals.length = 0;
  for (let i = 0; i < PETAL_COUNT; i++){
    petals.push(createPetal(true));
  }
}
initPetals();

function drawPetal(p){
  if (!ctx) return;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);

  // petal shape
  ctx.beginPath();
  ctx.moveTo(0, -p.r);
  ctx.bezierCurveTo(p.r, -p.r, p.r, p.r, 0, p.r);
  ctx.bezierCurveTo(-p.r, p.r, -p.r, -p.r, 0, -p.r);
  ctx.closePath();

  ctx.fillStyle = `${p.color}${p.alpha})`;
  ctx.fill();

  // subtle highlight
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}

function animatePetals(){
  if (!ctx) return;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  const w = window.innerWidth;
  const h = window.innerHeight;

  for (const p of petals){
    p.wobble += p.wobbleSpeed;
    p.x += p.driftX + Math.sin(p.wobble) * 0.4;
    p.y += p.speedY;
    p.rot += p.rotSpeed;

    drawPetal(p);

    if (p.y > h + 40){
      // respawn
      p.x = rand(0, w);
      p.y = rand(-120, -20);
      p.speedY = rand(0.9, 2.4);
      p.driftX = rand(-0.8, 0.8);
      p.rotSpeed = rand(-0.04, 0.04);
      p.alpha = rand(0.35, 0.75);
    }
  }

  requestAnimationFrame(animatePetals);
}
animatePetals();

function burstPetals(){
  // add extra petals temporarily for celebration bursts
  for (let i = 0; i < BURST_EXTRA; i++){
    const p = createPetal(false);
    p.y = rand(window.innerHeight * 0.1, window.innerHeight * 0.55);
    p.speedY = rand(2.2, 4.8);
    p.driftX = rand(-1.6, 1.6);
    p.r = rand(7, 16);
    petals.push(p);
  }

  setTimeout(() => {
    // trim back to base count
    petals.splice(PETAL_COUNT, petals.length - PETAL_COUNT);
  }, 1200);
}

/* ---------------- END FLOWERS ENGINE ---------------- */


/* ===== LOGIN ===== */
togglePassBtn?.addEventListener("click", () => {
  const isHidden = passInput.type === "password";
  passInput.type = isHidden ? "text" : "password";
  togglePassBtn.textContent = isHidden ? "Hide" : "Show";
});

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  loginError.textContent = "";

  const u = (userInput.value || "").trim();
  const p = (passInput.value || "");

  if (u === AUTH.username && p === AUTH.password) {
    burstPetals();
    showScreen("congrats");
  } else {
    loginError.textContent = "Wrong credentials. Try again 💗";
  }
});

toLoveQuestionBtn?.addEventListener("click", () => {
  burstPetals();
  showScreen("loveQ");
});

/* ===== RUNAWAY NO ===== */
function makeRunaway(btn, area){
  if (!btn || !area) return;

  const move = () => {
    const rect = area.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    const padding = 8;

    const maxX = rect.width - b.width - padding;
    const maxY = rect.height - b.height - padding;

    const x = padding + Math.random() * Math.max(1, maxX);
    const y = padding + Math.random() * Math.max(1, maxY);

    btn.style.position = "absolute";
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
  };

  btn.addEventListener("mouseenter", move);
  btn.addEventListener("mousemove", move);
  btn.addEventListener("touchstart", (e) => { e.preventDefault(); move(); }, { passive: false });
  btn.addEventListener("click", (e) => { e.preventDefault(); move(); });

  setTimeout(move, 50);
}
makeRunaway(loveNoBtn, loveChoiceArea);

/* ===== AUTOPLAY SLIDESHOW ===== */
let autoIndex = 0;
let autoTimer = null;

function hideExplore(){
  if (exploreCta) exploreCta.hidden = true;
}

function showExplore(){
  if (exploreCta) exploreCta.hidden = false;
}

function setCaption(i){
  const m = MOMENTS[i] || { title: `Moment ${i + 1}`, desc: "" };
  if (momentTitle) momentTitle.textContent = m.title;
  if (momentDesc) momentDesc.textContent = m.desc;
  if (slideCountText) slideCountText.textContent = `${i + 1} / ${slides.length}`;
}

function showSlide(i){
  slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
  setCaption(i);

  if (progressBar) {
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    void progressBar.offsetWidth;
    progressBar.style.transition = `width ${SLIDE_MS}ms linear`;
    progressBar.style.width = "100%";
  }
}

function stopAuto(){
  if (autoTimer) clearTimeout(autoTimer);
  autoTimer = null;
}

function startAutoFromBeginning(){
  if (!slides.length) return;

  stopAuto();
  hideExplore();

  autoIndex = 0;
  showSlide(autoIndex);

  autoTimer = setTimeout(nextAuto, SLIDE_MS);
}

function nextAuto(){
  if (autoIndex >= slides.length - 1) {
    stopAuto();
    showExplore();      // show button only after finishing
    burstPetals();      // celebration burst when button appears
    return;
  }

  autoIndex += 1;
  showSlide(autoIndex);

  autoTimer = setTimeout(nextAuto, SLIDE_MS);
}

loveYesBtn?.addEventListener("click", () => {
  burstPetals();
  showScreen("gallery");
  startAutoFromBeginning();
});

replaySlideshowBtn?.addEventListener("click", () => {
  burstPetals();
  startAutoFromBeginning();
});

logoutBtn?.addEventListener("click", () => {
  stopAuto();
  showScreen("login");
});

/* ===== FINAL PAGE ===== */
let typingTimer = null;

function startTyping(){
  if (!typedMessageEl) return;
  if (typingTimer) clearInterval(typingTimer);

  typedMessageEl.textContent = "";
  const text = FINAL.message;
  let i = 0;

  typingTimer = setInterval(() => {
    typedMessageEl.textContent += text.charAt(i);
    i += 1;
    if (i >= text.length) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }, 26);
}

function goFinal(){
  if (finalTitle) finalTitle.textContent = FINAL.title;
  if (finalSub) finalSub.textContent = FINAL.sub;
  if (signatureEl) signatureEl.textContent = FINAL.signature;

  burstPetals();
  showScreen("final");
  startTyping();
}

exploreMoreBtn?.addEventListener("click", () => {
  burstPetals();
  goFinal();
});

typeAgainBtn?.addEventListener("click", () => {
  burstPetals();
  startTyping();
});

backToGalleryBtn?.addEventListener("click", () => {
  burstPetals();
  showScreen("gallery");
  startAutoFromBeginning();
});


// ===== Background Music Control =====
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicOn = false;

function updateMusicUI(){
  if (!musicBtn) return;
  musicBtn.setAttribute("aria-pressed", musicOn ? "true" : "false");
  const label = musicBtn.querySelector(".label");
  if (label) label.textContent = musicOn ? "Music On" : "Music";
}

// Try to start music after any user interaction (required by browsers)
async function startMusic(){
  if (!bgMusic) return;
  try{
    await bgMusic.play();
    musicOn = true;
    updateMusicUI();
  }catch(_){}
}

function stopMusic(){
  if (!bgMusic) return;
  bgMusic.pause();
  musicOn = false;
  updateMusicUI();
}

musicBtn?.addEventListener("click", async () => {
  if (!bgMusic) return;

  if (!musicOn) {
    await startMusic();
  } else {
    stopMusic();
  }
});

// Auto-start music on first click/tap anywhere (once)
function firstInteraction(){
  startMusic();
  window.removeEventListener("pointerdown", firstInteraction);
  window.removeEventListener("keydown", firstInteraction);
}
window.addEventListener("pointerdown", firstInteraction);
window.addEventListener("keydown", firstInteraction);

updateMusicUI();

/* ===== INIT ===== */
showScreen("login");