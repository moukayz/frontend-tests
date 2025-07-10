"use client";
import { useState } from "react";
import { useFlipAnimation } from "./useFlipAnimation";

type ItemWithId = { id: number | string };
type AnimatedItem<T> = T & { removing?: boolean };

export function useAnimatedList<T extends ItemWithId>(initialItems: T[]) {
  const [items, setItems] = useState<AnimatedItem<T>[]>(initialItems);
  const getRef = useFlipAnimation(items, { duration: 300 });

  const removeItem = (id: T["id"]) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, removing: true } : item
      )
    );
  };

  const onRemoved = (id: T["id"]) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return { items, getRef, removeItem, onRemoved };
}
