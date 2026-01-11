import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/questionData';

export function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchQuestions();

      setQuestions(result.questions);
      setCategories(result.categories);
      setFromCache(result.fromCache);

      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
      setQuestions([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const refetch = () => {
    loadQuestions();
  };

  return {
    questions,
    categories,
    loading,
    error,
    fromCache,
    refetch
  };
}
