import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type BasicState } from "../basicState";

import { requestCategories } from "./categoriesActions";

export type Category = {
  id: number;
  name: string;
  parentCategoryId: number | null;
};

type CategoriesState = {
  categories: Record<number, Category & { editing: boolean }>;
  getCategoriesState: BasicState;
  categoriesEditHash: string;
};

const initialState: CategoriesState = {
  categories: {},
  categoriesEditHash: "",
  getCategoriesState: {
    loading: false,
    success: false,
    error: false,
  },
};

type SetEditCategoryPayload = {
  categoryId: number;
  editing: boolean;
};

const hashCategoryEdits = (
  categories: Record<number, Category & { editing: boolean }>
): string => {
  return Object.values(categories)
    .map((category) => `${category.id}-${category.editing}`)
    .join(",");
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setEditCategory: (state, action: PayloadAction<SetEditCategoryPayload>) => {
      const { categoryId, editing } = action.payload;
      state.categories[categoryId].editing = editing;
      state.categoriesEditHash = hashCategoryEdits(state.categories);
    },
  },
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
        state.categories[category.id] = { ...category, editing: false };
      });
      state.getCategoriesState = {
        loading: false,
        success: true,
        error: false,
      };
      state.categoriesEditHash = hashCategoryEdits(state.categories);
    });
  },
});

export const { setEditCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
