const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('navLinks');
menuBtn?.addEventListener('click',()=>{nav.classList.toggle('open');});
document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const sections=document.querySelectorAll('.reveal-section,.reveal-stagger');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
},{threshold:.14});
sections.forEach(s=>observer.observe(s));

const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',(e)=>{
  if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}
});

const words=['work.','learn.','innovate.','ship.'];
const typing=document.getElementById('typing');
let wi=0,ci=0,deleting=false;
function typeLoop(){
  if(!typing)return;
  const word=words[wi];
  typing.textContent=deleting?word.slice(0,ci--):word.slice(0,ci++);
  let delay=deleting?55:95;
  if(!deleting && ci>word.length){deleting=true;delay=1300;}
  if(deleting && ci<0){deleting=false;wi=(wi+1)%words.length;ci=0;delay=250;}
  setTimeout(typeLoop,delay);
}
setTimeout(typeLoop,900);

document.querySelectorAll('.project').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(matchMedia('(max-width: 800px)').matches)return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(800px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave',()=>{card.style.transform='';});
});
