// src/pages/CreateNote.js
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { useNote } from '../context/NoteContext';

const CreateNote = () => {
  const editor = useRef(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [displayedMedia, setDisplayedMedia] = useState(null);

  const { createNote } = useNote();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createNote(title, content, mediaLink);
      setTitle('');
      setContent('');
      setMediaLink('');
      setDisplayedMedia(null);
    } catch (error) {
      console.error("Failed to create note", error);
    }
  };

  const handleAddMedia = () => {
    if (mediaLink) {
      if (isValidUrl(mediaLink)) {
        setDisplayedMedia(mediaLink);
      } else {
        alert('Invalid URL. Please enter a valid image or video link.');
      }
    }
  };

  const isValidUrl = (url) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-zA-Z0-9$-_.+!*\'(),]|(%[0-9a-fA-F]{2})){1,256}\\.){1,256}' +
        '[a-zA-Z]{2,6}\\b)(:[0-9]{1,5})?(\\/.*)?$',
      'i'
    );
    return !!pattern.test(url);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Note</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">
            Content
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="mediaLink">
            Image / Video Link
          </label>
          <input
            id="mediaLink"
            type="text"
            value={mediaLink}
            onChange={(e) => setMediaLink(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="button"
            onClick={handleAddMedia}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            ADD
          </button>
        </div>
        {displayedMedia && (
          <div className="mb-4">
            {displayedMedia.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
              <img
                src={displayedMedia}
                alt="Preview"
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <video
                src={displayedMedia}
                controls
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
