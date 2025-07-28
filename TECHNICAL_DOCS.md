# EMU Technical Documentation

## Project Overview

**EMU (Evolving Marketing Understanding)** is an AI-powered Product-Market Fit validation tool designed for non-marketing founders. It provides a systematic approach to building marketing foundations through intelligent extraction, validation, and iterative refinement.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useState hooks
- **Deployment**: Vercel-ready

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── EMUPrototype.tsx    # Original prototype (archived)
│   ├── EMUDashboard.tsx    # Section-level controls (v1)
│   ├── EMUDashboardV2.tsx  # Item-level controls (ACTIVE)
│   └── EMUDashboardV3.tsx  # Pivot system prototype
└── README.md
```

## Component Architecture

### EMUDashboardV2 (Active Implementation)

The current production component featuring item-level controls for foundation elements.

#### Core Data Structures

```typescript
type PainPointItem = {
  id: string;
  pain: string;
  severity: number;          // 1-10 scale
  description: string;
  isLocked: boolean;
  isEditing: boolean;
  isGenerating: boolean;
};

type AudienceItem = {
  id: string;
  segment: string;
  description: string;
  characteristics: string[];
  isLocked: boolean;
  isEditing: boolean;  
  isGenerating: boolean;
};

type SolutionItem = {
  id: string;
  solution: string;
  problems: string[];        // Array of problems with current solution
  isLocked: boolean;
  isEditing: boolean;
  isGenerating: boolean;
};
```

#### State Management

**Navigation State**
```typescript
const [view, setView] = useState('onboarding');
// Options: 'onboarding', 'dashboard', 'foundation-detail'
```

**Product Information**
```typescript
const [productInfo, setProductInfo] = useState({
  name: string;
  category: string;         // B2B SaaS, B2C App, etc.
  stage: string;           // idea, prototype, beta, launched
  description: string;
  targetProblem: string;
});
```

**Foundation State**
```typescript
const [foundationStatus, setFoundationStatus] = useState('pending');
// States: 'pending', 'extracting', 'validating', 'locked'

const [painPoints, setPainPoints] = useState<PainPointItem[]>([]);
const [audiences, setAudiences] = useState<AudienceItem[]>([]);
const [solutions, setSolutions] = useState<SolutionItem[]>([]);
const [whyItMatters, setWhyItMatters] = useState({ /* ... */ });
```

**Editing States**
```typescript
const [editingPainPoint, setEditingPainPoint] = useState<EditState | null>(null);
const [editingAudience, setEditingAudience] = useState<EditState | null>(null);
const [editingSolution, setEditingSolution] = useState<EditState | null>(null);
```

## Core Features

### 1. AI-Powered Foundation Extraction

**Flow:**
1. User fills product onboarding form
2. `extractFoundation()` simulates AI analysis (2-second delay)
3. Mock data populated into foundation arrays
4. Status changes to 'validating'

**Implementation:**
```typescript
const extractFoundation = async () => {
  setFoundationStatus('extracting');
  setView('dashboard');
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Populate mock extracted data
  setPainPoints([...mockPainPoints]);
  setAudiences([...mockAudiences]);
  setSolutions([...mockSolutions]);
  setWhyItMatters(mockWhyItMatters);
  
  setFoundationStatus('validating');
};
```

### 2. Three-Level Navigation System

**Level 1: Onboarding**
- Product information collection
- Category selection (6 options)
- Stage selection (4 options)  
- Description and problem definition

**Level 2: Dashboard (Bird's Eye View)**
- Overall progress visualization
- Foundation phase card with status
- Phase progression indicators
- Quick foundation health overview

**Level 3: Foundation Detail (Deep Dive)**
- Individual item management
- Granular edit/regenerate/lock controls
- Section-by-section validation
- Progress tracking per item

### 3. Item-Level Control System

Each foundation element (pain points, audiences, solutions) supports:

**CRUD Operations:**
- ✅ **Create**: Add new items with + button
- ✅ **Read**: Display items with visual formatting
- ✅ **Update**: Inline editing with save/cancel
- ✅ **Delete**: Remove items with trash button

**AI Operations:**
- ✅ **Regenerate**: Get alternative AI suggestions
- ✅ **Lock/Unlock**: Freeze items when satisfied

**Implementation Pattern:**
```typescript
// Regenerate function pattern
const regenerateItem = async (id: string) => {
  setItems(prev => prev.map(item => 
    item.id === id ? { ...item, isGenerating: true } : item
  ));
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const alternatives = [/* mock alternatives */];
  const newContent = alternatives[Math.floor(Math.random() * alternatives.length)];
  
  setItems(prev => prev.map(item => 
    item.id === id ? { ...item, ...newContent, isGenerating: false } : item
  ));
};
```

### 4. Foundation Locking System

**Individual Locking:**
- Each item can be locked independently
- Locked items show green border
- Controls hidden when locked
- Can be unlocked for further editing

**Foundation-Level Locking:**
- All items must be locked to complete foundation
- "Lock All" button for bulk operation
- Foundation status changes to 'locked'
- Unlocks other PMF phases

**Post-Lock Editing:**
- Foundation remains clickable when locked
- "Edit" button in locked status card
- "Unlock All" button in detail header
- Individual items can still be unlocked

## UI/UX Patterns

### Visual Indicators

**Item States:**
- 🟢 **Locked**: Green border, lock icon
- 🟡 **Editing**: Input fields, save/cancel buttons  
- 🔄 **Generating**: Spinner, "Regenerating..." text
- ⚪ **Normal**: Standard card appearance

**Progress Indicators:**
- Phase timeline with completion percentages
- "X/Y locked" counters per section
- Overall foundation progress
- Color-coded status indicators

### Interaction Patterns

**Item Controls Layout:**
```
[Content Area]                    [Controls]
  Title                          🔄 ⚙️ 🗑️ 🔒
  Description                    
  Additional Info
