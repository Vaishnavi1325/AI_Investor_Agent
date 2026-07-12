import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white/80 px-8 py-16 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100"
      >
        <FaRobot className="text-4xl text-blue-600" />
      </motion.div>

      <h3 className="mt-6 text-2xl font-semibold text-slate-900">
        AI is analyzing...
      </h3>

      <p className="mt-3 max-w-lg text-center text-base leading-7 text-slate-500">
        Gathering company information, financial performance, recent news,
        market risks, and the final investment recommendation.
      </p>

      <div className="mt-8 flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-blue-600"></span>
        <span
          className="h-3 w-3 animate-bounce rounded-full bg-cyan-500"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="h-3 w-3 animate-bounce rounded-full bg-violet-500"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>
    </motion.div>
  );
}

export default Loading;