const EMOJI_OPTIONS = [
  "📝",
  "🛒",
  "🎯",
  "🚀",
  "💡",
  "🏋️‍♂️",
  "🎨",
  "🧹",
  "💰",
  "📅",
];

export function EmojiPicker({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      {EMOJI_OPTIONS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className={`text-2xl p-2 rounded-xl transition-all ${
            selected === emoji
              ? "bg-amber-500 scale-110 shadow-lg"
              : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
