import fs from 'node:fs/promises';import path from 'node:path';import {randomUUID} from 'node:crypto';
const text=(v,max=3000)=>{if(typeof v!=='string'||!v.trim()||v.length>max)throw Error('Metin alanlarını kontrol edin.');return v.trim()};
export async function saveEntry(root,input){
 const file=path.join(root,'src/data/panel-content.json');let data;try{data=JSON.parse(await fs.readFile(file,'utf8'))}catch(e){if(e.code!=='ENOENT')throw e;data={projects:[],logos:[]}}
 const created=[];
 async function image(value){const m=/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/.exec(value||'');if(!m)throw Error('PNG, JPG veya WebP görseli seçin.');const bytes=Buffer.from(m[2],'base64');if(!bytes.length||bytes.length>2*1024*1024)throw Error('Görsel en fazla 2 MB olabilir.');const valid=m[1]==='png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):m[1]==='jpeg'?bytes[0]===255&&bytes[1]===216:bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP';if(!valid)throw Error('Görsel dosyası geçersiz.');const name='panel-'+randomUUID()+'.'+(m[1]==='jpeg'?'jpg':m[1]);await fs.writeFile(path.join(root,'src/media',name),bytes);created.push(name);return name;}
 try{if(input.type==='logo'){data.logos.push({name:text(input.name,100),category:text(input.category,100),image:await image(input.image)});}else if(input.type==='project'){
 const slug=text(input.slug,100);if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)||slug==='taslak')throw Error('URL adı küçük harf, sayı ve tire içermeli.');const shipped=JSON.parse(await fs.readFile(path.join(root,'dist/assets/content.json')));if(shipped.projects.some(p=>p.slug===slug))throw Error('Bu URL adı zaten kullanılıyor.');if(!['web','seo','commerce','design'].includes(input.filter))throw Error('Kategori seçin.');
 const work=(input.work||'').split('\n').filter(Boolean).map(line=>{const i=line.indexOf('|');if(i<1)throw Error('Her çalışma satırını Başlık | Açıklama şeklinde yazın.');return[text(line.slice(0,i),150),text(line.slice(i+1),1500)]});if(!work.length||work.length>12)throw Error('1–12 çalışma satırı ekleyin.');
 const cover=await image(input.cover),logo=await image(input.logo),gallery=[];for(const g of input.gallery||[]){if(gallery.length>=8)throw Error('En fazla 8 galeri görseli.');gallery.push([await image(g.image),text(g.caption,150)]);}
 let site='';if(input.site){const url=new URL(input.site);if(url.protocol!=='https:')throw Error('Site bağlantısı https ile başlamalı.');site=url.href;}
 data.projects.push({id:'P'+(data.projects.length+1),slug,brand:text(input.brand,100),title:text(input.title,150),filter:input.filter,category:{web:'Web & AI',seo:'SEO',commerce:'E-ticaret',design:'Marka & tasarım'}[input.filter],period:text(input.period,150),summary:text(input.summary),goal:text(input.goal),role:text(input.role),work,stats:[],note:'',tone:input.filter==='web'?'fashion':'commerce',site,cover,logo,gallery});
 }else throw Error('Kayıt türü geçersiz.');
 await fs.writeFile(file+'.tmp',JSON.stringify(data,null,2));await fs.rename(file+'.tmp',file);return data;
 }catch(e){for(const name of created)await fs.unlink(path.join(root,'src/media',name)).catch(()=>{});throw e;}
}
