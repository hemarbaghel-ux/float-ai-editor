import React, { useState } from 'react';
import { X, Key, Cpu, ShieldCheck, Check, Sliders, Sparkles } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, settings, onUpdateSettings }) {
  if (!isOpen) return null;

  const [provider, setProvider] = useState(settings.provider || 'builtin');
  const [apiKey, setApiKey] = useState(settings.apiKey || '');
  const [fontSize, setFontSize] = useState(settings.fontSize || 14);
  const [tabSize, setTabSize] = useState(settings.tabSize || 2);
  const [enableGhostTab, setEnableGhostTab] = useState(settings.enableGhostTab !== false);

  const handleSave = () => {
    onUpdateSettings({
      provider,
      apiKey,
      fontSize,
      tabSize,
      enableGhostTab
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel-glow" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3 className="modal-title">Float Engine & Editor Preferences</h3>
            <span className="pill pill-cyan">Configuration</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <div className="settings-section-block">
          <label className="settings-label">
            <Cpu size={15} className="text-indigo" />
            <span>AI Reasoning Provider</span>
          </label>
          <div className="provider-select-grid">
            <button 
              className={`provider-card ${provider === 'builtin' ? 'active' : ''}`}
              onClick={() => setProvider('builtin')}
            >
              <div className="provider-name">Float Neural Engine</div>
              <span className="provider-sub">Built-in • Instant • Free</span>
            </button>

            <button 
              className={`provider-card ${provider === 'gemini' ? 'active' : ''}`}
              onClick={() => setProvider('gemini')}
            >
              <div className="provider-name">Google Gemini 1.5</div>
              <span className="provider-sub">BYOK • 1M+ Context</span>
            </button>

            <button 
              className={`provider-card ${provider === 'openai' ? 'active' : ''}`}
              onClick={() => setProvider('openai')}
            >
              <div className="provider-name">OpenAI GPT-4o</div>
              <span className="provider-sub">BYOK • Standard API</span>
            </button>
          </div>
        </div>

        {provider !== 'builtin' && (
          <div className="settings-section-block animate-fade-in">
            <label className="settings-label">
              <Key size={15} className="text-cyan" />
              <span>{provider === 'gemini' ? 'Gemini API Key' : 'OpenAI API Key'}</span>
            </label>
            <input 
              type="password" 
              className="settings-input"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your private API key (stored securely in browser)"
            />
            <span className="settings-hint">
              <ShieldCheck size={13} className="text-emerald" />
              Your key stays locally in your browser storage. It is never relayed through third-party proxy servers.
            </span>
          </div>
        )}

        <div className="modal-divider"></div>

        <div className="settings-section-block">
          <label className="settings-label">
            <Sliders size={15} className="text-indigo" />
            <span>Editor Display</span>
          </label>
          <div className="editor-config-row">
            <div className="config-group">
              <span>Font Size ({fontSize}px)</span>
              <input 
                type="range" 
                min="12" 
                max="18" 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="config-range"
              />
            </div>

            <div className="config-group">
              <span>Tab Size</span>
              <select 
                value={tabSize} 
                onChange={(e) => setTabSize(Number(e.target.value))}
                className="config-select"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
              </select>
            </div>
          </div>

          <div className="toggle-row">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={enableGhostTab} 
                onChange={(e) => setEnableGhostTab(e.target.checked)} 
              />
              <span>Enable Float Tab predictive ghost autocomplete</span>
            </label>
          </div>
        </div>

        <div className="modal-footer-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Check size={14} />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
