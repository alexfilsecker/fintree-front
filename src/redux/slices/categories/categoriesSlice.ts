import { createSlice } from "@reduxjs/toolkit";

import { type BasicState } from "../basicState";

import { requestCategories } from "./categoriesActions";

export type Category = {
  id: number;
  name: string;
  parentCategoryId: number | null;
};

type CategoriesState = {
  categories: Record<number, Category>;
  getCategoriesState: BasicState;
};

const initialState: CategoriesState = {
  categories: {},
  getCategoriesState: {
    loading: false,
    success: false,
    error: false,
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestCategories.pending, (state) => {
      state.getCategoriesState = {
        loading: true,
        success: false,
        error: false,
      };
    });
    builder.addCase(requestCategories.rejected, (state) => {
      state.getCategoriesState = {
        loading: false,
        success: false,
        error: true,
      };
    });
    builder.addCase(requestCategories.fulfilled, (state, action) => {
      const categories = action.payload.categories;
      categories.forEach((category) => {
        state.categories[category.id] = category;
      });
      state.getCategoriesState = {
        loading: false,
        success: true,
        error: false,
      };
    });
  },
});

export default categoriesSlice.reducer;
