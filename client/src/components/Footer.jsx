import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiLangchain,
} from "react-icons/si";
import { HiLightningBolt } from "react-icons/hi";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/80 sm:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Branding */}
          <div className="max-w-md">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              AI Investment Research Agent
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Analyze publicly traded companies using AI, financial insights,
              market news, and risk assessment.
            </p>
          </div>

          {/* Tech stack icons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-2.5">
              <FaReact className="text-xl text-cyan-300" />
            </div>
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-2.5">
              <FaNodeJs className="text-xl text-emerald-300" />
            </div>
            <div className="rounded-xl border border-sky-400/20 bg-sky-500/10 p-2.5">
              <SiTailwindcss className="text-xl text-sky-300" />
            </div>
            <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 p-2.5">
              <SiLangchain className="text-xl text-violet-300" />
            </div>
            <div className="rounded-xl border border-orange-400/20 bg-orange-500/10 p-2.5">
              <HiLightningBolt className="text-xl text-orange-300" />
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/10 p-2.5 transition hover:bg-white/20"
            >
              <FaGithub className="text-lg text-slate-200" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/10 p-2.5 transition hover:bg-white/20"
            >
              <FaLinkedin className="text-lg text-cyan-300" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 border-t border-white/5 pt-6">
          <p className="text-center text-xs text-slate-500 sm:text-sm">
            © {year} AI Investment Research Agent
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;