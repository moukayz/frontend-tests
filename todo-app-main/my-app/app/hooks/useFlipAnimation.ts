"use client";
import { useLayoutEffect, useRef } from "react";

type ItemWithId = { id: number | string };

export function useFlipAnimation<T extends ItemWithId>(
  items: T[],
  options: { duration: number } = { duration: 300 }
) {
  const nodes = useRef(new Map<T["id"], HTMLElement>());
  const lastPos = useRef(new Map<T["id"], DOMRect>());

  useLayoutEffect(() => {
    items.forEach((item) => {
      const node = nodes.current.get(item.id);
      if (node) {
        lastPos.current.set(item.id, node.getBoundingClientRect());
      }
    });
  });

  useLayoutEffect(() => {
    const newPos = new Map<T["id"], DOMRect>();
    items.forEach((item) => {
      const node = nodes.current.get(item.id);
      if (!node) return;
      newPos.set(item.id, node.getBoundingClientRect());

      const prev = lastPos.current.get(item.id);
      if (!prev) {
        // New node, animate it in
        node.style.opacity = "0";
        node.style.transform = "translateY(20px)";
        requestAnimationFrame(() => {
          node.style.transition = `all ${options.duration}ms ease`;
          node.style.opacity = "1";
          node.style.transform = "";
        });
        return;
      }

      const dy = prev.top - newPos.get(item.id)!.top;
      if (dy) {
        node.style.transform = `translateY(${dy}px)`;
        node.style.transition = "transform 0s";
        requestAnimationFrame(() => {
          node.style.transition = `transform ${options.duration}ms ease`;
          node.style.transform = "";
        });
      }
    });
    lastPos.current = newPos;
  }, [items, options.duration]);

  const getRef = (id: T["id"]) => (node: HTMLElement | null) => {
    if (node) {
      nodes.current.set(id, node);
    } else {
      nodes.current.delete(id);
    }
  };

  return getRef;
}
