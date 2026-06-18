import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, RefreshCw, ExternalLink, Star, Zap, Search, Info } from 'lucide-react';

interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  pricing: {
    prompt: string;
    completion: string;
  };
  context_length: number;
  top_provider?: {
    context_length?: number;
    max_completion_tokens?: number;
  };
}

const staticModels = [
  { rank: 1, name: 'GPT-4o', provider: 'OpenAI', id: 'openai/gpt-4o', context: '128K', strengths: ['Reasoning', 'Code', 'Vision', 'Multimodal'], score: 98, free: false, badge: 'Top Performer' },
  { rank: 2, name: 'Claude 3.5 Sonnet', provider: 'Anthropic', id: 'anthropic/claude-3.5-sonnet', context: '200K', strengths: ['Writing', 'Code', 'Analysis', 'Long docs'], score: 97, free: false, badge: 'Best Writer' },
  { rank: 3, name: 'Gemini 1.5 Pro', provider: 'Google', id: 'google/gemini-pro-1.5', context: '2M', strengths: ['Long context', 'Multimodal', 'Search', 'Vision'], score: 95, free: true, badge: 'Longest Context' },
  { rank: 4, name: 'Llama 3.1 405B', provider: 'Meta', id: 'meta-llama/llama-3.1-405b-instruct', context: '128K', strengths: ['Open source', 'Reasoning', 'Code', 'General'], score: 93, free: true, badge: 'Best Open Source' },
  { rank: 5, name: 'Gemini Flash 1.5', provider: 'Google', id: 'google/gemini-flash-1.5', context: '1M', strengths: ['Speed', 'Long context', 'Free', 'Multimodal'], score: 91, free: true, badge: 'Fastest Free' },
  { rank: 6, name: 'Mistral Large', provider: 'Mistral AI', id: 'mistralai/mistral-large', context: '128K', strengths: ['French/EU focus', 'Code', 'Reasoning', 'Privacy'], score: 89, free: false, badge: 'EU Choice' },
  { rank: 7, name: 'Llama 3.1 70B', provider: 'Meta', id: 'meta-llama/llama-3.1-70b-instruct', context: '128K', strengths: ['Open source', 'Fast', 'Free tier', 'Balanced'], score: 88, free: true, badge: 'Best Value Free' },
  { rank: 8, name: 'Claude 3 Haiku', provider: 'Anthropic', id: 'anthropic/claude-3-haiku', context: '200K', strengths: ['Speed', 'Cost-efficient', 'Coding', 'Summarization'], score: 86, free: false, badge: 'Speed Demon' },
  { rank: 9, name: 'Mixtral 8x22B', provider: 'Mistral AI', id: 'mistralai/mixtral-8x22b-instruct', context: '64K', strengths: ['Open source', 'Multilingual', 'Long context', 'Balanced'], score: 85, free: true, badge: 'Multilingual King' },
  { rank: 10, name: 'GPT-4o Mini', provider: 'OpenAI', id: 'openai/gpt-4o-mini', context: '128K', strengths: ['Cheap', 'Fast', 'General', 'JSON mode'], score: 84, free: false, badge: 'Best Budget' },
  { rank: 11, name: 'Qwen 2 72B', provider: 'Alibaba', id: 'qwen/qwen-2-72b-instruct', context: '128K', strengths: ['Chinese/Asian text', 'Code', 'Free', 'Math'], score: 82, free: true, badge: 'Top Asian Model' },
  { rank: 12, name: 'Gemma 2 27B', provider: 'Google', id: 'google/gemma-2-27b-it', context: '8K', strengths: ['Lightweight', 'Open', 'Free', 'Fast'], score: 78, free: true, badge: 'Lightweight Champion' },
];

const badgeColors: Record<string, string> = {
  'Top Performer': 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
  'Best Writer': 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  'Longest Context': 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
  'Best Open Source': 'bg-orange-500/20 border-orange-500/30 text-orange-400',
  'Fastest Free': 'bg-green-500/20 border-green-500/30 text-green-400',
  'EU Choice': 'bg-purple-500/20 border-purple-500/30 text-purple-400',
  'Best Value Free': 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
  'Speed Demon': 'bg-red-500/20 border-red-500/30 text-red-400',
  'Multilingual King': 'bg-teal-500/20 border-teal-500/30 text-teal-400',
  'Best Budget': 'bg-amber-500/20 border-amber-500/30 text-amber-400',
  'Top Asian Model': 'bg-rose-500/20 border-rose-500/30 text-rose-400',
  'Lightweight Champion': 'bg-slate-500/20 border-slate-500/30 text-slate-400',
};

