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

const randomColor = [
  "bg-blue-100 hover:bg-blue-600",
  "bg-green-100 hover:bg-green-600",
  "bg-red-100 hover:bg-red-600",
  "bg-amber-100 hover:bg-amber-600",
  "bg-purple-100 hover:bg-purple-600",
];

export function Weekly() {
  const [currentDay, setCurrentDay] = useState<number>(moment().day());

  useEffect(() => {
    const timer1 = setInterval(() => setCurrentDay(moment().day()), 6000);
    return () => clearInterval(timer1);
  }, []);

  return (
    <div className="flex w-full rounded-md overflow-hidden bg-slate-100 border-stone-200 border-2 shadow-sm p-2 gap-x-3 relative">
      <div className="grid grid-cols-7 gap-x-4 w-full">
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

            <div className="flex flex-col gap-y-2 py-2">
              {d.events.map((event, index) => (
                <div
                  className={classNames(
                    "p-2 hover:text-white rounded-md cursor-pointer duration-200",
                    randomColor[index % 5]
                  )}
                >
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
