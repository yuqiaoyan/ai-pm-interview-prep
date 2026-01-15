import './ResourceCard.css';

function ResourceCard({ title, description, url, tags }) {
  return (
    <div className="resource-card">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="resource-link"
      >
        <h3 className="resource-title">
          {title}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="external-icon"
          >
            <path
              d="M10.5 7.5V11.5H2.5V3.5H6.5M8.5 2.5H11.5M11.5 2.5V5.5M11.5 2.5L6 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </h3>
      </a>
      <p className="resource-description">{description}</p>
      {tags && tags.length > 0 && (
        <div className="resource-tags">
          {tags.map((tag, index) => (
            <span key={index} className="resource-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResourceCard;
