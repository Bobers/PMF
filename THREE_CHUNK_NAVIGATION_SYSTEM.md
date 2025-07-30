# Three-Chunk Fractal Navigation System

## Core Principle
Every element breaks down into exactly 3 chunks. Users navigate deeper by clicking any chunk, and can always navigate back up. Changes at atomic levels propagate upward.

## Persona Example - Full Hierarchy

### Level 0: Foundation View
```
┌─────────────────────────────────────────┐
│            PMF Foundation               │
├─────────────────────────────────────────┤
│  📊 Personas    🎯 Pain Points  💡 Solution │
│                                         │
│  🏢 B2B/B2C    📈 Metrics      🚀 GTM   │
└─────────────────────────────────────────┘
```

### Level 1: Personas Section (Click on 📊 Personas)
```
┌─────────────────────────────────────────┐
│              Personas                   │
├─────────────────────────────────────────┤
│ 👤 Who          📍 Where       💭 Why   │
│ Identity        Context        Drivers  │
└─────────────────────────────────────────┘
```

### Level 2: Who/Identity (Click on 👤 Who)
```
┌─────────────────────────────────────────┐
│                Who                      │
├─────────────────────────────────────────┤
│ 🏢 Role         💰 Resources   📈 Stage │
│ Job title       Budget         Growth   │
└─────────────────────────────────────────┘
```

### Level 3: Role (Click on 🏢 Role)
```
┌─────────────────────────────────────────┐
│                Role                     │
├─────────────────────────────────────────┤
│ 👔 Title        🎯 Focus       ⏰ Tenure │
│ Founder         Growth         0-2 yrs  │
└─────────────────────────────────────────┘
```

### Level 4: Title - Atomic Level (Click on 👔 Title)
```
┌─────────────────────────────────────────┐
│               Title                     │
├─────────────────────────────────────────┤
│ 👨‍💼 CEO          🚀 Founder    💼 Director│
│                                         │
│          [Select: Founder]              │
└─────────────────────────────────────────┘
```

## Complete Persona Navigation Map

```
Personas
├── Who (Identity)
│   ├── Role
│   │   ├── Title: CEO | Founder | Director
│   │   ├── Focus: Growth | Operations | Strategy  
│   │   └── Tenure: 0-2yrs | 2-5yrs | 5+yrs
│   ├── Resources
│   │   ├── Budget: <$10k | $10-100k | $100k+
│   │   ├── Team: Solo | Small | Large
│   │   └── Authority: Full | Partial | Influencer
│   └── Stage
│       ├── Company: Startup | Scale-up | Enterprise
│       ├── Revenue: Pre-rev | <$1M | $1M+
│       └── Employees: 1-10 | 10-50 | 50+
├── Where (Context)
│   ├── Market
│   │   ├── Industry: SaaS | Ecom | Services
│   │   ├── Geography: US | Europe | Global
│   │   └── Segment: SMB | Mid-market | Enterprise
│   ├── Channels
│   │   ├── Discovery: Search | Social | Referral
│   │   ├── Research: Reviews | Peers | Content
│   │   └── Purchase: Self-serve | Sales | Partner
│   └── Environment
│       ├── Tech Stack: Modern | Legacy | Mixed
│       ├── Culture: Innovative | Traditional | Hybrid
│       └── Pace: Fast | Moderate | Slow
└── Why (Drivers)
    ├── Jobs
    │   ├── Functional: Grow | Save | Improve
    │   ├── Emotional: Confident | Secure | Proud
    │   └── Social: Leader | Expert | Innovator
    ├── Triggers
    │   ├── Internal: Growth | Pain | Opportunity
    │   ├── External: Competition | Regulation | Market
    │   └── Timing: Urgent | Planned | Exploratory
    └── Success
        ├── Metrics: Revenue | Efficiency | Quality
        ├── Timeline: Immediate | Quarter | Year
        └── Impact: Individual | Team | Company
```

## UI/UX Design

