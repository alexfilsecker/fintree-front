import { Button, Typography } from "@mui/material";

import Movements from "./movements";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
  requestScrap,
  requestMovements,
} from "@/redux/slices/movement/movementActions";

const Home = (): JSX.Element => {
  const { loadingMovements } = useAppSelector((state) => state.movements);

  const dispatch = useAppDispatch();

  const handleScrapClick = (): void => {
    void dispatch(requestScrap());
  };

  const handleMovementsClick = (): void => {
    console.log("sement");
    void dispatch(requestMovements());
  };

  return (
    <div className="flex flex-col align-middle gap-5">
      <Typography variant="h1">AFP</Typography>
      <Button variant="contained" onClick={handleScrapClick}>
        Scrap
      </Button>
      <Button variant="contained" onClick={handleMovementsClick}>
        {loadingMovements ? "Loading..." : "Movements"}
      </Button>
      <Movements />
    </div>
  );
};

export default Home;
