import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import "./App.css";

export default function Landing() {
  const [scene, setScene] = useState("moonHunt");
  const [name, setName] = useState("");
  const [moonFound, setMoonFound] = useState(false);
  const [isDoneFound, setIsDoneFound] = useState(false);
  const containerRef = useRef(null);
  const moonRef = useRef(null);

  const checkMoon = (info) => {
    if (!moonRef.current || isDoneFound) return;

    const moonRect = moonRef.current.getBoundingClientRect();
    const moonCenterX = moonRect.left + moonRect.width / 2;
    const moonCenterY = moonRect.top + moonRect.height / 2;

    const pointerX = info.point.x;
    const pointerY = info.point.y;

    const distance = Math.hypot(pointerX - moonCenterX, pointerY - moonCenterY);

    if (distance < 50) {
      setMoonFound(true);
      setIsDoneFound(true);
      setTimeout(() => setScene("intro"), 1500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") setScene("greeting");
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-[#0b173b] text-white select-none"
    >
      {/* 1. BINTANG KELAP-KELIP (SELALU ADA) */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 40}%`, // atas atas doang
            left: `${Math.random() * 100}%`,
            opacity: 0.8,
            zIndex: 1
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ repeat: Infinity, duration: Math.random() * 2 + 1, ease: "easeInOut" }}
        />
      ))}

      {/* 2. BULAN */}
      <div
        ref={moonRef}
        className="absolute transition-all duration-1000"
        style={{ 
          right: "20%", 
          top: "15%",
          fontSize: "5rem",
          opacity: moonFound ? 1 : 0.05,
          filter: moonFound ? "drop-shadow(0 0 30px #fbbf24)" : "none",
          zIndex: 5
        }}
      >
        🌙
      </div>

      {/* 3. TEROPONG */}
      {scene === "moonHunt" && (
        <motion.div
          drag
          dragConstraints={containerRef}
          onDrag={(e, info) => checkMoon(info)}
          dragMomentum={false}
          className="absolute z-[60] w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-yellow-400/40 bg-white/5 backdrop-blur-[3px] cursor-grab active:cursor-grabbing flex items-center justify-center"
          style={{ top: "60%", left: "40%", touchAction: "none" }}
        >
          <div className="text-center px-4">
            {!moonFound && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-200/60">
                Arahkan ke Hilal
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* 4. CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center flex-col px-6 text-center z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          {scene === "intro" && (
            <motion.div
              key="intro"
              className="pointer-events-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-4">Marhaban</h1>
              <p className="text-xl text-gray-300">Hilal sudah terlihat!</p>
              <button
                onClick={() => setScene("input")}
                className="mt-10 px-12 py-4 rounded-full bg-yellow-500 text-black font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)]"
              >
                Lanjut
              </button>
            </motion.div>
          )}

          {scene === "input" && (
            <motion.form
              key="input"
              onSubmit={handleSubmit}
              className="pointer-events-auto w-full max-w-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl mb-8 font-light">Siapa namamu?</h2>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-yellow-500/50 p-3 text-center text-3xl outline-none focus:border-yellow-400 transition-all"
                placeholder="..."
              />
              <button className="mt-12 text-yellow-400 font-bold tracking-[0.3em] text-sm opacity-70 hover:opacity-100">
                BUKA UCAPAN
              </button>
            </motion.form>
          )}

          {scene === "greeting" && (
            <motion.div
              key="greeting"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md p-10 bg-white/5 backdrop-blur-2xl rounded-[50px] border border-white/10 shadow-2xl"
            >
              <h2 className="text-3xl font-b`old text-yellow-400 mb-6">Selamat Berpuasa, {name}!</h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                Semoga Ramadan ini penuh berkah dan ampunan. Mohon maaf atas segala salah dan khilaf.
              </p>
            </motion.div>
          )}
        </AnimatePresence>  
      </div>

      {/* 5. KELUARGA */}
      <motion.img
        src="/Keluarga.png"
        className="absolute bottom-0 left-0 w-64 md:w-96 pointer-events-none z-0"
        animate={{ 
          opacity: scene === "moonHunt" ? 0.2 : 1,
          x: scene === "moonHunt" ? -20 : 0
        }}
        transition={{ duration: 1 }}
      />
    </section>
  );
}