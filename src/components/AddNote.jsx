import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/actions";

const AddNote = ({ user }) => {
  const [newNote, setNewNote] = useState({ title: "", body: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateNote = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    const note = {
      id: Date.now(),
      authorId: user.id,
      title: newNote.title,
      body: newNote.body || "",
      createdAt: Date.now(),
      
    };

    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        dispatch(addNote(note));

        navigate("/notes");
      } else {
        const errorData = await response.json();
        console.error("Failed to create note:", errorData);
      }
    } catch (error) {
      console.error("Error creating note", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleCreateNote}
        className="bg-white p-4 rounded w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl mb-6 text-center">Add Note</h2>
        <input
          name="title"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="w-full p-2 mb-4 border rounded bg-gray-200"
          required
        />
        <textarea
          name="body"
          placeholder="Body (optional)"
          value={newNote.body}
          onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
          className="w-full p-2 mb-4 border rounded bg-gray-200"
          rows={4}
        />
        <button
          type="submit"
          className="w-full p-2 bg-gray-200 text-black font-semibold hover:bg-gray-300 transition duration-200"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
