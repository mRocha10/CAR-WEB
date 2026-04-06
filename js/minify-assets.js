const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const Terser = require('terser');

// Directorios
const cssDir = path.join(__dirname, '../css');
const jsDir = path.join(__dirname, '.');

// Minificar la hoja de estilo unificada actual
const unifiedCssFile = path.join(cssDir, 'site-unified.css');
if (fs.existsSync(unifiedCssFile)) {
  const cssContent = fs.readFileSync(unifiedCssFile, 'utf8');
  const output = new CleanCSS({ level: 2 }).minify(cssContent);
  const minCssFile = path.join(cssDir, 'site-unified.min.css');
  fs.writeFileSync(minCssFile, output.styles);
  console.log(`Created minified unified CSS: ${minCssFile}`);
} else {
  console.warn('site-unified.css not found. CSS minification skipped.');
}

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
