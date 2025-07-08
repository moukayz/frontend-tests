"use client";

import React, { useState, useRef, useCallback } from "react";

// Sample data with unique IDs for keys
const initialItems = [
  { id: 1, text: "Complete online JavaScript course" },
  { id: 2, text: "Jog around the park 3x" },
  { id: 3, text: "10 minutes meditation" },
  { id: 4, text: "Read for 1 hour" },
  { id: 5, text: "Pick up groceries" },
  { id: 6, text: "Complete Todo App on Frontend Mentor" },
];

const ListItem = React.memo(function ListItem({ text }: { text: string }) {
  console.log("ListItem rendered: ", text);
  return (
    <div className="group p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between w-full h-full rounded-lg">
      <span className="flex-grow">{text}</span>
    </div>
  );
});

interface Item {
  id: number;
  text: string;
}
interface DraggableListItemProps {
  item: Item;
  index: number;
  isOpacity?: boolean;
  onDragStart: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onTouchStart: (
    e: React.TouchEvent<HTMLLIElement>,
    index: number,
    item: Item
  ) => void;
  onTouchMove: (e: React.TouchEvent<HTMLLIElement>) => void;
  onTouchEnd: () => void;
}
const DraggableListItem = React.memo(function DraggableListItem({
  item,
  index,
  isOpacity,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: DraggableListItemProps) {
  console.log("DraggableListItem rendered: ", index);
  return (
    <li
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onTouchStart={(e) => onTouchStart(e, index, item)}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`cursor-grab ${isOpacity ? "opacity-0" : "opacity-100"}`}
    >
      <ListItem text={item.text} />
    </li>
  );
});

export default function DraggableListPage() {
  const [items, setItems] = useState(initialItems);
  const [ghost, setGhost] = useState<{
    content: string;
    y: number;
    x: number;
    width: number;
    height: number;
  } | null>(null);

  // Ref to hold the mutable dragging index, avoiding closure issues in event handlers.
  const dragItemIndex = useRef<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // --- Live Reordering Logic ---
  const moveItem = useCallback((fromIndex: number, toIndex: number) => {
    setItems((currentItems) => {
      const newItems = [...currentItems];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      return newItems;
    });
  }, []);

  // --- Desktop Drag and Drop ---
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLLIElement>, index: number) => {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", "");
      dragItemIndex.current = index;
    },
    []
  );

  const handleDragEnter = useCallback(
    (index: number) => {
      if (dragItemIndex.current !== null && dragItemIndex.current !== index) {
        moveItem(dragItemIndex.current, index);
        dragItemIndex.current = index; // Keep the ref in sync
      }
    },
    [moveItem]
  );

  const handleDragEnd = useCallback(() => {
    dragItemIndex.current = null;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  }, []);

  // --- Mobile Touch Events ---
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const initialGhostY = useRef<number>(0);
  const initialGhostX = useRef<number>(0);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLLIElement>, index: number, item: Item) => {
      dragItemIndex.current = index;

      const targetRect = e.currentTarget.getBoundingClientRect();
      setGhost({
        content: item.text,
        y: targetRect.top,
        x: targetRect.left,
        width: targetRect.width,
        height: targetRect.height,
      });

      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
      initialGhostY.current = targetRect.top;
      initialGhostX.current = targetRect.left;
    },
    []
  );

  const handleTouchMoveImpl = useCallback(
    (e: React.TouchEvent<HTMLLIElement>) => {
      if (dragItemIndex.current === null) return;

      const currentTouchY = e.touches[0].clientY;
      const currentTouchX = e.touches[0].clientX;
      const dy = currentTouchY - touchStartY.current;
      const dx = currentTouchX - touchStartX.current;

      setGhost((g) => {
        if (!g) return g;
        return {
          ...g,
          y: initialGhostY.current + dy,
          x: initialGhostX.current + dx,
        };
      });

      // Find which item we are dragging over
      const listItems = Array.from(listRef.current?.children || []);
      let overIndex: number | null = null;
      for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i] as HTMLLIElement;
        const rect = item.getBoundingClientRect();
        if (
          i !== dragItemIndex.current &&
          currentTouchY > rect.top &&
          currentTouchY < rect.bottom
        ) {
          overIndex = i;
          break;
        }
      }

      if (overIndex !== null && overIndex !== dragItemIndex.current) {
        const fromIndex = dragItemIndex.current;
        moveItem(fromIndex, overIndex);
        dragItemIndex.current = overIndex;
      }
    },
    [moveItem]
  );

  //   const handleTouchMove = useMemo(
  //     () => throttle(10, handleTouchMoveImpl),
  //     [handleTouchMoveImpl]
  //   );

  const handleTouchEnd = useCallback(() => {
    setGhost(null);
    dragItemIndex.current = null;
  }, []);

  console.log("render page");
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-900 text-white p-4 font-sans">
      {ghost && (
        <div
          style={{
            position: "fixed",
            transform: "scale(1.05)",
            top: ghost.y,
            left: ghost.x,
            width: ghost.width,
            height: ghost.height,
            pointerEvents: "none",
          }}
        >
          <ListItem text={ghost.content} />
        </div>
      )}
      <div className="w-full max-w-lg mt-16">
        <header className="flex justify-between items-center gap-6 mb-6">
          <h1 className="text-4xl font-bold tracking-widest text-white uppercase">
            Todo
          </h1>
        </header>
        <ul
          ref={listRef}
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col gap-6"
        >
          {items.map((item, index) => (
            <DraggableListItem
              key={item.id}
              item={item}
              index={index}
              isOpacity={
                dragItemIndex.current !== null &&
                items[dragItemIndex.current].id === item.id
              }
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMoveImpl}
              onTouchEnd={handleTouchEnd}
            />
          ))}
        </ul>
        <p className="text-center text-gray-500 mt-8 text-sm">
          Drag and drop to reorder list
        </p>
      </div>
    </div>
  );
}
