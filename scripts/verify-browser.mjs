import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await fs.mkdir(path.join(root,'qa'),{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();const errors=[];const checks=[];
page.on('pageerror',e=>errors.push(e.message));
const assert=(test,label)=>{if(!test)throw Error(label);checks.push(label)};
async function loadImages(target){await target.locator('main img').evaluateAll(els=>els.forEach(el=>el.loading='eager'));await target.waitForFunction(()=>[...document.querySelectorAll('main img')].every(el=>el.complete&&el.naturalWidth>0));await target.locator('main img').evaluateAll(els=>Promise.all(els.map(el=>el.decode().catch(()=>{}))));const height=await target.evaluate(()=>document.documentElement.scrollHeight);const step=target.viewportSize().height;for(let y=0;y<height;y+=step){await target.evaluate(y=>scrollTo(0,y),y);await target.waitForTimeout(70);}await target.evaluate(()=>scrollTo(0,0));await target.waitForTimeout(150);}
await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
assert(await page.locator('html').getAttribute('data-theme')==='dark','Default dark theme');
assert(await page.locator('h1').innerText()==='Dijitalde\nbir iz bırak.','Home content');
await loadImages(page);await page.screenshot({path:path.join(root,'qa/anasayfa-koyu.png'),fullPage:true});await page.screenshot({path:path.join(root,'qa/ilk-ekran-koyu.png')});
await page.locator('.theme-toggle').click();
assert(await page.locator('html').getAttribute('data-theme')==='light','Light theme toggle');
await page.reload();assert(await page.locator('html').getAttribute('data-theme')==='light','Theme remembered');
await loadImages(page);await page.screenshot({path:path.join(root,'qa/anasayfa-acik.png'),fullPage:true});await page.screenshot({path:path.join(root,'qa/ilk-ekran-acik.png')});
await page.goto('http://127.0.0.1:4173/referanslar/');
assert(await page.locator('.project-card').count()===7,'Seven separate references');
await page.locator('[data-project-filter=seo]').click();
assert(await page.locator('.project-card:visible').count()===3,'SEO filter selects 3 projects');
await page.locator('[data-project-filter=all]').click();
const hrefs=await page.locator('.project-card').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
for(const href of hrefs){await page.goto('http://127.0.0.1:4173'+href);assert(await page.locator('h1').count()===1,'Project heading '+href);await page.locator('main img').evaluateAll(els=>els.forEach(el=>el.loading='eager'));await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(el=>el.complete&&el.naturalWidth>0));assert(true,'Project images '+href);}
await page.goto('http://127.0.0.1:4173/projeler/moda-icin-dijital-deneyim/');
await page.locator('[data-zoom]').first().click();assert(await page.locator('dialog').evaluate(el=>el.open),'Image modal opens');await page.keyboard.press('Escape');assert(await page.locator('dialog').evaluate(el=>!el.open),'Image modal closes with Escape');
await page.goto('http://127.0.0.1:4173/calismalar/');assert(await page.locator('.logo-tile').count()===14,'Fourteen logo works');await page.locator('.logo-tile').first().click();assert(await page.locator('.logo-tile').first().getAttribute('aria-pressed')==='true','Logo tap color toggle');
await loadImages(page);await page.screenshot({path:path.join(root,'qa/logolar-acik.png'),fullPage:true});
await page.goto('http://127.0.0.1:4173/iletisim/');await page.locator('[name=name]').fill('Test kullanıcı');await page.locator('[name=email]').fill('test@example.com');await page.locator('[name=message]').fill('İlk sürüm akış kontrolü.');
await page.evaluate(()=>{window.__outbound=[];window.open=(url)=>{window.__outbound.push(url);return null;};});
await page.locator('button[value=whatsapp]').click();const url=await page.evaluate(()=>window.__outbound[0]);assert(url.startsWith('https://wa.me/905357023316?text=')&&decodeURIComponent(url).includes('Test kullanıcı'),'WhatsApp receives correctly prepared message without sending');
await page.goto('http://127.0.0.1:4173/panel/');
await page.locator('[name=brand]').fill('QA marka');await page.locator('[name=title]').fill('QA yerel çalışma');await page.locator('[name=slug]').fill('qa-yerel-calisma');await page.locator('[name=period]').fill('2026');await page.locator('[name=summary]').fill('Tarayıcı kontrolü için yerel taslak.');await page.locator('[name=role]').fill('Taslak önizlemesi.');
await page.locator('[name=cover]').setInputFiles(path.join(root,'dist/assets/media/intime-orijinal.png'));await page.locator('[name=logo]').setInputFiles(path.join(root,'dist/assets/media/intime-orijinal.png'));await page.locator('#project-draft-form button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#admin-status').textContent.includes('kaydedildi'));assert(await page.locator('#draft-list').innerText().then(s=>s.includes('QA marka')),'Reference draft saved');
await page.goto('http://127.0.0.1:4173/referanslar/');assert(await page.locator('.project-card').count()===8,'Draft shown in references');await page.locator('.local-card').click();assert(await page.locator('h1').innerText()==='QA yerel çalışma','Draft detail route');
await page.goto('http://127.0.0.1:4173/panel/');await page.locator('[data-admin-tab=logo]').click();await page.locator('#logo-draft-form [name=name]').fill('QA logo');await page.locator('#logo-draft-form [name=category]').fill('Test');await page.locator('#logo-draft-form [name=image]').setInputFiles(path.join(root,'dist/assets/media/intime-orijinal.png'));await page.locator('#logo-draft-form button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#admin-status').textContent.includes('Logo taslağı'));const downloadPromise=page.waitForEvent('download');await page.locator('#export-drafts').click();const download=await downloadPromise;await download.saveAs(path.join(root,'qa/taslak-akis-kontrolu.json'));assert(true,'Draft JSON export');
await page.locator('[data-delete="logo:0"]').click();await page.locator('#import-drafts').setInputFiles(path.join(root,'qa/taslak-akis-kontrolu.json'));await page.waitForFunction(()=>document.querySelector('#admin-status').textContent.includes('birleştirildi'));assert((await page.locator('#draft-list').innerText()).includes('QA logo'),'Draft import restores logo');
await page.goto('http://127.0.0.1:4173/calismalar/');assert(await page.locator('.logo-tile').count()===15,'Logo draft shown in gallery');
await page.evaluate(()=>localStorage.removeItem('ey-local-drafts-v1'));
const mobile=await context.newPage();await mobile.setViewportSize({width:390,height:844});
for(const route of ['/', '/hakkimda/','/referanslar/','/calismalar/','/hizmetler/','/iletisim/','/panel/','/projeler/moda-icin-dijital-deneyim/','/projeler/pazaryerinde-moda-operasyonlari/']){await mobile.goto('http://127.0.0.1:4173'+route);const overflow=await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert(!overflow,'Mobile no horizontal overflow '+route);}
await mobile.goto('http://127.0.0.1:4173/');await mobile.locator('.theme-toggle').click();await mobile.locator('.menu-toggle').click();assert(await mobile.locator('#mobile-menu').isVisible(),'Mobile menu opens');await mobile.locator('#mobile-menu a[href="/hakkimda/"]').click();assert(mobile.url().includes('/hakkimda/'),'Mobile menu navigation');await mobile.goto('http://127.0.0.1:4173/');await loadImages(mobile);await mobile.screenshot({path:path.join(root,'qa/anasayfa-telefon.png'),fullPage:true});await mobile.screenshot({path:path.join(root,'qa/ilk-ekran-telefon.png')});
await mobile.setViewportSize({width:320,height:740});for(const route of ['/','/hakkimda/','/calismalar/','/panel/','/iletisim/']){await mobile.goto('http://127.0.0.1:4173'+route);const ok=await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1);if(!ok)console.log(await mobile.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,cls:el.className,right:el.getBoundingClientRect().right})).slice(0,20)));assert(ok,'320px no horizontal overflow '+route);}
assert(errors.length===0,'No browser runtime errors');
const motion=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});const motionPage=await motion.newPage();motionPage.on('pageerror',e=>errors.push(e.message));await motionPage.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});const firstFrame=await motionPage.locator('#orbital-canvas').evaluate(el=>el.toDataURL());await motionPage.waitForTimeout(150);const secondFrame=await motionPage.locator('#orbital-canvas').evaluate(el=>el.toDataURL());assert(firstFrame!==secondFrame,'Orbital animation changes frames');await motionPage.waitForSelector('.arrival-overlay',{state:'detached'});await motionPage.locator('.project-card').first().scrollIntoViewIfNeeded();await motionPage.waitForTimeout(900);assert(await motionPage.locator('.project-card').first().evaluate(el=>el.classList.contains('visible')),'Scroll reveal appears');assert(errors.length===0,'No motion runtime errors');await motion.close();
await fs.writeFile(path.join(root,'qa/kontrol-sonuclari.json'),JSON.stringify({date:new Date().toISOString(),checks,errors},null,2));
console.log('PASS: '+checks.length+' browser checks; '+errors.length+' runtime errors. Screenshots in qa/.');await browser.close();


