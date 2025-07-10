"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CloseIconProps {
  onClick?: () => void;
  className?: string;
}

const CloseIcon = ({ onClick, className }: CloseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      />
    </svg>
  );
};
interface CheckIconProps {
  isChecked?: boolean;
  onClick?: () => void;
  className?: string;
}

const CheckIcon = ({
  isChecked = false,
  onClick,
  className,
}: CheckIconProps) => (
  <div
    className={`shrink-0 w-6 h-6  border-gray-200 rounded-full flex items-center justify-center
    ${
      isChecked
        ? "bg-linear-to-br from-check-start to-check-end border-0"
        : "border-2"
    }
    ${className}
    `}
    onClick={onClick}
  >
    {isChecked && (
      <Image
        src="/images/icon-check.svg"
        alt="check"
        width={24}
        height={24}
        className="w-3 h-3"
      />
    )}
  </div>
);

type Todo = {
  title: string;
  done: boolean;
};

interface TodoItemProps {
  todo: Todo;
  onClick?: () => void;
}

const TodoItem = ({ todo, onClick }: TodoItemProps) => {
  return (
    <div className="flex items-center p-4 gap-4">
      <CheckIcon isChecked={todo.done} onClick={onClick} />
      <span className={` ${todo.done ? "line-through text-gray-400" : ""}`}>
        {todo.title}
      </span>
      <CloseIcon className="shrink-0 ml-auto w-4 h-4 cursor-pointer text-gray-400" />
    </div>
  );
};

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const data = fetch("/data.json");
    data.then((res) => res.json()).then((data) => setTodos(data));
  }, []);

  return (
    <div className="px-6 flex flex-col gap-4">
      <div className="flex items-center p-4 gap-4 bg-surface rounded-md">
        <CheckIcon className="" />
        <input
          type="text"
          className="flex-1 outline-none"
          placeholder="Create a new todo..."
        />
      </div>

      <div className="flex flex-col bg-surface rounded-md">
        {todos.map((item, index) => {
          return (
            <div key={index}>
              <TodoItem key={index} todo={item} onClick={() => {}} />
              <div className="border-b-2 h-0 w-full border-gray-200"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
