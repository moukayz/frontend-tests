"use client";

import React, {
  useState,
  useRef,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";

interface DragAndDropContextProps {
  draggedIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLLIElement>) => void;
  handleTouchStart: (e: React.TouchEvent<HTMLLIElement>, index: number) => void;
  handleTouchMove: (e: React.TouchEvent<HTMLLIElement>) => void;
  handleTouchEnd: () => void;
}

export const DragAndDropContext = createContext<DragAndDropContextProps | null>(
  null
);

interface DraggableListProps<T> {
  //   items: T[];
  onItemsChange: Dispatch<SetStateAction<T[]>>;
  children: ReactNode;
  listClassName?: string;
}

export function DraggableList<T>({
  //   items,
  onItemsChange,
  children,
  listClassName,
}: DraggableListProps<T>) {
  const [ghost, setGhost] = useState<{
    element: ReactNode;
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const ghostInitialRect = useRef<DOMRect | null>(null);
  const touchStartCoordsRef = useRef<{ x: number; y: number } | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragItemIndex = useRef<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    dragItemIndex.current = index;
    setDraggedIndex(index);
  }, []);

  const handleDragEnter = useCallback(
    (toIndex: number) => {
      const fromIndex = dragItemIndex.current;
      if (fromIndex === null || fromIndex === toIndex) return;

      onItemsChange((items) => {
        const newItems = [...items];
        const [draggedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, draggedItem);
        return newItems;
      });

      dragItemIndex.current = toIndex;
      setDraggedIndex(toIndex);
    },
    [onItemsChange]
  );

  const handleDragEnd = useCallback(() => {
    dragItemIndex.current = null;
    setDraggedIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLIElement>) => {
      e.preventDefault();
      handleDragEnd();
    },
    [handleDragEnd]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLLIElement>, index: number) => {
      dragItemIndex.current = index;
      setDraggedIndex(index);

      const draggableItemElement = React.Children.toArray(children)[index];
      let ghostElement: ReactNode = null;
      if (React.isValidElement(draggableItemElement)) {
        ghostElement = (
          draggableItemElement as React.ReactElement<{ children: ReactNode }>
        ).props.children;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      // const rect = (ghostElement as HTMLLIElement).getBoundingClientRect();

      ghostInitialRect.current = rect;
      touchStartCoordsRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      if (ghostElement) {
        setGhost({
          element: ghostElement,
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    },
    [children]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLLIElement>) => {
      if (dragItemIndex.current === null || !touchStartCoordsRef.current)
        return;

      e.preventDefault();

      const touch = e.touches[0];

      const deltaX = touch.clientX - touchStartCoordsRef.current.x;
      const deltaY = touch.clientY - touchStartCoordsRef.current.y;

      setGhost((ghost) => {
        if (!ghost || !ghostInitialRect.current) return null;
        return {
          ...ghost,
          x: ghostInitialRect.current.left + deltaX,
          y: ghostInitialRect.current.top + deltaY,
        };
      });

      const targetElement = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      ) as HTMLElement;

      const overIndex = targetElement.closest("li")?.dataset.index;
      if (overIndex !== undefined) {
        handleDragEnter(parseInt(overIndex, 10));
      }
    },
    [handleDragEnter]
  );

  const handleTouchEnd = useCallback(() => {
    dragItemIndex.current = null;
    setDraggedIndex(null);
    setGhost(null);
    ghostInitialRect.current = null;
    touchStartCoordsRef.current = null;
  }, []);

  const contextValue = useMemo(
    () => ({
      draggedIndex,
      handleDragStart,
      handleDragEnter,
      handleDragEnd,
      handleDrop,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    }),
    [
      draggedIndex,
      handleDragStart,
      handleDragEnter,
      handleDragEnd,
      handleDrop,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    ]
  );

  //   console.log("render DraggableList");

  return (
    <DragAndDropContext.Provider value={contextValue}>
      {ghost && (
        <div
          style={{
            position: "fixed",
            pointerEvents: "none",
            top: ghost.y,
            left: ghost.x,
            width: ghost.width,
            height: ghost.height,
            transform: "scale(1.05)",
            zIndex: 9999,
          }}
        >
          {ghost.element}
        </div>
      )}
      <ul className={listClassName}>{children}</ul>
    </DragAndDropContext.Provider>
  );
}
