import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "Search",
  initialState: {
    booksSearch : {
        idCategory: null,
        keyWord: "",
        minPrice: 0,
        maxPrice: 100000000,
      }
  },
  reducers: {
    updateKeySearch: (state, actions) => {
      state.booksSearch = actions.payload;
    },
  },
});

export const { updateKeySearch: updateKeySearch } = cartSlice.actions;
export default cartSlice.reducer;
