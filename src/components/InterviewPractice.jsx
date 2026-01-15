import { useState, useEffect } from 'react';
import { useQuestions } from '../hooks/useQuestions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS, getPracticedQuestions, addPracticedQuestion, addQuestionToHistory } from '../services/storage';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import ContributeSection from './ContributeSection';
import './InterviewPractice.css';

function InterviewPractice() {
  const { questions, categories, loading, error } = useQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // localStorage-backed state
  const [preferences, setPreferences] = useLocalStorage(STORAGE_KEYS.PREFERENCES, {
    timerVisible: true,
    selectedCategories: ['All'],
  });

  const [questionCount, setQuestionCount] = useState(() => {
    return getPracticedQuestions().length;
  });

  // Extract preferences into local variables for easier use
  const timerVisible = preferences.timerVisible;
  const selectedCategories = preferences.selectedCategories;

  const getFilteredQuestions = () => {
    if (selectedCategories.includes('All')) {
      return questions;
    }
    return questions.filter(q => selectedCategories.includes(q.category));
  };

  const getRandomQuestion = () => {
    const filtered = getFilteredQuestions();
    if (filtered.length === 0) return null;

    const availableQuestions = filtered.filter(
      q => !recentQuestions.includes(q.id)
    );

    if (availableQuestions.length === 0) {
      setRecentQuestions([]);
      const randomIndex = Math.floor(Math.random() * filtered.length);
      return filtered[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  };

  const handleNextQuestion = () => {
    // Save history for current question before moving to next
    if (currentQuestion) {
      addPracticedQuestion(currentQuestion.id);
      addQuestionToHistory(currentQuestion.id, timerSeconds);
    }

    const nextQuestion = getRandomQuestion();

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setTimerSeconds(0); // Reset timer for new question

      setRecentQuestions(prev => {
        const updated = [...prev, nextQuestion.id];
        return updated.slice(-5);
      });

      setQuestionCount(getPracticedQuestions().length);
    }
  };

  const handleTimerTick = (seconds) => {
    setTimerSeconds(seconds);
  };

  const handleToggleTimer = () => {
    setPreferences(prev => ({
      ...prev,
      timerVisible: !prev.timerVisible,
    }));
  };

  const handleCategoryChange = (newCategories) => {
    setPreferences(prev => ({
      ...prev,
      selectedCategories: newCategories,
    }));
  };

  useEffect(() => {
    if (questions.length > 0 && !currentQuestion) {
      handleNextQuestion();
    }
  }, [questions]);

  if (loading) {
    return (
      <div className="practice-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="practice-container">
        <div className="error-state">
          <h2>Unable to load questions</h2>
          <p>{error}</p>
          <p>Please check your internet connection and try again.</p>
        </div>
      </div>
    );
  }

  const timer = (
    <Timer
      isVisible={timerVisible}
      onToggleVisibility={handleToggleTimer}
      onTick={handleTimerTick}
      resetKey={currentQuestion?.id}
    />
  );

  return (
    <div className="practice-container">
      <Header />

      <div className="practice-content">
        <div className="practice-header">
          <h1>AI PM Interview Practice</h1>
          <p className="practice-subtitle">
            Master your AI product management interviews with curated questions from top companies.
          </p>
        </div>

        <div className="progress-counter">
          {questionCount} of {questions.length} practiced
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />

        <QuestionCard question={currentQuestion} timer={timer} />

        <div className="practice-actions">
          <button
            className="next-question-btn"
            onClick={handleNextQuestion}
            disabled={questions.length === 0}
          >
            Next Question →
          </button>
        </div>

        <ContributeSection />
      </div>
    </div>
  );
}

export default InterviewPractice;
