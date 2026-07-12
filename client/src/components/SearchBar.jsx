import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company.trim()) return;

    onSearch(company.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full min-w-0 flex-col items-stretch gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-2.5 shadow-inner shadow-black/20 sm:flex-row sm:items-center sm:rounded-[1.75rem] sm:p-3"
    >
      <div className="relative min-w-0 flex-1">
        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 sm:left-5" />

        <input
          type="text"
          size={1}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter a company (Tesla, Apple, Microsoft...)"
          className="w-full rounded-xl border border-white/10 bg-slate-900 py-3 pl-11 pr-4 text-base text-slate-100 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 sm:rounded-2xl sm:py-4 sm:pl-14 sm:pr-5 sm:text-lg"
        />
      </div>

      <button
        type="submit"
        className="shrink-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 sm:rounded-2xl sm:px-8 sm:py-4"
      >
        Analyze
      </button>
    </form>
  );
}

export default SearchBar;