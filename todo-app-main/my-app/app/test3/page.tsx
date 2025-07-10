"use client";
import React, { useState } from "react";
import AnimatedList from "../components/AnimatedList";

type Row = { id: number; text: string };

const initial: Row[] = [
  { id: 1, text: "First task" },
  { id: 2, text: "Write report" },
  { id: 3, text: "Review PRs" },
  { id: 4, text: "Update documentation" },
  { id: 5, text: "Fix bug in login" },
  { id: 6, text: "Fix bug in login" },
  { id: 7, text: "Fix bug in login" },
];

export default function FancyList() {
  const [rows, setRows] = useState(initial);

  const removeItem = (id: number) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  return (
    <AnimatedList
      items={rows}
      className="w-full max-w-md mx-auto"
      itemClassName="relative rounded-md bg-white shadow flex items-center justify-between px-4 mb-2 py-2 overflow-hidden"
    >
      {(r) => (
        <>
          <span>{r.text}</span>
          <button
            onClick={() => removeItem(r.id)}
            className="text-red-500 hover:text-red-600"
          >
            ✕
          </button>
        </>
      )}
    </AnimatedList>
  );
}
