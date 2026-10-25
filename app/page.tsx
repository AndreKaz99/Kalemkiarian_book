import { MotionProvider } from "@/components/MotionProvider";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ThemeMarquee } from "@/components/ThemeMarquee";
import { AboutBook } from "@/components/AboutBook";
import { WhyIWrote } from "@/components/WhyIWrote";
import { Author } from "@/components/Author";
import { Legacy } from "@/components/Legacy";
import { Purchase } from "@/components/Purchase";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <MotionProvider>
      <Navigation />
      <main id="main">
        <Hero />
        <ThemeMarquee />
        <AboutBook />
        <WhyIWrote />
        <Author />
        <Legacy />
        <Purchase />
      </main>
      <Footer />
    </MotionProvider>
  );
}
