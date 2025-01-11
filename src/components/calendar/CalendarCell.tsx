import classNames from "classnames";
import { CalendarDay } from "./type";
import { Moment } from "moment";

interface Props<T> {
  value: CalendarDay<T>;
  currentDay: Moment;
}

export function CalendarCell<T>(props: Props<T>) {
  return (
    <div
      className="cols-span-1 size-40 flex flex-col text-sm font-medium shadow-sm"
      key={props.value.moment.format("lll")}
    >
      <div className="p-2 flex">
        <div
          className={classNames(
            "leading-8 text-center font-normal size-8 text-xl rounded-lg bg-slate-100 cursor-pointer ",
            (props.value.day === 0 || props.value.day === 6) &&
              "text-rose-600 hover:bg-rose-200",
            props.value.day > 0 &&
              props.value.day < 6 &&
              "text-gray-700 hover:bg-gray-200",
            !props.value.isCurrentMonth && "text-opacity-50",
            props.currentDay.format("ll") === props.value.moment.format("ll") &&
              "!bg-stone-700 !text-white"
          )}
        >
          {props.value.moment.format("D")}
        </div>
      </div>
    </div>
  );
}
