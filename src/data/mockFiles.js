export const INITIAL_FILES = {
  '.floatrules': {
    name: '.floatrules',
    language: 'plaintext',
    content: `# Float AI Project Rules & Guidelines
# These rules are automatically injected into Float Composer, Cmd+K, and Chat.

- [Framework]: Use React 19 functional components with hooks (useCallback, useMemo where optimal).
- [Styling]: Rely on modern CSS variables declared in theme.css. Avoid arbitrary inline styles.
- [TypeScript]: Prefer strict interfaces, explicit return types for exported modules, and zero 'any'.
- [Code Style]: Keep components modular, use early returns to minimize nesting, and add concise JSDoc comments.
- [Performance]: Always clean up event listeners, intervals, and WebSocket buffers in useEffect.
- [Security]: Sanitize user inputs before DOM rendering. Never commit secret tokens or credentials.
`
  },
  'App.jsx': {
    name: 'App.jsx',
    language: 'javascript',
    content: `import React, { useState, useEffect } from 'react';
import './theme.css';

// Float Live Reactive Telemetry Dashboard
export default function App() {
  const [metrics, setMetrics] = useState({
    activeUsers: 14280,
    requestsPerSec: 4210,
    latencyMs: 18.4,
    cacheHitRate: 98.6
  });
  const [isLive, setIsLive] = useState(true);
  const [filter, setFilter] = useState('all');

  // Simulated live telemetry stream
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 15) - 7,
        requestsPerSec: Math.floor(4000 + Math.random() * 450),
        latencyMs: +(18 + Math.random() * 2).toFixed(1),
        cacheHitRate: +(98.2 + Math.random() * 0.8).toFixed(1)
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <span className="badge-live">{isLive ? '● LIVE TELEMETRY' : 'PAUSED'}</span>
          <h1>Float Cloud Stream</h1>
        </div>
        <div className="header-actions">
          <button 
            className="action-btn"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? 'Pause Stream' : 'Resume Stream'}
          </button>
          <button 
            className="action-btn primary"
            onClick={() => alert('Float Agent Sync Initiated!')}
          >
            Sync Agent
          </button>
        </div>
      </header>

      <div className="grid-metrics">
        <div className="metric-card">
          <span className="metric-label">Active Users</span>
          <h2 className="metric-value">{metrics.activeUsers.toLocaleString()}</h2>
          <span className="metric-trend positive">+14.2% vs last hr</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Throughput</span>
          <h2 className="metric-value">{metrics.requestsPerSec.toLocaleString()} req/s</h2>
          <span className="metric-trend positive">Optimized</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">P99 Latency</span>
          <h2 className="metric-value">{metrics.latencyMs} ms</h2>
          <span className="metric-trend positive">-3.4ms lower</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Cache Hit Rate</span>
          <h2 className="metric-value">{metrics.cacheHitRate}%</h2>
          <span className="metric-trend positive">Warm L2 Cache</span>
        </div>
      </div>

      <div className="activity-section">
        <h3>Autonomous Engine Events</h3>
        <ul className="event-list">
          <li className="event-item">
            <span className="event-time">12:44:02</span>
            <span className="event-text">Float Tab indexed 14,920 AST nodes in workspace</span>
          </li>
          <li className="event-item">
            <span className="event-time">12:43:18</span>
            <span className="event-text">Multi-file Composer patched auth middleware</span>
          </li>
          <li className="event-item">
            <span className="event-time">12:41:50</span>
            <span className="event-text">Live sandbox HMR compiled in 4ms</span>
          </li>
        </ul>
      </div>
    </div>
  );
}`
  },
  'theme.css': {
    name: 'theme.css',
    language: 'css',
    content: `/* Float Modern Dashboard Theme */
.dashboard-container {
  padding: 24px;
  background: #090b10;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100%;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.badge-live {
  font-size: 11px;
  font-weight: 700;
  color: #34d399;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 4px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.12);
}

.action-btn.primary {
  background: #6366f1;
  border-color: #818cf8;
  color: #ffffff;
}

.action-btn.primary:hover {
  background: #4f46e5;
}

.grid-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.metric-card {
  background: #11141e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 18px;
}

.metric-label {
  color: #94a3b8;
  font-size: 13px;
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  margin: 6px 0;
  color: #ffffff;
}

.metric-trend.positive {
  color: #34d399;
  font-size: 12px;
}

.activity-section {
  background: #11141e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
}

.event-list {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}

.event-item {
  display: flex;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 13px;
}

.event-time {
  color: #64748b;
  font-family: monospace;
}

.event-text {
  color: #cbd5e1;
}`
  },
  'api/analytics.ts': {
    name: 'analytics.ts',
    language: 'typescript',
    content: `// Float Semantic Analytics Engine
export interface EventPayload {
  eventName: string;
  sourceFile: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export class CodebaseMetricsCollector {
  private buffer: EventPayload[] = [];
  private readonly maxBatch = 50;

  constructor(private readonly endpoint: string) {}

  public trackEdit(file: string, linesChanged: number): void {
    this.buffer.push({
      eventName: 'code_diff_accepted',
      sourceFile: file,
      timestamp: Date.now(),
      metadata: { linesChanged, latencyMs: 14 }
    });

    if (this.buffer.length >= this.maxBatch) {
      this.flush();
    }
  }

  public async flush(): Promise<void> {
    const batch = [...this.buffer];
    this.buffer = [];
    console.log(\`[Float Telemetry] Synced \${batch.length} events to \${this.endpoint}\`);
  }
}`
  },
  'notepad.md': {
    name: 'notepad.md',
    language: 'markdown',
    content: `# Float Notepads (Context Pinning)
*Pin notes, API schemas, and architectural guidelines to automatically supply context to Chat and Composer.*

### Planned Sprint Items:
- [ ] Implement WebSocket reconnection backoff algorithm
- [ ] Connect Stripe subscription webhook to user tier store
- [ ] Add dark mode toggle with persistent localStorage theme state
`
  },
  'README.md': {
    name: 'README.md',
    language: 'markdown',
    content: `# Welcome to Float Studio ⚡

Float is an autonomous, ultra-fast AI code editor designed for peak developer velocity.

### Keyboard Shortcuts (Cursor AI Mappings):
- **⌘K / Ctrl+K**: Floating Inline AI Generator & Diff Editor
- **⌘I / Ctrl+I**: Multi-File Composer (Agent Mode)
- **⌘L / Ctrl+L**: Focus Float AI Chat Drawer
- **Tab**: Accept predictive autocomplete ghost text
- **⌘Enter**: Accept active diff changes
- **Esc**: Reject / dismiss floating prompts

### Core AI Capabilities:
1. **Cursor-Style Model Switcher**: Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro, Float-Fast.
2. **Project Rules**: Configure instructions in \`.floatrules\`.
3. **Multi-File Composer**: Issue cross-file features with step-by-step agent tool logs.
4. **Context References**: Mention \`@codebase\`, \`@file\`, \`@docs\`, \`@web\`, \`@git\`.
5. **Interactive Terminal**: Run \`help\`, \`run\`, \`test\`, \`float fix\`.
6. **Live Sandbox**: Live real-time visual output with responsive device switches.
`
  }
};

