// src/components/SortButton.js
import React from "react";

const SortButton = ({ sortOrder, handleSort }) => {
  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={() => handleSort("asc")}
        className={`px-4 py-2 mr-2 ${sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded-full`}
      >
        Sort Asc
      </button>
      <button
        onClick={() => handleSort("desc")}
        className={`px-4 py-2 ${sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded-full`}
      >
        Sort Desc
      </button>
    </div>
  );
};

export default SortButton;
