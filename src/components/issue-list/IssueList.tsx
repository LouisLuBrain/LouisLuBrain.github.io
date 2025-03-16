import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { Item } from "../../types";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IssueInput } from "./IssueInput";
import { useIssueStore } from "../../store/issues";
import { useCallback, useEffect, useMemo } from "react";
import moment from "moment";

interface Props {
  loading?: boolean;
  date?: string;
}

export function IssueList({ loading, date }: Props) {
  const state = useIssueStore.getState();
  const baseItems = useIssueStore((state) => state.items);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  // FIXME: This is a bug, the items should be reactive
  const items = useMemo(() => {
    if (date === undefined) return [];
    return baseItems.filter((item) => {
      const itemDate = moment(item.date).format("YYYY-MM-DD");
      return itemDate === date;
    });
  }, [date, baseItems]);

  useEffect(() => {
    console.log("=> ~ useEffect ~ state.items:", state.items);
  }, [state.items]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        state.setItems((items) => {
          const oldIndex = items.findIndex((item) => item.uuid === active.id);
          const newIndex = items.findIndex((item) => item.uuid === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    },
    [state]
  );

  const handleCreateIssue = useCallback(
    (issue: Item) => {
      console.log("=> ~ IssueList ~ issue:", issue);
      console.log("date: ", date);
      state.addItem({ ...issue, date: moment(date) });
    },
    [date, state]
  );

  const handleDeleteIssue = useCallback(
    (uuid: string) => {
      console.log("=> ~ IssueList ~ uuid:", uuid);
      state.deleteItem(uuid);
    },
    [state]
  );

  return (
    <div className="rounded-lg w-full h-full bg-slate-50 shadow-md border-2 p-4 space-y-4 flex flex-col">
      <div className="text-xl font-semibold text-black">Issues:</div>

      <div className="w-full flex-1">
        {loading ? (
          <div className="w-full flex justify-center">
            <IconLoader2 className="animate-spin text-stone-700" size={32} />
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.uuid)}
              strategy={verticalListSortingStrategy}
            >
              <div className="w-full flex flex-col gap-2">
                {items.map((issue) => (
                  <SortableItem
                    key={issue.uuid}
                    issue={issue}
                    onDelete={handleDeleteIssue}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
      <IssueInput onCreate={handleCreateIssue} />
    </div>
  );
}

function SortableItem({
  issue,
  onDelete,
}: {
  issue: Item;
  onDelete: (uuid: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: issue.uuid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full p-2 hover:bg-stone-200 cursor-pointer rounded-lg overflow-hidden flex justify-between items-center group"
    >
      <div>
        <div className="text-lg font-semibold">{issue.title}</div>
        <div className="text-sm">{issue.content}</div>
      </div>
      <button
        onClick={() => onDelete(issue.uuid)}
        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <IconTrash size={16} />
      </button>
    </div>
  );
}
