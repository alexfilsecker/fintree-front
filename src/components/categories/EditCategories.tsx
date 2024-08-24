import { Button } from "@mui/material";
import { useEffect, useRef } from "react";

import NewCategory from "./NewCategory";
import Tree from "./Tree";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import useReload from "@/hooks/useReload";
import { requestCategories } from "@/redux/slices/categories/categoriesActions";
import { beginCategoryCreation } from "@/redux/slices/categories/categoriesSlice";
import { createCategoryMap, formatMapCategories } from "@/utils/categories";

const EditCategories = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(requestCategories());
  }, [dispatch]);

  const refTree = useRef<Map<number, HTMLDivElement>>(new Map());
  const { categories, categoriesEditHash, categoryToCreate } = useAppSelector(
    (state) => state.categories
  );
  const categoriesMap = createCategoryMap(categories);
  const tree = formatMapCategories(categoriesMap, refTree);

  const reload = useReload(categoriesEditHash);

  const handleAddCategoryButton = (): void => {
    dispatch(beginCategoryCreation());
  };

  if (reload) {
    return <div></div>;
  }

  return (
    <div className="pt-20 flex flex-col justify-center gap-10 overflow-auto">
      {categoryToCreate === null ? (
        <Button onClick={handleAddCategoryButton}>Add Category</Button>
      ) : (
        <NewCategory />
      )}
      <div className="flex gap-3 justify-center overflow-auto">
        {tree.map((child, index) => {
          return (
            <Tree
              id={child.id}
              key={index}
              name={child.name}
              treeChildren={child.treeChildren}
              refs={refTree}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EditCategories;
