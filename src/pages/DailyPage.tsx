import { Moment } from "moment";
import { Calendar, IssueList } from "../components";
import { useState } from "react";
import { Weather } from "../components/weather/Weather";

export function DailyPage() {
  const [selectedDay, setSelectedDay] = useState<Moment>();

  const handleSelect = (date: Moment) => {
    setSelectedDay(date);
  };

  return (
    <div className="flex justify-center h-full">
      <div className="flex gap-2 p-4 w-full flex-wrap">
        <Calendar onSelect={handleSelect} />
        <div className="flex-1 min-w-40 flex flex-col gap-2">
          <Weather />
          <div className="flex-1 w-full">
            <IssueList date={selectedDay?.format("YYYY-MM-DD")} />
          </div>
        </div>
      </div>
    </div>
  );
}
