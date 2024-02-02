import { atom } from "jotai";
import { v4 as uuidv4 } from "uuid";

import { DailyWorkingHours, weekdays } from "../util/time";

export const workingHoursAtom = atom<DailyWorkingHours[]>(
  Object.values(weekdays).map((day) => ({
    dayname: day,
    workingHours: [{ id: uuidv4(), startTime: "09:00", endTime: "17:00" }],
  }))
);
