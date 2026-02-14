import type { ImageBounds } from '../types/CardData';

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(file: File): ImageValidationResult {
  // Check file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Only PNG, JPG, and WebP formats are supported',
    };
  }

  // Check file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must be less than 5MB',
    };
  }

  return { valid: true };
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function drawContainedImage(
  ctx: CanvasRenderingContext2D,
  imageSrc: string,
  bounds: ImageBounds
): Promise<void> {
  try {
    const img = await loadImage(imageSrc);

    const imgAspect = img.width / img.height;
    const boundsAspect = bounds.width / bounds.height;

    let drawWidth = bounds.width;
    let drawHeight = bounds.height;
    let drawX = bounds.x;
    let drawY = bounds.y;

    if (imgAspect > boundsAspect) {
      // Image wider than bounds - fit to width
      drawHeight = bounds.width / imgAspect;
      drawY = bounds.y + (bounds.height - drawHeight) / 2;
    } else {
      // Image taller than bounds - fit to height
      drawWidth = bounds.height * imgAspect;
      drawX = bounds.x + (bounds.width - drawWidth) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  } catch (error) {
    console.error('Failed to load image:', error);
  }
}
