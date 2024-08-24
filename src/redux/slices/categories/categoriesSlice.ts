import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  basicFulfilledState,
  basicInitialState,
  basicPendingState,
  basicRejectedState,
  type BasicState,
} from "../basicState";

import {
  createCategory,
  deleteCategory,
  patchCategory,
  requestCategories,
} from "./categoriesActions";

import getIdFromUrl from "@/utils/getIdFromUrl";

export type CategoryApiResponse = {
  id: number;
  name: string;
  parentCategoryId: number | null;
};

export type Category = CategoryApiResponse & {
  editing: boolean;
  editingName: string;
  editingParentCategoryId: number;
  moreExpanded: boolean;
  patchingState: BasicState;
  deletingState: BasicState;
};

type CategoryToCreate = Omit<
  Category,
  | "moreExpanded"
  | "deletingState"
  | "patchingState"
  | "editing"
  | "parentCategoryId"
  | "name"
> & {
  putingState: BasicState;
};

type CategoriesState = {
  categories: Record<number, Category>;
  categoryToCreate: CategoryToCreate | null;
  getCategoriesState: BasicState;
  categoriesEditHash: string;
};

const initialState: CategoriesState = {
  categories: {},
  categoryToCreate: null,
  categoriesEditHash: "",
  getCategoriesState: basicInitialState,
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

type SetCategoryMoreExpanded = {
  categoryId: number;
  moreExpanded: boolean;
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
      if (categoryId === -1) {
        if (state.categoryToCreate === null) {
          console.error(
            "categoryToCreate is null in editing categoryToCreate name"
          );
          return;
        }
        state.categoryToCreate.editingName = editingName;
        return;
      }
      state.categories[categoryId].editingName = editingName;
    },
    setCategoryEditingParentCategoryId: (
      state,
      action: PayloadAction<SetCategoryEditingParentCategoryId>
    ) => {
      const { categoryId, editingParentCategoryId } = action.payload;
      if (categoryId === -1) {
        if (state.categoryToCreate === null) {
          console.error(
            "categoryToCreate is null in editing categoryToCreate parent category"
          );
          return;
        }
        state.categoryToCreate.editingParentCategoryId =
          editingParentCategoryId;
        return;
      }
      state.categories[categoryId].editingParentCategoryId =
        editingParentCategoryId;
    },
    setMoreExpanded: (
      state,
      action: PayloadAction<SetCategoryMoreExpanded>
    ) => {
      const { categoryId, moreExpanded } = action.payload;
      state.categories[categoryId].moreExpanded = moreExpanded;
    },
    beginCategoryCreation: (state) => {
      state.categoryToCreate = {
        id: -1,
        editingName: "",
        editingParentCategoryId: 0,
        putingState: basicInitialState,
      };
    },
    cancelCategoryCreation: (state) => {
      state.categoryToCreate = null;
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
          moreExpanded: false,
          patchingState: basicInitialState,
          deletingState: basicInitialState,
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
    builder.addCase(deleteCategory.pending, (state, action) => {
      const categoryId = getIdFromUrl(action.meta.url, 1);
      state.categories[categoryId].deletingState = basicPendingState;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      if (action.meta.url !== undefined) {
        const categoryId = getIdFromUrl(action.meta.url, 1);
        state.categories[categoryId].deletingState = basicRejectedState;
      }
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const categoryId = getIdFromUrl(action.meta.url, 1);
      state.categories[categoryId].deletingState = basicFulfilledState;
      const grandParentId = state.categories[categoryId].parentCategoryId;
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.categories[categoryId];
      state.categoriesEditHash = hashCategoryEdits(state.categories);
      const childs = Object.values(state.categories).filter(
        (category) => category.parentCategoryId === categoryId
      );
      childs.forEach((child) => {
        state.categories[child.id].parentCategoryId = grandParentId;
      });
    });
    builder.addCase(createCategory.pending, (state) => {
      if (state.categoryToCreate === null) {
        console.error("categoryToCreate is null in createCategory pending");
        return;
      }
      state.categoryToCreate.putingState = basicPendingState;
    });
    builder.addCase(createCategory.rejected, (state) => {
      if (state.categoryToCreate === null) {
        console.error("categoryToCreate is null in createCategory rejected");
        return;
      }
      state.categoryToCreate.putingState = basicRejectedState;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      if (state.categoryToCreate === null) {
        console.error("categoryToCreate is null in createCategory fulfilled");
        return;
      }
      state.categoryToCreate.putingState = basicFulfilledState;
    });
  },
});

export const {
  setEditCategory,
  setCategoryEditingName,
  resetPatchingCategoryState,
  setCategoryEditingParentCategoryId,
  setMoreExpanded,
  beginCategoryCreation,
  cancelCategoryCreation,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
