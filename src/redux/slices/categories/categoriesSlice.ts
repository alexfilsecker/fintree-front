import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  basicFulfilledState,
  basicInitialState,
  basicPendingState,
  basicRejectedState,
  type BasicState,
} from "../basicState";

import { patchCategory, requestCategories } from "./categoriesActions";

import getIdFromUrl from "@/utils/getIdFromUrl";

export type CategoryApiResponse = {
  id: number;
  name: string;
  parentCategoryId: number | null;
};

type Category = CategoryApiResponse & {
  editing: boolean;
  editingName: string;
  editingParentCategoryId: number;
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

type SetCategoryEditingParentCategoryId = {
  categoryId: number;
  editingParentCategoryId: number;
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
    resetPatchingCategoryState: (state, action: PayloadAction<number>) => {
      state.categories[action.payload].patchingState = basicInitialState;
    },
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
    setCategoryEditingParentCategoryId: (
      state,
      action: PayloadAction<SetCategoryEditingParentCategoryId>
    ) => {
      const { categoryId, editingParentCategoryId } = action.payload;
      state.categories[categoryId].editingParentCategoryId =
        editingParentCategoryId;
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
          editingParentCategoryId: category.parentCategoryId ?? 0,
          patchingState: basicInitialState,
        };
      });
      state.getCategoriesState = basicFulfilledState;
      state.categoriesEditHash = hashCategoryEdits(state.categories);
    });
    builder.addCase(patchCategory.pending, (state, action) => {
      const movementId = getIdFromUrl(action.meta.url, 1);
      state.categories[movementId].patchingState = basicPendingState;
    });
    builder.addCase(patchCategory.rejected, (state, action) => {
      if (action.meta.url !== undefined) {
        const movementId = getIdFromUrl(action.meta.url, 1);
        state.categories[movementId].patchingState = basicRejectedState;
      }
    });
    builder.addCase(patchCategory.fulfilled, (state, action) => {
      const movementId = getIdFromUrl(action.meta.url, 1);
      state.categories[movementId].patchingState = basicFulfilledState;
      state.categories[movementId].name = action.meta.arg.name;
      state.categories[movementId].parentCategoryId = action.meta.arg.parentId;
    });
  },
});

export const {
  setEditCategory,
  setCategoryEditingName,
  resetPatchingCategoryState,
  setCategoryEditingParentCategoryId,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
