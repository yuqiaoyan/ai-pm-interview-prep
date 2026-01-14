import './CategoryFilter.css';

function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {
  const handleCategoryClick = (category) => {
    if (category === 'All') {
      onCategoryChange(['All']);
    } else {
      if (selectedCategories.includes('All')) {
        onCategoryChange([category]);
      } else {
        if (selectedCategories.includes(category)) {
          const newSelection = selectedCategories.filter(c => c !== category);
          onCategoryChange(newSelection.length === 0 ? ['All'] : newSelection);
        } else {
          onCategoryChange([...selectedCategories, category]);
        }
      }
    }
  };

  const isSelected = (category) => {
    if (category === 'All') {
      return selectedCategories.includes('All');
    }
    return selectedCategories.includes(category);
  };

  return (
    <div className="category-filter">
      <button
        className={`category-chip ${isSelected('All') ? 'active' : ''}`}
        onClick={() => handleCategoryClick('All')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`category-chip ${isSelected(category) ? 'active' : ''}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
