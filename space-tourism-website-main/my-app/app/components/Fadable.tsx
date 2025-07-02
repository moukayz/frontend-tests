import { useEffect, useState } from "react";

export interface FadableProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
  fadeMs: number;
}

export default function Fadable({
  children,
  show,
  className,
  fadeMs = 500,
}: FadableProps) {
  const [visible, setVisible] = useState(show);

  // Mount on show → true; delay unmount on show → false
  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), fadeMs);
      return () => clearTimeout(t);
    }
  }, [show, fadeMs]);

  if (!visible) return null;

  return (
    <div
      style={{
        transitionDuration: `${fadeMs}ms`,
      }}
      className={`
        transition-opacity 
        col-start-1 row-start-1
        ${show ? "animate-fade-in" : "animate-fade-out"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
