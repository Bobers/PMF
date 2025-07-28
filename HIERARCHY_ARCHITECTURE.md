# EMU Hierarchy Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          EMU Platform                           │
├─────────────────────────────────────────────────────────────────┤
│                     Next.js 15 Application                      │
├─────────────────────────────────────────────────────────────────┤
│                    TypeScript + React 18.3                      │
├─────────────────────────────────────────────────────────────────┤
│                  Tailwind CSS + Lucide Icons                    │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
pmf-validator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page (renders EMUDashboardV2)
│   │   └── globals.css         # Global styles & Tailwind imports
│   │
│   └── components/             # React Components
│       ├── EMUPrototype.tsx    # [ARCHIVED] Original prototype
│       ├── EMUDashboard.tsx    # [DEPRECATED] V1 with section-level controls
│       ├── EMUDashboardV2.tsx  # [ACTIVE] Production component
│       └── EMUDashboardV3.tsx  # [PROTOTYPE] Pivot system experiment
│
├── public/                     # Static assets
├── node_modules/              # Dependencies
├── .next/                     # Build output
│
├── package.json               # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.mjs        # PostCSS configuration
│
├── README.md                 # Project overview
├── TECHNICAL_DOCS.md         # Technical documentation
├── API_REFERENCE.md          # API specifications
├── COMPONENT_GUIDE.md        # Component documentation
└── HIERARCHY_ARCHITECTURE.md # This file
```

## Component Hierarchy

### 1. Application Entry Points

```
app/layout.tsx (Root Layout)
└── app/page.tsx (Home Page)
    └── EMUDashboardV2 (Main Component)
```

### 2. EMUDashboardV2 Component Structure

```
EMUDashboardV2 (State Container)
├── State Management Layer
│   ├── Navigation State (view)
│   ├── Product Information State
│   ├── Foundation Data State
│   ├── UI State (editing, generating, locked)
│   └── Foundation Status State
│
├── View Layer (Conditional Rendering)
│   ├── OnboardingView
│   ├── DashboardView
│   └── FoundationDetailView
│
└── Business Logic Layer
    ├── Foundation Extraction
    ├── Item Management (CRUD)
    ├── Regeneration Logic
    └── Lock/Unlock System
```

### 3. View Components Breakdown

#### OnboardingView
```
OnboardingView
├── Product Name Input
├── Category Selection Grid
│   └── Category Buttons (6)
├── Stage Dropdown
├── Description Textarea
├── Target Problem Textarea
└── Start Journey Button
```

#### DashboardView
```
DashboardView
├── Progress Overview Card
│   ├── Overall Progress Bar
│   └── Phase Progress Indicators
│
├── Foundation Phase Card
│   ├── Status Indicator
│   ├── Progress Metrics
│   ├── Quick Stats
│   └── Action Buttons
│
└── Locked Phase Cards (3)
    ├── Experiments Phase
    ├── Scaling Phase
    └── Optimization Phase
```

#### FoundationDetailView
```
FoundationDetailView
├── Header Section
│   ├── Back Navigation
│   ├── Foundation Status
│   └── Global Actions (Lock/Unlock All)
│
├── Pain Points Section
│   ├── Section Header
│   ├── Add Button
│   └── PainPointItem[] Components
│       ├── Content Display
│       ├── Severity Indicator
│       └── Item Controls
│
├── Audience Section
│   ├── Section Header
│   ├── Add Button
│   └── AudienceItem[] Components
│       ├── Segment Info
│       ├── Characteristics Tags
│       └── Item Controls
│
├── Solutions Section
│   ├── Section Header
│   ├── Add Button
│   └── SolutionItem[] Components
│       ├── Solution Name
│       ├── Problems List
│       └── Item Controls
│
├── Why It Matters Section
│   ├── Content Display
│   └── Section Controls
│
└── Quick Actions Footer
    └── Lock All Foundation Button
```

## Data Flow Architecture

### 1. State Flow
```
User Input
    ↓
Component Event Handler
    ↓
State Update Function
    ↓
React State (useState)
    ↓
Component Re-render
    ↓
UI Update
```

### 2. Foundation Extraction Flow
```
Onboarding Form Submission
    ↓
extractFoundation() Called
    ↓
Set Status: 'extracting'
    ↓
Navigate to Dashboard
    ↓
AI Simulation (2s delay)
    ↓
Mock Data Generation
    ↓
State Arrays Populated
    ↓
Set Status: 'validating'
    ↓
Foundation Ready for Editing
```

### 3. Item Management Flow
```
User Action (Edit/Regenerate/Delete)
    ↓
Optimistic UI Update
    ↓
Set Item State (isEditing/isGenerating)
    ↓
Async Operation (if needed)
    ↓
State Update with New Data
    ↓
Clear Temporary States
    ↓
UI Reflects Final State
```

## Type System Hierarchy

### 1. Core Types
```typescript
ProductInfo
├── name: string
├── category: CategoryType
├── stage: StageType
├── description: string
└── targetProblem: string

