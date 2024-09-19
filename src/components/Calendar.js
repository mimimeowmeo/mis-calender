import { useMemo, useState } from "react";
import Cell from "./Cell";
import Header from "./Header";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const createCalendar = (date) => {
  const startOfMonth = date.startOf("month");
  const endOfMonth = date.endOf("month");
  const startDayOfFirstWeek = startOfMonth.startOf("week");
  const endDayOfLastWeek = endOfMonth.endOf("week");
  const calendar = [];

  let currentDay = startDayOfFirstWeek;
  while (
    currentDay.isBefore(endDayOfLastWeek) ||
    currentDay.isSame(endDayOfLastWeek, "day")
  ) {
    calendar.push(currentDay);
    currentDay = currentDay.add(1, "day");
  }
  return calendar;
};
const Calendar = ({ date }) => {
  const [monthDate, setMonthDate] = useState(date);
  const calendar = useMemo(() => createCalendar(monthDate), [monthDate]);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [hoveredDay, setHoveredDay] = useState();
  const preselectionRange = useMemo(
    () =>
      calendar.reduce((acc, day) => {
        if (
          selectedStartDate &&
          !selectedEndDate &&
          hoveredDay &&
          ((hoveredDay.isAfter(selectedStartDate) &&
            day.isAfter(selectedStartDate) &&
            day.isBefore(hoveredDay)) ||
            day.isSame(hoveredDay, "day"))
        ) {
          acc.push(day);
        }
        return acc;
      }, []),
    [selectedStartDate, selectedEndDate, hoveredDay, calendar]
  );
  const selectionRange = useMemo(
    () =>
      calendar.reduce((acc, day) => {
        if (
          (selectedStartDate && day.isSame(selectedStartDate, "day")) ||
          (selectedEndDate && day.isSame(selectedEndDate, "day")) ||
          (selectedStartDate &&
            selectedEndDate &&
            day.isAfter(selectedStartDate) &&
            day.isBefore(selectedEndDate))
        ) {
          acc.push(day);
        }
        return acc;
      }, []),
    [selectedStartDate, selectedEndDate, calendar]
  );
  const handleHover = (day) => {
    setHoveredDay(day);
  };
  const handleLeftClick = (e) => {
    e.preventDefault();
    setMonthDate((prev) => prev.subtract(1, "month"));
  };
  const handleRightClick = (e) => {
    e.preventDefault();
    setMonthDate((prev) => prev.add(1, "month"));
  };
  const handleDayClick = (day) => {
    if (selectedStartDate && selectedEndDate) {
      setSelectedStartDate(day);
      setSelectedEndDate(undefined);
      return;
    }
    if (
      selectedStartDate &&
      (day.isAfter(selectedStartDate) || day.isSame(selectedStartDate))
    ) {
      setSelectedEndDate(day);
    } else {
      setSelectedStartDate(day);
    }
  };

  return (
    <div>
      <Header
        date={monthDate}
        onLeftClick={(e) => handleLeftClick(e)}
        onRightClick={(e) => handleRightClick(e)}
      />
      <div className="grid grid-cols-7 rounded bg-red-300 font-bold">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="flex items-center justify-center w-16 h-16">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {calendar.map((day) => (
          <Cell
            key={day.date() + "+" + day.month()}
            day={day}
            onClick={(day) => handleDayClick(day)}
            active={selectionRange.includes(day)}
            onHover={(day) => handleHover(day)}
            hoverActive={preselectionRange && preselectionRange.includes(day)}
          />
        ))}
      </div>
      <div className="font-bold flex flex-col items-center p-5 text-red-500">
        <span>{selectedStartDate && "Date Selected:"}</span>
        <span>
          {selectedStartDate &&
            `${selectedStartDate.format("DD")} / 
        ${selectedStartDate.format("MM")} / ${selectedStartDate.format("YY")}`}
          {selectedEndDate &&
            ` - 
        ${selectedEndDate.format("DD")} / ${selectedEndDate.format("MM")} /
        ${selectedEndDate.format("YY")}`}
        </span>
      </div>
    </div>
  );
};

export default Calendar;
