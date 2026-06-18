interface ClassifyHeaderProps {
  unknownCount: number;
}

export default function ClassifyHeader({ unknownCount }: ClassifyHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold dark:text-gray-100">Classify ({unknownCount})</h1>
    </div>
  );
}
