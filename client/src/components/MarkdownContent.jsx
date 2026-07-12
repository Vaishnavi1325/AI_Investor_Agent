import ReactMarkdown from "react-markdown";

function MarkdownContent({ children, className = "" }) {
  return (
    <div className={`markdown-content ${className}`.trim()}>
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="mb-4 leading-7 text-slate-700">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="mb-4 text-2xl font-semibold text-slate-900">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 text-xl font-semibold text-slate-900">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-700">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-4 rounded-r-xl border-l-4 border-blue-500 bg-blue-50/70 py-2 pl-4 italic text-slate-700">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">
              {children}
            </code>
          ),
        }}
      >
        {children || "No details available yet."}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownContent;
