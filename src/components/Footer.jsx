import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Made and maintained by{' '}
          <a
            href="https://www.linkedin.com/in/bonnie-yu/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Bonnie Yu
          </a>
          {' '} | {' '}
          <a
            href="mailto:bonnieyu.coaching@gmail.com"
            className="footer-link"
          >
            bonnieyu.coaching@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
