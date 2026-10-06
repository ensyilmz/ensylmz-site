import {characterScenes} from './character-scenes.js';
// Scene geometry comes from the actual content, including responsive grid rows.
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const mix=(a,b,t)=>a+(b-a)*t;
const ease=t=>1-Math.pow(1-t,3);
export function setupChoreography(actor,reduced){
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 document.body.classList.add('experience-v3','experience-v4');
 actor.querySelector('.astro-head').insertAdjacentHTML('beforeend','<g class="visor-eyes"><ellipse cx="79" cy="56" rx="3" ry="5" fill="#aceaff"/><ellipse cx="100" cy="56" rx="3" ry="5" fill="#aceaff"/></g><path class="visor-streak" d="M66 38 L112 76" stroke="#e5faff" stroke-width="7" opacity="0"/>');
 actor.querySelector('.astro-body').insertAdjacentHTML('beforeend','<path class="suit-seam" d="M77 122H103M81 128H99" stroke="#778a96" stroke-width="2"/><g class="orbit-bolts" fill="#ffc6a7"><circle cx="54" cy="55" r="2"/><circle cx="130" cy="55" r="2"/></g>');
 const effects=document.createElement('div');effects.className='mission-effects';effects.setAttribute('aria-hidden','true');document.body.append(effects);
 const story=characterScenes(actor,effects,reduced);
 function burst(x,y,side){if(reduced.matches)return;const n=innerWidth<700?9:19;const ring=document.createElement('i');ring.className='impact-ring';ring.style.left=x+'px';ring.style.top=y+'px';effects.append(ring);ring.animate([{transform:'translate(-50%,-50%) scale(.15)',opacity:1},{transform:'translate(-50%,-50%) scale(2.8)',opacity:0}],{duration:650}).finished.then(()=>ring.remove());
  for(let i=0;i<n;i++){const bit=document.createElement('i');bit.className=i%3?'wall-shard':'rocket-spark';bit.style.left=x+'px';bit.style.top=y+'px';const a=(i/n)*Math.PI*2,dist=35+Math.random()*125,dx=side?side*(30+Math.random()*140):Math.cos(a)*dist,dy=Math.sin(a)*dist;effects.append(bit);bit.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(${i*67}deg)`,opacity:0}],{duration:650+Math.random()*450,easing:'cubic-bezier(.12,.6,.4,1)'}).finished.then(()=>bit.remove());}
  const crack=document.createElement('div');crack.className='wall-crack';crack.style.left=clamp(x,20,innerWidth-65)+'px';crack.style.top=y-35+'px';crack.innerHTML='<svg viewBox="0 0 80 100"><path d="M40 0L29 24L46 39L24 59L35 80L28 100M46 39L72 28M24 59L0 68"/></svg>';effects.append(crack);crack.animate([{opacity:0},{opacity:.8,offset:.1},{opacity:0}],{duration:1150}).finished.then(()=>crack.remove());
 }
 let x=innerWidth-130,y=20,scene='',transition=null,launching=null,prevProject=-1,disposed=false;
 const hero=$('.hero'),projects=$('#secili-isler'),about=$('.about-teaser'),identity=$('.identity-section'),footer=$('.footer'),cards=all('#secili-isler .project-card'),tiles=all('.identity-section .logo-tile');
 const helpers=all('[data-scene=services] .service-row').map((row,i)=>{row.classList.add('push-row');row.dataset.direction=i%2?'right':'left';const helper=document.createElement('span');helper.className='astro-helper';helper.setAttribute('aria-hidden','true');const svg=actor.querySelector('svg').cloneNode(true);svg.querySelectorAll('[id]').forEach(el=>{const old=el.id,newId=`helper-${i}-${old}`;el.id=newId;svg.querySelectorAll('*').forEach(node=>{for(const attr of ['fill','stroke'])if(node.getAttribute(attr)===`url(#${old})`)node.setAttribute(attr,`url(#${newId})`);});});helper.append(svg);row.querySelector('summary').append(helper);return{row,helper,i};});
 function setPose(p){actor.dataset.pose=p;}
 function target(t){const w=innerWidth,h=innerHeight,size=w<700?64:104,height=size*220/180;actor.style.width=size+'px';actor.style.height=height+'px';const hr=$('.site-header').getBoundingClientRect(),pr=projects.getBoundingClientRect(),ar=about.getBoundingClientRect(),ir=identity.getBoundingClientRect(),fr=footer.getBoundingClientRect();
  let key='hidden',tx=x,ty=y,pose='float',visible=false;
  if(scrollY<Math.max(100,hero.offsetHeight*.45)){key='hero';tx=w<700?w*.48-size*.5:w*.29;ty=hr.bottom-height*.66;pose='sit';visible=hr.bottom>0;}
  else if(pr.top<h*.82&&pr.bottom>h*.25){key='services';visible=false;}
  if(ar.top<h*.7&&ar.bottom>h*.28){const r=about.querySelector('.text-link').getBoundingClientRect();key='about';tx=clamp(r.right+12,15,w-size-15);ty=r.top+8;pose='look';visible=ar.top<innerHeight*.7&&ar.bottom>innerHeight*.28;}
  const sr=$('[data-scene=services]').getBoundingClientRect();if(sr.top<h*.65&&sr.bottom>h*.3){key='services';visible=false;}
  const first=tiles[0].getBoundingClientRect(),last=tiles[Math.min(3,tiles.length-1)].getBoundingClientRect();
  if(ir.top<h*.7&&ir.bottom>h*.3){const p=clamp((h*.83-first.top)/(h*.65));key=p<.98?'identity':'identity-exit';visible=p<.98&&first.top<h*.85;const raw=p*3,idx=Math.min(2,Math.floor(raw)),part=raw-idx,a=tiles[idx].getBoundingClientRect(),b=tiles[idx+1].getBoundingClientRect();tx=mix(a.left+a.width*.25,b.left+b.width*.25,part)-size*.5;ty=mix(a.top,b.top,part)-height*.9-Math.sin(part*Math.PI)*(w<700?55:95);pose='moon';actor.style.setProperty('--astro-turn',Math.sin(part*Math.PI)*-18+'deg');}
  if(fr.top<h*.9){key='contact';tx=w-size-(w<700?22:62);ty=fr.top-height*.75;pose='ready';visible=ty<h&&fr.bottom>0;}
  return{key,x:tx,y:ty,pose,visible,size,height};
 }
 function launch(){if(launching||reduced.matches){if(reduced.matches)window.scrollTo({top:0,behavior:'instant'});return;}story.reset();document.body.classList.add('astronaut-returning');transition=null;launching={at:performance.now(),from:scrollY,x,y};actor.classList.add('rocket-active');actor.dataset.phase='launch';}
 function tick(t){if(disposed)return;if(reduced.matches){actor.style.opacity='0';return;}const dest=target(t);if(!launching&&document.body.classList.contains('peeking-projects')){transition=null;scene='services';story.cancel();actor.style.opacity='0';actor.classList.remove('rocket-active');return;}
  story.helpers(t,helpers);
  if(launching){const elapsed=t-launching.at;actor.dataset.scene='hero';setPose('rocket');
   if(elapsed<1500){const p=ease(clamp(elapsed/1500));window.scrollTo({top:launching.from*(1-p),behavior:'instant'});x=mix(launching.x,innerWidth<700?innerWidth*.48-dest.size*.5:innerWidth*.29,p);y=mix(launching.y,-dest.height*.35,p);actor.style.setProperty('--flight-angle',`${-8*Math.sin(p*Math.PI)}deg`);}
   else{const z=elapsed-1500,r=$('.site-header').getBoundingClientRect(),land=r.bottom-dest.height*.66;if(!launching.hit){window.scrollTo({top:0,behavior:'instant'});launching.hit=true;burst(x+dest.size*.5,6,0);actor.classList.remove('rocket-active');actor.classList.add('bonked');actor.dataset.phase='bonk';}x=innerWidth<700?innerWidth*.48-dest.size*.5:innerWidth*.29;if(z<430){y=mix(-dest.height*.35,land+10,ease(z/430));setPose('tumble');}else if(z<900){y=land+10;setPose('recover');}else if(z<1450){y=land-dest.height*.2;setPose('stand');}else{y=land;setPose('sit');}if(z>2000){launching=null;document.body.classList.remove('astronaut-returning');scene='hero';actor.classList.remove('bonked');actor.dataset.phase='idle';}}
   actor.style.opacity='1';actor.style.transform=`translate3d(${x}px,${y}px,0)`;return;
  }
  if(dest.key!==scene){const old=scene;story.cancel();scene=dest.key;actor.dataset.scene=['hero','projects','about','identity','contact'].includes(scene)?scene:scene.startsWith('projects')?'projects':scene.startsWith('identity')?'identity':'services';actor.setAttribute('aria-label',scene==='contact'?'Roketle sayfanın başına dön':'Astronota selam ver');actor.title=scene==='contact'?'Kalkış için tıkla ↑':'Selam, dünyalı!';
   const side=old==='projects'||scene==='about'?-1:1;transition={at:t,fromX:x,fromY:y,side,exit:old!==''&&old!=='hidden'&&old!=='services'&&!old.endsWith('exit'),entry:dest.visible,ground:['about','projects'].includes(scene),about:scene==='about'};actor.dataset.phase='flight';actor.classList.add('rocket-active');
  }
  let visible=dest.visible;
  if(transition){const dt=t-transition.at,exitDuration=transition.exit?450:0,entryDuration=transition.entry?620:0;
   if(dt<exitDuration){const p=ease(dt/exitDuration);x=mix(transition.fromX,transition.side>0?innerWidth+130:-180,p);y=transition.fromY-Math.sin(p*Math.PI)*70;visible=true;setPose('rocket');actor.style.setProperty('--flight-angle',`${transition.side*65}deg`);if(p>.63&&!transition.broken){transition.broken=true;burst(transition.side>0?innerWidth-8:8,clamp(y+60,30,innerHeight-50),-transition.side);}}
   else if(dt<exitDuration+entryDuration){const p=ease((dt-exitDuration)/entryDuration);if(!transition.entered){transition.entered=true;if(transition.ground){const h=transition.about?about.querySelector('h2').getBoundingClientRect():null;story.ground(h?h.left+20:dest.x+dest.size*.5,h?h.bottom+30:dest.y+dest.height*.9);if(transition.about)story.startAbout(t);}else burst(10,clamp(dest.y+40,30,innerHeight-40),1);}if(transition.ground){x=dest.x;y=dest.y+(1-p)*dest.height;setPose('emerge');actor.classList.remove('rocket-active');}else{x=mix(-150,dest.x,p);y=dest.y-Math.sin(p*Math.PI)*55;setPose('rocket');}visible=true;actor.style.setProperty('--flight-angle',`${mix(-60,0,p)}deg`);}
   else{visible=dest.visible;transition=null;actor.classList.remove('rocket-active');actor.dataset.phase='idle';x=dest.x;y=dest.y;}
  }
  if(!transition){x=dest.x;y=dest.y;setPose(dest.pose);actor.style.setProperty('--flight-angle','0deg');}
  if(!transition&&scene==='hero'){const h=story.headerFrame(t,dest);if(h){x=h.x;y=h.y;setPose(h.pose);}else x=dest.x+story.offset;}
  if(scene==='about'){const a=story.aboutFrame(t,dest);if(a){x=a.x;y=a.y;setPose(a.pose);visible=true;}}
  actor.style.opacity=visible?'1':'0';actor.style.pointerEvents=visible?'auto':'none';actor.tabIndex=visible?0:-1;actor.style.transform=`translate3d(${x}px,${y}px,0)`;
 }
 // A short fuse precedes ordinary same-tab navigation and leaves browser gestures intact.
 let navigating=false;document.addEventListener('click',async e=>{const a=e.target.closest('.about-teaser .text-link');if(!a||reduced.matches||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target)return;e.preventDefault();if(navigating)return;navigating=true;a.classList.add('fuse-lit');await new Promise(r=>setTimeout(r,420));location.assign(a.href);});
 addEventListener('pageshow',()=>navigating=false);addEventListener('pagehide',e=>{if(!e.persisted)disposed=true;});
 return{tick,launch,interact:story.interact};
}




