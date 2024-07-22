import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Paper, Typography } from "@mui/material";

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

  const formatedDate = date.format("ddd D MMM");
  const formatedValueDate = valueDate.format("ddd D MMM");

  return (
    <Paper className="flex flex-col gap-2 p-3" elevation={1}>
      <div className="flex justify-between align-middle">
        <Typography className="self-center">{institution}</Typography>
        {pending && <Typography className="self-center">PENDING</Typography>}
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col w-1/5">
          {formatedDate === formatedValueDate ? (
            <div>{formatedValueDate}</div>
          ) : (
            <div>
              <div>{formatedDate}</div>
              <div>{formatedValueDate}</div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-3/5">
          <div>{description}</div>
        </div>
        <div className="w-1/5 flex justify-center self-center">
          <Typography
            className={`${amount > 0 ? "bg-green-200" : "bg-red-200"} p-1 rounded-md`}
          >
            {sign} {absouluteAmount} {currency}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default MovementElement;
