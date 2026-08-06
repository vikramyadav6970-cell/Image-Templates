/**
 * Converts a HEIC/HEIF file to a standard JPG file client-side.
 * Returns the original file if it is not a HEIC image.
 */
export async function convertHeicToJpeg(file: File): Promise<File> {
  const isHeic =
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif") ||
    file.type === "image/heic" ||
    file.type === "image/heif";

  if (!isHeic) {
    return file;
  }

  try {
    // Dynamic import to prevent server-side import evaluation of browser-only library
    const heic2anyModule = await import("heic2any");
    const heic2any = heic2anyModule.default;

    const blob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    });

    const resultBlob = Array.isArray(blob) ? blob[0] : blob;
    const newName = file.name
      .replace(/\.heic$/i, ".jpg")
      .replace(/\.heif$/i, ".jpg");
    
    return new File([resultBlob], newName, { type: "image/jpeg" });
  } catch (error) {
    console.error("HEIC conversion failed:", error);
    throw new Error("Failed to convert HEIC image. Please try a JPG or PNG instead.");
  }
}
