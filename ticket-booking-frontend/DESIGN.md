# Ticket Booking Frontend Design System

## Theme Overview
The design follows a professional, clean, and corporate aesthetic inspired by modern workspace management portals. It includes a landing page for users and a comprehensive dashboard for administrators.

## Color Palette
### Core Branding
| Name | Hex | Usage |
| :--- | :--- | :--- |
| **Brand Blue** | `#0071ad` | Primary brand color, main buttons, headings. |
| **Brand Dark Blue** | `#005a8a` | Button hover states. |
| **Background** | `#f3f4f6` | Page background for subtle contrast. |
| **Surface** | `#ffffff` | Cards, navigation bar, hero sections. |

### Dashboard Accents
| Name | Hex | Usage |
| :--- | :--- | :--- |
| **Info Blue** | `#1e739f` | Total seats stat card. |
| **Success Green** | `#0e9f6e` | Reserve stat card. |
| **Danger Red** | `#f05252` | Cancel stat card. |
| **Active Blue** | `#3b82f6` | Admin form accents and active states. |

## Typography
- **Primary Font**: `Roboto` (Sans-serif)
- **Icons**: Font Awesome 6.4.0
- **Scale**:
  - H1 (Landing): 2.25rem (36px)
  - H2 (Admin): 1.5rem (24px)
  - Stats: 3rem (48px)

## UI Components
### Admin Sidebar
- **Width**: 256px (w-64)
- **Border**: 1px Solid Blue 500 (Right), 1px Dashed Slate 300 (Top/Bottom separators).
- **Items**: Active state with light blue background (`#eff6ff`) and dark blue text (`#2563eb`).

### Stats Cards
- **Radius**: 0.5rem (8px)
- **Layout**: Centered icon, title, and large value.
- **Colors**: Solid colored backgrounds for high visibility.

### Tabs
- **Style**: Text-only buttons with a 2px bottom border on the active tab.

### Forms
- **Input Control**: 1px dashed slate border, blue ring on focus.
- **Icon Integration**: Functional icons placed inside inputs (e.g., user icon for seat count).

## Layout
- **Landing**: Top sticky navigation with a centered hero section.
- **Admin**: Flexbox-based layout with a persistent sidebar and fluid main content area.
