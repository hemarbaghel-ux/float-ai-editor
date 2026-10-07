import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Download, 
  Play, 
  Terminal, 
  Check, 
  Command, 
  Zap, 
  Layers, 
  ShieldCheck, 
  ChevronRight,
  Code2,
  GitBranch,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeroSection({ onLaunchStudio, onOpenDownload }) {
  // Interactive Hero Preview State
  const [activeTab, setActiveTab] = useState('AppStream.ts');
  const [isEditing, setIsEditing] = useState(false);
  const [diffApplied, setDiffApplied] = useState(false);
  const [promptInput, setPromptInput] = useState('Refactor to handle SSE streaming with automatic backpressure');
  const [isGenerating, setIsGenerating] = useState(false);

  const heroFiles = {
    'AppStream.ts': {
      lang: 'typescript',
      original: `// Float High-Performance Stream Pipeline
export async function initializeTelemetryStream(endpoint: string) {
  const socket = new WebSocket(endpoint);
  
  socket.onmessage = (event) => {
    const packet = JSON.parse(event.data);
    processMetrics(packet);
  };
  
  return socket;
}`,
      diff: [
        { type: 'del', line: `  const socket = new WebSocket(endpoint);` },
        { type: 'add', line: `  // Float Optimized: Zero-copy backpressure controller` },
        { type: 'add', line: `  const stream = new ReadableStream({` },
        { type: 'add', line: `    async start(controller) {` },
        { type: 'add', line: `      const response = await fetch(endpoint, { cache: 'no-store' });` },
        { type: 'add', line: `      const reader = response.body?.getReader();` },
        { type: 'add', line: `      while (reader) {` },
        { type: 'add', line: `        const { done, value } = await reader.read();` },
        { type: 'add', line: `        if (done) break;` },
        { type: 'add', line: `        controller.enqueue(decodeFast(value));` },
        { type: 'add', line: `      }` },
        { type: 'add', line: `    }` },
        { type: 'add', line: `  });` },
      ],
      applied: `// Float High-Performance Stream Pipeline
export async function initializeTelemetryStream(endpoint: string) {
  // Float Optimized: Zero-copy backpressure controller
  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch(endpoint, { cache: 'no-store' });
      const reader = response.body?.getReader();
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        controller.enqueue(decodeFast(value));
      }
    }
  });
  
  return stream;
}`
    },
    'AuthAgent.go': {
      lang: 'go',
      original: `package auth

func AuthenticateBearer(token string) bool {
    return len(token) > 32
}`,
      diff: [
        { type: 'del', line: `    return len(token) > 32` },
        { type: 'add', line: `    // Constant-time timing safe evaluation` },
        { type: 'add', line: `    claims, err := jwt.ParseWithClaims(token, &CustomClaims{}, KeyFunc)` },
        { type: 'add', line: `    return err == nil && claims.Valid && subtle.ConstantTimeCompare(...) == 1` }
      ],
      applied: `package auth

func AuthenticateBearer(token string) bool {
    // Constant-time timing safe evaluation
    claims, err := jwt.ParseWithClaims(token, &CustomClaims{}, KeyFunc)
    return err == nil && claims.Valid && subtle.ConstantTimeCompare(...) == 1
}`
    }
  };

  const handleSimulateEdit = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsEditing(true);
    }, 600);
  };

  const handleAcceptDiff = (e) => {
    setDiffApplied(true);
    setIsEditing(false);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleReset = () => {
    setDiffApplied(false);
    setIsEditing(false);
  };

  return (
    <section className="hero-section">
      <div className="radial-glow"></div>
      
      {/* Announcement Pill */}
      <div className="hero-announcement">
        <div className="pill pill-primary">
          <Zap size={13} className="text-indigo" />
          <span>Float 2.5 is here</span>
          <span className="pill-divider">•</span>
          <span className="text-secondary">Autonomous Multi-File Composer</span>
          <ChevronRight size={13} />
        </div>
      </div>

      {/* Main Headline */}
      <div className="hero-content">
        <h1 className="hero-title">
          The AI Code Editor Built to <br />
          <span className="gradient-text">Amplify Developer Velocity.</span>
        </h1>
        <p className="hero-subtitle">
          Float pairs instant codebase index reasoning with autonomous multi-file execution.
          Predict your next edits with <strong>Float Tab</strong>, refactor in-place with <strong>Cmd+K</strong>, 
          and let <strong>Composer</strong> turn natural language into working code.
        </p>

        {/* Hero CTAs */}
        <div className="hero-actions">
          <button className="btn btn-primary btn-lg glow-btn" onClick={onLaunchStudio}>
            <Play size={16} fill="currentColor" />
            <span>Launch Web Studio</span>
            <span className="btn-kbd">Free</span>
          </button>
          
          <button className="btn btn-secondary btn-lg" onClick={onOpenDownload}>
            <Download size={16} />
            <span>Download Float</span>
            <span className="platform-tag">v2.5.4</span>
          </button>
        </div>

        {/* Metrics Counter Bar */}
        <div className="hero-metrics">
          <div className="metric-item">
            <span className="metric-num">3.8x</span>
            <span className="metric-desc">Faster Delivery Speed</span>
          </div>
          <div className="metric-sep"></div>
          <div className="metric-item">
            <span className="metric-num">12ms</span>
            <span className="metric-desc">AST Semantic Indexing</span>
          </div>
          <div className="metric-sep"></div>
          <div className="metric-item">
            <span className="metric-num">94%</span>
            <span className="metric-desc">Tab Acceptance Rate</span>
          </div>
          <div className="metric-sep"></div>
          <div className="metric-item">
            <span className="metric-num">Zero</span>
            <span className="metric-desc">Code Retention Mode</span>
          </div>
        </div>
      </div>

      {/* Interactive Hero Editor Playground Preview */}
      <div className="hero-preview-wrapper" id="demo">
        <div className="hero-preview-glow"></div>
        <div className="hero-editor-frame glass-panel">
          
          {/* Editor Window Titlebar */}
          <div className="editor-topbar">
            <div className="window-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            
            <div className="editor-tabs">
              {Object.keys(heroFiles).map(fileName => (
                <button
                  key={fileName}
                  className={`editor-tab ${activeTab === fileName ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(fileName);
                    setIsEditing(false);
                    setDiffApplied(false);
                  }}
                >
                  <Code2 size={13} className="tab-icon" />
                  <span>{fileName}</span>
                  {diffApplied && <span className="tab-dot-modified"></span>}
                </button>
              ))}
            </div>

            <div className="editor-window-actions">
              <button className="btn btn-ghost btn-xs" onClick={handleReset} title="Reset Simulation">
                <RefreshCw size={13} />
                <span>Reset</span>
              </button>
              <button className="btn btn-primary btn-xs" onClick={onLaunchStudio}>
                <span>Open in Full Studio</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Floating Cmd+K In-Line Prompt Bar */}
          <div className="floating-cmdk-bar">
            <div className="cmdk-inner">
              <div className="cmdk-icon-badge">
                <Sparkles size={15} className="text-cyan pulse-glow" />
              </div>
              <input 
                type="text" 
                className="cmdk-input"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask Float to edit, refactor, or generate code..."
              />
              <div className="cmdk-actions">
                <span className="cmdk-badge">
                  <Command size={11} /> K
                </span>
                <button 
                  className="btn btn-primary btn-sm btn-cmdk-submit"
                  onClick={handleSimulateEdit}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Synthesizing...' : 'Generate Diff'}
                </button>
              </div>
            </div>
          </div>

          {/* Code Body with Real Diff Rendering */}
          <div className="editor-code-body code-font">
            {isEditing ? (
              <div className="diff-view-container animate-fade-in">
                <div className="diff-banner">
                  <span className="diff-count">+11 lines, -1 line</span>
                  <div className="diff-banner-buttons">
                    <button className="btn btn-secondary btn-xs" onClick={() => setIsEditing(false)}>
                      Reject (Esc)
                    </button>
                    <button className="btn btn-emerald btn-xs" onClick={handleAcceptDiff}>
                      <Check size={13} />
                      Accept (Cmd+Enter)
                    </button>
                  </div>
                </div>

                <div className="diff-lines-wrapper">
                  <div className="code-line"><span className="line-no">1</span><span>{heroFiles[activeTab].original.split('\n')[0]}</span></div>
                  <div className="code-line"><span className="line-no">2</span><span>{heroFiles[activeTab].original.split('\n')[1]}</span></div>
                  {heroFiles[activeTab].diff.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`code-line ${item.type === 'del' ? 'diff-line-del' : 'diff-line-add'}`}
                    >
                      <span className="line-no">{item.type === 'del' ? '-' : '+'}</span>
                      <span>{item.line}</span>
                    </div>
                  ))}
                  <div className="code-line"><span className="line-no">15</span><span>{'}'}</span></div>
                </div>
              </div>
            ) : diffApplied ? (
              <div className="code-lines-wrapper animate-fade-in">
                {heroFiles[activeTab].applied.split('\n').map((line, idx) => (
                  <div key={idx} className="code-line">
                    <span className="line-no">{idx + 1}</span>
                    <span className="line-content">{line}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="code-lines-wrapper">
                {heroFiles[activeTab].original.split('\n').map((line, idx) => (
                  <div key={idx} className="code-line">
                    <span className="line-no">{idx + 1}</span>
                    <span className="line-content">{line}</span>
                    {idx === 4 && <span className="cursor-blink"></span>}
                  </div>
                ))}
                
                {/* Simulated Float Tab Ghost Suggestion */}
                <div className="ghost-tab-line">
                  <span className="line-no">9</span>
                  <span className="ghost-text">// Float Tab: press [Tab] to accept multi-line prediction stream</span>
                  <span className="ghost-tab-pill">Tab ⇥</span>
                </div>
              </div>
            )}
          </div>

          {/* Editor Status Bar */}
          <div className="editor-bottom-bar">
            <div className="status-left">
              <span className="status-item"><GitBranch size={12} /> main</span>
              <span className="status-item text-dim">UTF-8</span>
              <span className="status-item text-dim">{heroFiles[activeTab].lang}</span>
            </div>
            <div className="status-right">
              <span className="status-item text-cyan">
                <Sparkles size={12} /> Float Index: Synced (4,210 files)
              </span>
              <span className="status-item">Ln 6, Col 24</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
