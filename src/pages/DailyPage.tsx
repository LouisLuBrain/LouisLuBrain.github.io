import { Calendar, IssueList } from "../components";

export function DailyPage() {
  return (
    <div className="flex justify-center bg-slate-200 h-full">
      <div className="flex gap-2 p-4 w-full flex-wrap">
        <Calendar />
        <div className="flex-1">
          <IssueList />
        </div>
      </div>
    </div>
  );
}
