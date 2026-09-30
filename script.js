// ---------- Better Click Sounds ----------
// Provides different sound effects for user interactions such as
// selecting categories, saving recommendations, and liking/disliking videos.
let audioCtx, noiseBuffer;

function getCtx(){
  audioCtx = audioCtx || new (window.AudioContext || window['webkitAudioContext'])();

  // Create the reusable noise buffer only once to improve performance.
  if(!noiseBuffer){
    const len = audioCtx.sampleRate * 0.12;
    noiseBuffer = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
    const d = noiseBuffer.getChannelData(0);

    for(let i=0;i<len;i++)
      d[i] = (Math.random()*2-1) * Math.pow(1-i/len, 2);
  }

  return audioCtx;
}

function playClick(kind='tap'){
  try{
    const ctx = getCtx();
    const t0 = ctx.currentTime;

    // Different sound settings are selected based on the interaction type.
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
    bp.type='bandpass';
    bp.frequency.value = cfg.f;
    bp.Q.value = 1.1;

    const ng = ctx.createGain();
    ng.gain.setValueAtTime(cfg.g, t0);
    ng.gain.exponentialRampToValueAtTime(0.0001, t0 + cfg.dur);

    src.connect(bp);
    bp.connect(ng);
    ng.connect(ctx.destination);

    src.start(t0);
    src.stop(t0 + cfg.dur + 0.02);

    const osc = ctx.createOscillator();
    osc.type='sine';
    osc.frequency.setValueAtTime(cfg.tone, t0);
    osc.frequency.exponentialRampToValueAtTime(cfg.tone*0.7, t0+cfg.dur);

    const og = ctx.createGain();
    og.gain.setValueAtTime(cfg.g*0.5, t0);
    og.gain.exponentialRampToValueAtTime(0.0001, t0+cfg.dur*0.9);

    osc.connect(og);
    og.connect(ctx.destination);

    osc.start(t0);
    osc.stop(t0+cfg.dur+0.02);

  }catch(e){
    // Ignore audio errors so that sound problems do not stop
    // the main recommendation application from working.
  }
}


