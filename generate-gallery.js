import fs from 'fs';
import path from 'path';

const GALLERY_DIR = './public/images/gallery';
const OUTPUT_FILE = './src/data/galleryData.js';

// Updated Category Map
const categoryMap = {
  'male-beff': 'Male BEFF',
  'female-beff': 'Female BEFF',
  'vehicles': 'Vehicles'
};

const generateData = () => {
  const images = [];
  let idCounter = 1;

  if (!fs.existsSync(GALLERY_DIR)) return;

  const folders = fs.readdirSync(GALLERY_DIR);

  folders.forEach(folder => {
    const folderPath = path.join(GALLERY_DIR, folder);
    
    if (fs.lstatSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath);

      files.forEach(file => {
        if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
          // Creates a clean title like "Vehicle 001" or "M-Beff 042"
          const cleanTitle = file.replace('.webp', '').replace(/-/g, ' ').toUpperCase();
          
          images.push({
            id: idCounter++,
            title: cleanTitle,
            cat: categoryMap[folder] || 'Other',
            url: `/images/gallery/${folder}/${file}`
          });
        }
      });
    }
  });

  const content = `// AUTO-GENERATED - DO NOT EDIT\nexport const galleryImages = ${JSON.stringify(images, null, 2)};`;
  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`✅ Indexed ${images.length} assets.`);
};

generateData();