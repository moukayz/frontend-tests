"use client";

import { ReactNode, useContext } from "react";
import { DragAndDropContext } from "./DraggableList";

interface DraggableItemProps {
  children: ReactNode;
  index: number;
  className?: string;
}

const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext);
  if (!context) {
    throw new Error("useDragAndDrop must be used within a DraggableList");
  }
  return context;
};

export function DraggableItem({
  children,
  index,
  className,
}: DraggableItemProps) {
  const {
    draggedIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useDragAndDrop();

  console.log("render DraggableItem");

  return (
    <li
      data-index={index}
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragEnter={() => handleDragEnter(index)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onTouchStart={(e) => handleTouchStart(e, index)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`${className} cursor-grab ${
        draggedIndex === index ? "opacity-0" : "opacity-100"
      } `}
    >
      {children}
    </li>
  );
}
