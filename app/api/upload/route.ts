import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

/**
 * API route to handle uploading the final composited PNG file to Vercel Blob.
 * Expects the raw image binary to be sent as the request body.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename") || "hh-goa-2026-pfp.png";

    if (!request.body) {
      return NextResponse.json(
        { error: "No image data received. Request body is empty." },
        { status: 400 }
      );
    }

    // Read the binary stream as an ArrayBuffer and wrap as Blob for compatibility
    const arrayBuffer = await request.arrayBuffer();
    const imageBlob = new Blob([arrayBuffer], { type: "image/png" });

    if (imageBlob.size === 0) {
      return NextResponse.json(
        { error: "Received an empty image file (0 bytes)." },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob with public access
    const blobResult = await put(filename, imageBlob, {
      access: "public",
    });

    return NextResponse.json(blobResult);
  } catch (error: unknown) {
    console.error("Vercel Blob upload failed:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown server error";
    
    return NextResponse.json(
      { error: `Storage upload failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
