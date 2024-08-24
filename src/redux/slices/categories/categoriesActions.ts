import { type CategoryApiResponse } from "./categoriesSlice";

import generateRequest from "@/redux/generalActions";

type CategoriesResponse = {
  categories: CategoryApiResponse[];
};

export const requestCategories = generateRequest<CategoriesResponse>(
  "get",
  "categories"
);

type PatchCategoryNamePayload = {
  id: number;
  name: string;
  parentId: number | null;
};

export const patchCategory = generateRequest<unknown, PatchCategoryNamePayload>(
  "patch",
  "categories/:id"
);

type DeleteCategoryPayload = {
  id: number;
};

export const deleteCategory = generateRequest<unknown, DeleteCategoryPayload>(
  "delete",
  "categories/:id"
);

type CreateCategoryPayload = {
  name: string;
  parentId: number | null;
};

export const createCategory = generateRequest<unknown, CreateCategoryPayload>(
  "put",
  "categories"
);
