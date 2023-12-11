import { configureStore } from "@reduxjs/toolkit";
import iceCreamSlice from "./iceCreamSlice";
import passerSlice from "./passerSlice";

const store = configureStore({
  reducer: {
    iceCream: iceCreamSlice.reducer,
    dataPasser: passerSlice.reducer,
  },
  middleware: (getDefaultMid) => {
    return getDefaultMid({
      serializableCheck: false,
    });
  },
});

export default store;
