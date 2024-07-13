// src/pages/NoteDetail.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNote } from "../context/NoteContext";
import parse from "html-react-parser";

const getFirstLetterCapitalized = (name) => {
  if (!name || typeof name !== 'string') {
    return '';
  }
  return name.charAt(0).toUpperCase();
};

const NoteDetail = () => {
  const { id } = useParams();
  const { note, loading, fetchNote } = useNote();

  useEffect(() => {
    fetchNote(id);
  }, [id, fetchNote]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!note) {
    return <div className="flex justify-center items-center h-screen">Note not found</div>;
  }

  const firstLetter = getFirstLetterCapitalized(note.authorId.fullName);
  const formattedDate = new Date(note.createdAt).toLocaleDateString();

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 mt-14 rounded-md shadow-lg">
        <div className="flex items-center mb-6">
          <div className="bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold">
            {firstLetter}
          </div>
          <div className="ml-4">
            <div className="text-lg font-semibold">{note.authorId.fullName}</div>
            <div className="text-gray-500">{formattedDate}</div>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">{note.title}</h1>
        <div className="text-gray-700 text-lg mb-4">{parse(note.content)}</div>
        {note.mediaLink && (
          <div className="mb-4">
            {note.mediaLink.match(/\.(jpeg|jpg|gif|png)$/i) ? (
              <img
                src={note.mediaLink}
                alt="Note media"
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <video
                src={note.mediaLink}
                controls
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
