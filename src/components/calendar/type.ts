import { Moment } from "moment";

export interface CalendarDay<T = string> {
  day: number;
  isCurrentMonth: boolean;
  moment: Moment;
  details?: T;
}
