import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBook, FiCalendar, FiAward } from "react-icons/fi";
import { portfolioData } from "../data/portfolio";

const { education } = portfolioData;

export default function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="education" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2 block">
              // 02. education
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white section-heading inline-block">
              Education
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <div className="relative flex gap-6">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-xl flex-shrink-0 glow-cyan pulse-cyan">
                      {edu.icon}
                    </div>
                    <div className="w-px flex-1 bg-gradient-to-b from-cyan-500/50 to-transparent mt-3" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 pb-10">
                    <div className="p-6 rounded-2xl border border-cyan-500/20 bg-slate-800/40 backdrop-blur-sm card-hover">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {edu.institution}
                          </h3>
                          <p className="text-cyan-400 font-semibold text-sm">
                            {edu.degree}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-start sm:items-end flex-shrink-0">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-700/50 px-3 py-1 rounded-full">
                            <FiCalendar size={11} />
                            {edu.period}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {edu.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {["Computer Science", "Programming", "Databases", "Networking", "Software Engineering"].map(
                          (tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Additional: Broadway Infosys */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-xl flex-shrink-0">
                    🛡️
                  </div>
                </div>
                <div className="flex-1 pb-4">
                  <div className="p-6 rounded-2xl border border-teal-500/30 bg-teal-500/5 backdrop-blur-sm card-hover relative overflow-hidden">
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1.5 text-xs bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                        Ongoing
                      </span>
                    </div>
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-white mb-1">Broadway Infosys</h3>
                      <p className="text-teal-400 font-semibold text-sm">
                        Advance Cybersecurity Course
                      </p>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Currently pursuing advanced cybersecurity training covering ethical hacking, 
                      network security, vulnerability assessment, and penetration testing techniques.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
