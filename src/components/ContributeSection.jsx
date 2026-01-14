import './ContributeSection.css';

function ContributeSection() {
  return (
    <div className="contribute-section">
      <div className="contribute-content">
        <h3 className="contribute-title">
          <span className="plus-icon">+</span>
          Contribute a Question
        </h3>
        <p className="contribute-description">
          Help grow our community question bank! Share real interview questions you've encountered to help other PMs prepare.
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSekX2c8CHa9LWY91kBVMg5lNCqkLUvQWJ9zyv8OZkaZ2UOB3Q/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="contribute-link"
        >
          Submit Question →
        </a>
      </div>
    </div>
  );
}

export default ContributeSection;
