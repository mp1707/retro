interface CardProps {
  title: string;
  text: string;
  variant: "primary" | "secondary" | "tertiary";
}

export function Card({ title, text, variant }: CardProps) {
  const getCardClasses = () => {
    // Responsive padding: 16px mobile -> 20px tablet -> 24px desktop
    // Responsive border: 2px mobile -> 3px desktop  
    // Responsive min-height: smaller on mobile for better layout
    const baseClasses = "bg-transparent p-4 sm:p-5 md:p-6 pixelated min-h-[200px] sm:min-h-[220px] md:min-h-[240px] flex flex-col";
    
    // Responsive border classes
    const borderClasses = "border-2 md:border-[3px] border-solid";
    
    switch (variant) {
      case "primary":
        return `${baseClasses} ${borderClasses} border-gradient-primary`;
      case "secondary":
        return `${baseClasses} ${borderClasses} border-gradient-secondary`;
      case "tertiary":
        return `${baseClasses} ${borderClasses} border-gradient-tertiary`;
      default:
        return `${baseClasses} ${borderClasses}`;
    }
  };

  const getTitleClasses = () => {
    // Responsive title sizing: 18px mobile -> 20px tablet -> 24px desktop
    // Responsive spacing and letter spacing
    const baseClasses = "mb-3 sm:mb-4 pixelated text-sm sm:text-base md:text-lg lg:text-xl font-normal uppercase tracking-wider flex-shrink-0";
    
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
      <p className="text-base-content leading-relaxed pixelated text-sm sm:text-base flex-grow">
        {text}
      </p>
    </div>
  );
}