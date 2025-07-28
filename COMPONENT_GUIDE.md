# EMU Component Documentation

## Component Architecture Overview

EMU follows a component-based architecture with clear separation of concerns and progressive enhancement through versioned components.

## Component Hierarchy

```
EMUDashboardV2 (Root Component)
├── OnboardingView
│   ├── ProductInfoForm
│   ├── CategorySelector
│   └── DescriptionInputs
├── DashboardView  
│   ├── ProgressOverview
│   ├── FoundationCard
│   └── PhaseCards[]
└── FoundationDetailView
    ├── FoundationHeader
    ├── PainPointsSection
    │   └── PainPointItem[]
    ├── AudienceSection
    │   └── AudienceItem[]
    ├── SolutionsSection
    │   └── SolutionItem[]
    ├── WhyItMattersSection
    └── QuickActions
```

## Core Components

### EMUDashboardV2 (Main Component)

**File**: `src/components/EMUDashboardV2.tsx`  
**Purpose**: Root component managing entire EMU flow  
**Status**: ✅ Active Production Component

#### Props
```typescript
// No props - self-contained component
export default function EMUDashboardV2(): JSX.Element
```

#### Key Features
- Three-view navigation system
- Complete state management
- Item-level CRUD operations
- Foundation locking system
- AI simulation with delays

#### State Structure
```typescript
// Navigation
const [view, setView] = useState<'onboarding' | 'dashboard' | 'foundation-detail'>('onboarding');

// Product Information
const [productInfo, setProductInfo] = useState<ProductInfo>({...});

// Foundation Status
const [foundationStatus, setFoundationStatus] = useState<FoundationStatus>('pending');

// Foundation Data
const [painPoints, setPainPoints] = useState<PainPointItem[]>([]);
const [audiences, setAudiences] = useState<AudienceItem[]>([]);
const [solutions, setSolutions] = useState<SolutionItem[]>([]);
const [whyItMatters, setWhyItMatters] = useState<WhyItMattersItem>({...});

// Editing States
const [editingPainPoint, setEditingPainPoint] = useState<EditingState | null>(null);
const [editingAudience, setEditingAudience] = useState<EditingState | null>(null);
```

#### Key Methods
```typescript
// Foundation extraction (AI simulation)
const extractFoundation = async (): Promise<void>

// Item management
const regeneratePainPoint = async (id: string): Promise<void>
const deletePainPoint = (id: string): void
const addPainPoint = (): void
const savePainPointEdit = (): void

// Similar methods for audiences and solutions...

// Foundation management
const lockAllFoundation = (): void
const unlockFoundation = (): void
```

## View Components

### OnboardingView

**Purpose**: Collect initial product information  
**Location**: Inline within EMUDashboardV2  
**Trigger**: `view === 'onboarding'`

#### Features
- Product name input
- Category selection (6 options)
- Stage selection (4 options)  
- Description textarea
- Target problem definition
- Validation before proceeding

#### UI Elements
```typescript
// Category buttons with active state
<button className={`p-3 rounded-lg border transition-all ${
  productInfo.category === category
    ? 'border-purple-500 bg-purple-500/20 text-purple-300'
    : 'border-gray-700 hover:border-gray-600'
}`}>

// Stage dropdown
<select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">

// Action button with loading state
<button disabled={!productInfo.name || !productInfo.category || !productInfo.stage}>
  <Sparkles className="w-5 h-5" />
  Start EMU Journey
</button>
```

### DashboardView

**Purpose**: High-level overview of PMF journey  
**Location**: Inline within EMUDashboardV2  
**Trigger**: `view === 'dashboard'`

#### Features
- Progress visualization
- Foundation phase card with status
- Other phases (locked until foundation complete)
- Quick navigation to foundation detail

#### Key Sections
```typescript
// Progress Overview
<div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
  <h2>Your PMF Journey</h2>
  <div className="text-2xl font-bold">{overallProgress}%</div>
  // Phase progress bars...
</div>

// Foundation Phase Card  
<div className={`bg-gray-900 rounded-lg border mb-4 ${foundationStatusBorder}`}>
  // Foundation status, progress, and details...
</div>
```

### FoundationDetailView

**Purpose**: Granular foundation element management  
**Location**: Inline within EMUDashboardV2  
**Trigger**: `view === 'foundation-detail'`