FoundationItem (Base)
├── id: string
├── isLocked: boolean
├── isEditing: boolean
└── isGenerating: boolean

PainPointItem extends FoundationItem
├── pain: string
├── severity: number (1-10)
└── description: string

AudienceItem extends FoundationItem
├── segment: string
├── description: string
└── characteristics: string[]

SolutionItem extends FoundationItem
├── solution: string
└── problems: string[]

WhyItMattersItem extends FoundationItem
└── content: string
```

### 2. State Types
```typescript
ViewState = 'onboarding' | 'dashboard' | 'foundation-detail'
FoundationStatus = 'pending' | 'extracting' | 'validating' | 'locked'
CategoryType = 'B2B SaaS' | 'B2C App' | 'Marketplace' | 'Developer Tool' | 'E-commerce' | 'Enterprise'
StageType = 'idea' | 'prototype' | 'beta' | 'launched'
```

## Control Flow Hierarchy

### 1. Item-Level Controls
```
Individual Item
├── Regenerate Control
│   └── Triggers: regenerateItem(id)
├── Edit Control
│   └── Triggers: startEditing(item)
├── Delete Control
│   └── Triggers: deleteItem(id)
└── Lock Control
    └── Triggers: toggleItemLock(id)
```

### 2. Section-Level Controls
```
Section Container
├── Add New Item
│   └── Triggers: addItem()
└── Section Progress
    └── Calculated from: locked items / total items
```

### 3. Foundation-Level Controls
```
Foundation Container
├── Lock All Items
│   └── Triggers: lockAllFoundation()
├── Unlock Foundation
│   └── Triggers: unlockFoundation()
└── Foundation Status
    └── Derived from: all sections locked state
```

## Navigation Hierarchy

### 1. Primary Navigation Flow
```
Onboarding → Dashboard → Foundation Detail
    ↑            ↓              ↓
    └────────────┴──────────────┘
         (Back Navigation)
```

### 2. View Switching Logic
```typescript
setView('onboarding')    // Initial state
    ↓
setView('dashboard')     // After extraction
    ↓
setView('foundation-detail')  // View details
    ↓
setView('dashboard')     // Back navigation
```

## UI Component Hierarchy

### 1. Layout Components
```
Container (max-w-*xl mx-auto)
├── Header Section
├── Content Section
└── Action Section
```

### 2. Card Components
```
Card (bg-gray-900 rounded-lg border)
├── Card Header
├── Card Content
└── Card Actions
```

### 3. Interactive Elements
```
Button Components
├── Primary (bg-purple-600)
├── Secondary (bg-gray-700)
├── Icon Button (p-1.5 hover:bg-gray-700)
└── Disabled State (disabled:bg-gray-700)

Input Components
├── Text Input (bg-gray-800 border-gray-700)
├── Textarea (bg-gray-800 border-gray-700)
├── Select Dropdown (bg-gray-800 border-gray-700)
└── Checkbox (custom styled)
```

## Styling Hierarchy

### 1. Color Hierarchy
```
Background Colors
├── Primary: bg-gray-950 (body)
├── Secondary: bg-gray-900 (cards)
├── Tertiary: bg-gray-800 (inputs, inner cards)
└── Accent: bg-purple-600 (CTAs)

Text Colors
├── Primary: text-gray-100
├── Secondary: text-gray-300
├── Muted: text-gray-400
└── Accent: text-purple-400

Status Colors
├── Success: text-green-400, bg-green-600
├── Warning: text-yellow-400, bg-yellow-600
├── Error: text-red-400, bg-red-600
└── Info: text-blue-400, bg-blue-600
```

### 2. Spacing Hierarchy
```
Container Padding
├── Outer: p-8
├── Card: p-6
├── Section: p-4
└── Item: p-3

Gaps
├── Section: gap-6
├── Item: gap-4
├── Element: gap-3
└── Inline: gap-2
```

## Event Handler Hierarchy

### 1. User Interaction Events
```
Form Events
├── onChange → Update state
├── onSubmit → Process form
└── onBlur → Validate field

Click Events
├── Button Click → Trigger action
├── Card Click → Navigate/expand
└── Icon Click → Quick action

Keyboard Events
├── Enter → Submit/save
└── Escape → Cancel/close
```

### 2. Async Operation Events
```
API Simulation Events
├── Start → Set loading state
├── Progress → Update UI
├── Success → Update data
└── Error → Show error state
```

## Security & Validation Hierarchy

### 1. Input Validation
```
Client-Side Validation
├── Required Fields
├── Format Validation
├── Length Constraints
└── Type Checking
```

### 2. State Protection
```
State Guards
├── View Access Control
├── Action Permissions
├── Lock State Enforcement
└── Data Integrity Checks
```

---

**Version**: 1.0  
**Last Updated**: January 2025  
**Component Version**: EMUDashboardV2 (Production)