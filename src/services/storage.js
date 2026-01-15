// localStorage abstraction layer for AI PM Interview Prep app

// Storage keys
export const STORAGE_KEYS = {
  PRACTICED_QUESTIONS: 'aipm_practiced_questions',
  QUESTION_HISTORY: 'aipm_question_history',
  PREFERENCES: 'aipm_preferences',
  MARKED_FOR_REVIEW: 'aipm_marked_for_review',
};

/**
 * Get item from localStorage with JSON parsing
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed value or defaultValue
 */
export function getItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

/**
 * Set item in localStorage with JSON stringification
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    // Check if quota exceeded
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded');
    }
    return false;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
}

/**
 * Clear all app-related items from localStorage
 * @returns {boolean} Success status
 */
export function clear() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Get practiced questions array
 * @returns {string[]} Array of question IDs
 */
export function getPracticedQuestions() {
  return getItem(STORAGE_KEYS.PRACTICED_QUESTIONS, []);
}

/**
 * Add question to practiced list
 * @param {string} questionId - Question ID to add
 */
export function addPracticedQuestion(questionId) {
  const practiced = getPracticedQuestions();
  if (!practiced.includes(questionId)) {
    practiced.push(questionId);
    setItem(STORAGE_KEYS.PRACTICED_QUESTIONS, practiced);
  }
}

/**
 * Get question history
 * @returns {Array} Array of question history objects
 */
export function getQuestionHistory() {
  return getItem(STORAGE_KEYS.QUESTION_HISTORY, []);
}

/**
 * Add question to history with timestamp and time spent
 * @param {string} questionId - Question ID
 * @param {number} timeSpent - Time spent in seconds
 */
export function addQuestionToHistory(questionId, timeSpent) {
  const history = getQuestionHistory();
  history.push({
    questionId,
    timestamp: new Date().toISOString(),
    timeSpent,
  });
  setItem(STORAGE_KEYS.QUESTION_HISTORY, history);
}

/**
 * Get user preferences
 * @returns {Object} Preferences object
 */
export function getPreferences() {
  return getItem(STORAGE_KEYS.PREFERENCES, {
    timerVisible: true,
    selectedCategories: ['all'],
  });
}

/**
 * Update user preferences
 * @param {Object} preferences - Preferences to update
 */
export function updatePreferences(preferences) {
  const current = getPreferences();
  setItem(STORAGE_KEYS.PREFERENCES, { ...current, ...preferences });
}
