import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";

import { ReactNode, useMemo, useState } from "react";

export type DragItem = {
  id: string | number;
  label?: string;
  classname?: string;
  parentId: string | number;
};

export function PlaygroundPage() {
  const [droplist, setDroplist] = useState<DragItem[]>([
    { id: "1", label: "button 1", parentId: "A" },
    { id: "2", label: "button 2", parentId: "A" },
    { id: "3", label: "button 3", parentId: "A" },
    { id: "4", label: "button 4", parentId: "A" },
  ]);
  const [activeItem, setActiveItem] = useState<DragItem>();

  const droplistA = useMemo(
    () => droplist.filter(({ parentId }) => parentId === "A"),
    [droplist]
  );
  const droplistB = useMemo(
    () => droplist.filter(({ parentId }) => parentId === "B"),
    [droplist]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveItem(active.data.current as DragItem);
    console.log("=> ~ onDragStart ~ active:", active);
  };

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    console.log("=> ~ onDragOver ~ over:", over);
    console.log("=> ~ onDragOver ~ active:", active);

    if (over?.id === "A" || over?.id === "B") {
      setDroplist((prev) =>
        prev.map((item) =>
          `${item.parentId}${item.id}` === active.id
            ? { ...item, parentId: over?.id }
            : item
        )
      );
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    setDroplist((prev) => {
      const oldIndex = prev.findIndex(
        ({ id, parentId }) => `${parentId}${id}` === active.id
      );
      const newIndex = prev.findIndex(
        ({ id, parentId }) => `${parentId}${id}` === over?.id
      );

      return arrayMove(prev, oldIndex, newIndex);
    });
  };
  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        // onDragMove={onDragMove}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <DragOverlay>
          {activeItem ? (
            <div className="p-1 bg-slate-500 bg-opacity-35 inline-block h-fit">
              {activeItem.label}
            </div>
          ) : null}
        </DragOverlay>
        <SortableContext items={droplistA}>
          <Droppable id="A" classname="bg-red-600 p-4">
            {droplistA.map((item) => (
              <Draggable
                data={item}
                id={`${item.parentId}${item.id}`}
                key={item.id}
              >
                {item.label}
              </Draggable>
            ))}
          </Droppable>
        </SortableContext>
        <SortableContext items={droplistB}>
          <Droppable id="B" classname="bg-green-600 p-4">
            {droplistB.map((item) => (
              <Draggable
                data={item}
                id={`${item.parentId}${item.id}`}
                key={item.id}
              >
                {item.label}
              </Draggable>
            ))}
          </Droppable>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function Droppable(props: {
  children?: ReactNode;
  classname?: string;
  id: string;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={classNames(props.classname, isOver && "bg-gray-500")}
    >
      <div className="min-h-12 w-full flex gap-4">{props.children}</div>
    </div>
  );
}

function Draggable(props: {
  children?: ReactNode;
  id: string;
  data: DragItem;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: props.data,
      transition: {
        duration: 150, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <button
      className="p-1 bg-slate-500 bg-opacity-35 inline-block h-fit"
      ref={setNodeRef}
      style={style}
      key={props.id}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
