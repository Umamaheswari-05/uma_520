import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, Bot, User, Trash2, Zap, Clock, BookOpen, AlertTriangle } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderMarkdown(text: string): JSX.Element {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-sm font-bold text-blue-400 mt-3 mb-1">{line.slice(4)}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-base font-bold text-blue-300 mt-4 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-lg font-bold text-blue-200 mt-5 mb-2">{line.slice(2)}</h1>);
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1 ml-1 my-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-slate-300">
              {item.replace(/\*\*(.*?)\*\*/g, (_: string, m: string) => `**${m}**`).split(/\*\*(.*?)\*\*/).map((part, pIdx) =>
                pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{part}</strong> : part
              )}
            </li>
          ))}
        </ul>
      );
      i--;
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal list-inside space-y-1 ml-1 my-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-slate-300">
              {item.split(/\*\*(.*?)\*\*/).map((part, pIdx) =>
                pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{part}</strong> : part
              )}
            </li>
          ))}
        </ol>
      );
      i--;
    } else if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="bg-slate-950 border border-slate-800 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono text-emerald-300">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-blue-500 pl-3 my-2 text-slate-400 italic">
          {line.slice(2)}
        </blockquote>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="my-1">
          {line.split(/\*\*(.*?)\*\*/).map((part, pIdx) =>
            pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{part}</strong> : part
          )}
        </p>
      );
    }
    i++;
  }
  return <>{elements}</>;
}

/* ─── Knowledge base fallback ─── */
const knowledgeBase: Record<string, string[]> = {
  aboutAI: [
    'AI (Artificial Intelligence) is the simulation of human intelligence by machines, especially computer systems.',
    'AI was founded as an academic discipline in 1956 at the Dartmouth Conference.',
    'Types: Narrow AI (specific tasks), General AI (human-like reasoning), Super AI (beyond human).',
    'Machine Learning is a subset of AI where systems learn from data without explicit programming.',
    'Deep Learning uses neural networks with many layers to model complex patterns.',
    'NLP allows computers to understand and generate human language.',
    'Computer Vision enables machines to interpret visual information.',
  ],
  tools: [
    'ChatGPT by OpenAI — general-purpose AI chatbot with free tier.',
    'Claude by Anthropic — great for writing and long documents.',
    'Perplexity AI — AI search engine with real-time citations.',
    'Google Gemini — multimodal AI (text, images, audio).',
    'Gamma.app — AI presentations and documents.',
    'Kaggle — free ML datasets and notebooks.',
    'Hugging Face — open-source models and datasets.',
    'GitHub Copilot — AI coding assistant.',
  ],
  concepts: [
    'Supervised Learning uses labeled data to train models.',
    'Unsupervised Learning finds hidden patterns in unlabeled data.',
    'Reinforcement Learning trains agents through trial and reward.',
    'Neural Networks are inspired by the structure of the human brain.',
    'CNNs are specialized for image processing.',
    'Transformers revolutionized NLP with attention mechanisms.',
    'GPT stands for Generative Pre-trained Transformer.',
    'LLMs are trained on vast text corpora.',
  ],
  realLife: [
    'AI in Healthcare: disease detection, drug discovery, personalized treatment, robotic surgery.',
    'AI in Education: personalized learning, adaptive testing, AI tutors, automated grading.',
    'AI in Business: data analytics, chatbots, fraud detection, market prediction.',
    'AI in Transportation: self-driving cars, traffic optimization, route planning.',
  ],
  careers: [
    'AI/ML Engineer — builds and deploys ML models.',
    'Data Scientist — analyzes data for insights.',
    'NLP Engineer — works with language models.',
    'Computer Vision Engineer — builds visual AI systems.',
    'Robotics Engineer — designs intelligent robots.',
  ],
  ranking: [
    'Top models: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1.',
    'Free models: Llama 3.1, Mistral, Gemma 2, Qwen 2.',
    'Model choice depends on reasoning, coding, creativity, or cost.',
  ],
  roadmap: [
    'Phase 1: Foundations — AI basics, history, neural networks.',
    'Phase 2: Python & Math — NumPy, Pandas, statistics.',
    'Phase 3: Machine Learning — supervised, unsupervised, clustering.',
    'Phase 4: Deep Learning — CNNs, RNNs, Transformers, PyTorch.',
    'Phase 5: Specialization — NLP, Computer Vision, Generative AI.',
  ],
  student: [
    'AI can help with essay writing, research, coding, math, and presentations.',
    'Always fact-check AI-generated content before submitting.',
    'Use AI as a learning tool, not a replacement for understanding.',
  ],
  general: [
    'I am an AI assistant on AI Awareness Hub, but currently my live AI connection needs an API key to answer questions about any topic like ChatGPT does.',
  ],
};

