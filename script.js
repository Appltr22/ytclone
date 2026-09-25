// ---------- better click sounds (filtered noise + tone, not chiptune) ----------
let audioCtx, noiseBuffer;
function getCtx(){
  audioCtx = audioCtx || new (window.AudioContext || window['webkitAudioContext'])();
  if(!noiseBuffer){
    const len = audioCtx.sampleRate * 0.12;
    noiseBuffer = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
    const d = noiseBuffer.getChannelData(0);
    for(let i=0;i<len;i++) d[i] = (Math.random()*2-1) * Math.pow(1-i/len, 2);
  }
  return audioCtx;
}
function playClick(kind='tap'){
  try{
    const ctx = getCtx();
    const t0 = ctx.currentTime;
    const cfg = {
      tap:      {f:2600, g:0.11, tone:1200, dur:.05},
      positive: {f:3400, g:0.13, tone:1800, dur:.07},
      negative: {f:1400, g:0.11, tone:500,  dur:.06},
      remove:   {f:1000, g:0.09, tone:400,  dur:.05},
      save:     {f:3000, g:0.14, tone:2000, dur:.08},
    }[kind] || {f:2600,g:0.11,tone:1200,dur:.05};

    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    const bp = ctx.createBiquadFilter();
    bp.type='bandpass'; bp.frequency.value = cfg.f; bp.Q.value = 1.1;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(cfg.g, t0);
    ng.gain.exponentialRampToValueAtTime(0.0001, t0 + cfg.dur);
    src.connect(bp); bp.connect(ng); ng.connect(ctx.destination);
    src.start(t0); src.stop(t0 + cfg.dur + 0.02);

    const osc = ctx.createOscillator();
    osc.type='sine'; osc.frequency.setValueAtTime(cfg.tone, t0);
    osc.frequency.exponentialRampToValueAtTime(cfg.tone*0.7, t0+cfg.dur);
    const og = ctx.createGain();
    og.gain.setValueAtTime(cfg.g*0.5, t0);
    og.gain.exponentialRampToValueAtTime(0.0001, t0+cfg.dur*0.9);
    osc.connect(og); og.connect(ctx.destination);
    osc.start(t0); osc.stop(t0+cfg.dur+0.02);
  }catch(e){}
}

// ---------- floating background particles (always animating) ----------
(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w,h,particles=[], tPrev=performance.now();
  function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
  function init(){
    resize();
    const count = Math.min(55, Math.floor((w*h)/30000));
    particles = Array.from({length:count}, () => ({
      x:Math.random()*w, y:Math.random()*h,
      r:Math.random()*3.4+1.4,
      vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.6,
      a:Math.random()*0.35+0.1,
      wob:Math.random()*Math.PI*2
    }));
  }
  function tick(now){
    const dt = Math.min(32, now-tPrev); tPrev = now;
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.wob += 0.01;
      p.x += p.vx * (dt/16) + Math.sin(p.wob)*0.15;
      p.y += p.vy * (dt/16) + Math.cos(p.wob)*0.15;
      if(p.x<-15)p.x=w+15; if(p.x>w+15)p.x=-15;
      if(p.y<-15)p.y=h+15; if(p.y>h+15)p.y=-15;
      const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
      grad.addColorStop(0, `rgba(255,0,51,${p.a})`);
      grad.addColorStop(1, 'rgba(255,0,51,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', init);
  init(); requestAnimationFrame(tick);
})();

// ---------- custom SVG genre icons ----------
const ICONS = {
  gaming: '<svg class="icon" viewBox="0 0 24 24"><path d="M7 9h10a4 4 0 0 1 4 4.2c0 2-1.2 3.3-2.6 3.3-1 0-1.5-.5-2.4-1.5-.7-.8-1.2-1-2-1s-1.3.2-2 1c-.9 1-1.4 1.5-2.4 1.5C6.2 16.5 5 15.2 5 13.2A4 4 0 0 1 7 9z"/><path d="M8.5 11.5v2M7.5 12.5h2"/><circle cx="16" cy="11.7" r=".6" fill="currentColor" stroke="none"/><circle cx="17.6" cy="13.3" r=".6" fill="currentColor" stroke="none"/></svg>',
  music: '<svg class="icon" viewBox="0 0 24 24"><path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
  tech: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>',
  cooking: '<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="13" r="6"/><path d="M17 13h4M9 8l-1.5-2M13 8l1.5-2"/></svg>',
  comedy: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M9 10.2h.01M15 10.2h.01M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8"/></svg>',
  travel: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 13l8-2 6-8 2 1-4 8 4 1-2 2-4-1-3 5-2-1 1-4-6-1z"/></svg>'
};
const LABELS = {gaming:'Gaming',music:'Music',tech:'Tech Review',cooking:'Cooking',comedy:'Comedy Skits',travel:'Travel Vlog'};

