import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Elsewhere from "@/components/Elsewhere";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="w-full flex-1 bg-surface-base pt-16">
        <div className="h-0 w-0" id="top" />
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <Capabilities />
        <About />
        <Elsewhere />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
