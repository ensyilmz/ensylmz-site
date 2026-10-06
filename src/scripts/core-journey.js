import {coreSound} from './core-sound.js';
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n)),mix=(a,b,t)=>a+(b-a)*t;
export function setupCoreJourney(reduced){
 const projects=document.querySelector('#secili-isler');
 const section=document.createElement('section');section.className='core-journey';section.id='core-journey';section.dataset.scene='core';section.setAttribute('aria-label','Tasarım, görünürlük ve operasyon yaklaşımım');
 section.innerHTML=`<div class="core-stage"><canvas class="core-canvas" aria-hidden="true"></canvas><div class="core-vignette" aria-hidden="true"></div><div class="core-top"><span>EY / DİJİTAL ÇEKİRDEK</span><a href="#secili-isler">Çalışmalara geç ↘</a></div><div class="core-copy"><div><span>00 / AYNI BÜTÜNÜN PARÇALARI</span><h2>Bir markayı<br>tek açıdan<br>ele almıyorum.</h2><p>Tasarım, görünürlük ve operasyon.<br>Birlikte çalışan üç parça.</p></div><div><span>01 / TASARIM</span><h2>Nasıl göründüğünü<br><em>tasarlıyorum.</em></h2><p>Marka dili, görsel üretim ve alışveriş deneyimi.<br>Rokka’daki çalışmanın parçaları.</p></div><div><span>02 / GÖRÜNÜRLÜK</span><h2>Nasıl bulunduğuyla<br><em>ilgileniyorum.</em></h2><p>Ürün, kategori ve içerikten arama kanallarına.<br>Mersan ve Demirsan’daki çalışmalar.</p></div><div><span>03 / OPERASYON</span><h2>Nasıl çalıştığını da<br><em>ele alıyorum.</em></h2><p>Ürün sunumu, pazaryeri ve rapor takibi.<br>Giyimyol’daki operasyon çalışması.</p></div><div><span>04 / ŞİMDİ YAKINDAN BAKALIM</span><h2>Fikirden<br><em>yapılan işe.</em></h2><p>Bu yaklaşımın gerçek projelerdeki karşılığı.</p></div></div><div class="core-window" aria-hidden="true"><img src="/assets/media/rokka-tasarim-form-beden-bulucu.png" alt=""><img src="/assets/media/mersan-search-console-performans.png" alt=""><img src="/assets/media/giyimyol-trendyol-siparis-2026.png" alt=""></div><div class="core-bottom"><span>KAYDIR / AÇIYI DEĞİŞTİR</span><div class="core-steps"><i></i><i></i><i></i><i></i><i></i></div><span class="core-coordinate">01 / 05</span></div></div>`;
 projects.before(section);const updateSound=coreSound(section,reduced);
 const cube=document.createElement('div');cube.className='project-cube';cube.setAttribute('aria-hidden','true');
 const textures=['rokka-tasarim-anasayfa-hero.png','mersan-search-console-performans.png','giyimyol-trendyol-siparis-2026.png','demirsan-sosyal-90-gun.png','rokka-tasarim-form-beden-bulucu.png','mersan-merchant-genel-bakis.png'];
 cube.innerHTML=textures.map((src,i)=>'<div class="cube-face face-'+i+'"><img src="/assets/media/'+src+'" alt=""></div>').join('');section.querySelector('.core-stage').append(cube);
 const canvas=section.querySelector('canvas'),ctx=canvas.getContext('2d'),copies=[...section.querySelectorAll('.core-copy>div')],windows=[...section.querySelectorAll('.core-window img')];
 const stars=Array.from({length:innerWidth<700?100:220},()=>({x:Math.random()*2-1,y:Math.random()*2-1,z:.18+Math.random()*1.8}));
 let width,height,raf,last=0,progress=0,mx=0,my=0,dead=false;
 function resize(){width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio,1.5);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
 resize();addEventListener('resize',resize);section.addEventListener('pointermove',e=>{mx=(e.clientX/width-.5)*.12;my=(e.clientY/height-.5)*.1;});
 function rotate(v,ax,ay,az){let[x,y,z]=v;[y,z]=[y*Math.cos(ax)-z*Math.sin(ax),y*Math.sin(ax)+z*Math.cos(ax)];[x,z]=[x*Math.cos(ay)+z*Math.sin(ay),-x*Math.sin(ay)+z*Math.cos(ay)];return[x*Math.cos(az)-y*Math.sin(az),x*Math.sin(az)+y*Math.cos(az),z];}
 function render(t){if(dead)return;raf=requestAnimationFrame(render);if(t-last<30)return;const dt=Math.min((t-last)/1000,.06);last=t;const r=section.getBoundingClientRect();if(r.bottom<0||r.top>height){updateSound(progress,false);return;}const raw=clamp(-r.top/Math.max(1,section.offsetHeight-height));progress=reduced.matches?0:mix(progress,raw,.18);const p=progress,phase=Math.min(4,Math.floor(p*5));section.dataset.phase=phase;updateSound(p,true);
  copies.forEach((el,i)=>{const visibility=reduced.matches?(i===0?1:0):clamp(1-Math.abs(p*5-(i+.5))*2);el.style.opacity=visibility;el.style.transform=`translateY(${(1-visibility)*24}px)`;el.setAttribute('aria-hidden',visibility>.15?'false':'true');});
  if(p<.04){copies[0].style.opacity=1;copies[0].setAttribute('aria-hidden','false');}if(p>.94){copies[4].style.opacity=1;copies[4].setAttribute('aria-hidden','false');}
  section.querySelector('.core-coordinate').textContent=String(phase+1).padStart(2,'0')+' / 05';section.querySelectorAll('.core-steps i').forEach((el,i)=>el.classList.toggle('active',i===phase));
  const mobile=width<800,finish=clamp((p-.8)/.2),base=Math.min(width*(mobile?.34:.23),height*.31),radius=base*(.78+Math.sin(p*Math.PI)*.52)*(1-finish*.58),cx=mix(width*(mobile?.5:.68),width*.81,finish),cy=mix(height*(mobile?.36:.5),height*.35,finish),ax=-.5+p*Math.PI*1.3+my,ay=.5+p*Math.PI*2.5+mx,az=p*Math.PI*.7;
  ctx.clearRect(0,0,width,height);const space=ctx.createRadialGradient(cx,cy,0,cx,cy,width*.65);space.addColorStop(0,'rgba(255,112,73,.09)');space.addColorStop(1,'rgba(8,10,17,0)');ctx.fillStyle=space;ctx.fillRect(0,0,width,height);
  for(const star of stars){const previous=star.z;if(!reduced.matches)star.z-=dt*(.035+Math.sin(p*Math.PI)*.16);if(star.z<.1){star.z=2;continue;}const x=width/2+star.x/star.z*width*.5,y=height/2+star.y/star.z*height*.6;ctx.strokeStyle=`rgba(237,226,214,${clamp(1.5-star.z)*.5})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(width/2+star.x/previous*width*.5,height/2+star.y/previous*height*.6);ctx.lineTo(x+1,y+1);ctx.stroke();}
  const project=v=>{const w=rotate(v,ax,ay,az),depth=3.8/(3.8-w[2]);return{x:cx+w[0]*radius*depth,y:cy+w[1]*radius*depth,z:w[2]};};
  const segments=[];for(let ring=0;ring<3;ring++){const open=Math.sin(p*Math.PI)*.24;for(let i=0;i<90;i++){const a=i/90*Math.PI*2,b=(i+1)/90*Math.PI*2;const point=n=>{const u=Math.cos(n)*(1+ring*.13),v=Math.sin(n)*(1+ring*.13);return ring===0?[u,v,open]:ring===1?[u,open,v]:[open,u,v];};const a1=project(point(a)),b1=project(point(b));segments.push({a:a1,b:b1,ring,z:(a1.z+b1.z)/2});}}
  const vertices=[[0,-.64,0],[.55,0,0],[0,0,.55],[-.55,0,0],[0,0,-.55],[0,.64,0]].map(project);const faces=[[0,1,2],[0,2,3],[0,3,4],[0,4,1],[5,2,1],[5,3,2],[5,4,3],[5,1,4]].map(ids=>({ids,z:ids.reduce((n,i)=>n+vertices[i].z,0)/3})).sort((a,b)=>a.z-b.z);
  function drawRing(s){ctx.beginPath();ctx.moveTo(s.a.x,s.a.y);ctx.lineTo(s.b.x,s.b.y);ctx.strokeStyle=s.ring===phase-1?'rgba(255,149,103,.95)':`rgba(157,175,186,${s.z>0?.55:.15})`;ctx.lineWidth=s.ring===phase-1?4:2;ctx.stroke();if(s.ring===phase-1){ctx.strokeStyle='#ff704924';ctx.lineWidth=12;ctx.stroke();}}
  segments.filter(s=>s.z<0).forEach(drawRing);
  segments.filter(s=>s.z>=0).forEach(drawRing);
  const cubeSize=radius*.98;cube.style.setProperty('--cube-size',cubeSize+'px');cube.style.left=cx+'px';cube.style.top=cy+'px';cube.style.transform='translate(-50%,-50%) perspective(1100px) rotateZ('+az+'rad) rotateY('+ay+'rad) rotateX('+ax+'rad)';

  const panel=section.querySelector('.core-window');panel.style.left=cx+'px';panel.style.top=cy+'px';panel.style.transform=`translate(-50%,-50%) rotateY(${Math.sin(p*Math.PI*4)*24}deg) rotateZ(${Math.sin(p*Math.PI*3)*9}deg) scale(${mobile?.7:1})`;windows.forEach((el,i)=>el.style.opacity=phase===i+1?'.95':'0');panel.style.opacity='0';
 }
 raf=requestAnimationFrame(render);addEventListener('pagehide',e=>{if(!e.persisted){dead=true;cancelAnimationFrame(raf);removeEventListener('resize',resize);}});
 setupProjectPortals(reduced);
 return section;
}
function setupProjectPortals(reduced){
 const touch=matchMedia('(hover: none)');
 document.querySelectorAll('.story-card').forEach((card,index)=>{for(const visual of card.querySelectorAll('.project-visual,.story-detail-image')){const main=visual.classList.contains('project-visual'),cover=document.createElement('div');cover.className='project-portal-cover';cover.setAttribute('aria-hidden','true');cover.innerHTML=`<span class="portal-label">${main?'PROJE / '+String(index+1).padStart(2,'0'):'DETAY'}</span><strong>${main?card.querySelector('h3').textContent:card.querySelector('.story-evidence h4').textContent}</strong><span class="portal-invite">${touch.matches?'DOKUN / KEŞFET':'YAKLAŞ / KEŞFET'} <b>↗</b></span><span class="cover-orbit"></span>`;visual.append(cover);const rays=document.createElement('div');rays.className='portal-rays';rays.setAttribute('aria-hidden','true');for(let i=0;i<(main?32:14);i++){const ray=document.createElement('i');ray.style.setProperty('--angle',i/(main?32:14)*360+'deg');ray.style.setProperty('--delay',Math.random()*.12+'s');rays.append(ray);}visual.append(rays);
   function open(){visual.classList.add('portal-open','portal-warp');setTimeout(()=>visual.classList.remove('portal-warp'),750);}function close(){visual.classList.remove('portal-open','portal-warp');}
   visual.addEventListener('pointerenter',()=>{if(!touch.matches)open();});visual.addEventListener('pointerleave',()=>{if(!touch.matches)close();});card.addEventListener('focus',()=>{if(!touch.matches)open();});card.addEventListener('blur',close);
   visual.addEventListener('click',e=>{if(touch.matches){e.preventDefault();e.stopPropagation();visual.classList.contains('portal-open')?close():open();}});
   if(reduced.matches)visual.classList.add('portal-still');
  }});
}



