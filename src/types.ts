import { Moment } from "moment";

export interface Item {
  uuid: string;
  title?: string;
  content?: string;
  date?: Moment;
}
