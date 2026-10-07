import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      quote: "Float Tab genuinely feels like mind reading. I find myself writing 3x as much code while making fewer architectural errors. It's impossible to go back to VS Code after this.",
      author: "Marcus Chen",
      role: "Staff Software Engineer",
      company: "HyperScale Cloud",
      avatar: "MC"
    },
    {
      quote: "Composer alone saved our team weeks of refactoring during our migration to Next.js App Router. Describing what I wanted across 14 files and watching synchronized diffs appear was sheer magic.",
      author: "Sarah Lindqvist",
      role: "Founder & CTO",
      company: "VectorFlow AI",
      avatar: "SL"
    },
    {
      quote: "The in-browser Studio is game-changing. I can hop onto my iPad or Chromebook, open Float, and edit complex code with full AI agent capabilities instantly. Zero setup required.",
      author: "Devon Reynolds",
      role: "Principal Architect",
      company: "Fintech Labs",
      avatar: "DR"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="section-header text-center">
        <div className="pill pill-emerald">
          <Star size={13} fill="currentColor" />
          <span>Developer Acclaim</span>
        </div>
        <h2 className="section-title">
          Loved by Engineers Shipping <br />
          <span className="gradient-text">World-Class Software.</span>
        </h2>
      </div>

      <div className="testimonials-grid">
        {reviews.map((r, i) => (
          <div key={i} className="testimonial-card glass-panel">
            <Quote size={24} className="quote-icon text-indigo" />
            <p className="testimonial-quote">"{r.quote}"</p>
            <div className="testimonial-footer">
              <div className="testimonial-avatar">{r.avatar}</div>
              <div className="testimonial-meta">
                <span className="author-name">{r.author}</span>
                <span className="author-role">{r.role} • {r.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
