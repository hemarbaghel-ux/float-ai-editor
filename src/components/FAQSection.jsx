import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What makes Float different from Cursor and standard VS Code?",
      a: "Float is designed with an autonomous-first architecture. In addition to desktop support, Float offers a full-featured in-browser Web Studio with zero installation needed. It integrates multi-file Composer agents, sub-20ms predictive Float Tab autocomplete, instant git-style inline diffs (Cmd+K), and full AST codebase indexing."
    },
    {
      q: "Can I use my existing VS Code extensions, themes, and keybindings?",
      a: "Yes! Float is fully compatible with the VS Code extension marketplace and ecosystem. When you launch Float desktop, you can migrate all your extensions, snippets, custom themes, and keybindings in a single click."
    },
    {
      q: "Is my code secure, and do you train models on my private codebase?",
      a: "Never. In our Privacy Mode (which is enabled by default for all users), code snippets and prompts are processed strictly in ephemeral memory and discarded immediately after generation. Float is SOC-2 Type II compliant and never uses private proprietary code for LLM training."
    },
    {
      q: "Can I bring my own API keys (BYOK)?",
      a: "Yes! Float allows you to directly supply your own Google Gemini, Anthropic Claude, OpenAI, or local Ollama endpoints in Settings. This gives you unlimited usage on your own account at zero platform markup."
    },
    {
      q: "How does the Float Web Studio work without native installation?",
      a: "The Web Studio runs client-side in your modern browser using WebAssembly and sandboxed iframe runners. You can edit files, preview UI changes in real-time, execute simulated terminal commands, and review multi-file AI diffs without installing any local binaries."
    }
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="section-header text-center">
        <div className="pill pill-cyan">
          <HelpCircle size={13} />
          <span>Got Questions?</span>
        </div>
        <h2 className="section-title">
          Frequently Asked <span className="gradient-text-cyan">Questions</span>
        </h2>
      </div>

      <div className="faq-container">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div 
              key={i} 
              className={`faq-item glass-panel ${isOpen ? 'active' : ''}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
              </div>
              {isOpen && (
                <div className="faq-answer animate-fade-in">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
