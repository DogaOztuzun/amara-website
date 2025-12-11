import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const GALLERY_DIR = 'public/gallery';
const OUTPUT_DIR = 'public/gallery-optimized';
const MAX_WIDTH = 1200;
const QUALITY = 80;

const categories = ['all', 'beach-wedding', 'hotel-wedding', 'decor', 'ceremony', 'dinner-reception'];

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  let totalOriginal = 0;
  let totalOptimized = 0;
  let processedCount = 0;

  for (const category of categories) {
    const inputDir = join(GALLERY_DIR, category);
    const outputDir = join(OUTPUT_DIR, category);

    if (!existsSync(inputDir)) {
      console.log(`Skipping ${category} - directory not found`);
      continue;
    }

    // Create category output directory
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
      const outputName = basename(file, extname(file)) + '.jpg';
      const outputPath = join(outputDir, outputName);

      try {
        const inputStats = await sharp(inputPath).metadata();
        const inputSize = (await sharp(inputPath).toBuffer()).length;
        totalOriginal += inputSize;

        await sharp(inputPath)
          .resize(MAX_WIDTH, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({ quality: QUALITY, progressive: true })
          .toFile(outputPath);

        const outputSize = (await sharp(outputPath).toBuffer()).length;
        totalOptimized += outputSize;
        processedCount++;

        const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
        console.log(`  ✓ ${file}: ${(inputSize / 1024 / 1024).toFixed(1)}MB → ${(outputSize / 1024).toFixed(0)}KB (${savings}% smaller)`);
      } catch (err) {
        console.error(`  ✗ Error processing ${file}:`, err.message);
      }
    }
    console.log('');
  }

  console.log('='.repeat(50));
  console.log(`Processed: ${processedCount} images`);
  console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Optimized total: ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Total savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
  console.log('\nOptimized images saved to:', OUTPUT_DIR);
  console.log('\nNext steps:');
  console.log('1. Review the optimized images in', OUTPUT_DIR);
  console.log('2. If satisfied, run: rm -rf public/gallery && mv public/gallery-optimized public/gallery');
  console.log('3. Update Gallery.tsx to use .jpg extensions for all images');
}

optimizeImages().catch(console.error);
