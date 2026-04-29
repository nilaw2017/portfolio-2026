export default function SectionDivider({ flip = false }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 ${flip ? "transform rotate-180" : ""}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-2" />
    </div>
  );
}
