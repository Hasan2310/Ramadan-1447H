import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./App.css";

export default function Landing() {
  const [scene, setScene] = useState("input");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Efek Loading: Menunggu semua elemen & gambar siap
  useEffect(() => {
    const handleLoad = () => {
      // Delay 1.5 detik biar loading indahnya kelihatan dulu
      setTimeout(() => setIsLoading(false), 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      alert("Nama minimal 3 karakter!");
      return;
    }
    setScene("greeting");
  };

  useEffect(() => {
    if (scene === "greeting") {
      const timer = setTimeout(() => {
        setScene("eid");
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [scene]);

  return (
    <>
      {/* 1. LAYER LOADING OVERLAY - KETUPAT INDONESIA VIBE */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center text-[#4f7c3c]"
          >
            {/* Asset Ketupat & Animasi */}
            <div className="relative flex items-center justify-center mb-16">
              
              {/* Lingkaran Luar Berputar (Dasar) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute w-40 h-40 md:w-52 md:h-52 border-[1px] border-[#4f7c3c]/10 rounded-full"
              />

              {/* Garis-garis Anyaman Berputar (Variasi) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute w-48 h-48 md:w-60 md:h-60 border-[1.5px] border-[#4f7c3c]/10 rounded-full border-dashed"
              />
              
              {/* GAMBAR KETUPAT ASLI INDONESIA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0.8, 1, 0.8], 
                  scale: [0.95, 1.05, 0.95],
                  y: [0, -10, 0] // Efek mengambang pelan
                }}
                transition={{ 
                  opacity: { repeat: Infinity, duration: 3 },
                  scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                className="relative z-10 flex items-center justify-center"
              >
                {/* Pastikan file ketupat.png ada di folder public/ */}
                <img 
                  src="/ketupat.png" 
                  alt="Ketupat Lebaran Indonesia" 
                  className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_10px_15px_rgba(79,124,60,0.2)]"
                />
              </motion.div>
            </div>
            
            {/* Teks Loading */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h2 className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase mb-3 text-[#4f7c3c]">
                Mohon Menunggu
              </h2>
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15, ease: "easeInOut" }}
                    className="w-2 h-2 bg-[#4f7c3c] rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT - TIDAK DIUBAH */}
      <section
        className="relative w-full h-[100dvh] overflow-hidden bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/Bg.jpg')" }}
      >
        {/* ... (isi Main Content kamu tetap sama, tidak saya ubah) ... */}
        <div className="absolute inset-0 flex mt-25 flex-col px-6 items-center">
          <AnimatePresence mode="wait">
            
            {/* SCENE 1: INPUT */}
            {scene === "input" && (
              <motion.form
                key="input"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
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
                  placeholder="Tulis nama kamu..."
                  className="w-full bg-white/50 border-b-2 border-blue-600 p-3 text-center text-xl outline-none text-[#2a4259] rounded-lg placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={name.trim().length < 3}
                  className={`mt-10 w-full py-3 rounded-full font-semibold tracking-widest transition
                    ${name.trim().length < 3
                      ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                      : 'bg-[#2e495b] text-white hover:scale-105 active:scale-95 shadow-lg'}`}
                >
                  LANJUT
                </button>
              </motion.form>
            )}

            {/* SCENE 2: UCAPAN */}
            {scene === "greeting" && (
              <motion.div
                key="greeting"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full p-8 bg-white/40 backdrop-blur-xl rounded-[35px] shadow-2xl text-left"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#2a4259] mb-4 text-left">
                  Happy Eid 1447 H, {name}!
                </h2>
                <p className="text-[#2a4259] text-lg leading-relaxed mb-6">
                  Maafin ya kalau ada kata-kata yang nggak sengaja bikin baper. Moga-moga amal kita diterima ya!
                </p>

                <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden mt-4 shadow-inner">
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 7.8, ease: "linear" }}
                    className="h-full bg-[#4f7c3c]"
                  />
                </div>
              </motion.div>
            )}

            {/* SCENE 3: EID */}
            {scene === "eid" && (
              <motion.div
                key="eid"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <img
                  src="/Idul Fitri.png"
                  className="w-full max-w-md md:w-96 drop-shadow-2xl -mt-10"
                  alt="Idul Fitri"
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </>
  );
}