```

**Hover States:**
- Control buttons: `hover:bg-gray-700`
- Cards: Subtle shadow/border changes
- Interactive elements: Clear hover feedback

**Loading States:**
- Spinner animations during regeneration
- Progress bars during extraction
- Disabled states during operations

## Data Flow

### Foundation Creation Flow
```
Onboarding Form → extractFoundation() → Mock AI Analysis → 
Foundation Arrays Populated → Status: 'validating' → 
Dashboard View → Foundation Detail Available
```

### Item Management Flow
```
User Action → Optimistic Update → API Simulation → 
Success/Error Handling → State Update → UI Re-render
```

### Locking Flow
```
Individual Locks → Progress Calculation → 
All Locked Check → Foundation Status Update → 
Phase Unlock → Continue Journey
```

## Performance Considerations

### State Updates
- Optimistic updates for immediate feedback
- Batch state updates where possible
- Avoid unnecessary re-renders with dependency arrays

### Memory Management
- Clean up editing states on component unmount
- Limit history/undo functionality scope
- Efficient array operations with proper keys

### Bundle Size
- Tree-shaking enabled for Lucide icons
- TypeScript compilation optimizations
- Next.js automatic code splitting

## Testing Strategy

### Unit Testing Approach
```typescript
// Test individual functions
describe('regenerateItem', () => {
  it('should update item state correctly', () => {
    // Test implementation
  });
});

// Test component behavior  
describe('EMUDashboardV2', () => {
  it('should handle item locking', () => {
    // Test locking flow
  });
});
```

### Integration Testing
- Multi-step user flows
- Navigation between views
- State persistence across views
- Error handling scenarios

## Deployment

### Build Process
```bash
npm run build    # Production build
npm run start    # Production server
npm run dev      # Development server
```

### Environment Setup
- Node.js 18+
- npm or yarn package manager
- Next.js 15 compatibility
- TypeScript 5+ support

### Production Considerations
- Static export compatibility
- Vercel deployment ready
- Environment variable handling
- Error boundary implementation

## Future Enhancements

### Planned Features (EMUDashboardV3 Prototype)
- Foundation versioning system
- Confidence scoring algorithms
- Pivot wizard with guided decisions
- Learning trail visualization
- Impact analysis tools

### Technical Debt
- Add comprehensive error handling
- Implement proper loading states
- Add accessibility improvements
- Create comprehensive test suite
- Add proper TypeScript interfaces

## API Integration (Future)

### Expected Endpoints
```typescript
POST /api/extract-foundation
GET /api/regenerate-item/:type/:id
PUT /api/update-item/:type/:id
POST /api/validate-foundation
```

### Data Persistence
- Local storage for draft work
- Database integration for user accounts
- Real-time collaboration features
- Version history tracking

## Contributing Guidelines

### Code Standards
- TypeScript strict mode
- ESLint configuration compliance
- Tailwind CSS utility classes
- Component composition patterns

### Development Workflow
1. Feature branch from main
2. Implement with tests
3. Code review process
4. Merge to main
5. Deploy to production

---

**Last Updated**: January 2025
**Version**: 2.0 (EMUDashboardV2)
**Maintainers**: Development Team