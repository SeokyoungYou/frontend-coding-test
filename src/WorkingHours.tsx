import { ChevronDown } from "lucide-react";
import RangeInput from "./components/RangeInput";

function WorkingHours() {
  return (
    <div>
      <h1>2번 과제 - WorkingHours</h1>
      <section className="flex mt-16 px-12 justify-center gap-12">
        <span className=" flex-none w-2/10">Working hour</span>
        <div className="flex flex-col flex-grow w-8/10">
          <div
            className={`pb-4 flex items-center justify-between w-full ${borderBottom}`}
          >
            <span className="font-semibold">Set your weekly hours</span>
            <ChevronDown className=" text-slate-600" size={20} />
          </div>
          <ul>
            {weekdays.map((day) => (
              <li
                className={`${borderBottom} items-center gap-4  flex py-4`}
                key={day}
              >
                <span className=" w-28 text-start">{day}</span>
                <div className="">
                  <RangeInput />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default WorkingHours;

const borderBottom = "border border-b-slate-200 border-x-0 border-t-0";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
