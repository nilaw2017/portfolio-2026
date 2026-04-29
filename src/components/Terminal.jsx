import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMinus, FiMaximize2, FiTerminal } from "react-icons/fi";
import { portfolioData } from "../data/portfolio";

const { terminal } = portfolioData;

const PROMPT = "PS C:\\Users\\visitor> ";
const WELCOME = [
  "Windows PowerShell (Nilaw.Portfolio Edition)",
  "Copyright (C) 2026 Nilaw Manandhar. All rights reserved.",
  "",
  "Type 'help' to see available commands.",
  "──────────────────────────────────────────────",
];

function processCommand(input) {
  const cmd = input.trim().toLowerCase();
  if (!cmd) return null;

  if (cmd === "clear") return { type: "clear" };

  const response = terminal.commands[cmd];
  if (response) {
    return { type: "output", text: response };
  }

  return {
    type: "error",
    text: `'${input.trim()}' is not recognized as a command. Type 'help' for available commands.`,
  };
}

export default function Terminal({ isOpen, onClose }) {
  const [lines, setLines] = useState(WELCOME.map((l) => ({ type: "system", text: l })));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add command to display
    setLines((prev) => [...prev, { type: "command", text: trimmed }]);

    // Add to history
    setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);

    // Process
    const result = processCommand(trimmed);
    if (result) {
      if (result.type === "clear") {
        setLines(WELCOME.map((l) => ({ type: "system", text: l })));
      } else if (result.type === "output") {
        const outputLines = result.text.split("\n").map((t) => ({ type: "output", text: t }));
        setLines((prev) => [...prev, ...outputLines, { type: "spacer", text: "" }]);
      } else if (result.type === "error") {
        setLines((prev) => [
          ...prev,
          { type: "error", text: result.text },
          { type: "spacer", text: "" },
        ]);
      }
    } else {
      setLines((prev) => [...prev, { type: "spacer", text: "" }]);
    }

    setInput("");
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      if (history[newIndex]) setInput(history[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : history[newIndex] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Autocomplete
      const cmds = Object.keys(terminal.commands);
      const match = cmds.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const getLineStyle = (type) => {
    switch (type) {
      case "system":
        return "text-slate-400";
      case "command":
        return "text-white";
      case "output":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "spacer":
        return "";
      default:
        return "text-slate-300";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={
            isMinimized
              ? { opacity: 1, scale: 1, y: 0, height: "auto" }
              : { opacity: 1, scale: 1, y: 0 }
          }
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-[600px] lg:w-[700px] max-w-full"
          style={{ maxHeight: isMinimized ? "auto" : "80vh" }}
        >
          <div
            className="terminal-container shadow-2xl flex flex-col"
            style={{
              maxHeight: isMinimized ? "48px" : "80vh",
              transition: "max-height 0.3s ease",
              overflow: "hidden",
            }}
          >
            {/* Title Bar */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b"
              style={{ borderColor: "rgba(6,182,212,0.2)", background: "#0d1a2e", flexShrink: 0 }}
            >
              <div className="flex items-center gap-2">
                {/* Window buttons */}
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex-shrink-0"
                  title="Close"
                />
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex-shrink-0"
                  title="Minimize"
                />
                <button
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex-shrink-0"
                  title="Maximize"
                />
                <div className="ml-2 flex items-center gap-1.5">
                  <FiTerminal size={12} className="text-cyan-400" />
                  <span
                    className="text-xs font-mono"
                    style={{ color: "#94a3b8" }}
                  >
                    Windows PowerShell — nilaw.portfolio
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <FiMinus size={14} />
                </button>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
              <div
                className="terminal-output overflow-y-auto p-4 flex-1 font-mono text-sm"
                style={{ background: "#0a0f1a", minHeight: "300px", maxHeight: "calc(80vh - 80px)" }}
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => (
                  <div key={i} className="leading-6 min-h-[1.5rem]">
                    {line.type === "command" ? (
                      <div className="flex">
                        <span style={{ color: "#22d3ee" }} className="mr-1 flex-shrink-0">
                          {PROMPT}
                        </span>
                        <span className="text-white break-all">{line.text}</span>
                      </div>
                    ) : line.type === "spacer" ? (
                      <div className="h-2" />
                    ) : (
                      <div
                        className={`${getLineStyle(line.type)} whitespace-pre-wrap break-all`}
                      >
                        {line.text}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            )}

            {/* Input Line */}
            {!isMinimized && (
              <div
                className="flex items-center px-4 py-3 border-t font-mono"
                style={{
                  background: "#0a0f1a",
                  borderColor: "rgba(6,182,212,0.15)",
                  flexShrink: 0,
                }}
              >
                <span
                  className="mr-1 text-sm flex-shrink-0 select-none"
                  style={{ color: "#22d3ee" }}
                >
                  {PROMPT}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white text-sm caret-cyan-400 min-w-0"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <span className="cursor-blink ml-0.5 text-cyan-400 select-none">█</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Floating Terminal Button
export function TerminalButton({ onClick }) {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 left-4 sm:left-6 z-[99]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.4, type: "spring" }}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-sm font-medium transition-all ${
          pulse ? "pulse-cyan" : ""
        }`}
        style={{
          background: "rgba(10, 15, 26, 0.95)",
          border: "1px solid rgba(6,182,212,0.5)",
          color: "#22d3ee",
          boxShadow: "0 0 20px rgba(6,182,212,0.2)",
        }}
      >
        <FiTerminal size={16} />
        <span className="hidden sm:inline">Open Terminal</span>
        <span className="sm:hidden">PS</span>
        {pulse && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full">
            <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping" />
          </span>
        )}
      </motion.button>
    </motion.div>
  );
}
