import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };
  return (
    <span className="relative z-10 inline-block px-2 py-1 mx-1 bg-[#fcfcfc] shadow-md rounded-[8px]" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </span>
  );
}

export default Draggable;
