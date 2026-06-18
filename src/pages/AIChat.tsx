import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, Brain, Trash2, Bot, User, Zap, Clock, BookOpen } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const knowledgeBase = {
  aboutAI: [
    'AI (Artificial Intelligence) is the simulation of human intelligence by machines, especially computer systems.',
    'AI was founded as an academic discipline in 1956.',
    'Types of AI include Narrow AI (specific tasks), General AI (human-like reasoning), and Super AI (beyond human intelligence).',
    'Machine Learning (ML) is a subset of AI where systems learn from data without explicit programming.',
    'Deep Learning uses neural networks with many layers to model complex patterns in data.',
    'Natural Language Processing (NLP) allows computers to understand and generate human language.',
    'Computer Vision enables machines to interpret and understand visual information from images and videos.',
    'Generative AI can create new content like text, images, audio, and code.',
  ],
  tools: [
    'ChatGPT by OpenAI is a general-purpose AI chatbot with free tier.',
    'Claude AI by Anthropic is great for writing, research, and long documents.',
    'Perplexity AI is an AI search engine with real-time citations.',
    'Google Gemini is a multimodal AI that handles text, images, and audio.',
    'Gamma.app creates AI-powered presentations and documents.',
    'Consensus helps find scientific research with AI.',
    'Otter.ai transcribes and summarizes meetings.',
    'Notion AI enhances writing inside your notes.',
    'Descript edits audio and video with AI.',
    'DALL-E and Midjourney generate AI art from text prompts.',
    'Hugging Face provides free open-source AI models and datasets.',
    'Kaggle offers free datasets and notebooks for ML practice.',
    'Replit Ghostwriter helps write and debug code with AI.',
    'Grammarly uses AI to improve your writing.',
    'Canva Magic Write generates design content with AI.',
  ],
  concepts: [
    'Supervised Learning uses labeled data to train models.',
    'Unsupervised Learning finds hidden patterns in unlabeled data.',
    'Reinforcement Learning trains agents through trial and reward.',
    'Neural Networks are inspired by the structure of the human brain.',
    'CNNs (Convolutional Neural Networks) are specialized for image processing.',
    'RNNs and LSTMs handle sequential data like text and time series.',
    'Transformers revolutionized NLP with attention mechanisms.',
    'GPT stands for Generative Pre-trained Transformer.',
    'LLMs (Large Language Models) are trained on vast text corpora.',
    'Overfitting happens when a model learns training data too well and fails on new data.',
    'Fine-tuning adapts a pre-trained model to a specific task.',
    'Prompt engineering is the art of writing effective prompts for AI.',
  ],
  realLife: [
    'AI in Healthcare: disease detection, drug discovery, personalized treatment, and robotic surgery.',
    'AI in Education: personalized learning, adaptive testing, AI tutors, and automated grading.',
    'AI in Business: data analytics, customer service chatbots, fraud detection, and market prediction.',
    'AI in Transportation: self-driving cars, traffic optimization, route planning.',
    'AI in Environment: climate modeling, renewable energy optimization, wildlife conservation.',
    'AI in Retail: recommendation engines, inventory management, demand forecasting.',
    'AI in Finance: algorithmic trading, credit scoring, risk assessment.',
    'AI in Agriculture: crop monitoring, yield prediction, automated harvesting.',
  ],
  careers: [
    'AI/ML Engineer: builds and deploys machine learning models.',
    'Data Scientist: analyzes data to extract insights and build predictive models.',
    'AI Research Scientist: develops new algorithms and publishes research.',
    'NLP Engineer: specializes in language models and text processing.',
    'Computer Vision Engineer: builds systems that interpret visual data.',
    'AI Product Manager: leads AI-powered product development.',
    'Robotics Engineer: designs intelligent robots and autonomous systems.',
    'AI Ethics Specialist: ensures responsible and fair AI development.',
    'AI Skills: Python, TensorFlow, PyTorch, Scikit-learn, data analysis, mathematics.',
  ],
  ranking: [
    'AI models are ranked by performance, cost, latency, and context window.',
    'OpenRouter provides live API access to 100+ AI models including GPT-4, Claude, Gemini, and open-source models.',
    'Top-tier models: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1 405B.',
    'Free/open-source models: Llama 3.1, Mistral, Gemma 2, Qwen 2.',
    'Model choice depends on your use case: reasoning, coding, creativity, or cost.',
  ],
  roadmap: [
    'AI Foundations: learn what AI is, its history, and basic neural network concepts.',
    'Python & Math: learn Python, NumPy, Pandas, linear algebra, and statistics.',
    'Machine Learning: supervised and unsupervised learning, regression, classification, clustering.',
    'Deep Learning: CNNs, RNNs, LSTMs, and Transformers.',
    'Specialization: choose NLP, Computer Vision, or Generative AI. Build 3-5 real projects.',
  ],
  quiz: [
    'AI was founded in 1956 at the Dartmouth Conference.',
    'Alan Turing proposed the Turing Test in 1950 to measure machine intelligence.',
    'A neural network consists of layers: input, hidden, and output.',
    'The Transformer architecture was introduced by Google in 2017.',
    'GPT is a decoder-only transformer architecture.',
  ],
  student: [
    'AI can help students with: essay writing, research, coding, math, and creating presentations.',
    'Always fact-check AI-generated content before submitting.',
    'Use AI as a learning tool, not a replacement for understanding.',
    'AI can explain complex topics in simple terms with examples.',
    'AI tutors can help with exam preparation and personalized study plans.',
    'The AI Awareness Hub is a free platform for students to learn AI.',
  ],
};

