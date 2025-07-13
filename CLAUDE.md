# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev       # Start development server with Turbopack (faster builds)
npm run build     # Create production build  
npm run start     # Serve production build
npm run lint      # ESLint with Next.js rules
```

## Architecture Overview

This is a **Next.js 15** application using the **App Router** with React 19 and TypeScript. It's a retrospective tool with a retro pixel design system.

### Key Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable UI components 
- `design-system.json` - Complete design system specification

### State Management
- Local component state with React hooks
- Theme management via DaisyUI's native theme system with localStorage persistence
- No global state library - keeping it simple

## Design System Integration

**CRITICAL**: ALWAYS reference `design-system.json` for ALL UI styling and animations. This project uses the "Retrograde Pixel" design system (v1.1.0) with **DaisyUI custom themes**.

### Mandatory Requirements for ALL UI Work
1. **ALWAYS check `design-system.json` FIRST** before creating or modifying any UI elements
2. **ALWAYS use DaisyUI semantic classes** - `bg-base-100`, `text-base-content`, etc.
3. **ALWAYS use Framer Motion** for animations - follow the exact specifications in design-system.json
4. **ALWAYS check existing components** before creating new ones (`src/components/`)
5. **ALWAYS create reusable components** when they could be useful elsewhere
6. **ALWAYS use the `.pixelated` class** for pixel-perfect rendering

### Core Design Principles (from design-system.json)
- **NO shadows, blur, or border-radius** - maintains sharp pixelated aesthetic
- **Two custom DaisyUI themes**: `retrodark` (default) and `retrolight`
- **Three gradient variants**: 
  - Primary "Sunset": `linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)`
  - Secondary "Orchid": `linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)`
  - Tertiary "Evergreen": `linear-gradient(90deg, #97CC04 0%, #5DDAA4 50%, #46B2E8 100%)`
- **Pixel fonts**: 'Pixel Operator', 'Press Start 2P', 'Silkscreen', 'VT323', monospace
- **Transparent card backgrounds** with gradient borders ONLY

### Required Implementation Patterns

#### Typography (from design-system.json)
- **H1**: 48px, uppercase, gradient text, 0.1em letter-spacing (for main titles)
- **H2**: 24px, uppercase, gradient text, 0.05em letter-spacing (for card titles)
- **P**: 16px, `text-base-content`, 1.5 line-height (for body content)
- **Links**: 18px, hover states with underline and color change

#### Cards (from design-system.json)
- **CRITICAL**: Cards must have transparent backgrounds, NOT gradient backgrounds
- **Border only**: Use custom gradient border utilities
- **Padding**: 24px (`p-6`)
- **Border**: 3px solid with `image-rendering: pixelated`
- **Variants**: primary/secondary/tertiary with matching border and heading gradients

#### Buttons (from design-system.json)
- **Primary**: Gradient background, dark text (#1A1A1A), hover scale(1.05)
- **Text Links**: Transparent background, hover with subtle background and color change
- **NO border-radius**: Always square corners (enforced by DaisyUI theme)

#### Icons (from design-system.json)
- **Multicolored pixel art style** - DO NOT use single solid colors
- **24px size**
- **Context-appropriate gradients** (delete=Orchid, new feature=Evergreen, etc.)

### Animation Specifications (from design-system.json)
- **Card Loading**: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, staggered
- **Button Hover**: `whileHover={{ scale: 1.05 }}` for primary buttons
- **Text Render**: Character-by-character stagger for headings (typing effect)
- **Physics-based**: Use spring animations over linear transitions

### DaisyUI Theme Architecture

#### Custom Themes
The application uses two custom DaisyUI themes defined in `globals.css`:
- **`retrodark`** (default, prefersdark) - Dark mode with #1A1A1A background
- **`retrolight`** (light mode) - Light mode with #F8F9FA background

#### Theme Colors
```typescript
// Use DaisyUI semantic color classes
className="bg-base-100"        // Background color
className="text-base-content"  // Primary text
className="border-base-300"    // Border color
className="bg-primary"         // Primary accent color
className="text-primary-content" // Text on primary background
```

#### Component Class Pattern
```typescript
// ✅ Use DaisyUI semantic classes
className="bg-base-100 text-base-content"     // Background and text
className="border-base-300 hover:border-base-content" // Interactive borders
className="btn bg-transparent border-base-300" // Button styling

// ✅ Use custom gradient utilities (defined in globals.css)
className="text-gradient-primary"     // Primary gradient text
className="border-gradient-primary"   // Primary gradient border
className="pixelated"                 // Pixel-perfect rendering
```

#### Animation Integration
```typescript
// ✅ Combine DaisyUI classes with Framer Motion
<motion.div 
  className="bg-transparent p-6 border-gradient-primary pixelated"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.02 }}
>
```

### File References
- **`tailwind.config.ts`** - DaisyUI configuration and custom colors
- **`src/app/globals.css`** - Custom DaisyUI themes and gradient utilities
- **`design-system.json`** - Source of truth for all design decisions

## Component Architecture

### Cards
- Three variants: primary (sunset), secondary (orchid), tertiary (evergreen)
- Gradient borders with transparent backgrounds using custom CSS utilities
- Headers use gradient text matching border color

### Theme System
- **DaisyUI native theme switching** between `retrodark` and `retrolight`
- **Simple ThemeToggle component** with localStorage persistence
- **System preference detection** with automatic theme application
- **Inline script in layout** for SSR-safe theme initialization

### Typography
- H1: 48px uppercase gradient text for main titles
- H2: 24px uppercase gradient text for card titles  
- P: 16px `text-base-content` for body content
- Pixel-perfect letter spacing and rendering with `.pixelated` class

## Development Patterns

### File Organization
- Use absolute imports with `@/` prefix (maps to `./src/`)
- Components should be PascalCase and descriptive
- Prefer editing existing files over creating new ones

### TypeScript
- Strict mode enabled with path mapping
- Define proper interfaces for all props
- Use explicit return types for components

### Performance
- Turbopack enabled for faster development builds
- next/font for optimized font loading
- Client-side hydration with SSR support

## Current Features

The application is a retrospective tool with:
- Three retrospective card types with gradient borders
- Interactive forms with submission states
- Action items management
- Live clock in header
- DaisyUI theme switching (retrodark/retrolight)
- Pixel art aesthetic with modern functionality

## Theme Implementation Notes

### DaisyUI Integration
- Custom themes defined using `@plugin "daisyui/theme"` syntax
- No border radius (--radius-*: 0) maintains pixel aesthetic
- OKLCH color space for consistent color appearance
- Semantic color variables work automatically with DaisyUI components

### Custom Utilities
Essential gradient utilities preserved in `globals.css`:
- `.text-gradient-primary/secondary/tertiary` - Gradient text effects
- `.border-gradient-primary/secondary/tertiary` - Gradient borders
- `.pixelated` - Image rendering for sharp edges

### Theme Toggle
Simple implementation using DaisyUI's native theme system:
- `data-theme` attribute switching
- localStorage persistence
- System preference detection
- No complex context providers needed