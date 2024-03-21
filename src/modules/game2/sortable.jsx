import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Sortable(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: "none",
  };
  return (
    <li className="flex items-center justify-between gap-4 px-4 py-2 font-semibold text-center sm:text-base text-sm text-opacity-75 bg-black bg-opacity-10 rounded-md cursor-move hover:bg-opacity-20 active:bg-opacity-50" style={style} ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
      <div className="space-y-1 opacity-50">
        <div className=" w-4 h-1 bg-black rounded"></div>
        <div className=" w-4 h-1 bg-black rounded"></div>
        <div className=" w-4 h-1 bg-black rounded"></div>
      </div>
    </li>
  );
}

export default Sortable;
