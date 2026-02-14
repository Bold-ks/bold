/**
 * Media optimization script for Bold Kosova
 * - Images >5MB: Convert PNG → WebP (quality 85, max 2000px wide)
 * - Videos: Re-encode H.264 CRF 28, no audio, max 1080p, faststart
 * - Uploads compressed version, updates all DB references, keeps originals
 */

import sharp from 'sharp';
import { execSync } from 'child_process';
import { writeFileSync, readFileSync, mkdirSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = 'https://faxrokxcygmqpxrvesoc.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheHJva3hjeWdtcXB4cnZlc29jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgyOTM2NiwiZXhwIjoyMDg2NDA1MzY2fQ.riKd-UumHlIXM8YjqmcZ-d85WvMVAgtS2wkKX1Gd6Vk';
const FFMPEG = 'C:\\Users\\Kiro\\.openclaw\\workspace\\node_modules\\@ffmpeg-installer\\win32-x64\\ffmpeg.exe';
const TMP_DIR = './tmp-optimize';
const MIN_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB threshold

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
};

// Tables that reference media URLs
const REFERENCE_TABLES = [
  { table: 'media', column: 'url' },
  { table: 'product_images', column: 'url' },
  { table: 'product_variants', column: 'image_url' },
  { table: 'product_story_blocks', column: 'image_url' },
  { table: 'products', column: 'hero_media_url' },
  { table: 'products', column: 'featured_image_url' },
  { table: 'site_content', column: 'media_url' },
];

if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true });

async function fetchAllMedia() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/media?select=id,url,filename,size,mime_type&order=size.desc`, { headers });
  return await res.json();
}

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
  return buffer.length;
}

async function uploadToStorage(bucket, path, filePath, contentType) {
  const fileData = readFileSync(filePath);
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': contentType,
      'x-upsert': 'true',
    },
    body: fileData,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload failed: ${err}`);
  }
  // Get public URL
  const { data } = await fetch(`${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`, {
    method: 'HEAD',
    headers,
  }).catch(() => ({ data: null }));
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

