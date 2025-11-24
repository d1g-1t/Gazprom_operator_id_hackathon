import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const searchSlice = createSlice({
  name: "searchvalue",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },

    deleteSearchValue: (state) => {
      state.value = null;
    },
  },
});

export const getSearchValue = (state) => state.search.value;

export const reducer = searchSlice.reducer;
export const { setSearchValue, deleteSearchValue } = searchSlice.actions;

export default reducer;
