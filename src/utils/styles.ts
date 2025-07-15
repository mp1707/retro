import { CSSProperties } from "react";

export const basePixelFont: CSSProperties = {
  fontFamily: "var(--font-family)",
  imageRendering: "pixelated",
} as const;

export const gradientText = (gradient: "primary" | "secondary" | "tertiary"): CSSProperties => ({
  ...basePixelFont,
  color: "transparent",
  background: `var(--gradient-${gradient})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
});

export const h1Styles: CSSProperties = {
  ...basePixelFont,
  fontSize: "48px",
  fontWeight: "400",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

export const h2Styles: CSSProperties = {
  ...basePixelFont,
  fontSize: "24px",
  fontWeight: "400",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

export const bodyTextStyles: CSSProperties = {
  ...basePixelFont,
  fontSize: "16px",
  fontWeight: "400",
  color: "var(--text-default)",
  lineHeight: "1.5",
};

export const linkStyles: CSSProperties = {
  ...basePixelFont,
  fontSize: "18px",
  color: "var(--text-muted)",
  textDecoration: "none",
};

export const linkHoverStyles: CSSProperties = {
  color: "var(--text-default)",
  textDecoration: "underline",
};

export const buttonBaseStyles: CSSProperties = {
  ...basePixelFont,
  fontSize: "16px",
  padding: "12px 24px",
  border: "none",
  borderRadius: "0",
  cursor: "pointer",
};

export const primaryButtonStyles: CSSProperties = {
  ...buttonBaseStyles,
  background: "var(--gradient-primary)",
  color: "var(--background)",
  fontWeight: "bold",
};

export const textLinkButtonStyles: CSSProperties = {
  ...buttonBaseStyles,
  background: "transparent",
  color: "var(--text-default)",
  padding: "8px",
};

export const cardBaseStyles: CSSProperties = {
  ...basePixelFont,
  background: "transparent",
  padding: "24px",
  borderStyle: "solid",
  borderWidth: "3px",
  borderRadius: "0",
  borderImageSlice: "1",
};

export const getCardStyles = (variant: "primary" | "secondary" | "tertiary"): CSSProperties => ({
  ...cardBaseStyles,
  borderImageSource: `var(--gradient-${variant})`,
});

export const dividerStyles: CSSProperties = {
  height: "2px",
  background: "var(--divider)",
  border: "none",
  imageRendering: "pixelated",
};

export const listStyles: CSSProperties = {
  ...basePixelFont,
  listStyle: "none",
  paddingLeft: "0",
};

export const listItemStyles: CSSProperties = {
  color: "var(--text-default)",
  fontSize: "16px",
  padding: "8px 0",
};