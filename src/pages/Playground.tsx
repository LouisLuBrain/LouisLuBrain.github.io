import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";

import { ReactNode, useMemo, useState } from "react";

export type DragItem = {
  id: string;
  label?: string;
  classname?: string;
};

export function Playground() {
  const [droplist1, setDroplist1] = useState<DragItem[]>([
    { id: "1", label: "button 1" },
    { id: "2", label: "button 2" },
    { id: "3", label: "button 3" },
    { id: "4", label: "button 4" },
  ]);
  const [droplist2, setDroplist2] = useState<DragItem[]>([]);
  const [activeItem, setActiveItem] = useState<DragItem>();

  const onDragStart = (e: DragStartEvent) => {
    setActiveItem(e.active.data.current as DragItem);
  };

  const onDragOver = (e) => {
    console.log("onDragOver: ", e);
  };

  const onDragEnd = (e: DragEndEvent) => {
    console.log("onDragEnd: ", e);
    const currentItem = e.active.data.current as DragItem;
    if (e.over?.id === "a") {
      setDroplist2((prev) => prev.filter((item) => item.id !== currentItem.id));
      droplist1.find((item) => item.id === currentItem.id) ||
        setDroplist1((prev) => [...prev, currentItem]);
    }
    if (e.over?.id === "b") {
      setDroplist1((prev) => prev.filter((item) => item.id !== currentItem.id));
      droplist2.find((item) => item.id === currentItem.id) ||
        setDroplist2((prev) => [...prev, currentItem]);
    }
  };
  return (
    <div>
      <DndContext
        onDragStart={onDragStart}
        // onDragMove={onDragMove}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <DragOverlay>
          {activeItem ? <div>{activeItem.label}</div> : null}
        </DragOverlay>
        <Droppable id="a" classname="bg-red-600">
          <SortableContext items={droplist1}>
            {droplist1.map((item) => (
              <Draggable data={item} id={item.id} key={item.id}>
                {item.label}
              </Draggable>
            ))}
          </SortableContext>
        </Droppable>
        <Droppable id="b" classname="bg-green-600">
          <SortableContext items={droplist2}>
            {droplist2.map((item) => (
              <Draggable data={item} id={item.id} key={item.id}>
                {item.label}
              </Draggable>
            ))}
          </SortableContext>
        </Droppable>
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
      <div className="h-72 w-full">{props.children}</div>
    </div>
  );
}

function Draggable(props: {
  children?: ReactNode;
  id: string;
  data: DragItem;
}) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: "draggable-" + props.id,
    data: props.data,
    transition: {
      duration: 150, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  return (
    <button
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      {...listeners}
      {...attributes}
    >
      {props.children || "drag me"}
    </button>
  );
}
