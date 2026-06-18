import { useState } from 'react';
import { Trophy, RotateCcw, CheckCircle2, XCircle, ChevronRight, Brain } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const questions: Question[] = [
  {
    question: 'What does "AI" stand for?',
    options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Integration', 'Analog Input'],
    correct: 1,
    explanation: 'AI stands for Artificial Intelligence — the simulation of human intelligence by machines.',
    difficulty: 'Easy',
  },
  {
    question: 'Which of these is NOT a type of Machine Learning?',
    options: ['Supervised Learning', 'Reinforcement Learning', 'Predictive Learning', 'Unsupervised Learning'],
    correct: 2,
    explanation: 'The three main types of ML are Supervised, Unsupervised, and Reinforcement Learning. "Predictive Learning" is not a standard category.',
    difficulty: 'Easy',
  },
  {
    question: 'Which company created ChatGPT?',
    options: ['Google', 'Meta', 'OpenAI', 'Microsoft'],
    correct: 2,
    explanation: 'ChatGPT was created by OpenAI, though Microsoft is a major investor and has integrated it into their products.',
    difficulty: 'Easy',
  },
  {
    question: 'What is a "neural network" modeled after?',
    options: ['Computer circuits', 'The human brain', 'Internet infrastructure', 'Decision trees'],
    correct: 1,
    explanation: 'Neural networks are loosely inspired by the biological neural networks in the human brain, consisting of interconnected "neurons".',
    difficulty: 'Easy',
  },
  {
    question: 'What does NLP stand for in AI?',
    options: ['Network Layer Protocol', 'Natural Language Processing', 'Neural Learning Program', 'Numeric Logic Processing'],
    correct: 1,
    explanation: 'NLP stands for Natural Language Processing — the AI technology that enables machines to understand and generate human language.',
    difficulty: 'Easy',
  },
  {
    question: 'Which AI model architecture powers most modern chatbots like ChatGPT?',
    options: ['CNN (Convolutional Neural Network)', 'RNN (Recurrent Neural Network)', 'Transformer', 'Decision Tree'],
    correct: 2,
    explanation: 'The Transformer architecture, introduced in the 2017 paper "Attention is All You Need", powers modern LLMs like GPT and Claude.',
    difficulty: 'Medium',
  },
  {
    question: 'What does "LLM" stand for?',
    options: ['Large Language Model', 'Layered Logic Machine', 'Linear Learning Method', 'Linked List Module'],
    correct: 0,
    explanation: 'LLM stands for Large Language Model — AI models trained on massive text datasets to understand and generate language.',
    difficulty: 'Medium',
  },
  {
    question: 'Which technique helps prevent a neural network from memorizing training data too closely?',
    options: ['Backpropagation', 'Dropout', 'Activation functions', 'Batch normalization'],
    correct: 1,
    explanation: 'Dropout is a regularization technique that randomly disables neurons during training to prevent overfitting.',
    difficulty: 'Medium',
  },
  {
    question: 'What is "hallucination" in the context of AI?',
    options: ['When AI sees images', 'When AI generates false information confidently', 'Visual glitches in AI art', 'AI experiencing training loops'],
    correct: 1,
    explanation: 'AI hallucination refers to when a language model generates plausible-sounding but factually incorrect or made-up information.',
    difficulty: 'Medium',
  },
  {
    question: 'What is the primary purpose of the "attention mechanism" in Transformers?',
    options: ['Speed up computation', 'Focus on relevant parts of the input when generating output', 'Reduce model size', 'Prevent gradient vanishing'],
    correct: 1,
    explanation: 'The attention mechanism allows the model to weigh the importance of different parts of the input when making predictions, capturing long-range dependencies.',
    difficulty: 'Hard',
  },
];

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-500/10 border-green-500/20 text-green-400',
  Medium: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  Hard: 'bg-red-500/10 border-red-500/20 text-red-400',
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers(Array(questions.length).fill(null));
    setFinished(false);
    setShowExplanation(false);
  };

  const percentage = Math.round((score / questions.length) * 100);
  const getResultMessage = () => {
    if (percentage >= 90) return { text: 'AI Expert!', emoji: '🏆', color: 'text-yellow-400' };
    if (percentage >= 70) return { text: 'AI Enthusiast!', emoji: '🎉', color: 'text-blue-400' };
    if (percentage >= 50) return { text: 'Good Start!', emoji: '👍', color: 'text-cyan-400' };
    return { text: 'Keep Learning!', emoji: '📚', color: 'text-slate-400' };
  };

  if (finished) {
    const result = getResultMessage();
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="glass rounded-3xl p-12 border border-blue-500/20">
            <div className="text-7xl mb-4">{result.emoji}</div>
            <h1 className={`text-4xl font-bold font-display mb-2 ${result.color}`}>{result.text}</h1>
            <p className="text-slate-400 mb-8">You scored {score} out of {questions.length} questions correctly.</p>

            <div className="relative w-36 h-36 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="url(#grad)" strokeWidth="3"
                  strokeDasharray={`${percentage} ${100 - percentage}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-3xl font-bold font-display text-white">{percentage}%</div>
                  <div className="text-xs text-slate-400">Score</div>
                </div>
              </div>
            </div>

            {/* Per-question review */}
            <div className="text-left space-y-2 mb-8">
              {questions.map((q, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${answers[i] === q.correct ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                  {answers[i] === q.correct
                    ? <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                    : <XCircle size={16} className="text-red-400 flex-shrink-0" />
                  }
                  <span className="text-sm text-slate-300 line-clamp-1">{q.question}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              <RotateCcw size={16} /> Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <Brain size={14} /> AI Knowledge Quiz
          </div>
          <h1 className="text-4xl font-bold font-display text-white mb-2">
            Test Your <span className="text-gradient">AI Knowledge</span>
          </h1>
          <p className="text-slate-400 text-sm">10 questions from beginner to advanced</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Question {current + 1} of {questions.length}</span>
            <span>Score: {score}/{current}</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${((current) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass rounded-2xl border border-blue-500/15 p-8">
          <div className="flex items-center justify-between mb-6">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${difficultyColors[q.difficulty]}`}>
              {q.difficulty}
            </span>
            <span className="text-slate-500 text-sm">#{current + 1}</span>
          </div>

          <h2 className="text-xl font-bold font-display text-white mb-8 leading-relaxed">{q.question}</h2>

          <div className="space-y-3 mb-6">
            {q.options.map((option, idx) => {
              let style = 'glass border-blue-500/10 text-slate-300 hover:border-blue-500/30 hover:text-white cursor-pointer';
              if (selected !== null) {
                if (idx === q.correct) style = 'bg-green-500/15 border-green-500/40 text-green-300';
                else if (idx === selected && idx !== q.correct) style = 'bg-red-500/15 border-red-500/40 text-red-300';
                else style = 'glass border-blue-500/5 text-slate-500 cursor-default';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${selected !== null && idx === q.correct ? 'border-green-400 bg-green-400/20 text-green-400' : selected !== null && idx === selected ? 'border-red-400 bg-red-400/20 text-red-400' : 'border-slate-600 text-slate-500'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm">{option}</span>
                    {selected !== null && idx === q.correct && <CheckCircle2 size={16} className="text-green-400 ml-auto flex-shrink-0" />}
                    {selected !== null && idx === selected && idx !== q.correct && <XCircle size={16} className="text-red-400 ml-auto flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`rounded-xl p-4 mb-6 border ${selected === q.correct ? 'bg-green-500/10 border-green-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
              <div className="flex items-start gap-2">
                <Brain size={14} className={`flex-shrink-0 mt-0.5 ${selected === q.correct ? 'text-green-400' : 'text-blue-400'}`} />
                <p className="text-sm text-slate-300">{q.explanation}</p>
              </div>
            </div>
          )}

          {selected !== null && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 w-full justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              {current + 1 >= questions.length ? (
                <><Trophy size={16} /> View Results</>
              ) : (
                <>Next Question <ChevronRight size={16} /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
