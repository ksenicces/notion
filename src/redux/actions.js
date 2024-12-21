export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';

export const fetchNotes = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/notes');
      const data = await response.json();
      dispatch({ type: FETCH_NOTES_SUCCESS, payload: data });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
};

export const addNote = (note) => ({
  type: 'ADD_NOTE',
  payload: note,
});

export const deleteNote = (noteId) => ({
  type: 'DELETE_NOTE',
  payload: noteId,
});

export const updateNotes = (notes) => ({
  type: 'UPDATE_NOTES',
  payload: notes,
});
export const fetchNotesSuccess = (notes) => ({
  type: 'FETCH_NOTES_SUCCESS',
  payload: notes,
});

export const fetchNotesError = (error) => ({
  type: 'FETCH_NOTES_ERROR',
  error,
});

