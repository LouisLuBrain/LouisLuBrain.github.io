import classNames from "classnames";
import moment from "moment";
import { useEffect, useState } from "react";

const WEEK = [
  { day: "sun", events: [] },
  { day: "mon", events: [] },
  { day: "tue", events: [] },
  { day: "wed", events: [] },
  { day: "thr", events: [] },
  { day: "fri", events: [] },
  { day: "sat", events: [] },
];

export function Weekly() {
  const [currentDay, setCurrentDay] = useState<number>(moment().day());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDay(moment().day()), 6000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="grid grid-cols-7 gap-x-4 w-full rounded-md overflow-hidden p-2 bg-slate-100 border-stone-200 border-2 shadow-sm">
      {WEEK.map((d, index) => (
        <div
          className={classNames(
            "col-span-1 p-2 bg-slate-100 hover:bg-slate-200 border-transparent border-2 rounded-md",
            index === currentDay && "!border-stone-500"
          )}
        >
          <div className="w-full flex flex-col items-center h-full">
            <p className="uppercase">{d.day}</p>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
}
