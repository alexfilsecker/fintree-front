import { TextField } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setCategoryEditingName } from "@/redux/slices/categories/categoriesSlice";

type EditCategoryNameProps = {
  id: number;
};

const EditCategoryName = ({ id }: EditCategoryNameProps): JSX.Element => {
  const { categories } = useAppSelector((state) => state.categories);
  const { editingName } = categories[id];

  const dispatch = useAppDispatch();

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

  return (
    <TextField
      size="small"
      value={editingName}
      onChange={handleTextFieldChange}
      label="Category Name"
    />
  );
};

export default EditCategoryName;
