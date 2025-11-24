import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  user: null,
  team: null,
  component: null,
  initialNodes: null,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarStatus: (state, action) => {
      state.status = action.payload;
    },

    setSidebarUser: (state, action) => {
      state.user = action.payload;
    },

    setSidebarTeam: (state, action) => {
      state.team = action.payload;
    },

    setSidebarComponent: (state, action) => {
      state.component = action.payload;
    },
  },
});

export const getSidebarStatus = (state) => state.sidebar.status;
export const getSidebarUser = (state) => state.sidebar.user;
export const getSidebarTeam = (state) => state.sidebar.team;
export const getSidebarComponent = (state) => state.sidebar.component;

export const reducer = sidebarSlice.reducer;
export const {
  setSidebarStatus,
  setSidebarUser,
  setSidebarTeam,
  setSidebarComponent,
} = sidebarSlice.actions;

export default reducer;
