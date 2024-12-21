
import { createStore } from 'redux';
import { notesReducer } from './reduсers'; 

const store = createStore(notesReducer);

export default store;

