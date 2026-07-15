import type { Metadata } from "next";
import "./globals.css";
import "./hardening.css";
export const metadata: Metadata={title:"Nala — Your first work starts here",description:"Earn your first income, build verified experience, and unlock better opportunities."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
