// store.js
import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterReducer';  // On va créer filterSlice après

const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
  //devTools: process.env.NODE_ENV !== 'production', // Activer Redux DevTools seulement en dev
});

export default store;
