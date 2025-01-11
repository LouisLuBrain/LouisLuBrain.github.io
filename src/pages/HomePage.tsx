import { Calendar } from "../components";
import { IssueList } from "../components/issue-list";

export function HomePage() {
  return (
    <div className="flex justify-center bg-slate-200 h-full">
      <div className="flex gap-2 p-4 w-full">
        <Calendar />
        <div className="flex-1">
          <IssueList />
        </div>
      </div>
    </div>
  );
}
