import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    const { searchId } = await res.json();

    const allTickets = [];
    let stop = false;

    while (!stop) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
        if (!response.ok) throw new Error(`Ошибка ${response.status}`);
        // eslint-disable-next-line no-await-in-loop
        const data = await response.json();
        allTickets.push(...data.tickets);
        stop = data.stop;
      } catch (err) {
        if (err.message.includes('500')) {
          // eslint-disable-next-line no-continue
          continue;
        } else {
          return rejectWithValue(err.message);
        }
      }
    }

    return allTickets;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.items = [];
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export default ticketsSlice.reducer;
