interface CategorySelectButtonProps {
  name: string;
  color: string;
  onClick: () => void;
}

export default function CategorySelectButton({ name, color, onClick }: CategorySelectButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
      style={{
        borderColor: color,
        color: color,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = color;
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "";
        e.currentTarget.style.color = color;
      }}
    >
      {name}
    </button>
  );
}
