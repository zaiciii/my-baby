const scrapbook=[
{e:"📞",t:"On our calls",n:"Time moves differently when I’m talking to you my love and an hour somehow feels like five minutes."},
{e:"🫶",t:"Your little ways",n:"The tiny habits you don’t even notice are the ones I notice most, and love most."},
{e:"🌅",t:"Someday soon",n:"A real hug, a real walk, a real goodnight. I wanna do these these things to u baby."}
];
const chapters=[
{tag:"Chapter 1 · Our First Meet mwehehe",title:"The sweetest plot twist",emoji:"🌷✨",body:"Out of all the people in this big world baby, somehow our paths found each other, and honestly baby, I’m so glad they did.\n\nYou became one of my favorite parts of life, my unexpected, beautiful plot twist mwehehe."},
{tag:"Chapter 2 · Miles & heartbeats",title:"Iloveyouuu Baby",emoji:"🌙💗",body:"I wish I could turn every call into a hug and every goodnight into a kiss on your forehead my love. For now I keep you close in little ways: your messages, your voice, and all the stories you have.\n\nThe distance is real, but so is the love to u mwhehehe."},
{tag:"Chapter 3 · Our scrapbook",title:"Little moments with you baby ko",emoji:"📖🫶",body:"Tap each card to open a little memory I keep close."},
{tag:"Chapter 4 · A tiny treasure hunt",title:"Baby, Find the three hidden hearts hehe",emoji:"💌🔎",body:"Tap all three hearts, my love. Each one is hiding a tiny reminder from me."},
{tag:"Chapter 5 · A letter just for you baby",title:"If I could tell you one thing",emoji:"✉️🌸",body:"Baby, thank you for staying with me, for always trying ur best, and for letting me be part of your days. I love your laugh, your little ways, your voice, and even the random things you tell me.\n\nI don’t need us to be perfec baby, I just want us to keep choosing patience, honesty, kindness, and each other.\n\nOn your hard days baby, I hope you remember that you don’t have to earn my care. You are always loved by me asawa ko."},
{tag:"Chapter 6 · Pick your surprise po",title:"Choose a gift babyy",emoji:"🎁",body:"Choose one baby hehe. Every little gift comes with a piece of my heart."},
{tag:"Chapter 7 · To be continued",title:"Four months down baby, so many to go",emoji:"💗",body:"Happy 4th monthsary my love! Four months with you, and you’re still my favorite person, my favorite notification, and my favorite part of every day.\n\nOne day baby, we’ll make memories without a screen between us. Until then let’s keep collecting little moments and loving each other the best way we can.\n\nThank you for being you. Here’s to more months, more adventures, more hugs, and more us mwehehe. I love you sooo so much baby. MWAAAAAHHH! ♡"}
];
let index=0,reached=0,hearts=new Set(),chosen=0;
const $=id=>document.getElementById(id),music=$("bgMusic");
const accepted=["june 29 2026","06/29/2026","6/29/2026","06-29-2026","06292026","june 29","06/29","6/29","0629","06-29","29 june 2026"];
const norm=s=>s.trim().toLowerCase().replace(/,/g,"").replace(/\s+/g," ");

/* Starry sky */
(function(){const c=$("sky"),x=c.getContext("2d");let w,h,S=[];const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
function size(){const d=devicePixelRatio||1;w=innerWidth;h=innerHeight;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0);S=Array.from({length:Math.round(w*h/9000)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3+.3,p:Math.random()*6.28,s:Math.random()*.02+.005}))}
function draw(){x.clearRect(0,0,w,h);for(const s of S){s.p+=s.s;x.globalAlpha=.35+.55*Math.abs(Math.sin(s.p));x.fillStyle="#fff";x.beginPath();x.arc(s.x,s.y,s.r,0,6.283);x.fill()}if(!still)requestAnimationFrame(draw)}
addEventListener("resize",size);size();draw()})();

$("unlockForm").addEventListener("submit",e=>{e.preventDefault();
 if(accepted.includes(norm($("dateInput").value))){$("gateMsg").textContent="Yaayyy, enjoy baby 💗";pop();setTimeout(()=>{$("gate").classList.remove("active");$("journey").classList.add("active");render();scrollTo({top:0})},650)}
 else{const f=$("dateInput");f.classList.remove("shake");void f.offsetWidth;f.classList.add("shake");$("gateMsg").textContent="Almost, baby ♡."}});

function setSong(on,msg){$("musicBtn").setAttribute("aria-checked",on);$("musicLbl").textContent=msg||(on?"Song on":"Song off")}
$("musicBtn").addEventListener("click",async()=>{
 if(music.paused){try{await music.play();setSong(true)}catch{setSong(false,"Tahanan - Adie")}}
 else{music.pause();setSong(false)}});

function stars(){const P=chapters.map((_,i)=>[36+i*104.7,i%2?16:38]);let l="",s="";
 for(let i=0;i<P.length-1;i++)l+=`<line x1="${P[i][0]}" y1="${P[i][1]}" x2="${P[i+1][0]}" y2="${P[i+1][1]}" stroke="${i<reached?"#ffd89b":"#ffffff33"}" stroke-width="1.5" ${i<reached?"":'stroke-dasharray="3 5"'}/>`;
 P.forEach((p,i)=>{const on=i<=reached;s+=`<g ${on?`tabindex="0" role="button" aria-label="Go to chapter ${i+1}" onclick="go(${i})" onkeydown="if(event.key==='Enter')go(${i})"`:'aria-hidden="true"'}><circle cx="${p[0]}" cy="${p[1]}" r="18" fill="transparent"/><circle class="${on?"lit":"off"} ${i===index?"now":""}" cx="${p[0]}" cy="${p[1]}" r="${i===index?7:on?5:3}"/></g>`});
 $("stars").innerHTML=l+s}

