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
    <main className="relative flex-1 flex flex-col items-center justify-between w-full min-h-screen px-4 py-8 md:py-12 overflow-x-hidden">
      
      {/* BACKGROUND VECTOR ART WORKSPACE */}
      <div className="fixed inset-0 overflow-hidden select-none -z-10 pointer-events-none bg-[#1B8A4A]">
        <svg 
          viewBox="0 0 1440 800" 
          preserveAspectRatio="xMidYMid slice" 
          className="w-full h-full"
        >
          <defs>
            <clipPath id="sand-clip">
              <path d="M 0 540 C 360 520, 720 560, 1080 530 C 1260 515, 1350 535, 1440 525 L 1440 800 L 0 800 Z" />
            </clipPath>
          </defs>

          {/* Mountains/Hills in Background */}
          <path 
            d="M-50 420 Q 200 375 450 412 T 950 395 Q 1200 375 1500 420 L 1500 440 L-50 440 Z" 
            fill="#238D4F" 
            stroke="#000000" 
            strokeWidth="2" 
          />

          {/* Rotating Sun Rays Group */}
          <g transform="translate(720, 420)" className="animate-sun-ray-spin">
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((angle, i) => {
              const length = i % 2 === 0 ? 340 : 260;
              return (
                <line
                  key={angle}
                  x1="0"
                  y1="0"
                  x2={Math.cos((angle * Math.PI) / 180) * length}
                  y2={Math.sin((angle * Math.PI) / 180) * length}
                  stroke="#FFC700"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              );
            })}
          </g>

          {/* Sun Semicircle */}
          <path 
            d="M 540 420 A 180 180 0 0 1 900 420 Z" 
            fill="#FFC700" 
            stroke="#000000" 
            strokeWidth="2" 
          />

          {/* Water Zone (Horizon at 420) */}
          <rect 
            x="-50" 
            y="420" 
            width="1540" 
            height="140" 
            fill="#127A42" 
            stroke="#000000" 
            strokeWidth="2" 
          />

          {/* Water Waves detail lines */}
          <path d="M 120 445 Q 160 440 200 445" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className="animate-wave" />
          <path d="M 920 450 Q 960 445 1000 450" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className="animate-wave" />
          <path d="M 50 480 Q 90 475 130 480" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className="animate-wave" />
          <path d="M 1300 475 Q 1340 470 1380 475" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" className="animate-wave" />

          {/* Water reflection yellow bands (stepped/broken bands) */}
          <g fill="#FFC700">
            {/* Shimmer Group Odd */}
            <g className="animate-water-shimmer-odd">
              <rect x="620" y="435" width="200" height="4.5" rx="2" stroke="#000000" strokeWidth="1.5" />
              <rect x="650" y="455" width="140" height="4.5" rx="2" stroke="#000000" strokeWidth="1.5" />
              <rect x="680" y="480" width="80" height="4.5" rx="2" stroke="#000000" strokeWidth="1.5" />
            </g>
            {/* Shimmer Group Even */}
            <g className="animate-water-shimmer-even">
              <rect x="590" y="445" width="260" height="4.5" rx="2" stroke="#000000" strokeWidth="1.5" />
              <rect x="635" y="468" width="170" height="4.5" rx="2" stroke="#000000" strokeWidth="1.5" />
              <rect x="700" y="492" width="40" height="4.5" rx="2" stroke="#000000" strokeWidth="1.5" />
            </g>
          </g>

          {/* Bobbing Boat */}
          <g className="animate-boat-bob">
            {/* Base hull */}
            <path d="M 280 460 L 340 460 L 330 475 L 290 475 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
            {/* Cabin */}
            <rect x="295" y="450" width="20" height="10" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            {/* Tiny green flag */}
            <polygon points="315,450 325,453 315,456" fill="#1B8A4A" stroke="#000000" strokeWidth="1.2" />
          </g>

          {/* Sand Beach (White #FCFAF0 for a sophisticated off-white look) */}
          <path 
            d="M -50 540 C 360 520, 720 560, 1080 530 C 1260 515, 1350 535, 1500 525 L 1500 850 L -50 850 Z" 
            fill="#FCFAF0" 
            stroke="#000000" 
            strokeWidth="2.5" 
          />

          {/* Scalloped waves boundary details on sand */}
          <path d="M 0 542 Q 180 528 360 542 T 720 542 T 1080 542 T 1440 542" fill="none" stroke="#FFFFFF" strokeWidth="3" />

          {/* Beach Hut / Kiosk (Right sand side) */}
          <g transform="translate(930, 480)">
            {/* Base cabin walls */}
            <rect x="0" y="45" width="200" height="95" fill="#3AA965" stroke="#000" strokeWidth="2" />
            {/* Inside shadow/opening */}
            <rect x="15" y="65" width="115" height="50" fill="#0D2E18" stroke="#000" strokeWidth="1.5" />
            {/* Counter bar */}
            <rect x="10" y="115" width="125" height="8" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
            {/* Human silhouette inside kiosk */}
            <path d="M 60 115 C 60 97, 85 97, 85 115 Z" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
            <circle cx="72.5" cy="90" r="7" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
            {/* Stools */}
            <line x1="35" y1="123" x2="35" y2="140" stroke="#000" strokeWidth="2" />
            <ellipse cx="35" cy="123" rx="8" ry="2.5" fill="#3AA965" stroke="#000" strokeWidth="1.5" />
            <line x1="72" y1="123" x2="72" y2="140" stroke="#000" strokeWidth="2" />
            <ellipse cx="72" cy="123" rx="8" ry="2.5" fill="#3AA965" stroke="#000" strokeWidth="1.5" />
            <line x1="108" y1="123" x2="108" y2="140" stroke="#000" strokeWidth="2" />
            <ellipse cx="108" cy="123" rx="8" ry="2.5" fill="#3AA965" stroke="#000" strokeWidth="1.5" />
            {/* Main Roof */}
            <polygon points="-15,45 100,5 215,45" fill="#238D4F" stroke="#000" strokeWidth="2" />
            {/* Kiosk Door */}
            <rect x="145" y="65" width="40" height="75" fill="#0D2E18" stroke="#000" strokeWidth="1.8" />
            {/* Pink signboard "COA BEACH" */}
            <rect x="20" y="15" width="105" height="30" fill="#E6197A" stroke="#000" strokeWidth="2" />
            <text x="72.5" y="34" fill="#FFFFFF" fontSize="10.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">
              COA BEACH
            </text>
            {/* Backpack/gear on the right */}
            <path d="M 205 115 C 195 115, 185 125, 185 140 L 225 140 C 225 125, 215 115, 205 115 Z" fill="#FFC700" stroke="#000" strokeWidth="1.8" />
            <circle cx="205" cy="128" r="4" fill="#FCFAF0" stroke="#000" strokeWidth="1.5" />
          </g>

          {/* Surfboards (leaning near kiosk) */}
          <g transform="translate(820, 520)">
            {/* Board 1 (Green/White stripe) */}
            <path d="M 15 0 C 30 40, 30 80, 15 115 C 0 80, 0 40, 15 0 Z" fill="#FCFAF0" stroke="#000" strokeWidth="2" />
            <path d="M 15 0 C 22 40, 22 80, 15 115" fill="none" stroke="#3AA965" strokeWidth="3" />
            {/* Board 2 (Yellow) */}
            <path d="M 45 10 C 60 50, 60 90, 45 125 C 30 90, 30 50, 45 10 Z" fill="#FFC700" stroke="#000" strokeWidth="2" />
          </g>

          {/* Umbrellas & Lounge Chairs (Left side) */}
          <g transform="translate(240, 510)">
            {/* Lounge chair 1 */}
            <path d="M 10 50 L 50 50 L 70 20" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="50" x2="15" y2="62" stroke="#000" strokeWidth="2" />
            <line x1="45" y1="50" x2="42" y2="62" stroke="#000" strokeWidth="2" />
            {/* Umbrella 1 */}
            <line x1="80" y1="60" x2="60" y2="0" stroke="#000" strokeWidth="2.2" />
            <path d="M 20 15 C 20 -15, 100 -15, 100 15 Z" fill="#FFC700" stroke="#000" strokeWidth="2.2" />
            {/* Umbrella stripes */}
            <path d="M 40 12 C 43 -5, 50 -10, 60 -10 C 70 -10, 77 -5, 80 12" fill="none" stroke="#FCFAF0" strokeWidth="4.5" />
          </g>

          <g transform="translate(440, 520)">
            {/* Lounge chair 2 */}
            <path d="M 10 50 L 50 50 L 70 20" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="50" x2="15" y2="62" stroke="#000" strokeWidth="2" />
            <line x1="45" y1="50" x2="42" y2="62" stroke="#000" strokeWidth="2" />
            {/* Umbrella 2 */}
            <line x1="80" y1="60" x2="70" y2="0" stroke="#000" strokeWidth="2.2" />
            <path d="M 30 15 C 30 -15, 110 -15, 110 15 Z" fill="#FCFAF0" stroke="#000" strokeWidth="2.2" />
            {/* Stripes */}
            <path d="M 50 12 C 53 -5, 60 -10, 70 -10 C 80 -10, 87 -5, 90 12" fill="none" stroke="#FFC700" strokeWidth="4.5" />
          </g>

          {/* Left Large Leaning Palm Tree */}
          <g transform="translate(-80, 200)" className="animate-palm-sway-1">
            {/* Trunk */}
            <path d="M 150 600 Q 200 400 120 150 L 155 150 Q 230 400 185 600 Z" fill="#FFC700" stroke="#000" strokeWidth="2.5" />
            {/* Trunk inner cream stripe */}
            <path d="M 168 595 Q 212 400 138 150" fill="none" stroke="#FCFAF0" strokeWidth="3" />
            {/* Leaves Group */}
            <g transform="translate(138, 150)">
              {/* Fronds */}
              <path d="M 0 0 Q -100 -50 -180 20 Q -90 10 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              <path d="M 0 0 Q -120 -120 -50 -180 Q -20 -90 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              <path d="M 0 0 Q 80 -140 140 -80 Q 60 -40 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              <path d="M 0 0 Q 140 -40 200 60 Q 90 20 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              <path d="M 0 0 Q -20 60 -60 120 Q -40 40 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              {/* Leaf Veins */}
              <path d="M 0 0 Q -90 -15 -180 20" fill="none" stroke="#0D2E18" strokeWidth="1.8" />
              <path d="M 0 0 Q -70 -70 -50 -180" fill="none" stroke="#0D2E18" strokeWidth="1.8" />
              <path d="M 0 0 Q 70 -70 140 -80" fill="none" stroke="#0D2E18" strokeWidth="1.8" />
              <path d="M 0 0 Q 90 -10 200 60" fill="none" stroke="#0D2E18" strokeWidth="1.8" />
            </g>
          </g>

          {/* Right Large Leaning Palm Tree */}
          <g transform="translate(1320, 180)" className="animate-palm-sway-2">
            {/* Trunk */}
            <path d="M 120 620 Q 30 410 120 170 L 85 170 Q 0 410 85 620 Z" fill="#FFC700" stroke="#000" strokeWidth="2.5" />
            {/* Trunk inner cream stripe */}
            <path d="M 98 615 Q 18 410 98 170" fill="none" stroke="#FCFAF0" strokeWidth="3" />
            {/* Leaves Group */}
            <g transform="translate(98, 170)">
              {/* Fronds */}
              <path d="M 0 0 Q 100 -50 180 20 Q 90 10 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              <path d="M 0 0 Q 120 -120 50 -180 Q 20 -90 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              <path d="M 0 0 Q -80 -140 -140 -80 Q -60 -40 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              <path d="M 0 0 Q -140 -40 -200 60 Q -90 20 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              <path d="M 0 0 Q 20 60 60 120 Q 40 40 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="2" />
              {/* Leaf Veins */}
              <path d="M 0 0 Q 90 -15 180 20" fill="none" stroke="#0D2E18" strokeWidth="1.8" />
              <path d="M 0 0 Q 70 -70 50 -180" fill="none" stroke="#0D2E18" strokeWidth="1.8" />
              <path d="M 0 0 Q -70 -70 -140 -80" fill="none" stroke="#0D2E18" strokeWidth="1.8" />
              <path d="M 0 0 Q -90 -10 -200 60" fill="none" stroke="#0D2E18" strokeWidth="1.8" />
            </g>
          </g>

          {/* Additional Small Palm Trees in Sand */}
          <g transform="translate(380, 480)" className="animate-palm-sway-2">
            <path d="M 20 140 Q 50 80 15 0 L 23 0 Q 55 80 28 140 Z" fill="#FFC700" stroke="#000" strokeWidth="1.8" />
            <g transform="translate(20,0)">
              <path d="M 0 0 Q -50 -30 -80 10 Q -40 5 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="1.8" />
              <path d="M 0 0 Q 50 -30 80 10 Q 40 5 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="1.8" />
              <path d="M 0 0 Q 0 -60 20 -80 Q 10 -40 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="1.8" />
            </g>
          </g>

          <g transform="translate(1120, 450)" className="animate-palm-sway-1">
            <path d="M 20 140 Q -10 80 15 0 L 23 0 Q 2 80 28 140 Z" fill="#FFC700" stroke="#000" strokeWidth="1.8" />
            <g transform="translate(20,0)">
              <path d="M 0 0 Q -50 -30 -80 10 Q -40 5 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="1.8" />
              <path d="M 0 0 Q 50 -30 80 10 Q 40 5 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="1.8" />
              <path d="M 0 0 Q 0 -60 -20 -80 Q -10 -40 0 0" fill="#1B8A4A" stroke="#000" strokeWidth="1.8" />
            </g>
          </g>

          {/* Silhouettes walking across the screen */}
          <g className="animate-walk-lr">
            <g transform="translate(0, 520)">
              {/* Person silhouette - elegant path style */}
              <circle cx="50" cy="18" r="5" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
              <path d="M 50 23 C 47 23, 44 26, 44 32 L 44 48 L 47 72" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 50 44 L 53 72" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 40 28 L 50 25 L 59 36" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 45 23 L 55 23 L 53 45 L 47 45 Z" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
            </g>
          </g>

          <g className="animate-walk-rl">
            <g transform="translate(0, 530)">
              {/* Another person silhouette */}
              <circle cx="50" cy="18" r="5" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
              <path d="M 50 23 C 47 23, 44 26, 44 32 L 44 48 L 46 72" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 50 44 L 54 72" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 41 36 L 50 25 L 60 28" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M 45 23 L 55 23 L 53 45 L 47 45 Z" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
            </g>
          </g>

          {/* Roofs of beach huts visible at the very bottom edge of frame */}
          <g transform="translate(50, 715)">
            <polygon points="0,90 80,40 160,90" fill="#238D4F" stroke="#000" strokeWidth="2" />
            <rect x="15" y="90" width="130" height="80" fill="#3AA965" stroke="#000" strokeWidth="2" />
          </g>
          <g transform="translate(300, 735)">
            <polygon points="0,80 70,30 140,80" fill="#3AA965" stroke="#000" strokeWidth="2" />
            <rect x="15" y="80" width="110" height="70" fill="#238D4F" stroke="#000" strokeWidth="2" />
            <circle cx="70" cy="55" r="9" fill="#FFC700" stroke="#000" strokeWidth="1.8" />
          </g>
          <g transform="translate(1200, 705)">
            <polygon points="0,90 90,40 180,90" fill="#238D4F" stroke="#000" strokeWidth="2" />
            <rect x="20" y="90" width="140" height="80" fill="#3AA965" stroke="#000" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* FOREGROUND CONTENT AREA */}
      {/* Top Header */}
      <header className="w-full max-w-4xl flex flex-col items-center text-center space-y-3.5 mb-6 md:mb-8 z-10">
        <div className="inline-flex items-center space-x-2 py-1.5 px-4.5 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-[#E6197A] border-2 border-black flat-shadow">
          <span>Goa 2026 Hackathon</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
          HH GOA PFP FRAMER
        </h1>
        <p className="max-w-md text-sm md:text-base text-white/90 font-medium drop-shadow-[1px_1px_0px_rgba(0,0,0,0.8)] leading-relaxed">
          Instantly overlay the official HH Goa 2026 hackathon branding onto your profile picture.
        </p>
      </header>

      {/* Main Container Card */}
      <div className="w-full max-w-lg flex flex-col items-center justify-center flex-grow z-10 my-4">
        {/* Error Message */}
        {error && (
          <div className="w-full max-w-md mb-6 p-4 rounded-xl border-2 border-black bg-red-100 text-red-900 text-sm font-semibold flex items-start space-x-3 flat-shadow">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-700"
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

        {/* Content Card with Glass/Flat Retro Overhaul */}
        <div className="w-full max-w-md p-6 md:p-8 rounded-2xl border-2 border-black bg-[#0B301A]/90 backdrop-blur-md flat-shadow flex flex-col items-center">
          {!compositeBlob || !compositeUrl ? (
            <UploadZone
              onFileSelect={handleFileSelect}
              onError={setError}
              isProcessing={isProcessing}
            />
          ) : (
            <div className="w-full flex flex-col items-center space-y-6 animate-fadeIn">
              <FramePreview imageUrl={compositeUrl} />

              <div className="w-full flex flex-col space-y-4">
                <DownloadButton imageBlob={compositeBlob} />

                <ShareButton
                  imageBlob={compositeBlob}
                  shareUrl={shareUrl}
                  onUploadSuccess={setShareUrl}
                  onError={setError}
                />
                
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-6 rounded-xl font-bold text-black bg-[#FCFAF0] hover:bg-[#FFC700] border-2 border-black flat-shadow flat-shadow-hover transition-all duration-100 cursor-pointer text-center"
                >
                  Upload a Different Photo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center mt-8 md:mt-12 pt-6 border-t-2 border-black/20 z-10">
        <p className="text-xs text-white/80 font-semibold drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]">
          HH Goa 2026 Profile Framer &bull; Fully Client-Side Process &bull; No Login Required
        </p>
      </footer>
    </main>
  );
}


