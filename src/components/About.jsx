import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiShield,
} from "react-icons/fi";
import { portfolioData } from "../data/portfolio";

const { personal, profile, currentStatus } = portfolioData;

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const contactItems = [
    {
      icon: FiMail,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: personal.location,
      href: null,
    },
    {
      icon: FiGlobe,
      label: "Website",
      value: personal.website,
      href: `https://${personal.website}`,
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: "nilawmanandhar",
      href: personal.linkedin,
    },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2 block">
              // 01. about
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white section-heading inline-block">
              Profile Info
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Profile Text */}
            <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
              {/* Current Status Badge */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                  <FiShield className="text-cyan-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-mono mb-0.5">Current Status</p>
                  <p className="text-cyan-300 text-sm font-medium">{currentStatus}</p>
                </div>
              </div>

              {/* Profile paragraph */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-teal-500 to-transparent" />
                <p className="text-slate-300 leading-relaxed text-base sm:text-lg pl-4">
                  {profile}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { label: "Projects", value: "6+", sub: "Completed" },
                  { label: "Experience", value: "2+", sub: "Years" },
                  { label: "Tech Stack", value: "10+", sub: "Technologies" },
                ].map(({ label, value, sub }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 text-center card-hover"
                  >
                    <div className="text-2xl font-bold text-cyan-400 mb-1">{value}</div>
                    <div className="text-xs text-slate-400">{label}</div>
                    <div className="text-xs text-slate-600">{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Info Card */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="rounded-2xl p-6 border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm h-full">
                <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-sm">{">"}</span>
                  Contact Details
                </h3>
                <div className="space-y-4">
                  {contactItems.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center mt-0.5 group-hover:bg-cyan-500/20 transition-colors">
                        <Icon className="text-cyan-400" size={14} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5 font-mono">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 text-sm hover:text-cyan-400 transition-colors break-all"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-slate-300 text-sm">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Download/View Resume hint */}
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <a
                    href={`mailto:${personal.email}?subject=Resume Request`}
                    className="block w-full text-center py-2.5 px-4 rounded-lg border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 transition-all"
                  >
                    Request Full Resume
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