// ---------- Background Floating Red Circles (Canvas Particles) ----------
// Adds animated visual effects to improve the user experience
// and make the YouTube-inspired interface more interactive.
(function(){

  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  let w,h,particles=[], tPrev=performance.now();

  function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
  }

  // Initialize particles with random positions, size, movement,
  // opacity, and animation values.
  function init(){
    resize();

    const count = Math.min(55, Math.floor((w*h)/30000));

    particles = Array.from({length:count}, () => ({
      x:Math.random()*w,
      y:Math.random()*h,
      r:Math.random()*3.4+1.4,
      vx:(Math.random()-0.5)*0.6,
      vy:(Math.random()-0.5)*0.6,
      a:Math.random()*0.35+0.1,
      wob:Math.random()*Math.PI*2
    }));
  }

  // Animation loop: update particle positions and draw
  // glowing red circles on the canvas.
  function tick(now){
    const dt = Math.min(32, now-tPrev);
    tPrev = now;

    ctx.clearRect(0,0,w,h);

    particles.forEach(p=>{
      p.wob += 0.01;

      p.x += p.vx * (dt/16) + Math.sin(p.wob)*0.15;
      p.y += p.vy * (dt/16) + Math.cos(p.wob)*0.15;

      // Wrap particles around the screen when they move outside it.
      if(p.x<-15)p.x=w+15;
      if(p.x>w+15)p.x=-15;
      if(p.y<-15)p.y=h+15;
      if(p.y>h+15)p.y=-15;

      // Draw a red radial gradient around each particle.
      const grad = ctx.createRadialGradient(
        p.x,p.y,0,
        p.x,p.y,p.r*6
      );

      grad.addColorStop(0, `rgba(255,0,51,${p.a})`);
      grad.addColorStop(1, 'rgba(255,0,51,0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
      ctx.fill();
    });

    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', init);

  init();
  requestAnimationFrame(tick);
})();


// ---------- Custom SVG Genre Icons ----------
// Stores reusable SVG icons for each available video category.
// These icons are inserted into the interface using JavaScript.
const ICONS = {
  gaming: '<svg class="icon" viewBox="0 0 24 24"><path d="M7 9h10a4 4 0 0 1 4 4.2c0 2-1.2 3.3-2.6 3.3-1 0-1.5-.5-2.4-1.5-.7-.8-1.2-1-2-1s-1.3.2-2 1c-.9 1-1.4 1.5-2.4 1.5C6.2 16.5 5 15.2 5 13.2A4 4 0 0 1 7 9z"/><path d="M8.5 11.5v2M7.5 12.5h2"/><circle cx="16" cy="11.7" r=".6" fill="currentColor" stroke="none"/><circle cx="17.6" cy="13.3" r=".6" fill="currentColor" stroke="none"/></svg>',

  music: '<svg class="icon" viewBox="0 0 24 24"><path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',

  tech: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>',

  cooking: '<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="13" r="6"/><path d="M17 13h4M9 8l-1.5-2M13 8l1.5-2"/></svg>',

  comedy: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M9 10.2h.01M15 10.2h.01M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8"/></svg>',

  travel: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 13l8-2 6-8 2 1-4 8 4 1-2 2-4-1-3 5-2-1 1-4-6-1z"/></svg>'
};


// Stores the user-friendly names displayed in the interface.
const LABELS = {
  gaming:'Gaming',
  music:'Music',
  tech:'Tech Review',
  cooking:'Cooking',
  comedy:'Comedy Skits',
  travel:'Travel Vlog'
};


// ---------- Per-Genre Thumbnail Design ----------
// Defines a different visual gradient for each video category.
// This improves the visual distinction between recommendations.
const GENRE_STYLE = {
  gaming:  {grad:'linear-gradient(135deg,#2B0512,#FF0033)'},
  music:   {grad:'linear-gradient(135deg,#3A0018,#FF3D63)'},
  tech:    {grad:'linear-gradient(135deg,#180A10,#C2002E)'},
  cooking: {grad:'linear-gradient(135deg,#420011,#FF5C74)'},
  comedy:  {grad:'linear-gradient(135deg,#330A14,#FF0033)'},
  travel:  {grad:'linear-gradient(135deg,#1A0210,#E2002C)'},
};


// Creates the visual content used inside recommendation thumbnails.
function thumbInner(v){
  return `<div class="thumb-icon">${ICONS[v.genre]}</div>`;
}


// ---------- Recommendation Data ----------
// Stores multiple video recommendations for each category.
// This allows the program to provide different results from
// the same category instead of displaying one fixed result.
//
// This data acts as the program's recommendation dataset.
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


// ---------- Recommendation Selection Logic ----------
// Filters the recommendation dataset based on the user's
// selected category, then randomly selects one result.
//
// This is the main recommendation logic of the application.
// It demonstrates data filtering, arrays, and random selection.
function pick(genre){

  // Filter the videos so only videos from the selected
  // YouTube category are available for recommendation.
  const pool = VIDEOS.filter(v => v.genre===genre);

  // Select one recommendation randomly from the filtered list.
  return pool[Math.floor(Math.random()*pool.length)];
}


// ---------- Category Selection and Input Handling ----------
// The selected category is stored in currentGenre.
// Both the sidebar and dropdown use the same value so that
// the interface remains synchronized.
let currentGenre = 'gaming';

const catList = document.getElementById('catList');
const ddToggle = document.getElementById('ddToggle');
const ddMenu = document.getElementById('ddMenu');
const ddLabel = document.getElementById('ddLabel');
const ddIcon = document.getElementById('ddIcon');


// Dynamically create the category buttons from the ICONS data.
// This avoids manually repeating the same HTML for every category.
catList.innerHTML = Object.keys(ICONS)
  .map(g => `<li><button data-genre="${g}">${ICONS[g]}${LABELS[g]}</button></li>`)
  .join('');

ddMenu.innerHTML = Object.keys(ICONS)
  .map(g => `<button class="dd-opt" data-genre="${g}">${ICONS[g]}${LABELS[g]}</button>`)
  .join('');


// Updates all category-related UI elements when the selected
// category changes.
function syncGenreUI(){

  ddLabel.textContent = LABELS[currentGenre];
  ddIcon.innerHTML = ICONS[currentGenre];

  // Add or remove the active class depending on which category
  // matches the current selection.
  document.querySelectorAll('#catList button').forEach(b =>
    b.classList.toggle('active', b.dataset.genre===currentGenre)
  );

  document.querySelectorAll('.dd-opt').forEach(b =>
    b.classList.toggle('sel', b.dataset.genre===currentGenre)
  );
}


// Changes the selected category and updates the interface.
function setGenre(g, sound='tap'){
  currentGenre = g;
  playClick(sound);
  syncGenreUI();
}


// ---------- Dropdown Interaction ----------
// Opens and closes the custom category dropdown.
ddToggle.addEventListener('click', () => {
  playClick('tap');
  ddMenu.classList.toggle('open');
  ddToggle.classList.toggle('open');
});


// Close the dropdown when the user clicks outside it.
document.addEventListener('click', (e) => {
  if(!e.target.closest('.field')){
    ddMenu.classList.remove('open');
    ddToggle.classList.remove('open');
  }
});


// Handle category selection from the dropdown.
ddMenu.addEventListener('click', (e) => {

  const btn = e.target.closest('.dd-opt');

  // Input validation: stop if the clicked element
  // is not a valid category option.
  if(!btn) return;

  setGenre(btn.dataset.genre);

  ddMenu.classList.remove('open');
  ddToggle.classList.remove('open');
});


// Handle category selection from the sidebar.
catList.addEventListener('click', (e) => {

  const btn = e.target.closest('button');

  // Ignore clicks that are not category buttons.
  if(!btn) return;

  // Store the user's selected category.
  setGenre(btn.dataset.genre);

  // Immediately display a recommendation for the selected category.
  showResult(pick(currentGenre));

  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
});


// ---------- Watch Later Feature ----------
// Stores videos saved by the user so they can be viewed again
// during the current session.
let watchLater = [];

const wlList = document.getElementById('wlList');
const wlCount = document.getElementById('wlCount');


// Updates the Watch Later section whenever the saved video list changes.
function renderWatchLater(){

  wlCount.textContent = watchLater.length;

  // Conditional logic:
  // If there are no saved videos, display an empty-state message.
  if(!watchLater.length){

    wlList.innerHTML =
      '<p class="wl-empty">Nothing saved yet. Get a recommendation and press "Watch later" to add it here.</p>';

    return;
  }


  // If saved videos exist, generate a list of saved recommendations.
  wlList.innerHTML = watchLater.map((v,i) => `
    <div class="wl-item" data-i="${i}">
      <div class="swatch" style="background:${GENRE_STYLE[v.genre].grad}"></div>
      <div class="wl-title">${v.title}</div>
      <button class="rm" data-i="${i}" title="Remove">✕</button>
    </div>
  `).join('');


  // Add remove functionality to each saved recommendation.
  wlList.querySelectorAll('.rm').forEach(btn=>{

    btn.addEventListener('click', (e)=>{

      e.stopPropagation();

      playClick('remove');

      // Convert the data attribute to a number and remove
      // that video from the saved list.
      watchLater.splice(Number(btn.dataset.i),1);

      renderWatchLater();
    });
  });


  // Allow users to click a saved video and display it again.
  wlList.querySelectorAll('.wl-item').forEach(item=>{

    item.addEventListener('click', ()=>{

      const v = watchLater[Number(item.dataset.i)];

      setGenre(v.genre, 'tap');
      showResult(v);

      window.scrollTo({
        top:0,
        behavior:'smooth'
      });
    });
  });
}


// ---------- Main Recommendation Feature ----------
// These elements control the main recommendation interface.
const findBtn = document.getElementById('findBtn');
const result = document.getElementById('result');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const wlBtn = document.getElementById('wlBtn');


// Store the current recommendation and user interaction state.
let currentVideo=null;
let reaction=null;
let savedThisResult=false;


// ---------- Display Recommendation ----------
// Updates the recommendation card using the selected video data.
//
// This connects the program's processing logic to its output:
// user category -> recommendation selection -> DOM display.
function showResult(v){

  currentVideo=v;
  reaction=null;
  savedThisResult=false;

  likeBtn.classList.remove('on');
  dislikeBtn.classList.remove('on');

  wlBtn.classList.remove('on');
  wlBtn.textContent='＋ Watch later';


  // Update the recommendation information displayed to the user.
  document.getElementById('rmeta').textContent =
    `SUGGESTED · ${LABELS[v.genre].toUpperCase()}`;

  document.getElementById('rtitle').textContent = v.title;

  document.getElementById('rdesc').textContent =
    `${v.ch} — ${v.desc}`;


  // Change the recommendation thumbnail based on the video's category.
  const rthumb = document.getElementById('rthumb');

  rthumb.style.background = GENRE_STYLE[v.genre].grad;

  rthumb.innerHTML =
    thumbInner(v) + '<span class="play">▶</span>';


  // Reveal the result card using the CSS animation.
  result.classList.add('show');
}


// ---------- Recommendation Button ----------
// When the user clicks Find/Recommend, the program:
// 1. Reads the current category.
// 2. Selects a recommendation using pick().
// 3. Displays the result using showResult().
findBtn.addEventListener('click', () => {

  playClick('tap');

  // Generate a random recommendation based on
  // the currently selected YouTube category.
  showResult(pick(currentGenre));
});


// ---------- Like / Dislike Logic ----------
// Uses conditional statements to determine whether the user
// is adding or removing a reaction.
likeBtn.addEventListener('click', () => {

  // IF the video is already liked, remove the like.
  if(reaction==='like'){

    reaction=null;
    likeBtn.classList.remove('on');
    playClick('remove');

  // ELSE add the like and remove any dislike.
  } else {

    reaction='like';
    likeBtn.classList.add('on');
    dislikeBtn.classList.remove('on');
    playClick('positive');
  }
});


dislikeBtn.addEventListener('click', () => {

  // IF the video is already disliked, remove the dislike.
  if(reaction==='dislike'){

    reaction=null;
    dislikeBtn.classList.remove('on');
    playClick('remove');

  // ELSE add the dislike and remove any like.
  } else {

    reaction='dislike';
    dislikeBtn.classList.add('on');
    likeBtn.classList.remove('on');
    playClick('negative');
  }
});


// ---------- Watch Later Save / Remove Logic ----------
// Uses conditional logic to either save the current recommendation
// or remove it from the Watch Later list.
wlBtn.addEventListener('click', () => {

  // Validation: do nothing if there is no current recommendation.
  if(!currentVideo) return;


  // IF the current recommendation has not been saved,
  // add it to the Watch Later list.
  if(!savedThisResult){

    playClick('save');

    watchLater.push(currentVideo);

    savedThisResult=true;
    wlBtn.textContent='✓ Saved';
    wlBtn.classList.add('on');


  // ELSE remove the current recommendation from Watch Later.
  } else {

    playClick('remove');

    const idx = watchLater.findIndex(
      x=>x.title===currentVideo.title
    );

    if(idx>-1)
      watchLater.splice(idx,1);

    savedThisResult=false;
    wlBtn.textContent='＋ Watch later';
    wlBtn.classList.remove('on');
  }

  // Refresh the Watch Later display after the change.
  renderWatchLater();
});


// ---------- Trending Recommendations ----------
// Creates three random recommendations from different categories.
// This provides additional content for the user to explore.
const trending = document.getElementById('trending');


// Randomize the available categories and select three of them.
const genresShuffled = Object.keys(ICONS)
  .sort(() => Math.random()-0.5)
  .slice(0,3);


// Generate one recommendation from each selected category.
const sample = genresShuffled.map(g => pick(g));


// Display the trending recommendations on the page.
trending.innerHTML = sample.map((v) => `
  <div class="card" data-title="${v.title}">

    <div class="cthumb">

      <div
        class="grad"
        style="position:absolute;inset:0;background:${GENRE_STYLE[v.genre].grad}">
      </div>

      ${thumbInner(v)}

      <div class="play">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
          <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.5)"/>
          <path d="M10 8l6 4-6 4V8z" fill="white"/>
        </svg>
      </div>

    </div>

    <div class="cbody">
      <h3>${v.title}</h3>
      <p>${v.ch}</p>
    </div>

  </div>
`).join('');


// ---------- Trending Card Interaction ----------
// Clicking a trending video changes the current category
// and displays that recommendation.
trending.querySelectorAll('.card').forEach(card => {

  card.addEventListener('click', () => {

    playClick('tap');

    // Find the video that matches the clicked card.
    const v = VIDEOS.find(
      x=>x.title===card.dataset.title
    );

    // Update the selected category and recommendation.
    setGenre(v.genre, 'tap');
    showResult(v);

    // Scroll the recommendation into view.
    result.scrollIntoView({
      behavior:'smooth',
      block:'center'
    });
  });
});


// ---------- Initial Application Setup ----------
// Synchronize the category interface and render the
// initial Watch Later state when the application loads.
syncGenreUI();
renderWatchLater();


// ---------- Interactive Spotlight Effect ----------
// Creates a cursor-following glow effect on important cards.
// This is a visual enhancement for the user experience.
document.addEventListener('mousemove', (e) => {

  const target = e.target.closest(
    '.card, .picker, .result-card'
  );

  // Only apply the effect when the cursor is over a supported element.
  if (!target) return;

  const rect = target.getBoundingClientRect();

  target.style.setProperty(
    '--x',
    `${e.clientX - rect.left}px`
  );

  target.style.setProperty(
    '--y',
    `${e.clientY - rect.top}px`
  );
});