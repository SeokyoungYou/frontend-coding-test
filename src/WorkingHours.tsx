import { ChevronDown, Plus, Trash2 } from "lucide-react";
import RangeInput from "./components/RangeInput";
import { initialWorkingHours, workingHoursAtom } from "./atom/workingHours";

import { useAtom } from "jotai";
import { WORKING_HOURS_KEY, WeekDays } from "./util/workingHoursUtil";
import { v4 as uuidv4 } from "uuid";
import { useResetAtom } from "jotai/utils";
import isEqual from "lodash.isequal";

function WorkingHours() {
  const [workingHours, setWorkingHours] = useAtom(workingHoursAtom);
  const resetWorkingHours = useResetAtom(workingHoursAtom);
  const hasWorkingHoursChanged = !isEqual(workingHours, initialWorkingHours);

  const addWorkingHour = (dayName: WeekDays) => {
    setWorkingHours((prevHours) =>
      prevHours.map((day) =>
        day.dayname === dayName
          ? {
              ...day,
              workingHours: [
                ...day.workingHours,
                { id: uuidv4(), startTime: "09:00", endTime: "17:00" },
              ],
            }
          : day
      )
    );
  };

  const deleteWorkingHour = (dayName: WeekDays, workingHourId: string) => {
    setWorkingHours((prevHours) =>
      prevHours.map((day) =>
        day.dayname === dayName
          ? {
              ...day,
              workingHours: day.workingHours.filter(
                (workingHour) => workingHour.id !== workingHourId
              ),
            }
          : day
      )
    );
  };

  return (
    <div>
      <h1>2번 과제 - WorkingHours</h1>
      <section className="flex mt-16 px-12 justify-center gap-12">
        <span className=" flex-none w-2/10">Working hour</span>
        <div className="flex flex-col flex-grow w-8/10 gap-2">
          <div>
            <div
              className={`pb-4 flex items-center justify-between w-full ${borderBottom}`}
            >
              <span className="font-semibold">Set your weekly hours</span>
              <ChevronDown className=" text-gray-600" size={20} />
            </div>
            <ul>
              {workingHours.map((day) => (
                <li
                  className={`${borderBottom}  gap-4  flex py-4`}
                  key={day.dayname}
                >
                  <span className="pt-2 w-28 text-start">{day.dayname}</span>

                  <div className="flex flex-col gap-4">
                    {day.workingHours.length > 0 ? (
                      <>
                        {day.workingHours.map((workingHour) => (
                          <div
                            className="flex items-center gap-6"
                            key={workingHour.id}
                          >
                            <RangeInput />
                            <Trash2
                              className="cursor-pointer text-gray-600"
                              size={20}
                              onClick={() =>
                                deleteWorkingHour(day.dayname, workingHour.id)
                              }
                            />

                            <Plus
                              className="cursor-pointer text-gray-600"
                              size={20}
                              onClick={() => addWorkingHour(day.dayname)}
                            />
                          </div>
                        ))}
                      </>
                    ) : (
                      <Plus
                        className="cursor-pointer text-gray-600  mt-2"
                        size={20}
                        onClick={() => addWorkingHour(day.dayname)}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {hasWorkingHoursChanged && (
            <div className=" justify-end  flex gap-4">
              <button
                onClick={resetWorkingHours}
                className=" text-gray-500 px-4 py-1"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  localStorage.setItem(
                    WORKING_HOURS_KEY,
                    JSON.stringify(workingHours)
                  )
                }
                className=" text-gray-50 bg-blue-600 px-4 py-1"
              >
                Update
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default WorkingHours;

const borderBottom = "border border-b-gray-200 border-x-0 border-t-0";