function render(){const c=chapters[index];reached=Math.max(reached,index);
 $("chapter").textContent=c.tag;$("backBtn").style.visibility=index?"visible":"hidden";
 $("nextBtn").textContent=index===chapters.length-1?"Read our story again ↻":"Next";
 $("dots").innerHTML=chapters.map((_,i)=>`<span class="dot ${i===index?"on":""}"></span>`).join("");stars();
 let h=`<h2 class="story-title">${c.title}</h2><div class="illus" aria-hidden="true">${c.emoji}</div>`;
 if(index===4)h+=`<div class="letter">${c.body.split("\n\n").map(p=>`<p>${p}</p>`).join("")}</div>`;
 else h+=`<p class="body">${c.body}</p>`;
 if(index===2)h+=`<div class="cards">${scrapbook.map((m,i)=>`<button class="card" type="button" aria-pressed="false" onclick="flip(this)"><span class="face front"><i>${m.e}</i><b>${m.t}</b><span class="small">Tap to open</span></span><span class="face back"><b>${m.t}</b>${m.n}</span></button>`).join("")}</div>`;
 if(index===3)h+=`<div class="heartrow">${[0,1,2].map(i=>`<button class="heart" aria-label="Hidden heart ${i+1}" onclick="findHeart(${i})">${hearts.has(i)?"💖":"♡"}</button>`).join("")}</div><div class="secret" id="secretNote" aria-live="polite">${hearts.size===3?"You found every heart! I love you babyy. ♡":`Hearts found: ${hearts.size} of 3`}</div>`;
 if(index===5)h+=`<div class="gifts">${[["🫂","Virtual hug"],["💌","10 reasons"],["🌷","My promise"]].map((g,i)=>`<button class="gift ${chosen===i+1?"sel":""}" onclick="chooseGift(${i+1})"><span>${g[0]}</span>${g[1]}</button>`).join("")}</div><div class="reveal" id="giftReveal" aria-live="polite">${chosen?giftText(chosen):"Pick a gift to unwrap a little piece of my heart ♡"}</div>`;
 if(index===6)h+=`<div class="audio"><h3>A little voice note from me 🎧</h3><audio controls preload="metadata" src="voice-message.mp3" onerror="this.nextElementSibling.hidden=false">Your browser doesn’t support audio playback.</audio><p class="small" hidden></p></div><div class="end">I love you baby. ♡</div><p class="small">Our adventure doesn’t end here.</p>`;
 const sc=$("slideContent");sc.className="";void sc.offsetWidth;sc.className="enter";sc.innerHTML=h;
 if(index===6)setTimeout(()=>pop(26),500)}

function go(i){index=i;render();scrollTo({top:0,behavior:"smooth"})}
function move(d){if(index===chapters.length-1&&d>0){index=0;reached=0;hearts.clear();chosen=0}else index=Math.max(0,Math.min(chapters.length-1,index+d));render();scrollTo({top:0,behavior:"smooth"});if(d>0)pop(5)}
$("backBtn").addEventListener("click",()=>move(-1));$("nextBtn").addEventListener("click",()=>move(1));
addEventListener("keydown",e=>{if(!$("journey").classList.contains("active")||e.target.matches("input,audio"))return;if(e.key==="ArrowRight")move(1);if(e.key==="ArrowLeft"&&index)move(-1)});
let tx=null;$("journey").addEventListener("touchstart",e=>tx=e.touches[0].clientX,{passive:true});
$("journey").addEventListener("touchend",e=>{if(tx===null)return;const d=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(d)>70&&!e.target.closest("audio")){if(d<0)move(1);else if(index)move(-1)}});

function flip(b){const o=b.classList.toggle("open");b.setAttribute("aria-pressed",o);if(o)pop(4)}
const notes=["Your hug is my favorite place baby ko even when I’m only imagining it. 🫂","If teleporting were real, I’d be beside you already baby. 💗","Iloveyouu on ur bright days and your difficult days asawa ko. 🌷"];
function findHeart(i){if(hearts.has(i))return;hearts.add(i);document.querySelectorAll(".heart")[i].textContent="💖";
 $("secretNote").textContent=notes[i]+"  Hearts found: "+hearts.size+" of 3";pop(6);
 if(hearts.size===3)setTimeout(()=>{$("secretNote").textContent="Yaayyy baby, all hearts found! You’re my favorite treasure baby ko. ♡";pop(22)},700)}
function chooseGift(n){chosen=n;render();pop(8)}
function giftText(n){return n===1?"Come here my baby. Imagine my arms around you, a forehead kiss and me whispering: I’m right here my love. Until I can hug you for real. 🫂":n===2?"10 little reasons I love you:\n♡ Your smile\n♡ Your laugh\n♡ Your kindness\n♡ Your cute messages\n♡ Your freakiness\n♡ Your voice\n♡ Your effort\n♡ Your big boobies\n♡ The comfort you bring\n♡ Everything, Simply because you’re you baby.":"My promise to you:\nI’ll keep choosing honest conversations, patience, effort, and you baby. I can’t promise every day will be perfect, but I want to keep building something safe and beautiful with you one day at a time. 🌷"}
function pop(n=12){const y=["♡","💗","✦","💕"];for(let i=0;i<n;i++){const s=document.createElement("span");s.className="pop";s.textContent=y[Math.floor(Math.random()*y.length)];s.style.left=(8+Math.random()*84)+"vw";s.style.top=(50+Math.random()*40)+"vh";s.style.animationDelay=Math.random()*.45+"s";s.style.color="#ffb3cd";document.body.appendChild(s);setTimeout(()=>s.remove(),2500)}}
  
