interface CardProps {
  text: string;
}

export function Card({ text }: CardProps) {
  return (
    <div 
      className="bg-yellow-200 p-4 rounded-lg shadow-md border border-yellow-300 min-h-32 max-w-sm"
      style={{
        fontFamily: 'var(--font-handjet), "Chicago", "Monaco", "Courier New", monospace',
        fontWeight: 300,
        WebkitFontSmoothing: "none",
        MozOsxFontSmoothing: "unset",
        textRendering: "geometricPrecision",
        imageRendering: "pixelated",
      }}
    >
      <p className="text-gray-800 text-base leading-relaxed">
        {text}
      </p>
    </div>
  );
}