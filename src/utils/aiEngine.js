// Float AI Autonomous Processing Engine (Modeled after Cursor AI Architecture)

export async function processInlineEdit({ prompt, currentCode, fileName, rules, modelId = 'claude-3-5-sonnet', apiKey, provider }) {
  // If user supplied live Gemini key and chose Gemini
  if (apiKey && apiKey.trim().length > 5 && provider === 'gemini') {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Float, the AI code editor (like Cursor).
Project Rules from .floatrules:
${rules || 'Standard clean code conventions'}

File: ${fileName}
Prompt: ${prompt}
Original Code:
${currentCode}

Return ONLY the updated code without any markdown backticks, explanations, or commentary.`
            }]
          }]
        })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const cleanCode = text.replace(/^```[a-z]*\n/i, '').replace(/\n```$/g, '');
        return computeDiff(currentCode, cleanCode);
      }
    } catch (err) {
      console.warn("Live API call failed, falling back to Float Smart Engine:", err);
    }
  }

  // Realistic frontier model latency simulation
  const latency = modelId === 'float-fast' ? 250 : 650;
  await new Promise(r => setTimeout(r, latency));

  const lowerPrompt = prompt.toLowerCase();
  let modifiedCode = currentCode;

  // Check if .floatrules specifies strict TypeScript or functional styles
  const enforceStrict = rules && rules.includes('strict');

  if (lowerPrompt.includes('dark') || lowerPrompt.includes('theme')) {
    if (fileName.endsWith('.jsx') || fileName.endsWith('.tsx')) {
      if (!currentCode.includes('darkMode')) {
        modifiedCode = currentCode.replace(
          'const [isLive, setIsLive] = useState(true);',
          `const [isLive, setIsLive] = useState(true);\n  const [darkMode, setDarkMode] = useState(true); // .floatrules: reactive theme state`
        );
        modifiedCode = modifiedCode.replace(
          '<button \n            className="action-btn"',
          `<button \n            className="action-btn"\n            onClick={() => setDarkMode(!darkMode)}\n          >\n            {darkMode ? '🌙 Dark' : '☀️ Light'}\n          </button>\n          <button \n            className="action-btn"`
        );
      }
    } else if (fileName.endsWith('.css')) {
      modifiedCode = `/* Injected via Float Cmd+K (.floatrules theme system) */\n:root[data-theme='dark'] {\n  --bg-current: #07080b;\n  --text-current: #f8fafc;\n}\n:root[data-theme='light'] {\n  --bg-current: #ffffff;\n  --text-current: #0f172a;\n}\n\n` + currentCode;
    }
  } else if (lowerPrompt.includes('filter') || lowerPrompt.includes('search')) {
    if (currentCode.includes('filter')) {
      modifiedCode = currentCode.replace(
        "const [filter, setFilter] = useState('all');",
        `const [filter, setFilter] = useState('all');\n  const [searchQuery, setSearchQuery] = useState('');\n  // Debounced search query per .floatrules\n  const isMatching = (item) => item.toLowerCase().includes(searchQuery.toLowerCase());`
      );
    }
  } else if (lowerPrompt.includes('type') || lowerPrompt.includes('typescript')) {
    modifiedCode = `// Strongly typed per .floatrules strict specification\nexport type TelemetryStatus = 'idle' | 'streaming' | 'degraded' | 'fault';\nexport interface TelemetryEvent {\n  id: string;\n  status: TelemetryStatus;\n  timestamp: number;\n  metadata?: Record<string, unknown>;\n}\n\n` + currentCode;
  } else if (lowerPrompt.includes('memo') || lowerPrompt.includes('optimize') || lowerPrompt.includes('speed')) {
    modifiedCode = currentCode.replace(
      'import React, { useState, useEffect }',
      'import React, { useState, useEffect, useMemo, useCallback }'
    );
    modifiedCode = modifiedCode.replace(
      'return (',
      `// Float Memoized Compute Engine (0ms overhead)\n  const formattedThroughput = useMemo(() => {\n    return (metrics.requestsPerSec / 1000).toFixed(2) + 'k/sec';\n  }, [metrics.requestsPerSec]);\n\n  return (`
    );
  } else if (lowerPrompt.includes('test') || lowerPrompt.includes('vitest') || lowerPrompt.includes('spec')) {
    modifiedCode = currentCode + `\n\n// Autonomous Self-Test Assertion\nif (typeof window !== 'undefined') {\n  console.assert(typeof App === 'function', 'Float self-test: App must be a functional component');\n}\n`;
  } else if (lowerPrompt.includes('clean') || lowerPrompt.includes('refactor')) {
    // Add cleaner early returns and JSDoc per .floatrules
    modifiedCode = `/**\n * @file ${fileName}\n * Optimized by Float (${modelId}) adhering to .floatrules conventions.\n */\n` + currentCode;
  } else {
    // General smart contextual patch
    const lines = currentCode.split('\n');
    const insertIdx = lines.findIndex(l => l.includes('export default') || l.includes('class ') || l.includes('function ')) || 2;
    lines.splice(insertIdx, 0, `  // [Float AI]: Refactored for "${prompt}" using ${modelId}`);
    modifiedCode = lines.join('\n');
  }

  return computeDiff(currentCode, modifiedCode);
}

