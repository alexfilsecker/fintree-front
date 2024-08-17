import { Edit } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";

import EditCategory from "./edit-category/EditCategory";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setEditCategory } from "@/redux/slices/categories/categoriesSlice";

type CategoryBoxProps = {
  name: string;
  id: number;
};

const CategoryBox = ({ name, id }: CategoryBoxProps): JSX.Element => {
  const { categories } = useAppSelector((state) => state.categories);
  const editing = categories[id].editing;
  const dispatch = useAppDispatch();

  const handleEdit = (): void => {
    dispatch(setEditCategory({ categoryId: id, editing: true }));
  };

  return (
    <Paper
      className="flex gap-2 w-fit align-middle self-center p-4"
      elevation={4}
    >
      {editing ? (
        <EditCategory id={id} />
      ) : (
        <>
          <div className="whitespace-nowrap self-center">
            {id} - {name}
          </div>
          <IconButton onClick={handleEdit} size="small">
            <Edit />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

export default CategoryBox;
