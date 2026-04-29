import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiUser, FiPhone, FiLinkedin, FiStar } from "react-icons/fi";
import { portfolioData } from "../data/portfolio";

const { reference } = portfolioData;

export default function Reference() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="reference" className="relative py-20">
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
              // 06. reference
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white section-heading inline-block">
              Reference
            </h2>
          </motion.div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative p-8 rounded-2xl border border-cyan-500/25 bg-slate-800/40 backdrop-blur-sm overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-5">
                <FiUser size={160} className="text-cyan-400" />
              </div>

              {/* Quote marks */}
              <div className="text-6xl text-cyan-500/20 font-serif leading-none mb-2">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Avatar placeholder */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {reference.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{reference.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium">{reference.title}</p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="mt-6 space-y-3 pt-6 border-t border-slate-700/40">
                  <a
                    href={`tel:${reference.phone}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                      <FiPhone size={14} className="text-cyan-400" />
                    </div>
                    <span className="text-sm">{reference.phone}</span>
                  </a>

                  <a
                    href={reference.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                      <FiLinkedin size={14} className="text-cyan-400" />
                    </div>
                    <span className="text-sm truncate">LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
