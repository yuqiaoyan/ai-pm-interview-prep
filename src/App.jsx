import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InterviewPractice from './components/InterviewPractice';
import ResourcesPage from './pages/ResourcesPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<InterviewPractice />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
