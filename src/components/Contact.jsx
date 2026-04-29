import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGlobe,
} from "react-icons/fi";
import { portfolioData } from "../data/portfolio";

const { personal } = portfolioData;

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Invalid email address";
    }
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (!formData.message.trim()) {
      e.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      e.message = "Message must be at least 10 characters";
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("loading");

    // Simulate sending (in real app, would call API)
    try {
      await new Promise((res) => setTimeout(res, 1500));
      // In a real Next.js setup, you'd call: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const inputClass = (field) =>
    `w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500"
        : "border-slate-700/50 focus:ring-cyan-500/30 focus:border-cyan-500/50"
    }`;

  const contactInfo = [
    { icon: FiMail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: FiPhone, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
    { icon: FiMapPin, label: "Location", value: personal.location, href: null },
    { icon: FiLinkedin, label: "LinkedIn", value: "nilawmanandhar", href: personal.linkedin },
    { icon: FiGlobe, label: "Website", value: personal.website, href: `https://${personal.website}` },
  ];

  return (
    <section id="contact" className="relative py-20">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />

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
              // 07. contact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white section-heading inline-block">
              Get In Touch
            </h2>
            <p className="text-slate-400 text-sm mt-6 max-w-md mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="p-6 rounded-2xl border border-slate-700/50 bg-slate-800/30">
                <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">
                  <span className="text-cyan-400 font-mono">{">"}</span>
                  Let's Connect
                </h3>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3 group">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                        <Icon className="text-cyan-400" size={15} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-mono">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : "_self"}
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
              </div>

              {/* Availability badge */}
              <div className="p-4 rounded-xl border border-teal-500/25 bg-teal-500/5 flex items-center gap-3">
                <span className="flex h-3 w-3 relative flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500" />
                </span>
                <div>
                  <p className="text-teal-400 text-sm font-medium">Available for opportunities</p>
                  <p className="text-slate-500 text-xs mt-0.5">Response within 24 hours</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center gap-3"
                  >
                    <FiCheckCircle className="text-teal-400 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-teal-400 text-sm font-medium">Message sent!</p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Thanks for reaching out. I'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
                  >
                    <FiAlertCircle className="text-red-400 flex-shrink-0" size={18} />
                    <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs text-slate-400 font-mono mb-2 flex items-center gap-1">
                        <FiUser size={11} /> Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass("name")}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs text-slate-400 font-mono mb-2 flex items-center gap-1">
                        <FiMail size={11} /> Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs text-slate-400 font-mono mb-2 flex items-center gap-1">
                      <FiMessageSquare size={11} /> Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className={inputClass("subject")}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs text-slate-400 font-mono mb-2 flex items-center gap-1">
                      <FiMessageSquare size={11} /> Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, inquiry, or just say hello..."
                      rows={5}
                      className={`${inputClass("message")} resize-none`}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message ? (
                        <p className="text-red-400 text-xs">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-slate-600 font-mono">
                        {formData.message.length} chars
                      </span>
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                    whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                      status === "loading"
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-400 hover:to-teal-400 hover:shadow-lg hover:shadow-cyan-500/25"
                    }`}
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={15} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-slate-600 text-xs text-center font-mono">
                    // Alternatively, email directly: {personal.email}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
