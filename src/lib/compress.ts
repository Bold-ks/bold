import imageCompression from 'browser-image-compression';

const IMAGE_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 2000,
  useWebWorker: true,
  fileType: 'image/webp' as const,
};

/**
 * Compress an image file client-side before upload.
 * Converts to WebP, max 1MB, max 2000px.
 * Returns the compressed file with .webp extension.
 * Non-image files (videos etc.) pass through unchanged.
 */
export async function compressFile(file: File): Promise<File> {
  // Only compress images, pass through videos and other files
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // Skip if already small enough (< 500KB)
  if (file.size < 500 * 1024) {
    return file;
  }

  try {
    const compressed = await imageCompression(file, IMAGE_OPTIONS);
    // Rename to .webp
    const newName = file.name.replace(/\.[^.]+$/, '.webp');
    return new File([compressed], newName, { type: 'image/webp' });
  } catch (err) {
    console.warn('Image compression failed, using original:', err);
    return file;
  }
}

/**
 * Compress multiple files.
 */
export async function compressFiles(files: File[]): Promise<File[]> {
  return Promise.all(files.map(compressFile));
}
