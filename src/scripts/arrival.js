import {arrivalSound} from './arrival-sound.js';
// A finite opening scene. The hero's existing orbital canvas is the destination.
export async function spaceArrival(reduced,astronaut){
 let seen=false;try{seen=sessionStorage.getItem('ey-arrival-v5')==='1';}catch{}
 if(seen||reduced.matches||scrollY>50||location.hash||window.eyArrivalExpired){clearTimeout(window.eyArrivalGuard);document.documentElement.classList.remove('arrival-pending');return;}
 try{sessionStorage.setItem('ey-arrival-v5','1');}catch{}
 const canvas=document.querySelector('#orbital-canvas'),destination=canvas.parentElement;
 const overlay=document.createElement('div');overlay.className='arrival-overlay space-arrival';overlay.dataset.phase='stars';
 overlay.innerHTML='<canvas class="arrival-stars" aria-hidden="true"></canvas><div class="arrival-nebula" aria-hidden="true"></div><div class="arrival-top"><span>ensylmz®</span><span>CREATIVE ORBIT / 05</span></div><div class="arrival-orbit"></div><div class="portal-halo" aria-hidden="true"></div><div class="arrival-caption" aria-hidden="true"><small>01 / KOORDİNATLAR BULUNUYOR</small><p>Bir dünyadan<br>diğerine.</p></div><div class="arrival-bottom"><span class="arrival-status" role="status">Yörüngeye hazırlanıyoruz.</span><button type="button">Girişi geç ↗</button></div><div class="arrival-timeline" aria-hidden="true"><i></i></div>';
 const entryAudio=arrivalSound(overlay);document.body.append(overlay);clearTimeout(window.eyArrivalGuard);document.documentElement.classList.remove('arrival-pending');const stage=overlay.querySelector('.arrival-orbit');stage.append(canvas);document.body.classList.add('arrival-running');
 const blocked=[...document.querySelectorAll('.site-header,main,.footer,#astronaut,.orbit-sound')].map(el=>({el,inert:el.inert}));blocked.forEach(({el})=>el.inert=true);
 const stars=overlay.querySelector('.arrival-stars'),ctx=stars.getContext('2d'),particles=Array.from({length:innerWidth<700?160:320},()=>({x:(Math.random()-.5)*2,y:(Math.random()-.5)*2,z:Math.random()*1.5+.08,twinkle:Math.random()*6}));
 let width,height,dpr,raf,start=performance.now(),last=start,mx=0,my=0,skipped=false,stop=false;
 function resize(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio,1.5);stars.width=width*dpr;stars.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
 function pointer(e){mx=(e.clientX/width-.5)*26;my=(e.clientY/height-.5)*20;}
 resize();addEventListener('resize',resize);overlay.addEventListener('pointermove',pointer);
 function frame(now){if(stop)return;raf=requestAnimationFrame(frame);const seconds=(now-start)/1000,dt=Math.min((now-last)/1000,.05);last=now;entryAudio.update(seconds);ctx.clearRect(0,0,width,height);const speed=seconds<.9?.055:seconds<2.3?.22:seconds<3.8?.65:.2;
  for(const p of particles){const previous=p.z;p.z-=dt*speed;if(p.z<.045){p.z=1.6;p.x=(Math.random()-.5)*2;p.y=(Math.random()-.5)*2;continue;}const scale=Math.min(width,height)*.52,px=width*.5+p.x/p.z*scale+mx/p.z,py=height*.5+p.y/p.z*scale+my/p.z;const alpha=Math.min(1,1.7-p.z)*(.7+Math.sin(seconds+p.twinkle)*.15);ctx.strokeStyle=`rgba(235,223,215,${alpha})`;ctx.fillStyle=ctx.strokeStyle;const radius=Math.min(2.2,.7/p.z);
   if(seconds>2.4){ctx.beginPath();ctx.moveTo(width*.5+p.x/previous*scale+mx/previous,height*.5+p.y/previous*scale+my/previous);ctx.lineTo(px,py);ctx.lineWidth=radius*.65;ctx.stroke();}else{ctx.beginPath();ctx.arc(px,py,radius,0,Math.PI*2);ctx.fill();}}
  overlay.querySelector('.arrival-timeline i').style.transform=`scaleX(${Math.min(seconds/4.7,1)})`;
 }
 raf=requestAnimationFrame(frame);
 let resolveSkip;const skip=new Promise(resolve=>resolveSkip=resolve);const skipScene=()=>{skipped=true;resolveSkip();};overlay.querySelector('button').addEventListener('click',skipScene);overlay.addEventListener('keydown',e=>{if(e.key==='Escape')skipScene();});
 const timers=[];function phase(delay,name,label,text){timers.push(setTimeout(()=>{overlay.dataset.phase=name;overlay.querySelector('.arrival-caption small').textContent=label;overlay.querySelector('.arrival-status').textContent=text;},delay));}
 phase(900,'approach','02 / YÖRÜNGEYE YAKLAŞILIYOR','Yörüngeye yaklaşıyoruz.');phase(2250,'portal','03 / GEÇİT AÇILIYOR','Geçit açılıyor.');phase(3350,'warp','04 / YENİ BİR DÜNYA','Dijitalde bir iz bırak.');
 try{await Promise.race([new Promise(resolve=>timers.push(setTimeout(resolve,3900))),skip]);timers.forEach(clearTimeout);const rect=destination.getBoundingClientRect(),from=stage.getBoundingClientRect();overlay.dataset.phase='landing';stage.style.position='fixed';stage.style.left=from.left+'px';stage.style.top=from.top+'px';stage.style.width=from.width+'px';stage.style.height=from.height+'px';overlay.classList.add('arriving');
  await stage.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${rect.left-from.left}px,${rect.top-from.top}px) scale(${rect.width/from.width},${rect.height/from.height})`}],{duration:skipped?220:850,easing:'cubic-bezier(.65,0,.2,1)',fill:'forwards'}).finished;
 }finally{entryAudio.dispose();stop=true;cancelAnimationFrame(raf);timers.forEach(clearTimeout);removeEventListener('resize',resize);destination.prepend(canvas);blocked.forEach(({el,inert})=>el.inert=inert);overlay.remove();document.body.classList.remove('arrival-running');document.body.classList.add('arrival-landed');astronaut.classList.add('arrived');}
}

