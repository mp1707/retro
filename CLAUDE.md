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

This is a **Next.js 15** application using the **App Router** with React 19 and TypeScript. It's a responsive retrospective tool with a retro pixel design system that works elegantly across all device sizes.

### Key Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable UI components 
- `design-system.json` - Complete design system specification with responsive guidelines

### State Management
- Local component state with React hooks
- Theme management via DaisyUI's native theme system with localStorage persistence
- No global state library - keeping it simple

## Design System Integration

**CRITICAL**: ALWAYS reference `design-system.json` for ALL UI styling and animations. This project uses the "Retrograde Pixel" design system (v1.2.0) with **DaisyUI custom themes** and **comprehensive responsive design**.

### Mandatory Requirements for ALL UI Work
1. **ALWAYS check `design-system.json` FIRST** before creating or modifying any UI elements
2. **ALWAYS use DaisyUI semantic classes** - `bg-base-100`, `text-base-content`, etc.
3. **ALWAYS implement responsive design** - Mobile-first approach with elegant scaling
4. **ALWAYS use Framer Motion** for animations - follow the exact specifications in design-system.json
5. **ALWAYS check existing components** before creating new ones (`src/components/`)
6. **ALWAYS create reusable components** when they could be useful elsewhere
7. **ALWAYS use the `.pixelated` class** for pixel-perfect rendering
8. **ALWAYS ensure touch targets are minimum 44px** on mobile devices

### Core Design Principles (from design-system.json)
- **Mobile-first responsive design** - Every component must work elegantly from 320px to 1920px+
- **NO shadows, blur, or border-radius** - maintains sharp pixelated aesthetic
- **Two custom DaisyUI themes**: `retrodark` (default) and `retrolight`
- **Three gradient variants**: 
  - Primary "Sunset": `linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%)`
  - Secondary "Orchid": `linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%)`
  - Tertiary "Evergreen": `linear-gradient(90deg, #97CC04 0%, #5DDAA4 50%, #46B2E8 100%)`
- **Pixel fonts**: 'Pixel Operator', 'Press Start 2P', 'Silkscreen', 'VT323', monospace
- **Transparent card backgrounds** with gradient borders ONLY

## Responsive Design Requirements

### Breakpoints (Tailwind CSS)
- **Mobile**: `< 640px` (sm:) - Primary design target, touch-friendly
- **Tablet**: `640px - 768px` (sm: to md:) - Two-column layouts  
- **Desktop**: `768px+` (md:+) - Multi-column layouts, hover states
- **Large**: `1024px+` (lg:+) - Maximum content width constraints

### Typography Scaling (from design-system.json)
- **H1**: 24px → 36px → 48px (mobile → tablet → desktop)
- **H2**: 18px → 20px → 24px (mobile → tablet → desktop)  
- **P**: 14px → 15px → 16px (mobile → tablet → desktop)
- **Links**: 16px → 18px (mobile → desktop)

### Component Responsive Patterns
```typescript
// ✅ Responsive typography
className="text-xl sm:text-2xl md:text-3xl lg:text-5xl"

// ✅ Responsive spacing
className="p-4 sm:p-6 md:p-8"

// ✅ Responsive grid
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"

// ✅ Mobile-first utility classes
className="w-full max-w-sm sm:max-w-md md:max-w-6xl mx-auto"

// ✅ Touch targets on mobile
className="min-h-[44px] sm:min-h-auto"
```

### Mobile-First Implementation
1. **Design for mobile first** - Start with smallest screen, add larger breakpoints
2. **Touch targets minimum 44px** - All interactive elements
3. **Single column layouts** on mobile for readability
4. **Simplified navigation** - Hamburger menu pattern on mobile
5. **Performance optimization** - Reduced animations on mobile
6. **Content hierarchy** - Most important content visible first

### Required Implementation Patterns

#### Typography (from design-system.json)
- **H1**: Responsive scaling from 24px (mobile) to 48px (desktop), uppercase, gradient text
- **H2**: Responsive scaling from 18px (mobile) to 24px (desktop), for card titles
- **P**: Responsive scaling from 14px (mobile) to 16px (desktop), optimized readability
- **Links**: Touch-friendly sizing, minimum 44px height on mobile

#### Cards (from design-system.json)
- **CRITICAL**: Cards must have transparent backgrounds, NOT gradient backgrounds
- **Responsive padding**: 16px → 20px → 24px (mobile → tablet → desktop)
- **Responsive borders**: 2px → 3px (mobile → desktop)
- **Layout adaptation**: 1 col → 2 col → 3 col (mobile → tablet → desktop)
- **Variants**: primary/secondary/tertiary with matching border and heading gradients

#### Buttons (from design-system.json)
- **Touch targets**: Minimum 44px height on mobile
- **Responsive padding**: Smaller on mobile, standard on desktop
- **Touch feedback**: `whileTap` for mobile, `whileHover` for desktop
- **NO border-radius**: Always square corners (enforced by DaisyUI theme)

#### Navigation (from design-system.json)
- **Mobile**: Hamburger menu pattern, hide secondary items
- **Tablet**: Horizontal navigation with touch spacing
- **Desktop**: Full navigation with hover states

### Animation Specifications (from design-system.json)
- **Card Loading**: Faster stagger on mobile (0.1s vs 0.2s desktop)
- **Button Interactions**: `whileTap` for mobile touch feedback
- **Performance**: Respect `prefers-reduced-motion` for accessibility
- **Mobile optimization**: Simplified animations for better performance

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

