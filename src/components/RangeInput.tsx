import React from "react";
import SelectorInput from "./SelectorInput";

function RangeInput() {
  const [startTime, setStartTime] = React.useState("09:00");
  const [endTime, setEndTime] = React.useState("17:00");

  return (
    <div className="flex gap-2 items-center">
      <SelectorInput time={startTime} setTime={setStartTime} />
      <span>-</span>
      <SelectorInput time={endTime} setTime={setEndTime} />
    </div>
  );
}

export default RangeInput;
