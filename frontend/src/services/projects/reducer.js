import { createSlice } from "@reduxjs/toolkit";
import { loadProjects } from "./actions";

const initialState = {
  projects: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      });
  },
});

export const selectProjects = (state) => state.projects.projects;
export const selectProjectsLoading = (state) => state.projects.loading;
export const selectProjectsError = (state) => state.projects.error;

export const reducer = projectsSlice.reducer;
export default reducer;
