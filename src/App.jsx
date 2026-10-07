import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesShowcase from './components/FeaturesShowcase';
import ComparisonTable from './components/ComparisonTable';
import Testimonials from './components/Testimonials';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

import Studio from './components/Studio/Studio';
import DownloadModal from './components/DownloadModal';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [currentView, setView] = useState('website'); // 'website' | 'studio'
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // User persistent settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('float_settings');
      return saved ? JSON.parse(saved) : {
        provider: 'builtin',
        apiKey: '',
        fontSize: 14,
        tabSize: 2,
        enableGhostTab: true
      };
    } catch {
      return {
        provider: 'builtin',
        apiKey: '',
        fontSize: 14,
        tabSize: 2,
        enableGhostTab: true
      };
    }
  });

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('float_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  };

  // Scroll to top on view switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="app-container bg-grid">
      {/* Top Universal Navbar */}
      <Navbar 
        currentView={currentView}
        setView={setView}
        onOpenDownload={() => setIsDownloadOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Viewport */}
      {currentView === 'website' ? (
        <main className="website-viewport animate-fade-in">
          <HeroSection 
            onLaunchStudio={() => setView('studio')}
            onOpenDownload={() => setIsDownloadOpen(true)}
          />
          <FeaturesShowcase 
            onLaunchStudio={() => setView('studio')}
          />
          <ComparisonTable />
          <Testimonials />
          <PricingSection 
            onLaunchStudio={() => setView('studio')}
          />
          <FAQSection />
          <Footer 
            onLaunchStudio={() => setView('studio')}
            onOpenDownload={() => setIsDownloadOpen(true)}
          />
        </main>
      ) : (
        <main className="studio-viewport animate-fade-in">
          <Studio 
            settings={settings}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        </main>
      )}

      {/* Modals */}
      <DownloadModal 
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onLaunchStudio={() => {
          setIsDownloadOpen(false);
          setView('studio');
        }}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}
