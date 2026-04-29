import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { portfolioData } from "../data/portfolio";

const { skills } = portfolioData;

const techSkills = skills.filter((s) => s.category === "tech");
const softSkills = skills.filter((s) => s.category === "soft");

function SkillBar({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-200 text-sm font-medium">{skill.name}</span>
          {skill.tag && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 font-mono">
              {skill.tag === "Ongoing" ? (
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
                  {skill.tag}
                </span>
              ) : (
                skill.tag
              )}
            </span>
          )}
        </div>
        <span className="text-xs text-cyan-400 font-mono">{skill.level}%</span>
      </div>
      <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function SoftSkillBadge({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6,182,212,0.25)" }}
      className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/40 text-center card-hover cursor-default"
    >
      <div className="mb-3">
        <div className="relative w-12 h-12 mx-auto">
          <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="rgba(71,85,105,0.4)"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2.5"
              strokeDasharray={`${2 * Math.PI * 15.5}`}
              strokeDashoffset={2 * Math.PI * 15.5 * (1 - skill.level / 100)}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 2 * Math.PI * 15.5 }}
              animate={
                inView
                  ? { strokeDashoffset: 2 * Math.PI * 15.5 * (1 - skill.level / 100) }
                  : {}
              }
              transition={{ duration: 1.2, delay: index * 0.07 + 0.3 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-cyan-400">{skill.level}%</span>
          </div>
        </div>
      </div>
      <p className="text-slate-200 text-xs font-medium leading-tight">{skill.name}</p>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("tech");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="relative py-20">
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
              // 03. skills
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white section-heading inline-block">
              Skills
            </h2>
            <p className="text-slate-400 text-sm mt-6 max-w-md mx-auto">
              A blend of technical expertise and interpersonal abilities driving successful outcomes.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
              {[
                { key: "tech", label: "Technical Skills" },
                { key: "soft", label: "Soft Skills" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === key
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === "tech" ? (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-12 gap-y-6"
              >
                {techSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} inView={inView} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {softSkills.map((skill, i) => (
                  <SoftSkillBadge key={skill.name} skill={skill} index={i} inView={inView} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* All Skills chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 text-center"
          >
            <p className="text-slate-500 text-xs font-mono mb-4">// all technologies</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "JavaScript", "TypeScript", "React", "Node.js", "Express.js",
                "MongoDB", "MySQL", "HTML5", "CSS3", "SCSS/SASS",
                "EJS", "REST APIs", "Git", "Linux", "Figma",
              ].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.04 }}
                  whileHover={{ scale: 1.1 }}
                  className="badge-cyber text-xs cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