// ---------- per-genre thumbnail design (gradient + watermark icon) ----------
const GENRE_STYLE = {
  gaming:  {grad:'linear-gradient(135deg,#2B0512,#FF0033)'},
  music:   {grad:'linear-gradient(135deg,#3A0018,#FF3D63)'},
  tech:    {grad:'linear-gradient(135deg,#180A10,#C2002E)'},
  cooking: {grad:'linear-gradient(135deg,#420011,#FF5C74)'},
  comedy:  {grad:'linear-gradient(135deg,#330A14,#FF0033)'},
  travel:  {grad:'linear-gradient(135deg,#1A0210,#E2002C)'},
};
function thumbInner(v){
  return `<div class="thumb-icon">${ICONS[v.genre]}</div>`;
}

const VIDEOS = [
  {genre:'gaming',title:'Speedrunning the Impossible Level',ch:'PixelDash',desc:'A frame-perfect run through the level everyone rage-quit on, explained shot by shot.'},
  {genre:'gaming',title:'Low-Stakes Farming Sim, Episode 12',ch:'Quiet Fields',desc:'No boss fights, no timers — just crops, chickens, and a soundtrack made for winding down.'},
  {genre:'gaming',title:'Optimal Build Order, Explained',ch:'PixelDash',desc:'The exact opening sequence top players use, broken down move by move.'},
  {genre:'gaming',title:'The Bug That Broke a Launch Day',ch:'Patch Notes',desc:'How one overlooked edge case took down servers for six hours, and what fixed it.'},
  {genre:'gaming',title:'Replaying My First PC Game',ch:'Quiet Fields',desc:'Booting up a 2003 install disc to see if the game holds up twenty years later.'},

  {genre:'music',title:'Remaking a 2000s Beat From Scratch',ch:'Loop & Layer',desc:'Rebuilding a decade-old sample-based beat using only gear that existed back then.'},
  {genre:'music',title:'90-Minute Lo-fi for Deep Work',ch:'Loop & Layer',desc:'One continuous mix designed around a steady tempo, made to disappear into the background.'},
  {genre:'music',title:'Building a Drop From One Kick Drum',ch:'Loop & Layer',desc:'Layering a single drum sample into a full festival-ready drop, step by step.'},
  {genre:'music',title:'Recording an Acoustic Set on a Rooftop',ch:'Rooftop Sessions',desc:'Four songs, one mic, and whatever the wind decided to add that evening.'},
  {genre:'music',title:'What Makes a Chord Feel Sad?',ch:'Loop & Layer',desc:'The music theory behind why minor chords read as melancholy, tested with examples.'},

  {genre:'tech',title:'Why This Chip Design Took 6 Years',ch:'Bench Notes',desc:'The engineering trade-offs behind a chip architecture, explained without the marketing slides.'},
  {genre:'tech',title:'Building a Keyboard From Bare Parts',ch:'Bench Notes',desc:'Soldering, firmware, and the fifteen small decisions that make a keyboard feel right.'},
  {genre:'tech',title:'Overclocking Until Something Breaks',ch:'Bench Notes',desc:'Pushing a budget chip past its rated limits to see where the wall actually is.'},
  {genre:'tech',title:'A Quiet Tour of a Minimal Desk Setup',ch:'Bench Notes',desc:'No RGB, no clutter — just the reasoning behind every item on the desk.'},
  {genre:'tech',title:'Turning On a Laptop From 2009',ch:'Bench Notes',desc:'Booting old hardware to see what it can still do, and what it never could.'},

  {genre:'cooking',title:'One Pan, Twenty Minutes, No Recipe',ch:'Loose Measurements',desc:'Cooking by instinct with whatever is in the fridge — a format for nights you can\'t plan ahead.'},
  {genre:'cooking',title:'The Physics of a Perfect Sear',ch:'Loose Measurements',desc:'What actually happens to a steak at 400°F, and why most home stoves can\'t get there.'},
  {genre:'cooking',title:'Knife Skills, Taught Properly',ch:'Loose Measurements',desc:'The four cuts worth practicing until they\'re automatic, and why they matter.'},
  {genre:'cooking',title:'Cooking Against a 10-Minute Clock',ch:'Loose Measurements',desc:'A full dinner, timed, with every mistake left in.'},
  {genre:'cooking',title:'Rebuilding My Grandmother\'s Recipe',ch:'Loose Measurements',desc:'Reconstructing a dish from memory alone, with no written recipe to check against.'},

  {genre:'comedy',title:'Airport Announcements, Ranked',ch:'Deadpan Weekly',desc:'A ranking of the strangest things airports have said over a loudspeaker, reenacted badly.'},
  {genre:'comedy',title:'Reviewing My Old School Projects',ch:'Deadpan Weekly',desc:'Reading a decade-old essay out loud and grading it against a standard nobody asked for.'},
  {genre:'comedy',title:'Narrating My Cat\'s Entire Day',ch:'Deadpan Weekly',desc:'A slow, overly serious documentary voice applied to eleven hours of a cat doing nothing.'},
  {genre:'comedy',title:'Why Is This Joke Structure Everywhere?',ch:'Deadpan Weekly',desc:'Breaking down the setup-twist pattern that shows up in almost every stand-up special.'},
  {genre:'comedy',title:'Writing a Joke From Zero to Stage',ch:'Deadpan Weekly',desc:'The full editing process behind one joke, from a rough idea to a tested punchline.'},

  {genre:'travel',title:'The Town With No Roads In',ch:'Slow Passage',desc:'A three-day visit to a settlement reachable only by boat or a six-hour hike.'},
  {genre:'travel',title:'Retracing a Trip From 1998',ch:'Slow Passage',desc:'Following a faded map and an old photo album to see what actually changed.'},
  {genre:'travel',title:'A Slow Train, No Itinerary',ch:'Slow Passage',desc:'Twelve hours on a regional train with nowhere to be and nothing planned.'},
  {genre:'travel',title:'48 Hours, Four Cities',ch:'Slow Passage',desc:'A tightly timed sprint through four cities to see how much actually fits in two days.'},
  {genre:'travel',title:'Planning a Trip Using Only Local Advice',ch:'Slow Passage',desc:'No guidebooks — every stop chosen from a conversation with someone who lives there.'},
];

