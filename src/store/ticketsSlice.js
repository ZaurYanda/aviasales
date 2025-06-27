import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// slice-level actions, чтобы не было no-use-before-define
const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addTickets(state, action) {
      state.items.push(...action.payload);
    },
    startLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    stopLoading(state) {
      state.status = 'succeeded';
    },
    fetchError(state, action) {
      state.status = 'failed';
      state.error = action.payload || 'Неизвестная ошибка';
    },
  },
});

export const { addTickets, startLoading, stopLoading, fetchError } = ticketsSlice.actions;

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    const { searchId } = await res.json();

    let stop = false;

    while (!stop) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
        if (!response.ok) throw new Error(`Ошибка ${response.status}`);
        // eslint-disable-next-line no-await-in-loop
        const data = await response.json();
        dispatch(addTickets(data.tickets));
        stop = data.stop;
      } catch (err) {
        if (err.message.includes('500')) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => {
            setTimeout(() => {
              r();
            }, 300);
          });
        } else {
          dispatch(fetchError(err.message));
          return rejectWithValue(err.message);
        }
      }
    }

    dispatch(stopLoading());
    return undefined;
  } catch (err) {
    dispatch(fetchError(err.message));
    return rejectWithValue(err.message);
  }
});

ticketsSlice.extraReducers = (builder) => {
  builder.addCase(fetchTickets.pending, (state) => {
    state.items = [];
    state.status = 'loading';
    state.error = null;
  });
};

export default ticketsSlice.reducer;
