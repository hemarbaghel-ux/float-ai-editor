import React from 'react';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';

export default function ComparisonTable() {
  const features = [
    {
      title: "Multi-File Autonomous Editing (Composer)",
      desc: "Applies coherent, synchronized code changes across frontend, backend, and schemas",
      float: true,
      cursor: true,
      copilot: false
    },
    {
      title: "In-Place Inline Diff Generator (Cmd+K)",
      desc: "Visual red/green git diffs directly inside your code gutter with 1-click accept",
      float: true,
      cursor: true,
      copilot: "Partial"
    },
    {
      title: "Predictive Multi-Line Ghost Autocomplete",
      desc: "Predicts cursor jumps and function bodies with sub-20ms inference latency",
      float: true,
      cursor: true,
      copilot: false
    },
    {
      title: "Zero-Install In-Browser Web Studio",
      desc: "Full functional IDE in any modern browser without downloading native binaries",
      float: true,
      cursor: false,
      copilot: false
    },
    {
      title: "Full Codebase AST Indexing & Embedding Graph",
      desc: "Indexes 100,000+ files for @codebase semantic reasoning and references",
      float: true,
      cursor: true,
      copilot: "Limited"
    },
    {
      title: "Autonomous Terminal Co-Pilot with Error Diagnosis",
      desc: "Analyzes stack traces and suggests one-click command fixes for build faults",
      float: true,
      cursor: true,
      copilot: false
    },
    {
      title: "Bring Your Own Key (BYOK) & Free Tier",
      desc: "Use Gemini, Claude, OpenAI, or local Ollama with zero mandatory monthly paywalls",
      float: true,
      cursor: false,
      copilot: false
    },
    {
      title: "Instant 1-Click VS Code Migration",
      desc: "Import extensions, keymaps, settings, and themes seamlessly in 10 seconds",
      float: true,
      cursor: true,
      copilot: true
    }
  ];

  return (
    <section className="comparison-section" id="comparison">
      <div className="section-header text-center">
        <div className="pill pill-primary">
          <Sparkles size={13} />
          <span>Competitive Benchmark</span>
        </div>
        <h2 className="section-title">
          Built as an AI Editor, <br />
          <span className="gradient-text">Not a Bolt-On Extension.</span>
        </h2>
        <p className="section-subtitle">
          See how Float redefines developer velocity compared to standard editors.
        </p>
      </div>

      <div className="comparison-table-wrapper glass-panel">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="col-feature">Capability</th>
              <th className="col-highlight">
                <div className="brand-header-badge">
                  <span className="dot dot-cyan"></span>
                  <span>Float 2.5</span>
                  <span className="leader-pill">Leader</span>
                </div>
              </th>
              <th>Cursor</th>
              <th>VS Code + Copilot</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feat, idx) => (
              <tr key={idx}>
                <td className="feat-cell">
                  <div className="feat-title">{feat.title}</div>
                  <div className="feat-desc">{feat.desc}</div>
                </td>
                <td className="val-cell highlight-cell">
                  {feat.float === true ? (
                    <div className="check-badge-active">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  ) : feat.float}
                </td>
                <td className="val-cell">
                  {feat.cursor === true ? (
                    <Check size={16} className="text-muted" />
                  ) : feat.cursor === false ? (
                    <X size={16} className="text-dim" />
                  ) : (
                    <span className="badge-text">{feat.cursor}</span>
                  )}
                </td>
                <td className="val-cell">
                  {feat.copilot === true ? (
                    <Check size={16} className="text-muted" />
                  ) : feat.copilot === false ? (
                    <X size={16} className="text-dim" />
                  ) : (
                    <span className="badge-text">{feat.copilot}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
