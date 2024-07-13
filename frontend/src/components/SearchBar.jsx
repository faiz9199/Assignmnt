// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-2xl px-3 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default SearchBar;
