import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button } from "@mui/material";
import { type Moment } from "moment";
import { useEffect, useState } from "react";

type DateSectionProps = {
  date: Moment;
  valueDate: Moment;
  editingDescription: boolean;
};

const Wraper = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div className="flex flex-col w-1/5 gap-1 whitespace-nowrap">{children}</div>
);

const DateSeciton = ({
  date,
  valueDate,
  editingDescription,
}: DateSectionProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(editingDescription);
  }, [editingDescription, setExpanded]);

  const formatedDate = date.format("ddd D MMM");
  const formatedValueDate = valueDate.format("ddd D MMM");

  const handleExpand = (): void => {
    setExpanded((prev) => !prev);
  };

  if (formatedDate === formatedValueDate) {
    return (
      <Wraper>
        <div className="whitespace-nowrap">
          <span className="font-bold">Date: </span>
          {formatedDate}
        </div>
      </Wraper>
    );
  }

  return (
    <Wraper>
      {expanded ? (
        <div className="flex gap-1">
          <div className="flex flex-col">
            <div className="text-right font-bold">Date:</div>
            <div className="whitespace-nowrap text-right font-bold">VDate:</div>
          </div>
          <div className="flex flex-col">
            <div className="whitespace-nowrap">{formatedDate}</div>
            <div className="whitespace-nowrap">{formatedValueDate}</div>
          </div>
        </div>
      ) : (
        <div className="whitespace-nowrap">
          <span className="font-bold">Date: </span>
          {formatedValueDate}
        </div>
      )}
      <Button
        size="small"
        onClick={handleExpand}
        variant="text"
        className="w-min self-end p-1"
        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
      >
        {expanded ? "Less" : "More"}
      </Button>
    </Wraper>
  );
};

export default DateSeciton;
