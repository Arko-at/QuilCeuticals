import fs from 'fs';
import path from 'path';

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getAllFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json')) {
      // Exclude products.json
      if (file !== 'products.json') {
        fileList.push(path.join(dir, file));
      }
    }
  }
  return fileList;
}

const files = getAllFiles('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  content = content.replace(/Flenjure/g, 'QuilCeuticals');
  content = content.replace(/flenjure/g, 'quilceuticals');
  content = content.replace(/FLENJURE/g, 'QUILCEUTICALS');
  content = content.replace(/Flenure/g, 'QuilCeuticals');
  content = content.replace(/flenure/g, 'quilceuticals');

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
