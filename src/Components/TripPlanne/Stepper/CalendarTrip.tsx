import { FC } from "react";
import { DayPicker, MonthChangeEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../../Styles/Calendar.css";
import { CalendarTripProps } from "../../../Interface";

const CalendarTrip: FC<CalendarTripProps> = ({
  range,
  setRange,
  handleMonthClick,
}) => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const isDayDisabled = (date: Date) => date < minDate;
  return (
    <div className="flex flex-col items-center">
      <p className="text-main-400">
        {range ? (
          <p>
            {range.from?.toLocaleDateString("en-GB")} -{" "}
            {range.to?.toLocaleDateString("en-GB")}
          </p>
        ) : (
          <p>Please Choose Date</p>
        )}
      </p>
      <DayPicker
        mode="range"
        min={2}
        max={7}
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
        onMonthChange={handleMonthClick as unknown as MonthChangeEventHandler}
        fromMonth={range?.from || new Date()}
        disabled={isDayDisabled}
      />
    </div>
  );
};

export default CalendarTrip;
