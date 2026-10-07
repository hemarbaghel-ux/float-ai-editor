import React from 'react';
import { X, Download, Monitor, Apple, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DownloadModal({ isOpen, onClose, onLaunchStudio }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel-glow" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3 className="modal-title">Download Float for Desktop</h3>
            <span className="pill pill-primary">v2.5.4 Stable</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <p className="modal-subtext">
          Experience ultra-low latency native execution with full local codebase AST indexing.
          Imports your existing VS Code extensions, keybindings, and themes in 10 seconds.
        </p>

        <div className="download-options-grid">
          {/* Windows */}
          <div className="download-option-card">
            <div className="d-icon-wrap">
              <Monitor size={24} className="text-cyan" />
            </div>
            <div className="d-meta">
              <h4>Windows</h4>
              <p>Windows 10, 11 (x64 / ARM64)</p>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                alert("Downloading Float-Setup-2.5.4.exe (Windows Installer)");
                onClose();
              }}
            >
              <Download size={14} />
              <span>.exe (64-bit)</span>
            </button>
          </div>

          {/* macOS */}
          <div className="download-option-card">
            <div className="d-icon-wrap">
              <Apple size={24} className="text-indigo" />
            </div>
            <div className="d-meta">
              <h4>macOS</h4>
              <p>Apple Silicon (M1/M2/M3/M4) & Intel</p>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                alert("Downloading Float-2.5.4-Universal.dmg (macOS)");
                onClose();
              }}
            >
              <Download size={14} />
              <span>.dmg (Universal)</span>
            </button>
          </div>

          {/* Linux */}
          <div className="download-option-card">
            <div className="d-icon-wrap">
              <Terminal size={24} className="text-emerald" />
            </div>
            <div className="d-meta">
              <h4>Linux</h4>
              <p>Debian, Ubuntu, Fedora, Arch</p>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                alert("Downloading Float-2.5.4-amd64.deb");
                onClose();
              }}
            >
              <Download size={14} />
              <span>.deb / .AppImage</span>
            </button>
          </div>
        </div>

        <div className="modal-divider"></div>

        <div className="web-alternative-box">
          <div className="web-alt-info">
            <strong>Prefer no installation?</strong>
            <span>Use our full In-Browser Web Studio directly with instant cloud execution.</span>
          </div>
          <button 
            className="btn btn-accent btn-sm"
            onClick={() => {
              onClose();
              onLaunchStudio();
            }}
          >
            <span>Launch Web Studio</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
