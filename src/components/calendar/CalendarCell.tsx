import classNames from "classnames";
import { CalendarDay } from "./type";
import { Moment } from "moment";

interface Props<T> {
  value: CalendarDay<T>;
  currentDay: Moment;
  selected?: boolean;
  onClick?: (value: CalendarDay<T>) => void;
}

export function CalendarCell<T>(props: Props<T>) {
  return (
    <div
      className="cols-span-1 size-40 flex flex-col cursor-pointer hover:shadow-lg duration-200 text-sm font-medium border border-gray-200"
      key={props.value.moment.format("lll")}
      onClick={() => props.onClick && props.onClick(props.value)}
    >
      <div className="p-2 flex">
        <div
          className={classNames(
            "leading-8 text-center box-content font-normal size-8 text-xl rounded-lg duration-200 bg-slate-100 cursor-pointer border-transparent border-2",
            (props.value.day === 0 || props.value.day === 6) &&
              "text-rose-600 hover:bg-rose-200",
            (props.value.day === 0 || props.value.day === 6) &&
              props.selected &&
              "border-rose-600",
            props.value.day > 0 &&
              props.value.day < 6 &&
              "text-gray-700 hover:bg-gray-200",
            !props.value.isCurrentMonth && "text-opacity-50 !border-opacity-50",
            props.currentDay.format("ll") === props.value.moment.format("ll") &&
              "!bg-stone-700 !text-white",
            props.value.day > 0 &&
              props.value.day < 6 &&
              props.selected &&
              "!border-stone-700"
          )}
        >
          {props.value.moment.format("D")}
        </div>
      </div>
    </div>
  );
}
