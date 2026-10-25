import { MotionProvider } from "@/components/MotionProvider";
import { Navigation } from "@/components/Navigation";
import { ScrollManager } from "@/components/ScrollManager";
import { Hero, Prologue } from "@/components/Hero";
import { AboutBook, ConflictQuote } from "@/components/AboutBook";
import { WhyIWrote } from "@/components/WhyIWrote";
import { Author } from "@/components/Author";
import { Legacy } from "@/components/Legacy";
import { Purchase } from "@/components/Purchase";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <MotionProvider>
      <ScrollManager />
      <Navigation />
      <main id="main">
        <Hero />
        <Prologue />
        <AboutBook />
        <ConflictQuote />
        <Author />
        <WhyIWrote />
        <Legacy />
        <Purchase />
      </main>
      <Footer />
    </MotionProvider>
  );
}
