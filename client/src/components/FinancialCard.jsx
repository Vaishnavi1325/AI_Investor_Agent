import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";
import MarkdownContent from "./MarkdownContent";

function FinancialCard({ financials }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-w-0 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-7 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.3)] backdrop-blur sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-100 p-3">
          <FaChartLine className="text-xl text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Financial Analysis</h2>
          <p className="text-sm text-slate-500">Financial health and key business metrics</p>
        </div>
      </div>

      <MarkdownContent>{financials}</MarkdownContent>
    </motion.section>
  );
}

export default FinancialCard;