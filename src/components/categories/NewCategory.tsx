import { Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";

import EditCategoryName from "./edit-category/EditCategoryName";
import EditCategoryParent from "./edit-category/EditCategoryParent";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
  createCategory,
  requestCategories,
} from "@/redux/slices/categories/categoriesActions";
import { cancelCategoryCreation } from "@/redux/slices/categories/categoriesSlice";
// import EditCategoryParent from "./edit-category/EditCategoryParent";

const NewCategory = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { categoryToCreate } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (categoryToCreate === null) {
      console.error("categoryToCreate is null in NewCategory useEffect");
      return;
    }
    if (categoryToCreate.putingState.success) {
      void dispatch(requestCategories());
      dispatch(cancelCategoryCreation());
    }
  });

  const handleCancel = (): void => {
    dispatch(cancelCategoryCreation());
  };

  const handleSave = (): void => {
    if (categoryToCreate === null) {
      console.error("categoryToCreate is null in NewCategory handleSave");
      return;
    }
    let parentId: number | null = categoryToCreate.editingParentCategoryId;
    if (parentId === 0) {
      parentId = null;
    }

    void dispatch(
      createCategory({
        name: categoryToCreate.editingName,
        parentId,
      })
    );
  };

  return (
    <Paper
      className="flex flex-col w-fit align-middle self-center p-4 gap-4"
      elevation={4}
    >
      <Typography variant="h5">New Category</Typography>
      <EditCategoryName new />
      <EditCategoryParent new />
      <div className="flex gap-2 justify-end">
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Paper>
  );
};

export default NewCategory;
