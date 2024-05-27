import { useEffect, useMemo, useState } from "react";
import { getCurrentMonthCalendar } from "./utils";
import moment, { Moment } from "moment";
import classNames from "classnames";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];

export function Calendar() {
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month());
  const [currentDay, setCurrentDay] = useState<Moment>(moment());

  const days = useMemo(() => {
    return getCurrentMonthCalendar(year, month);
  }, [year, month]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDay(moment()), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center w-fit rounded-md overflow-hidden bg-slate-50 border-stone-200 border-2">
      <div className="flex items-center text-sm justify-between gap-x-4 p-2 px-4 bg-stone-700 w-full text-white">
        {/* <div className="flex items-center gap-x-2">
          <button
            className="w-6 h-6 rounded-full bg-slate-100 text-stone-700 items-center p-[3px]"
            onClick={() => setYear((prev) => ++prev)}
          >
            <IconPlus size={18} />
          </button>
          <span>{year}</span>
          <button
            className="w-6 h-6 rounded-full bg-slate-100 text-stone-700 items-center p-[3px]"
            onClick={() => setYear((prev) => --prev)}
          >
            <IconMinus size={18} />
          </button>
        </div> */}
        <div className="flex items-center gap-x-2 select-none">
          <button
            onClick={() => {
              if (month === 0) setYear((prev) => --prev);
              setMonth((prev) => (--prev < 0 ? 11 : prev % 12));
            }}
            className="w-6 h-6 rounded-full bg-stone-700 text-slate-100 duration-200 ease-in-out hover:bg-slate-100 hover:text-stone-700 items-center p-[3px]"
          >
            <IconChevronLeft size={18} />
          </button>
          <span className="inline-block w-16 text-center">
            {moment({ month }).format("MMM")}
          </span>
          <span>{year}</span>
          <button
            onClick={() => {
              if (month === 11) setYear((prev) => ++prev);
              setMonth((prev) => ++prev % 12);
            }}
            className="w-6 h-6 rounded-full bg-stone-700 text-slate-100 duration-200 ease-in-out hover:bg-slate-100 hover:text-stone-700 items-center p-[3px]"
          >
            <IconChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-2 gap-x-4 select-none bg-slate-100 p-2">
        <div className="grid grid-cols-7 gap-y-2 gap-x-4 col-span-7">
          {DAYS.map((val) => (
            <div
              className="cols-span-1 w-8 flex justify-center items-center text-gray-700 first:text-rose-600  last:text-rose-600"
              key={val}
            >
              <div className="text-center leading-6 w-6 h-6 rounded-md bg-slate-100 text-xs font-normal">
                {val}
              </div>
            </div>
          ))}
        </div>
        {days.map((val) => (
          <div
            className="cols-span-1 flex justify-center items-center text-sm font-medium"
            key={val.moment.format("lll")}
          >
            <div
              className={classNames(
                "text-center leading-6 w-6 h-6 rounded-md bg-slate-100 cursor-pointer ",
                (val.day === 0 || val.day === 6) &&
                  "text-rose-600 hover:bg-rose-200",
                val.day > 0 && val.day < 6 && "text-gray-700 hover:bg-gray-200",
                !val.isCurrentMonth && "text-opacity-50",
                currentDay.format("ll") === val.moment.format("ll") &&
                  "!bg-stone-700 !text-white"
              )}
            >
              {val.moment.format("D")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
