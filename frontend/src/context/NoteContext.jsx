// src/context/NoteContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedNotes = [...notes].sort((a, b) => {
      if (order === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setNotes(sortedNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createNote = async (title, content, mediaLink) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/note',
        { title, content, mediaLink },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Failed to create note", error);
      throw error;
    }
  };

  const fetchNote = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/note/${id}`);
      setNote(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the note:", error);
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider value={{
      notes: filteredNotes,
      setNotes,
      searchTerm,
      setSearchTerm,
      sortOrder,
      handleSort,
      createNote,
      fetchNote,
      note,
      loading,
    }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => useContext(NoteContext);
