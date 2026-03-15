import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./App.css";

export default function Landing() {
  const [scene, setScene] = useState("moonHunt");
  const [name, setName] = useState("");
  const [moonFound, setMoonFound] = useState(false);

  // posisi bulan fix
  const moonPos = { x: 500, y: 200 };

  // cek jarak teropong vs bulan
  const checkMoon = (x, y) => {
    const centerX = x + 75; // radius / 2
    const centerY = y + 75;
    const distance = Math.hypot(centerX - moonPos.x, centerY - moonPos.y);
    if (distance < 50 && !moonFound) {
      setMoonFound(true);
      setTimeout(() => setScene("intro"), 1200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") setScene("greeting");
  };

  return (
    <section className="ramadan-bg relative h-screen overflow-hidden">
      {/* Stars */}
      <div>
        <div className="star absolute top-10 left-6"></div>
        <div className="star absolute top-24 right-20"></div>
        <div className="star absolute top-40 left-1/2"></div>
        <div className="star absolute top-32 left-1/3"></div>
        <div className="star absolute top-60 right-1/3"></div>
      </div>

      {/* Family */}
      <motion.img
        src="/Keluarga.png"
        alt="family greeting"
        className={`absolute bottom-0 w-72 sm:w-96 md:w-[460px] -left-20 sm:-left-24 md:-left-32 ${
          scene === "moonHunt" ? "opacity-20" : "opacity-100"
        }`}
        initial={{ x: -200, opacity: 0 }}
        animate={{
          x: 0,
          opacity: scene === "moonHunt" ? 0.2 : 1,
          y: [0, -8, 0],
        }}
        transition={{
          duration: 1,
          delay: 1.5,
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        }}
      />

      {/* Telescope / Circle */}
      {scene === "moonHunt" && (
        <motion.div
          drag
          dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 150, bottom: window.innerHeight - 150 }}
          dragElastic={0.2}
          onDrag={(e, info) => checkMoon(info.point.x, info.point.y)}
          className="absolute w-[150px] h-[150px] rounded-full border-4 border-white/70 overflow-hidden cursor-grab"
          style={{ left: window.innerWidth / 2 - 75, top: window.innerHeight / 2 - 75 }}
        >
          {/* Bulan */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: moonFound ? 1.3 : 1 }}
            transition={{ duration: 0.5, repeat: moonFound ? 4 : 0, repeatType: "reverse" }}
            style={{
              position: "absolute",
              left: moonPos.x,
              top: moonPos.y,
              fontSize: "3rem",
              filter: moonFound ? "drop-shadow(0 0 20px yellow)" : "none",
            }}
          >
            🌙
          </motion.div>

          {/* Sparkle */}
          {moonFound && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{
                position: "absolute",
                left: moonPos.x + 10,
                top: moonPos.y - 10,
                fontSize: "1.2rem",
              }}
            >
              ✨
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Center Content */}
      <div className="flex h-full items-center justify-center flex-col px-6 text-center z-10 relative">
        <AnimatePresence mode="wait">
          {scene === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="ramadan-title text-3xl sm:text-5xl">Marhaban Ya Ramadan</h1>
              <p className="ramadan-subtitle text-sm sm:text-lg mt-2">Sambut bulan penuh berkah</p>
              <button
                onClick={() => setScene("input")}
                className="mt-4 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 font-semibold hover:bg-white/20 transition duration-300"
              >
                Lanjut
              </button>
            </motion.div>
          )}

          {scene === "input" && (
            <motion.form
              key="input"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6 items-center mt-4"
            >
              <h2 className="text-xl sm:text-2xl font-semibold">Masukkan nama kamu</h2>
              <input
                type="text"
                placeholder="Nama kamu..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 text-center text-white placeholder-white/60 w-64 outline-none focus:border-yellow-300 transition"
              />
              <button className="mt-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 font-semibold hover:bg-white/20 hover:scale-105 transition duration-300 shadow-lg">
                Lihat Ucapan
              </button>
            </motion.form>
          )}

          {scene === "greeting" && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl max-w-md text-center text-white"
            >
              <h2 className="text-2xl font-semibold mb-4">Assalamu'alaikum {name} 🌙</h2>
              <p className="leading-relaxed text-sm sm:text-base">
                Maafin aku ya {name} kalau selama ini ada salah kata ataupun sikap. Semoga Ramadan kali ini membawa keberkahan, kedamaian, dan hati yang lebih tenang.
              </p>
              <p className="mt-6 text-yellow-300 font-medium">Selamat menunaikan ibadah puasa</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}