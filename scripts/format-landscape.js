import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { existsSync } from 'fs';

const GALLERY_DIR = 'public/gallery';
const OUTPUT_DIR = 'public/gallery-formatted';
const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 800; // 3:2 landscape aspect ratio
const QUALITY = 85;

const categories = ['all', 'beach-wedding', 'hotel-wedding', 'decor', 'ceremony', 'dinner-reception'];

// Special rotation for specific images
const rotations = {
  'hotel-wedding/DSC_5934.jpg': 270,
};

async function formatImages() {
  console.log('Formatting all images to landscape (1200x800)...\n');

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  let processedCount = 0;

  for (const category of categories) {
    const inputDir = join(GALLERY_DIR, category);
    const outputDir = join(OUTPUT_DIR, category);

    if (!existsSync(inputDir)) {
      console.log(`Skipping ${category} - directory not found`);
      continue;
    }

    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    const files = await readdir(inputDir);
    const imageFiles = files.filter(f =>
      ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase())
    );

    console.log(`Processing ${category} (${imageFiles.length} images)...`);

    for (const file of imageFiles) {
      const inputPath = join(inputDir, file);
      const outputPath = join(outputDir, file);
      const imageKey = `${category}/${file}`;

      try {
        let pipeline = sharp(inputPath);

        // Apply rotation if needed
        if (rotations[imageKey]) {
          pipeline = pipeline.rotate(rotations[imageKey]);
        }

        // Resize and crop to exact landscape dimensions
        await pipeline
          .resize(TARGET_WIDTH, TARGET_HEIGHT, {
            fit: 'cover',
            position: 'center',
          })
          .jpeg({ quality: QUALITY, progressive: true })
          .toFile(outputPath);

        processedCount++;
        console.log(`  ✓ ${file}`);
      } catch (err) {
        console.error(`  ✗ Error processing ${file}:`, err.message);
      }
    }
    console.log('');
  }

  console.log('='.repeat(50));
  console.log(`Processed: ${processedCount} images`);
  console.log(`All images are now ${TARGET_WIDTH}x${TARGET_HEIGHT} (landscape)`);
  console.log('\nFormatted images saved to:', OUTPUT_DIR);
  console.log('\nTo apply changes, run:');
  console.log('rm -rf public/gallery && mv public/gallery-formatted public/gallery');
}

formatImages().catch(console.error);
