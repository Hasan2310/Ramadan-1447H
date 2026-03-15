import { motion } from "framer-motion";
import '../App.css';

export default function LanternSection() {

  return (
    <section className="h-screen flex items-center justify-center gap-10">

      {[1,2,3].map((i) => (
        <motion.div
          key={i}
          whileHover={{ y: -20 }}
          className="text-5xl cursor-pointer"
        >
          🏮
        </motion.div>
      ))}

    </section>
  );
}