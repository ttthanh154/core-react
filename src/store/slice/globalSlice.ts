import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
  loading: boolean;
  page: { pageSize: number, current: number },
}

const initialState: LoadingState = {
  loading: false,
  page: { pageSize: 10, current: 1 },
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    savePage: (state, action: PayloadAction<any>) => {
      state.page.pageSize = action.payload.pageSize;
      state.page.current = action.payload.currentPage;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading,savePage } = globalSlice.actions;

export default globalSlice.reducer;
