import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
  loading: boolean;
  page: { pageSize: number; current: number };
  active: boolean;
  reload: boolean;
}

const initialState: LoadingState = {
  loading: false,
  page: { pageSize: 5, current: 1 },
  active: false,
  reload: false,
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
    resetPage: (state) => {
      state.page.current = 1;
    },
    active: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    reload:  (state, action: PayloadAction<boolean>) => {
      state.reload = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading, savePage, resetPage, active, reload } = globalSlice.actions;

export default globalSlice.reducer;