async function updateReferences(oldUrl, newUrl) {
  let updated = 0;
  for (const { table, column } of REFERENCE_TABLES) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${column}=eq.${encodeURIComponent(oldUrl)}`, {
      method: 'PATCH',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ [column]: newUrl }),
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      updated += data.length;
    }
  }
  // Also update media table size and mime_type
  return updated;
}

async function updateMediaRecord(url, newSize, newMimeType, newFilename) {
  await fetch(`${SUPABASE_URL}/rest/v1/media?url=eq.${encodeURIComponent(url)}`, {
    method: 'PATCH',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ size: newSize, mime_type: newMimeType, filename: newFilename }),
  });
}

async function optimizeImage(media) {
  const ext = media.filename?.split('.').pop()?.toLowerCase() || 'png';
  const tmpIn = join(TMP_DIR, `in_${media.id}.${ext}`);
  const tmpOut = join(TMP_DIR, `out_${media.id}.webp`);
  
  try {
    console.log(`  ⬇ Downloading ${(media.size/1024/1024).toFixed(1)}MB...`);
    await downloadFile(media.url, tmpIn);
    
    console.log(`  🔧 Converting to WebP...`);
    await sharp(tmpIn)
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(tmpOut);
    
    const newSize = readFileSync(tmpOut).length;
    const savings = ((1 - newSize / media.size) * 100).toFixed(0);
    console.log(`  ✅ ${(media.size/1024/1024).toFixed(1)}MB → ${(newSize/1024/1024).toFixed(1)}MB (${savings}% smaller)`);
    
    // Determine storage bucket and path from URL
    const urlPath = new URL(media.url).pathname;
    const match = urlPath.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!match) {
      console.log(`  ⚠ Could not parse storage path from URL, skipping`);
      return null;
    }
    const [, bucket, origPath] = match;
    const newPath = origPath.replace(/\.[^.]+$/, '.webp').replace(/^(.+)$/, 'optimized/$1');
    
    console.log(`  ⬆ Uploading optimized version...`);
    const newUrl = await uploadToStorage(bucket, newPath, tmpOut, 'image/webp');
    
    console.log(`  🔗 Updating ${REFERENCE_TABLES.length} reference tables...`);
    const refs = await updateReferences(media.url, newUrl);
    await updateMediaRecord(newUrl, newSize, 'image/webp', media.filename.replace(/\.[^.]+$/, '.webp'));
    console.log(`  ✓ Updated ${refs} references`);
    
    return { oldUrl: media.url, newUrl, oldSize: media.size, newSize, refs };
  } finally {
    if (existsSync(tmpIn)) unlinkSync(tmpIn);
    if (existsSync(tmpOut)) unlinkSync(tmpOut);
  }
}

async function optimizeVideo(media) {
  const ext = media.filename?.split('.').pop()?.toLowerCase() || 'mp4';
  const tmpIn = join(TMP_DIR, `in_${media.id}.${ext}`);
  const tmpOut = join(TMP_DIR, `out_${media.id}.mp4`);
  
  try {
    console.log(`  ⬇ Downloading ${(media.size/1024/1024).toFixed(1)}MB...`);
    await downloadFile(media.url, tmpIn);
    
    console.log(`  🔧 Re-encoding (H.264 CRF 28, 1080p, no audio)...`);
    const cmd = `"${FFMPEG}" -i "${tmpIn}" -c:v libx264 -crf 28 -preset slow -vf "scale='min(1920,iw)':-2" -an -movflags +faststart -y "${tmpOut}"`;
    execSync(cmd, { stdio: 'pipe', timeout: 300000 }); // 5 min timeout
    
    const newSize = readFileSync(tmpOut).length;
    const savings = ((1 - newSize / media.size) * 100).toFixed(0);
    console.log(`  ✅ ${(media.size/1024/1024).toFixed(1)}MB → ${(newSize/1024/1024).toFixed(1)}MB (${savings}% smaller)`);
    
    const urlPath = new URL(media.url).pathname;
    const match = urlPath.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!match) {
      console.log(`  ⚠ Could not parse storage path from URL, skipping`);
      return null;
    }
    const [, bucket, origPath] = match;
    const newPath = `optimized/${origPath}`;
    
    console.log(`  ⬆ Uploading optimized version...`);
    const newUrl = await uploadToStorage(bucket, newPath, tmpOut, 'video/mp4');
    
    console.log(`  🔗 Updating references...`);
    const refs = await updateReferences(media.url, newUrl);
    await updateMediaRecord(newUrl, newSize, 'video/mp4', media.filename);
    console.log(`  ✓ Updated ${refs} references`);
    
    return { oldUrl: media.url, newUrl, oldSize: media.size, newSize, refs };
  } finally {
    if (existsSync(tmpIn)) unlinkSync(tmpIn);
    if (existsSync(tmpOut)) unlinkSync(tmpOut);
  }
}

// Main
console.log('🚀 Bold Kosova Media Optimization\n');
const allMedia = await fetchAllMedia();

const bigImages = allMedia.filter(m => m.mime_type?.startsWith('image') && m.size > MIN_IMAGE_SIZE);
const videos = allMedia.filter(m => m.mime_type?.startsWith('video'));

console.log(`Found ${bigImages.length} images >5MB and ${videos.length} videos to optimize\n`);

const results = [];
let totalSaved = 0;

// Process images first
for (let i = 0; i < bigImages.length; i++) {
  const media = bigImages[i];
  console.log(`\n📸 [${i+1}/${bigImages.length}] ${media.filename}`);
  try {
    const result = await optimizeImage(media);
    if (result) {
      results.push(result);
      totalSaved += result.oldSize - result.newSize;
    }
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }
}

// Process videos
for (let i = 0; i < videos.length; i++) {
  const media = videos[i];
  console.log(`\n🎬 [${i+1}/${videos.length}] ${media.filename}`);
  try {
    const result = await optimizeVideo(media);
    if (result) {
      results.push(result);
      totalSaved += result.oldSize - result.newSize;
    }
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`✅ Optimization complete!`);
console.log(`   Files processed: ${results.length}`);
console.log(`   Total saved: ${(totalSaved/1024/1024).toFixed(0)}MB`);
console.log(`   Original total: ${(results.reduce((s,r)=>s+r.oldSize,0)/1024/1024).toFixed(0)}MB`);
console.log(`   New total: ${(results.reduce((s,r)=>s+r.newSize,0)/1024/1024).toFixed(0)}MB`);

// Save results log
writeFileSync(join(TMP_DIR, 'optimization-log.json'), JSON.stringify(results, null, 2));
console.log(`\n📋 Full log saved to ${TMP_DIR}/optimization-log.json`);
console.log(`\n⚠️ Original files are still in storage. Delete them after confirming quality.`);
