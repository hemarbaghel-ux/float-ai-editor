import React from 'react';
import { Sparkles, Shield, CheckCircle } from 'lucide-react';

export default function Footer({ onLaunchStudio, onOpenDownload }) {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <div className="brand-logo-glow">
              <Sparkles size={18} className="brand-icon text-indigo" />
            </div>
            <span className="brand-name">float</span>
          </div>
          <p className="footer-desc">
            The autonomous AI code editor built to amplify developer velocity.
            Code at the speed of thought.
          </p>
          <div className="system-status-badge">
            <span className="status-live-dot"></span>
            <span>All Systems Operational • 99.99% Uptime</span>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h5>Product</h5>
            <a href="#features">Float Tab</a>
            <a href="#composer">Composer Agent</a>
            <a href="#demo">Cmd+K Inline</a>
            <a href="#comparison">Benchmarks</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div className="footer-col">
            <h5>Resources</h5>
            <button className="link-button" onClick={onLaunchStudio}>Web Studio IDE</button>
            <button className="link-button" onClick={onOpenDownload}>Download Desktop</button>
            <a href="https://github.com" target="_blank" rel="noreferrer">VS Code Marketplace</a>
            <a href="#faq">Documentation</a>
            <a href="#faq">Changelog (v2.5)</a>
          </div>

          <div className="footer-col">
            <h5>Security & Legal</h5>
            <a href="#faq">Privacy Mode (Zero Retention)</a>
            <a href="#faq">SOC 2 Type II</a>
            <a href="#faq">Terms of Service</a>
            <a href="#faq">Security Whitepaper</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copy-text">
          © {new Date().getFullYear()} Float Technologies Inc. All rights reserved.
        </div>
        <div className="footer-socials">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
          <a href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6h0a14.5 14.5 0 0 0-4-1.5 9.8 9.8 0 0 0-.5 1.5 13.9 13.9 0 0 0-5 0A9.8 9.8 0 0 0 8 4.5 14.5 14.5 0 0 0 4 6c-2.5 4-3 8-2 12a14.8 14.8 0 0 0 4.5 2.5 10.4 10.4 0 0 0 1-1.5 9.4 9.4 0 0 1-1.5-.7l.4-.3a11.5 11.5 0 0 0 11.2 0l.4.3a9.4 9.4 0 0 1-1.5.7 10.4 10.4 0 0 0 1 1.5 14.8 14.8 0 0 0 4.5-2.5c1-4.5.5-8.5-2-12z"></path><circle cx="8.5" cy="12" r="1.5"></circle><circle cx="15.5" cy="12" r="1.5"></circle></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
