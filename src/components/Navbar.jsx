import React from 'react';
import { 
  Code2, 
  Terminal, 
  Sparkles, 
  Download, 
  Play, 
  Layers, 
  Cpu, 
  Check, 
  ExternalLink 
} from 'lucide-react';

export default function Navbar({ currentView, setView, onOpenDownload, onOpenSettings }) {
  return (
    <header className="nav-container">
      <div className="nav-inner">
        {/* Brand */}
        <div className="nav-brand" onClick={() => setView('website')}>
          <div className="brand-logo-glow">
            <Sparkles size={20} className="brand-icon text-indigo" />
          </div>
          <span className="brand-name">float</span>
          <span className="brand-badge">2.5</span>
        </div>

        {/* Center Links (when in website view) */}
        {currentView === 'website' && (
          <nav className="nav-links">
            <a href="#features" className="nav-item">Features</a>
            <a href="#composer" className="nav-item">Composer</a>
            <a href="#demo" className="nav-item">Interactive Demo</a>
            <a href="#comparison" className="nav-item">Comparison</a>
            <a href="#pricing" className="nav-item">Pricing</a>
            <a href="#faq" className="nav-item">FAQ</a>
          </nav>
        )}

        {/* View Mode Switcher + Actions */}
        <div className="nav-actions">
          {/* Mode Switcher Toggle Pill */}
          <div className="view-toggle-pill">
            <button 
              className={`toggle-tab ${currentView === 'website' ? 'active' : ''}`}
              onClick={() => setView('website')}
            >
              Overview
            </button>
            <button 
              className={`toggle-tab ${currentView === 'studio' ? 'active' : ''}`}
              onClick={() => setView('studio')}
            >
              <span className="live-dot"></span>
              Float Studio (IDE)
            </button>
          </div>

          {currentView === 'website' ? (
            <>
              <button className="btn btn-secondary btn-sm" onClick={onOpenDownload}>
                <Download size={15} />
                <span>Download</span>
              </button>
              <button className="btn btn-primary btn-sm glow-btn" onClick={() => setView('studio')}>
                <Play size={14} fill="currentColor" />
                <span>Launch Studio</span>
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary btn-sm" onClick={() => setView('website')}>
                <span>Landing View</span>
              </button>
              <button className="btn btn-secondary btn-sm" onClick={onOpenSettings}>
                <Cpu size={15} />
                <span>AI Config</span>
              </button>
              <button className="btn btn-primary btn-sm" onClick={onOpenDownload}>
                <Download size={14} />
                <span>Get Desktop App</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