function knowledgeAnswer(query: string): string | null {
  const q = query.toLowerCase().trim();
  const qWords = q.split(/\s+/);

  const score = (text: string) => {
    const t = text.toLowerCase();
    let s = 0;
    for (const w of qWords) {
      if (w.length > 2 && t.includes(w)) s += 1;
      if (w.length > 4 && t.includes(w)) s += 2;
    }
    return s;
  };

  const allEntries: string[] = [
    ...knowledgeBase.aboutAI,
    ...knowledgeBase.tools,
    ...knowledgeBase.concepts,
    ...knowledgeBase.realLife,
    ...knowledgeBase.careers,
    ...knowledgeBase.ranking,
    ...knowledgeBase.roadmap,
    ...knowledgeBase.quiz,
    ...knowledgeBase.student,
  ];

  let bestScore = 0;
  let bestEntry = '';

  for (const entry of allEntries) {
    const s = score(entry);
    if (s > bestScore) {
      bestScore = s;
      bestEntry = entry;
    }
  }

  if (bestScore >= 3) return bestEntry;
  if (bestScore >= 2 && qWords.length <= 3) return bestEntry;
  return null;
}

function generateAnswer(query: string): string {
  const q = query.toLowerCase().trim();
  const qWords = q.split(/\s+/);

  const has = (words: string[]) => words.some(w => q.includes(w));
  const hasAny = (words: string[]) => words.some(w => qWords.includes(w));

  const direct = knowledgeAnswer(query);
  if (direct) return direct + '\n\n' + followUp(q);

  if (has(['hello', 'hi', 'hey', 'greetings', 'howdy'])) {
    return 'Hello! Welcome to AI Awareness Hub. I am an AI assistant with deep knowledge about artificial intelligence, free tools, career paths, and learning resources. Ask me anything about AI!\n\nYou can ask about:\n- AI concepts and definitions\n- Free AI tools for students\n- AI career paths\n- Learning roadmap\n- Real-world AI applications\n- AI model rankings';
  }

  if (has(['what is ai', 'define ai', 'definition of ai', 'ai meaning', 'what does ai mean', 'ai stand for'])) {
    return 'AI (Artificial Intelligence) is the simulation of human intelligence in machines that are programmed to think and learn like humans.\n\nKey types:\n- **Narrow AI**: Designed for specific tasks (e.g., Siri, ChatGPT)\n- **General AI**: Human-level intelligence across any task (not yet achieved)\n- **Super AI**: Intelligence surpassing the best human minds (hypothetical)\n\nSub-fields include Machine Learning, Deep Learning, NLP, and Computer Vision.';
  }

  if (has(['what is machine learning', 'what is ml', 'define machine learning', 'difference between ai and ml'])) {
    return 'Machine Learning is a subset of AI where systems learn from data without being explicitly programmed.\n\nThree main types:\n- **Supervised Learning**: Models trained on labeled data (e.g., spam detection)\n- **Unsupervised Learning**: Finds patterns in unlabeled data (e.g., customer clustering)\n- **Reinforcement Learning**: Learns by trial and reward (e.g., game-playing AI)\n\nPopular Python libraries: Scikit-learn, TensorFlow, PyTorch.';
  }

  if (has(['what is deep learning', 'define deep learning', 'neural network', 'deep learning basics'])) {
    return 'Deep Learning is a subset of Machine Learning that uses neural networks with many layers (hence "deep").\n\nKey architectures:\n- **CNNs**: For image recognition and computer vision\n- **RNNs/LSTMs**: For sequential data like text and speech\n- **Transformers**: For language models (GPT, BERT, etc.)\n\nDeep learning powers: ChatGPT, image generators, self-driving cars, speech recognition, and more.';
  }

  if (has(['free tool', 'free ai', 'best free ai', 'tool for student', 'student tool', 'recommendation', 'suggest a tool', 'which tool', 'what tool'])) {
    return 'Top free AI tools for students:\n\n1. **ChatGPT** - General Q&A, writing, coding help\n2. **Claude AI** - Long-form writing, document analysis\n3. **Perplexity** - AI search with real-time citations\n4. **Google Gemini** - Multimodal (text, image, audio)\n5. **Gamma.app** - AI presentations\n6. **Consensus** - Find scientific research\n7. **Kaggle** - Free ML datasets and notebooks\n8. **Hugging Face** - Open-source models and datasets\n9. **Notion AI** - Smart note-taking\n10. **Canva Magic Write** - AI-assisted design\n\nVisit our AI Tools page for the full list of 50+ tools!';
  }

  if (has(['career', 'job', 'salary', 'work', 'profession', 'become ai', 'ai engineer', 'data scientist', 'ml engineer'])) {
    return 'AI Career Paths:\n\n1. **AI/ML Engineer** - Builds and deploys ML models ($100K-$200K+ in US)\n2. **Data Scientist** - Analyzes data for insights ($95K-$180K)\n3. **AI Research Scientist** - Develops new algorithms ($130K-$250K+)\n4. **NLP Engineer** - Works with language models ($100K-$190K)\n5. **Computer Vision Engineer** - Image/video AI ($100K-$190K)\n6. **AI Product Manager** - Leads AI products ($120K-$200K)\n7. **Robotics Engineer** - Autonomous systems ($90K-$170K)\n\nRequired skills: Python, TensorFlow/PyTorch, linear algebra, statistics, and strong math fundamentals. Check our Careers page for details!';
  }

  if (has(['roadmap', 'how to learn', 'learning path', 'start learning', 'beginner', 'get started', 'where to start', 'learn ai', 'study ai'])) {
    return 'AI Learning Roadmap (6-12 months):\n\n**Phase 1 - Foundations** (2-4 weeks)\n- What is AI, ML, and Deep Learning\n- History of AI\n- Basic neural networks\n\n**Phase 2 - Python & Math** (4-6 weeks)\n- Python, NumPy, Pandas\n- Linear algebra & statistics\n\n**Phase 3 - Machine Learning** (6-8 weeks)\n- Supervised & unsupervised learning\n- Regression, classification, clustering\n- Scikit-learn\n\n**Phase 4 - Deep Learning** (8-10 weeks)\n- CNNs, RNNs, LSTMs, Transformers\n- PyTorch or TensorFlow\n\n**Phase 5 - Specialization** (10+ weeks)\n- NLP, Computer Vision, or Generative AI\n- Build 3-5 real projects\n\nVisit our Learn Roadmap page for the full path with free resources!';
  }

  if (has(['rank', 'best ai model', 'top ai', 'openrouter', 'model comparison', 'which model', 'fastest ai', 'cheapest ai'])) {
    return 'Top AI Models (2024):\n\n**Proprietary (Best Quality):**\n- GPT-4o (OpenAI) - Best overall reasoning\n- Claude 3.5 Sonnet (Anthropic) - Best coding & analysis\n- Gemini 1.5 Pro (Google) - Best multimodal & long context\n\n**Open Source (Free):**\n- Llama 3.1 405B (Meta) - Best open-source model\n- Mistral Large (Mistral AI) - Strong performance\n- Gemma 2 (Google) - Lightweight and efficient\n- Qwen 2 (Alibaba) - Good coding abilities\n\nCheck our AI Ranking page for live rankings from OpenRouter!';
  }

  if (has(['healthcare', 'medical', 'hospital', 'doctor', 'diagnosis', 'drug'])) {
    return 'AI in Healthcare:\n\n- **Disease Detection**: AI can detect cancer, diabetes, and heart conditions from scans and patient data with accuracy rivaling doctors.\n- **Drug Discovery**: AI accelerates finding new medicines by predicting molecular behavior.\n- **Personalized Treatment**: AI recommends treatments based on patient genetics and history.\n- **Robotic Surgery**: AI-assisted surgical robots improve precision and reduce recovery time.\n- **Mental Health**: AI chatbots provide therapy support and mood tracking.\n\nVisit our AI in Real Life page for more applications!';
  }

  if (has(['education', 'school', 'student', 'study', 'teacher', 'classroom', 'learning'])) {
    return 'AI in Education:\n\n- **Personalized Learning**: AI adapts content to each student\'s pace and style.\n- **AI Tutors**: 24/7 help with explanations, examples, and practice.\n- **Automated Grading**: AI grades essays, code, and assignments.\n- **Language Learning**: AI conversation practice for any language.\n- **Content Creation**: AI generates quizzes, lesson plans, and study materials.\n- **Accessibility**: AI converts text to speech, translates languages, and adapts for disabilities.\n\nThis AI Chat is an example of AI in education!';
  }

  if (has(['business', 'company', 'marketing', 'sales', 'customer', 'fraud', 'analytics'])) {
    return 'AI in Business:\n\n- **Data Analytics**: AI analyzes massive datasets to find trends and insights.\n- **Customer Service**: AI chatbots handle 80%+ of common support queries.\n- **Fraud Detection**: AI identifies suspicious transactions in real-time.\n- **Marketing**: AI predicts customer behavior and personalizes campaigns.\n- **Sales**: AI prioritizes leads and forecasts revenue.\n- **HR**: AI screens resumes and matches candidates to jobs.\n- **Supply Chain**: AI optimizes inventory, shipping, and demand forecasting.\n\nAI is transforming every industry. Visit our AI in Real Life page!';
  }

  if (has(['transport', 'car', 'self driving', 'autonomous', 'vehicle', 'traffic', 'drone'])) {
    return 'AI in Transportation:\n\n- **Self-Driving Cars**: Tesla, Waymo, and others use AI to navigate roads.\n- **Traffic Optimization**: AI adjusts traffic lights and routes in real-time.\n- **Drones**: AI-powered delivery and surveillance drones.\n- **Logistics**: AI optimizes shipping routes and fuel consumption.\n- **Predictive Maintenance**: AI predicts vehicle failures before they happen.\n- **Ride-Sharing**: AI matches riders with drivers and optimizes pricing.\n\nVisit our AI in Real Life page for more!';
  }

  if (has(['environment', 'climate', 'green', 'sustain', 'weather', 'energy', 'renewable', 'pollution', 'carbon'])) {
    return 'AI in Environment:\n\n- **Climate Modeling**: AI predicts long-term weather and climate patterns.\n- **Renewable Energy**: AI optimizes solar and wind power generation.\n- **Wildlife Conservation**: AI tracks endangered species and detects poaching.\n- **Agriculture**: AI optimizes irrigation, reduces pesticides, and predicts crop yields.\n- **Waste Management**: AI sorts recyclables and optimizes collection routes.\n- **Disaster Prediction**: AI forecasts floods, wildfires, and hurricanes.\n\nVisit our AI in Real Life page for more!';
  }

  if (has(['retail', 'shop', 'shopping', 'ecommerce', 'amazon', 'recommend'])) {
    return 'AI in Retail:\n\n- **Recommendation Engines**: "You might also like" suggestions on Amazon, Netflix, etc.\n- **Inventory Management**: AI predicts stock needs and reduces waste.\n- **Dynamic Pricing**: AI adjusts prices based on demand, competition, and trends.\n- **Visual Search**: Find products by uploading a photo.\n- **Fraud Prevention**: AI detects fake reviews and payment fraud.\n- **Supply Chain**: AI optimizes delivery routes and warehouse operations.\n\nVisit our AI in Real Life page for more!';
  }

  if (has(['nlp', 'natural language', 'language model', 'gpt', 'chatbot', 'text', 'translation'])) {
    return 'Natural Language Processing (NLP):\n\nNLP allows computers to understand, interpret, and generate human language.\n\nKey technologies:\n- **Tokenization**: Breaking text into words/tokens\n- **Embeddings**: Converting words into numerical vectors\n- **Attention**: The mechanism that powers Transformers\n- **Transformers**: Architecture behind GPT, BERT, Claude, Gemini\n\nApplications:\n- Chatbots (ChatGPT, Claude)\n- Translation (Google Translate, DeepL)\n- Sentiment analysis\n- Text summarization\n- Speech recognition\n- Code generation\n\nVisit our AI Concepts page for a deep dive!';
  }

  if (has(['cv', 'computer vision', 'image', 'recognition', 'face', 'object', 'detect'])) {
    return 'Computer Vision (CV):\n\nComputer Vision enables machines to interpret and understand visual information from images and videos.\n\nKey technologies:\n- **CNNs**: Convolutional Neural Networks specialized for images\n- **Object Detection**: Finding and classifying objects in images\n- **Image Segmentation**: Pixel-level classification\n- **OCR**: Optical Character Recognition (text from images)\n\nApplications:\n- Self-driving cars (detecting pedestrians, signs)\n- Medical imaging (tumor detection from X-rays)\n- Facial recognition\n- Augmented Reality\n- Quality control in manufacturing\n- Satellite image analysis\n\nVisit our AI Concepts page for more!';
  }

  if (has(['generative', 'genai', 'generate', 'create image', 'dalle', 'midjourney', 'stable diffusion', 'create text', 'ai art'])) {
    return 'Generative AI:\n\nGenerative AI creates new content from text prompts.\n\n**Text Generation:**\n- ChatGPT, Claude, Gemini - Write essays, code, stories, emails\n\n**Image Generation:**\n- DALL-E 3 (OpenAI)\n- Midjourney\n- Stable Diffusion (open-source)\n- Adobe Firefly\n\n**Audio & Music:**\n- ElevenLabs (voice cloning)\n- Suno / Udio (music generation)\n\n**Video:**\n- Runway ML, Sora (OpenAI), Pika Labs\n\n**Code:**\n- GitHub Copilot, Replit Ghostwriter\n\nVisit our AI Concepts page for more!';
  }

  if (has(['help', 'what can you do', 'what do you know', 'capabilities', 'how to use', 'feature'])) {
    return 'I can answer questions about any topic on AI Awareness Hub! Here\'s what I know:\n\n- **AI Concepts** - Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI\n- **AI Tools** - 50+ free tools for students with recommendations\n- **Careers** - AI job paths, salaries, and required skills\n- **Learning Roadmap** - Step-by-step path from beginner to expert\n- **Real-World AI** - Healthcare, education, business, transportation, environment, retail\n- **AI Rankings** - Top models and their strengths\n- **About AI** - History, types, and how AI works\n\nJust ask naturally — I understand context and will give you helpful, accurate answers!';
  }

  if (has(['thank', 'thanks', 'appreciate', 'grateful'])) {
    return 'You\'re welcome! I\'m happy to help with any AI-related questions. Feel free to ask more about AI tools, concepts, careers, or the learning roadmap. Good luck with your AI journey!';
  }

  if (has(['bye', 'goodbye', 'see you', 'farewell', 'later'])) {
    return 'Goodbye! Come back anytime to learn more about AI. The AI Awareness Hub is always here to help you on your AI journey. Happy learning!';
  }

  if (has(['gpt', 'chatgpt', 'openai', 'claude', 'gemini', 'llama', 'mistral', 'compare'])) {
    return 'AI Model Comparison:\n\n**GPT-4o (OpenAI)** - Best general reasoning, coding, and writing. Fast and multimodal.\n\n**Claude 3.5 Sonnet (Anthropic)** - Best for long documents, analysis, and honest reasoning.\n\n**Gemini 1.5 Pro (Google)** - Best for long context (1M+ tokens) and multimodal tasks.\n\n**Llama 3.1 (Meta)** - Best open-source model. Free to use, can be self-hosted.\n\n**Mistral Large** - Strong European alternative with good performance.\n\n**Gemma 2 (Google)** - Lightweight, efficient, runs on consumer hardware.\n\nCheck our AI Ranking page for live comparisons!';
  }

  if (has(['python', 'programming', 'code', 'coding', 'learn python', 'how to code', 'developer'])) {
    return 'Python is the most important language for AI/ML.\n\nEssential Python libraries:\n- **NumPy** - Numerical computing and arrays\n- **Pandas** - Data manipulation and analysis\n- **Scikit-learn** - Classical ML algorithms\n- **TensorFlow** - Google\'s deep learning framework\n- **PyTorch** - Meta\'s deep learning framework (research favorite)\n- **Hugging Face Transformers** - Pre-trained NLP models\n- **OpenCV** - Computer vision\n- **Matplotlib/Seaborn** - Data visualization\n\nStart with our Python & Math for AI module on the Learning Roadmap page!';
  }

  if (has(['math', 'mathematics', 'linear algebra', 'statistics', 'calculus', 'probability'])) {
    return 'Math for AI:\n\n- **Linear Algebra** - Vectors, matrices, eigenvalues (used in neural networks, PCA, embeddings)\n- **Calculus** - Derivatives, gradients (used in backpropagation and optimization)\n- **Probability & Statistics** - Distributions, hypothesis testing, Bayes theorem (used in ML algorithms)\n- **Information Theory** - Entropy, cross-entropy (used in loss functions)\n\nYou don\'t need to be a math expert, but understanding these concepts helps you debug models and read research papers. Free resources: Khan Academy, 3Blue1Brown on YouTube, fast.ai courses.';
  }

  if (hasAny(['who made you', 'who built you', 'who created you', 'who are you', 'your name', 'what is your name', 'about you', 'who developed'])) {
    return 'I am an AI assistant built for AI Awareness Hub — a free platform for students to learn about Artificial Intelligence. I am powered by an intelligent knowledge base that contains information about AI concepts, tools, careers, learning paths, and real-world applications. I can answer questions about any topic covered on the AI Awareness Hub website. How can I help you today?';
  }

  if (hasAny(['what is this site', 'what is ai awareness hub', 'about this site', 'purpose', 'what does this site do', 'what is the website', 'about the website'])) {
    return 'AI Awareness Hub is a free educational platform for students to learn about Artificial Intelligence.\n\nIt includes:\n- **About AI** - History, types, and fundamentals of AI\n- **AI Concepts** - ML, Deep Learning, NLP, Computer Vision, Generative AI\n- **AI Tools** - 50+ free tools for students\n- **AI Ranking** - Live rankings of AI models via OpenRouter\n- **AI in Real Life** - Real-world applications in healthcare, education, business, etc.\n- **Learn Roadmap** - Step-by-step path from beginner to expert\n- **AI Careers** - Job paths, salaries, and skills needed\n- **AI Chat** - Ask me anything about AI!\n\nEverything is free and designed to help students succeed in the AI age.';
  }

  if (hasAny(['quiz', 'question', 'test', 'trivia', 'fun fact', 'facts', 'challenge'])) {
    return 'Here is a quick AI quiz question for you!\n\n**Question:** When was AI founded as an academic discipline?\n\nA) 1940\nB) 1956\nC) 1970\nD) 1985\n\nType your answer (A, B, C, or D) and I will tell you if you are right!\n\n(Hint: The answer is in our About AI section!)';
  }

  if (hasAny(['b', '1956'])) {
    return 'Correct! AI was founded at the Dartmouth Conference in 1956 by pioneers like John McCarthy, Marvin Minsky, and Claude Shannon.\n\nWant another question? Ask me for a quiz!';
  }

  if (hasAny(['a', 'c', 'd', '1940', '1970', '1985'])) {
    return 'That is not correct. The right answer is B) 1956. The Dartmouth Conference is considered the birth of AI as a formal field.\n\nWant another question? Ask me for a quiz!';
  }

  if (has(['history', 'when invented', 'inventor', 'founder', 'dartmouth', 'alan turing', 'turing test'])) {
    return 'AI History:\n\n- **1950** - Alan Turing proposes the Turing Test to measure machine intelligence.\n- **1956** - AI founded at the Dartmouth Conference (John McCarthy, Marvin Minsky, Claude Shannon, Nathaniel Rochester).\n- **1966** - ELIZA, the first chatbot, created by Joseph Weizenbaum.\n- **1980s** - Expert systems boom in business applications.\n- **1997** - Deep Blue beats chess world champion Garry Kasparov.\n- **2012** - Deep learning revolution begins with AlexNet image recognition.\n- **2016** - AlphaGo beats Go champion Lee Sedol.\n- **2022** - ChatGPT launches, sparking the generative AI revolution.\n- **2023** - GPT-4, Claude, and Gemini launched; AI enters mainstream.\n- **2024** - AI agents, video generation, and multimodal models advance rapidly.\n\nVisit our About AI page for the full history!';
  }

  if (has(['ethic', 'bias', 'fair', 'responsible', 'risk', 'danger', 'safety', 'concern', 'problem with ai'])) {
    return 'AI Ethics and Challenges:\n\n- **Bias**: AI models can inherit biases from training data, leading to unfair outcomes.\n- **Privacy**: AI systems often require vast amounts of personal data.\n- **Job Displacement**: Automation may replace certain jobs while creating new ones.\n- **Misinformation**: Deepfakes and AI-generated content can spread false information.\n- **Autonomy**: Self-driving cars and weapons raise questions about decision-making.\n- **Transparency**: Black-box models make it hard to understand how decisions are made.\n- **Regulation**: Governments are working on AI governance frameworks.\n\nResponsible AI development requires diverse teams, careful data curation, and ongoing monitoring.';
  }

  if (has(['future', 'next', 'coming', 'predict', 'trend', '2025', '2030', 'agi'])) {
    return 'AI Future Trends:\n\n- **AGI (Artificial General Intelligence)**: Human-level AI that can reason across any domain. Estimated timeline varies widely.\n- **AI Agents**: Autonomous systems that can plan, use tools, and complete multi-step tasks.\n- **Multimodal AI**: Models that seamlessly understand text, images, audio, and video together.\n- **AI in Space**: Autonomous rovers, satellite analysis, and space exploration.\n- **Quantum AI**: Combining quantum computing with machine learning for breakthroughs.\n- **Personal AI**: Custom AI assistants that know your preferences and context.\n- **AI Regulation**: Governments creating frameworks for safe AI development.\n- **Neurosymbolic AI**: Combining neural networks with symbolic reasoning for better accuracy.';
  }

  return 'I do not have a specific answer for that in my knowledge base, but I can help with topics related to AI!\n\nAsk me about:\n- AI concepts (ML, Deep Learning, NLP, CV, Generative AI)\n- Free AI tools for students\n- AI career paths and salaries\n- Step-by-step learning roadmap\n- Real-world AI applications\n- AI model rankings\n- AI history and ethics\n\nWhat would you like to know about AI?';
}

