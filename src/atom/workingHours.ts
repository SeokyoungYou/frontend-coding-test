import { atomWithReset } from "jotai/utils";

import { v4 as uuidv4 } from "uuid";

import {
  DailyWorkingHours,
  WORKING_HOURS_KEY,
  weekdays,
} from "../util/workingHoursUtil";

export const createDefaultWorkingHour = () => {
  return {
    id: uuidv4(),
    startTime: "09:00",
    endTime: "17:00",
    isValid: true,
  };
};

const defaultWorkingHours = Object.values(weekdays).map((day) => ({
  dayname: day,
  workingHours: [createDefaultWorkingHour()],
}));

export const initialWorkingHours = localStorage.getItem(WORKING_HOURS_KEY)
  ? JSON.parse(localStorage.getItem(WORKING_HOURS_KEY) || "")
  : defaultWorkingHours;

export const workingHoursAtom =
  atomWithReset<DailyWorkingHours[]>(initialWorkingHours);
