export type ThemeMode = "dark" | "light";

export interface ThemeColors {
  background: string;
  text: {
    default: string;
    muted: string;
  };
  divider: string;
}

export interface ThemeGradients {
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface Theme {
  colors: ThemeColors;
  gradients: ThemeGradients;
  fontFamily: string;
}

export const themes: Record<ThemeMode, Theme> = {
  dark: {
    colors: {
      background: "#1A1A1A",
      text: {
        default: "#EAEAEA",
        muted: "#A0A0A0",
      },
      divider: "#666666",
    },
    gradients: {
      primary: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
      secondary: "linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)",
      tertiary: "linear-gradient(90deg, #97CC04 0%, #5DDAA4 50%, #46B2E8 100%)",
    },
    fontFamily: "'Pixel Operator', 'Press Start 2P', 'Silkscreen', 'VT323', monospace",
  },
  light: {
    colors: {
      background: "#F8F9FA",
      text: {
        default: "#2D3748",
        muted: "#718096",
      },
      divider: "#E2E8F0",
    },
    gradients: {
      primary: "linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)",
      secondary: "linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)",
      tertiary: "linear-gradient(90deg, #97CC04 0%, #5DDAA4 50%, #46B2E8 100%)",
    },
    fontFamily: "'Pixel Operator', 'Press Start 2P', 'Silkscreen', 'VT323', monospace",
  },
};

export const getTheme = (mode: ThemeMode): Theme => themes[mode];

export const getCSSVariables = (theme: Theme): Record<string, string> => ({
  "--background": theme.colors.background,
  "--text-default": theme.colors.text.default,
  "--text-muted": theme.colors.text.muted,
  "--divider": theme.colors.divider,
  "--gradient-primary": theme.gradients.primary,
  "--gradient-secondary": theme.gradients.secondary,
  "--gradient-tertiary": theme.gradients.tertiary,
  "--font-family": theme.fontFamily,
});

export const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};