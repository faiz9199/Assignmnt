// src/pages/Home.js
import React from "react";
import NoteList from "../components/NoteList";
import AddButton from "../components/AddButton";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import { useNote } from "../context/NoteContext";

function Home() {
  const { notes, searchTerm, setSearchTerm, sortOrder, handleSort } = useNote();

  return (
    <div className="relative container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mt-14 mb-8">My Notes</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortButton sortOrder={sortOrder} handleSort={handleSort} />
      <NoteList notes={notes} />
      <AddButton />
    </div>
  );
}

export default Home;
