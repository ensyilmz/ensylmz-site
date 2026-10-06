export function setupSound(){
 const audio=new Audio('/assets/media/space-ambient.mp3');audio.preload='metadata';audio.loop=true;audio.volume=0;audio.id='journey-soundtrack';audio.hidden=true;document.body.append(audio);
 const button=document.createElement('button');button.className='orbit-sound';button.type='button';button.innerHTML='<span class="sound-core"><span class="sound-ring"></span><span class="sound-wave">'+Array.from({length:7},(_,i)=>'<i style="--bar:'+i+'"></i>').join('')+'</span><span class="sound-satellite"></span></span><span class="sound-label">SES HAZIR</span>';document.body.append(button);
 let armed=true,inside=false,returning=false,target=0,raf,playingAttempt=false,disposed=false,last=performance.now();
 const wanted=()=>armed&&inside&&!returning&&!document.hidden;
 function ui(){const playing=wanted()&&!audio.paused;button.dataset.state=!armed?'off':playing?'playing':'waiting';button.setAttribute('aria-pressed',String(armed));button.setAttribute('aria-label',armed?'Arka plan müziğini kapat':'Arka plan müziğini aç');button.querySelector('.sound-label').textContent=!armed?'SESİ AÇ':playing?'SPACE AMBIENT':'SESİ BAŞLAT';}
 async function update(){if(wanted()){if(audio.paused&&!playingAttempt){playingAttempt=true;try{await audio.play();}catch{}finally{playingAttempt=false;}}target=wanted()&&!audio.paused?.035:0;}else target=0;ui();}
 function frame(now){if(disposed)return;const dt=Math.min((now-last)/1000,.1);last=now;if(!wanted())target=0;const rate=returning||!armed?.9:.14;const difference=target-audio.volume;audio.volume=Math.max(0,Math.min(.035,audio.volume+Math.sign(difference)*Math.min(Math.abs(difference),dt*rate)));if(target===0&&audio.volume<.0001&&!audio.paused&&!playingAttempt){audio.pause();ui();}raf=requestAnimationFrame(frame);}
 function unlock(e){if(e.target?.closest?.('.orbit-sound'))return;if(armed)update();}
 document.addEventListener('pointerdown',unlock,{passive:true});document.addEventListener('keydown',unlock);document.addEventListener('visibilitychange',update);button.addEventListener('click',()=>{if(!(armed&&audio.paused&&inside))armed=!armed;update();});audio.addEventListener('error',()=>{target=0;button.querySelector('.sound-label').textContent='SES AÇILAMADI';});raf=requestAnimationFrame(frame);ui();
 return {setArea(value,isReturning=false){if(value!==inside||returning!==isReturning){inside=value;returning=isReturning;button.classList.toggle('in-area',inside);update();}},dispose(){disposed=true;cancelAnimationFrame(raf);audio.pause();audio.remove();button.remove();document.removeEventListener('pointerdown',unlock);document.removeEventListener('keydown',unlock);document.removeEventListener('visibilitychange',update);}};
}



