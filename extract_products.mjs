import fs from 'fs';

const html = fs.readFileSync('flenjure_cache.html', 'utf-8');

// Unescape the Next.js payload quotes
const unescaped = html.replace(/\\"/g, '"').replace(/\\\\/g, '\\');

// Regex to find product objects
const productRegex = /\{"id":"([^"]+)","name":"([^"]+)","slug":"([^"]+)","price":"([^"]*)","compareAtPrice":(null|"[^"]*"),"image":"([^"]+)","hoverImage":(null|"[^"]*"),"category":"([^"]+)","collectionId":(null|"[^"]*"),"inStock":(true|false),"variants":\[(.*?)\],"sizes":\[(.*?)\]\}/g;

let matches = [];
let match;
while ((match = productRegex.exec(unescaped)) !== null) {
  matches.push(match[0]);
}

console.log(`Found ${matches.length} products using regex.`);

if (matches.length > 0) {
  let parsed = matches.map(m => {
    try {
      return JSON.parse(m);
    } catch(e) {
      console.log("Error parsing:", m.substring(0, 50));
      return null;
    }
  }).filter(Boolean);
  
  // Deduplicate by slug
  const unique = [];
  const slugs = new Set();
  for (const p of parsed) {
    if (!slugs.has(p.slug)) {
      unique.push(p);
      slugs.add(p.slug);
    }
  }

  console.log(`Successfully parsed ${unique.length} unique products!`);
  fs.writeFileSync('recovered_products.json', JSON.stringify(unique, null, 2));
  console.log("First product:", unique[0].name);
}
