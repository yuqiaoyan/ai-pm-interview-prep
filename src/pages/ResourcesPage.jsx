import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CompanyList from '../components/CompanyList';
import ResourceCard from '../components/ResourceCard';
import './ResourcesPage.css';
import resourcesData from '../data/resources.json';

function ResourcesPage() {
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      if (!resourcesData || !resourcesData.sections) {
        throw new Error('Invalid resources data format');
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  if (error) {
    return (
      <div className="resources-container">
        <Header />
        <div className="resources-content">
          <div className="error-state">
            <h2>Unable to load resources</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const companiesSection = resourcesData.sections.find(s => s.type === 'companies');
  const resourcesSection = resourcesData.sections.find(s => s.type === 'resources');

  return (
    <div className="resources-container">
      <Header />

      <div className="resources-content">
        <div className="resources-header">
          <h1>AI Resources</h1>
          <p className="resources-subtitle">
            Curated learning resources and career opportunities in AI product management.
          </p>
        </div>

        {companiesSection && (
          <section className="resources-section">
            <h2 className="section-title">{companiesSection.title}</h2>
            <p className="section-description">
              Explore career opportunities at leading AI companies shaping the future of technology.
            </p>
            <CompanyList companies={companiesSection.items} />
          </section>
        )}

        {resourcesSection && (
          <section className="resources-section">
            <h2 className="section-title">{resourcesSection.title}</h2>
            <p className="section-description">
              Deepen your understanding of AI concepts, tools, and best practices.
            </p>

            {resourcesSection.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="category-section">
                <h3 className="category-title">{category.name}</h3>
                <div className="resources-grid">
                  {category.items.map((resource, resourceIndex) => (
                    <ResourceCard
                      key={resourceIndex}
                      title={resource.title}
                      description={resource.description}
                      url={resource.url}
                      tags={resource.tags}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default ResourcesPage;
