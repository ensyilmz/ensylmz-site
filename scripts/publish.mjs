import {execFile} from 'node:child_process';import {promisify} from 'node:util';import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const run=promisify(execFile),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),remote='https://github.com/ensyilmz/ensylmz-site.git';
const git=(...args)=>run('git',args,{cwd:root,windowsHide:true,timeout:120000,maxBuffer:1024*1024});
export async function publish(){
 await run(process.execPath,['scripts/build.mjs'],{cwd:root,windowsHide:true});await run(process.execPath,['scripts/check.mjs'],{cwd:root,windowsHide:true});
 try{await fs.access(path.join(root,'.git'))}catch{await git('init','-b','main');await git('config','user.name','Enes Yılmaz');await git('config','user.email','ensylmz34@gmail.com');await git('remote','add','origin',remote);}
 const origin=(await git('remote','get-url','origin')).stdout.trim();if(origin!==remote)throw Error('Bu klasör başka bir GitHub deposuna bağlı; gönderim durduruldu.');
 await git('add','src','scripts','.github','.gitignore','package.json','README.md','BASLAT.cmd');const diff=await git('diff','--cached','--name-only');if(diff.stdout.trim())await git('commit','-m','Update portfolio content and local panel');
 try{await git('push','-u','origin','HEAD:main')}catch{throw Error('GitHub gönderimi tamamlanamadı. Bilgisayardaki GitHub oturumunu doğrulayın; yerel kayıtlarınız korunuyor. Gönderim geçmişi uyuşmazsa zorla gönderim yapılmaz.');}
}
if(process.argv[1]===fileURLToPath(import.meta.url))await publish();
