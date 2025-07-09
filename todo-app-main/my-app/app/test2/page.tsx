"use client";

import { useState } from "react";
import { DraggableList } from "../DraggableList";
import { DraggableItem } from "../DraggableItem";

interface Todo {
  id: number;
  text: string;
}

const initialTodos: Todo[] = [
  { id: 1, text: "Complete online JavaScript course" },
  { id: 2, text: "Jog around the park 3x" },
  { id: 3, text: "10 minutes meditation" },
  { id: 4, text: "Read for 1 hour" },
  { id: 5, text: "Pick up groceries" },
  { id: 6, text: "Complete Todo App on Frontend Mentor" },
];

function MyItem({ item }: { item: Todo }) {
  return <div className="p-4 rounded-md bg-gray-600">{item.text}</div>;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  console.log("render page");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Todo App</h1>
        <DraggableList<Todo>
          onItemsChange={setTodos}
          listClassName="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col"
        >
          {todos.map((item, index) => (
            <DraggableItem key={item.id} index={index}>
              <MyItem item={item} />
            </DraggableItem>
          ))}
        </DraggableList>
      </div>
    </main>
  );
};

export default Home;
