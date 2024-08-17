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
