import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: true,
  noTransfers: true,
  oneTransfer: true,
  twoTransfers: true,
  threeTransfers: true,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleFilter(state, action) {
      const { filterName } = action.payload;

      if (filterName === 'all') {
        const newValue = !state.all;
        state.all = newValue;
        state.noTransfers = newValue;
        state.oneTransfer = newValue;
        state.twoTransfers = newValue;
        state.threeTransfers = newValue;
      } else {
        state[filterName] = !state[filterName];
        const allSelected = state.noTransfers && state.oneTransfer && state.twoTransfers && state.threeTransfers;
        state.all = allSelected;
      }
    },
  },
});

export const { toggleFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
