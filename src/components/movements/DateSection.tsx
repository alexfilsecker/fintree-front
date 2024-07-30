import { type Moment } from "moment";

type DateSectionProps = {
  date: Moment;
  valueDate: Moment;
};

const DateSeciton = ({ date, valueDate }: DateSectionProps): JSX.Element => {
  const formatedDate = date.format("ddd D MMM");
  const formatedValueDate = valueDate.format("ddd D MMM");

  return (
    <div className="flex flex-col w-1/4">
      {formatedDate === formatedValueDate ? (
        <div>Date: {formatedDate}</div>
      ) : (
        <div className="flex gap-2">
          <div className="flex flex-col">
            <div className="text-right">Date:</div>
            <div className="whitespace-nowrap text-right">VDate:</div>
          </div>
          <div className="flex flex-col">
            <div className="whitespace-nowrap">{formatedDate}</div>
            <div className="whitespace-nowrap">{formatedValueDate}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSeciton;
