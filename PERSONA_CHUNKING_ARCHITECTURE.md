# Persona Segment Architecture - Cognitive Chunking Design

## Overview
Based on cognitive architecture research, personas should be organized in a three-tier hierarchy that mirrors how expert PMMs naturally chunk information. This design enables progressive disclosure and prevents cognitive overload.

## Three-Tier Persona Hierarchy

### Tier 1: Surface Layer (Demographics & Firmographics)
**Purpose**: Initial targeting and market sizing
**Cognitive Load**: Low (3-5 chunks)

```typescript
interface PersonaDemographics {
  // B2C Demographics
  ageRange?: string;          // "25-34", "35-44", etc.
  location?: string;          // "Urban US", "Western Europe"
  incomeLevel?: string;       // "50-75k", "75-100k"
  educationLevel?: string;    // "Bachelor's", "Master's+"
  
  // B2B Firmographics
  companySize?: string;       // "10-50", "50-200", "200-1000"
  industry?: string;          // "SaaS", "E-commerce", "Healthcare"
  department?: string;        // "Marketing", "Engineering", "Sales"
  jobTitle?: string;          // "VP Marketing", "Product Manager"
  budget?: string;            // "10-50k", "50-250k", "250k+"
}
```

### Tier 2: Behavioral Layer (Patterns & Actions)
**Purpose**: Tactical go-to-market decisions
**Cognitive Load**: Medium (4-7 chunks)

```typescript
interface PersonaBehaviors {
  // Decision Making
  decisionProcess: {
    triggerEvents: string[];      // What initiates their search
    evaluationCriteria: string[]; // How they judge solutions (max 5)
    decisionInfluencers: string[]; // Who/what influences them
    purchaseBarriers: string[];    // What stops them
  };
  
  // Channel Preferences
  channels: {
    discoveryChannels: string[];   // Where they learn (max 4)
    researchChannels: string[];    // Where they validate
    purchaseChannels: string[];    // Where they buy
    supportChannels: string[];     // Where they get help
  };
  
  // Workflow Integration
  workflows: {
    currentTools: string[];        // Tools they use now (max 5)
    integrationNeeds: string[];    // Must work with what
    switchingCosts: string[];      // What makes change hard
  };
}
```

### Tier 3: Psychological Layer (Drivers & Jobs)
**Purpose**: Strategic product and messaging decisions
**Cognitive Load**: High (requires abstraction)

```typescript
interface PersonaPsychology {
  // Jobs to be Done (JTBD)
  jobs: {
    functional: string[];     // What they need to accomplish (max 3)
    emotional: string[];      // How they want to feel (max 3)
    social: string[];        // How they want to be perceived (max 3)
  };
  
  // Core Motivations
  motivations: {
    primaryDriver: string;    // Single most important motivation
    fears: string[];         // What they're afraid of (max 3)
    aspirations: string[];   // What they aspire to (max 3)
  };
  
  // Value Perception
  values: {
    successMetrics: string[];    // How they measure success
    valueDrivers: string[];      // What they find valuable
    dealBreakers: string[];      // Absolute no-go's
  };
}
```

## Progressive UI Flow

### Step 1: Basic Persona Creation
```
┌─────────────────────────────────────┐
│      Create Your First Persona      │
├─────────────────────────────────────┤
│ Give them a name:                   │
│ [Sarah the Startup Founder    ]     │
│                                     │
│ Quick description:                  │
│ [Tech-savvy founder looking to   ]  │
│ [scale her SaaS startup         ]  │
│                                     │
│ Are they B2B or B2C?               │
│ ( ) B2C Individual                  │
│ (•) B2B Professional                │
│                                     │
│        [Continue →]                 │
└─────────────────────────────────────┘
```

### Step 2: Demographics Chunking (Tier 1)
```
┌─────────────────────────────────────┐
│    Tell us about Sarah (Basic)      │
├─────────────────────────────────────┤
│ Company Size:                       │
│ [•] 10-50 employees                 │
│ [ ] 50-200 employees                │
│ [ ] 200+ employees                  │
│                                     │
│ Industry:                           │
│ [SaaS/Software         ▼]           │
│                                     │
│ Role:                               │
│ [CEO/Founder          ▼]            │
│                                     │
│ Budget Range:                       │
│ [ ] < $10k  [•] $10-50k  [ ] $50k+ │
│                                     │
│ [Skip] [Back] [Continue →]          │
└─────────────────────────────────────┘
```