#### Features
- Section-by-section editing
- Item-level controls
- Progress tracking
- Lock/unlock functionality

## Item Components

### PainPointItem

**Purpose**: Individual pain point management  
**Location**: Inline within FoundationDetailView

#### Features
- Severity scoring (1-10)
- Inline editing with save/cancel
- Regeneration with loading states
- Individual locking
- Delete functionality

#### States
```typescript
// Display State
<div className="bg-gray-800 rounded-lg p-4">
  <h3>{pain.pain}</h3>
  <p>{pain.description}</p>
  <div className="text-2xl font-bold text-red-400">{pain.severity}/10</div>
</div>

// Editing State  
<div className="space-y-3">
  <input value={editingPainPoint.pain} onChange={...} />
  <textarea value={editingPainPoint.description} onChange={...} />
  <input type="number" value={editingPainPoint.severity} onChange={...} />
  <button onClick={savePainPointEdit}>Save</button>
  <button onClick={cancelEdit}>Cancel</button>
</div>

// Generating State
<div className="flex items-center gap-2 text-gray-400">
  <Loader2 className="w-4 h-4 animate-spin" />
  Regenerating...
</div>
```

#### Controls Layout
```typescript
// Control buttons (top right of each item)
<div className="flex items-start gap-1 ml-4">
  {!item.isLocked && (
    <>
      <button onClick={() => regenerateItem(item.id)}>
        <RefreshCw className="w-3 h-3" />
      </button>
      <button onClick={() => startEditing(item)}>
        <Edit2 className="w-3 h-3" />
      </button>
      <button onClick={() => deleteItem(item.id)}>
        <Trash2 className="w-3 h-3 text-red-400" />
      </button>
    </>
  )}
  <button onClick={() => toggleLock(item.id)}>
    {item.isLocked ? <Lock /> : <Unlock />}
  </button>
</div>
```

### AudienceItem

**Purpose**: Target audience segment management  
**Similar structure to PainPointItem with:**

#### Unique Features
- Segment name and description
- Characteristics array (editable as comma-separated)
- Purple color theming (`text-purple-400`)

#### Characteristics Handling
```typescript
// Display characteristics as tags
<div className="flex flex-wrap gap-2 mt-3">
  {audience.characteristics.map((char, i) => (
    <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs">
      {char}
    </span>
  ))}
</div>

// Edit characteristics as comma-separated text
<textarea 
  value={editingAudience.characteristics}
  onChange={(e) => setEditingAudience({ 
    ...editingAudience, 
    characteristics: e.target.value 
  })}
  placeholder="Characteristics (comma-separated)"
/>

// Save with string parsing
const saveAudience = () => {
  const characteristics = editingAudience.characteristics
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);
  
  setAudiences(prev => prev.map(a => 
    a.id === editingAudience.id 
      ? { ...a, ...editingAudience, characteristics, isEditing: false }
      : a
  ));
};
```

### SolutionItem

**Purpose**: Current solution analysis  
**Features:**

#### Unique Structure
- Solution name
- Problems array (why current solution fails)
- Yellow color theming (`text-yellow-400`)

#### Problems Display
```typescript
// Problems as bulleted list
<ul className="space-y-1">
  {solution.problems.map((problem, i) => (
    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
      <span className="text-red-400 mt-0.5">•</span>
      {problem}
    </li>
  ))}
</ul>

// Edit problems as comma-separated
<textarea 
  value={editingSolution.problems}
  onChange={(e) => setEditingSolution({ 
    ...editingSolution, 
    problems: e.target.value 
  })}
  placeholder="Problems (comma-separated)"
/>
```

### WhyItMattersSection

**Purpose**: Overall problem significance  
**Unique Features:**

#### Single Content Block
- String content (not array)
- Section-level editing (not item-level)
- Special importance styling

#### Implementation
```typescript
// Display state
<div className="bg-gray-800 rounded-lg p-4">
  <p className="text-gray-300 leading-relaxed">{whyItMatters.content}</p>
</div>

// Editing state
<div className="space-y-3">
  <textarea
    value={whyItMatters.content}
    onChange={(e) => setWhyItMatters(prev => ({ ...prev, content: e.target.value }))}
    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg"
    rows={3}
  />
  <div className="flex gap-2">
    <button onClick={saveWhyItMatters}>Save</button>
    <button onClick={cancelEdit}>Cancel</button>
  </div>
</div>
```

