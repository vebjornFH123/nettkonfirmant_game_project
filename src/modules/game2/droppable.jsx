import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable({ isRunning, ...props }) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    pointerEvents: isRunning ? "auto" : "none",
    opacity: isRunning ? 1 : 0.4,
  };

  return (
    <ul ref={setNodeRef} style={style} className="m-auto sm:mt-8 mt-2 space-y-2 w-full sm:w-3/4">
      {props.children}
    </ul>
  );
}

export default Droppable;
