import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiExternalLink, FiAward } from "react-icons/fi";
import { portfolioData } from "../data/portfolio";

const { certifications } = portfolioData;

const colorMap = {
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    glow: "rgba(6,182,212,0.2)",
    badge: "bg-cyan-500/20 text-cyan-300",
  },
  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    glow: "rgba(16,185,129,0.2)",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    glow: "rgba(59,130,246,0.2)",
    badge: "bg-blue-500/20 text-blue-300",
  },
};

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15   });

  return (
    <section id="certifications" className="relative py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2 block">
              // 04. certifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white section-heading inline-block">
              Certifications
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => {
              const colors = colorMap[cert.color] || colorMap.cyan;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 20px 40px ${colors.glow}`,
                    y: -4,
                  }}
                  className={`relative p-6 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm cursor-default transition-all duration-300`}
                >
                  {/* Certificate number */}
                  <div className="absolute top-4 right-4 text-4xl font-black opacity-10 text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center text-3xl mb-4 border ${colors.border}`}>
                    {cert.icon}
                  </div>

                  {/* Content */}
                  <h3 className={`text-lg font-bold text-white mb-1`}>{cert.name}</h3>
                  <p className={`text-sm font-medium ${colors.text} mb-3`}>{cert.issuer}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/40">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${colors.badge}`}>
                      {cert.year}
                    </span>
                    <div className={`flex items-center gap-1 text-xs ${colors.text} font-mono`}>
                      <FiAward size={12} />
                      Certified
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
