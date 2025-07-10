"use client";
import React from "react";

interface AnimatedListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  removing?: boolean;
  onRemoved: () => void;
}

const AnimatedListItem = React.forwardRef<HTMLLIElement, AnimatedListItemProps>(
  ({ children, removing, onRemoved, className, ...props }, ref) => {
    const handleTransitionEnd = () => {
      if (removing) {
        onRemoved();
      }
    };

    return (
      <li
        ref={ref}
        onTransitionEnd={handleTransitionEnd}
        className={`
        transition-all duration-300 ease-in-out
        ${
          removing
            ? "translate-x-full opacity-0 max-h-0 !py-0 !my-0 !border-0 !p-0"
            : ""
        }
        ${className || ""}
      `}
        {...props}
      >
        {children}
      </li>
    );
  }
);

AnimatedListItem.displayName = "AnimatedListItem";

export default AnimatedListItem;
