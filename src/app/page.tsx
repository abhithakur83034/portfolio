import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Background3D from "@/components/three/Background3D";
import DeviceTilt from "@/components/DeviceTilt";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <DeviceTilt />
      <Background3D />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10 flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
