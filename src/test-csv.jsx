import { useQuestions } from './hooks/useQuestions';
import { clearCache } from './services/questionData';

function TestCSV() {
  const { questions, categories, loading, error, fromCache, refetch } = useQuestions();

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>CSV Data Test</h1>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>CSV Data Test</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>CSV Data Test - AI PM Interview Prep</h1>

      <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
        <p><strong>Status:</strong> {fromCache ? '✅ From Cache' : '🔄 Fresh Fetch'}</p>
        <p><strong>Total Questions:</strong> {questions.length}</p>
        <p><strong>Total Categories:</strong> {categories.length}</p>
        {error && <p style={{ color: 'orange' }}><strong>Warning:</strong> {error}</p>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={refetch} style={{ marginRight: '10px', padding: '8px 16px' }}>
          Refetch Data
        </button>
        <button
          onClick={() => {
            clearCache();
            refetch();
          }}
          style={{ padding: '8px 16px' }}
        >
          Clear Cache & Refetch
        </button>
      </div>

      <h2>Categories ({categories.length})</h2>
      <div style={{ marginBottom: '20px' }}>
        {categories.map((cat, idx) => (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              margin: '4px',
              padding: '4px 8px',
              background: '#e0e0e0',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      <h2>Sample Questions (First 5)</h2>
      {questions.slice(0, 5).map((q) => (
        <div
          key={q.id}
          style={{
            marginBottom: '16px',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fafafa'
          }}
        >
          <p><strong>ID:</strong> {q.id}</p>
          <p><strong>Category:</strong> {q.category}</p>
          <p><strong>Question:</strong> {q.question}</p>
          {q.difficulty && <p><strong>Difficulty:</strong> {q.difficulty}</p>}
          {q.source && <p><strong>Source:</strong> {q.source}</p>}
        </div>
      ))}

      <h2>Full Data Dump (JSON)</h2>
      <details>
        <summary style={{ cursor: 'pointer', padding: '8px', background: '#e0e0e0', marginBottom: '10px' }}>
          Click to view all {questions.length} questions (raw JSON)
        </summary>
        <pre style={{
          background: '#1e1e1e',
          color: '#d4d4d4',
          padding: '16px',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '400px'
        }}>
          {JSON.stringify({ questions, categories }, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default TestCSV;
