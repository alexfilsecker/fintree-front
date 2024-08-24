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

type EditCategoryPropsNew = {
  new: true;
};

type EditCategoryPropsExisting = {
  new: false;
  id: number;
};

type EditCategoryParentProps = EditCategoryPropsNew | EditCategoryPropsExisting;

const EditCategoryParent = (props: EditCategoryParentProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { categories, categoryToCreate } = useAppSelector(
    (state) => state.categories
  );

  let editingParentCategoryId: number;
  let id = -1;

  if (props.new) {
    if (categoryToCreate === null) {
      return <div>ERROR</div>;
    }
    editingParentCategoryId = categoryToCreate.editingParentCategoryId;
  } else {
    id = props.id;
    editingParentCategoryId = categories[id].editingParentCategoryId;
  }

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
        <MenuItem value={0}>None</MenuItem>
        {nonDescendantCategories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EditCategoryParent;
