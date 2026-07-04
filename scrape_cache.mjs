import https from 'https';
import fs from 'fs';

https.get('https://flenjure.com/shop', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('flenjure_cache.html', data);
    console.log(`Saved HTML to flenjure_cache.html`);
  });
});