### Step 3: Behavioral Chunking (Tier 2)
```
┌─────────────────────────────────────┐
│   How does Sarah make decisions?    │
├─────────────────────────────────────┤
│ What triggers her to look for       │
│ solutions like yours? (Pick top 3)  │
│                                     │
│ [✓] Growth plateaus                 │
│ [✓] Competitor pressure             │
│ [ ] Compliance requirements         │
│ [✓] Customer complaints             │
│ [ ] New funding round               │
│                                     │
│ Where does she discover new tools?  │
│ (Pick her top channels)             │
│                                     │
│ [✓] ProductHunt                     │
│ [✓] Twitter/LinkedIn                │
│ [ ] Google Search                   │
│ [✓] Peer recommendations            │
│                                     │
│ [Back] [Continue →]                 │
└─────────────────────────────────────┘
```

### Step 4: Psychological Chunking (Tier 3)
```
┌─────────────────────────────────────┐
│    What drives Sarah? (Deep)        │
├─────────────────────────────────────┤
│ What's her main job to be done?    │
│ ┌─────────────────────────────────┐ │
│ │ Functional Job (What)           │ │
│ │ "Scale revenue from $1M to $10M"│ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Emotional Job (Feel)            │ │
│ │ "Feel confident about growth"   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Social Job (Be seen as)         │ │
│ │ "Visionary leader who scales"   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ What's her biggest fear?            │
│ [Burning through runway too fast ]  │
│                                     │
│ [Back] [Complete Persona ✓]         │
└─────────────────────────────────────┘
```

## Persona Summary View (Post-Creation)
```
┌─────────────────────────────────────────────┐
│         Sarah the Startup Founder           │
├─────────────────────────────────────────────┤
│ 📊 Demographics          ▼ Collapse         │
│ • SaaS Founder, 10-50 employees             │
│ • $10-50k budget                            │
├─────────────────────────────────────────────┤
│ 🎯 Behaviors            ▼ Collapse         │
│ • Triggered by: Growth plateaus             │
│ • Discovers via: ProductHunt, Peers         │
│ • Current tools: Stripe, Mixpanel, Slack    │
├─────────────────────────────────────────────┤
│ 🧠 Psychology           ▼ Collapse         │
│ • Main job: Scale from $1M to $10M         │
│ • Core fear: Burning runway                 │
│ • Aspiration: Seen as visionary leader     │
├─────────────────────────────────────────────┤
│                                             │
│ [Edit] [Duplicate] [Compare] [Delete]       │
└─────────────────────────────────────────────┘
```

## B2B Special: Multi-Stakeholder View
```
┌─────────────────────────────────────────────┐
│      B2B Buying Committee for SaaS          │
├─────────────────────────────────────────────┤
│ 👤 Economic Buyer     [Sarah - CEO]    ✓   │
│    Main concern: ROI, Growth metrics        │
│                                             │
│ 🔧 Technical Buyer    [Add CTO +]           │
│    Main concern: Security, Integration      │
│                                             │
│ 👥 User Buyer         [Add Team Lead +]     │
│    Main concern: Daily workflow, Adoption   │
│                                             │
│ 🏆 Champion           [Add Power User +]    │
│    Main concern: Personal efficiency        │
│                                             │
│ View: [Individual] [Committee Matrix]       │
└─────────────────────────────────────────────┘
```

## Implementation Benefits

1. **Cognitive Load Management**: Each step maintains 3-5 chunks maximum
2. **Progressive Disclosure**: Users aren't overwhelmed with all fields at once
3. **Clear Hierarchy**: Mirrors how expert PMMs naturally think
4. **Flexible Depth**: Users can stop at any tier based on their needs
5. **B2B/B2C Adaptation**: Different flows for different contexts
6. **Pattern Recognition**: Reusable templates emerge naturally

## Data Storage Structure

```typescript
interface Persona {
  id: string;
  name: string;
  description: string;
  type: 'b2b' | 'b2c';
  tier1_demographics: PersonaDemographics;
  tier2_behaviors: PersonaBehaviors;
  tier3_psychology: PersonaPsychology;
  completeness: {
    tier1: boolean;
    tier2: boolean;
    tier3: boolean;
    score: number; // 0-100
  };
  metadata: {
    created: Date;
    lastModified: Date;
    tags: string[];
  };
}

interface B2BCommittee {
  id: string;
  name: string;
  personas: {
    economicBuyer?: string; // persona ID
    technicalBuyer?: string;
    userBuyer?: string;
    champion?: string;
    customRoles: Array<{
      role: string;
      personaId: string;
    }>;
  };
}
```

This architecture provides a cognitively-optimized approach to persona creation that prevents overwhelm while ensuring comprehensive coverage.