import { useState } from 'react';
import { Mail, Send, MessageSquare, User, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const faqs = [
    { q: 'Is everything on this site free?', a: 'Yes! All content, videos, and resources on AI Awareness Hub are free. The AI tools we recommend all have free tiers for students.' },
    { q: 'Do I need a programming background to learn AI?', a: 'Not at all for the basics. Start with our AI Foundations module and Learn Roadmap, which begins from zero. Programming helps later but is not required to understand AI concepts.' },
    { q: 'How long does it take to learn AI?', a: 'To understand AI concepts: a few weeks. To build basic models: 3–6 months. To be job-ready: 6–18 months with consistent practice.' },
    { q: 'How is the AI Ranking data sourced?', a: 'Our curated rankings are based on benchmark scores and community reviews. The Live tab fetches real-time model data from OpenRouter\'s public API.' },
  ];

  if (submitted) {
    return (
      <div className="pt-24 pb-20 flex items-center justify-center min-h-[60vh]">
        <div className="text-center glass rounded-3xl p-12 border border-green-500/20 max-w-md mx-4">
          <CheckCircle2 size={56} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-display text-white mb-3">Message Sent!</h2>
          <p className="text-slate-400 mb-8">Thanks for reaching out! We'll get back to you within 24 hours.</p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Mail size={14} /> Get in Touch
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have questions, suggestions, or want to contribute content? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass rounded-2xl border border-blue-500/15 p-8">
            <h2 className="text-2xl font-bold font-display text-white mb-6 flex items-center gap-3">
              <MessageSquare size={22} className="text-blue-400" /> Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full glass rounded-xl pl-10 pr-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full glass rounded-xl pl-10 pr-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="w-full glass rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 text-sm bg-navy-900"
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="feedback">Feedback on content</option>
                  <option value="suggest-tool">Suggest an AI tool</option>
                  <option value="bug">Report a bug or issue</option>
                  <option value="contribute">Want to contribute</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Message</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                  className="w-full glass rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* Right side: FAQ + Info */}
          <div className="space-y-8">
            {/* Quick contact cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Email', value: 'hello@aihub.dev', icon: <Mail size={18} className="text-blue-400" /> },
                { label: 'Response time', value: 'Within 24 hours', icon: <MessageSquare size={18} className="text-cyan-400" /> },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-4 border border-blue-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">{item.label}</div>
                      <div className="text-white text-sm font-semibold">{item.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold font-display text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.q} className="glass rounded-xl border border-blue-500/10 p-5">
                    <h3 className="text-white font-semibold text-sm mb-2">{faq.q}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
