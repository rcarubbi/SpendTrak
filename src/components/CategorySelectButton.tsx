interface CategorySelectButtonProps {
  name: string;
  color: string;
  onClick: () => void;
}

export default function CategorySelectButton({ name, color, onClick }: CategorySelectButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded text-xs font-semibold cursor-pointer border transition-colors hover:text-white"
      style={{
        borderColor: color,
        color: color,
        background: "white",
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = color)}
      onMouseOut={(e) => (e.currentTarget.style.background = "white")}
    >
      {name}
    </button>
  );
}
