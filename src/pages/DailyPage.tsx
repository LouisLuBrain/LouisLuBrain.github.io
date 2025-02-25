import { Moment } from "moment";
import { Calendar, IssueList } from "../components";
import { useMemo, useState } from "react";
import { Item } from "../types";
import { Weather } from "../components/weather/Weather";

export function DailyPage() {
  const [selectedDay, setSelectedDay] = useState<Moment | null>(null);
  const [loading, setLoading] = useState(false);
  const [dayData, setDayData] = useState<Item[]>();

  const handleSelect = (date: Moment) => {
    setSelectedDay(date);
  };

  useMemo(() => {
    if (!selectedDay) return;
    setLoading(true);
    getDayData({ date: selectedDay.format("YYYY-MM-DD") }).then((data) => {
      setDayData(data.issues);
      setLoading(false);
    });
  }, [selectedDay]);

  return (
    <div className="flex justify-center h-full">
      <div className="flex gap-2 p-4 w-full flex-wrap">
        <Calendar onSelect={handleSelect} />
        <div className="flex-1 min-w-40 flex flex-col gap-2">
          <Weather />
          <div className="flex-1 w-full">
            <IssueList loading={loading} issues={dayData} />
          </div>
        </div>
      </div>
    </div>
  );
}

async function getDayData(params: { date: string }) {
  const { date } = params;
  console.log("Fetching data for date: ", date);
  const response = await new Promise<{ issues: Item[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        issues: [
          {
            uuid: "d6FbEB59-c3ae-FA84-0cac-43b3Fd024E14",
            title: "Issue 1",
            content: "This is the first issue",
          },
          {
            uuid: "Ab5aDfA6-baAc-eA9A-C4B5-63f0AF660bc9",
            title: "Issue 2",
            content: "This is the second issue",
          },
        ],
      });
    }, 2000);
  });
  const data = response;
  return data;
}
