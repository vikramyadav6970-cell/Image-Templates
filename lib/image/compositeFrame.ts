import { CANVAS_SIZE, FRAME_ASSET_PATH } from "@/lib/constants";

export interface CompositeOptions {
  photo: File;
  framePath?: string;
}

/**
 * Draws the uploaded photo cropped to center (object-fit: cover) on a canvas,
 * overlays the transparent frame PNG, and returns the final composite PNG Blob.
 */
export async function compositeFrame(options: CompositeOptions): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not initialize 2D canvas context.");
  }

  // Load an image from a URL string
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  const photoUrl = URL.createObjectURL(options.photo);

  try {
    const [photoImg, frameImg] = await Promise.all([
      loadImage(photoUrl),
      loadImage(options.framePath || FRAME_ASSET_PATH),
    ]);

    const canvasWidth = CANVAS_SIZE;
    const canvasHeight = CANVAS_SIZE;
    
    const imgWidth = photoImg.width;
    const imgHeight = photoImg.height;
    
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;
    
    let sx = 0;
    let sy = 0;
    let sWidth = imgWidth;
    let sHeight = imgHeight;

    if (imgRatio > canvasRatio) {
      // Landscape: photo is wider than square canvas, clip horizontal sides
      sWidth = imgHeight * canvasRatio;
      sx = (imgWidth - sWidth) / 2;
    } else {
      // Portrait or Square: photo is taller than square canvas, clip vertical sides
      sHeight = imgWidth / canvasRatio;
      sy = (imgHeight - sHeight) / 2;
    }

    // Clear canvas and draw photo
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(photoImg, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);

    // Overlay the frame
    ctx.drawImage(frameImg, 0, 0, canvasWidth, canvasHeight);

    // Export to PNG blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to export canvas to PNG blob."));
        }
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(photoUrl);
  }
}
