import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./App.css";

export default function Landing() {
  const [scene, setScene] = useState("input");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // EFEK PRELOAD GAMBAR - Dijamin Smooth
  useEffect(() => {
    const imagesToLoad = ["/Bg.jpg", "/Idul Fitri.png"]; 

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Tetap resolve biar gak stuck kalau gambar ilang
      });
    };

    Promise.all(imagesToLoad.map(loadImage)).then(() => {
      setTimeout(() => setIsLoading(false), 1000);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length >= 3) setScene("greeting");
  };

  useEffect(() => {
    if (scene === "greeting") {
      const timer = setTimeout(() => setScene("eid"), 8000);
      return () => clearTimeout(timer);
    }
  }, [scene]);

  return (
    <div className="relative w-full h-[100dvh] bg-white">
      {/* 1. LAYER LOADING OVERLAY */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center"
          >
            <div className="flex gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                  className="w-3 h-3 bg-slate-400 rounded-full"
                />
              ))}
            </div>
            <p className="text-slate-500 text-xs tracking-[0.3em] uppercase font-medium">
              Mohon Menunggu
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT - Selalu Render tapi diatur Opacity/AnimatePresence */}
      <section
        className="relative w-full h-full overflow-hidden bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/Bg.jpg')" }}
      >
        <div className="absolute inset-0 flex mt-20 flex-col px-6 items-center z-10">
          <AnimatePresence mode="wait">
            {scene === "input" && (
              <motion.form
                key="input"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-sm p-10 bg-white/30 backdrop-blur-xl rounded-[35px] shadow-2xl flex flex-col items-center"
              >
                <h2 className="text-3xl tracking-wide font-bold text-[#2a4259] mb-6 uppercase">
                  Siapa Namamu?
                </h2>
                <input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tulis nama..."
                  className="w-full bg-white/50 border-b-2 border-blue-600 p-3 text-center text-xl outline-none text-[#2a4259] rounded-lg"
                />
                <button
                  type="submit"
                  disabled={name.trim().length < 3}
                  className={`mt-10 w-full py-3 rounded-full font-semibold transition ${
                    name.trim().length < 3 ? "bg-gray-400 text-gray-200" : "bg-[#2e495b] text-white"
                  }`}
                >
                  LANJUT
                </button>
              </motion.form>
            )}

            {scene === "greeting" && (
              <motion.div
                key="greeting"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-md w-full p-8 bg-white/40 backdrop-blur-xl rounded-[35px] shadow-2xl"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#2a4259] mb-4 text-left">
                  Happy Eid 1447 H, {name}!
                </h2>
                <p className="text-[#2a4259] text-lg leading-relaxed mb-6">
                  Maafin ya kalau ada kata-kata yang nggak sengaja bikin baper. Moga-moga amal kita diterima ya!
                </p>
                <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 7.8, ease: "linear" }}
                    className="h-full bg-[#4f7c3c]"
                  />
                </div>
              </motion.div>
            )}

            {scene === "eid" && (
              <motion.div
                key="eid"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <img
                  src="/Idul Fitri.png"
                  className="w-full max-w-md md:w-96 drop-shadow-2xl"
                  alt="Idul Fitri"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}