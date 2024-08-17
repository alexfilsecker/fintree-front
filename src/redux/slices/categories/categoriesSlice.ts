import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  basicFulfilledState,
  basicInitialState,
  basicPendingState,
  basicRejectedState,
  type BasicState,
} from "../basicState";

import { patchCategoryName, requestCategories } from "./categoriesActions";

import getIdFromUrl from "@/utils/getIdFromUrl";

export type CategoryApiResponse = {
  id: number;
  name: string;
  parentCategoryId: number | null;
};

type Category = CategoryApiResponse & {
  editing: boolean;
  editingName: string;
  patchingState: BasicState;
};

type CategoriesState = {
  categories: Record<number, Category>;
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

type SetCategoryEditingNamePayload = {
  categoryId: number;
  editingName: string;
};

const hashCategoryEdits = (
  categories: Record<number, CategoryApiResponse & { editing: boolean }>
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
    setCategoryEditingName: (
      state,
      action: PayloadAction<SetCategoryEditingNamePayload>
    ) => {
      const { categoryId, editingName } = action.payload;
      state.categories[categoryId].editingName = editingName;
    },
    resetPatchingCategoryState: (state, action: PayloadAction<number>) => {
      state.categories[action.payload].patchingState = basicInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestCategories.pending, (state) => {
      state.getCategoriesState = basicPendingState;
    });
    builder.addCase(requestCategories.rejected, (state) => {
      state.getCategoriesState = basicRejectedState;
    });
    builder.addCase(requestCategories.fulfilled, (state, action) => {
      const categories = action.payload.categories;
      categories.forEach((category) => {
        state.categories[category.id] = {
          ...category,
          editing: false,
          editingName: category.name,
          patchingState: basicInitialState,
        };
      });
      state.getCategoriesState = basicFulfilledState;
      state.categoriesEditHash = hashCategoryEdits(state.categories);
    });
    builder.addCase(patchCategoryName.pending, (state, action) => {
      const movementId = getIdFromUrl(action.meta.url, 1);
      state.categories[movementId].patchingState = basicPendingState;
    });
    builder.addCase(patchCategoryName.rejected, (state, action) => {
      if (action.meta.url !== undefined) {
        const movementId = getIdFromUrl(action.meta.url, 1);
        state.categories[movementId].patchingState = basicRejectedState;
      }
    });
    builder.addCase(patchCategoryName.fulfilled, (state, action) => {
      const movementId = getIdFromUrl(action.meta.url, 1);
      state.categories[movementId].patchingState = basicFulfilledState;
      state.categories[movementId].name = action.meta.arg.name;
    });
  },
});

export const {
  setEditCategory,
  setCategoryEditingName,
  resetPatchingCategoryState,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
