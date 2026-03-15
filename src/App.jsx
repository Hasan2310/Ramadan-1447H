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
                <h2 className="text-3xl tracking-wide font-bold text-[#2a4259] mb-6 uppercase text-center">
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
                className="flex flex-col items-center relative" // Tambah relative buat container tag
              >
                <div className="relative">
                  <img
                    src="/Idul Fitri.png"
                    className="w-full max-w-md md:w-96 drop-shadow-2xl"
                    alt="Idul Fitri"
                  />

                  {/* TAG INSTAGRAM - Posisikan sesuai badan orang di gambar */}
                  <motion.a
                    href="https://instagram.com/man_f007" // Ganti link IG
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-[-45%] left-[20%] flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg cursor-pointer"
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-4 h-4 fill-white"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-[10px] font-bold text-white tracking-tighter">@man_f007</span>
                  </motion.a>

                  {/* Tambah tag lagi buat orang lain kalau perlu */}
                  <motion.a
                    href="https://instagram.com/san.lbh"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, type: "spring" }}
                    className="absolute bottom-[-45%] right-[-6%] flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg cursor-pointer"
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-4 h-4 fill-white"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-[10px] font-bold text-white tracking-tighter">@san.lbh</span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}