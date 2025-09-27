import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-gray-600 border rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-4 ${className}`}>{children}</div>
  );
}
