import React from 'react'

export default function Item({onClick, item, authorName, userName}) {
  return (
    <div className="w-full flex justify-between items-center p-2 rounded-lg">
      <p
        className="grow border-b-2 border-l-2 border-amber-100 p-2 text-amber-50 rounded-lg bg-slate-700 "
        onClick={onClick}
      >
        <span className="me-2">{item.done ? "✅" : "❌"}</span>
        <span className={item.done ? "" : "line-through"}>{item.item}</span>
        <span className="text-xs text-slate-400 ms-2">
          {authorName != userName ? `de ${authorName}` || "Inconnu" : ""}
        </span>
      </p>
    </div>
  );
}
