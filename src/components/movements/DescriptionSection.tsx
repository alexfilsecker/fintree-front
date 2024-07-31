import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

type DescriptionSectionProps = {
  description: string;
  userDescription: string | null;
  editing: boolean;
  setEditing: (editing: boolean) => void;
};

const Wraper = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div className="flex flex-col w-1/2 gap-1">{children}</div>
);

const DescriptionSection = ({
  description,
  userDescription,
  editing,
  setEditing,
}: DescriptionSectionProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = (): void => {
    setExpanded((prev) => !prev);
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
        <TextField multiline label="User Description" size="small" />
        <div className="flex w-min self-end gap-3">
          <Button
            variant="outlined"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained">Save</Button>
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
