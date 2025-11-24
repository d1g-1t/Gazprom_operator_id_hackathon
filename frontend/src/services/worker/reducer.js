import { createSlice } from "@reduxjs/toolkit";
import { loadWorker } from "./actions";

const initialState = {
  worker: null,
};

export const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadWorker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadWorker.fulfilled, (state, action) => {
        state.loading = false;
        state.worker = action.payload;
      });
  },
});

export const selectWorker = (state) => state.worker.worker;
export const selectWorkerLoading = (state) => state.worker.loading;
export const selectWorkerError = (state) => state.worker.error;

export const reducer = workerSlice.reducer;
export default reducer;
