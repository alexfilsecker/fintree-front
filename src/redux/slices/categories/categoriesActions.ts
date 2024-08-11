import { type Category } from "./categoriesSlice";

import generateRequest from "@/redux/generalActions";

type CategoriesResponse = {
  categories: Category[];
};

export const requestCategories = generateRequest<CategoriesResponse>(
  "get",
  "categories"
);
