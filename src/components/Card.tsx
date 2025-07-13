interface CardProps {
  title: string;
  text: string;
  variant: "primary" | "secondary" | "tertiary";
}

export function Card({ title, text, variant }: CardProps) {
  const gradientMap = {
    primary: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
    secondary: "linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)",
    tertiary: "linear-gradient(90deg, #97CC04 0%, #5DDAA4 50%, #46B2E8 100%)"
  };

  return (
    <div 
      className="p-6 min-h-48"
      style={{
        background: "transparent",
        border: "3px solid",
        borderImageSource: gradientMap[variant],
        borderImageSlice: 1,
        imageRendering: "pixelated",
        fontFamily: "'Press Start 2P', 'VT323', monospace"
      }}
    >
      <h2 
        className="text-2xl font-normal uppercase mb-4 text-transparent bg-clip-text"
        style={{
          background: gradientMap[variant],
          backgroundClip: "text",
          letterSpacing: "0.05em",
          imageRendering: "pixelated"
        }}
      >
        {title}
      </h2>
      <p 
        className="text-[#EAEAEA] text-base leading-relaxed"
        style={{
          fontFamily: "'Press Start 2P', 'VT323', monospace",
          imageRendering: "pixelated"
        }}
      >
        {text}
      </p>
    </div>
  );
}