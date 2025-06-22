import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import sortReducer from './sortSlice';
import ticketsReducer from './ticketsSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
