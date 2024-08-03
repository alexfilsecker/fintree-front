import { Paper } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";

import MovementElement from "./MovementElement";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { requestMovements } from "@/redux/slices/movement/movementActions";

const Movements = (): JSX.Element => {
  const { movements } = useAppSelector((state) => state.movements);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(requestMovements());
  }, [dispatch]);

  const sortedMovements = Object.values(movements).sort((a, b) =>
    moment(b.valueDate).diff(moment(a.valueDate))
  );

  return (
    <Paper className="p-10 flex flex-col gap-2">
      {sortedMovements.map((movement, index) => (
        <MovementElement movement={movement} key={index} />
      ))}
    </Paper>
  );
};

export default Movements;
