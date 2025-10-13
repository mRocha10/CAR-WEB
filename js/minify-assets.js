const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const Terser = require('terser');

// Directorios
const cssDir = path.join(__dirname, '../css');
const jsDir = path.join(__dirname, '.');

// Lista de CSS en orden de importación desde global.css
const cssFiles = [
  'about.css',
  'brands.css',
  'car-tools.css',
  'car-types.css',
  'comments.css',
  'comparison.css',
  'component-detail.css',
  'components.css',
  'enhanced-comparison.css',
  'enhanced-ui.css',
  'responsive.css',
  'style.css'
];

// Concatenar y minificar CSS
let concatenatedCSS = '';
cssFiles.forEach(file => {
  const filePath = path.join(cssDir, file);
  if (fs.existsSync(filePath)) {
    concatenatedCSS += fs.readFileSync(filePath, 'utf8') + '\n';
  }
});
const output = new CleanCSS({ level: 2 }).minify(concatenatedCSS); // level 2 for aggressive optimization
const minCssFile = path.join(cssDir, 'global.min.css');
fs.writeFileSync(minCssFile, output.styles);
console.log(`Created minified global CSS: ${minCssFile}`);

// Minificar JS
const jsToMinify = ['car-comparison.js', 'comments.js', 'script.js'];
jsToMinify.forEach(file => {
  const filePath = path.join(jsDir, file);
  if (fs.existsSync(filePath)) {
    Terser.minify(fs.readFileSync(filePath, 'utf8')).then(result => {
      const minFile = filePath.replace('.js', '.min.js');
      fs.writeFileSync(minFile, result.code);
      console.log(`Minified JS: ${minFile}`);
    }).catch(err => console.error(`Error minifying ${file}: ${err}`));
  }
});