import {panelApi} from './panel-api.mjs';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{try{if(await panelApi(req,res,path.dirname(root),port))return;const url=new URL(req.url,'http://localhost');let decoded=decodeURIComponent(url.pathname);if(decoded.endsWith('/'))decoded+='index.html';let file=path.resolve(root,'.'+decoded);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}try{if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);}catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await fs.readFile(path.join(root,'404.html')));}}catch{res.writeHead(400);res.end('Bad request');}}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
