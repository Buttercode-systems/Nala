import Link from "next/link";
import {ArrowUpRight} from "lucide-react";

export function Nav(){
 return <header className="premium-nav">
  <div className="nav-inner">
   <Link href="/" className="wordmark">nala<span>.</span></Link>
   <nav className="nav-links" aria-label="Primary navigation">
    <a href="#why-nala">Why Nala</a>
    <a href="#how-it-works">How it works</a>
    <a href="#for-business">For businesses</a>
    <Link href="/market">Live market</Link>
    <a href="#trust">Trust & safety</a>
    <Link href="/auth">Sign in</Link>
    <Link href="/worker" className="nav-app">Open Nala <ArrowUpRight size={16}/></Link>
   </nav>
  </div>
 </header>
}