export const TEMPLATES = {
  dashboard: {
    name: 'Telemetry Dashboard (React)',
    files: INITIAL_FILES
  },
  nodeApi: {
    name: 'Node REST API (Express)',
    files: {
      '.floatrules': INITIAL_FILES['.floatrules'],
      'server.js': {
        name: 'server.js',
        language: 'javascript',
        content: `const express = require('express');
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'Alex Vance', role: 'Staff Engineer' },
  { id: 2, name: 'Elena Rostova', role: 'AI Researcher' }
];

app.get('/api/users', (req, res) => {
  res.json({ success: true, count: users.length, data: users });
});

app.post('/api/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

app.listen(3000, () => {
  console.log('Float Backend running on port 3000');
});`
      },
      'package.json': {
        name: 'package.json',
        language: 'json',
        content: `{
  "name": "float-express-api",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.19.2"
  }
}`
      }
    }
  },
  neuralCanvas: {
    name: 'Neural Matrix Visualizer (HTML5 Canvas)',
    files: {
      '.floatrules': INITIAL_FILES['.floatrules'],
      'index.html': {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #050608; overflow: hidden; }
    canvas { display: block; }
    .badge { position: absolute; top: 16px; left: 16px; color: #38bdf8; font-family: monospace; font-size: 13px; }
  </style>
</head>
<body>
  <div class="badge">Float Neural Web: 120 Nodes Active</div>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1.5
    }));

    function loop() {
      ctx.fillStyle = 'rgba(5, 6, 8, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = \`rgba(99, 102, 241, \${1 - dist / 110})\`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`
      }
    }
  }
};

export const AVAILABLE_MODELS = [
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', context: '200k', tag: 'Recommended' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', context: '128k', tag: 'Fast' },
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', context: '2M', tag: 'Deep Context' },
  { id: 'float-fast', name: 'Float Fast (DeepSeek V3)', provider: 'Float Core', context: '64k', tag: '12ms Latency' }
];
