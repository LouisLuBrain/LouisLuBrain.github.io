import { useMemo, useState } from "react";
import { getCurrentMonthDays } from "./utils";
import moment from "moment";
import classNames from "classnames";

export function Calendar() {
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month());

  const days = useMemo(() => {
    return getCurrentMonthDays(year, month);
  }, [year, month]);

  return (
    <div>
      <div className="flex items-center gap-x-4">
        <div>
          <button onClick={() => setYear((prev) => ++prev)}>+</button>
          <span>{year}</span>
          <button onClick={() => setYear((prev) => --prev)}>-</button>
        </div>
        <div>
          <button onClick={() => setMonth((prev) => ++prev % 12)}>+</button>
          <span>{moment({ month }).format("MMMM")}</span>
          <button
            onClick={() => setMonth((prev) => (--prev < 0 ? 11 : prev % 12))}
          >
            -
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((val) => (
          <div
            className="cols-span-1 flex justify-center items-center w-full"
            key={val.moment.format("lll")}
          >
            <div
              className={classNames(
                "text-center leading-8 w-8 h-8 rounded-md bg-white cursor-pointer font-medium text-lg",
                val.day === 0 || val.day === 6
                  ? "text-red-600 hover:bg-red-200"
                  : "text-gray-900 hover:bg-gray-200"
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
