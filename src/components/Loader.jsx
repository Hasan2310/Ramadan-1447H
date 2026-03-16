import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } 
          }}
          className="fixed inset-0 z-[999] bg-white flex items-center justify-center overflow-hidden"
        >
          {/* Background Glow Soft - Biar ngga flat putih */}
          <div className="absolute w-[500px] h-[500px] bg-sky-50/60 rounded-full blur-[120px]" />

          <div className="relative flex items-center justify-center">
            
            {/* Ring Biru Muda Modern (High-End Stroke) */}
            <svg className="absolute w-48 h-48 rotate-[-90deg]">
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="transparent"
                className="text-slate-100"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray="552.9" // 2 * PI * 88
                strokeLinecap="round"
                className="text-sky-400"
                animate={{ 
                  strokeDashoffset: [552, 150, 552],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            </svg>

            {/* Ketupat Besar dengan Animasi Zoom In-Out (Breathing) */}
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                filter: ["brightness(1)", "brightness(1.05)", "brightness(1)"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 flex items-center justify-center"
            >
              {/* Soft Shadow di belakang ketupat */}
              <div className="absolute w-20 h-20 bg-emerald-200/20 blur-2xl rounded-full" />
              
              <img
                src="/Memuat Halaman.png"
                alt="Logo Ketupat"
                className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
              />
            </motion.div>
          </div>

          {/* Footer minimalis tanpa teks memuat */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            className="absolute bottom-10 flex gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                className="w-1 h-1 bg-slate-400 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}