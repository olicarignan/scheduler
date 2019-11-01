import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  let { appointments, selectedDay, days, getSpotsForDay, setDay } = props;

  const dayList = days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={getSpotsForDay(appointments, days, day.name)}
        selected={day.name === selectedDay}
        setDay={setDay}
      />
    );
  });
  return dayList;
}
