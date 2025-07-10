"use client";
import React, { useEffect, useState } from "react";
import AnimatedListItem from "./AnimatedListItem";
import { useFlipAnimation } from "../hooks/useFlipAnimation";

type ItemWithId = { id: number | string };

interface AnimatedListProps<T extends ItemWithId> {
  items: T[];
  children: (item: T) => React.ReactNode;
  className?: string;
  itemClassName?: string;
}

type AnimatedItem<T> = T & { removing?: boolean };

export default function AnimatedList<T extends ItemWithId>({
  items: propItems,
  children,
  className,
  itemClassName,
}: AnimatedListProps<T>) {
  const [animatedItems, setAnimatedItems] = useState<AnimatedItem<T>[]>(
    propItems.map((item) => ({ ...item, removing: false }))
  );

  useEffect(() => {
    const propItemIds = new Set(propItems.map((i) => i.id));

    // Mark items for removal
    const itemsWithRemoval = animatedItems.map((item) => {
      if (!propItemIds.has(item.id)) {
        return { ...item, removing: true };
      }
      return item;
    });

    // Add new items
    const existingItemIds = new Set(itemsWithRemoval.map((i) => i.id));
    const addedItems = propItems
      .filter((item) => !existingItemIds.has(item.id))
      .map((item) => ({ ...item, removing: false }));

    // Update existing items data
    const finalItems = itemsWithRemoval
      .map((item) => {
        const propEquivalent = propItems.find((p) => p.id === item.id);
        if (propEquivalent) {
          return { ...propEquivalent, removing: item.removing };
        }
        return item;
      })
      .filter((i) => i.removing || propItemIds.has(i.id));

    setAnimatedItems([...finalItems, ...addedItems]);
  }, [propItems]);

  const onRemoved = (id: T["id"]) => {
    setAnimatedItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const getRef = useFlipAnimation(animatedItems);

  return (
    <ul className={className}>
      {animatedItems.map((item) => (
        <AnimatedListItem
          key={item.id}
          ref={getRef(item.id)}
          removing={item.removing}
          onRemoved={() => onRemoved(item.id)}
          className={itemClassName}
        >
          {children(item)}
        </AnimatedListItem>
      ))}
    </ul>
  );
}
