import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  image: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getcategories: (state, action) => {},
  },
});
