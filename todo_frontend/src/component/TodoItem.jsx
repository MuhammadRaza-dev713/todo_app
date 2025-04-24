import React from "react";
export default function TodoItem({ todo, onDelete, onToggle }) {
    return (
      <div className="flex justify-between items-center p-3 border-b">
        <span
          className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
          onClick={() => onToggle(todo._id)}
        >
          {todo.text}
        </span>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    );
  }
  