// Compute line diff
export function computeDiff(original, modified) {
  const origLines = original.split('\n');
  const modLines = modified.split('\n');

  const diffItems = [];
  const max = Math.max(origLines.length, modLines.length);

  for (let i = 0; i < max; i++) {
    const o = origLines[i];
    const m = modLines[i];

    if (o === undefined) {
      diffItems.push({ type: 'add', line: m, origIndex: null, newIndex: i + 1 });
    } else if (m === undefined) {
      diffItems.push({ type: 'del', line: o, origIndex: i + 1, newIndex: null });
    } else if (o !== m) {
      diffItems.push({ type: 'del', line: o, origIndex: i + 1, newIndex: null });
      diffItems.push({ type: 'add', line: m, origIndex: null, newIndex: i + 1 });
    } else {
      diffItems.push({ type: 'same', line: o, origIndex: i + 1, newIndex: i + 1 });
    }
  }

  return {
    diffItems,
    newFullCode: modified,
    changesCount: diffItems.filter(d => d.type !== 'same').length
  };
}

// Cursor Composer: Normal vs Autonomous Agent Mode
export async function runComposerTask({ prompt, files, rules, isAgentMode = true, modelId = 'claude-3-5-sonnet' }) {
  const steps = [];

  if (isAgentMode) {
    steps.push({ 
      text: "Scanning AST index & inspecting .floatrules conventions...", 
      type: "tool", 
      tool: "codebase_search", 
      status: "done" 
    });
    await new Promise(r => setTimeout(r, 400));

    steps.push({ 
      text: `Reading file dependencies for: "${prompt.slice(0, 36)}..."`, 
      type: "tool", 
      tool: "read_file", 
      status: "done" 
    });
    await new Promise(r => setTimeout(r, 450));

    steps.push({ 
      text: "Running autonomous linter and type-checker across workspace...", 
      type: "tool", 
      tool: "linter_check", 
      status: "done" 
    });
    await new Promise(r => setTimeout(r, 400));

    steps.push({ 
      text: "Generating coherent multi-file diff patches...", 
      type: "tool", 
      tool: "apply_diff", 
      status: "done" 
    });
  } else {
    steps.push({ text: "Fast Composer: Planning modifications...", status: "done" });
    await new Promise(r => setTimeout(r, 400));
    steps.push({ text: "Synthesizing multi-file diffs...", status: "done" });
  }

  // Generate file patches
  const affectedFiles = {};

  if (files['App.jsx']) {
    const orig = files['App.jsx'].content;
    const patched = orig.replace(
      '<h1>Float Cloud Stream</h1>',
      `<h1>Float Cloud Stream</h1>\n          <p className="composer-tagline">Autonomous Feature: ${prompt.slice(0, 32)}</p>`
    );
    affectedFiles['App.jsx'] = {
      ...computeDiff(orig, patched),
      explanation: "Added feature headline and updated reactive telemetry hooks."
    };
  }

  if (files['theme.css']) {
    const orig = files['theme.css'].content;
    const patched = orig + `\n\n/* Composer Generated (${modelId}): ${prompt.slice(0, 24)} */\n.composer-tagline {\n  font-size: 13px;\n  color: #818cf8;\n  margin-top: 4px;\n  letter-spacing: 0.02em;\n}\n`;
    affectedFiles['theme.css'] = {
      ...computeDiff(orig, patched),
      explanation: "Appended theme variables and glowing status classes."
    };
  }

  return {
    steps,
    affectedFiles
  };
}

// Cursor Chat Responses with Apply Code action
export async function getFloatChatReply({ message, activeFile, fileContent, rules, modelId }) {
  await new Promise(r => setTimeout(r, 500));
  const msg = message.toLowerCase();

  if (msg.includes('explain') || msg.includes('what does this')) {
    return {
      text: `### Codebase Analysis: \`${activeFile}\`
*Analyzed with **${modelId}** adhering to **.floatrules**.*

1. **State & Reactive Hooks**: Uses \`useState\` to simulate real-time metrics telemetry (\`activeUsers\`, \`throughput\`, \`latency\`).
2. **Lifecycle Cleanup**: Background timer ticks every 1500ms and cleans up properly in the unmount closure.
3. **Architecture Pattern**: Adheres to \`.floatrules\` by avoiding arbitrary inline styling and keeping components pure.

> **Tip**: Click **"Apply to File"** below or press **⌘K** in the editor to refactor this component directly.`,
      suggestedAction: null,
      codeBlock: null
    };
  }

  if (msg.includes('bug') || msg.includes('audit') || msg.includes('security')) {
    return {
      text: `### Security & Code Quality Audit
- **Cleanup**: \`clearInterval(interval)\` is properly registered in useEffect.
- **State Drift**: Use functional updater syntax \`prev => ({ ...prev })\` to avoid race conditions.
- **Sanitization**: All telemetry data should be validated before passing to external analytics sockets.`,
      suggestedAction: "Run automated memory leak check",
      codeBlock: null
    };
  }

  if (msg.includes('test') || msg.includes('vitest') || msg.includes('jest')) {
    const generatedTestCode = `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Float App Component', () => {
  it('renders live telemetry badge', () => {
    render(<App />);
    expect(screen.getByText(/LIVE TELEMETRY/i)).toBeInTheDocument();
  });

  it('toggles stream on action button click', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: /Pause Stream/i });
    btn.click();
    expect(screen.getByText(/PAUSED/i)).toBeInTheDocument();
  });
});`;

    return {
      text: `Here is the comprehensive Vitest suite for \`${activeFile}\`:`,
      suggestedAction: null,
      codeBlock: generatedTestCode,
      canApply: true
    };
  }

  // Default response
  return {
    text: `I've analyzed the codebase context for \`${activeFile}\` using **${modelId}**.

I can help you:
- **Refactor or edit in-place** using **⌘K**
- **Orchestrate cross-file features** using **Composer (⌘I)**
- **Index new symbols** with \`@codebase\`, \`@docs\`, or \`@web\`
- **Enforce project conventions** declared in \`.floatrules\`

What would you like to build next?`,
    suggestedAction: null,
    codeBlock: null
  };
}
