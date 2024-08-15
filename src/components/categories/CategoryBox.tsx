import { Edit } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";

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

  return (
    <div className="flex p-2 gap-2 bg-gray-200 w-min align-middle rounded-md self-center">
      {editing ? (
        <div className="flex flex-col gap-3 w-80">
          <TextField size="small" />
          <div className="flex gap-3 justify-end">
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                dispatch(setEditCategory({ categoryId: id, editing: false }));
              }}
            >
              Cancel
            </Button>
            <Button size="small" variant="contained">
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="whitespace-nowrap self-center">{name}</div>
          <IconButton
            onClick={() => {
              dispatch(setEditCategory({ categoryId: id, editing: true }));
            }}
            size="small"
          >
            <Edit />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default CategoryBox;
