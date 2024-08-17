import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { deleteCategory } from "@/redux/slices/categories/categoriesActions";
import { setMoreExpanded } from "@/redux/slices/categories/categoriesSlice";

type DeleteCategoryProps = {
  id: number;
};

const DeleteCategory = ({ id }: DeleteCategoryProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.categories);
  const { moreExpanded } = categories[id];

  const handleExpandMoreButton = (): void => {
    dispatch(setMoreExpanded({ categoryId: id, moreExpanded: !moreExpanded }));
  };

  const handleDeleteButton = (): void => {
    console.log("hooola");
    void dispatch(deleteCategory({ id }));
  };

  return (
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
  );
};

export default DeleteCategory;
