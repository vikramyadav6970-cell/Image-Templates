"use client";

import React from "react";

interface DownloadButtonProps {
  imageBlob: Blob;
}

export function DownloadButton({ imageBlob }: DownloadButtonProps) {
  const handleDownload = () => {
    try {
      const url = URL.createObjectURL(imageBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "hh-goa-2026-pfp.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download image:", err);
      alert("Could not download image. Please try pressing and holding the image to save it.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center justify-center space-x-2.5 w-full max-w-md py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
    >
      <svg
        className="w-5.5 h-5.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      <span>Download Frame PFP</span>
    </button>
  );
}
