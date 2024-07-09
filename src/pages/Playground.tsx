import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";

import { ReactNode, useState } from "react";

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

  const onDragStart = (e) => {
    console.log("onDragStart: ", e);
  };
  const onDragOver = (e) => {
    console.log("onDragOver: ", e);
  };
  const onDragEnd = (e: DragEndEvent) => {
    console.log("onDragEnd: ", e);
    const currentItem = e.active.data.current as DragItem;
    if (e.over?.id === "a") {
      setDroplist2((prev) => prev.filter((item) => item.id !== currentItem.id));
      setDroplist1((prev) => [...prev, currentItem]);
    }
    if (e.over?.id === "b") {
      setDroplist1((prev) => prev.filter((item) => item.id !== currentItem.id));
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
        <Droppable id="a" classname="bg-red-600">
          {droplist1.map((item) => (
            <Draggable data={item} id={item.id} key={item.id}>
              {item.label}
            </Draggable>
          ))}
        </Droppable>
        <Droppable id="b" classname="bg-green-600">
          {droplist2.map((item) => (
            <Draggable data={item} id={item.id} key={item.id}>
              {item.label}
            </Draggable>
          ))}
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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-" + props.id,
    data: props.data,
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
