---
name: LearnFlow
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 1.5rem
  margin: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system embodies a modern, highly focused, and balanced SaaS aesthetic tailored for sustained desktop study, modular learning paths, and progress tracking. It aims to evoke clarity, intellectual momentum, and effortless organization, ensuring cognitive load remains minimal during complex learning sessions.

Visual direction adheres to a clean, systematic Modern Corporate / Productivity style:
- Deep clarity through high text contrast against crisp, airy canvas tones.
- Structured modularity using distinct white containers on soft slate foundation layers.
- Purposeful feedback where interactive primary energy is signaled by vibrant indigo, and mastery/milestones are grounded in calm, reassuring emerald.
- Restrained visual noise: zero decorative gradients, no heavy skeuomorphic effects, and reliance on precision typography and strict geometric alignment.

## Colors
The palette is engineered to support hours of comfortable screen focus while making statuses unambiguous at a glance.

### Foundation & Surfaces
- **Canvas / App Background (`#F8FAFC`)**: A cool, ultra-light slate tint that grounds the workspace and reduces ocular fatigue compared to pure white.
- **Surface Containers (`#FFFFFF`)**: Pure white reserved for modular cards, analytical modules, course panels, and modal surfaces to create effortless spatial separation.
- **Muted Inset Surface (`#F1F5F9`)**: Used for table headers, progress track troughs, code blocks, and badge backgrounds.

### Borders & Dividers
- **Subtle Border (`#E2E8F0`)**: Default perimeter line for all cards, panels, and input boundaries.
- **Emphasized Border (`#CBD5E1`)**: Hover states, active separators, and focused component enclosures.

### Typography & Content
- **Text Primary (`#0F172A`)**: Deep slate for maximum legibility on headings, primary metrics, and active states.
- **Text Secondary (`#334155`)**: Slate body text balancing contrast and visual softness.
- **Text Muted (`#64748B`)**: Captions, timestamps, and placeholder labels.

### Semantic Accents
- **Primary / Action (`#4F46E5`)**: Electric indigo for active navigation items, primary buttons, links, and focused input rings. Deepens to `#4338CA` on interactive hover.
- **Success / Completion (`#059669`)**: Forest emerald for progress bars, streaks, completion badges, and verified mastery metrics. Soft variant `#10B981` acts as highlight fills.
- **Warning / Alert (`#D97706`)**: Amber for approaching deadlines or review requirements.
- **Destructive (`#DC2626`)**: Crisp red for destructive actions and quiz errors.

## Typography
Typography is driven by Inter across all levels to create an uninterrupted, utilitarian environment where reading comprehension is prioritized.

### Hierarchy & Scale Rules
- **Headline XL / LG**: Used strictly for page headers, course titles, and core milestone statistics. Always paired with negative tracking (`-0.02em` to `-0.015em`) to retain crisp density.
- **Headline MD / SM**: Designates dashboard widgets, syllabus modules, card titles, and modal headers.
- **Body**: Standardized to 14px (`body-md`) for standard study guides, flashcard prompts, and interface explanations, with 16px (`body-lg`) reserved for prolonged reading panes.
- **Labels**: Applied to status indicators, button text, table headers, and progress percentages. Uppercase transformations must only be applied to `label-sm` with widened letter-spacing (`0.04em`).

## Layout & Spacing
The layout relies on a structured, fluid grid paired with an 8-point base spatial rhythm for all margins, paddings, and column gaps.

### Desktop Layout Structure
- **Persistent Sidebar Navigation**: Fixed width at 260px, pinned to the left viewport edge with clear border demarcation against `#F8FAFC`.
- **Canvas Shell**: Main content spans fluidly with a maximum content constraint of `1440px`, centered within the viewport.
- **Grid Architecture**: 12-column layout on desktop viewports (>=1024px) with `1.5rem` (24px) gutters. Complex dashboards divide into an 8-column main study track and a 4-column secondary contextual rail (analytics, schedule, notes).

### Density Adjustments
- **Compact View (Flashcard & Testing views)**: Uses `space-sm` (8px) and `space-md` (16px) gaps to pack multiple reference nodes together.
- **Comfortable View (Curriculum & Reading views)**: Uses `space-lg` (24px) and `space-xl` (32px) margins around long-form text blocks to prevent line crowding.

## Elevation & Depth
Depth is established primarily via surface contrast and delicate, ambient shadows rather than heavy drop shadows or skeumorphic gradients.

### Tier Structure
- **Level 0 (Foundation)**: `#F8FAFC` base application background. Fully planar with zero elevation.
- **Level 1 (Cards & Modules)**: Pure white `#FFFFFF` surface bordered with `1px solid #E2E8F0` and elevated with an ultra-subtle ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`.
- **Level 2 (Hover States & Context Popovers)**: Cards lift on hover using a tightened shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)` and border transition to `#CBD5E1`.
- **Level 3 (Modals & Overlays)**: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)` centered above a dimming backdrop scrim (`rgba(15, 23, 42, 0.4)`).

## Shapes
A consistent geometric curvature of Level 2 (`roundedness: 2`) defines the physical identity:

- **Base Radius (`0.5rem` / 8px)**: Applied to default buttons, form input fields, tooltips, list item focus plates, and small badges.
- **Large Radius (`1rem` / 16px)**: Applied to core dashboard modules, study cards, resource containers, and dialog modals.
- **Pill Radius (`9999px`)**: Reserved strictly for linear progress indicators, tags, status pills, and user avatar chips.

## Components

### Buttons
- **Primary**: Solid `#4F46E5` fill, `#FFFFFF` text, `0.5rem` radius, padding `0.5rem 1rem`. Hover: `#4338CA`. Active: scale `0.98`. Focus: `2px` offset ring in `#4F46E5`.
- **Secondary / Subtle**: Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#334155`. Hover: background `#F8FAFC`, border `#CBD5E1`.
- **Success Action**: Solid `#059669` fill with `#FFFFFF` text, applied exclusively to lesson completion and quiz submission triggers.

### Cards & Modules
- Structured `#FFFFFF` background with `1px solid #E2E8F0` border and `1rem` corner rounding.
- Internal padding adheres to `1.5rem` for primary dashboard cards and `1rem` for secondary list widgets.
- Section headers within cards utilize `headline-sm` with a bottom divider `1px solid #F1F5F9`.

### Input Fields & Controls
- **Inputs**: Background `#FFFFFF`, border `1px solid #CBD5E1`, text `#0F172A`, placeholder `#94A3B8`. Focused state introduces a crisp border `#4F46E5` with `0 0 0 3px rgba(79, 70, 229, 0.12)`.
- **Checkboxes & Radios**: Size `1.125rem` square/circular controls. Unselected: `#FFFFFF` with `#CBD5E1` border. Selected: `#4F46E5` fill with white vector checkmark.

### Progress & Status Indicators
- **Track**: Height `8px`, background `#F1F5F9`, border-radius `9999px`.
- **Indicator Fill**: Smooth transitions via `#059669` emerald fill for completion states, or `#4F46E5` for in-progress tracks.
- **Badges**: Height `24px`, font `label-sm`, padding `0 0.5rem`, rounded-full. Emerald badges utilize `rgba(5, 150, 105, 0.1)` background with `#059669` text.

### Study Lists & Data Rows
- Alternating hover states on rows using `#F8FAFC` background.
- Left edge active indicator: `3px` solid `#4F46E5` stripe on selected lesson modules.