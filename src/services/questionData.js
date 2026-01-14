import Papa from 'papaparse';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8ZbiNbj00TARest-Srk4EwWuBTz6d7JDFE2B6kSW06GEECC9U42ksM3RyF9ssJ6Pl3pHoo--rPhLw/pub?gid=1423087399&single=true&output=csv';

const USE_PROXY = false;

const cache = {
  data: null,
  timestamp: null,
  expiresIn: 3600000 // 1 hour in milliseconds
};

function isCacheValid() {
  if (!cache.data || !cache.timestamp) return false;
  const now = Date.now();
  return (now - cache.timestamp) < cache.expiresIn;
}

function transformQuestion(row, index) {
  const id = row.id || `q_${index + 1}`;

  return {
    id,
    question: row['Interview Question'] || row.question || row.Question || '',
    category: row['Question Type'] || row.category || row.Category || 'Uncategorized',
    company: row['Company Name'] || null,
    timestamp: row.Timestamp || null,
    comments: row['Comments (e.g. any follow up questions, what do you suggest)'] || null,
    difficulty: row.difficulty || row.Difficulty || null,
    source: row.source || row.Source || null
  };
}

function validateQuestion(question) {
  return question.question && question.question.trim().length > 0;
}

function extractCategories(questions) {
  const categories = new Set();
  questions.forEach(q => {
    if (q.category) {
      categories.add(q.category);
    }
  });
  return Array.from(categories).sort();
}

export async function fetchQuestions() {
  if (isCacheValid()) {
    console.log('Using cached question data');
    return {
      questions: cache.data.questions,
      categories: cache.data.categories,
      fromCache: true
    };
  }

  return new Promise((resolve, reject) => {
    console.log('Fetching fresh question data from CSV...');

    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (results.errors && results.errors.length > 0) {
            console.warn('CSV parsing warnings:', results.errors);
          }

          const transformedQuestions = results.data
            .map((row, index) => transformQuestion(row, index))
            .filter(validateQuestion);

          const categories = extractCategories(transformedQuestions);

          cache.data = {
            questions: transformedQuestions,
            categories
          };
          cache.timestamp = Date.now();

          console.log(`Fetched ${transformedQuestions.length} questions with ${categories.length} categories`);

          resolve({
            questions: transformedQuestions,
            categories,
            fromCache: false
          });
        } catch (error) {
          console.error('Error processing CSV data:', error);

          if (cache.data) {
            console.log('Falling back to stale cache data');
            resolve({
              questions: cache.data.questions,
              categories: cache.data.categories,
              fromCache: true,
              error: error.message
            });
          } else {
            reject(error);
          }
        }
      },
      error: (error) => {
        console.error('Error fetching questions:', error);
        console.error('Error details:', {
          message: error.message,
          type: error.type,
          csvUrl: CSV_URL
        });

        if (cache.data) {
          console.log('Falling back to stale cache data');
          resolve({
            questions: cache.data.questions,
            categories: cache.data.categories,
            fromCache: true,
            error: error.message
          });
        } else {
          reject(error);
        }
      }
    });
  });
}

export function clearCache() {
  cache.data = null;
  cache.timestamp = null;
  console.log('Cache cleared');
}
