export const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeValue = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      options.push(timeValue);
    }
  }
  // Remove the last option "24:00" if it exists
  return options.filter((time) => time !== "24:00");
};

export type WorkingHour = {
  id: string;
  startTime: string;
  endTime: string;
};

export enum WeekDays {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export const weekdays: WeekDays[] = Object.values(WeekDays);

export type DailyWorkingHours = {
  dayname: WeekDays;
  workingHours: WorkingHour[];
};
