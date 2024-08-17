import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setCategoryEditingParentCategoryId } from "@/redux/slices/categories/categoriesSlice";
import { getNonDescendantCategories } from "@/utils/categories";

type EditCategoryParentProps = {
  id: number;
};

const EditCategoryParent = ({ id }: EditCategoryParentProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.categories);
  const { editingParentCategoryId } = categories[id];

  const nonDescendantCategories = getNonDescendantCategories(categories, id);

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

  return (
    <FormControl size="small">
      <InputLabel id="select-label">Parent Category</InputLabel>
      <Select
        labelId="select-label"
        label="Parent Category"
        value={editingParentCategoryId}
        onChange={handleSelectChange}
      >
        {nonDescendantCategories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
        <MenuItem value={0}>None</MenuItem>
      </Select>
    </FormControl>
  );
};

export default EditCategoryParent;
