interface CardProps {
  title: string;
  text: string;
  variant: "primary" | "secondary" | "tertiary";
}

export function Card({ title, text, variant }: CardProps) {
  const getCardClasses = () => {
    const baseClasses = "bg-transparent p-6 pixelated min-h-48";
    
    switch (variant) {
      case "primary":
        return `${baseClasses} border-gradient-primary`;
      case "secondary":
        return `${baseClasses} border-gradient-secondary`;
      case "tertiary":
        return `${baseClasses} border-gradient-tertiary`;
      default:
        return baseClasses;
    }
  };

  const getTitleClasses = () => {
    const baseClasses = "mb-4 pixelated";
    
    switch (variant) {
      case "primary":
        return `${baseClasses} text-gradient-primary`;
      case "secondary":
        return `${baseClasses} text-gradient-secondary`;
      case "tertiary":
        return `${baseClasses} text-gradient-tertiary`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={getCardClasses()}>
      <h2 className={getTitleClasses()}>
        {title}
      </h2>
      <p className="text-base-content leading-relaxed pixelated">
        {text}
      </p>
    </div>
  );
}