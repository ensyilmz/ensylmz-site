import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.addInitScript(()=>sessionStorage.setItem('ey-arrival-v5','1'));await p.goto('http://127.0.0.1:4173/');
 const response=await p.request.get('http://127.0.0.1:4173/assets/media/space-ambient.mp3');if(!response.ok()||!response.headers()['content-type'].includes('audio/mpeg'))throw Error('MP3 response');
 await p.locator('.core-journey').evaluate(e=>scrollTo(0,e.offsetTop+900));await p.mouse.click(5,300);await p.waitForFunction(()=>{const a=document.querySelector('#journey-soundtrack');return a&&!a.paused&&a.volume>.025});
 const time=await p.locator('audio').evaluate(a=>a.currentTime);await p.locator('#secili-isler').evaluate(e=>scrollTo(0,e.offsetTop+200));await p.waitForTimeout(1300);
 if(!await p.locator('audio').evaluate((a,t)=>!a.paused&&a.currentTime>t+1,time))throw Error('Continuity');
 await p.locator('.orbit-sound').click();await p.waitForTimeout(350);if(!await p.locator('audio').evaluate(a=>a.paused&&a.volume===0))throw Error('Mute');
 await p.locator('.orbit-sound').click();await p.waitForTimeout(1300);if(!await p.locator('audio').evaluate(a=>!a.paused&&a.volume>.025))throw Error('Resume');
 await p.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await p.waitForTimeout(1400);await p.locator('#astronaut').click();await p.waitForTimeout(1900);if(!await p.locator('audio').evaluate(a=>a.paused&&a.volume===0))throw Error('Return silence');await p.waitForTimeout(2100);if(await p.evaluate(()=>scrollY)>1)throw Error('Return position');
 if(errors.length)throw Error(errors.join('\n'));console.log('PASS: MP3 playback, continuous cube-to-works music, mute/resume and silent rocket return');
}finally{await browser.close();}



