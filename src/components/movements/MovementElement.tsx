import { Paper, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";

import DateSeciton from "./DateSection";
import DescriptionSection from "./DescriptionSection";
import UpperMovementSection from "./UpperSection";

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
    userDescription,
    pending,
    // id,
  } = movement;

  const [editing, setEditing] = useState(false);

  const absouluteAmount = Math.abs(amount);
  const sign = amount < 0 ? "-" : "+";

  const momentDate = moment(date);
  const momentValueDate = moment(valueDate);

  return (
    <Paper
      className="p-2 flex flex-col gap-2"
      elevation={4}
      // sx={{ bgcolor: colors.commonWealthBg }}
    >
      <UpperMovementSection
        institution={institution}
        pending={pending}
        userDescription={userDescription}
        setEditing={setEditing}
        editing={editing}
      />
      <div className="flex gap-2 justify-between">
        <DateSeciton
          date={momentDate}
          valueDate={momentValueDate}
          editingDescription={editing}
        />
        <DescriptionSection
          description={description}
          userDescription={userDescription}
          editing={editing}
          setEditing={setEditing}
        />
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
