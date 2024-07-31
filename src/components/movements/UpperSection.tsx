import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";

type UpperMovementSectionProps = {
  institution: string;
  pending: boolean;
  userDescription: string | null;
  setEditing: (editing: boolean) => void;
  editing: boolean;
};

const UpperMovementSection = ({
  institution,
  pending,
  userDescription,
  setEditing,
  editing,
}: UpperMovementSectionProps): JSX.Element => {
  return (
    <div className="flex items-center">
      <Typography className="self-center grow">{institution}</Typography>
      {!pending && userDescription === null && (
        <div className="grow">
          <div className="w-max bg-red-300 rounded-md p-1 text-xs">
            NO USER DESCRIPTION
          </div>
        </div>
      )}
      {pending && (
        <div className="self-center grow">
          <Typography className="bg-yellow-200 w-min rounded-md p-1 text-xs">
            PENDING
          </Typography>
        </div>
      )}
      <div className="grow flex justify-end">
        {!pending && !editing && (
          <IconButton
            size="small"
            onClick={() => {
              setEditing(true);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default UpperMovementSection;
