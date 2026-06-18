import { ArrowRight, Clock, BookOpen, Lightbulb, Target } from 'lucide-react';
import type { Page } from '../App';
import TopicAnimation from '../components/TopicAnimation';

interface AboutAIProps {
  navigate: (page: Page) => void;
}

const timeline = [
  { year: '1950', event: 'Alan Turing proposes the Turing Test', color: 'bg-blue-500' },
  { year: '1956', event: 'The term "Artificial Intelligence" coined at Dartmouth Conference', color: 'bg-cyan-500' },
  { year: '1997', event: 'IBM Deep Blue defeats world chess champion Garry Kasparov', color: 'bg-blue-500' },
  { year: '2011', event: 'IBM Watson wins Jeopardy! against human champions', color: 'bg-cyan-500' },
  { year: '2016', event: 'AlphaGo defeats world Go champion Lee Sedol', color: 'bg-blue-500' },
  { year: '2022', event: 'ChatGPT launches, reaching 100M users in 2 months', color: 'bg-cyan-500' },
  { year: '2024', event: 'AI becomes mainstream — multimodal models, AI agents emerge', color: 'bg-blue-500' },
];

const aiTypes = [
  {
    type: 'Narrow AI (ANI)',
    desc: 'AI designed for a specific task. Most AI today falls into this category — voice assistants, recommendation systems, spam filters.',
    examples: ['Siri / Alexa', 'Netflix recommendations', 'Image recognition'],
    icon: <Target size={20} />,
    color: 'border-blue-500/40 bg-blue-600/10',
    iconColor: 'text-blue-400',
  },
  {
    type: 'General AI (AGI)',
    desc: 'Hypothetical AI with human-level intelligence across all domains. Can reason, learn, and solve problems like a human.',
    examples: ['Not yet achieved', 'Active research area', 'GPT-4 is a step toward this'],
    icon: <Lightbulb size={20} />,
    color: 'border-cyan-500/40 bg-cyan-600/10',
    iconColor: 'text-cyan-400',
  },
  {
    type: 'Super AI (ASI)',
    desc: 'AI that surpasses human intelligence in every field. A theoretical concept that is the subject of much debate.',
    examples: ['Hypothetical', 'Sci-fi territory', 'Future concern'],
    icon: <BookOpen size={20} />,
    color: 'border-purple-500/40 bg-purple-600/10',
    iconColor: 'text-purple-400',
  },
];

const videos = [
  {
    title: 'What is Artificial Intelligence? (Beginner)',
    channel: 'CrashCourse',
    duration: '12 min',
    embedId: 'ad79nYk2keg',
  },
  {
    title: 'How Does AI Work? — Explained Simply',
    channel: 'Fireship',
    duration: '8 min',
    embedId: 'JMUxmLyrhSk',
  },
];

export default function AboutAI({ navigate }: AboutAIProps) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <BookOpen size={14} /> Foundation
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            About <span className="text-gradient">Artificial Intelligence</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Artificial Intelligence is the simulation of human intelligence processes by machines. From understanding language to recognizing images — AI is transforming every field.
          </p>
        </div>

        {/* What is AI */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold font-display text-white mb-6">
              What is <span className="text-gradient">Artificial Intelligence?</span>
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Artificial Intelligence (AI) refers to the ability of a machine or computer program to perform tasks that would typically require human intelligence — such as understanding language, recognizing patterns, making decisions, and solving problems.
              </p>
              <p>
                AI systems learn from data. The more data they are trained on, the smarter and more accurate they become. This is why services like Google, Netflix, and Spotify seem to "know" what you want.
              </p>
              <p>
                AI is not magic — it's mathematics, statistics, and computer science working together to create systems that can perceive, learn, reason, and act.
              </p>
            </div>
            <button
              onClick={() => navigate('concepts')}
              className="mt-8 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Explore AI Concepts <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-600/15 rounded-3xl blur-2xl pointer-events-none" />
            <TopicAnimation topicKey="genai" className="relative shadow-2xl" />
          </div>
        </div>

        {/* Types of AI */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold font-display text-white text-center mb-12">
            Types of <span className="text-gradient">AI</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {aiTypes.map((ai) => (
              <div key={ai.type} className={`rounded-2xl border p-6 ${ai.color}`}>
                <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center mb-4 ${ai.iconColor}`}>
                  {ai.icon}
                </div>
                <h3 className="text-white font-bold text-xl font-display mb-3">{ai.type}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{ai.desc}</p>
                <ul className="space-y-1">
                  {ai.examples.map((ex) => (
                    <li key={ex} className="text-xs text-slate-500 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${ai.iconColor.replace('text-', 'bg-')}`} />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* History Timeline */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold font-display text-white text-center mb-12">
            History of <span className="text-gradient">AI</span>
          </h2>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 md:-translate-x-0.5" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={item.year} className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-16 md:pl-0`}>
                    <div className="glass rounded-xl p-4 inline-block text-left">
                      <div className={`text-sm font-bold font-display bg-gradient-to-r ${i % 2 === 0 ? 'from-blue-400 to-cyan-400' : 'from-cyan-400 to-blue-400'} bg-clip-text text-transparent mb-1`}>
                        {item.year}
                      </div>
                      <div className="text-slate-300 text-sm">{item.event}</div>
                    </div>
                  </div>
                  <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full ${item.color} border-2 border-navy-950 z-10`} />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animations */}
        <div>
          <h2 className="text-3xl font-bold font-display text-white text-center mb-12">
            Learn by <span className="text-gradient">Exploring</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((v, i) => (
              <div key={v.title} className="glass rounded-2xl overflow-hidden border border-blue-500/10">
                <TopicAnimation topicKey={i === 0 ? 'ml' : 'dl'} className="rounded-none border-0" />
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-1">{v.title}</h3>
                  <div className="flex items-center gap-3 text-slate-500 text-xs">
                    <span>{v.channel}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {v.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
