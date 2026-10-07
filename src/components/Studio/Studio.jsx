import React, { useState, useEffect, useRef } from 'react';
import { 
  FolderTree, 
  FileCode, 
  FilePlus, 
  Trash2, 
  Play, 
  Terminal as TerminalIcon, 
  Sparkles, 
  Command, 
  Check, 
  X, 
  Download, 
  Send, 
  Layers, 
  Cpu, 
  Settings, 
  RefreshCw, 
  Copy, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Workflow,
  MessageSquare,
  Eye,
  Sliders,
  Laptop,
  Tablet,
  Smartphone,
  Search,
  GitBranch,
  BookOpen,
  FileText,
  RotateCcw,
  Zap,
  ArrowRight,
  ShieldCheck,
  Code2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_FILES, TEMPLATES, AVAILABLE_MODELS } from '../../data/mockFiles';
import { processInlineEdit, runComposerTask, getFloatChatReply } from '../../utils/aiEngine';

export default function Studio({ onOpenSettings, settings }) {
  // Activity Bar Active Tab: 'explorer' | 'search' | 'rules' | 'notepads'
  const [activeActivityTab, setActiveActivityTab] = useState('explorer');

  // Workspace Files
  const [files, setFiles] = useState(INITIAL_FILES);
  const [activeFile, setActiveFile] = useState('App.jsx');
  const [openTabs, setOpenTabs] = useState(['App.jsx', '.floatrules', 'theme.css', 'README.md']);
  const [newFileName, setNewFileName] = useState('');
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('dashboard');
  const [selectedModel, setSelectedModel] = useState('claude-3-5-sonnet');
  const [isReindexing, setIsReindexing] = useState(false);

  // Editor State
  const [editorContent, setEditorContent] = useState(INITIAL_FILES['App.jsx']?.content || '');
  const [cursorLine, setCursorLine] = useState(1);
  const [ghostTabActive, setGhostTabActive] = useState(true);

  // Cmd+K Inline Diff State
  const [showCmdK, setShowCmdK] = useState(false);
  const [cmdkPrompt, setCmdkPrompt] = useState('');
  const [isDiffing, setIsDiffing] = useState(false);
  const [currentDiff, setCurrentDiff] = useState(null);
  const [cmdkFollowUp, setCmdkFollowUp] = useState('');

  // Right Panel State (chat | composer)
  const [rightPanelTab, setRightPanelTab] = useState('composer');
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  // Composer State (Cursor Composer Agent Mode)
  const [composerPrompt, setComposerPrompt] = useState('');
  const [composerRunning, setComposerRunning] = useState(false);
  const [composerPlan, setComposerPlan] = useState(null);
  const [isAgentMode, setIsAgentMode] = useState(true);
  const [checkpointSnapshot, setCheckpointSnapshot] = useState(null);

  // Chat State (⌘L)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Welcome to Float AI Studio. I am aware of your codebase context and project rules in `.floatrules`.\n\nUse **⌘K** for inline generation, **⌘I** for multi-file Composer, or ask me anything here with `@` mentions.'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatThinking, setIsChatThinking] = useState(false);
  const [showMentionMenu, setShowMentionMenu] = useState(false);

  // Bottom Panel State (preview | terminal)
  const [bottomTab, setBottomTab] = useState('preview');
  const [isBottomOpen, setIsBottomOpen] = useState(true);
  const [previewViewport, setPreviewViewport] = useState('desktop');

  // Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'Float Autonomous Environment initialized. Type "help" for commands.' },
    { type: 'system', text: 'Frontier Model: Claude 3.5 Sonnet • .floatrules active • AST index 100% synced' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [showTerminalAi, setShowTerminalAi] = useState(false);
  const [terminalAiPrompt, setTerminalAiPrompt] = useState('');

  // Codebase Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Sync editor content when switching files
  useEffect(() => {
    if (files[activeFile]) {
      setEditorContent(files[activeFile].content);
      setCurrentDiff(null);
      setShowCmdK(false);
    }
  }, [activeFile]);

  // Handle template change
  const handleTemplateChange = (templateKey) => {
    setSelectedTemplate(templateKey);
    const tmpl = TEMPLATES[templateKey];
    if (tmpl) {
      setFiles(tmpl.files);
      const firstFile = Object.keys(tmpl.files)[0];
      setActiveFile(firstFile);
      setOpenTabs(Object.keys(tmpl.files));
      setEditorContent(tmpl.files[firstFile].content);
      setCurrentDiff(null);
    }
  };

  // Keyboard shortcut listener (⌘K, ⌘I, ⌘L)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ⌘K or Ctrl+K (Inline Edit)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCmdK(prev => !prev);
      }
      // ⌘I or Ctrl+I (Composer)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setIsRightPanelOpen(true);
        setRightPanelTab('composer');
      }
      // ⌘L or Ctrl+L (Chat)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsRightPanelOpen(true);
        setRightPanelTab('chat');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update file content
  const handleContentChange = (newVal) => {
    setEditorContent(newVal);
    setFiles(prev => ({
      ...prev,
      [activeFile]: {
        ...prev[activeFile],
        content: newVal
      }
    }));
  };

  // Select Tab
  const handleSelectTab = (fileName) => {
    setActiveFile(fileName);
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName]);
    }
  };

  // Close Tab
  const handleCloseTab = (e, fileName) => {
    e.stopPropagation();
    const filtered = openTabs.filter(t => t !== fileName);
    setOpenTabs(filtered);
    if (activeFile === fileName && filtered.length > 0) {
      setActiveFile(filtered[filtered.length - 1]);
    }
  };

  // Add new file
  const handleCreateNewFile = () => {
    if (!newFileName.trim()) return;
    const name = newFileName.trim();
    if (files[name]) {
      alert('File already exists');
      return;
    }
    const ext = name.split('.').pop();
    const lang = ext === 'css' ? 'css' : ext === 'json' ? 'json' : ext === 'md' ? 'markdown' : 'javascript';
    setFiles(prev => ({
      ...prev,
      [name]: {
        name,
        language: lang,
        content: `// Created in Float: ${name}\n`
      }
    }));
    setOpenTabs(prev => [...prev, name]);
    setActiveFile(name);
    setNewFileName('');
    setIsCreatingFile(false);
  };

  // Delete file
  const handleDeleteFile = (e, fileName) => {
    e.stopPropagation();
    if (Object.keys(files).length <= 1) {
      alert('Must keep at least one file in project');
      return;
    }
    if (confirm(`Delete ${fileName}?`)) {
      const next = { ...files };
      delete next[fileName];
      setFiles(next);
      const remainingTabs = openTabs.filter(t => t !== fileName);
      setOpenTabs(remainingTabs);
      if (activeFile === fileName) {
        setActiveFile(remainingTabs[0] || Object.keys(next)[0]);
      }
    }
  };

  // Run Cmd+K Inline Edit
  const handleRunCmdK = async (customPrompt) => {
    const promptToUse = customPrompt || cmdkPrompt;
    if (!promptToUse.trim()) return;
    setIsDiffing(true);
    try {
      const diffResult = await processInlineEdit({
        prompt: promptToUse,
        currentCode: editorContent,
        fileName: activeFile,
        rules: files['.floatrules']?.content,
        modelId: selectedModel,
        apiKey: settings?.apiKey,
        provider: settings?.provider
      });
      setCurrentDiff(diffResult);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDiffing(false);
    }
  };

  // Accept Diff
  const handleAcceptDiff = () => {
    if (!currentDiff) return;
    handleContentChange(currentDiff.newFullCode);
    setCurrentDiff(null);
    setShowCmdK(false);
    setCmdkPrompt('');
    setCmdkFollowUp('');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Reject Diff
  const handleRejectDiff = () => {
    setCurrentDiff(null);
    setShowCmdK(false);
    setCmdkFollowUp('');
  };

  // Cmd+K Follow-Up Iteration
  const handleCmdkFollowUp = () => {
    if (!cmdkFollowUp.trim() || !currentDiff) return;
    handleRunCmdK(`${cmdkPrompt} (Follow-up adjustment: ${cmdkFollowUp})`);
    setCmdkFollowUp('');
  };

  // Accept Ghost Tab suggestion
  const handleAcceptGhostTab = () => {
    const lines = editorContent.split('\n');
    lines.splice(cursorLine, 0, `  // [Float Tab]: Auto-completed prediction adhering to .floatrules`, `  const telemetryStatus = 'streaming';`);
    handleContentChange(lines.join('\n'));
    setGhostTabActive(false);
    setTimeout(() => setGhostTabActive(true), 4000);
  };

  // Run Composer Task (Agent Mode)
  const handleRunComposer = async () => {
    if (!composerPrompt.trim()) return;
    setComposerRunning(true);
    // Take checkpoint snapshot for 1-click revert
    setCheckpointSnapshot({ ...files });

    try {
      const plan = await runComposerTask({ 
        prompt: composerPrompt, 
        files, 
        rules: files['.floatrules']?.content,
        isAgentMode,
        modelId: selectedModel
      });
      setComposerPlan(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setComposerRunning(false);
    }
  };

  // Accept All Composer Changes
  const handleAcceptComposerAll = () => {
    if (!composerPlan?.affectedFiles) return;
    const updated = { ...files };
    Object.keys(composerPlan.affectedFiles).forEach(fileKey => {
      if (updated[fileKey]) {
        updated[fileKey] = {
          ...updated[fileKey],
          content: composerPlan.affectedFiles[fileKey].newFullCode
        };
      }
    });
    setFiles(updated);
    if (composerPlan.affectedFiles[activeFile]) {
      setEditorContent(composerPlan.affectedFiles[activeFile].newFullCode);
    }
    setComposerPlan(null);
    setComposerPrompt('');
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  // Revert Composer Checkpoint
  const handleRevertCheckpoint = () => {
    if (!checkpointSnapshot) return;
    setFiles(checkpointSnapshot);
    if (checkpointSnapshot[activeFile]) {
      setEditorContent(checkpointSnapshot[activeFile].content);
    }
    setComposerPlan(null);
    setCheckpointSnapshot(null);
    alert('Reverted all changes to pre-Composer checkpoint.');
  };

  // Send Chat Message
  const handleSendChat = async () => {
    if (!chatInput.trim() || isChatThinking) return;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: chatInput
    };
    setChatMessages(prev => [...prev, userMsg]);
    const promptText = chatInput;
    setChatInput('');
    setIsChatThinking(true);

    try {
      const reply = await getFloatChatReply({
        message: promptText,
        activeFile,
        fileContent: editorContent,
        rules: files['.floatrules']?.content,
        modelId: selectedModel
      });
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: reply.text,
          action: reply.suggestedAction,
          codeBlock: reply.codeBlock,
          canApply: reply.canApply
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsChatThinking(false);
    }
  };

  // Apply Chat Code to Active File
  const handleApplyChatCode = (codeBlock) => {
    if (!codeBlock) return;
    handleContentChange(codeBlock);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });
    alert(`Applied code directly into ${activeFile}`);
  };

  // Re-index Codebase
  const handleReindexCodebase = () => {
    setIsReindexing(true);
    setTimeout(() => {
      setIsReindexing(false);
      alert('Float Codebase Index updated: 14,920 AST symbols refreshed.');
    }, 1200);
  };

  // Terminal Command Execution
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    const newHistory = [
      ...terminalHistory,
      { type: 'command', text: `float:~/workspace$ ${cmd}` }
    ];

    const parts = cmd.split(' ');
    const main = parts[0].toLowerCase();

    if (main === 'help') {
      newHistory.push({
        type: 'output',
        text: `Available Commands:
  • help            Display command options
  • run             Start live Vite sandbox runner
  • test            Execute automated test suites
  • ls              List workspace files
  • cat <file>      Read file content
  • git status      Check git diff status
  • float fix       Cursor-style autonomous error diagnosis & patch
  • float ask <q>   Query frontier model from terminal
  • clear           Clear console log`
      });
    } else if (main === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (main === 'ls') {
      newHistory.push({ type: 'output', text: Object.keys(files).join('   ') });
    } else if (main === 'run') {
      newHistory.push({ type: 'output', text: '⚡ Compiling sandbox in 4ms...' });
      newHistory.push({ type: 'success', text: '✓ Preview server live on http://localhost:5173' });
      setBottomTab('preview');
    } else if (main === 'test') {
      newHistory.push({ type: 'output', text: 'Running Vitest runner across 4 suites...' });
      newHistory.push({ type: 'success', text: '✓ 4 test files passed (12 tests) in 142ms' });
    } else if (main === 'git' && parts[1] === 'status') {
      newHistory.push({ type: 'output', text: `On branch main\nChanges modified:\n  modified: ${activeFile}` });
    } else if (main === 'float' && parts[1] === 'fix') {
      newHistory.push({ type: 'output', text: 'Float Autonomous Agent reading compiler logs...' });
      newHistory.push({ type: 'success', text: '✓ 0 syntax faults found. All types adhere to .floatrules.' });
    } else if (main === 'cat') {
      const target = parts[1];
      if (files[target]) {
        newHistory.push({ type: 'output', text: files[target].content.slice(0, 300) + '...' });
      } else {
        newHistory.push({ type: 'error', text: `cat: ${target || ''}: File not found` });
      }
    } else {
      newHistory.push({
        type: 'output',
        text: `Executed: "${cmd}". Type "help" for valid commands.`
      });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  // Terminal AI Generator (⌘K in Terminal)
  const handleTerminalAiSubmit = (e) => {
    e.preventDefault();
    if (!terminalAiPrompt.trim()) return;
    const prompt = terminalAiPrompt;
    setTerminalAiPrompt('');
    setShowTerminalAi(false);

    let generatedCmd = 'git status';
    if (prompt.includes('test')) generatedCmd = 'npm test -- --coverage';
    else if (prompt.includes('branch') || prompt.includes('checkout')) generatedCmd = 'git checkout -b feature/float-stream';
    else if (prompt.includes('install') || prompt.includes('add')) generatedCmd = 'npm i lucide-react canvas-confetti';
    else if (prompt.includes('run') || prompt.includes('start')) generatedCmd = 'npm run dev';

    setTerminalHistory(prev => [
      ...prev,
      { type: 'command', text: `// Terminal AI synthesized: "${prompt}"` },
      { type: 'success', text: `$ ${generatedCmd}` }
    ]);
  };

  // Live Preview HTML builder
  const getPreviewHtml = () => {
    if (files['index.html']) {
      return files['index.html'].content;
    }
    const cssContent = files['theme.css'] ? files['theme.css'].content : '';

    return `<!DOCTYPE html>
<html>
<head>
  <style>
    ${cssContent}
  </style>
</head>
<body>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <div>
        <span class="badge-live">● LIVE TELEMETRY</span>
        <h1>Float Cloud Stream</h1>
      </div>
      <div class="header-actions">
        <button class="action-btn" id="streamBtn">Stream Active</button>
        <button class="action-btn primary" id="agentBtn">Sync Agent</button>
      </div>
    </header>

    <div class="grid-metrics">
      <div class="metric-card">
        <span class="metric-label">Active Users</span>
        <h2 class="metric-value" id="valUsers">14,280</h2>
        <span class="metric-trend positive">+14.2% live</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Throughput</span>
        <h2 class="metric-value" id="valThroughput">4,210 req/s</h2>
        <span class="metric-trend positive">Optimized</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">P99 Latency</span>
        <h2 class="metric-value" id="valLatency">18.4 ms</h2>
        <span class="metric-trend positive">-3.4ms lower</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Cache Hit Rate</span>
        <h2 class="metric-value" id="valCache">98.6%</h2>
        <span class="metric-trend positive">Warm L2 Cache</span>
      </div>
    </div>

    <div class="activity-section">
      <h3>Autonomous Engine Events</h3>
      <ul class="event-list">
        <li class="event-item">
          <span class="event-time">${new Date().toLocaleTimeString()}</span>
          <span class="event-text">Float Sandbox compiled adhering to .floatrules</span>
        </li>
      </ul>
    </div>
  </div>

  <script>
    let users = 14280;
    setInterval(() => {
      users += Math.floor(Math.random() * 9) - 4;
      const el = document.getElementById('valUsers');
      if (el) el.innerText = users.toLocaleString();
    }, 1500);

    document.getElementById('agentBtn').addEventListener('click', () => {
      alert('Float Agent Synchronization Completed Successfully!');
    });
  </script>
</body>
</html>`;
  };

  // Export Project JSON
  const handleExportProject = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(files, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "float-workspace-export.json");
    dlAnchorElem.click();
  };

  return (
    <div className="studio-root">
      {/* Studio Topbar (Cursor AI Header) */}
      <header className="studio-topbar">
        <div className="studio-left-group">
          {/* Workspace & Template Selector */}
          <div className="studio-project-title">
            <span className="dot dot-green"></span>
            <select 
              value={selectedTemplate} 
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="template-select"
            >
              <option value="dashboard">Telemetry Dashboard (React)</option>
              <option value="nodeApi">Express REST API (Node)</option>
              <option value="neuralCanvas">Neural Matrix (HTML5 Canvas)</option>
            </select>
          </div>

          <span className="studio-file-breadcrumb code-font">
            {activeFile}
          </span>
        </div>

        {/* Center: Model Selector & Quick AI Triggers */}
        <div className="studio-center-actions">
          {/* Frontier Model Selector Dropdown (Cursor style) */}
          <div className="model-selector-pill">
            <Cpu size={12} className="text-indigo" />
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="model-select"
            >
              {AVAILABLE_MODELS.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.context})
                </option>
              ))}
            </select>
          </div>

          {/* ⌘K Trigger Button */}
          <button 
            className={`btn btn-xs ${showCmdK ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowCmdK(!showCmdK)}
            title="Inline AI Edit (⌘K)"
          >
            <Sparkles size={12} className="text-cyan" />
            <span>⌘K Edit</span>
          </button>

          {/* ⌘I Composer Trigger */}
          <button 
            className={`btn btn-xs ${rightPanelTab === 'composer' && isRightPanelOpen ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setIsRightPanelOpen(true);
              setRightPanelTab('composer');
            }}
            title="Composer Multi-File Agent (⌘I)"
          >
            <Workflow size={12} />
            <span>Composer (⌘I)</span>
          </button>

          {/* ⌘L Chat Trigger */}
          <button 
            className={`btn btn-xs ${rightPanelTab === 'chat' && isRightPanelOpen ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setIsRightPanelOpen(true);
              setRightPanelTab('chat');
            }}
            title="Float Chat (⌘L)"
          >
            <MessageSquare size={12} />
            <span>Chat (⌘L)</span>
          </button>
        </div>

        {/* Right Tools */}
        <div className="studio-right-group">
          {/* Codebase Index status */}
          <button 
            className="btn btn-ghost btn-xs text-emerald"
            onClick={handleReindexCodebase}
            title="Click to re-index AST graph"
          >
            <span className={`index-pulse-dot ${isReindexing ? 'pulse-glow' : ''}`}></span>
            <span>{isReindexing ? 'Indexing...' : 'Index: 100%'}</span>
          </button>

          <button 
            className="btn btn-xs btn-secondary"
            onClick={() => {
              setBottomTab('preview');
              setIsBottomOpen(true);
            }}
          >
            <Play size={12} fill="currentColor" />
            <span>Preview</span>
          </button>

          <button className="btn btn-ghost btn-xs" onClick={handleExportProject} title="Export Project">
            <Download size={13} />
          </button>

          <button className="btn btn-ghost btn-xs" onClick={onOpenSettings} title="Settings">
            <Settings size={13} />
          </button>
        </div>
      </header>

      {/* Main Studio Body: Activity Bar + Sidebar + Editor + AI Drawer */}
      <div className="studio-workspace-container">
        
        {/* Leftmost Activity Bar (VS Code / Cursor Icon Bar) */}
        <nav className="studio-activity-bar">
          <button 
            className={`act-icon-btn ${activeActivityTab === 'explorer' ? 'active' : ''}`}
            onClick={() => setActiveActivityTab('explorer')}
            title="Explorer (Files)"
          >
            <FolderTree size={18} />
          </button>
          <button 
            className={`act-icon-btn ${activeActivityTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveActivityTab('search')}
            title="Search Codebase"
          >
            <Search size={18} />
          </button>
          <button 
            className={`act-icon-btn ${activeActivityTab === 'rules' ? 'active' : ''}`}
            onClick={() => {
              setActiveActivityTab('rules');
              handleSelectTab('.floatrules');
            }}
            title="Project Rules (.floatrules)"
          >
            <ShieldCheck size={18} />
          </button>
          <button 
            className={`act-icon-btn ${activeActivityTab === 'notepads' ? 'active' : ''}`}
            onClick={() => {
              setActiveActivityTab('notepads');
              handleSelectTab('notepad.md');
            }}
            title="Notepads & Reference Context"
          >
            <FileText size={18} />
          </button>
        </nav>

        {/* Sidebar Panel */}
        <aside className="studio-explorer glass-panel">
          {activeActivityTab === 'explorer' && (
            <>
              <div className="explorer-header">
                <div className="explorer-title">
                  <span>FILES & WORKSPACE</span>
                </div>
                <button 
                  className="icon-action-btn"
                  onClick={() => setIsCreatingFile(!isCreatingFile)}
                  title="New File"
                >
                  <FilePlus size={14} />
                </button>
              </div>

              {/* Inline New File Input */}
              {isCreatingFile && (
                <div className="new-file-input-wrap animate-fade-in">
                  <input 
                    type="text" 
                    className="new-file-input"
                    placeholder="filename.jsx"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateNewFile()}
                    autoFocus
                  />
                  <button className="btn btn-primary btn-xs" onClick={handleCreateNewFile}>Add</button>
                  <button className="btn btn-ghost btn-xs" onClick={() => setIsCreatingFile(false)}>×</button>
                </div>
              )}

              {/* File Tree */}
              <div className="file-tree-list">
                {Object.keys(files).map((fileName) => {
                  const isActive = activeFile === fileName;
                  const isRules = fileName === '.floatrules';
                  return (
                    <div 
                      key={fileName}
                      className={`file-tree-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleSelectTab(fileName)}
                    >
                      {isRules ? (
                        <ShieldCheck size={13} className="text-indigo" />
                      ) : (
                        <FileCode size={13} className={isActive ? 'text-cyan' : 'text-dim'} />
                      )}
                      <span className="file-name code-font">{fileName}</span>
                      <button 
                        className="file-delete-btn"
                        onClick={(e) => handleDeleteFile(e, fileName)}
                        title="Delete File"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Cursor Rules indicator */}
              <div className="rules-indicator-bar" onClick={() => handleSelectTab('.floatrules')}>
                <ShieldCheck size={12} className="text-emerald" />
                <span>.floatrules Active (6 rules)</span>
              </div>
            </>
          )}

          {activeActivityTab === 'search' && (
            <div className="search-sidebar-panel">
              <div className="explorer-header">
                <div className="explorer-title">
                  <span>SEARCH CODEBASE</span>
                </div>
              </div>
              <div className="search-input-box">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Search symbols, functions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="search-results-list">
                <div className="search-result-item" onClick={() => handleSelectTab('App.jsx')}>
                  <span className="search-file">App.jsx:9</span>
                  <span className="search-preview">export default function App()</span>
                </div>
                <div className="search-result-item" onClick={() => handleSelectTab('api/analytics.ts')}>
                  <span className="search-file">api/analytics.ts:8</span>
                  <span className="search-preview">class CodebaseMetricsCollector</span>
                </div>
              </div>
            </div>
          )}

          {activeActivityTab === 'rules' && (
            <div className="rules-sidebar-panel">
              <div className="explorer-header">
                <div className="explorer-title">
                  <span>AI SYSTEM RULES</span>
                </div>
              </div>
              <p className="rules-subtext">
                Rules defined here instruct Cursor / Float AI during ⌘K edits, Composer generation, and Chat.
              </p>
              <button 
                className="btn btn-secondary btn-sm w-full mt-2"
                onClick={() => handleSelectTab('.floatrules')}
              >
                Edit .floatrules
              </button>
            </div>
          )}

          {activeActivityTab === 'notepads' && (
            <div className="notepads-sidebar-panel">
              <div className="explorer-header">
                <div className="explorer-title">
                  <span>NOTEPADS (PINNED CONTEXT)</span>
                </div>
              </div>
              <p className="rules-subtext">
                Reference notes & schemas pinned to provide persistent memory for prompts.
              </p>
              <button 
                className="btn btn-secondary btn-sm w-full mt-2"
                onClick={() => handleSelectTab('notepad.md')}
              >
                Open notepad.md
              </button>
            </div>
          )}
        </aside>

        {/* Center Code Editor Column */}
        <main className="studio-editor-column">
          
          {/* Tabs Bar */}
          <div className="editor-tabs-bar">
            {openTabs.map(tabName => {
              const isActive = activeFile === tabName;
              return (
                <div 
                  key={tabName}
                  className={`editor-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFile(tabName)}
                >
                  <FileCode size={13} className={isActive ? 'text-indigo' : 'text-dim'} />
                  <span className="tab-label code-font">{tabName}</span>
                  <button 
                    className="tab-close-btn"
                    onClick={(e) => handleCloseTab(e, tabName)}
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Floating Cmd+K In-Line Bar (Cursor AI signature) */}
          {showCmdK && (
            <div className="floating-studio-cmdk animate-fade-in">
              <div className="cmdk-studio-box glass-panel-glow">
                <div className="cmdk-studio-input-row">
                  <Sparkles size={16} className="text-cyan pulse-glow" />
                  <input 
                    type="text" 
                    className="cmdk-studio-input"
                    value={cmdkPrompt}
                    onChange={(e) => setCmdkPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRunCmdK()}
                    placeholder="Ask Float to edit, refactor, or fix code in this file... (Enter to generate)"
                    autoFocus
                  />
                  <div className="cmdk-studio-btn-wrap">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleRunCmdK()}
                      disabled={isDiffing}
                    >
                      {isDiffing ? 'Synthesizing...' : 'Generate ⏎'}
                    </button>
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={() => setShowCmdK(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Prompt Quick Chips */}
                <div className="cmdk-quick-chips">
                  <button 
                    className="chip-btn"
                    onClick={() => {
                      setCmdkPrompt('Add dark mode theme state and toggle button');
                      handleRunCmdK('Add dark mode theme state and toggle button');
                    }}
                  >
                    + Dark Mode Toggle
                  </button>
                  <button 
                    className="chip-btn"
                    onClick={() => {
                      setCmdkPrompt('Add input search query filter with debounced check');
                      handleRunCmdK('Add input search query filter with debounced check');
                    }}
                  >
                    + Debounced Search
                  </button>
                  <button 
                    className="chip-btn"
                    onClick={() => {
                      setCmdkPrompt('Add useMemo and optimize telemetry computation');
                      handleRunCmdK('Add useMemo and optimize telemetry computation');
                    }}
                  >
                    + Memoize Hook
                  </button>
                  <button 
                    className="chip-btn"
                    onClick={() => {
                      setCmdkPrompt('Add strict TypeScript types and interfaces');
                      handleRunCmdK('Add strict TypeScript types and interfaces');
                    }}
                  >
                    + TypeScript Types
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Diff Review Banner (with Cursor follow-up option) */}
          {currentDiff && (
            <div className="diff-review-bar glass-panel animate-fade-in">
              <div className="diff-review-info">
                <span className="diff-count-badge">
                  {currentDiff.changesCount} lines changed
                </span>
                <span>Reviewing edits for <strong>{activeFile}</strong></span>
              </div>

              {/* Follow-up input for refining diff */}
              <div className="diff-followup-box">
                <input 
                  type="text" 
                  placeholder="Refine this diff (e.g. 'make it simpler')..."
                  value={cmdkFollowUp}
                  onChange={(e) => setCmdkFollowUp(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCmdkFollowUp()}
                  className="diff-followup-input"
                />
                <button className="btn btn-secondary btn-xs" onClick={handleCmdkFollowUp}>
                  Refine
                </button>
              </div>

              <div className="diff-review-actions">
                <button className="btn btn-secondary btn-xs" onClick={handleRejectDiff}>
                  <X size={12} />
                  <span>Reject (Esc)</span>
                </button>
                <button className="btn btn-emerald btn-xs" onClick={handleAcceptDiff}>
                  <Check size={12} />
                  <span>Accept (⌘Enter)</span>
                </button>
              </div>
            </div>
          )}

          {/* Editor Body */}
          <div className="editor-content-area code-font" style={{ fontSize: `${settings?.fontSize || 14}px` }}>
            {currentDiff ? (
              /* Inline Unified Diff View */
              <div className="diff-code-container">
                {currentDiff.diffItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`editor-row ${item.type === 'del' ? 'diff-line-del' : item.type === 'add' ? 'diff-line-add' : ''}`}
                  >
                    <span className="row-gutter">{item.type === 'del' ? '-' : item.type === 'add' ? '+' : item.newIndex}</span>
                    <span className="row-text">{item.line}</span>
                  </div>
                ))}
              </div>
            ) : (
              /* Real Interactive Code Textarea with Line Numbers */
              <div className="code-editor-wrapper">
                <div className="code-editor-gutter">
                  {editorContent.split('\n').map((_, i) => (
                    <div key={i} className="gutter-line-no">{i + 1}</div>
                  ))}
                </div>
                
                <div className="code-textarea-container">
                  <textarea
                    className="code-textarea code-font"
                    value={editorContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    spellCheck="false"
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        if (ghostTabActive) {
                          handleAcceptGhostTab();
                        } else {
                          const start = e.target.selectionStart;
                          const end = e.target.selectionEnd;
                          const updated = editorContent.substring(0, start) + "  " + editorContent.substring(end);
                          handleContentChange(updated);
                        }
                      }
                    }}
                  />

                  {/* Cursor Tab Ghost Autocomplete Prediction */}
                  {ghostTabActive && settings?.enableGhostTab !== false && (
                    <div className="studio-ghost-tab-banner">
                      <span className="ghost-text">
                        // Float Tab Prediction: [Press Tab ⇥ to accept multi-line prediction]
                      </span>
                      <button className="btn btn-cyan btn-xs" onClick={handleAcceptGhostTab}>
                        Accept Tab ⇥
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Dock Panel (Live Preview / Terminal) */}
          {isBottomOpen && (
            <div className="studio-bottom-panel glass-panel">
              <div className="bottom-panel-header">
                <div className="bottom-tabs">
                  <button 
                    className={`bottom-tab ${bottomTab === 'preview' ? 'active' : ''}`}
                    onClick={() => setBottomTab('preview')}
                  >
                    <Eye size={13} />
                    <span>Live Sandbox Preview</span>
                  </button>
                  <button 
                    className={`bottom-tab ${bottomTab === 'terminal' ? 'active' : ''}`}
                    onClick={() => setBottomTab('terminal')}
                  >
                    <TerminalIcon size={13} />
                    <span>Interactive Terminal</span>
                  </button>
                </div>

                <div className="bottom-header-controls">
                  {bottomTab === 'terminal' && (
                    <button 
                      className="btn btn-ghost btn-xs text-cyan"
                      onClick={() => setShowTerminalAi(!showTerminalAi)}
                    >
                      <Sparkles size={12} />
                      <span>⌘K in Terminal</span>
                    </button>
                  )}

                  {bottomTab === 'preview' && (
                    <div className="viewport-switch">
                      <button 
                        className={`vp-btn ${previewViewport === 'desktop' ? 'active' : ''}`}
                        onClick={() => setPreviewViewport('desktop')}
                        title="Desktop"
                      >
                        <Laptop size={13} />
                      </button>
                      <button 
                        className={`vp-btn ${previewViewport === 'tablet' ? 'active' : ''}`}
                        onClick={() => setPreviewViewport('tablet')}
                        title="Tablet"
                      >
                        <Tablet size={13} />
                      </button>
                      <button 
                        className={`vp-btn ${previewViewport === 'mobile' ? 'active' : ''}`}
                        onClick={() => setPreviewViewport('mobile')}
                        title="Mobile"
                      >
                        <Smartphone size={13} />
                      </button>
                    </div>
                  )}

                  <button 
                    className="icon-action-btn"
                    onClick={() => setIsBottomOpen(false)}
                    title="Minimize Dock"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              <div className="bottom-panel-body">
                {bottomTab === 'preview' ? (
                  <div className={`preview-canvas viewport-${previewViewport}`}>
                    <iframe 
                      title="Live Sandbox Preview"
                      srcDoc={getPreviewHtml()}
                      className="preview-iframe"
                      sandbox="allow-scripts"
                    />
                  </div>
                ) : (
                  <div className="terminal-container code-font">
                    {/* Terminal AI Bar (⌘K in Terminal) */}
                    {showTerminalAi && (
                      <form className="terminal-ai-bar animate-fade-in" onSubmit={handleTerminalAiSubmit}>
                        <Sparkles size={13} className="text-cyan" />
                        <input 
                          type="text" 
                          placeholder="Ask Terminal AI to generate or explain command..."
                          value={terminalAiPrompt}
                          onChange={(e) => setTerminalAiPrompt(e.target.value)}
                          className="terminal-ai-input"
                          autoFocus
                        />
                        <button type="submit" className="btn btn-primary btn-xs">Generate</button>
                      </form>
                    )}

                    <div className="terminal-log-output">
                      {terminalHistory.map((item, idx) => (
                        <div key={idx} className={`term-line term-${item.type}`}>
                          {item.text}
                        </div>
                      ))}
                    </div>

                    <form className="terminal-input-row" onSubmit={handleTerminalSubmit}>
                      <span className="term-prompt">float:~/workspace$</span>
                      <input 
                        type="text" 
                        className="term-input code-font"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="type 'help', 'run', 'test', 'git status', 'float fix'..."
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isBottomOpen && (
            <div className="bottom-panel-minimized">
              <button className="btn btn-ghost btn-xs" onClick={() => { setIsBottomOpen(true); setBottomTab('preview'); }}>
                <Eye size={12} /> Live Preview
              </button>
              <button className="btn btn-ghost btn-xs" onClick={() => { setIsBottomOpen(true); setBottomTab('terminal'); }}>
                <TerminalIcon size={12} /> Terminal
              </button>
            </div>
          )}
        </main>

        {/* Right AI Drawer: Dual Mode (Cursor Composer ⌘I & Cursor Chat ⌘L) */}
        {isRightPanelOpen ? (
          <aside className="studio-ai-drawer glass-panel">
            <div className="ai-drawer-header">
              <div className="ai-drawer-tabs">
                <button 
                  className={`ai-tab ${rightPanelTab === 'composer' ? 'active' : ''}`}
                  onClick={() => setRightPanelTab('composer')}
                >
                  <Workflow size={13} />
                  <span>Composer (⌘I)</span>
                </button>
                <button 
                  className={`ai-tab ${rightPanelTab === 'chat' ? 'active' : ''}`}
                  onClick={() => setRightPanelTab('chat')}
                >
                  <MessageSquare size={13} />
                  <span>Chat (⌘L)</span>
                </button>
              </div>

              <div className="ai-drawer-header-actions">
                {checkpointSnapshot && (
                  <button 
                    className="btn btn-ghost btn-xs text-rose"
                    onClick={handleRevertCheckpoint}
                    title="Revert to pre-Composer checkpoint"
                  >
                    <RotateCcw size={12} />
                    <span>Revert</span>
                  </button>
                )}
                <button 
                  className="icon-action-btn"
                  onClick={() => setIsRightPanelOpen(false)}
                  title="Collapse Drawer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {rightPanelTab === 'composer' ? (
              /* Composer Mode (Agent Mode) */
              <div className="composer-container">
                <div className="composer-mode-bar">
                  <div className="mode-toggle-group">
                    <button 
                      className={`mode-btn ${isAgentMode ? 'active' : ''}`}
                      onClick={() => setIsAgentMode(true)}
                    >
                      <Sparkles size={11} className="text-cyan" />
                      <span>Agent Mode</span>
                    </button>
                    <button 
                      className={`mode-btn ${!isAgentMode ? 'active' : ''}`}
                      onClick={() => setIsAgentMode(false)}
                    >
                      <span>Normal</span>
                    </button>
                  </div>
                  <span className="composer-model-tag">{selectedModel}</span>
                </div>

                <div className="composer-input-block">
                  <textarea 
                    className="composer-textarea"
                    placeholder="Describe a multi-file feature or refactor (e.g., 'Add dark mode toggle to App.jsx and declare CSS classes in theme.css')..."
                    value={composerPrompt}
                    onChange={(e) => setComposerPrompt(e.target.value)}
                    rows={3}
                  />

                  <div className="composer-sample-prompts">
                    <button 
                      className="sample-p-btn"
                      onClick={() => setComposerPrompt('Add responsive dark mode theme across App.jsx and theme.css adhering to .floatrules')}
                    >
                      • Dark Mode Theme (Multi-file)
                    </button>
                    <button 
                      className="sample-p-btn"
                      onClick={() => setComposerPrompt('Add telemetry caching layer and time-series metrics buffer in api/analytics.ts')}
                    >
                      • Caching Layer & Metrics Buffer
                    </button>
                  </div>

                  <button 
                    className="btn btn-primary w-full glow-btn"
                    onClick={handleRunComposer}
                    disabled={composerRunning}
                  >
                    {composerRunning ? (
                      <>
                        <Sparkles size={14} className="pulse-glow" />
                        <span>Agent Running Tools...</span>
                      </>
                    ) : (
                      <>
                        <Workflow size={14} />
                        <span>Run Composer (⌘I)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Composer Execution Plan & Multi-File Diffs */}
                {composerPlan && (
                  <div className="composer-plan-view animate-fade-in">
                    <div className="plan-steps-card">
                      <h5>Agent Execution Trace</h5>
                      {composerPlan.steps.map((st, i) => (
                        <div key={i} className={`plan-step ${st.status}`}>
                          <span className="step-badge">{st.tool || 'reason'}</span>
                          <span>{st.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="plan-diffs-section">
                      <div className="diff-header-row">
                        <h5>Proposed Diffs ({Object.keys(composerPlan.affectedFiles).length} files)</h5>
                        <button className="btn btn-emerald btn-xs" onClick={handleAcceptComposerAll}>
                          <Check size={12} />
                          <span>Accept All</span>
                        </button>
                      </div>

                      {Object.keys(composerPlan.affectedFiles).map(fileKey => {
                        const fileDiff = composerPlan.affectedFiles[fileKey];
                        return (
                          <div key={fileKey} className="affected-file-card">
                            <div className="aff-header">
                              <span className="aff-name code-font">{fileKey}</span>
                              <span className="diff-stat-pill">+{fileDiff.changesCount} lines</span>
                            </div>
                            <p className="aff-desc">{fileDiff.explanation}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Chat Mode (⌘L with Context Mentions & Apply Code) */
              <div className="chat-container">
                <div className="chat-messages-scroll">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                      <div className="chat-bubble">
                        <div className="chat-bubble-author">
                          {msg.sender === 'assistant' ? (
                            <>
                              <Sparkles size={12} className="text-cyan" />
                              <span>Float ({selectedModel})</span>
                            </>
                          ) : (
                            <span>You</span>
                          )}
                        </div>
                        <div className="chat-bubble-content">
                          {msg.text}
                        </div>

                        {/* If code block returned, provide Cursor 'Apply to File' button */}
                        {msg.codeBlock && (
                          <div className="chat-codeblock-wrapper">
                            <pre className="chat-code-pre code-font">{msg.codeBlock}</pre>
                            <div className="chat-code-actions">
                              <button 
                                className="btn btn-emerald btn-xs"
                                onClick={() => handleApplyChatCode(msg.codeBlock)}
                              >
                                <Check size={12} />
                                <span>Apply to {activeFile}</span>
                              </button>
                              <button 
                                className="btn btn-ghost btn-xs"
                                onClick={() => navigator.clipboard.writeText(msg.codeBlock)}
                              >
                                <Copy size={12} />
                                <span>Copy</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {msg.action && (
                          <button 
                            className="btn btn-secondary btn-xs mt-2"
                            onClick={() => setChatInput(msg.action)}
                          >
                            <span>Action: {msg.action}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isChatThinking && (
                    <div className="chat-bubble-row assistant">
                      <div className="chat-bubble thinking">
                        <Sparkles size={12} className="text-indigo pulse-glow" />
                        <span>Float is reasoning across codebase...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Chat Pills */}
                <div className="chat-quick-actions">
                  <button 
                    className="quick-pill" 
                    onClick={() => setChatInput('Explain how this component works')}
                  >
                    Explain File
                  </button>
                  <button 
                    className="quick-pill" 
                    onClick={() => setChatInput('Audit code for security and memory leaks')}
                  >
                    Security Audit
                  </button>
                  <button 
                    className="quick-pill" 
                    onClick={() => setChatInput('Write a comprehensive unit test suite for this component')}
                  >
                    Write Tests
                  </button>
                </div>

                {/* Chat Input with Context Mentions */}
                <div className="chat-input-box">
                  <div className="chat-context-tags">
                    <span className="ctx-tag">@codebase</span>
                    <span className="ctx-tag">@{activeFile}</span>
                    <span className="ctx-tag">@.floatrules</span>
                  </div>

                  <div className="chat-input-row">
                    <textarea 
                      className="chat-textarea"
                      placeholder="Ask about this code, or reference @files, @docs... (Enter to send)"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendChat();
                        }
                      }}
                      rows={2}
                    />
                    <button 
                      className="btn btn-primary btn-sm chat-send-btn"
                      onClick={handleSendChat}
                      disabled={isChatThinking}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        ) : (
          <button 
            className="ai-drawer-collapsed-btn"
            onClick={() => setIsRightPanelOpen(true)}
            title="Open Float AI Drawer"
          >
            <Sparkles size={16} className="text-cyan" />
            <span>AI Panel (⌘I / ⌘L)</span>
          </button>
        )}

      </div>
    </div>
  );
}
