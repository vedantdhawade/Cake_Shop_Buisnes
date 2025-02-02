import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  firstname: "",
  lastname: "",
  email: "",
  address_details: [],
  shopping_cart: [],
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.address_details = action.payload.address_details;
      state.shopping_cart = action.payload.shopping_cart;
      state.role = action.payload.role;
    },
    removeUserDetails: (state, action) => {
      state._id = "";
      state.firstname = "";
      state.email = "";
      state.address_details = [];
      state.shopping_cart = [];
      state.lastname = "";
      state.role = "";
    },
  },
});

export const { setUser, removeUserDetails } = userSlice.actions;
export default userSlice.reducer;
