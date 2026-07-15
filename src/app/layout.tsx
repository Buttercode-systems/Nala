import type { Metadata } from "next";
import "./globals.css";
import "./hardening.css";
import "./hero-card-fix.css";
import "./simulations.css";
import "./lovable-refinements.css";
import "./render-stability.css";
import "./samsung-safe-rendering.css";

export const metadata: Metadata={title:"Nala — Your first work starts here",description:"Earn your first income, build verified experience, and unlock better opportunities."};

const samsungDetection=`(function(){try{var ua=navigator.userAgent||'';if(/SamsungBrowser\//i.test(ua)){document.documentElement.classList.add('samsung-internet');}}catch(e){}})();`;

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><head><script dangerouslySetInnerHTML={{__html:samsungDetection}}/></head><body>{children}</body></html>;
}
