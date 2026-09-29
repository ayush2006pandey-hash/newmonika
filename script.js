const screens = [...document.querySelectorAll(".screen")];
const startBtn = document.getElementById("startBtn");
const countNumber = document.getElementById("countNumber");
const particles = document.getElementById("particles");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let current = 0;
let started = false;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function show(index){
  screens.forEach((s,i)=>s.classList.toggle("active", i===index));
}

function particle(){
  const p = document.createElement("div");
  p.className = "particle";
  p.textContent = Math.random() > .45 ? "♥" : "✦";
  p.style.left = Math.random()*100 + "vw";
  p.style.setProperty("--x", (Math.random()*180-90) + "px");
  p.style.fontSize = (10 + Math.random()*18) + "px";
  p.style.animationDuration = (5 + Math.random()*5) + "s";
  particles.appendChild(p);
  setTimeout(()=>p.remove(),10000);
}
if(!reducedMotion) setInterval(particle,450);

function countdown(){
  let n = 3;
  countNumber.textContent = n;
  show(1);
  const timer = setInterval(()=>{
    n--;
    if(n>0){
      countNumber.textContent = n;
      countNumber.style.animation = "none";
      void countNumber.offsetWidth;
      countNumber.style.animation = "countPop .8s ease";
    }else{
      clearInterval(timer);
      sequence();
    }
  },1000);
}

function sequence(){
  show(2);
  setTimeout(()=>show(3),3800);
  setTimeout(()=>show(4),9000);
  setTimeout(()=>show(5),14500);
}

startBtn.addEventListener("click", ()=>{
  if(started) return;
  started = true;
  countdown();
  bgMusic.play().catch(()=>{});
});

document.getElementById("replayBtn").addEventListener("click", ()=>{
  started = false;
  show(0);
});

musicBtn.hidden = !bgMusic.querySelector("source");
musicBtn.addEventListener("click", ()=>{
  if(bgMusic.paused){
    bgMusic.play().catch(()=>{});
    musicBtn.textContent = "♫";
  }else{
    bgMusic.pause();
    musicBtn.textContent = "🔇";
  }
});
