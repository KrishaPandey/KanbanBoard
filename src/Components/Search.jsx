// components/Search.jsx
import React from 'react';
import './Search.css'; // Import the CSS file

const Search = ({ value, onChange }) => {
  return (
    <div className="searchContainer">
      <div className="searchBar">
        <span className="searchIcon">🔍</span>
        <input
          type="text"
          placeholder="Search cards..."
          className="searchInput"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Search;
