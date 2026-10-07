import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingSection({ onLaunchStudio }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="pricing-section" id="pricing">
      <div className="section-header text-center">
        <div className="pill pill-primary">
          <Sparkles size={13} />
          <span>Transparent Pricing</span>
        </div>
        <h2 className="section-title">
          Invest in Velocity, <br />
          <span className="gradient-text">Ship 3x Faster Every Day.</span>
        </h2>
        <p className="section-subtitle">
          Start building for free with our in-browser studio or BYOK. Upgrade for premium frontier models.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="billing-toggle-wrapper">
          <span className={`billing-label ${!isAnnual ? 'active' : ''}`}>Monthly</span>
          <button 
            className={`billing-switch ${isAnnual ? 'checked' : ''}`}
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Toggle annual billing"
          >
            <span className="switch-thumb"></span>
          </button>
          <span className={`billing-label ${isAnnual ? 'active' : ''}`}>
            Annually <span className="discount-pill">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="pricing-cards-grid">
        {/* Tier 1: Hobby */}
        <div className="pricing-card glass-panel">
          <div className="card-top">
            <h3 className="tier-name">Hobby</h3>
            <p className="tier-desc">For exploring Float and independent tinkering.</p>
            <div className="tier-price">
              <span className="price-val">$0</span>
              <span className="price-period">/ forever</span>
            </div>
          </div>

          <button className="btn btn-secondary w-full" onClick={onLaunchStudio}>
            Start in Browser (Free)
          </button>

          <div className="card-divider"></div>

          <ul className="tier-features">
            <li><Check size={16} className="text-emerald" /> Free In-Browser Studio</li>
            <li><Check size={16} className="text-emerald" /> 2,000 Float Tab completions/mo</li>
            <li><Check size={16} className="text-emerald" /> 50 slow AI requests/mo</li>
            <li><Check size={16} className="text-emerald" /> Bring Your Own Key (BYOK)</li>
            <li><Check size={16} className="text-emerald" /> Standard Codebase AST Indexing</li>
          </ul>
        </div>

        {/* Tier 2: Pro (Highlighted) */}
        <div className="pricing-card glass-panel pricing-card-featured">
          <div className="featured-ribbon">
            <Sparkles size={12} />
            <span>MOST POPULAR</span>
          </div>

          <div className="card-top">
            <h3 className="tier-name">Pro</h3>
            <p className="tier-desc">For professional engineers demanding maximum speed.</p>
            <div className="tier-price">
              <span className="price-val">${isAnnual ? '16' : '20'}</span>
              <span className="price-period">/ month {isAnnual && 'billed annually'}</span>
            </div>
          </div>

          <button className="btn btn-primary w-full glow-btn" onClick={onLaunchStudio}>
            <span>Get Started with Pro</span>
            <ArrowRight size={14} />
          </button>

          <div className="card-divider"></div>

          <ul className="tier-features">
            <li><Check size={16} className="text-indigo" /> <strong>Unlimited</strong> fast Float Tab completions</li>
            <li><Check size={16} className="text-indigo" /> <strong>500 fast requests/mo</strong> (Sonnet 3.5, GPT-4o)</li>
            <li><Check size={16} className="text-indigo" /> Unlimited slow requests</li>
            <li><Check size={16} className="text-indigo" /> <strong>Float Composer</strong> (Multi-file agent)</li>
            <li><Check size={16} className="text-indigo" /> Autonomous Terminal Co-Pilot</li>
            <li><Check size={16} className="text-indigo" /> In-place Cmd+K diff generator</li>
            <li><Check size={16} className="text-indigo" /> Up to 10 parallel background jobs</li>
          </ul>
        </div>

        {/* Tier 3: Business */}
        <div className="pricing-card glass-panel">
          <div className="card-top">
            <h3 className="tier-name">Business</h3>
            <p className="tier-desc">For high-growth software engineering teams.</p>
            <div className="tier-price">
              <span className="price-val">${isAnnual ? '32' : '40'}</span>
              <span className="price-period">/ user / month</span>
            </div>
          </div>

          <button className="btn btn-secondary w-full" onClick={onLaunchStudio}>
            Start Team Trial
          </button>

          <div className="card-divider"></div>

          <ul className="tier-features">
            <li><Check size={16} className="text-emerald" /> Everything in Pro</li>
            <li><Check size={16} className="text-emerald" /> Centralized admin dashboard & billing</li>
            <li><Check size={16} className="text-emerald" /> Enforced Zero-Data-Retention mode</li>
            <li><Check size={16} className="text-emerald" /> Shared team index for private doc repos</li>
            <li><Check size={16} className="text-emerald" /> SOC-2 Type II audit reporting</li>
            <li><Check size={16} className="text-emerald" /> Priority queue compute bandwidth</li>
          </ul>
        </div>

        {/* Tier 4: Enterprise */}
        <div className="pricing-card glass-panel">
          <div className="card-top">
            <h3 className="tier-name">Enterprise</h3>
            <p className="tier-desc">Custom on-prem & maximum security requirements.</p>
            <div className="tier-price">
              <span className="price-val">Custom</span>
              <span className="price-period">/ annual contract</span>
            </div>
          </div>

          <button className="btn btn-secondary w-full" onClick={() => alert("Connecting you with our Enterprise Solutions Team.")}>
            Contact Sales
          </button>

          <div className="card-divider"></div>

          <ul className="tier-features">
            <li><Check size={16} className="text-cyan" /> Dedicated VPC / On-Prem Deployments</li>
            <li><Check size={16} className="text-cyan" /> SAML 2.0 / Okta SSO integration</li>
            <li><Check size={16} className="text-cyan" /> Custom self-hosted weights & LLM routing</li>
            <li><Check size={16} className="text-cyan" /> 99.99% Uptime SLA commitment</li>
            <li><Check size={16} className="text-cyan" /> Dedicated Solutions Architect</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
