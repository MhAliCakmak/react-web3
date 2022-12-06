import { configureStore } from "@reduxjs/toolkit";
import {dataSlice } from "./slicers/data";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    data: dataSlice.reducer,

  },
});
