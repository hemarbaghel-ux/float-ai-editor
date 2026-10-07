import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Terminal, 
  Search, 
  ShieldCheck, 
  Cpu, 
  GitCommit, 
  FileCode2, 
  ArrowRight,
  Zap,
  CheckCircle2,
  Lock,
  Workflow
} from 'lucide-react';

export default function FeaturesShowcase({ onLaunchStudio }) {
  const [activeFeatureTab, setActiveFeatureTab] = useState('composer');

  return (
    <section className="features-section" id="features">
      <div className="section-header text-center">
        <div className="pill pill-cyan">
          <Cpu size={13} />
          <span>Architecture & Capabilities</span>
        </div>
        <h2 className="section-title">
          Engineered for Engineers Who <br />
          <span className="gradient-text-cyan">Refuse to Wait on Boilerplate.</span>
        </h2>
        <p className="section-subtitle">
          Float rebuilds the modern developer workflow around deep AI intelligence.
          Every feature is designed to keep you in high-frequency flow state.
        </p>
      </div>

      {/* Feature Navigation Tabs */}
      <div className="feature-tabs-wrapper" id="composer">
        <div className="feature-nav-pills">
          <button 
            className={`feature-nav-btn ${activeFeatureTab === 'composer' ? 'active' : ''}`}
            onClick={() => setActiveFeatureTab('composer')}
          >
            <Workflow size={16} />
            <span>Float Composer</span>
          </button>
          <button 
            className={`feature-nav-btn ${activeFeatureTab === 'tab' ? 'active' : ''}`}
            onClick={() => setActiveFeatureTab('tab')}
          >
            <Zap size={16} />
            <span>Float Tab</span>
          </button>
          <button 
            className={`feature-nav-btn ${activeFeatureTab === 'inline' ? 'active' : ''}`}
            onClick={() => setActiveFeatureTab('inline')}
          >
            <Sparkles size={16} />
            <span>Inline Edit (Cmd+K)</span>
          </button>
          <button 
            className={`feature-nav-btn ${activeFeatureTab === 'context' ? 'active' : ''}`}
            onClick={() => setActiveFeatureTab('context')}
          >
            <Search size={16} />
            <span>Codebase Graph (@)</span>
          </button>
          <button 
            className={`feature-nav-btn ${activeFeatureTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveFeatureTab('terminal')}
          >
            <Terminal size={16} />
            <span>Autonomous Terminal</span>
          </button>
          <button 
            className={`feature-nav-btn ${activeFeatureTab === 'rules' ? 'active' : ''}`}
            onClick={() => setActiveFeatureTab('rules')}
          >
            <ShieldCheck size={16} />
            <span>Project Rules (.floatrules)</span>
          </button>
        </div>

        {/* Dynamic Feature Showcase Canvas */}
        <div className="feature-canvas glass-panel">
          {activeFeatureTab === 'composer' && (
            <div className="feature-grid-content animate-fade-in">
              <div className="feature-info-col">
                <div className="pill pill-primary">
                  <Workflow size={12} />
                  <span>Multi-File Agent</span>
                </div>
                <h3 className="feature-heading">Autonomous feature creation across entire codebases.</h3>
                <p className="feature-body">
                  Press <strong>Cmd+I</strong> to summon Composer. Float parses natural language requirements,
                  traverses your file graph, modifies multiple interdependent files simultaneously, 
                  and validates that types align across your frontend, backend, and database schema.
                </p>
                <ul className="feature-check-list">
                  <li><CheckCircle2 size={16} className="text-emerald" /> Simultaneous multi-file diff previews</li>
                  <li><CheckCircle2 size={16} className="text-emerald" /> One-click "Accept All" or granular file-by-file review</li>
                  <li><CheckCircle2 size={16} className="text-emerald" /> Auto-recovers from syntax & lint discrepancies</li>
                </ul>
                <button className="btn btn-primary" onClick={onLaunchStudio}>
                  <span>Try Composer in Studio</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="feature-visual-col">
                <div className="mock-composer-panel code-font">
                  <div className="composer-header">
                    <span className="dot dot-green"></span>
                    <span>Float Composer • Task #2491</span>
                    <span className="badge-badge">Autonomous</span>
                  </div>
                  <div className="composer-prompt-box">
                    <div className="composer-prompt-label">Prompt:</div>
                    <div className="composer-prompt-text">
                      "Implement Stripe billing subscription webhook handler in api/billing.ts and update UserTier component in frontend/App.tsx"
                    </div>
                  </div>
                  <div className="composer-steps">
                    <div className="c-step done">✓ Read <code>api/billing.ts</code> and <code>frontend/App.tsx</code></div>
                    <div className="c-step done">✓ Synthesized webhook signature verification logic</div>
                    <div className="c-step active">⚡ Applying synchronized diff to 2 target files...</div>
                  </div>
                  <div className="composer-diff-cards">
                    <div className="c-diff-card">
                      <div className="c-diff-title"><code>api/billing.ts</code> <span className="diff-stat">+34, -4</span></div>
                      <div className="c-diff-preview text-emerald">+ export async function handleStripeWebhook(req, res)</div>
                    </div>
                    <div className="c-diff-card">
                      <div className="c-diff-title"><code>frontend/App.tsx</code> <span className="diff-stat">+18, -2</span></div>
                      <div className="c-diff-preview text-emerald">+ const &#123; tier, status &#125; = useSubscription();</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'tab' && (
            <div className="feature-grid-content animate-fade-in">
              <div className="feature-info-col">
                <div className="pill pill-cyan">
                  <Zap size={12} />
                  <span>Next-Gen Autocomplete</span>
                </div>
                <h3 className="feature-heading">Predicting your next 5 keystrokes with zero latency.</h3>
                <p className="feature-body">
                  Unlike traditional single-token copilot autocompletes, Float Tab anticipates multi-line 
                  intent. It understands cursor momentum, your recent diff history, and nearby variable declarations 
                  to suggest whole function implementations. Just press <strong>Tab</strong> to accept.
                </p>
                <ul className="feature-check-list">
                  <li><CheckCircle2 size={16} className="text-cyan" /> Sub-20ms inference streaming engine</li>
                  <li><CheckCircle2 size={16} className="text-cyan" /> Multi-cursor cursor jump predictions</li>
                  <li><CheckCircle2 size={16} className="text-cyan" /> 94% acceptance accuracy on idiomatic TypeScript</li>
                </ul>
                <button className="btn btn-secondary" onClick={onLaunchStudio}>
                  <span>Experience Float Tab</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="feature-visual-col">
                <div className="mock-code-window code-font">
                  <div className="mock-code-bar">
                    <span>FloatTab_Predictor.ts</span>
                  </div>
                  <div className="mock-code-content">
                    <div className="code-line"><span className="line-no">1</span><span>export function parseTelemetry(payload) {'{'}</span></div>
                    <div className="code-line"><span className="line-no">2</span><span>  const {'{'} event, timestamp {'}'} = payload;</span></div>
                    <div className="code-line ghost-highlight">
                      <span className="line-no">3</span>
                      <span className="ghost-text">  if (!event || !timestamp) return null;</span>
                    </div>
                    <div className="code-line ghost-highlight">
                      <span className="line-no">4</span>
                      <span className="ghost-text">  const duration = Date.now() - timestamp;</span>
                    </div>
                    <div className="code-line ghost-highlight">
                      <span className="line-no">5</span>
                      <span className="ghost-text">  return {'{'} ...payload, latencyMs: duration {'}'};</span>
                    </div>
                    <div className="code-line"><span className="line-no">6</span><span>{'}'}</span></div>
                  </div>
                  <div className="mock-tab-hint">
                    <span className="tab-pill">Press Tab ⇥ to accept multi-line completion</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'inline' && (
            <div className="feature-grid-content animate-fade-in">
              <div className="feature-info-col">
                <div className="pill pill-primary">
                  <Sparkles size={12} />
                  <span>Cmd+K In-Place</span>
                </div>
                <h3 className="feature-heading">Never switch out of your file to consult an LLM.</h3>
                <p className="feature-body">
                  Highlight any block of code and press <strong>Cmd+K</strong>. Tell Float what you need — 
                  "Refactor to use TanStack Query", "Add input sanitization", "Write unit tests", or "Convert to async/await".
                  Float renders an inline diff right in your editor gutter with zero distraction.
                </p>
                <ul className="feature-check-list">
                  <li><CheckCircle2 size={16} className="text-emerald" /> In-place side-by-side or unified diff viewing</li>
                  <li><CheckCircle2 size={16} className="text-emerald" /> Cmd+Enter to commit immediately to source</li>
                  <li><CheckCircle2 size={16} className="text-emerald" /> Undo anytime with standard editor history</li>
                </ul>
                <button className="btn btn-primary" onClick={onLaunchStudio}>
                  <span>Try Cmd+K in Studio</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="feature-visual-col">
                <div className="mock-cmdk-preview code-font">
                  <div className="cmdk-bubble">
                    <Sparkles size={14} className="text-cyan" />
                    <span>Optimize with React.useMemo and add debounce</span>
                  </div>
                  <div className="cmdk-diff-render">
                    <div className="diff-line-del">- const filtered = list.filter(item =&gt; item.active);</div>
                    <div className="diff-line-add">+ const filtered = useMemo(() =&gt; {'{'}</div>
                    <div className="diff-line-add">+   return list.filter(item =&gt; item.active);</div>
                    <div className="diff-line-add">+ {'}'}, [list]);</div>
                  </div>
                  <div className="cmdk-actions-footer">
                    <span className="btn-kbd-small">Cmd+Enter: Accept</span>
                    <span className="btn-kbd-small">Esc: Reject</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'context' && (
            <div className="feature-grid-content animate-fade-in">
              <div className="feature-info-col">
                <div className="pill pill-cyan">
                  <Search size={12} />
                  <span>Semantic Index Graph</span>
                </div>
                <h3 className="feature-heading">The engine that truly understands your entire repository.</h3>
                <p className="feature-body">
                  Float continuously creates vector embeddings and AST graphs of every symbol, type definition, 
                  and doc comment. Reference anything in prompts with <code>@codebase</code>, <code>@web</code>, 
                  <code>@docs</code>, <code>@git</code>, or specific file paths for razor-sharp precision.
                </p>
                <ul className="feature-check-list">
                  <li><CheckCircle2 size={16} className="text-cyan" /> 100,000+ file indexing capability in seconds</li>
                  <li><CheckCircle2 size={16} className="text-cyan" /> Live web documentation search crawler</li>
                  <li><CheckCircle2 size={16} className="text-cyan" /> Git commit & PR diff context awareness</li>
                </ul>
                <button className="btn btn-secondary" onClick={onLaunchStudio}>
                  <span>Explore Indexing</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="feature-visual-col">
                <div className="mock-context-pills-view">
                  <div className="context-search-bar code-font">
                    <Search size={14} className="text-dim" />
                    <span>@codebase How does our authentication middleware handle refresh tokens?</span>
                  </div>
                  <div className="context-graph-results">
                    <div className="context-result-card">
                      <span className="badge-pill">@file</span>
                      <span className="result-name">src/auth/jwtService.ts</span>
                      <span className="result-score">99.4% Match</span>
                    </div>
                    <div className="context-result-card">
                      <span className="badge-pill">@symbol</span>
                      <span className="result-name">class TokenRotationHandler</span>
                      <span className="result-score">96.8% Match</span>
                    </div>
                    <div className="context-result-card">
                      <span className="badge-pill">@docs</span>
                      <span className="result-name">NextAuth.js v5 Specification</span>
                      <span className="result-score">External</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'terminal' && (
            <div className="feature-grid-content animate-fade-in">
              <div className="feature-info-col">
                <div className="pill pill-emerald">
                  <Terminal size={12} />
                  <span>Terminal Co-Pilot</span>
                </div>
                <h3 className="feature-heading">Turn natural language into executed commands.</h3>
                <p className="feature-body">
                  Forget cryptic git flags and build configurations. Ask Float to "rebase against main and stash untracked files" 
                  or let it analyze broken test traces. Float reads compiler errors, diagnoses root causes, 
                  and offers 1-click fixes right in the terminal.
                </p>
                <ul className="feature-check-list">
                  <li><CheckCircle2 size={16} className="text-emerald" /> Automatic stack trace & compiler diagnostics</li>
                  <li><CheckCircle2 size={16} className="text-emerald" /> One-click "Float Fix" for broken build commands</li>
                  <li><CheckCircle2 size={16} className="text-emerald" /> Works with bash, zsh, fish, and powershell</li>
                </ul>
                <button className="btn btn-primary" onClick={onLaunchStudio}>
                  <span>Try Terminal in Studio</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="feature-visual-col">
                <div className="mock-terminal-window code-font">
                  <div className="terminal-header">
                    <div className="window-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <span>float-terminal — zsh</span>
                  </div>
                  <div className="terminal-body">
                    <div className="t-line"><span className="t-prompt">$</span> <span>npm test</span></div>
                    <div className="t-line t-error">✕ Error: ECONNREFUSED 127.0.0.1:5432 (Postgres is down)</div>
                    <div className="t-ai-box">
                      <div className="t-ai-head">
                        <Sparkles size={13} className="text-cyan" />
                        <span>Float Diagnosis: Postgres service is stopped</span>
                      </div>
                      <div className="t-ai-suggestion">
                        Suggested command: <code>brew services start postgresql@16</code>
                        <button className="btn btn-emerald btn-xs">Run Fix (Enter)</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'rules' && (
            <div className="feature-grid-content animate-fade-in">
              <div className="feature-info-col">
                <div className="pill pill-primary">
                  <ShieldCheck size={12} />
                  <span>Workspace AI Guardrails</span>
                </div>
                <h3 className="feature-heading">Rules that persist across your entire team (.floatrules).</h3>
                <p className="feature-body">
                  Never repeat yourself in prompts again. Declare framework conventions, architectural patterns, 
                  and strict typing guidelines once in <code>.floatrules</code>. Every <strong>Cmd+K</strong> refactor, 
                  <strong>Composer</strong> run, and chat response automatically follows your repo's bespoke standards.
                </p>
                <ul className="feature-check-list">
                  <li><CheckCircle2 size={16} className="text-emerald" /> Git-tracked instructions shared across all team members</li>
                  <li><CheckCircle2 size={16} className="text-emerald" /> Enforces TypeScript strictness, custom design systems & lint rules</li>
                  <li><CheckCircle2 size={16} className="text-emerald" /> Compatible with existing <code>.cursorrules</code> configs</li>
                </ul>
                <button className="btn btn-primary" onClick={onLaunchStudio}>
                  <span>Configure Rules in Studio</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="feature-visual-col">
                <div className="mock-code-window code-font">
                  <div className="mock-code-bar">
                    <ShieldCheck size={12} className="text-indigo" />
                    <span>.floatrules (Active Workspace System Prompt)</span>
                  </div>
                  <div className="mock-code-content">
                    <div className="code-line"><span className="line-no">1</span><span className="tok-comment"># Project Architecture & Quality Rules</span></div>
                    <div className="code-line"><span className="line-no">2</span><span>- [Framework]: React 19 functional hooks only</span></div>
                    <div className="code-line"><span className="line-no">3</span><span>- [Types]: Strict interfaces with zero 'any'</span></div>
                    <div className="code-line"><span className="line-no">4</span><span>- [Styling]: Use theme.css variables only</span></div>
                    <div className="code-line"><span className="line-no">5</span><span>- [Tests]: Always generate corresponding Vitest spec</span></div>
                  </div>
                  <div className="mock-tab-hint">
                    <span className="badge-pill">✓ Injected into all AI generations</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature Cards Trio */}
      <div className="feature-cards-grid">
        <div className="feature-card glass-panel">
          <div className="card-icon-wrap bg-indigo-glow">
            <Lock size={22} className="text-indigo" />
          </div>
          <h4>Zero Retention Privacy</h4>
          <p>
            Your code belongs to you. In Privacy Mode, none of your code is ever stored, 
            persisted on third-party servers, or used for model training. SOC-2 Type II verified.
          </p>
        </div>

        <div className="feature-card glass-panel">
          <div className="card-icon-wrap bg-cyan-glow">
            <Layers size={22} className="text-cyan" />
          </div>
          <h4>Full VS Code Compatibility</h4>
          <p>
            Float imports your entire VS Code setup in 10 seconds: extensions, keybindings, 
            color themes, snippets, and workspaces. Zero friction migration.
          </p>
        </div>

        <div className="feature-card glass-panel">
          <div className="card-icon-wrap bg-emerald-glow">
            <Cpu size={22} className="text-emerald" />
          </div>
          <h4>Bring Your Own Key (BYOK)</h4>
          <p>
            Connect directly to Google Gemini 1.5 Pro, Claude 3.5 Sonnet, GPT-4o, or self-hosted 
            Ollama / DeepSeek models with zero platform markup.
          </p>
        </div>
      </div>
    </section>
  );
}
