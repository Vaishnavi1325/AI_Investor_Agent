import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

import OverviewCard from "../components/OverviewCard";
import FinancialCard from "../components/FinancialCard";
import NewsCard from "../components/NewsCard";
import RiskCard from "../components/RiskCard";
import DecisionCard from "../components/DecisionCard";

import api from "../services/api";

const starterCompanies = ["Tesla", "Apple", "Microsoft", "Nvidia"];

function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeCompany = async (company) => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await api.post("/api/analyze", {
        company,
      });

      setResult(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[12%] h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-5%] left-1/3 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <Navbar />

      <main className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-14">
        {/* ── Hero section ── */}
        <section className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-[0_30px_100px_-30px_rgba(2,8,23,0.9)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 md:p-10 lg:p-12">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            {/* Left column — headline + search */}
            <div className="min-w-0">
              <span className="mb-5 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-300 sm:text-sm">
                AI-powered market intelligence
              </span>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl">
                Research any stock
                <span className="mt-1 block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent sm:mt-2">
                  with confidence
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Analyze public companies with AI-driven insight into financial
                performance, recent news, key risks, and the final investment
                recommendation.
              </p>

              <div className="mt-7">
                <SearchBar onSearch={analyzeCompany} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                {starterCompanies.map((company) => (
                  <button
                    key={company}
                    type="button"
                    onClick={() => analyzeCompany(company)}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-500/10"
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>

            {/* Right column — analyst snapshot */}
            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl sm:rounded-[1.75rem] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-white sm:text-lg">
                  Live analyst snapshot
                </h2>
                <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 sm:text-sm">
                  Online
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Company scan", "Instant company overview and positioning"],
                  ["Financial pulse", "Latest performance and health signals"],
                  ["Risk radar", "Top threats and downside watchpoints"],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/10 bg-slate-950/60 p-4 sm:rounded-2xl"
                  >
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Loading state ── */}
        {loading && (
          <div className="mt-10">
            <Loading />
          </div>
        )}

        {/* ── Error state ── */}
        {error && (
          <div className="mt-8 rounded-[1.5rem] border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-center text-sm font-medium text-rose-300 shadow-sm">
            {error}
          </div>
        )}

        {/* ── Results ── */}
        {result && (
          <section className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <OverviewCard overview={result.overview} />
              <FinancialCard financials={result.financials} />
              <NewsCard news={result.news} />
              <RiskCard risks={result.risks} />
            </div>

            <div className="space-y-6">
              <DecisionCard decision={result.decision} />
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_60px_-25px_rgba(2,8,23,0.9)] backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Insight stack
                </p>
                <div className="mt-5 space-y-3">
                  {[
                    "Momentum and valuation context",
                    "Recent developments and sentiment",
                    "Decision-ready summary and risk review",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/10 p-3 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;