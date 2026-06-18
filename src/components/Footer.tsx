import { Brain, Github, Twitter, Youtube, Mail } from 'lucide-react';
import type { Page } from '../App';

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const sections: { title: string; links: { label: string; page: Page }[] }[] = [
    {
      title: 'Learn',
      links: [
        { label: 'About AI', page: 'about' },
        { label: 'AI Concepts', page: 'concepts' },
        { label: 'AI in Real Life', page: 'reallife' },
        { label: 'Learn Roadmap', page: 'roadmap' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'AI Tools', page: 'tools' },
        { label: 'AI Ranking', page: 'ranking' },
        { label: 'Careers', page: 'careers' },
        { label: 'Quiz', page: 'quiz' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Contact', page: 'contact' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-900 border-t border-blue-900/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Brain size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-white font-display">AI AWARENESS HUB</div>
                <div className="text-xs text-slate-500 tracking-widest">LEARN · EXPLORE · EMPOWER</div>
              </div>
            </button>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Your one-stop platform to learn about Artificial Intelligence, explore real-world applications, and build your future with AI.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: <Youtube size={16} />, href: 'https://youtube.com' },
                { icon: <Twitter size={16} />, href: 'https://twitter.com' },
                { icon: <Github size={16} />, href: 'https://github.com' },
                { icon: <Mail size={16} />, href: 'mailto:hello@aihub.dev' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm mb-4 font-display">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(({ label, page }) => (
                  <li key={page}>
                    <button
                      onClick={() => navigate(page)}
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-blue-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            2024 AI Awareness Hub. Built for students, by learners.
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <span>Powered by</span>
            <span className="text-gradient font-semibold">OpenRouter</span>
            <span>&</span>
            <span className="text-cyan-400 font-semibold">React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
