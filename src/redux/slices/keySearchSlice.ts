import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "Search",
  initialState: {
    booksSearch : {
        idCategory: null,
        keyWord: "",
        minPrice: 0,
        maxPrice: 100000000,
      },
   booksAddEventSearch : {
        idCategory: null,
        keyWord: "",
        minPrice: 0,
        maxPrice: 100000000,
        idEvent:1,
        order:"Đánh giá cao"
      }
  },
  reducers: {
    updateKeySearch: (state, actions) => {
      state.booksSearch = actions.payload;
    },
    updateAddEventKeySearch: (state, actions) => {
      state.booksAddEventSearch = actions.payload;
    },
  },
});

export const { updateKeySearch: updateKeySearch, updateAddEventKeySearch:updateAddEventKeySearch } = cartSlice.actions;
export default cartSlice.reducer;
