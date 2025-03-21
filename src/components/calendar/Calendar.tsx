import { useEffect, useMemo, useState } from "react";
import { getCurrentMonthCalendar } from "./utils";
import moment, { Moment } from "moment";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { CalendarCell } from "./CalendarCell";
import { CalendarDay } from "./type";

enum DAYS {
  SUNDAY = "SUN",
  MONDAY = "MON",
  TUESDAY = "TUE",
  WEDNESDAY = "WED",
  THURSDAY = "THR",
  FRIDAY = "FRI",
  SATURDAY = "SAT",
}

export type SelectWeekDay = DAYS | null;

interface Props<T> {
  data?: CalendarDay<T>[];
  onSelect?: (date: Moment) => void;
}

export function Calendar<T>(props: Props<T>) {
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month());
  const [currentDay, setCurrentDay] = useState<Moment>(moment());
  const [selectedDay, setSelectedDay] = useState<Moment | null>(null);

  const days = useMemo(() => {
    return getCurrentMonthCalendar<T>(year, month);
  }, [year, month]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDay(moment()), 6000);
    return () => clearInterval(timer);
  }, []);

  const handleBackToToday = () => {
    setSelectedDay(currentDay);
    setMonth(currentDay.month());
    setYear(currentDay.year());
  };

  const handleSelect = (value: CalendarDay<T>) => {
    props.onSelect && props.onSelect(value.moment);
    setSelectedDay(value.moment);
  };

  return (
    <div className="flex flex-col items-center rounded-lg overflow-hidden bg-slate-50 shadow-md border-2">
      <div className="flex items-center text-sm justify-between gap-x-4 p-2 px-4 bg-gray-800 w-full text-white">
        {/* <div className="flex items-center gap-x-2">
          <button
            className="rounded-full bg-slate-100 text-stone-700 items-center p-[3px]"
            onClick={() => setYear((prev) => ++prev)}
          >
            <IconPlus size={18} />
          </button>
          <span>{year}</span>
          <button
            className="rounded-full bg-slate-100 text-stone-700 items-center p-[3px]"
            onClick={() => setYear((prev) => --prev)}
          >
            <IconMinus size={18} />
          </button>
        </div> */}
        <div className="flex items-center justify-between w-full py-2">
          <div className="flex items-center gap-x-2 select-none text-2xl">
            <button
              onClick={() => {
                if (month === 0) setYear((prev) => --prev);
                setMonth((prev) => (--prev < 0 ? 11 : prev % 12));
              }}
              className="rounded-full bg-gray-800 text-slate-100 duration-200 ease-in-out hover:bg-slate-100 hover:text-stone-700 items-center p-[3px]"
            >
              <IconChevronLeft size={24} />
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
              className="rounded-full bg-gray-800 text-slate-100 duration-200 ease-in-out hover:bg-slate-100 hover:text-stone-700 items-center p-[3px]"
            >
              <IconChevronRight size={24} />
            </button>
          </div>
          <button
            onClick={handleBackToToday}
            className="rounded-full px-4 py-1 bg-gray-800 text-slate-100 duration-200 ease-in-out hover:bg-slate-100 hover:text-stone-700 items-center"
          >
            Today
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 select-none bg-slate-100 p-2">
        <div className="grid grid-cols-7 col-span-7">
          {Object.values(DAYS).map((val) => (
            <div
              className="cols-span-1 p-2 flex justify-start items-center text-gray-700 first:text-rose-600  last:text-rose-600"
              key={val}
            >
              <div className="font-semibold leading-6 rounded-md bg-slate-100 text-lg">
                {val}
              </div>
            </div>
          ))}
        </div>
        {days.map((val) => (
          <CalendarCell<T>
            value={val}
            key={val.moment.format("YYYY-MM-DD")}
            currentDay={currentDay.set({ date: 17 })}
            selected={selectedDay?.isSame(val.moment, "day")}
            onClick={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
