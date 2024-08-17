import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { patchCategoryName } from "@/redux/slices/categories/categoriesActions";
import {
  resetPatchingCategoryState,
  setCategoryEditingName,
  setEditCategory,
} from "@/redux/slices/categories/categoriesSlice";

type EditCategoryProps = {
  id: number;
};

const EditCategory = ({ id }: EditCategoryProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.categories);
  const { editingName, patchingState, name } = categories[id];

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

  const handleCancelButton = (): void => {
    dispatch(setEditCategory({ categoryId: id, editing: false }));
    dispatch(setCategoryEditingName({ categoryId: id, editingName: name }));
  };

  const handleSaveButton = (): void => {
    void dispatch(patchCategoryName({ id, name: editingName }));
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
          value={categories[id].parentCategoryId ?? 0}
        >
          {otherCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
          <MenuItem value={0}>None</MenuItem>
        </Select>
      </FormControl>
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
