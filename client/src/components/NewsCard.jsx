import { motion } from "framer-motion";
import { FaNewspaper } from "react-icons/fa";
import MarkdownContent from "./MarkdownContent";

function NewsCard({ news }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-w-0 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-7 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.3)] backdrop-blur sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-sky-100 p-3">
          <FaNewspaper className="text-xl text-sky-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Latest News</h2>
          <p className="text-sm text-slate-500">Recent developments and market sentiment</p>
        </div>
      </div>

      <MarkdownContent>{news}</MarkdownContent>
    </motion.section>
  );
}

export default NewsCard;