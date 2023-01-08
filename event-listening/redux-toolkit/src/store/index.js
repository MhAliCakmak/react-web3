import { configureStore } from "@reduxjs/toolkit";
import {dataSlice } from "./slicers/data";
import {contractsSlice } from "./slicers/contracts";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    data: dataSlice.reducer,
    contracts: contractsSlice.reducer,

  },

  // Add your middleware here
  middleware: (getDefaultMiddleware) =>
    {
      return getDefaultMiddleware({
        serializableCheck: false,
        
      })
  }
});
