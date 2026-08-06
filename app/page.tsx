"use client";

import React, { useState, useEffect } from "react";
import { UploadZone } from "@/components/UploadZone";
import { FramePreview } from "@/components/FramePreview";
import { DownloadButton } from "@/components/DownloadButton";
import { ShareButton } from "@/components/ShareButton";
import { compositeFrame } from "@/lib/image/compositeFrame";

export default function Home() {
  const [compositeBlob, setCompositeBlob] = useState<Blob | null>(null);
  const [compositeUrl, setCompositeUrl] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clean up object URL when component unmounts or before a new one is set
  useEffect(() => {
    return () => {
      if (compositeUrl) {
        URL.revokeObjectURL(compositeUrl);
      }
    };
  }, [compositeUrl]);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    // Revoke old URL if it exists
    if (compositeUrl) {
      URL.revokeObjectURL(compositeUrl);
      setCompositeUrl(null);
    }
    setCompositeBlob(null);
    setShareUrl(null);

    try {
      const blob = await compositeFrame({ photo: file });
      const url = URL.createObjectURL(blob);
      setCompositeBlob(blob);
      setCompositeUrl(url);
    } catch (err: unknown) {
      console.error("Frame composition failed:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate your frame. Please try another image."
      );
      setCompositeBlob(null);
      setCompositeUrl(null);
      setShareUrl(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (compositeUrl) {
      URL.revokeObjectURL(compositeUrl);
      setCompositeUrl(null);
    }
    setCompositeBlob(null);
    setShareUrl(null);
    setError(null);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-between w-full min-h-screen px-4 py-8 md:py-12 bg-radial from-[#121b2e] via-[#090d16] to-[#05070c]">
      {/* Top Header */}
      <header className="w-full max-w-4xl flex flex-col items-center text-center space-y-3 mb-8 md:mb-12">
        <div className="inline-flex items-center space-x-2 py-1 px-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
          <span>Goa 2026 Hackathon</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            HH GOA
          </span>{" "}
          PFP Framer
        </h1>
        <p className="max-w-md text-sm md:text-base text-slate-400 leading-relaxed">
          Instantly overlay the official HH Goa 2026 hackathon branding onto your profile picture.
        </p>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-lg flex flex-col items-center justify-center flex-1">
        {/* Error Message */}
        {error && (
          <div className="w-full max-w-md mb-6 p-4 rounded-xl border border-red-950 bg-red-950/30 text-red-300 text-sm flex items-start space-x-3 shadow-lg">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="w-full flex flex-col items-center">
          {!compositeBlob || !compositeUrl ? (
            <UploadZone
              onFileSelect={handleFileSelect}
              onError={setError}
              isProcessing={isProcessing}
            />
          ) : (
            <div className="w-full flex flex-col items-center space-y-6 animate-fadeIn">
              <FramePreview imageUrl={compositeUrl} />

              <div className="w-full max-w-md flex flex-col space-y-3">
                <DownloadButton imageBlob={compositeBlob} />

                <ShareButton
                  imageBlob={compositeBlob}
                  shareUrl={shareUrl}
                  onUploadSuccess={setShareUrl}
                  onError={setError}
                />
                
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-slate-300 hover:text-white bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-200 cursor-pointer"
                >
                  Upload a Different Photo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center mt-12 md:mt-16 pt-6 border-t border-slate-900">
        <p className="text-xs text-slate-600">
          HH Goa 2026 Profile Framer &bull; Fully Client-Side Process &bull; No Login Required
        </p>
      </footer>
    </main>
  );
}
