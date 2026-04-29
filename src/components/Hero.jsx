import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiMail, FiGlobe, FiLinkedin } from "react-icons/fi";
import { portfolioData } from "../data/portfolio";

const { personal } = portfolioData;

function TypewriterText({ texts, speed = 80, pauseTime = 2000 }) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIndex < current.length) {
            setDisplayed(current.slice(0, charIndex + 1));
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), pauseTime);
          }
        } else {
          if (charIndex > 0) {
            setDisplayed(current.slice(0, charIndex - 1));
            setCharIndex((c) => c - 1);
          } else {
            setDeleting(false);
            setTextIndex((i) => (i + 1) % texts.length);
          }
        }
      },
      deleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts, speed, pauseTime]);

  return (
    <span className="text-cyan-400">
      {displayed}
      <span className="cursor-blink text-cyan-300">|</span>
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 60% 50%, rgba(6,182,212,0.08) 0%, transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(16,185,129,0.06) 0%, transparent 60%)"
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs sm:text-sm text-cyan-400 font-mono border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 rounded-full">
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 leading-tight"
            >
              {personal.name.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? "text-cyan-400 glow-text-cyan block" : "block"}>
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Title Typewriter */}
            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl font-mono mb-4 h-8"
            >
              <TypewriterText
                texts={[
                  "SIEM Engineer | APM Engineer",
                  "MERN Stack Developer",
                ]}
                speed={70}
                pauseTime={2500}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-sm sm:text-base mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              <span className="text-teal-400">{">"}</span>{" "}
              {personal.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo("experience")}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg text-sm sm:text-base transition-all duration-300 hover:from-cyan-400 hover:to-teal-400"
              >
                View My Work
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg text-sm sm:text-base hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: FiMail, href: `mailto:${personal.email}`, label: "Email" },
                { icon: FiLinkedin, href: personal.linkedin, label: "LinkedIn" },
                { icon: FiGlobe, href: `https://${personal.website}`, label: "Website" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: "#06b6d4" }}
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  title={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent max-w-24" />
              <span className="text-slate-500 text-xs font-mono">{personal.location}</span>
            </motion.div>
          </motion.div>

          {/* Avatar / Visual */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-dashed border-teal-500/20"
              />

              {/* Glow */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/10 blur-xl" />

              {/* Avatar Image */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-cyan-500/50 glow-cyan">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Orbiting badges */}
              {[
                { label: "React", angle: 0, color: "cyan" },
                { label: "Node", angle: 120, color: "green" },
                { label: "Cyber", angle: 240, color: "teal" },
              ].map(({ label, angle, color }) => {
                const rad = (angle * Math.PI) / 180;
                const r = 50;
                const x = 50 + r * Math.cos(rad);
                const y = 50 + r * Math.sin(rad);
                return (
                  <div
                    key={label}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-${color}-500/50 text-${color}-400 text-xs font-mono px-2 py-0.5 rounded-full`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollTo("about")}
        >
          <span className="text-xs text-slate-500 font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FiArrowDown className="text-cyan-500" size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
