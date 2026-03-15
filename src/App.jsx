import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./App.css";

export default function Landing() {
  const [scene, setScene] = useState("input");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      alert("Nama minimal 3 karakter!");
      return;
    }
    setScene("greeting");
  };

  // Pindah ke scene eid setelah 8 detik
  useEffect(() => {
    if (scene === "greeting") {
      const timer = setTimeout(() => {
        setScene("eid");
      }, 8000); // 8 detik
      return () => clearTimeout(timer);
    }
  }, [scene]);

  return (
    <section
      className="relative w-full h-[100dvh] overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/Bg.jpg')" }}
    >
      <div className="absolute inset-0 flex mt-40 flex-col px-6 items-center">
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

          {/* SCENE 2: UCAPAN + PROGRESS BAR */}
          {scene === "greeting" && (
            <motion.div
              key="greeting"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-md w-full p-8 bg-white/40 backdrop-blur-xl rounded-[35px] shadow-2xl text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#2a4259] mb-4">
                Happy Eid 1447 H, {name}!
              </h2>
              <p className="text-[#2a4259] text-lg leading-relaxed mb-6">
                Maafin ya kalau ada kata-kata yang nggak sengaja bikin baper. Moga-moga amal kita diterima ya!
              </p>

              {/* PROGRESS BAR CONTAINER */}
              <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden mt-4 shadow-inner">
                {/* ANIMASI PROGRESS */}
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ 
                    duration: 8, // Durasi 8 detik
                    ease: "linear" // Wajib linear supaya pergerakannya konstan/smooth
                  }}
                  className="h-full bg-[#4f7c3c]"
                />
              </div>
            </motion.div>
          )}

          {/* SCENE 3: IDUL FITRI IMAGE */}
          {scene === "eid" && (
            <motion.div
              key="eid"
              initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
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
  );
}