function kbAnswer(query: string): string | null {
  const q = query.toLowerCase().trim();
  const qWords = q.split(/\s+/).filter(w => w.length > 2);
  const allEntries = Object.values(knowledgeBase).flat();
  let best = { score: 0, entry: '' };
  for (const entry of allEntries) {
    const t = entry.toLowerCase();
    let s = 0;
    for (const w of qWords) if (t.includes(w)) s += w.length > 4 ? 2 : 1;
    if (s > best.score) best = { score: s, entry };
  }
  if (best.score >= 3) return best.entry;
  return null;
}

const suggestedQuestions = [
  'What is AI?',
  'What are free AI tools for students?',
  'How do I start learning AI?',
  'What AI jobs are available?',
  'What is Deep Learning?',
  'How is AI used in healthcare?',
  'Which AI model is best?',
  'What is NLP?',
];

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ai_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
      }
    } catch { /* ignore */ }
    return [
      {
        role: 'assistant',
        content: "Hello! I'm your AI assistant. Ask me anything — AI topics, coding, math, science, writing help, or general questions. I'll do my best to help!",
        timestamp: new Date(),
      },
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem('ai_chat_messages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: ChatMessage = { role: 'user', content: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowSuggestions(false);
    setError(null);

    try {
      const apiMessages = messages
        .slice(-10)
        .concat(userMsg)
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch(`${SUPABASE_URL}/functions/v1/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.warn('AI chat API error:', res.status, errData);
        const fallback = kbAnswer(text.trim());
        if (fallback) {
          const assistantMsg: ChatMessage = {
            role: 'assistant',
            content: fallback + "\n\n(I'm currently using my built-in knowledge base. For questions about any topic, an API key is needed to connect to a live AI model.)",
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, assistantMsg]);
        } else {
          setError('The live AI connection is currently unavailable. Please try again later or ask about AI topics I know well.');
        }
        setIsTyping(false);
        return;
      }

      const data = await res.json();
      const reply = data.reply ?? "I couldn't generate a response. Please try again.";
      const assistantMsg: ChatMessage = { role: 'assistant', content: reply, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.warn('AI chat fetch error:', err);
      const fallback = kbAnswer(text.trim());
      if (fallback) {
        const assistantMsg: ChatMessage = {
          role: 'assistant',
          content: fallback + "\n\n(I'm currently using my built-in knowledge base. For questions about any topic, an API key is needed to connect to a live AI model.)",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        setError(err.message || 'Failed to connect. Please check your connection and try again.');
      }
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared! I'm your AI assistant. Ask me anything.",
        timestamp: new Date(),
      },
    ]);
    setShowSuggestions(true);
    setError(null);
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-blue-900/30 bg-navy-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <MessageSquare size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display">AI Chat</h1>
            <p className="text-xs text-slate-400">Ask me anything — powered by AI</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded-full">
              <Zap size={10} className="text-yellow-400" /> Live AI
            </span>
            <button
              onClick={clearChat}
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Clear chat"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-400'
                  : 'bg-gradient-to-br from-emerald-500 to-blue-500'
              }`}>
                {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
              </div>
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-md'
                  : 'glass border border-blue-500/10 text-slate-200 rounded-bl-md'
              }`}>
                {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                <div className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-blue-200/60' : 'text-slate-500'}`}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div className="glass border border-blue-500/10 rounded-2xl rounded-bl-md px-5 py-3.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-slate-500 ml-2">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 pb-2">
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-xs text-red-300">
            <AlertTriangle size={14} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-200">Dismiss</button>
          </div>
        </div>
      )}

      {/* Suggested questions */}
      {showSuggestions && (
        <div className="max-w-4xl mx-auto px-4 pb-3">
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
            <Sparkles size={12} className="text-yellow-400" />
            <span>Suggested questions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-white hover:border-blue-500/30 hover:bg-blue-600/10 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-blue-900/30 bg-navy-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask me anything..."
                rows={1}
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-2xl px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 resize-none max-h-32"
                style={{ minHeight: 44 }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 bottom-2 p-2 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-600">
            <span className="flex items-center gap-1">
              <BookOpen size={10} /> Powered by OpenRouter AI
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} /> Responses may take a few seconds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
