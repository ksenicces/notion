import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteNote, fetchNotesSuccess, fetchNotesError } from '../redux/actions';
import Header from './Header';
import { useDispatch } from 'react-redux';

const Notes = ({ user, notes = [], deleteNote }) => {
  const dispatch = useDispatch();

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/notes'); 
      const data = await response.json();
      dispatch(fetchNotesSuccess(data)); 
    } catch (error) {
      dispatch(fetchNotesError(error)); 
    }
  };

  useEffect(() => {
    fetchNotes(); 
  }, [dispatch]);

  const userNotes = notes.filter(note => note.authorId === user.id);
  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        dispatch(deleteNote(noteId)); 
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col items-center">
        <div className="mt-16 mb-4 text-center"> 
          <h2 className="text-2xl mt-4 mb-4 font-semibold">Заметки</h2>
          <Link to="/notes/add" className="p-2 bg-gray-200 rounded hover:bg-gray-400 mt-2">Добавить заметку</Link>
        </div>
        <div className="flex-grow overflow-y-auto w-full max-w-md"> 
          <ul className="w-full">
            {userNotes.length === 0 ? (
              <p className="text-center">Заметок не найдено.</p>
            ) : (
              userNotes.map((note) => (
                <li key={note.id} className="flex flex-col justify-between border p-2 mb-2 rounded bg-gray-200">
                  <div>
                    <h3 className="font-bold break-words">{note.title}</h3>
                    <p className="text-gray-700 break-words">{note.body}</p>
                    <p className="text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <Link to={`/notes/${note.id}/edit`} className="text-black hover:underline">✍️ Редактировать</Link>
                    <button onClick={() => handleDeleteNote(note.id)} className="ml-2 text-black hover:underline">🗑 Удалить</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
              }  

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  };
};

const mapDispatchToProps = {
  deleteNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
