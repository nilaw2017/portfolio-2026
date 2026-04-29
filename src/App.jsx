import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import Reference from "./components/Reference";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Terminal, { TerminalButton } from "./components/Terminal";
import ParticlesBackground from "./components/ParticlesBackground";

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050d1a] text-slate-200 overflow-x-hidden">
      {/* Particles Layer */}
      <ParticlesBackground />

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
        <main>
          <Hero />

          {/* Gradient separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

          <About />

          <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

          <Education />

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

          <Skills />

          <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

          <Certifications />

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

          <Experience />

          <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

          <Reference />

          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

          <Contact />
        </main>

        <Footer />
      </div>

      {/* Terminal */}
      <TerminalButton onClick={() => setTerminalOpen(!terminalOpen)} />
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
}
