import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InterviewPractice from './components/InterviewPractice';
import ResourcesPage from './pages/ResourcesPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InterviewPractice />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
