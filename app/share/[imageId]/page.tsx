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

export default function SharePage() {
  return (
    <>
      {/* Immediate script-based client redirect to the home page */}
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.location.href = "/";',
        }}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#090d16] text-slate-300 px-4 text-center">
        <h2 className="text-xl font-bold mb-2">Redirecting to HH Goa PFP Framer...</h2>
        <p className="text-sm text-slate-500">
          If you are not redirected automatically,{" "}
          <Link href="/" className="text-cyan-400 underline hover:text-cyan-300">
            click here
          </Link>
          .
        </p>
      </div>
    </>
  );
}
