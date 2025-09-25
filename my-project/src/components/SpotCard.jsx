import React, { useRef } from "react";

export default function SpotCard({ children, className = "", onMouseMove }) {
  const ref = useRef();
  function handleMove(e) {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    ref.current.style.setProperty("--x", x + "%");
    ref.current.style.setProperty("--y", y + "%");
    if (onMouseMove) onMouseMove(e);
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`
        card-spotlight card-hover glass rounded-2xl p-4 shadow-md

        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        transition-colors duration-300

        ${className}
      `}
    >
      {children}
    </div>
  );
}
