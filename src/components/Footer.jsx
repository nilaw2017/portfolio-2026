import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiGlobe, FiHeart, FiArrowUp } from "react-icons/fi";
import { portfolioData } from "../data/portfolio";

const { personal } = portfolioData;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-800/80 py-10">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
                NM
              </div>
              <span className="text-white font-semibold">
                Nilaw<span className="text-cyan-400">.</span>dev
              </span>
            </div>
            <p className="text-slate-500 text-xs font-mono">
              © 2026 Nilaw Manandhar. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs mt-1 flex items-center gap-1 justify-center sm:justify-start">
              Built with <FiHeart size={10} className="text-red-400" /> using React & Tailwind
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: FiLinkedin, href: personal.linkedin, label: "LinkedIn" },
              { icon: FiMail, href: `mailto:${personal.email}`, label: "Email" },
              { icon: FiGlobe, href: `https://${personal.website}`, label: "Website" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#06b6d4" }}
                className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Right: Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-all"
            title="Back to top"
          >
            <FiArrowUp size={16} />
          </motion.button>
        </div>

        {/* Bottom line */}
        <div className="mt-6 pt-6 border-t border-slate-800/60 text-center">
          <p className="text-slate-600 text-xs font-mono">
            // Nilaw Manandhar | Cybersecurity Enthusiast & Full Stack Developer | Naikap, Kathmandu, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
