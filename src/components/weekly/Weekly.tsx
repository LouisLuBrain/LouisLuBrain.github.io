import classNames from "classnames";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";

export interface DailyEvent {
  title: string;
  description?: string;
  startTime: Moment;
  endTime?: Moment;
}

const WEEK: { day: string; events: DailyEvent[] }[] = [
  {
    day: "sun",
    events: [
      {
        title: "Buy food",
        description: "Don't forget the milk.",
        startTime: moment({ hour: 19, minute: 30 }),
      },
    ],
  },
  { day: "mon", events: [] },
  {
    day: "tue",
    events: [
      {
        title: "Buy food",
        description: "Don't forget the milk.",
        startTime: moment({ hour: 19, minute: 30 }),
      },
      {
        title: "Buy food",
        description: "Don't forget the milk.",
        startTime: moment({ hour: 19, minute: 30 }),
      },
    ],
  },
  { day: "wed", events: [] },
  { day: "thr", events: [] },
  { day: "fri", events: [] },
  {
    day: "sat",
    events: [
      {
        title: "Buy food",
        description: "Don't forget the milk.",
        startTime: moment({ hour: 19, minute: 30 }),
      },
    ],
  },
];

export function Weekly() {
  const [currentDay, setCurrentDay] = useState<number>(moment().day());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDay(moment().day()), 6000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex w-full rounded-md overflow-hidden bg-slate-100 border-stone-200 border-2 shadow-sm p-2 gap-x-3">
      {/* <div className="grid grid-rows-12 pt-16 gap-2">
        <div>00:00</div>
        <div>02:00</div>
        <div>04:00</div>
        <div>06:00</div>
        <div>08:00</div>
        <div>10:00</div>
        <div>12:00</div>
        <div>14:00</div>
        <div>16:00</div>
        <div>18:00</div>
        <div>20:00</div>
        <div>22:00</div>
        <div>24:00</div>
      </div> */}
      <div className="grid grid-cols-7 gap-x-4 ">
        {WEEK.map((d, index) => (
          <div>
            <div
              className={classNames(
                "col-span-1 p-2 h-16 bg-slate-200 hover:bg-stone-700 hover:text-white rounded-md duration-200 cursor-pointer border-2 border-slate-200 hover:border-stone-700",
                index === currentDay &&
                  "!bg-stone-700 hover:bg-stone-700 text-white !border-stone-700"
              )}
            >
              <div className="w-full flex flex-col items-center justify-end h-full">
                <p className="uppercase text-sm">{d.day}</p>
                <p className="font-semibold text-lg">
                  {moment().day(index).format("DD")}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              {d.events.map((event) => (
                <div>
                  <div>{event.title}</div>
                  <div>{event.description}</div>
                  <div>at {event.startTime.format("HH:mm")}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
