import { motion } from "framer-motion";
import '../App.css';

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold"
      >
        Marhaban Ya Ramadan
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-lg"
      >
        1447 Hijriyah
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 px-6 py-3 bg-emerald-500 rounded-xl"
      >
        Buka Ucapan
      </motion.button>

    </section>
  );
}