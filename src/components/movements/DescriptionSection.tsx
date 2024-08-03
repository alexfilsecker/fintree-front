import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

import { useAppDispatch } from "@/hooks/state";
import { patchUserDescription } from "@/redux/slices/movement/movementActions";
import { type BasicState } from "@/redux/slices/movement/movementSlice";

type DescriptionSectionProps = {
  movementId: number;
  description: string;
  userDescription: string | null;
  userDescriptionState: BasicState;
  editing: boolean;
  setEditing: (editing: boolean) => void;
};

const Wraper = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div className="flex flex-col w-1/2 gap-1">{children}</div>
);

const DescriptionSection = ({
  movementId,
  description,
  userDescription,
  userDescriptionState,
  editing,
  setEditing,
}: DescriptionSectionProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const [newUserDescription, setNewUserDescription] = useState(
    userDescription ?? ""
  );

  const handleExpand = (): void => {
    setExpanded((prev) => !prev);
  };

  const dispatch = useAppDispatch();

  const handleSave = (): void => {
    console.log("\nDISPATCHING");
    void dispatch(
      patchUserDescription({
        id: movementId,
        userDescription: newUserDescription,
      })
    );
    console.log("DISPATCHED\n");
  };

  const descriptionDiv = (
    <div>
      <span className="font-bold">Bank Description: </span>
      {description}
    </div>
  );

  if (editing) {
    return (
      <Wraper>
        <TextField
          multiline
          label="User Description"
          size="small"
          value={newUserDescription}
          onChange={(e) => {
            setNewUserDescription(e.target.value);
          }}
        />
        <div className="flex w-min self-end gap-3">
          <Button
            variant="outlined"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={newUserDescription === ""}
          >
            Save
          </Button>
        </div>
        {descriptionDiv}
      </Wraper>
    );
  }

  if (userDescription === null) {
    return <Wraper>{descriptionDiv}</Wraper>;
  }

  return (
    <Wraper>
      {expanded ? (
        <>
          <div>{userDescription}</div>
          {descriptionDiv}
        </>
      ) : (
        <div>{userDescription}</div>
      )}
      <Button
        onClick={handleExpand}
        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
        size="small"
        variant="text"
        className="w-min self-end whitespace-nowrap"
      >
        {expanded ? "less" : "Show Bank Description"}
      </Button>
    </Wraper>
  );
};

export default DescriptionSection;