### Navigation View
```
┌─────────────────────────────────────────┐
│ 🏠 > Personas > Who > Role              │
├─────────────────────────────────────────┤
│                Role                     │
│                                         │
│    ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│    │    👔    │ │    🎯    │ │    ⏰    │ │
│    │  Title  │ │  Focus  │ │ Tenure  │ │
│    │         │ │         │ │         │ │
│    │ Founder │ │ Growth  │ │ 0-2 yrs │ │
│    └─────────┘ └─────────┘ └─────────┘ │
│         ↓           ↓           ↓       │
│                                         │
│            [← Back to Who]              │
└─────────────────────────────────────────┘
```

### Atomic Selection View
```
┌─────────────────────────────────────────┐
│ 🏠 > Personas > Who > Role > Title      │
├─────────────────────────────────────────┤
│             Select Title                │
│                                         │
│         ○ CEO/Executive                 │
│         ● Founder                       │
│         ○ Director/VP                   │
│                                         │
│    This change will update:             │
│    • Role → "Founder focus"             │
│    • Who → "Founder profile"            │
│    • Personas → "Founder segment"       │
│                                         │
│     [Cancel]        [Apply Change]      │
└─────────────────────────────────────────┘
```

### Summary Card View (Collapsed)
```
┌─────────────────────────────────────────┐
│           Growth-Stage Founder          │
├─────────────────────────────────────────┤
│ Founder • Growth-focused • 0-2 years    │
│ $10-100k budget • Small team • Startup  │
│ Discovers via social • Jobs: Grow revenue│
│                                         │
│              [Expand ↓]                 │
└─────────────────────────────────────────┘
```

## Implementation Architecture

```typescript
interface ChunkNode {
  id: string;
  label: string;
  icon: string;
  value?: string; // Only at atomic level
  children?: [ChunkNode, ChunkNode, ChunkNode]; // Always exactly 3
  parent?: string; // Reference to parent node
  level: number;
  path: string[]; // Breadcrumb trail
}

interface NavigationState {
  currentPath: string[];
  currentLevel: number;
  selectedValues: Map<string, string>; // Atomic selections
  expandedNodes: Set<string>;
}

// Example data structure
const personaTree: ChunkNode = {
  id: "personas",
  label: "Personas",
  icon: "👤",
  level: 0,
  path: ["personas"],
  children: [
    {
      id: "who",
      label: "Who",
      icon: "👤",
      level: 1,
      path: ["personas", "who"],
      children: [
        {
          id: "role",
          label: "Role",
          icon: "🏢",
          level: 2,
          path: ["personas", "who", "role"],
          children: [
            {
              id: "title",
              label: "Title",
              icon: "👔",
              level: 3,
              path: ["personas", "who", "role", "title"],
              children: [
                { id: "ceo", label: "CEO", value: "CEO", level: 4 },
                { id: "founder", label: "Founder", value: "Founder", level: 4 },
                { id: "director", label: "Director", value: "Director", level: 4 }
              ]
            },
            // ... Focus and Tenure nodes
          ]
        },
        // ... Resources and Stage nodes
      ]
    },
    // ... Where and Why nodes
  ]
};
```

## Bidirectional Update System

When an atomic value changes:
1. Update the atomic value
2. Recalculate parent summaries up the tree
3. Update all affected UI cards
4. Store the complete path for context

```typescript
function propagateChange(nodePath: string[], newValue: string) {
  // Update atomic value
  updateAtomicValue(nodePath, newValue);
  
  // Propagate up the tree
  for (let i = nodePath.length - 1; i > 0; i--) {
    const parentPath = nodePath.slice(0, i);
    const parentSummary = calculateSummary(parentPath);
    updateNodeSummary(parentPath, parentSummary);
  }
  
  // Trigger UI updates
  notifyUIUpdate(nodePath);
}
```

## Benefits

1. **Consistent Cognitive Load**: Always exactly 3 choices
2. **Infinite Depth**: Can go as deep as needed
3. **Clear Navigation**: Breadcrumb trail shows location
4. **Atomic Precision**: Drill down to specific values
5. **Holistic Updates**: Changes propagate naturally
6. **Fractal Structure**: Same pattern at every level