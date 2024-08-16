import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filterReducer'; 

const store = configureStore({
  reducer: {
    filter: filterReducer,
    // Add other reducers here if needed
  },
});

export default store;
