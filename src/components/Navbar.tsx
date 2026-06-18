import { useState } from 'react';
import { Brain, Menu, X, ChevronRight } from 'lucide-react';
import type { Page } from '../App';

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const navItems: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About AI', page: 'about' },
  { label: 'AI Concepts', page: 'concepts' },
  { label: 'AI Tools', page: 'tools' },
  { label: 'AI Ranking', page: 'ranking' },
  { label: 'AI in Real Life', page: 'reallife' },
  { label: 'Learn Roadmap', page: 'roadmap' },
  { label: 'Careers', page: 'careers' },
  { label: 'Quiz', page: 'quiz' },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page: Page) => {
    navigate(page);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white font-display leading-none">
                AI <span className="text-gradient">AWARENESS</span> HUB
              </div>
              <div className="text-[10px] text-slate-400 tracking-widest leading-none mt-0.5">
                LEARN · EXPLORE · EMPOWER
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Start Learning CTA */}
          <div className="hidden xl:flex items-center gap-3">
            <button
              onClick={() => handleNav('tools')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Explore AI Tools <ChevronRight size={12} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="xl:hidden border-t border-blue-900/30 bg-navy-900/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {navItems.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
