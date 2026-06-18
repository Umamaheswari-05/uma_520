import { ArrowRight, Heart, GraduationCap, Building2, Car, Leaf, ShoppingBag } from 'lucide-react';
import type { Page } from '../App';
import TopicAnimation, { type TopicKey } from '../components/TopicAnimation';

interface AIInRealLifeProps {
  navigate: (page: Page) => void;
}

const domains = [
  {
    icon: <GraduationCap size={28} />,
    title: 'AI in Education',
    color: 'from-blue-600 to-blue-400',
    bg: 'bg-blue-600/10',
    border: 'border-blue-500/30',
    image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=700',
    videoId: 'hJP5GqnTrNo',
    description: 'AI is personalizing learning for every student — adapting lessons to individual pace, providing instant feedback, and helping teachers identify struggling students before they fall behind.',
    examples: [
      { name: 'Khan Academy AI', desc: 'Personalized tutoring powered by GPT-4', link: 'https://khanacademy.org' },
      { name: 'Duolingo AI', desc: 'AI-powered language learning that adapts to you', link: 'https://duolingo.com' },
      { name: 'Coursera AI', desc: 'AI recommendations and course completion tools', link: 'https://coursera.org' },
    ],
    impact: '40% better learning outcomes with AI tutors',
  },
  {
    icon: <Heart size={28} />,
    title: 'AI in Healthcare',
    color: 'from-rose-600 to-rose-400',
    bg: 'bg-rose-600/10',
    border: 'border-rose-500/30',
    image: 'https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=700',
    videoId: 'vz9aLmxYJB0',
    description: 'AI is detecting diseases earlier, speeding up drug discovery, and assisting doctors with diagnosis. AI systems can analyze medical images with accuracy that rivals specialists.',
    examples: [
      { name: 'Google DeepMind', desc: 'AI that detects eye disease from scans', link: 'https://deepmind.google' },
      { name: 'IBM Watson Health', desc: 'Oncology treatment recommendations', link: 'https://ibm.com/watson' },
      { name: 'Ada Health', desc: 'AI symptom checker for patients', link: 'https://ada.com' },
    ],
    impact: 'AI detects breast cancer 11% more accurately than radiologists',
  },
  {
    icon: <Building2 size={28} />,
    title: 'AI in Business',
    color: 'from-cyan-600 to-cyan-400',
    bg: 'bg-cyan-600/10',
    border: 'border-cyan-500/30',
    image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=700',
    videoId: 'CqF1dKCNSPc',
    description: 'From automating customer support to predicting market trends, AI is transforming how businesses operate, compete, and serve their customers.',
    examples: [
      { name: 'Salesforce Einstein', desc: 'AI-driven CRM and sales predictions', link: 'https://salesforce.com' },
      { name: 'Intercom AI', desc: 'AI customer support chatbots', link: 'https://intercom.com' },
      { name: 'HubSpot AI', desc: 'Marketing automation with AI', link: 'https://hubspot.com' },
    ],
    impact: '$13 trillion added to the global economy by 2030',
  },
  {
    icon: <Car size={28} />,
    title: 'AI in Transportation',
    color: 'from-emerald-600 to-emerald-400',
    bg: 'bg-emerald-600/10',
    border: 'border-emerald-500/30',
    image: 'https://images.pexels.com/photos/1077519/pexels-photo-1077519.jpeg?auto=compress&cs=tinysrgb&w=700',
    videoId: 'tlThdr3O5Qo',
    description: 'Self-driving vehicles, traffic optimization, and route planning are transforming how the world moves. AI makes transportation safer, faster, and more efficient.',
    examples: [
      { name: 'Tesla Autopilot', desc: 'Neural network for autonomous driving', link: 'https://tesla.com' },
      { name: 'Waymo', desc: 'Fully autonomous taxi service by Google', link: 'https://waymo.com' },
      { name: 'Google Maps AI', desc: 'Real-time traffic prediction', link: 'https://maps.google.com' },
    ],
    impact: '94% of crashes caused by human error — AI can prevent most',
  },
  {
    icon: <Leaf size={28} />,
    title: 'AI in Environment',
    color: 'from-green-600 to-green-400',
    bg: 'bg-green-600/10',
    border: 'border-green-500/30',
    image: 'https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=700',
    videoId: 'ACmTDNkGzrw',
    description: 'AI is being deployed to fight climate change — optimizing energy grids, monitoring deforestation, predicting natural disasters, and accelerating clean energy research.',
    examples: [
      { name: 'DeepMind AI for Grid', desc: '40% reduction in cooling energy usage at Google', link: 'https://deepmind.google' },
      { name: 'Global Fishing Watch', desc: 'AI monitoring illegal fishing worldwide', link: 'https://globalfishingwatch.org' },
      { name: 'Microsoft AI for Earth', desc: 'AI tools for conservation projects', link: 'https://microsoft.com/ai/ai-for-earth' },
    ],
    impact: 'AI could cut global emissions by up to 4% by 2030',
  },
  {
    icon: <ShoppingBag size={28} />,
    title: 'AI in Retail',
    color: 'from-purple-600 to-purple-400',
    bg: 'bg-purple-600/10',
    border: 'border-purple-500/30',
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=700',
    videoId: 'JLXlyC3GNFQ',
    description: 'AI powers product recommendations, inventory forecasting, fraud detection, and personalized shopping experiences that keep customers coming back.',
    examples: [
      { name: 'Amazon Personalize', desc: 'Real-time personalized recommendations', link: 'https://aws.amazon.com' },
      { name: 'Shopify AI', desc: 'AI product descriptions and analytics', link: 'https://shopify.com' },
      { name: 'Stitch Fix AI', desc: 'AI personal styling service', link: 'https://stitchfix.com' },
    ],
    impact: '35% of Amazon\'s revenue from AI-powered recommendations',
  },
];