export default function AIRanking() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Free' | 'Paid'>('All');
  const [liveModels, setLiveModels] = useState<OpenRouterModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'curated' | 'live'>('curated');

  const fetchLiveModels = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://openrouter.ai/api/v1/models');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setLiveModels(data.data?.slice(0, 50) || []);
    } catch {
      setError('Could not load live models. Showing curated rankings instead.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'live') fetchLiveModels();
  }, [activeTab]);

  const filtered = staticModels.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.provider.toLowerCase().includes(search.toLowerCase());
    const matchesFree = filter === 'All' || (filter === 'Free' ? m.free : !m.free);
    return matchesSearch && matchesFree;
  });

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-slate-300';
    if (rank === 3) return 'text-amber-600';
    return 'text-slate-500';
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/10 border-yellow-500/20';
    if (rank === 2) return 'bg-slate-500/10 border-slate-500/20';
    if (rank === 3) return 'bg-amber-700/10 border-amber-700/20';
    return 'bg-slate-800/50 border-slate-700/30';
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Trophy size={14} /> Powered by OpenRouter
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            AI Model <span className="text-gradient">Rankings</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Compare all major AI models across performance, context length, speed, and cost. Live data sourced from OpenRouter's API.
          </p>
          <a
            href="https://openrouter.ai/rankings"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            View Full Rankings on OpenRouter <ExternalLink size={14} />
          </a>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-xl p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('curated')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'curated' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Curated Top 12
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'live' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live OpenRouter API
            </button>
          </div>
        </div>

        {activeTab === 'curated' && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search models..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full glass rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                />
              </div>
              <div className="flex gap-2">
                {(['All', 'Free', 'Paid'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? 'bg-blue-600 text-white' : 'glass text-slate-400 hover:text-white'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Top 3 Podium */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[staticModels[1], staticModels[0], staticModels[2]].map((m, i) => {
                const positions = [2, 1, 3];
                const pos = positions[i];
                const heights = ['h-28', 'h-36', 'h-24'];
                const colors = ['from-slate-500 to-slate-400', 'from-yellow-500 to-yellow-300', 'from-amber-700 to-amber-500'];
                return (
                  <div key={m.id} className="flex flex-col items-center gap-3">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colors[i]} flex items-center justify-center text-white font-bold text-2xl font-display shadow-lg`}>
                      {pos}
                    </div>
                    <div className="glass rounded-2xl p-4 w-full text-center border border-blue-500/10">
                      <div className="text-white font-bold font-display text-sm">{m.name}</div>
                      <div className="text-slate-400 text-xs mt-1">{m.provider}</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-yellow-400 text-xs font-bold">{m.score}/100</span>
                      </div>
                      {m.free && <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">FREE</span>}
                    </div>
                    <div className={`w-full ${heights[i]} rounded-t-xl bg-gradient-to-t ${colors[i]} opacity-30`} />
                  </div>
                );
              })}
            </div>

            {/* Rankings Table */}
            <div className="space-y-3">
              {filtered.map((model) => (
                <div key={model.id} className={`glass glass-hover rounded-2xl border ${getRankBg(model.rank)} p-5`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Rank */}
                    <div className={`text-3xl font-black font-display w-12 flex-shrink-0 ${getRankColor(model.rank)}`}>
                      {model.rank <= 3 ? (model.rank === 1 ? '🥇' : model.rank === 2 ? '🥈' : '🥉') : `#${model.rank}`}
                    </div>

                    {/* Model info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-white font-bold font-display">{model.name}</span>
                        <span className="text-slate-500 text-sm">by {model.provider}</span>
                        {model.free && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-semibold">FREE</span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${badgeColors[model.badge] || 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                          {model.badge}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {model.strengths.map((s) => (
                          <span key={s} className="text-xs px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                            {s}
                          </span>
                        ))}
                        <span className="text-xs px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400">
                          {model.context} context
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        <TrendingUp size={14} className="text-blue-400" />
                        <span className="text-white font-bold font-display text-lg">{model.score}</span>
                        <span className="text-slate-500 text-sm">/100</span>
                      </div>
                      <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                          style={{ width: `${model.score}%` }}
                        />
                      </div>
                      <a
                        href={`https://openrouter.ai/${model.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                      >
                        OpenRouter <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'live' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Info size={14} />
                Live data from <a href="https://openrouter.ai/api/v1/models" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">openrouter.ai/api/v1/models</a>
              </div>
              <button
                onClick={fetchLiveModels}
                className="flex items-center gap-2 glass border border-blue-500/20 text-blue-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
              </button>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <RefreshCw size={32} className="text-blue-400 animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Loading live models from OpenRouter...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="glass rounded-2xl p-6 border border-yellow-500/20 mb-6">
                <div className="flex items-center gap-3 text-yellow-400 mb-2">
                  <Info size={18} /> <span className="font-semibold">Note</span>
                </div>
                <p className="text-slate-400 text-sm">{error}</p>
              </div>
            )}

            {!loading && liveModels.length > 0 && (
              <div className="space-y-3">
                {liveModels.map((model, i) => (
                  <div key={model.id} className="glass glass-hover rounded-xl border border-blue-500/10 p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="text-slate-500 font-bold font-display w-8 flex-shrink-0">#{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm truncate">{model.name || model.id}</div>
                        <div className="text-slate-500 text-xs truncate">{model.id}</div>
                        {model.description && (
                          <div className="text-slate-400 text-xs mt-1 line-clamp-1">{model.description}</div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {model.context_length && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            {(model.context_length / 1000).toFixed(0)}K ctx
                          </span>
                        )}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>Prompt: ${parseFloat(model.pricing?.prompt || '0') * 1000000}/M</span>
                        </div>
                      </div>
                      <a
                        href={`https://openrouter.ai/${model.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <Zap size={16} className="text-blue-400 hover:text-blue-300 transition-colors" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && liveModels.length === 0 && !error && (
              <div className="text-center py-20">
                <p className="text-slate-400">Click Refresh to load live models from OpenRouter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
