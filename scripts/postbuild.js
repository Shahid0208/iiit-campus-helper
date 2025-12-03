const fs = require('fs');
const path = require('path');

const base = '/iiit-campus-helper/';
const timestamp = Date.now();
const files = [path.join(__dirname, '..', 'dist', 'index.html'), path.join(__dirname, '..', 'dist', '404.html')];

files.forEach((file) => {
  if (!fs.existsSync(file)) return;
  let s = fs.readFileSync(file, 'utf8');

  // Add cache-busting query param to CSS and JS assets under the repo base
  s = s.replace(new RegExp(`(href=\")(${base}assets\\/[^\"']+\\.css)(\")`, 'g'), `$1$2?v=${timestamp}$3`);
  s = s.replace(new RegExp(`(src=\")(${base}assets\\/[^\"']+\\.js)(\")`, 'g'), `$1$2?v=${timestamp}$3`);

  fs.writeFileSync(file, s, 'utf8');
  console.log('Postbuild: updated', file);
});
