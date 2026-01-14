import './QuestionCard.css';

function QuestionCard({ question, timer }) {
  if (!question) {
    return (
      <div className="question-card empty">
        <p>No question available. Please check your filters or try again.</p>
      </div>
    );
  }

  return (
    <div className="question-card">
      <div className="question-card-header">
        <div className="badges-container">
          <span className="category-badge">{question.category}</span>
          {question.company && (
            <span className="company-badge">{question.company}</span>
          )}
        </div>
        <div className="timer-container-right">{timer}</div>
      </div>

      <div className="question-content">
        <p className="question-text">{question.question}</p>
      </div>

      {question.comments && (
        <div className="question-comments">
          <p className="comments-label">Tips:</p>
          <p className="comments-text">{question.comments}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
