import fs from 'node:fs/promises';import path from 'node:path';import {execFile} from 'node:child_process';import {promisify} from 'node:util';import {saveEntry} from './panel-store.mjs';import {publish} from './publish.mjs';
const run=promisify(execFile);let busy=false;
export async function panelApi(req,res,root,port){
 if(!req.url.startsWith('/api/'))return false;
 const send=(code,data)=>{res.writeHead(code,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
 const host='127.0.0.1:'+port;if(req.headers.host!==host||(req.headers.origin&&req.headers.origin!=='http://'+host)){send(403,{error:'Yerel panelden açın.'});return true;}
 if(req.method==='GET'&&req.url==='/api/panel'){let data;try{data=JSON.parse(await fs.readFile(path.join(root,'src/data/panel-content.json')))}catch(e){if(e.code!=='ENOENT')throw e;data={projects:[],logos:[]}}send(200,data);return true;}
 if(req.method!=='POST'||req.headers.origin!=='http://'+host||!req.headers['content-type']?.startsWith('application/json')){send(403,{error:'İstek reddedildi.'});return true;}
 if(busy){send(409,{error:'Önce devam eden kaydın bitmesini bekleyin.'});return true;}busy=true;
 try{let body='',size=0;for await(const chunk of req){size+=chunk.length;if(size>24*1024*1024)throw Error('Toplam yükleme 24 MB sınırını aşıyor.');body+=chunk;}
 if(req.url==='/api/panel'){const file=path.join(root,'src/data/panel-content.json');const previous=await fs.readFile(file).catch(()=>null);await saveEntry(root,JSON.parse(body));try{await run(process.execPath,['scripts/build.mjs'],{cwd:root,windowsHide:true});}catch(e){if(previous)await fs.writeFile(file,previous);else await fs.unlink(file);throw Error('Sayfa oluşturulamadı; içerik kaydı geri alındı.');}send(200,{saved:true});}
 else if(req.url==='/api/publish'){const input=JSON.parse(body);await publish(input.token);send(200,{published:true});}else send(404,{error:'İşlem bulunamadı.'});
 }catch(e){send(400,{error:e.message})}finally{busy=false;}return true;
}
