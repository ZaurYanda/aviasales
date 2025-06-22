// src/store/sortSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    type: 0,
  },
  reducers: {
    setSortType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setSortType } = sortSlice.actions;
export default sortSlice.reducer;
