import React from "react";
import { useForm, Controller } from "react-hook-form";
import SelectorInput from "./SelectorInput";
import { WorkingHour } from "../util/workingHoursUtil";
import { useSetAtom } from "jotai";
import { workingHoursAtom } from "../atom/workingHours";

type SelectorInputProps = {
  workingHour: WorkingHour;
  dayname: string;
};

function RangeInput({ workingHour, dayname }: SelectorInputProps) {
  const { control, watch, handleSubmit } = useForm<WorkingHour>({
    defaultValues: workingHour,
    mode: "onChange",
  });

  const watchStartTime = watch("startTime");
  const watchEndTime = watch("endTime");
  const setWorkingHours = useSetAtom(workingHoursAtom);

  const updateWorkingHour = React.useCallback(
    (newStartTime: string, newEndTime: string) => {
      setWorkingHours((prevHours) =>
        prevHours.map((day) =>
          day.dayname === dayname
            ? {
                ...day,
                workingHours: day.workingHours.map((hour) =>
                  hour.id === workingHour.id
                    ? {
                        ...hour,
                        startTime: newStartTime,
                        endTime: newEndTime,
                        isValid: newStartTime <= newEndTime,
                      }
                    : hour
                ),
              }
            : day
        )
      );
    },
    [dayname, setWorkingHours, workingHour.id]
  );

  React.useEffect(() => {
    if (watchStartTime && watchEndTime) {
      updateWorkingHour(watchStartTime, watchEndTime);
    }
  }, [watchStartTime, watchEndTime, updateWorkingHour]);

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(() => {})}
        className="flex gap-2 items-center"
      >
        <Controller
          name="startTime"
          control={control}
          render={({ field }) => (
            <SelectorInput
              time={field.value}
              setTime={field.onChange}
              isError={!workingHour.isValid}
            />
          )}
        />
        <span>-</span>
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <SelectorInput
              time={field.value}
              setTime={field.onChange}
              isError={!workingHour.isValid}
            />
          )}
        />
      </form>
    </div>
  );
}

export default RangeInput;
