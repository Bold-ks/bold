export function PlaceholderImage({
  name,
  className = '',
  aspect = 'aspect-square',
}: {
  name: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`bg-warm-100 flex items-center justify-center ${aspect} ${className}`}
    >
      <span className="text-warm-400 text-xs tracking-widest uppercase text-center px-4">
        {name}
      </span>
    </div>
  );
}
