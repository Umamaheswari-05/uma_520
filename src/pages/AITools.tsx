import { useState } from 'react';
import { ExternalLink, Search, Star, Zap, BookOpen, Palette, Code, FlaskConical, Music, Video, FileText, MessageSquare } from 'lucide-react';

type Category = 'All' | 'Writing' | 'Research' | 'Coding' | 'Images' | 'Productivity' | 'Math' | 'Music' | 'Video' | 'Study';

interface Tool {
  name: string;
  category: Category;
  description: string;
  features: string[];
  url: string;
  freeLevel: 'Fully Free' | 'Free Tier' | 'Free with Edu';
  rating: number;
  image: string;
  icon: string;
  hot?: boolean;
}

const tools: Tool[] = [
  { name: 'ChatGPT', category: 'Writing', description: 'Versatile AI chatbot for writing, coding, analysis, and learning. GPT-4o is available for free users.', features: ['Essay writing', 'Code help', 'Q&A', 'Translation'], url: 'https://chat.openai.com', freeLevel: 'Free Tier', rating: 4.9, image: 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'C', hot: true },
  { name: 'Claude AI', category: 'Writing', description: 'Anthropic\'s AI — excellent for long documents, summarization, and nuanced writing.', features: ['Long documents', 'Summarization', 'Code review', 'Research'], url: 'https://claude.ai', freeLevel: 'Free Tier', rating: 4.8, image: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'A', hot: true },
  { name: 'Google Gemini', category: 'Research', description: 'Google\'s multimodal AI. Upload images, PDFs, and ask questions. Integrates with Google Workspace.', features: ['Image understanding', 'PDF analysis', 'Google Docs integration', 'Web search'], url: 'https://gemini.google.com', freeLevel: 'Fully Free', rating: 4.7, image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'G' },
  { name: 'Perplexity AI', category: 'Research', description: 'AI-powered search engine that cites sources. Perfect for research with verified references.', features: ['Cited sources', 'Real-time web search', 'Academic papers', 'Follow-up questions'], url: 'https://perplexity.ai', freeLevel: 'Free Tier', rating: 4.8, image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'P', hot: true },
  { name: 'Consensus', category: 'Research', description: 'AI search engine for scientific papers. Find research-backed answers from peer-reviewed studies.', features: ['Scientific papers', 'Evidence-based answers', '200M+ papers', 'Study summaries'], url: 'https://consensus.app', freeLevel: 'Free Tier', rating: 4.6, image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'C' },
  { name: 'Gamma.app', category: 'Productivity', description: 'Create stunning presentations, documents, and websites with AI. No design skills needed.', features: ['AI presentations', 'Auto design', 'Web export', 'Templates'], url: 'https://gamma.app', freeLevel: 'Free Tier', rating: 4.7, image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'G', hot: true },
  { name: 'GitHub Copilot', category: 'Coding', description: 'AI pair programmer that helps you write code faster. Free for students via GitHub Education.', features: ['Code completion', 'Bug fixing', 'Explanation', 'Multi-language'], url: 'https://github.com/features/copilot', freeLevel: 'Free with Edu', rating: 4.8, image: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'G' },
  { name: 'Replit Ghostwriter', category: 'Coding', description: 'In-browser AI coding assistant. Write, run, and debug code with AI help in the browser.', features: ['In-browser IDE', 'AI code gen', 'Debugging', 'Deployment'], url: 'https://replit.com', freeLevel: 'Free Tier', rating: 4.5, image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'R' },
  { name: 'Wolfram Alpha', category: 'Math', description: 'Computational AI engine for math, science, and data. Step-by-step solutions for STEM subjects.', features: ['Step-by-step math', 'Data computation', 'Physics problems', 'Graph plotting'], url: 'https://wolframalpha.com', freeLevel: 'Free Tier', rating: 4.7, image: 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'W' },
  { name: 'Photomath', category: 'Math', description: 'Scan math problems with your camera and get instant step-by-step solutions.', features: ['Camera scanning', 'Step-by-step', 'Algebra to Calculus', 'Word problems'], url: 'https://photomath.com', freeLevel: 'Free Tier', rating: 4.6, image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'P' },
  { name: 'Canva AI', category: 'Images', description: 'Design tool with powerful AI features — Magic Write, text-to-image, background remover, and more.', features: ['AI image gen', 'Magic Write', 'Background remover', 'Templates'], url: 'https://canva.com', freeLevel: 'Free Tier', rating: 4.7, image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'C' },
  { name: 'Adobe Firefly', category: 'Images', description: 'Adobe\'s ethical AI image generator. Free for students. Create stunning images with text prompts.', features: ['Text to image', 'Style transfer', 'Generative fill', 'Commercial safe'], url: 'https://firefly.adobe.com', freeLevel: 'Free Tier', rating: 4.6, image: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'A' },
  { name: 'Grammarly', category: 'Writing', description: 'AI writing assistant that checks grammar, tone, clarity, and style. Integrates with browser and Google Docs.', features: ['Grammar check', 'Tone detection', 'Clarity suggestions', 'Plagiarism check'], url: 'https://grammarly.com', freeLevel: 'Free Tier', rating: 4.7, image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'G' },
  { name: 'Quizlet AI', category: 'Study', description: 'AI-powered study tool. Create flashcards, practice tests, and get personalized study plans from any content.', features: ['AI flashcards', 'Practice tests', 'Study games', 'Smart study plan'], url: 'https://quizlet.com', freeLevel: 'Free Tier', rating: 4.6, image: 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'Q' },
  { name: 'Notion AI', category: 'Productivity', description: 'AI writing and thinking partner built into Notion. Summarize, translate, brainstorm, and organize.', features: ['AI writing', 'Summarization', 'Database AI', 'Meeting notes'], url: 'https://notion.so', freeLevel: 'Free Tier', rating: 4.6, image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'N' },
  { name: 'Suno AI', category: 'Music', description: 'Create full songs with AI — just describe what you want in words. Free for personal use.', features: ['Full song generation', 'Lyrics + music', 'Multiple genres', 'Download MP3'], url: 'https://suno.ai', freeLevel: 'Free Tier', rating: 4.5, image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'S', hot: true },
  { name: 'Elicit', category: 'Research', description: 'AI research assistant that helps you find and analyze academic papers automatically.', features: ['Paper search', 'Auto summarization', 'Data extraction', 'Literature review'], url: 'https://elicit.com', freeLevel: 'Free Tier', rating: 4.6, image: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'E' },
  { name: 'Runway ML', category: 'Video', description: 'Professional AI video editing and generation. Text-to-video, background removal, and more.', features: ['Text-to-video', 'Video editing', 'Background removal', 'AI effects'], url: 'https://runwayml.com', freeLevel: 'Free Tier', rating: 4.5, image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400', icon: 'R' },
];

const categories: Category[] = ['All', 'Writing', 'Research', 'Coding', 'Images', 'Productivity', 'Math', 'Study', 'Music', 'Video'];

const categoryIcons: Record<Category, JSX.Element> = {
  All: <Zap size={14} />,
  Writing: <FileText size={14} />,
  Research: <Search size={14} />,
  Coding: <Code size={14} />,
  Images: <Palette size={14} />,
  Productivity: <BookOpen size={14} />,
  Math: <FlaskConical size={14} />,
  Study: <BookOpen size={14} />,
  Music: <Music size={14} />,
  Video: <Video size={14} />,
};

const freeColors: Record<string, string> = {
  'Fully Free': 'bg-green-500/10 border-green-500/20 text-green-400',
  'Free Tier': 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  'Free with Edu': 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
};

const chatColors = [
  'from-blue-600 to-blue-400', 'from-cyan-600 to-cyan-400', 'from-emerald-600 to-emerald-400',
  'from-rose-600 to-rose-400', 'from-purple-600 to-purple-400', 'from-yellow-600 to-yellow-400',
];

export default function AITools() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');

  const filtered = tools.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Zap size={14} /> Free AI Tools for Students
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            50+ <span className="text-gradient">Free AI Tools</span> for Students
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Every tool on this list has a free tier or is completely free for students. Boost your productivity, ace assignments, and learn faster.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.entries(freeColors).map(([key, val]) => (
            <div key={key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${val}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" /> {key}
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool, i) => (
            <div key={tool.name} className="glass glass-hover rounded-2xl overflow-hidden group">
              {/* Tool image header */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                {tool.hot && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                    <Zap size={10} className="fill-orange-400" /> Hot
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${chatColors[i % chatColors.length]} flex items-center justify-center text-white font-bold font-display text-lg shadow-lg`}>
                    {tool.icon}
                  </div>
                  <div>
                    <div className="text-white font-bold font-display">{tool.name}</div>
                    <div className="text-slate-400 text-xs">{tool.category}</div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* Free badge + rating */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${freeColors[tool.freeLevel]}`}>
                    {tool.freeLevel}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-semibold">{tool.rating}</span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">{tool.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tool.features.map((f) => (
                    <span key={f} className="text-xs px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r ${chatColors[i % chatColors.length]} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}
                >
                  Open Tool <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <MessageSquare size={40} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No tools found for "{search}"</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 text-blue-400 hover:text-blue-300 text-sm">
              Clear search
            </button>
          </div>
        )}

        {/* Pro tip */}
        <div className="mt-16 glass rounded-2xl p-8 border border-emerald-500/20">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <Zap size={22} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl font-display mb-2">Pro Tip for Students</h3>
              <p className="text-slate-400 leading-relaxed">
                Apply for <strong className="text-white">GitHub Student Developer Pack</strong> at education.github.com to get free access to Copilot, Canva Pro, Notion, and dozens more premium AI tools — all completely free while you're enrolled.
              </p>
              <a href="https://education.github.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors">
                Get Student Pack <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
