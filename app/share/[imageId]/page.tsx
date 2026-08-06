import { Metadata } from "next";
import Link from "next/link";

interface SharePageProps {
  params: Promise<{ imageId: string }>;
}

/**
 * Generate metadata for the share page. Next.js automatically associates
 * the sibling opengraph-image.tsx with this route for its og:image tag.
 */
export async function generateMetadata({}: SharePageProps): Promise<Metadata> {
  return {
    title: "My HH Goa 2026 PFP Frame",
    description: "I just framed my profile picture for HH Goa 2026! Frame yours now and join the community.",
    openGraph: {
      title: "My HH Goa 2026 PFP Frame",
      description: "I just framed my profile picture for HH Goa 2026! Frame yours now and join the community.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "My HH Goa 2026 PFP Frame",
      description: "I just framed my profile picture for HH Goa 2026! Frame yours now and join the community.",
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const resolvedParams = await params;
  
  // Decode the URL-safe Base64 image ID to retrieve the original Vercel Blob URL
  let imageUrl = "";
  try {
    imageUrl = Buffer.from(
      resolvedParams.imageId.replace(/-/g, "+").replace(/_/g, "/"),
      "base64"
    ).toString("utf-8");
  } catch (err) {
    console.error("Failed to decode share image ID:", err);
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-between w-full min-h-screen px-4 py-8 md:py-12 bg-radial from-[#121b2e] via-[#090d16] to-[#05070c] text-slate-100">
      {/* Top Header */}
      <header className="w-full max-w-4xl flex flex-col items-center text-center space-y-3 mb-8 md:mb-10">
        <div className="inline-flex items-center space-x-2 py-1 px-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
          <span>Goa 2026 Hackathon</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            HH GOA
          </span>{" "}
          PFP Frame
        </h1>
      </header>

      {/* Main Image Card and CTA */}
      <div className="w-full max-w-md flex flex-col items-center justify-center flex-1 space-y-8">
        {imageUrl ? (
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.01]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="HH Goa 2026 Branded PFP"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-square rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-center">
            <span className="text-red-400 text-sm">Failed to load shared PFP image.</span>
          </div>
        )}

        {/* CTA Button */}
        <div className="w-full flex flex-col space-y-3">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2.5 w-full py-4 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] active:scale-[0.98] transition-all duration-200"
          >
            <span>Create Your Own PFP Frame</span>
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
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
