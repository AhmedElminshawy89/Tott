import { createSlice } from "@reduxjs/toolkit";
import { NetworkState } from "../../Interface";

const initialState: NetworkState = {
  isOnline: true,
};

const NetworkSlice = createSlice({
  initialState,
  name: "network",
  reducers: {
    NetworkMode: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { NetworkMode } = NetworkSlice.actions;
export const selectNetwork = (state: { network: NetworkState }) =>
  state.network;
export default NetworkSlice.reducer;
