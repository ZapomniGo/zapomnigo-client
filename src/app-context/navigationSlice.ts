import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
  open: boolean;
};

const initalNavState: SliceState = {
    open: false,
};

const navigationSlice = createSlice({
  name: "someSlice",
  initialState: initalNavState,
  reducers: {
    navReducer: (state, action) => {
        state.open = action.payload.open
    }
  },
});

export const { navReducer } = navigationSlice.actions;
export default navigationSlice.reducer;


//declare state
//reducer: state logic
//store