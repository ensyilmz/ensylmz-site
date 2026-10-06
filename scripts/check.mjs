import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {projects,logos} from '../src/data/content.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
async function walk(dir){let out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(f));else out.push(f);}return out;}
const saved=JSON.parse(await fs.readFile(path.join(root,'assets/content.json'),'utf8'));
const files=await walk(root);let count=0,errors=[];
for(const file of files.filter(f=>f.endsWith('.html'))){const html=await fs.readFile(file,'utf8');for(const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)){let url=decodeURIComponent(match[1].split(/[?#]/)[0]);if(url.endsWith('/'))url+='index.html';try{await fs.access(path.join(root,url));count++;}catch{errors.push(`${path.relative(root,file)} -> ${match[1]}`);}}if(!html.includes('lang="tr"')||!html.includes('<h1>')||!html.includes('name="description"'))errors.push(`${file}: temel sayfa bilgileri eksik`);}
if(saved.projects.length<7||new Set(saved.projects.map(p=>p.slug)).size!==saved.projects.length)errors.push('Referans URL kontrolü başarısız.');
if(saved.logos.length<14)errors.push('Başlangıç logoları eksik.');
if(files.some(f=>f.includes('enes-kariyer')))errors.push('Kariyer ekranları herkese açık dosyalara eklenmiş.');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`OK: ${files.filter(f=>f.endsWith('.html')).length} HTML page, ${count} internal link/asset references, ${saved.projects.length} projects, ${saved.logos.length} logos. No private CV screenshots.`);

