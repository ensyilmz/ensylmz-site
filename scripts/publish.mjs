import {execFile} from 'node:child_process';import {promisify} from 'node:util';import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const run=promisify(execFile),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),remote='https://github.com/ensyilmz/ensylmz-site.git';
const git=(...args)=>run('git',args,{cwd:root,windowsHide:true,timeout:120000,maxBuffer:1024*1024});
export async function publish(token){
 if(typeof token!=='string'||!/^github_pat_[A-Za-z0-9_]{20,250}$/.test(token))throw Error('GitHub erişim anahtarını girin.');
 let auth;try{auth=await fetch('https://api.github.com/user',{headers:{Authorization:'Bearer '+token,'User-Agent':'ensylmz-panel'},signal:AbortSignal.timeout(15000)});}catch{throw Error('GitHub bağlantısı kurulamadı.');}
 if(!auth.ok||(await auth.json()).login!=='ensyilmz')throw Error('Anahtar geçersiz veya ensyilmz hesabına ait değil.');
 const authenticatedGit=(...args)=>run('git',args,{cwd:root,windowsHide:true,timeout:120000,maxBuffer:1024*1024,env:{...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never',GIT_CONFIG_COUNT:'1',GIT_CONFIG_KEY_0:'credential.helper',GIT_CONFIG_VALUE_0:'',GIT_ASKPASS:path.join(root,'scripts/git-askpass.cmd'),ENSYLMZ_AUTH_NODE:process.execPath,ENSYLMZ_AUTH_TOKEN:token}});
 await run(process.execPath,['scripts/build.mjs'],{cwd:root,windowsHide:true});await run(process.execPath,['scripts/check.mjs'],{cwd:root,windowsHide:true});
 try{await fs.access(path.join(root,'.git'))}catch{await git('init','-b','main');await git('config','user.name','Enes Yılmaz');await git('config','user.email','ensylmz34@gmail.com');await git('remote','add','origin',remote);}
 const origin=(await git('remote','get-url','origin')).stdout.trim();if(origin!==remote)throw Error('Bu klasör başka bir GitHub deposuna bağlı; gönderim durduruldu.');
 let hasHead=true;try{await git('rev-parse','--verify','HEAD')}catch{hasHead=false;}
 if(!hasHead){try{await authenticatedGit('fetch','origin','main');await git('reset','--mixed','origin/main');}catch{throw Error('Depo geçmişi alınamadı. Anahtarın ensylmz-site erişimini kontrol edin.');}}
 await git('add','src','scripts','.github','.gitignore','package.json','README.md','BASLAT.cmd');const diff=await git('diff','--cached','--name-only');if(diff.stdout.trim())await git('commit','-m','Update portfolio content and local panel');
 try{await authenticatedGit('push','-u','origin','HEAD:main')}catch{throw Error('Gönderim tamamlanamadı. Anahtarın bu depo için Contents: Read and write iznini ve süresini kontrol edin. Yerel kayıtlarınız korunuyor.');}
}
if(process.argv[1]===fileURLToPath(import.meta.url))throw Error('GitHub gönderimini panelden erişim anahtarı girerek yapın.');
