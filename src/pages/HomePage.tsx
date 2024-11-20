import { Calendar } from "../components";

export function HomePage() {
  return (
    <div className="flex justify-center bg-slate-200 h-full">
      <div className="flex">
        <Calendar />
      </div>
    </div>
  );
}
