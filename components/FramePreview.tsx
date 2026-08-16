"use client";

import React from "react";

interface FramePreviewProps {
  imageUrl: string;
}

export function FramePreview({ imageUrl }: FramePreviewProps) {
  return (
    <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-[#0D2E18] border-3 border-black flat-shadow group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="HH Goa 2026 Branded PFP"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
      />
      <div className="absolute top-3 left-3 bg-[#FFD400] text-black text-[10px] font-extrabold uppercase tracking-widest py-1 px-3.5 rounded-full border-2 border-black flat-shadow">
        Ready
      </div>
    </div>
  );
}
