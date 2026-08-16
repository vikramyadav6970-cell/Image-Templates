"use client";

import React, { useState } from "react";
import { SHARE_TEXT } from "@/lib/constants";

interface ShareButtonProps {
  imageBlob: Blob;
  shareUrl: string | null;
  onUploadSuccess: (url: string) => void;
  onError: (errorMsg: string) => void;
}

export function ShareButton({
  imageBlob,
  shareUrl,
  onUploadSuccess,
  onError,
}: ShareButtonProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleShare = async () => {
    if (isUploading) return;

    // Helper to launch the Twitter web intent
    const openTwitterIntent = (url: string) => {
      const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        SHARE_TEXT
      )}&url=${encodeURIComponent(url)}`;
      
      window.open(intentUrl, "_blank", "noopener,noreferrer");
    };

    // If already uploaded, immediately redirect to Twitter intent
    if (shareUrl) {
      openTwitterIntent(shareUrl);
      return;
    }

    setIsUploading(true);
    onError(""); // Reset any previous error

    try {
      const randomId = Math.random().toString(36).substring(2, 10);
      const filename = `hh-goa-pfp-${randomId}.png`;

      // Upload the binary PNG to our upload endpoint
      const response = await fetch(`/api/upload?filename=${filename}`, {
        method: "POST",
        body: imageBlob,
        headers: {
          "Content-Type": "image/png",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Upload request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      if (!result.url) {
        throw new Error("No URL returned from the storage server.");
      }

      // Convert Vercel Blob public URL to URL-safe Base64
      const blobUrl = result.url;
      const base64Url = btoa(blobUrl)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      // Generate the local share link
      const localShareUrl = `${window.location.origin}/share/${base64Url}`;
      
      // Update state in parent and trigger the intent
      onUploadSuccess(localShareUrl);
      openTwitterIntent(localShareUrl);
    } catch (err: unknown) {
      console.error("Failed to share image:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload image. Please try again.";
      onError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isUploading}
      className={`flex items-center justify-center space-x-2.5 w-full max-w-md py-3.5 px-6 rounded-xl font-bold transition-all duration-100 cursor-pointer border-2 border-black flat-shadow flat-shadow-hover
        ${
          isUploading
            ? "bg-[#E6197A]/40 text-black/50 pointer-events-none"
            : "bg-[#E6197A] text-white"
        }
      `}
    >
      {isUploading ? (
        <>
          <svg
            className="w-5.5 h-5.5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Uploading PFP...</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Share to X (#FrameInGoa)</span>
        </>
      )}
    </button>
  );
}
