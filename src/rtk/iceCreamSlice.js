import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  iceCream: 0,
};

const iceCreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    buyIceCream: (state, action) => {
      state.iceCream += 1;
    },
  },
});

export default iceCreamSlice;
export const { buyIceCream } = iceCreamSlice.actions;
