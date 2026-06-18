import { CheckCircle2, Circle, ArrowRight, BookOpen, Code, Brain, Zap, ExternalLink } from 'lucide-react';
import type { Page } from '../App';

interface LearnRoadmapProps {
  navigate: (page: Page) => void;
}

const roadmap = [
  {
    phase: '01',
    title: 'AI Foundations',
    duration: '2–4 weeks',
    color: 'from-blue-600 to-blue-400',
    bg: 'bg-blue-600/10',
    border: 'border-blue-500/30',
    icon: <BookOpen size={20} />,
    topics: [
      { name: 'What is AI, ML, and Deep Learning?', done: false },
      { name: 'Types of AI (Narrow, General, Super)', done: false },
      { name: 'History and timeline of AI', done: false },
      { name: 'How neural networks work (basics)', done: false },
    ],
    resources: [
      { name: 'AI for Everyone — Andrew Ng', url: 'https://coursera.org/learn/ai-for-everyone', type: 'Course' },
      { name: 'Elements of AI', url: 'https://elementsofai.com', type: 'Course' },
      { name: 'YouTube: 3Blue1Brown Neural Networks', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', type: 'Video' },
    ],
    image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    phase: '02',
    title: 'Python & Math for AI',
    duration: '4–6 weeks',
    color: 'from-cyan-600 to-cyan-400',
    bg: 'bg-cyan-600/10',
    border: 'border-cyan-500/30',
    icon: <Code size={20} />,
    topics: [
      { name: 'Python basics (variables, loops, functions)', done: false },
      { name: 'NumPy, Pandas for data manipulation', done: false },
      { name: 'Linear Algebra fundamentals', done: false },
      { name: 'Statistics & Probability basics', done: false },
    ],
    resources: [
      { name: 'Python for Everybody — Dr. Chuck', url: 'https://py4e.com', type: 'Course' },
      { name: 'Khan Academy Linear Algebra', url: 'https://khanacademy.org/math/linear-algebra', type: 'Course' },
      { name: 'Fast.ai Practical Deep Learning', url: 'https://fast.ai', type: 'Course' },
    ],
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    phase: '03',
    title: 'Machine Learning',
    duration: '6–8 weeks',
    color: 'from-emerald-600 to-emerald-400',
    bg: 'bg-emerald-600/10',
    border: 'border-emerald-500/30',
    icon: <Brain size={20} />,
    topics: [
      { name: 'Supervised vs Unsupervised Learning', done: false },
      { name: 'Regression, Classification, Clustering', done: false },
      { name: 'Scikit-learn library in Python', done: false },
      { name: 'Model evaluation and overfitting', done: false },
    ],
    resources: [
      { name: 'Machine Learning Specialization — Coursera', url: 'https://coursera.org/specializations/machine-learning-introduction', type: 'Course' },
      { name: 'Kaggle Learn: ML Intro', url: 'https://kaggle.com/learn', type: 'Free' },
      { name: 'Hands-on ML with Scikit-Learn (Book)', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/', type: 'Book' },
    ],
    image: 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    phase: '04',
    title: 'Deep Learning',
    duration: '8–10 weeks',
    color: 'from-rose-600 to-rose-400',
    bg: 'bg-rose-600/10',
    border: 'border-rose-500/30',
    icon: <Brain size={20} />,
    topics: [
      { name: 'Neural network architecture deep dive', done: false },
      { name: 'CNNs for image processing', done: false },
      { name: 'RNNs, LSTMs for sequential data', done: false },
      { name: 'Transformers & attention mechanism', done: false },
    ],
    resources: [
      { name: 'Deep Learning Specialization — deeplearning.ai', url: 'https://deeplearning.ai', type: 'Course' },
      { name: '3Blue1Brown: Neural Networks', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', type: 'Video' },
      { name: 'PyTorch Tutorials (Official)', url: 'https://pytorch.org/tutorials', type: 'Docs' },
    ],
    image: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    phase: '05',
    title: 'Specialization & Projects',
    duration: '10+ weeks',
    color: 'from-yellow-600 to-yellow-400',
    bg: 'bg-yellow-600/10',
    border: 'border-yellow-500/30',
    icon: <Zap size={20} />,
    topics: [
      { name: 'Pick a domain: NLP / CV / Generative AI', done: false },
      { name: 'Build 3–5 real-world projects', done: false },
      { name: 'Publish on GitHub and Kaggle', done: false },
      { name: 'Contribute to open-source AI projects', done: false },
    ],
    resources: [
      { name: 'Hugging Face Courses', url: 'https://huggingface.co/learn', type: 'Free' },
      { name: 'Kaggle Competitions', url: 'https://kaggle.com/competitions', type: 'Practice' },
      { name: 'Papers With Code', url: 'https://paperswithcode.com', type: 'Research' },
    ],
    image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
];

const typeColors: Record<string, string> = {
  Course: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  Free: 'bg-green-500/10 border-green-500/20 text-green-400',
  Video: 'bg-red-500/10 border-red-500/20 text-red-400',
  Book: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  Docs: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  Practice: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  Research: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
};

export default function LearnRoadmap({ navigate }: LearnRoadmapProps) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <BookOpen size={14} /> Step-by-step Learning Path
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            AI Learning <span className="text-gradient">Roadmap</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A structured path from complete beginner to AI practitioner. Follow each phase in order and you'll have the skills for a career in AI.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <CheckCircle2 size={14} className="text-green-400" /> Self-paced
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <CheckCircle2 size={14} className="text-green-400" /> Mostly free resources
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <CheckCircle2 size={14} className="text-green-400" /> 6–12 months total
            </div>
          </div>
        </div>

        {/* Roadmap phases */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-500 via-emerald-500 via-rose-500 to-yellow-500" />

          <div className="space-y-12">
            {roadmap.map((phase) => (
              <div key={phase.phase} className="relative pl-16 md:pl-24">
                {/* Phase circle */}
                <div className={`absolute left-2 md:left-5 top-4 w-9 h-9 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold font-display text-sm shadow-lg z-10`}>
                  {phase.phase}
                </div>

                <div className={`glass rounded-2xl border ${phase.border} overflow-hidden`}>
                  {/* Image header */}
                  <div className="relative h-32 md:h-40">
                    <img src={phase.image} alt={phase.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                      <div>
                        <div className={`inline-flex items-center gap-2 text-sm font-bold font-display bg-gradient-to-r ${phase.color} bg-clip-text text-transparent mb-1`}>
                          {phase.icon} Phase {phase.phase}
                        </div>
                        <h2 className="text-white text-2xl font-bold font-display">{phase.title}</h2>
                      </div>
                      <div className={`px-3 py-1.5 rounded-xl ${phase.bg} border ${phase.border} text-xs text-slate-300 font-medium flex-shrink-0`}>
                        {phase.duration}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    {/* Topics */}
                    <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <span className={`w-1.5 h-4 rounded-full bg-gradient-to-b ${phase.color}`} /> What You'll Learn
                      </h3>
                      <ul className="space-y-2">
                        {phase.topics.map((topic) => (
                          <li key={topic.name} className="flex items-start gap-3 text-sm text-slate-300">
                            <Circle size={14} className="text-slate-600 flex-shrink-0 mt-0.5" />
                            {topic.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Resources */}
                    <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <span className={`w-1.5 h-4 rounded-full bg-gradient-to-b ${phase.color}`} /> Resources
                      </h3>
                      <ul className="space-y-2">
                        {phase.resources.map((res) => (
                          <li key={res.name}>
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors group"
                            >
                              <span className={`text-xs px-1.5 py-0.5 rounded border font-semibold flex-shrink-0 ${typeColors[res.type] || 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                                {res.type}
                              </span>
                              <span className="truncate group-hover:text-blue-400 transition-colors">{res.name}</span>
                              <ExternalLink size={10} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion CTA */}
        <div className="mt-20 glass rounded-3xl p-10 border border-yellow-500/20 text-center">
          <div className="text-5xl mb-4">🎓</div>
          <h2 className="text-3xl font-bold font-display text-white mb-4">Completed the Roadmap?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Explore AI career paths and see what salaries and roles are available for people with your new skills.
          </p>
          <button
            onClick={() => navigate('careers')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Explore AI Careers <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
