import { FaRobot } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-18 sm:px-8 lg:px-10">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 shadow-lg shadow-cyan-500/20 sm:rounded-2xl sm:p-3">
            <FaRobot className="text-lg text-white sm:text-xl" />
          </div>

          <div>
            <h1 className="text-base font-bold tracking-tight text-white sm:text-lg">
              AI Investment
            </h1>
            <p className="text-xs text-slate-400 sm:text-sm">Research Agent</p>
          </div>
        </div>

        {/* Tech badges — hidden on small screens */}
        <div className="hidden shrink-0 items-center gap-2 md:flex lg:gap-3">
          {[
            { label: "LangChain", tone: "bg-cyan-500/10 text-cyan-300" },
            { label: "LangGraph", tone: "bg-emerald-500/10 text-emerald-300" },
            { label: "Groq AI", tone: "bg-violet-500/10 text-violet-300" },
          ].map((item) => (
            <span
              key={item.label}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold lg:px-4 lg:py-2 lg:text-sm ${item.tone}`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;