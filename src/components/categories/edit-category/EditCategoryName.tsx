import { TextField } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setCategoryEditingName } from "@/redux/slices/categories/categoriesSlice";

type EditCategoryPropsNew = {
  new: true;
};

type EditCategoryPropsExisting = {
  new: false;
  id: number;
};

type EditCategoryNameProps = EditCategoryPropsNew | EditCategoryPropsExisting;

const EditCategoryName = (props: EditCategoryNameProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { categories, categoryToCreate } = useAppSelector(
    (state) => state.categories
  );

  let editingName: string;
  let id = -1;

  if (props.new) {
    if (categoryToCreate === null) {
      return <div>ERROR</div>;
    }
    editingName = categoryToCreate.editingName;
  } else {
    id = props.id;
    editingName = categories[id].editingName;
  }

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
