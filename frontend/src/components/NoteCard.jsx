// src/components/NoteCard.js
import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function NoteCard({ note }) {
  const trimContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length <= wordLimit) return content;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const trimmedContent = trimContent(note.content, 15);

  return (
    <Link to={`/note/${note._id}`} className="block w-full max-w-2xl p-4 bg-white rounded-md border border-slate-200 sm:w-full">
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-full overflow-hidden bg-gray-200 mr-3 text-gray-600 font-bold text-xl">
          {note.authorId.fullName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-gray-700 font-semibold">{note.authorId.fullName}</p>
          <p className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <h3 className="text-2xl font-bold ml-12">{note.title}</h3>
      <div className="mt-3 text-gray-600 ml-12">
        {parse(trimmedContent)}
      </div>
    </Link>
  );
}

export default NoteCard;
