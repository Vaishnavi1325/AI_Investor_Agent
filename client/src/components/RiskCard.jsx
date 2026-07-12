import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import MarkdownContent from "./MarkdownContent";

function RiskCard({ risks }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-w-0 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-7 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.3)] backdrop-blur sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-rose-100 p-3">
          <FaExclamationTriangle className="text-xl text-rose-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Investment Risks</h2>
          <p className="text-sm text-slate-500">Key risks to consider before investing</p>
        </div>
      </div>

      <MarkdownContent>{risks}</MarkdownContent>
    </motion.section>
  );
}

export default RiskCard;