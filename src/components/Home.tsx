import { Button, Typography } from "@mui/material";
import { useEffect } from "react";

import Movements from "./movements/Movements";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
  requestScrap,
  requestMovements,
} from "@/redux/slices/movement/movementActions";
import { resetScrap } from "@/redux/slices/movement/movementSlice";

const Home = (): JSX.Element => {
  const { loadingMovements, loadingScrap, successScrap } = useAppSelector(
    (state) => state.movements
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (successScrap) {
      void dispatch(requestMovements());
      dispatch(resetScrap());
    }
  }, [successScrap, dispatch]);

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
        {loadingScrap ? "Loading..." : "Scrap"}
      </Button>
      <Button variant="contained" onClick={handleMovementsClick}>
        {loadingMovements ? "Loading..." : "Movements"}
      </Button>
      <Movements />
    </div>
  );
};

export default Home;
