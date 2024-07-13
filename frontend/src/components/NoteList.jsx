// src/components/NoteList.js
import React from "react";
import NoteCard from "./NoteCard";

function NoteList({ notes }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
}

export default NoteList;
