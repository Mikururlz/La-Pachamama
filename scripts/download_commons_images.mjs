import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const queries = [
  {term: 'dulce de higo', out: 'dulce-de-higo.jpg', folder: 'products'},
  {term: 'berenjenas en escabeche', out: 'berenjenas-escabeche.jpg', folder: 'products'},
  {term: 'locoto en aceite', out: 'locoto-aceite.jpg', folder: 'products'},
  {term: 'pimenton ahumado', out: 'pimenton-ahumado.jpg', folder: 'products'},
  {term: 'mix para empanadas especias', out: 'mix-empanadas.jpg', folder: 'products'},
  {term: 'te de altura', out: 'te-altura.jpg', folder: 'products'},
  {term: 'cuenco de ceramica', out: 'cuenco-ceramica.jpg', folder: 'products'},
  {term: 'camino tejido', out: 'camino-tejido.jpg', folder: 'products'},
  {term: 'canasto de fibra', out: 'canasto-fibra.jpg', folder: 'products'},
  // categories
  {term: 'dulces', out: 'dulces.jpg', folder: 'categories'},
  {term: 'conservas', out: 'conservas.jpg', folder: 'categories'},
  {term: 'especias', out: 'especias.jpg', folder: 'categories'},
  {term: 'artesanias', out: 'artesanias.jpg', folder: 'categories'},
];

function fetch(url){
  return new Promise((resolve,reject)=>{
    https.get(url, res =>{
      let data='';
      res.on('data', chunk=> data+=chunk);
      res.on('end', ()=> resolve({statusCode: res.statusCode, headers: res.headers, body: data}));
    }).on('error', reject);
  });
}

async function run(){
  const credits = [];
  for(const q of queries){
    console.log('Searching:', q.term);
    const searchUrl = 'https://commons.wikimedia.org/w/index.php?search='+encodeURIComponent(q.term)+'&title=Special:Search&profile=default&fulltext=1&type=image';
    try{
      const res = await fetch(searchUrl);
      const body = res.body;
      const m = body.match(/href="(\/wiki\/File:[^"#?]+)"/);
      if(!m){
        console.log('No file link found for', q.term);
        credits.push({term:q.term, status:'no-file-found'});
        continue;
      }
      const filePath = m[1];
      const filePage = 'https://commons.wikimedia.org'+filePath;
      console.log('Found file page', filePage);
      const fileRes = await fetch(filePage);
      const fileBody = fileRes.body;
      const um = fileBody.match(/href="(https?:)?(\/\/upload\.wikimedia\.org\/[^"]+)"/);
      if(!um){
        console.log('No upload link for', filePage);
        credits.push({term:q.term, status:'no-upload-link', filePage});
        continue;
      }
      let fileUrl = um[2];
      if(fileUrl.startsWith('//')) fileUrl = 'https:'+fileUrl;
      console.log('Image URL:', fileUrl);
      let license='';
      const licenseMatch = fileBody.match(/License[\s\S]{0,300}?href="([^"]+)"[^>]*>([^<]+)</);
      if(licenseMatch){
        license = licenseMatch[2] + ' ('+licenseMatch[1]+')';
      } else {
        const lic2 = fileBody.match(/class="licensetpl[^"]*">([\s\S]{0,200}?)<\//);
        if(lic2) license = lic2[1].replace(/\s+/g,' ').trim();
      }
      const authorMatch = fileBody.match(/(?:Author|Creator)[\s\S]{0,200}?>([^<]+)</);
      const author = authorMatch ? authorMatch[1].replace(/\s+/g,' ').trim() : '';
      const ok = /Public domain|CC0|CC BY|Creative Commons|CC BY-SA|CC BY-NC|CC BY-ND/i.test(license || '') || /creativecommons/i.test(fileBody);
      if(!ok){
        console.log('License not clearly permissive for', q.term, '-> keeping placeholder');
        credits.push({term:q.term, status:'license-not-permissive', license, author, filePage});
        continue;
      }
      const outDir = path.join(__dirname, '..', 'public', 'images', q.folder);
      if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true});
      const outPath = path.join(outDir, q.out);
      await new Promise((resolve2,reject2)=>{
        const file = fs.createWriteStream(outPath);
        https.get(fileUrl, res2 =>{
          if(res2.statusCode!==200){ reject2(new Error('Bad status '+res2.statusCode)); return; }
          res2.pipe(file);
          file.on('finish', ()=>{ file.close(resolve2); });
        }).on('error', reject2);
      });
      console.log('Saved', outPath);
      credits.push({term:q.term, status:'downloaded', out: '/images/'+q.folder+'/'+q.out, source:filePage, fileUrl, license, author});
    }catch(e){
      console.error('Error for', q.term, e.message);
      credits.push({term:q.term, status:'error', error: e.message});
    }
  }
  const creditPath = path.join(__dirname, '..', 'IMAGE_CREDITS.md');
  let doc = fs.readFileSync(creditPath,'utf8');
  doc += '\n\n## Download results:\n';
  credits.forEach(c=>{
    doc += '\n- Term: '+c.term+'\n  - Status: '+c.status+'\n';
    if(c.out) doc += '  - Local: '+c.out+'\n';
    if(c.source) doc += '  - Source page: '+c.source+'\n';
    if(c.fileUrl) doc += '  - File URL: '+c.fileUrl+'\n';
    if(c.license) doc += '  - License: '+c.license+'\n';
    if(c.author) doc += '  - Author: '+c.author+'\n';
    if(c.error) doc += '  - Error: '+c.error+'\n';
  });
  fs.writeFileSync(creditPath, doc, 'utf8');
  console.log('Done. Credits updated at', creditPath);
}

run();
