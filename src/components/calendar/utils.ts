import moment from "moment";
import { CalendarDay } from "./type";

export function getCurrentMonthDays<T>(
  year: number,
  month: number,
  isCurrentMonth?: boolean
): CalendarDay<T>[] {
  const numOfDays = moment({ month, year }).daysInMonth();
  const days = new Array(numOfDays).fill(undefined).map((_val, idx) => {
    const _moment = moment({ year, month, date: idx + 1 });
    return {
      day: _moment.day(),
      moment: _moment,
      isCurrentMonth: !!isCurrentMonth,
    };
  });
  return days;
}

export function getCurrentMonthCalendar<T>(
  year: number,
  month: number
): CalendarDay<T>[] {
  const currentMonth = getCurrentMonthDays<T>(year, month, true);
  const preMonthDays = currentMonth.at(0)?.day ?? 0;
  const nextMonthDays = 6 - (currentMonth.at(-1)?.day ?? 0);

  const preMonth =
    preMonthDays === 0
      ? []
      : getCurrentMonthDays<T>(
          month - 1 < 0 ? year - 1 : year,
          month - 1 < 0 ? 11 : (month - 1) % 12
        ).slice(-preMonthDays);

  const nextMonth = getCurrentMonthDays<T>(year, (month + 1) % 12).slice(
    0,
    nextMonthDays || 7
  );

  return [...preMonth, ...currentMonth, ...nextMonth];
}
