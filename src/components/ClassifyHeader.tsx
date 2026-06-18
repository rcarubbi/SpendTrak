interface ClassifyHeaderProps {
  unknownCount: number;
}

export default function ClassifyHeader({ unknownCount }: ClassifyHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Classify <span className="text-gray-400 dark:text-gray-500 font-normal">({unknownCount})</span>
      </h1>
    </div>
  );
}