#### Responsive Component Class Pattern
```typescript
// ✅ Responsive DaisyUI classes with mobile-first approach
className="bg-base-100 text-base-content p-4 sm:p-6 md:p-8"
className="border-base-300 hover:border-base-content min-h-[44px] sm:min-h-auto"
className="btn bg-transparent border-base-300 text-sm sm:text-base"

// ✅ Custom gradient utilities with responsive sizing
className="text-gradient-primary text-xl sm:text-2xl md:text-3xl"
className="border-gradient-primary border-2 sm:border-3"
className="pixelated"

// ✅ Responsive grid layouts
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
```

#### Animation Integration
```typescript
// ✅ Responsive animations with mobile optimization
<motion.div 
  className="bg-transparent p-4 sm:p-6 border-gradient-primary pixelated"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.02 }} // Desktop hover
  whileTap={{ scale: 0.98 }}   // Mobile touch
  transition={{ 
    duration: window.matchMedia("(max-width: 640px)").matches ? 0.3 : 0.4 
  }}
>
```

### File References
- **`tailwind.config.ts`** - DaisyUI configuration and responsive breakpoints
- **`src/app/globals.css`** - Custom DaisyUI themes and responsive gradient utilities
- **`design-system.json`** - Source of truth for all design and responsive decisions

## Component Architecture

### Cards
- Three variants: primary (sunset), secondary (orchid), tertiary (evergreen)
- Responsive gradient borders with transparent backgrounds
- Headers use gradient text matching border color
- Adaptive layout: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)

### Theme System
- **DaisyUI native theme switching** between `retrodark` and `retrolight`
- **Simple ThemeToggle component** with localStorage persistence and touch optimization
- **System preference detection** with automatic theme application
- **Inline script in layout** for SSR-safe theme initialization

### Navigation
- **Responsive header** with mobile-first approach
- **Mobile**: Simplified navigation, touch-friendly targets
- **Desktop**: Full navigation with hover states
- **Logo**: Responsive sizing across breakpoints

### Typography
- **Responsive scaling**: All text sizes adapt to screen size
- **Mobile-optimized**: Smaller sizes for better mobile readability
- **Pixel-perfect rendering**: Maintains `.pixelated` class across all sizes

## Development Patterns

### Responsive Development Workflow
1. **Start with mobile design** (320px viewport)
2. **Add responsive breakpoints** progressively (sm:, md:, lg:)
3. **Test across devices** including touch interactions
4. **Optimize performance** for mobile networks
5. **Verify accessibility** at all screen sizes

### File Organization
- Use absolute imports with `@/` prefix (maps to `./src/`)
- Components should be PascalCase and descriptive
- Prefer editing existing files over creating new ones
- All components must be responsive by default

### TypeScript
- Strict mode enabled with path mapping
- Define proper interfaces for all props
- **AVOID explicit JSX.Element return types** - TypeScript infers them automatically in React 19
- Include responsive prop variations where needed

### Common React 19 TypeScript Fixes
```typescript
// ❌ Bad - Explicit JSX.Element return type (breaks in React 19)
export default function MyComponent(): JSX.Element {
  return <div>Hello</div>;
}

// ✅ Good - Let TypeScript infer the return type
export default function MyComponent() {
  return <div>Hello</div>;
}

// ❌ Bad - Framer Motion type issues
transition={{ type: "spring", stiffness: 400, damping: 30 }}

// ✅ Good - Add 'as const' to fix type inference
transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
```

### Performance
- Turbopack enabled for faster development builds
- next/font for optimized font loading
- Client-side hydration with SSR support
- Mobile-optimized animations and interactions

## Current Features

The application is a fully responsive retrospective tool with:
- **Responsive three retrospective card types** with adaptive layout
- **Touch-optimized interactive forms** with submission states
- **Mobile-friendly action items** management
- **Responsive header** with live clock and mobile navigation
- **Adaptive DaisyUI theme switching** (retrodark/retrolight)
- **Consistent pixel art aesthetic** across all device sizes

## Theme Implementation Notes

### DaisyUI Integration
- Custom themes defined using `@plugin "daisyui/theme"` syntax
- No border radius (--radius-*: 0) maintains pixel aesthetic
- OKLCH color space for consistent color appearance
- Semantic color variables work automatically with DaisyUI components

### Custom Utilities
Essential gradient utilities preserved in `globals.css`:
- `.text-gradient-primary/secondary/tertiary` - Responsive gradient text effects
- `.border-gradient-primary/secondary/tertiary` - Adaptive gradient borders
- `.pixelated` - Image rendering for sharp edges across all sizes

### Theme Toggle
Simple implementation using DaisyUI's native theme system:
- `data-theme` attribute switching
- localStorage persistence
- System preference detection
- Touch-optimized for mobile devices
- No complex context providers needed

## Responsive Testing Checklist

### Required Testing
- [ ] **Mobile**: 320px to 639px (iPhone SE to iPhone Pro Max)
- [ ] **Tablet**: 640px to 767px (iPad Mini to iPad Pro)
- [ ] **Desktop**: 768px to 1023px (Small laptops)
- [ ] **Large**: 1024px+ (Desktop monitors)

### Interaction Testing
- [ ] **Touch targets**: All interactive elements minimum 44px
- [ ] **Navigation**: Mobile hamburger menu functionality
- [ ] **Buttons**: Touch feedback and hover states
- [ ] **Forms**: Touch-friendly inputs and validation
- [ ] **Theme toggle**: Works across all screen sizes

### Performance Testing
- [ ] **Mobile networks**: Fast loading on 3G/4G
- [ ] **Animation performance**: Smooth on lower-end devices
- [ ] **Font loading**: Optimized pixel fonts across devices
- [ ] **Image rendering**: Pixelated aesthetic maintained

Remember: **Every component must work beautifully on every screen size** while maintaining the retro pixel aesthetic and optimal usability.