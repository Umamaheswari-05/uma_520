import { ArrowRight, Brain, Zap, BookOpen, Trophy, Users, Play, ChevronRight, Star, Cpu, Globe } from 'lucide-react';
import type { Page } from '../App';
import AIHeroVisual from '../components/AIHeroVisual';
import TopicAnimation from '../components/TopicAnimation';

interface HomeProps {
  navigate: (page: Page) => void;
}

const stats = [
  { value: '50+', label: 'Free AI Tools', icon: <Zap size={18} className="text-cyan-400" /> },
  { value: '100+', label: 'AI Models Ranked', icon: <Trophy size={18} className="text-yellow-400" /> },
  { value: '10+', label: 'Learning Modules', icon: <BookOpen size={18} className="text-blue-400" /> },
  { value: '5K+', label: 'Students Helped', icon: <Users size={18} className="text-green-400" /> },
];

const modules: { icon: JSX.Element; title: string; desc: string; page: Page; color: string; tag: string }[] = [
  {
    icon: <Brain size={24} />, title: 'About AI', page: 'about',
    desc: 'Understand what Artificial Intelligence is, its history, and how it works.',
    color: 'from-blue-600 to-blue-400', tag: 'Foundation',
  },
  {
    icon: <Cpu size={24} />, title: 'AI Concepts', page: 'concepts',
    desc: 'Explore ML, Deep Learning, NLP, Computer Vision and more core topics.',
    color: 'from-cyan-600 to-cyan-400', tag: 'Core Concepts',
  },
  {
    icon: <Zap size={24} />, title: 'AI Tools', page: 'tools',
    desc: 'Discover 50+ free AI tools designed specifically for students.',
    color: 'from-emerald-600 to-emerald-400', tag: 'Free Tools',
  },
  {
    icon: <Trophy size={24} />, title: 'AI Ranking', page: 'ranking',
    desc: 'Compare all AI models side-by-side using live OpenRouter data.',
    color: 'from-yellow-600 to-yellow-400', tag: 'Live Rankings',
  },
  {
    icon: <Globe size={24} />, title: 'AI in Real Life', page: 'reallife',
    desc: 'See how AI is transforming healthcare, education, business and more.',
    color: 'from-purple-600 to-purple-400', tag: 'Applications',
  },
  {
    icon: <BookOpen size={24} />, title: 'Learn Roadmap', page: 'roadmap',
    desc: 'Follow a structured path from AI beginner to expert practitioner.',
    color: 'from-rose-600 to-rose-400', tag: 'Step-by-step',
  },
];

const featuredTools = [
  { name: 'ChatGPT', category: 'Chatbot', free: true },
  { name: 'Claude AI', category: 'Writing', free: true },
  { name: 'Perplexity', category: 'Research', free: true },
  { name: 'Google Gemini', category: 'Multimodal', free: true },
  { name: 'Gamma.app', category: 'Presentations', free: true },
  { name: 'Consensus', category: 'Research', free: true },
];

export default function Home({ navigate }: HomeProps) {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center grid-bg overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Welcome to AI Awareness Hub
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-[1.08] tracking-tight">
                <span className="text-white">Discover </span>
                <span className="text-gradient">AI.</span>
                <br />
                <span className="text-white">Understand </span>
                <span className="text-gradient">AI.</span>
                <br />
                <span className="text-slate-300">Use AI for a </span>
                <span className="text-gradient">Better Future.</span>
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Your one-stop platform to learn about Artificial Intelligence, explore real-world applications, discover free AI tools, and build your future with AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('about')}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-all hover:scale-105 glow-blue"
                >
                  Start Learning <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate('tools')}
                  className="flex items-center justify-center gap-2 border border-blue-500/30 text-slate-300 hover:text-white hover:border-blue-400 font-semibold px-8 py-3.5 rounded-xl transition-all hover:bg-blue-600/10"
                >
                  Explore AI Tools <ChevronRight size={18} />
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-white font-display">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — AI Visual */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-lg">
                <AIHeroVisual />
                {/* Floating badges */}
                <div className="absolute top-8 -right-2 sm:-right-6 glass rounded-2xl px-4 py-3 border border-blue-500/20 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs font-semibold">AI Models Live</span>
                  </div>
                  <div className="text-white text-lg font-bold font-display mt-0.5">100+ Models</div>
                </div>
                <div className="absolute bottom-16 -left-2 sm:-left-6 glass rounded-2xl px-4 py-3 border border-cyan-500/20 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 text-xs font-semibold">Top Rated</span>
                  </div>
                  <div className="text-white text-sm font-semibold mt-0.5">Free for Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              Everything You Need
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
              Explore All <span className="text-gradient">Modules</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From AI fundamentals to real-world applications — every resource a student needs to succeed in the age of AI.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <button
                key={mod.page}
                onClick={() => navigate(mod.page)}
                className="glass glass-hover rounded-2xl p-6 text-left group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {mod.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-bold text-lg font-display">{mod.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${mod.color} text-white font-medium`}>
                    {mod.tag}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{mod.desc}</p>
                <div className="flex items-center gap-1 text-blue-400 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  Explore <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                <Play size={14} className="fill-blue-400" /> See AI in Action
              </div>
              <h2 className="text-4xl font-bold font-display text-white mb-6">
                How Deep Learning Works
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Watch a live animated visualization of a deep neural network — see data flow through layers, watch neurons activate, and understand how AI makes decisions in real time.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Interactive Visual', 'Beginner Friendly', 'No math required'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate('about')}
                className="mt-8 flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
              >
                View All Videos <ArrowRight size={16} />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-2xl blur-xl" />
              <TopicAnimation topicKey="dl" className="relative shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Preview */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold font-display text-white">
                Top Free <span className="text-gradient">AI Tools</span> for Students
              </h2>
              <p className="text-slate-400 mt-2">No credit card required. Start learning immediately.</p>
            </div>
            <button
              onClick={() => navigate('tools')}
              className="flex items-center gap-2 border border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-600/10 px-5 py-2.5 rounded-xl transition-all text-sm font-semibold whitespace-nowrap"
            >
              View All Tools <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <div key={tool.name} className="glass glass-hover rounded-xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold font-display text-sm flex-shrink-0">
                  {tool.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">{tool.name}</div>
                  <div className="text-slate-400 text-xs">{tool.category}</div>
                </div>
                {tool.free && (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-semibold flex-shrink-0">
                    FREE
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600" />
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative px-8 sm:px-16 py-16 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
                Ready to Begin Your AI Journey?
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of students who are learning AI skills and building the future. It's completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('roadmap')}
                  className="flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Start Your Learning Path <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate('quiz')}
                  className="flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  Take the AI Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
