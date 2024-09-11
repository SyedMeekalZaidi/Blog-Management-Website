import React from 'react';
import { Category } from '../hooks/usePosts';
import '../styles/filter.scss'


interface FilterProps {
    categories: string[]; 
    selectedCategories: string[];
    onFilterChange: (category: string) => void;
  }
  
  const Filter: React.FC<FilterProps> = ({ categories, selectedCategories, onFilterChange }) => {
    return (
      <aside className="filter">
        <h2>Categories</h2>
        <form>
          <fieldset>
            <legend className="sr-only">Select categories to filter posts</legend> {/* For accessibility */}
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => onFilterChange(category)}
                    />
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </form>

        <footer className="personal-details">
          <p>By: <br/> <a href="https://www.linkedin.com/in/syed-meekal-hussain-zaidi-0a9b2b276/" target="_blank" rel="noopener noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" className="linkedin-icon"/> Syed Meekal Hussain Zaidi</a></p>
          <ul>
            <li>Monash University CGPA: 3.8/4</li>
            <li>Vice President, Monash Business Club</li>
          </ul>
        </footer>
      </aside>
    );
  };
  
  export default Filter;