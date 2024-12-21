import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const noteId = Number(id);
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  const navigate = useNavigate();

  useEffect(() => {
    if (noteIndex === -1) {
      navigate('/404'); 
    }
  }, [noteIndex, navigate]);

  const [updatedNote, setUpdatedNote] = useState({
    title: notes[noteIndex].title,
    body: notes[noteIndex].body || "",
  });

  const handleUpdateNote = async (e) => {
    e.preventDefault();

    const updatedNoteData = {
      ...updatedNote,
      id: noteId,
      authorId: notes[noteIndex].authorId,
      createdAt: notes[noteIndex].createdAt,
    };

    try {
      const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNoteData),
      });

      if (response.ok) {
        const updatedNotesResponse = await fetch("http://localhost:3000/notes");
        const updatedNotes = await updatedNotesResponse.json();
        setNotes(updatedNotes);
        navigate("/notes");
      } else {
        const errorData = await response.json();
        console.error("Error updating note:", errorData);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center">
        <form onSubmit={handleUpdateNote} className="bg-white p-4 rounded w-full max-w-md">
          <h2 className="text-2xl mb-6 text-center">Edit Note</h2>
          <input
            value={updatedNote.title}
            onChange={(e) => setUpdatedNote({ ...updatedNote, title: e.target.value })}
            className="w-full p-2 mb-4 border rounded bg-gray-200"
            required
          />
          <textarea
            value={updatedNote.body}
            onChange={(e) => setUpdatedNote({ ...updatedNote, body: e.target.value })}
            className="w-full p-2 mb-4 border rounded bg-gray-200"
            rows={4}
            placeholder="Body (optional)"
          />
          <button
            type="submit"
            className="w-full p-2 bg-gray-200 text-black font-semibold hover:bg-gray-300 transition duration-200"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
