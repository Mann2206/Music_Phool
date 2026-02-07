/* ---------------- CLICK SOUND ---------------- */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function clickSound() {
  const osc = audioCtx.createOscillator();
  osc.frequency.value = 600;
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

/* ---------------- SECRET MUSIC ---------------- */
const secretMusic = new Audio(
  "https://cdn.jsdelivr.net/gh/Mann2206/Music_Phool@main/55.%20Odetojoy.mp3"
);
secretMusic.volume = 0.35;
secretMusic.loop = true;

/* ---------------- DATA ---------------- */
const flowers = [...Array(14)].map((_,i)=>`https://i.postimg.cc/${[
"1VsTRgNG","gLm5cw61","JHxFs1b2","RJdYWM7M","cthzvsRZ",
"Cd0LnmG9","Z0mKvV81","LhS6gNkM","Cd4MGkJz","tYSXfbKH",
"BtCZTHNK","VdGYTwxk","R6B9fZHM","CZDSzqdt"
][i]}/flower${i+1}-jpg.jpg`);

const patches = [
  {v:"PATCH v1.1.0",notes:["Added idle-time observation","Reduced background mental lag","Improved attention to small details"],poem:`while (overthinking) {\n  slowDown();\n  notice(flowers);\n}`,teach:"Noticing"},
  {v:"PATCH v1.2.3",notes:["Fixed bug: rushing through moments","Balanced logic with softness","No performance loss detected"],poem:`if (quietMoment) {\n  beauty++;\n}`,teach:"Slowing without loss"},
  {v:"PATCH v1.3.1",notes:["Introduced quiet curiosity","Stability improved in silence","Optional objective: notice more"],poem:`for (let moment of time) {\n  stay();\n}`,teach:"Trust in stillness"},
  {v:"PATCH v1.4.2",notes:["Removed unnecessary urgency","Improved long-form attention","Minor visual delight added"],poem:`try { breathe(); } catch { pause(); }`,teach:"Comfort in taking time"},
  {v:"PATCH v1.5.0",notes:["Major update: perspective shift","System handles pauses better","No rollback needed"],poem:`const peace = true;`,teach:"Acceptance and peace"}
];

const teachings = [
  "Acceptance and peace",
  "Noticing",
  "Trust in stillness",
  "Comfort in taking time",
  "Slowing without loss"
];

let visited = new Set();
let answers = {};

/* ---------------- SCREEN CONTROL ---------------- */
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ---------------- FLOW ---------------- */
function startQuest(){ clickSound(); showScreen("map"); buildGrid(); }
function goHome(){
  clickSound();
  secretMusic.pause();
  secretMusic.currentTime = 0;
  showScreen("start");
}
function goToMap(){ clickSound(); showScreen("map"); }

function buildGrid(){
  const g=document.getElementById("grid"); g.innerHTML="";
  flowers.forEach((f,i)=>{
    const d=document.createElement("div");
    d.className="flower";
    d.style.backgroundImage=`url(${f})`;
    d.onclick=()=>openPatch(i);
    g.appendChild(d);
  });
}

function openPatch(i){
  clickSound();
  const p=patches[i%5];
  visited.add(i%5);

  patchImage.src=flowers[i];
  patchTitle.innerText=p.v;
  patchNotes.innerHTML=p.notes.map(n=>`<li>➜ ${n}</li>`).join("");
  poem.innerText="";
  showScreen("patch");

  if(visited.size>=5){
    setTimeout(()=>{ buildReflection(); showScreen("reflection"); },800);
  }
}

function runUpdate(){
  clickSound();
  typeText("poem",patches[[...visited].pop()].poem);
}

/* ---------------- TYPE EFFECT ---------------- */
function typeText(id,text){
  let i=0, el=document.getElementById(id); el.innerText="";
  const t=setInterval(()=>{
    el.innerText+=text[i++]||"";
    if(i>=text.length) clearInterval(t);
  },30);
}

/* ---------------- REFLECTION ---------------- */
function buildReflection(){
  questions.innerHTML="";
  patches.forEach((p,i)=>{
    questions.innerHTML+=`
    <div>
      <p>${p.v}</p>
      <select onchange="answers[${i}]=this.value">
        <option value="">Select</option>
        ${teachings.map(t=>`<option>${t}</option>`).join("")}
      </select>
    </div>`;
  });
}

function toggleHints(){
  clickSound();
  hintBox.classList.toggle("hidden");
  hintBox.innerHTML=patches.map(p=>`<b>${p.v}</b><br>${p.notes.join("<br>")}`).join("<br><br>");
}

function submitReflection(){
  clickSound();
  let score=0;
  patches.forEach((p,i)=>{ if(answers[i]===p.teach) score++; });
  resultText.innerText=`Correct: ${score}/5`;
  showScreen("result");
}

function unlockSecret(){
  clickSound();
  secretMusic.play();   // 🎵 MUSIC STARTS HERE
  showScreen("secret");
  typeText("secretTerminal",
`> SECRET QUEST UNLOCKED
> initializing quiet mode…

I made this for you, Kushagra.
Not to impress you.
Not to prove anything.

Just to sit beside you
for a moment
without asking for attention.

None of this was casual.
Not the clicks.
Not the pauses.
Not the flowers.

If a day makes you feel unseen,
remember this:
your presence leaves traces.

If trust feels heavy,
or the world moves too fast,
let this be a small place
where breathing slows again.

You were never ordinary.
You were just moving quietly.

— Snehsmati ∞`);
}
