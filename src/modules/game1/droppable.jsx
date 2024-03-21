import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable({ dropt, wrongAnswer, ...props }) {
  const { isOver, setNodeRef, attributes } = useDroppable({
    id: props.id,
  });

  if (wrongAnswer === true) {
    console.log("heiersfhjkbsdhfhods");
  }

  const style = {
    opacity: dropt ? 1 : isOver ? 1 : 0.5,
    backgroundColor: dropt ? "#FFFFFF" : isOver ? "rgb(247 255 252)" : "#FFFFFF",
    color: dropt ? "green" : "black",
  };

  return (
    <span ref={setNodeRef} style={style}>
      {props.children}
    </span>
  );
}

export default Droppable;