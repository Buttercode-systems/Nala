import type { Metadata } from "next";
import "./globals.css";
import "./hardening.css";
import "./hero-card-fix.css";
import "./simulations.css";
import "./workspace-refinements.css";
import "./demo-controls.css";
import "./progression.css";
import "./core-progression.css";
import "./growth-strategy.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nala-sa.vercel.app"),
  title: "Nala — Your first work starts here",
  description:
    "Earn your first income, build verified experience, and follow a clear next step toward better opportunities.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Nala — Your first work starts here",
    description: "Safe paid starter work becomes verified proof and a clear next step.",
    siteName: "Nala",
    images: [{url:"/nala-social-share.svg",width:1200,height:630,alt:"Nala first-work journey from practice to verified proof and progression"}],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nala — Your first work starts here",
    description: "Safe paid starter work becomes verified proof and a clear next step.",
    images: ["/nala-social-share.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
