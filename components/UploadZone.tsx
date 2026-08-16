"use client";

import React, { useState, useRef } from "react";
import { convertHeicToJpeg } from "@/lib/image/heicConvert";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  onError: (errorMsg: string) => void;
  isProcessing: boolean;
}

export function UploadZone({ onFileSelect, onError, isProcessing }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [conversionLoading, setConversionLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    const validTypes = ["image/jpeg", "image/png", "image/heic", "image/heif"];
    const validExtensions = ["jpg", "jpeg", "png", "heic", "heif"];

    if (!validTypes.includes(file.type) && !validExtensions.includes(ext || "")) {
      onError("Please upload a JPG, PNG, or HEIC image file.");
      return;
    }

    try {
      if (ext === "heic" || ext === "heif" || file.type === "image/heic" || file.type === "image/heif") {
        setConversionLoading(true);
        const converted = await convertHeicToJpeg(file);
        onFileSelect(converted);
      } else {
        onFileSelect(file);
      }
    } catch (err: unknown) {
      console.error(err);
      onError(err instanceof Error ? err.message : "Failed to process image.");
    } finally {
      setConversionLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const loading = isProcessing || conversionLoading;

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center w-full max-w-md h-64 p-6 border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer
        ${
          isDragActive
            ? "border-[#FFD400] bg-[#127A42]/50 shadow-none"
            : "border-[#FFD400]/60 hover:border-[#FFD400] bg-[#0A2616]/60 hover:bg-[#0A2616]/95"
        }
        border-black border-3 flat-shadow
        ${loading ? "pointer-events-none opacity-80" : ""}
      `}
      onClick={onButtonClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png,image/heic,image/heif"
        onChange={handleChange}
        disabled={loading}
      />

      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-12 h-12 text-[#FFD400] animate-spin"
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
          <p className="text-sm font-bold text-[#FDFDF5]">
            {conversionLoading ? "Converting HEIC photo..." : "Processing PFP..."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 rounded-full bg-[#127A42] text-[#FFD400] border-2 border-black flat-shadow">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold text-white uppercase tracking-wide">
              Drag & drop your photo
            </p>
            <p className="text-xs text-white/80 font-medium mt-1">
              or click to browse from device
            </p>
          </div>
          <div className="text-[10px] uppercase tracking-wider text-black font-extrabold bg-[#FFD400] py-1.5 px-4 rounded-full border-2 border-black flat-shadow">
            JPG, PNG, HEIC up to 10MB
          </div>
        </div>
      )}
    </div>
  );
}
