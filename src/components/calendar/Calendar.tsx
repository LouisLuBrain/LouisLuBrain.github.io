import { useMemo, useState } from "react";
import { getCurrentMonthCalendar } from "./utils";
import moment from "moment";
import classNames from "classnames";
import {
  IconChevronLeft,
  IconChevronRight,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];

export function Calendar() {
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month());

  const days = useMemo(() => {
    return getCurrentMonthCalendar(year, month);
  }, [year, month]);

  return (
    <div className="flex flex-col items-center w-fit rounded-md overflow-hidden shadow-lg">
      <div className="flex items- justify-between gap-x-4 p-2 px-6 bg-slate-600 w-full text-white">
        <div className="flex items-center gap-x-2">
          <button
            className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 items-center p-[3px]"
            onClick={() => setYear((prev) => ++prev)}
          >
            <IconPlus size={18} />
          </button>
          <span>{year}</span>
          <button
            className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 items-center p-[3px]"
            onClick={() => setYear((prev) => --prev)}
          >
            <IconMinus size={18} />
          </button>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => {
              if (month === 0) setYear((prev) => --prev);
              setMonth((prev) => (--prev < 0 ? 11 : prev % 12));
            }}
            className="w-6 h-6 rounded-full bg-slate-600 text-slate-100 duration-200 ease-in-out hover:bg-slate-100 hover:text-slate-600 items-center p-[3px]"
          >
            <IconChevronLeft size={18} />
          </button>
          <span className="inline-block w-16 text-center">
            {moment({ month }).format("MMM")}
          </span>
          <button
            onClick={() => {
              if (month === 11) setYear((prev) => ++prev);
              setMonth((prev) => ++prev % 12);
            }}
            className="w-6 h-6 rounded-full bg-slate-600 text-slate-100 duration-200 ease-in-out hover:bg-slate-100 hover:text-slate-600 items-center p-[3px]"
          >
            <IconChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 select-none bg-slate-100 p-2">
        <div className="grid grid-cols-7 gap-2 col-span-7">
          {DAYS.map((val) => (
            <div
              className="cols-span-1 w-16 flex justify-center items-center text-gray-700 first:text-red-600  last:text-red-600"
              key={val}
            >
              <div className="text-center leading-8 w-8 h-8 rounded-md bg-slate-100 text-base font-semibold">
                {val}
              </div>
            </div>
          ))}
        </div>
        {days.map((val) => (
          <div
            className="cols-span-1 w-16 flex justify-center items-center"
            key={val.moment.format("lll")}
          >
            <div
              className={classNames(
                "text-center leading-8 w-8 h-8 rounded-md bg-slate-100 cursor-pointer font-medium text-lg ",
                (val.day === 0 || val.day === 6) &&
                  "text-red-600 hover:bg-red-200",
                val.day > 0 && val.day < 6 && "text-gray-700 hover:bg-gray-200",
                !val.isCurrentMonth && "text-opacity-50"
              )}
            >
              {val.moment.format("DD")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
