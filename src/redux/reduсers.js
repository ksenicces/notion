const initialState = {
  notes: [], 
  error: null, 
};

export const notesReducer = (state = initialState, action) => {
  console.log('Current state before filtering:', state);
  console.log('Action:', action);
  
  switch (action.type) {
    case 'FETCH_NOTES_SUCCESS':
      return {
        ...state,
        notes: action.payload, 
      };
    case 'FETCH_NOTES_ERROR':
      return {
        ...state,
        error: action.error, 
      };
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.payload], 
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload), 
      };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => 
          note.id === action.payload.id ? action.payload : note 
        ),
      };
    default:
      return state;
  }
};