const domainTopicKeys: TopicKey[] = ['education', 'healthcare', 'business', 'transport', 'environment', 'retail'];

export default function AIInRealLife({ navigate }: AIInRealLifeProps) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            Applications
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            AI in <span className="text-gradient">Real Life</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            AI isn't just a technology — it's reshaping every industry, solving real problems, and creating new opportunities. Explore how AI is used in the world around you.
          </p>
        </div>

        {/* Domain sections */}
        <div className="space-y-24">
          {domains.map((domain, i) => (
            <div key={domain.title} className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              {/* Content */}
              <div>
                <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl ${domain.bg} border ${domain.border} mb-6`}>
                  <span className={`bg-gradient-to-r ${domain.color} bg-clip-text text-transparent`}>{domain.icon}</span>
                  <h2 className={`text-xl font-bold font-display bg-gradient-to-r ${domain.color} bg-clip-text text-transparent`}>{domain.title}</h2>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">{domain.description}</p>

                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${domain.bg} border ${domain.border} mb-8`}>
                  <span className="text-yellow-400">✦</span>
                  <span className="text-slate-300 text-sm font-medium">{domain.impact}</span>
                </div>

                <h3 className="text-white font-bold mb-4 font-display">Real Examples</h3>
                <div className="space-y-3">
                  {domain.examples.map((ex) => (
                    <a
                      key={ex.name}
                      href={ex.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-start gap-4 p-4 rounded-xl border ${domain.border} ${domain.bg} hover:opacity-90 transition-opacity group`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${domain.color} flex-shrink-0`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{ex.name}</span>
                          <ArrowRight size={12} className={`bg-gradient-to-r ${domain.color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                        </div>
                        <div className="text-slate-400 text-xs mt-0.5">{ex.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Animated Visual */}
              <TopicAnimation topicKey={domainTopicKeys[i]} className="sticky top-24" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold font-display text-white mb-4">Ready to Use AI in Your Own Work?</h2>
          <p className="text-slate-400 mb-8">Discover the free AI tools that students just like you are using right now.</p>
          <button
            onClick={() => navigate('tools')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Explore Free AI Tools <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
