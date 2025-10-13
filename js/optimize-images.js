const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = ['images/types', 'images/brands'];

directories.forEach(dir => {
  const fullDir = path.join(__dirname, '..', dir);
  fs.readdir(fullDir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }
    files.forEach(file => {
      if (file.endsWith('.png')) {
        const input = path.join(fullDir, file);
        const output = path.join(fullDir, file.replace('.png', '.webp'));
        sharp(input)
          .webp({ quality: 80 })
          .toFile(output, (err) => {
            if (err) {
              console.error(`Error converting ${file}:`, err);
            } else {
              console.log(`Converted ${file} to ${output}`);
              // Opcional: borrar original si se desea
              // fs.unlink(input, unlinkErr => { if (unlinkErr) console.error(unlinkErr); });
            }
          });
      }
    });
  });
});