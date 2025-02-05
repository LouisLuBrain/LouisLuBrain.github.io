import { IconLoader2 } from "@tabler/icons-react";
import { Item } from "../../types";

interface Props {
  loading?: boolean;
  issues?: Item[];
}

export function IssueList({ loading, issues }: Props) {
  return (
    <div className="rounded-lg w-full bg-slate-50 shadow-sm border-2 p-4 space-y-4">
      <div className="text-xl font-semibold text-black">Issues:</div>

      {loading ? (
        <div className="w-full flex justify-center">
          <IconLoader2 className="animate-spin text-stone-700" size={32} />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {issues?.map((issue) => (
            <div
              key={issue.uuid}
              className="w-full p-2 hover:bg-stone-200 cursor-pointer rounded-lg overflow-hidden"
            >
              <div className="text-lg font-semibold">{issue.title}</div>
              <div className="text-sm">{issue.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