## Utility Components

### ProgressIndicators

**Usage**: Throughout dashboard and detail views

```typescript
// Phase progress circle
<div className={`w-10 h-10 rounded-full flex items-center justify-center ${
  progress === 100 ? 'bg-green-600' : 
  progress > 0 ? `bg-gradient-to-br ${phaseColor}` : 'bg-gray-800'
}`}>
  {progress === 100 ? <CheckCircle2 /> : <PhaseIcon />}
</div>

// Progress bar
<div className="h-2 bg-gray-800 rounded-full mt-1">
  <div 
    className="h-full bg-green-600 rounded-full transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

### StatusIndicators

**Usage**: Foundation and item status display

```typescript
// Locked status badge
{foundationStatus === 'locked' && (
  <span className="ml-2 px-2 py-1 bg-green-600 text-xs rounded-full">
    Locked
  </span>
)}

// Item lock status
<button className={`p-1.5 rounded transition-colors ${
  item.isLocked ? 'bg-green-600' : 'hover:bg-gray-700'
}`}>
  {item.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
</button>
```

## Component Patterns

### State Management Pattern
```typescript
// Optimistic updates for immediate feedback
const updateItem = (id: string, updates: Partial<Item>) => {
  setItems(prev => prev.map(item => 
    item.id === id ? { ...item, ...updates } : item
  ));
};

// Async operations with loading states
const performAsyncOperation = async (id: string) => {
  updateItem(id, { isLoading: true });
  
  try {
    const result = await apiCall();
    updateItem(id, { ...result, isLoading: false });
  } catch (error) {
    updateItem(id, { isLoading: false, error: error.message });
  }
};
```

### Conditional Rendering Pattern
```typescript
// Multi-state rendering
{item.isEditing && editingItem?.id === item.id ? (
  <EditingComponent item={editingItem} onSave={save} onCancel={cancel} />
) : item.isGenerating ? (
  <LoadingComponent message="Regenerating..." />
) : (
  <DisplayComponent item={item} controls={!item.isLocked} />
)}
```

### Event Handling Pattern
```typescript
// Event bubbling prevention for nested clickables
<button onClick={(e) => {
  e.stopPropagation();
  handleAction();
}}>
  Action
</button>

// Form submission handling
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle form logic
};
```

## Styling Patterns

### Tailwind Class Patterns
```typescript
// Card styling
"bg-gray-900 rounded-lg p-6 border border-gray-800" // Standard card
"bg-gray-800 rounded-lg p-4" // Inner card/item
"border-green-600" // Locked item border

// Button styling
"px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors" // Primary
"p-1.5 hover:bg-gray-700 rounded transition-colors" // Icon button
"px-3 py-1 bg-gray-700 rounded text-sm" // Small button

// Status colors
"text-green-400" // Success/locked
"text-yellow-400" // Warning/needs attention  
"text-red-400" // Error/high priority
"text-purple-400" // Accent/branded
```

### Responsive Design
```typescript
// Grid layouts
"grid grid-cols-2 md:grid-cols-3 gap-3" // Category selection
"grid grid-cols-1 md:grid-cols-2 gap-2" // Resource links

// Container sizing
"max-w-2xl mx-auto" // Onboarding
"max-w-6xl mx-auto" // Foundation detail
"max-w-7xl mx-auto" // Dashboard
```

## Testing Patterns

### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import EMUDashboardV2 from '../EMUDashboardV2';

describe('EMUDashboardV2', () => {
  it('should start in onboarding view', () => {
    render(<EMUDashboardV2 />);
    expect(screen.getByText('Start EMU Journey')).toBeInTheDocument();
  });
  
  it('should handle pain point regeneration', async () => {
    // Test regeneration flow
  });
});
```

### Mock Data Patterns
```typescript
const mockPainPoint: PainPointItem = {
  id: 'pp_test_1',
  pain: 'Test pain point',
  severity: 8,
  description: 'Test description',
  isLocked: false,
  isEditing: false,
  isGenerating: false
};
```

---

**Component Version**: 2.0  
**Last Updated**: January 2025  
**Status**: Production Ready