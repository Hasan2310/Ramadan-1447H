import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./App.css";

export default function Landing() {

  const [scene, setScene] = useState("input");
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      alert("Nama minimal 3 karakter!");
      return;
    }
    setScene("greeting");
  };

  useEffect(() => {
    if (scene !== "greeting") return;

    let time = 100;
    const interval = setInterval(() => {
      time -= 1;
      setProgress(time);

      if (time <= 0) {
        clearInterval(interval);
        setScene("eid");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [scene]);

  return (
    <section
      className="relative w-full h-[100dvh] overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/Bg.jpg')" }}
    >
      <div className="absolute inset-0 flex mt-40 flex-col px-6 items-center">

        <AnimatePresence mode="wait">

          {/* INPUT */}
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
              <h2 className="text-3xl tracking-wide font-bold text-[#2a4259] mb-6">
                SIAPA NAMAMU?
              </h2>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis nama kamu..."
                className="w-full bg-white/50 border-b-2 border-blue-600 p-3 text-center text-xl outline-none text-[#2a4259] rounded-lg"
              />

              <button
                type="submit"
                disabled={name.trim().length < 3}
                className={`mt-10 w-full py-3 rounded-full font-semibold tracking-widest transition
                  ${name.trim().length < 3
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-[#2e495b] text-white hover:scale-105'}`}
              >
                LANJUT
              </button>
            </motion.form>
          )}

          {/* UCAPAN */}
          {scene === "greeting" && (
            <motion.div
              key="greeting"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-md p-8 bg-white/40 backdrop-blur-xl rounded-[35px] shadow-2xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#2a4259] mb-4">
                Happy Eid 1447 H, {name}!
              </h2>
              <p className="text-[#2a4259] text-lg leading-relaxed mb-6">
                Maafin ya kalau ada kata-kata yang nggak sengaja bikin baper. Moga-moga amal kita diterima ya!
              </p>

              <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#4f7c3c]"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
            </motion.div>
          )}

          {/* IDUL FITRI */}
          {scene === "eid" && (
            <motion.div
              key="eid"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <img
                src="/Idul Fitri.png"
                className="w-full max-w-md md:w-96 -mt-10"
                alt="Idul Fitri"
              />
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}