import React from "react";

export default function Item({
  onClickToggle,
  onClickDelete,
  item,
  authorName,
  isMine,
}) {
  return (
    <div className="w-full flex justify-between items-center p-1 border-l-2 border-b-2 border-amber-100 text-amber-50 rounded-lg bg-slate-700 mb-3">
      <p className="grow cursor-pointer" onClick={onClickToggle}>
        <span className="me-2">{item.done ? "✅" : "🟩"}</span>
        {/* Correction de ta logique de ligne barrée au passage ;) */}
        <span className={item.done ? "line-through text-slate-400" : ""}>
          {item.item}
        </span>

        {/* On n'affiche le nom que si ce n'est PAS à moi ET que le nom existe */}
        {!isMine && authorName && (
          <span className="text-xs text-slate-400 ms-2 italic">
            de {authorName}
          </span>
        )}
      </p>

      <button className="text-2xl px-2" onClick={onClickDelete}>
        🚮
      </button>
    </div>
  );
}
