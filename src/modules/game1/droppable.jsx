import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable({ dropt, ...props }) {
  const { isOver, setNodeRef, attributes } = useDroppable({
    id: props.id,
  });

  console.log(props.id);

  const style = {
    opacity: dropt ? 1 : isOver ? 1 : 0.5,
    backgroundColor: dropt ? "#FFFFFF" : isOver ? "rgb(247 255 252)" : "#FFFFFF",
    color: dropt ? "green" : "black",
  };

  return (
    <span ref={setNodeRef} style={style} key={props.key}>
      {props.children}
    </span>
  );
}

export default Droppable;
