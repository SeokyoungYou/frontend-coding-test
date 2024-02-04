import React from "react";
import SelectorInput from "./SelectorInput";
import { WorkingHour } from "../util/workingHoursUtil";
import { useSetAtom } from "jotai";
import { workingHoursAtom } from "../atom/workingHours";

type SelectorInputProps = {
  workingHour: WorkingHour;
  dayname: string;
};

function RangeInput({ workingHour, dayname }: SelectorInputProps) {
  const [startTime, setStartTime] = React.useState(workingHour.startTime);
  const [endTime, setEndTime] = React.useState(workingHour.endTime);
  const setWorkingHours = useSetAtom(workingHoursAtom);

  const updateWorkingHour = React.useCallback(() => {
    setWorkingHours((prevHours) =>
      prevHours.map((day) =>
        day.dayname === dayname
          ? {
              ...day,
              workingHours: day.workingHours.map((hour) =>
                hour.id === workingHour.id
                  ? {
                      ...hour,
                      startTime,
                      endTime,
                      isValid: startTime <= endTime,
                    }
                  : hour
              ),
            }
          : day
      )
    );
  }, [dayname, setWorkingHours, workingHour.id, startTime, endTime]);

  React.useEffect(() => {
    updateWorkingHour();
  }, [startTime, endTime, updateWorkingHour]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <SelectorInput
          time={startTime}
          setTime={(newTime) => setStartTime(newTime)}
          isError={!workingHour.isValid}
        />
        <span>-</span>
        <SelectorInput
          time={endTime}
          setTime={(newTime) => setEndTime(newTime)}
          isError={!workingHour.isValid}
        />
      </div>
    </div>
  );
}

export default RangeInput;
