import moment from "moment";
import { CalendarDay } from "./type";

export function getCurrentMonthDays<T>(
  year: number,
  month: number
): CalendarDay<T>[] {
  const numOfDays = moment({ month, year }).daysInMonth();
  const days = new Array(numOfDays).fill(undefined).map((_val, idx) => {
    const _moment = moment({ year, month, date: idx + 1 });
    return {
      day: _moment.day(),
      moment: _moment,
      isCurrentMonth: true,
    };
  });
  return days;
}