function followUp(q: string): string {
  const qc = q.toLowerCase();
  if (qc.includes('tool') || qc.includes('free')) return 'Want more free AI tools? Ask me "What are the best free AI tools for students?"';
  if (qc.includes('career') || qc.includes('job')) return 'Interested in AI careers? Ask me "What AI jobs are available?" or visit our Careers page.';
  if (qc.includes('learn') || qc.includes('roadmap') || qc.includes('study')) return 'Want to learn AI step-by-step? Ask me "How do I start learning AI?" or visit our Learn Roadmap page.';
  if (qc.includes('concept') || qc.includes('ml') || qc.includes('deep learning') || qc.includes('nlp') || qc.includes('cv')) return 'Want to explore more AI concepts? Ask me about specific topics like NLP, Computer Vision, or Generative AI.';
  if (qc.includes('real') || qc.includes('application') || qc.includes('healthcare') || qc.includes('education') || qc.includes('business')) return 'Want more real-world examples? Ask me about AI in healthcare, education, business, transportation, or the environment.';
  if (qc.includes('rank') || qc.includes('model') || qc.includes('gpt') || qc.includes('claude') || qc.includes('gemini')) return 'Want to compare AI models? Ask me "Which AI model is best?" or visit our AI Ranking page.';
  if (qc.includes('about') || qc.includes('history') || qc.includes('what is ai')) return 'Want to learn AI basics? Ask me "What is AI?" or visit our About AI page.';
  return 'Anything else about AI you would like to know?';
}

const suggestedQuestions = [
  'What is AI?',
  'What are the best free AI tools for students?',
  'How do I start learning AI?',
  'What AI jobs are available?',
  'What is Deep Learning?',
  'How is AI used in healthcare?',
  'Which AI model is best?',
  'What is NLP?',
  'How do I use AI as a student?',
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your AI assistant. I have deep knowledge about AI concepts, tools, careers, learning paths, and real-world applications. Ask me anything about AI!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowSuggestions(false);

    setTimeout(() => {
      const reply = generateAnswer(text.trim());
      const assistantMsg: Message = { role: 'assistant', content: reply, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Chat cleared! I am your AI assistant. Ask me anything about AI.',
        timestamp: new Date(),
      },
    ]);
    setShowSuggestions(true);
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
            <p className="text-xs text-slate-400">Ask anything about AI, tools, careers, or learning</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded-full">
              <Zap size={10} className="text-yellow-400" /> Knowledge Base
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
              <div className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-md'
                  : 'glass border border-blue-500/10 text-slate-200 rounded-bl-md'
              }`}>
                {msg.content}
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
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask me anything about AI..."
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
              <BookOpen size={10} /> Based on AI Awareness Hub knowledge
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} /> Responses may not be real-time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
