import sharp from 'sharp';

const inputPath = '/Users/hannaiuchanka/Projects/amara-website/public/gallery/hotel-wedding/DSC_5664.JPG';
const outputPath = '/Users/hannaiuchanka/Projects/amara-website/public/gallery/hotel-wedding/DSC_5664.jpg';

sharp(inputPath)
  .resize(1200, 800, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 85, progressive: true })
  .toFile(outputPath)
  .then(() => console.log('Done! Formatted DSC_5664.jpg'))
  .catch(err => console.error('Error:', err));
