import { Moment } from "moment";
import { Calendar, IssueList } from "../components";
import { useState } from "react";

export function DailyPage() {
  const [selectedDay, setSelectedDay] = useState<Moment | null>(null);

  const handleSelect = (date: Moment) => {
    setSelectedDay(date);
  };

  return (
    <div className="flex justify-center bg-slate-200 h-full">
      <div className="flex gap-2 p-4 w-full flex-wrap">
        <Calendar onSelect={handleSelect} />
        <div className="flex-1">
          <IssueList />
        </div>
      </div>
    </div>
  );
}
