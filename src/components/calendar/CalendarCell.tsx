import classNames from "classnames";
import { CalendarDay } from "./type";
import { Moment } from "moment";
import { useMemo } from "react";

interface Props<T> {
  value: CalendarDay<T>;
  currentDay: Moment;
  selected?: boolean;
  onClick?: (value: CalendarDay<T>) => void;
}

export function CalendarCell<T>(props: Props<T>) {
  const dayStyle = useMemo(() => {
    const baseStyle =
      "leading-8 text-center box-content font-normal size-8 text-xl rounded-lg duration-200 bg-slate-100 cursor-pointer border-transparent border-2";
    const notCurrentMonth = !props.value.isCurrentMonth
      ? "text-opacity-50 !border-opacity-50"
      : "";
    const isCurrentDay = props.currentDay.isSame(props.value.moment, "day");
    if (props.value.day === 0 || props.value.day === 6) {
      return classNames(
        baseStyle,
        notCurrentMonth,
        isCurrentDay ? "bg-rose-600 text-white" : "group-hover:bg-rose-100",
        props.selected ? "!border-rose-600 text-rose-600" : "text-rose-600"
      );
    } else {
      return classNames(
        baseStyle,
        notCurrentMonth,
        isCurrentDay ? "bg-stone-700 text-white" : "group-hover:bg-stone-200",
        props.selected ? "!border-stone-700 text-gray-700" : "text-gray-700"
      );
    }
  }, [
    props.currentDay,
    props.selected,
    props.value.day,
    props.value.isCurrentMonth,
    props.value.moment,
  ]);
  return (
    <div
      className="cols-span-1 group size-40 flex flex-col cursor-pointer hover:shadow-lg duration-200 text-sm font-medium border border-gray-200"
      key={props.value.moment.format("lll")}
      onClick={() => props.onClick && props.onClick(props.value)}
    >
      <div className="p-2 flex">
        <div className={dayStyle}>{props.value.moment.format("D")}</div>
      </div>
    </div>
  );
}
