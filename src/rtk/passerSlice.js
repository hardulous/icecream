import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCB: "", // For communication with parent mf using cb function
  pubSub: "", // For communication with parent mf using pubSub
};

const passerSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    setDataCB: (state, action) => {
      state.dataCB = action.payload.cb;
    },
    setPubSub: (state, action) => {
      state.pubSub = action.payload.pubSub;
    },
  },
});

export default passerSlice;
export const { setDataCB, setPubSub } = passerSlice.actions;
