import { motion } from "framer-motion";
import '../App.css';

export default function GreetingCard() {
  return (
    <section className="h-screen flex items-center justify-center">

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl text-center max-w-md"
      >

        <h2 className="text-3xl font-semibold mb-4">
          Selamat Menunaikan Ibadah Puasa
        </h2>

        <p>
          Semoga Ramadan ini membawa keberkahan,
          kedamaian, dan ampunan bagi kita semua.
        </p>

        <p className="mt-6 text-sm opacity-70">
          Hasan Ahmad Halibah
        </p>

      </motion.div>

    </section>
  );
}