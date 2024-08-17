import { Button } from "@mui/material";
import { useEffect } from "react";

import DeleteCategory from "./DeleteCategory";
import EditCategoryName from "./EditCategoryName";
import EditCategoryParent from "./EditCategoryParent";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { patchCategory } from "@/redux/slices/categories/categoriesActions";
import {
  resetPatchingCategoryState,
  setCategoryEditingName,
  setCategoryEditingParentCategoryId,
  setEditCategory,
} from "@/redux/slices/categories/categoriesSlice";

type EditCategoryProps = {
  id: number;
};

const EditCategory = ({ id }: EditCategoryProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.categories);
  const { editingName, editingParentCategoryId, patchingState, name } =
    categories[id];

  useEffect(() => {
    if (patchingState.success) {
      dispatch(setEditCategory({ categoryId: id, editing: false }));
      dispatch(resetPatchingCategoryState(id));
    }
  });

  const handleCancelButton = (): void => {
    dispatch(setEditCategory({ categoryId: id, editing: false }));
    dispatch(setCategoryEditingName({ categoryId: id, editingName: name }));
    dispatch(
      setCategoryEditingParentCategoryId({
        categoryId: id,
        editingParentCategoryId: categories[id].parentCategoryId ?? 0,
      })
    );
  };

  const handleSaveButton = (): void => {
    const editParentId =
      editingParentCategoryId === 0 ? null : editingParentCategoryId;
    void dispatch(
      patchCategory({
        id,
        name: editingName,
        parentId: editParentId,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <EditCategoryName id={id} />
      <EditCategoryParent id={id} />
      <DeleteCategory id={id} />
      <div className="flex gap-3 justify-end">
        <Button size="small" variant="outlined" onClick={handleCancelButton}>
          Cancel
        </Button>
        <Button size="small" variant="contained" onClick={handleSaveButton}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditCategory;
