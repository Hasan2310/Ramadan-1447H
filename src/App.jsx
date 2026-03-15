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
      // Kasih sedikit delay tambahan (misal 1 detik) biar transisinya gak terlalu kaget
      setTimeout(() => setIsLoading(false), 1000);
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
{/* 1. LAYER LOADING OVERLAY - EID VIBE */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center text-[#2a4259]"
          >
            {/* Ornamen Mandala Animasi */}
            <div className="relative flex items-center justify-center mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute w-32 h-32 md:w-40 md:h-40 border-[1px] border-yellow-600/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute w-40 h-40 md:w-52 md:h-52 border-[1px] border-yellow-800/10 rounded-full"
              />
              <motion.div
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="text-6xl md:text-7xl drop-shadow-sm"
              >
                🌙
              </motion.div>
            </div>
            
            {/* Teks Loading */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h2 className="text-xl font-light tracking-[0.4em] uppercase mb-2">Eid Mubarak</h2>
              <div className="flex gap-1 justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    className="w-1 h-1 bg-yellow-600 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT */}
      <section
        className="relative w-full h-[100dvh] overflow-hidden bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/Bg.jpg')" }}
      >
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
                <h2 className="text-2xl md:text-3xl font-bold text-[#2a4259] mb-4 text-center">
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