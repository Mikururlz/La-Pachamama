import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const queries = [
  {term: 'Dulce de higo', out: 'dulce-de-higo.jpg', folder: 'products'},
  {term: 'Berenjenas en escabeche', out: 'berenjenas-escabeche.jpg', folder: 'products'},
  {term: 'Locoto en aceite', out: 'locoto-aceite.jpg', folder: 'products'},
  {term: 'Pimentón ahumado', out: 'pimenton-ahumado.jpg', folder: 'products'},
  {term: 'Mix para empanadas', out: 'mix-empanadas.jpg', folder: 'products'},
  {term: 'Té de altura', out: 'te-altura.jpg', folder: 'products'},
  {term: 'Cuenco de cerámica', out: 'cuenco-ceramica.jpg', folder: 'products'},
  {term: 'Camino tejido', out: 'camino-tejido.jpg', folder: 'products'},
  {term: 'Canasto de fibra', out: 'canasto-fibra.jpg', folder: 'products'},
  // categories
  {term: 'dulces', out: 'dulces.jpg', folder: 'categories'},
  {term: 'conservas', out: 'conservas.jpg', folder: 'categories'},
  {term: 'especias', out: 'especias.jpg', folder: 'categories'},
  {term: 'artesanias', out: 'artesanias.jpg', folder: 'categories'},
];

function getJson(url){
  return new Promise((resolve,reject)=>{
    const opts = new URL(url);
    opts.headers = { 'User-Agent': 'La-Pachamama-bot/1.0 (contact: dev@example.com)'};
    https.get(opts, res =>{
      let data='';
      res.on('data', chunk=> data+=chunk);
      res.on('end', ()=> resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function download(url,outPath){
  return new Promise((resolve,reject)=>{
    const file = fs.createWriteStream(outPath);
    https.get(url, res =>{
      if(res.statusCode!==200){ reject(new Error('Bad status '+res.statusCode)); return; }
      res.pipe(file);
      file.on('finish', ()=> file.close(resolve));
    }).on('error', reject);
  });
}

async function run(){
  const credits = [];
  for(const q of queries){
    console.log('Searching:', q.term);
    const apiSearch = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch='+encodeURIComponent(q.term)+'&srnamespace=6&srlimit=5';
    try{
      const searchRes = await getJson(apiSearch);
      const results = searchRes.query && searchRes.query.search;
      if(!results || results.length===0){
        console.log('No results for', q.term);
        credits.push({term:q.term, status:'no-results'});
        continue;
      }
      // take first
      const title = results[0].title; // like 'File:Name.jpg'
      console.log('Candidate file:', title);
      const infoApi = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&titles='+encodeURIComponent(title)+'&prop=imageinfo&iiprop=url|extmetadata';
      const infoRes = await getJson(infoApi);
      const pages = infoRes.query && infoRes.query.pages;
      const page = pages && Object.values(pages)[0];
      if(!page || !page.imageinfo){
        console.log('No imageinfo for', title);
        credits.push({term:q.term, status:'no-imageinfo', title});
        continue;
      }
      const ii = page.imageinfo[0];
      const fileUrl = ii.url;
      const meta = ii.extmetadata || {};
      const license = (meta.LicenseShortName && meta.LicenseShortName.value) || (meta.License && meta.License.value) || '';
      const author = (meta.Artist && meta.Artist.value) ? meta.Artist.value.replace(/<[^>]*>/g,'').trim() : '';
      const credit = (meta.Credit && meta.Credit.value) ? meta.Credit.value.replace(/<[^>]*>/g,'').trim() : '';
      const licenseUrl = (meta.LicenseUrl && meta.LicenseUrl.value) ? meta.LicenseUrl.value : '';
      const licenseOk = /Public domain|CC0|Creative Commons|CC BY|CC BY-SA|CC BY-NC|CC BY-ND/i.test(license);
      if(!licenseOk){
        console.log('License not permissive for', title, '-', license);
        credits.push({term:q.term, status:'license-not-permissive', title, license});
        continue;
      }
      // download
      const outDir = path.join(__dirname, '..', 'public', 'images', q.folder);
      if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true});
      const outPath = path.join(outDir, q.out);
      await download(fileUrl, outPath);
      console.log('Saved', outPath);
      credits.push({term:q.term, status:'downloaded', out: '/images/'+q.folder+'/'+q.out, sourceTitle: title, fileUrl, license, licenseUrl, author, credit});
    }catch(e){
      console.error('Error for', q.term, e.message);
      credits.push({term:q.term, status:'error', error:e.message});
    }
  }
  // update IMAGE_CREDITS.md
  const creditPath = path.join(__dirname, '..', 'IMAGE_CREDITS.md');
  let doc = fs.readFileSync(creditPath,'utf8');
  doc += '\n\n## Automatic download results (Wikimedia Commons)\n';
  credits.forEach(c=>{
    doc += '\n- Term: '+c.term+'\n  - Status: '+c.status+'\n';
    if(c.out) doc += '  - Local: '+c.out+'\n';
    if(c.sourceTitle) doc += '  - Source title: '+c.sourceTitle+'\n';
    if(c.fileUrl) doc += '  - File URL: '+c.fileUrl+'\n';
    if(c.license) doc += '  - License: '+c.license+'\n';
    if(c.licenseUrl) doc += '  - License URL: '+c.licenseUrl+'\n';
    if(c.author) doc += '  - Author: '+c.author+'\n';
    if(c.credit) doc += '  - Credit: '+c.credit+'\n';
    if(c.error) doc += '  - Error: '+c.error+'\n';
  });
  fs.writeFileSync(creditPath, doc, 'utf8');
  console.log('Updated', creditPath);
}

run();
