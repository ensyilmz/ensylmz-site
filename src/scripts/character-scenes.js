const clamp=n=>Math.max(0,Math.min(1,n)),mix=(a,b,t)=>a+(b-a)*t;
export function characterScenes(actor,effects,reduced){
 let header=null,click=0,offset=0,about=null,servicesAt=null;
 const heading=document.querySelector('.about-copy h2');
 // Keep semantic heading text; individual glyph boxes provide actual landing surfaces.
 const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(const node of nodes){const fragment=document.createDocumentFragment();for(const char of node.textContent){const span=document.createElement('span');span.className='walk-glyph';span.textContent=char;fragment.append(span);}node.replaceWith(fragment);}
 const gun='<svg viewBox="0 0 80 50"><path d="M8 13H60L74 20V30H36L30 46H17L23 28H8Z" fill="#667781" stroke="#c3edf5" stroke-width="3"/><path d="M39 18H68" stroke="#ff7049" stroke-width="5"/></svg>';
 const prop=document.createElement('span');prop.className='space-blaster';prop.innerHTML=gun;actor.append(prop);
 function ground(x,y){if(reduced.matches)return;const hole=document.createElement('span');hole.className='ground-rift';hole.style.left=x+'px';hole.style.top=y+'px';effects.append(hole);hole.animate([{transform:'translateX(-50%) scaleX(0)',opacity:0},{transform:'translateX(-50%) scaleX(1)',opacity:1,offset:.2},{transform:'translateX(-50%) scaleX(.8)',opacity:0}],{duration:1800}).finished.then(()=>hole.remove());for(let i=0;i<14;i++){const bit=document.createElement('i');bit.className='soil-bit';bit.style.left=x+'px';bit.style.top=y+'px';effects.append(bit);const dx=(Math.random()-.5)*180;bit.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${dx*.6}px,-${25+Math.random()*75}px) rotate(80deg)`,offset:.4},{transform:`translate(${dx}px,45px) rotate(190deg)`,opacity:0}],{duration:1000+Math.random()*450}).finished.then(()=>bit.remove());}}
 function shoot(){const spot=document.createElement('div');spot.className='laser-splat';spot.style.left='55%';spot.style.top='42%';spot.innerHTML='<i></i><b>✳</b>';effects.append(spot);spot.animate([{transform:'scale(.05)',opacity:0},{transform:'scale(1.15)',opacity:1,offset:.08},{transform:'scale(1)',opacity:.85,offset:.6},{transform:'scale(.9)',opacity:0}],{duration:2400}).finished.then(()=>spot.remove());actor.classList.add('firing');setTimeout(()=>actor.classList.remove('firing'),280);}
 function toss(){const item=document.createElement('span');item.className='discarded-blaster';item.innerHTML=gun;const r=actor.getBoundingClientRect();item.style.left=r.left+50+'px';item.style.top=r.top+50+'px';effects.append(item);item.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(90px,${innerHeight-r.top-70}px) rotate(720deg)`,opacity:1,offset:.88},{transform:`translate(90px,${innerHeight-r.top+30}px) rotate(820deg)`,opacity:0}],{duration:950,easing:'cubic-bezier(.4,0,.8,.4)'}).finished.then(()=>item.remove());setTimeout(()=>ground(r.left+140,innerHeight-12),730);}
 function interact(){if(header||actor.dataset.phase!=='idle')return;click++;header={at:performance.now(),type:click%2?1:2};}
 function headerFrame(t,dest){if(!header)return null;const dt=t-header.at;let pose='stand',x=dest.x+offset,y=dest.y-dest.height*.22;
  if(header.type===1){if(dt<450)pose='stand';else if(dt<1100)pose='shake';else if(dt<2100){pose='walk';x=dest.x+mix(offset,75,clamp((dt-1100)/1000));}else{offset=75;pose='sit';y=dest.y;if(dt>2400)header=null;}}
  else{if(dt<450)pose='stand';else if(dt<1100)pose='draw';else if(dt<1650){pose='aim';if(!header.shot){header.shot=true;shoot();}}else if(dt<1950){pose='throw';if(!header.tossed){header.tossed=true;toss();}}else if(dt<3000){pose='walk';x=dest.x+mix(offset,0,clamp((dt-1950)/1050));}else{offset=0;pose='sit';y=dest.y;if(dt>3300)header=null;}}
  prop.classList.toggle('visible',['draw','aim'].includes(pose));return{x,y,pose};
 }
 function startAbout(t){about={at:t};}
 function aboutFrame(t,dest){if(!about)return null;const dt=t-about.at,glyphs=[...heading.querySelectorAll('.walk-glyph')].filter(e=>e.textContent.trim()),path=glyphs.slice(0,Math.min(19,glyphs.length));let x,y,pose='walk';
  if(dt<650){const first=path[0].getBoundingClientRect();x=first.left-dest.size*.4;y=heading.getBoundingClientRect().bottom+30-dest.height*.9+(1-clamp(dt/650))*dest.height;pose='emerge';}
  else if(dt<1200){const r=heading.getBoundingClientRect(),first=path[0].getBoundingClientRect(),p=clamp((dt-650)/550);x=first.left-dest.size*.4;y=mix(r.bottom+30-dest.height*.9,first.top+parseFloat(getComputedStyle(heading).fontSize)*.16-dest.height*.9,p)-Math.sin(p*Math.PI)*55;pose='float';}
  else if(dt<4050){const p=clamp((dt-1200)/2850)*(path.length-1),i=Math.floor(p),a=path[i].getBoundingClientRect(),b=path[Math.min(i+1,path.length-1)].getBoundingClientRect();x=mix(a.left,b.left,p-i)-dest.size*.4;y=mix(a.top,b.top,p-i)+parseFloat(getComputedStyle(heading).fontSize)*.16-dest.height*.9-Math.abs(Math.sin(dt*.009))*3;if(dt>1950&&dt<2450){pose='stumble';y+=Math.sin((dt-1950)/500*Math.PI)*12;}}
  else if(dt<4850){const last=path.at(-1).getBoundingClientRect(),p=clamp((dt-4050)/800);x=mix(last.left-dest.size*.4,dest.x,p);y=mix(last.top-dest.height*.89,dest.y,p)-Math.sin(p*Math.PI)*60;pose='float';}
  else{about=null;return null;}return{x,y,pose};
 }
 function helpers(t,list){const area=document.querySelector('[data-scene=services]').getBoundingClientRect();if(servicesAt===null&&area.top<innerHeight*.7&&area.bottom>0)servicesAt=t;
  for(const {row,helper,i} of list){const elapsed=servicesAt===null?-1:t-servicesAt-i*550,p=clamp(elapsed/1250),title=row.querySelector('h3');row.dataset.delivery=p===1?'done':elapsed>=0?'pushing':'waiting';row.style.setProperty('--push',p);row.style.setProperty('--push-distance',`${(1-p)*(i%2?1:-1)*Math.max(350,innerWidth*.8)}px`);row.classList.toggle('pushing',elapsed>=0&&p<1);const rr=row.getBoundingClientRect(),tr=title.getBoundingClientRect();helper.style.left=(i%2?tr.right-rr.left:tr.left-rr.left-56)+'px';helper.style.right='auto';}
 }
 function cancel(){header=null;about=null;prop.classList.remove('visible');actor.classList.remove('firing');}
 return{ground,interact,headerFrame,startAbout,aboutFrame,helpers,cancel,get offset(){return offset;},reset(){offset=0;click=0;cancel();}};
}
