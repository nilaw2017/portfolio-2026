import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBriefcase, FiCheck, FiCode } from "react-icons/fi";
import { portfolioData } from "../data/portfolio";

const { experience } = portfolioData;

function ExperienceCard({ job, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative flex gap-4 sm:gap-6"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 z-10 ${
            job.current
              ? "bg-gradient-to-br from-cyan-500 to-teal-500 glow-cyan"
              : "bg-gradient-to-br from-slate-600 to-slate-700"
          }`}
        >
          {job.current ? <FiCode size={20} /> : <FiBriefcase size={20} />}
        </div>
        {index < experience.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-cyan-500/40 to-transparent mt-2" />
        )}
      </div>

      {/* Card */}
      <div className={`flex-1 pb-10 ${index < experience.length - 1 ? "pb-10" : ""}`}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
            job.current
              ? "border-cyan-500/30 bg-slate-800/50 hover:border-cyan-400/50"
              : "border-slate-700/40 bg-slate-800/30 hover:border-slate-600/60"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">{job.role}</h3>
                {job.current && (
                  <span className="flex items-center gap-1 text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Current
                  </span>
                )}
              </div>
              <p className="text-cyan-400 font-semibold text-sm">{job.company}</p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <span className="text-xs bg-slate-700/60 text-slate-400 px-3 py-1 rounded-full font-mono border border-slate-600/40">
                {job.period}
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full font-mono border ${
                  job.type === "Full Time"
                    ? "bg-teal-500/10 text-teal-400 border-teal-500/30"
                    : "bg-purple-500/10 text-purple-400 border-purple-500/30"
                }`}
              >
                {job.type}
              </span>
            </div>
          </div>

          {/* Bullets */}
          <ul className="space-y-3">
            {job.bullets.map((bullet, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + i * 0.07 + 0.3 }}
                className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
              >
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                    job.current ? "bg-cyan-500/20" : "bg-slate-700/60"
                  }`}
                >
                  <FiCheck
                    size={11}
                    className={job.current ? "text-cyan-400" : "text-slate-500"}
                  />
                </span>
                {bullet}
              </motion.li>
            ))}
          </ul>

          {/* Tech stack pills for Full Stack role */}
          {job.current && (
            <div className="mt-5 pt-5 border-t border-slate-700/40">
              <p className="text-xs text-slate-500 font-mono mb-3">// tech used</p>
              <div className="flex flex-wrap gap-2">
                {["ReactJS", "NodeJS", "MySQL", "MongoDB", "REST API", "GoTime"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          {!job.current && (
            <div className="mt-5 pt-5 border-t border-slate-700/40">
              <p className="text-xs text-slate-500 font-mono mb-3">// tech used</p>
              <div className="flex flex-wrap gap-2">
                {["EJS", "SCSS/SASS", "HTML/CSS", "Figma", "PSD"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-400 border border-slate-600/40 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2 block">
              // 05. experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white section-heading inline-block">
              Work Experience
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {experience.map((job, i) => (
              <ExperienceCard key={i} job={job} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
