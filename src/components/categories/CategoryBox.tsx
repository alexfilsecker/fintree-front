import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import EditCategory from "./EditCategory";

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
    <div className="flex p-2 gap-2 bg-gray-200 w-fit align-middle rounded-md self-center">
      {editing ? (
        <EditCategory id={id} />
      ) : (
        <>
          <div className="whitespace-nowrap self-center">{name}</div>
          <IconButton onClick={handleEdit} size="small">
            <Edit />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default CategoryBox;