function pick(genre){
  const pool = VIDEOS.filter(v => v.genre===genre);
  return pool[Math.floor(Math.random()*pool.length)];
}


// ---------- sidebar categories + custom dropdown share the same genre state ----------
let currentGenre = 'gaming';
const catList = document.getElementById('catList');
const ddToggle = document.getElementById('ddToggle');
const ddMenu = document.getElementById('ddMenu');
const ddLabel = document.getElementById('ddLabel');
const ddIcon = document.getElementById('ddIcon');

catList.innerHTML = Object.keys(ICONS).map(g => `<li><button data-genre="${g}">${ICONS[g]}${LABELS[g]}</button></li>`).join('');
ddMenu.innerHTML = Object.keys(ICONS).map(g => `<button class="dd-opt" data-genre="${g}">${ICONS[g]}${LABELS[g]}</button>`).join('');

function syncGenreUI(){
  ddLabel.textContent = LABELS[currentGenre];
  ddIcon.innerHTML = ICONS[currentGenre];
  document.querySelectorAll('#catList button').forEach(b => b.classList.toggle('active', b.dataset.genre===currentGenre));
  document.querySelectorAll('.dd-opt').forEach(b => b.classList.toggle('sel', b.dataset.genre===currentGenre));
}
function setGenre(g, sound='tap'){
  currentGenre = g; playClick(sound); syncGenreUI();
}

ddToggle.addEventListener('click', () => {
  playClick('tap');
  ddMenu.classList.toggle('open');
  ddToggle.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if(!e.target.closest('.field')){ ddMenu.classList.remove('open'); ddToggle.classList.remove('open'); }
});
ddMenu.addEventListener('click', (e) => {
  const btn = e.target.closest('.dd-opt'); if(!btn) return;
  setGenre(btn.dataset.genre);
  ddMenu.classList.remove('open'); ddToggle.classList.remove('open');
});
catList.addEventListener('click', (e) => {
  const btn = e.target.closest('button'); if(!btn) return;
  setGenre(btn.dataset.genre);
  showResult(pick(currentGenre));
  window.scrollTo({top:0, behavior:'smooth'});
});

