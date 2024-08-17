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
};

type PatchCategoryNameResponse = {
  message: string;
  id: number;
};

export const patchCategoryName = generateRequest<
  PatchCategoryNameResponse,
  PatchCategoryNamePayload
>("patch", "categories/:id/name");
