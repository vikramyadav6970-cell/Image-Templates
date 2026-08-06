export const alt = "HH Goa 2026 Branded PFP";
export const size = {
  width: 1080,
  height: 1080,
};
export const contentType = "image/png";

interface OpenGraphImageProps {
  params: Promise<{ imageId: string }>;
}

/**
 * Dynamic OG image route. Next.js App Router treats this route as the
 * metadata og:image generator for /share/[imageId].
 */
export default async function Image({ params }: OpenGraphImageProps) {
  const resolvedParams = await params;

  try {
    // Decode the URL-safe Base64 string back to the full Vercel Blob URL
    const decodedUrl = Buffer.from(
      resolvedParams.imageId.replace(/-/g, "+").replace(/_/g, "/"),
      "base64"
    ).toString("utf-8");

    // Fetch the PNG binary from Vercel Blob
    const response = await fetch(decodedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from storage bucket: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // Serve the image data directly with the appropriate caching headers
    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: unknown) {
    console.error("Failed to generate dynamic OG image:", error);
    
    // Fallback 404 response if the image cannot be loaded
    return new Response("Image Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
