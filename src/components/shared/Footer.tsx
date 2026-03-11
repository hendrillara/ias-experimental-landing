"use client";

export default function Footer() {
  return (
    <footer className="w-full z-50 px-8 py-12 flex justify-between items-center border-t border-white/10 bg-black/50 backdrop-blur-md relative mt-32">
      <p className="text-white/40 text-xs tracking-wider uppercase">
        © 2026 Company Name
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-white/40 hover:text-white text-xs tracking-wider uppercase transition-colors">Twitter</a>
        <a href="#" className="text-white/40 hover:text-white text-xs tracking-wider uppercase transition-colors">GitHub</a>
        <a href="#" className="text-white/40 hover:text-white text-xs tracking-wider uppercase transition-colors">Docs</a>
      </div>
    </footer>
  );
}
