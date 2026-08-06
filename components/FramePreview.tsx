"use client";

import React from "react";

interface FramePreviewProps {
  imageUrl: string;
}

export function FramePreview({ imageUrl }: FramePreviewProps) {
  return (
    <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="HH Goa 2026 Branded PFP"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute top-3 left-3 bg-emerald-500/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full shadow-[0_2px_10px_rgba(16,185,129,0.3)]">
        Ready
      </div>
    </div>
  );
}
