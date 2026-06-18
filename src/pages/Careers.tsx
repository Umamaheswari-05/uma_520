import { TrendingUp, ExternalLink, MapPin, DollarSign, Users } from 'lucide-react';
import TopicAnimation, { type TopicKey } from '../components/TopicAnimation';

const careerTopicKeys: TopicKey[] = ['career-ml','career-ds','career-research','career-nlp','career-pm','career-cv'];

const careers = [
  {
    title: 'Machine Learning Engineer',
    demand: 'Very High',
    salary: '$120K – $200K',
    remoteFriendly: true,
    skills: ['Python', 'TensorFlow/PyTorch', 'MLOps', 'Cloud (AWS/GCP)', 'Statistics'],
    description: 'Build and deploy ML models at scale. Work with data scientists to bring models from prototype to production.',
    color: 'from-blue-600 to-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-600/10',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=500',
    videoId: 'LBW6b0ODcFw',
    links: [
      { name: 'ML Engineer Roadmap', url: 'https://roadmap.sh/mlops' },
      { name: 'Find Jobs on LinkedIn', url: 'https://linkedin.com/jobs' },
    ],
  },
  {
    title: 'Data Scientist',
    demand: 'High',
    salary: '$95K – $170K',
    remoteFriendly: true,
    skills: ['Python/R', 'Statistics', 'Data Visualization', 'SQL', 'Machine Learning'],
    description: 'Analyze complex data to uncover insights and build predictive models that drive business decisions.',
    color: 'from-cyan-600 to-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-600/10',
    image: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=500',
    videoId: 'X3paOmcrTjQ',
    links: [
      { name: 'Data Science Courses — Kaggle', url: 'https://kaggle.com/learn' },
      { name: 'DS Jobs on Indeed', url: 'https://indeed.com' },
    ],
  },
  {
    title: 'AI Research Scientist',
    demand: 'High',
    salary: '$140K – $300K+',
    remoteFriendly: false,
    skills: ['Deep Learning', 'Published research', 'Mathematics', 'Python', 'Paper writing'],
    description: 'Push the boundaries of AI at top labs (OpenAI, DeepMind, Google Brain) or universities. Usually requires a PhD.',
    color: 'from-purple-600 to-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-600/10',
    image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=500',
    videoId: 'W1gLQ6FoEkk',
    links: [
      { name: 'Papers With Code', url: 'https://paperswithcode.com' },
      { name: 'ArXiv AI Papers', url: 'https://arxiv.org/list/cs.AI/recent' },
    ],
  },
  {
    title: 'NLP Engineer',
    demand: 'Very High',
    salary: '$110K – $190K',
    remoteFriendly: true,
    skills: ['Transformers', 'Hugging Face', 'Python', 'LLM fine-tuning', 'Text processing'],
    description: 'Build language AI systems — chatbots, translation tools, text classifiers, and LLM-powered applications.',
    color: 'from-emerald-600 to-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-600/10',
    image: 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=500',
    videoId: 'CMrHM8a3hqw',
    links: [
      { name: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course' },
      { name: 'NLP Engineer Jobs', url: 'https://linkedin.com/jobs' },
    ],
  },
  {
    title: 'AI Product Manager',
    demand: 'Growing',
    salary: '$100K – $180K',
    remoteFriendly: true,
    skills: ['Product strategy', 'AI literacy', 'User research', 'Roadmapping', 'Communication'],
    description: 'Bridge the gap between technical AI teams and business goals. Define AI product vision and roadmap.',
    color: 'from-rose-600 to-rose-400',
    border: 'border-rose-500/30',
    bg: 'bg-rose-600/10',
    image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=500',
    videoId: 'v3wLi1IDwFY',
    links: [
      { name: 'AI PM Course — Reforge', url: 'https://reforge.com' },
      { name: 'Product Manager Jobs', url: 'https://productboard.com/blog/ai-product-manager' },
    ],
  },
  {
    title: 'Computer Vision Engineer',
    demand: 'High',
    salary: '$115K – $185K',
    remoteFriendly: true,
    skills: ['OpenCV', 'CNNs', 'YOLO', 'Python', 'Edge AI deployment'],
    description: 'Build systems that understand visual data — from facial recognition to medical imaging to autonomous vehicles.',
    color: 'from-yellow-600 to-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-600/10',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500',
    videoId: 'OcycT1Jwsns',
    links: [
      { name: 'OpenCV Course', url: 'https://opencv.org/university' },
      { name: 'CV Jobs on Indeed', url: 'https://indeed.com' },
    ],
  },
];

const demandColors: Record<string, string> = {
  'Very High': 'bg-green-500/10 border-green-500/20 text-green-400',
  'High': 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  'Growing': 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
};

export default function Careers() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <TrendingUp size={14} /> AI Career Paths
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            Build Your <span className="text-gradient">AI Career</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            AI is one of the fastest-growing fields in the world. Explore career paths, salaries, required skills, and how to get started in each role.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { icon: <TrendingUp size={20} className="text-blue-400" />, value: '97M+', label: 'New AI jobs by 2025' },
            { icon: <DollarSign size={20} className="text-green-400" />, value: '$126K', label: 'Avg AI engineer salary' },
            { icon: <Users size={20} className="text-cyan-400" />, value: '74%', label: 'Companies hiring AI talent' },
            { icon: <MapPin size={20} className="text-rose-400" />, value: '60%', label: 'AI roles are remote' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-5 text-center border border-blue-500/10">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white font-display">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Career Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {careers.map((career, ci) => (
            <div key={career.title} className={`glass rounded-2xl border ${career.border} overflow-hidden`}>
              {/* Image */}
              <div className="relative h-36">
                <img src={career.image} alt={career.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <h2 className="text-white font-bold text-lg font-display">{career.title}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${demandColors[career.demand]}`}>
                    {career.demand}
                  </span>
                </div>
              </div>

              <div className="p-5">
                {/* Salary + remote */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-green-400 text-sm font-semibold">
                    <DollarSign size={14} /> {career.salary}
                  </div>
                  {career.remoteFriendly && (
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-medium px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      <MapPin size={10} /> Remote Friendly
                    </div>
                  )}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">{career.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {career.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Topic Animation */}
                <TopicAnimation topicKey={careerTopicKeys[ci]} className="mb-4" />

                {/* Links */}
                <div className="flex gap-2">
                  {career.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 text-center text-xs font-semibold py-2 rounded-xl bg-gradient-to-r ${career.color} text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1`}
                    >
                      {link.name} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
