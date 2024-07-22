import { Paper } from "@mui/material";

import MovementElement from "./movementElement";

import { useAppSelector } from "@/hooks/state";

const Movements = (): JSX.Element => {
  const { movements } = useAppSelector((state) => state.movements);

  return (
    <Paper className="p-10 flex flex-col gap-2">
      {movements.map((movement, index) => (
        <MovementElement movement={movement} key={index} />
      ))}
    </Paper>
  );
};

export default Movements;
