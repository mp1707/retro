import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Pixel fonts from design-system.json
      fontFamily: {
        'pixel': ['Pixel Operator', 'Press Start 2P', 'Silkscreen', 'VT323', 'monospace'],
        'sans': ['Pixel Operator', 'Press Start 2P', 'Silkscreen', 'VT323', 'monospace'],
      },
      
      // Individual gradient stop colors for fine control (if needed)
      colors: {
        'sunset': {
          start: '#FFD166',
          mid: '#F79F79', 
          end: '#F786A3',
        },
        'orchid': {
          start: '#F79F79',
          mid: '#D497E8',
          end: '#A29BFE',
        },
        'evergreen': {
          start: '#97CC04',
          mid: '#5DDAA4',
          end: '#46B2E8',
        },
      },
      
      // Typography scales matching design-system.json
      fontSize: {
        'display': ['48px', { lineHeight: '1.1', letterSpacing: '0.1em' }], // h1
        'title': ['24px', { lineHeight: '1.2', letterSpacing: '0.05em' }], // h2  
      },
      
      // Animation timing functions for physics-based motion
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;

export default config;