// ---------- watch later ----------
let watchLater = [];
const wlList = document.getElementById('wlList');
const wlCount = document.getElementById('wlCount');
function renderWatchLater(){
  wlCount.textContent = watchLater.length;
  if(!watchLater.length){
    wlList.innerHTML = '<p class="wl-empty">Nothing saved yet. Get a recommendation and press "Watch later" to add it here.</p>';
    return;
  }
  wlList.innerHTML = watchLater.map((v,i) => `
    <div class="wl-item" data-i="${i}">
      <div class="swatch" style="background:${GENRE_STYLE[v.genre].grad}"></div>
      <div class="wl-title">${v.title}</div>
      <button class="rm" data-i="${i}" title="Remove">✕</button>
    </div>`).join('');
  wlList.querySelectorAll('.rm').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ e.stopPropagation(); playClick('remove'); watchLater.splice(Number(btn.dataset.i),1); renderWatchLater(); });
  });
  wlList.querySelectorAll('.wl-item').forEach(item=>{
    item.addEventListener('click', ()=>{
      const v = watchLater[Number(item.dataset.i)];
      setGenre(v.genre, 'tap');
      showResult(v);
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });
}

// ---------- recommendation ----------
const findBtn = document.getElementById('findBtn');
const result = document.getElementById('result');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const wlBtn = document.getElementById('wlBtn');
let currentVideo=null, reaction=null, savedThisResult=false;

function showResult(v){
  currentVideo=v; reaction=null; savedThisResult=false;
  likeBtn.classList.remove('on'); dislikeBtn.classList.remove('on');
  wlBtn.classList.remove('on'); wlBtn.textContent='＋ Watch later';
  document.getElementById('rmeta').textContent = `SUGGESTED · ${LABELS[v.genre].toUpperCase()}`;
  document.getElementById('rtitle').textContent = v.title;
  document.getElementById('rdesc').textContent = `${v.ch} — ${v.desc}`;
  const rthumb = document.getElementById('rthumb');
  rthumb.style.background = GENRE_STYLE[v.genre].grad;
  rthumb.innerHTML = thumbInner(v) + '<span class="play">▶</span>';
  result.classList.add('show');
}

findBtn.addEventListener('click', () => { playClick('tap'); showResult(pick(currentGenre)); });

likeBtn.addEventListener('click', () => {
  if(reaction==='like'){ reaction=null; likeBtn.classList.remove('on'); playClick('remove'); }
  else { reaction='like'; likeBtn.classList.add('on'); dislikeBtn.classList.remove('on'); playClick('positive'); }
});
dislikeBtn.addEventListener('click', () => {
  if(reaction==='dislike'){ reaction=null; dislikeBtn.classList.remove('on'); playClick('remove'); }
  else { reaction='dislike'; dislikeBtn.classList.add('on'); likeBtn.classList.remove('on'); playClick('negative'); }
});
wlBtn.addEventListener('click', () => {
  if(!currentVideo) return;
  if(!savedThisResult){
    playClick('save');
    watchLater.push(currentVideo);
    savedThisResult=true; wlBtn.textContent='✓ Saved'; wlBtn.classList.add('on');
  } else {
    playClick('remove');
    const idx = watchLater.findIndex(x=>x.title===currentVideo.title);
    if(idx>-1) watchLater.splice(idx,1);
    savedThisResult=false; wlBtn.textContent='＋ Watch later'; wlBtn.classList.remove('on');
  }
  renderWatchLater();
});

// ---------- trending grid (3 videos, one from a different random genre each) ----------
const trending = document.getElementById('trending');
const genresShuffled = Object.keys(ICONS).sort(() => Math.random()-0.5).slice(0,3);
const sample = genresShuffled.map(g => pick(g));
trending.innerHTML = sample.map((v) => `
  <div class="card" data-title="${v.title}">
    <div class="cthumb">
      <div class="grad" style="position:absolute;inset:0;background:${GENRE_STYLE[v.genre].grad}"></div>
      ${thumbInner(v)}
      <div class="play"><svg width="34" height="34" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.5)"/><path d="M10 8l6 4-6 4V8z" fill="white"/></svg></div>
    </div>
    <div class="cbody"><h3>${v.title}</h3><p>${v.ch}</p></div>
  </div>`).join('');
trending.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    playClick('tap');
    const v = VIDEOS.find(x=>x.title===card.dataset.title);
    setGenre(v.genre, 'tap');
    showResult(v);
    result.scrollIntoView({behavior:'smooth', block:'center'});
  });
});

syncGenreUI();
renderWatchLater();
