import { Brain, Eye, MessageSquare, BarChart2, Network, ExternalLink } from 'lucide-react';
import type { Page } from '../App';
import TopicAnimation, { type TopicKey } from '../components/TopicAnimation';

interface AIConceptsProps {
  navigate: (page: Page) => void;
}

const concepts = [
  {
    id: 'ml',
    icon: <BarChart2 size={24} />,
    title: 'Machine Learning',
    subtitle: 'Teaching machines from data',
    color: 'from-blue-600 to-blue-400',
    borderColor: 'border-blue-500/30',
    bg: 'bg-blue-600/10',
    description: 'Machine Learning is a subset of AI where algorithms learn patterns from data without being explicitly programmed. Instead of following fixed rules, ML models discover patterns and make predictions.',
    keyPoints: [
      'Supervised Learning — labeled training data',
      'Unsupervised Learning — finding hidden patterns',
      'Reinforcement Learning — learning by reward/punishment',
      'Transfer Learning — applying knowledge across domains',
    ],
    videoId: 'ukzFI9rgwfU',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    learnMore: 'https://ml-course.andrew.ng',
  },
  {
    id: 'dl',
    icon: <Network size={24} />,
    title: 'Deep Learning',
    subtitle: 'Neural networks inspired by the brain',
    color: 'from-cyan-600 to-cyan-400',
    borderColor: 'border-cyan-500/30',
    bg: 'bg-cyan-600/10',
    description: 'Deep Learning uses multi-layered neural networks to learn representations from data. It powers most modern AI breakthroughs — image recognition, speech synthesis, language models, and more.',
    keyPoints: [
      'Neural networks with many layers',
      'Convolutional Neural Nets (CNNs) for images',
      'Recurrent Neural Nets (RNNs) for sequences',
      'Transformers — the basis of ChatGPT',
    ],
    videoId: 'aircAruvnKk',
    image: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=600',
    learnMore: 'https://www.deeplearning.ai',
  },
  {
    id: 'nlp',
    icon: <MessageSquare size={24} />,
    title: 'Natural Language Processing',
    subtitle: 'AI that understands human language',
    color: 'from-emerald-600 to-emerald-400',
    borderColor: 'border-emerald-500/30',
    bg: 'bg-emerald-600/10',
    description: 'NLP enables computers to understand, interpret, and generate human language. It powers chatbots, translation tools, sentiment analysis, and large language models like GPT and Claude.',
    keyPoints: [
      'Tokenization — breaking text into parts',
      'Sentiment Analysis — detecting emotions in text',
      'Machine Translation (Google Translate)',
      'Large Language Models (GPT-4, Claude, Gemini)',
    ],
    videoId: 'CMrHM8a3hqw',
    image: 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=600',
    learnMore: 'https://huggingface.co/learn',
  },
  {
    id: 'cv',
    icon: <Eye size={24} />,
    title: 'Computer Vision',
    subtitle: 'AI that sees and interprets images',
    color: 'from-rose-600 to-rose-400',
    borderColor: 'border-rose-500/30',
    bg: 'bg-rose-600/10',
    description: 'Computer Vision gives AI the ability to understand visual information from the world — images, video, and real-time camera feeds. Used in self-driving cars, medical imaging, and facial recognition.',
    keyPoints: [
      'Object detection & recognition',
      'Facial recognition systems',
      'Medical image analysis',
      'Augmented Reality (AR) applications',
    ],
    videoId: 'OcycT1Jwsns',
    image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=600',
    learnMore: 'https://opencv.org',
  },
  {
    id: 'genai',
    icon: <Brain size={24} />,
    title: 'Generative AI',
    subtitle: 'AI that creates text, images, and more',
    color: 'from-yellow-600 to-yellow-400',
    borderColor: 'border-yellow-500/30',
    bg: 'bg-yellow-600/10',
    description: 'Generative AI models can produce new content — text, images, code, audio, and video. Models like GPT-4, DALL-E, Stable Diffusion, and Sora fall into this category.',
    keyPoints: [
      'Large Language Models (LLMs)',
      'Image generation (DALL-E, Midjourney)',
      'Code generation (GitHub Copilot)',
      'Video generation (Sora, Runway)',
    ],
    videoId: '2IK3DFHRFfw',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
    learnMore: 'https://openai.com',
  },
];

export default function AIConcepts({ navigate: _navigate }: AIConceptsProps) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Brain size={14} /> Core Concepts
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            AI <span className="text-gradient">Concepts</span> Explained
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Master the building blocks of AI — from machine learning fundamentals to cutting-edge generative models. Each concept is explained with videos, visuals, and real examples.
          </p>
        </div>

        {/* Concepts List */}
        <div className="space-y-16">
          {concepts.map((c, i) => (
            <div key={c.id} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              {/* Text */}
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${c.bg} border ${c.borderColor} mb-4`}>
                  <span className={`bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                    {c.icon}
                  </span>
                  <span className={`text-sm font-semibold bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                    {c.subtitle}
                  </span>
                </div>
                <h2 className="text-3xl font-bold font-display text-white mb-4">{c.title}</h2>
                <p className="text-slate-400 leading-relaxed mb-6">{c.description}</p>
                <ul className="space-y-2 mb-6">
                  {c.keyPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${c.color} flex-shrink-0`} />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={c.learnMore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${c.color} text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm`}
                >
                  Learn More <ExternalLink size={14} />
                </a>
              </div>

              {/* Animated Visual */}
              <TopicAnimation topicKey={c.id as TopicKey} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
