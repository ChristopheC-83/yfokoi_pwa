import React from "react";

export default function PersonnalItem({ onClickToggle, onClickDelete, item }) {
  return (
    <div className="w-full max-w-96 mx-auto flex justify-between items-center p-1 border-l border-b border-amber-100 text-amber-50 rounded-lg bg-slate-700 mb-3 shadow-2xl">
      <p className="grow cursor-pointer" onClick={onClickToggle}>
        <span className="me-2">{item.done ? "✅" : "🟩"}</span>
        <span className={item.done ? "line-through text-slate-400" : ""}>
          {item.text}
        </span>
      </p>

      <button className="text-2xl " onClick={onClickDelete}>
        🚮
      </button>
    </div>
  );
}
