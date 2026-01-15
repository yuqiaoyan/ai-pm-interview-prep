import './CompanyList.css';

function CompanyList({ companies }) {
  return (
    <div className="company-list">
      {companies.map((company, index) => (
        <a
          key={index}
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          className="company-item"
        >
          <span className="company-name">{company.title}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="company-arrow"
          >
            <path
              d="M12 8.5V12.5H4V4.5H7.5M10 4.5H12.5M12.5 4.5V7M12.5 4.5L7 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      ))}
    </div>
  );
}

export default CompanyList;
