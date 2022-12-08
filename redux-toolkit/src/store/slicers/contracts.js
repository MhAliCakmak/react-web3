import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eflaToken:null,
  lock:null
};

export const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    setLockContract: (state, action) => {
      state.lock = action.payload;
    },
    setEflaTokenContract: (state, action) => {
      state.eflaToken = action.payload;
    },
    

},
});

// Action creators are generated for each case reducer function
export const { setLockContract,setEflaTokenContract } = contractsSlice.actions;

export default contractsSlice.reducer;
