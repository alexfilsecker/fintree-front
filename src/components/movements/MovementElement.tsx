import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Paper, Typography } from "@mui/material";

import DateSeciton from "./DateSection";

import { type Movement } from "@/redux/slices/movement/movementSlice";

type MovementElementProps = {
  movement: Movement;
};

const MovementElement = ({ movement }: MovementElementProps): JSX.Element => {
  const {
    institution,
    amount,
    currency,
    date,
    valueDate,
    description,
    pending,
  } = movement;

  const absouluteAmount = Math.abs(amount);
  const sign = amount < 0 ? "-" : "+";

  return (
    <Paper className="flex flex-col gap-2 p-3" elevation={1}>
      <div className="flex justify-between align-middle">
        <Typography className="self-center">{institution}</Typography>
        {pending && <Typography className="self-center">PENDING</Typography>}
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </div>
      <div className="flex gap-2 justify-between">
        <DateSeciton date={date} valueDate={valueDate} />
        <div className="flex flex-col w-1/2">
          <div>{description}</div>
        </div>
        <div className="w-1/5 flex justify-center self-center">
          <Typography
            className={`${amount > 0 ? "bg-green-200" : "bg-red-200"} p-1 rounded-md`}
          >
            {sign} ${absouluteAmount} {currency}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default MovementElement;
