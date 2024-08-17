import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
  deleteCategory,
  patchCategory,
} from "@/redux/slices/categories/categoriesActions";
import {
  resetPatchingCategoryState,
  setCategoryEditingName,
  setCategoryEditingParentCategoryId,
  setEditCategory,
  setMoreExpanded,
} from "@/redux/slices/categories/categoriesSlice";

type EditCategoryProps = {
  id: number;
};

const EditCategory = ({ id }: EditCategoryProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.categories);
  const {
    editingName,
    editingParentCategoryId,
    patchingState,
    name,
    moreExpanded,
  } = categories[id];

  const otherCategories = Object.values(categories).filter((category) => {
    return category.id !== id;
  });

  useEffect(() => {
    if (patchingState.success) {
      dispatch(setEditCategory({ categoryId: id, editing: false }));
      dispatch(resetPatchingCategoryState(id));
    }
  });

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(
      setCategoryEditingName({
        categoryId: id,
        editingName: e.target.value,
      })
    );
  };

  const handleSelectChange = (e: SelectChangeEvent<number>): void => {
    const value = e.target.value;
    if (typeof value === "string") {
      return;
    }
    dispatch(
      setCategoryEditingParentCategoryId({
        categoryId: id,
        editingParentCategoryId: value,
      })
    );
  };

  const handleExpandMoreButton = (): void => {
    dispatch(setMoreExpanded({ categoryId: id, moreExpanded: !moreExpanded }));
  };

  const handleDeleteButton = (): void => {
    console.log("hooola");
    void dispatch(deleteCategory({ id }));
  };

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
      <TextField
        size="small"
        value={editingName}
        onChange={handleTextFieldChange}
        label="Category Name"
      />
      <FormControl size="small">
        <InputLabel id="select-label">Parent Category</InputLabel>
        <Select
          labelId="select-label"
          label="Parent Category"
          value={editingParentCategoryId}
          onChange={handleSelectChange}
        >
          {otherCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
          <MenuItem value={0}>None</MenuItem>
        </Select>
      </FormControl>
      <div className="flex flex-col gap-3">
        {moreExpanded && (
          <Button variant="outlined" color="error" onClick={handleDeleteButton}>
            Delete
          </Button>
        )}
        <div className="flex justify-end">
          <Button
            size="small"
            endIcon={moreExpanded ? <ExpandLess /> : <ExpandMore />}
            onClick={handleExpandMoreButton}
            className="px-4"
          >
            {moreExpanded ? "Less" : "More"}
          </Button>
        </div>
      </div>
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
