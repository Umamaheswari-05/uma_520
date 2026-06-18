import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutAI from './pages/AboutAI';
import AIConcepts from './pages/AIConcepts';
import AITools from './pages/AITools';
import AIRanking from './pages/AIRanking';
import AIInRealLife from './pages/AIInRealLife';
import LearnRoadmap from './pages/LearnRoadmap';
import Careers from './pages/Careers';
import Quiz from './pages/Quiz';
import Contact from './pages/Contact';

export type Page =
  | 'home'
  | 'about'
  | 'concepts'
  | 'tools'
  | 'ranking'
  | 'reallife'
  | 'roadmap'
  | 'careers'
  | 'quiz'
  | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigate={navigate} />;
      case 'about': return <AboutAI navigate={navigate} />;
      case 'concepts': return <AIConcepts navigate={navigate} />;
      case 'tools': return <AITools />;
      case 'ranking': return <AIRanking />;
      case 'reallife': return <AIInRealLife navigate={navigate} />;
      case 'roadmap': return <LearnRoadmap navigate={navigate} />;
      case 'careers': return <Careers />;
      case 'quiz': return <Quiz />;
      case 'contact': return <Contact />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
