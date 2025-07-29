# Hierarchical PMF Data Model

## Overview

This data model implements a sophisticated hierarchical system for Product-Market Fit validation with two-way relationships, dimensions, and ripple effects.

## Core Concepts

### 1. **Hierarchical Entities**

Each core entity (Pain Points, Audiences, Solutions) supports parent-child relationships:

```
Pain Points Hierarchy:
├── Root Problem: "Small businesses struggle with inventory management"
│   ├── Symptom: "Can't track stock levels accurately"
│   │   └── Consequence: "Lost sales due to stockouts"
│   └── Symptom: "Manual processes are error-prone"
│       └── Consequence: "Financial losses from overstock"
```

### 2. **Two-Way Relationships**

All relationships are bidirectional with different attributes:

```
Pain Point <---> Audience
- From Pain: How intensely does this audience feel this pain?
- From Audience: Which pains are most critical for this segment?

Audience <---> Solution  
- From Audience: How valuable is this solution for them?
- From Solution: Who are the primary users?

Pain Point <---> Solution
- From Pain: Which solutions address this problem?
- From Solution: How effectively does it solve the pain?
```

### 3. **Dimensions & Scoring**

Each entity has multiple dimensions for analysis:

**Pain Points:**
- Severity (1-10): How bad is the problem?
- Frequency: How often does it occur?
- Urgency (1-10): How quickly must it be solved?
- Confidence (0-1): How validated is this pain?

**Audiences:**
- Revenue Potential (1-10)
- Acquisition Difficulty (1-10)
- Retention Likelihood (1-10)
- Size Estimate

**Solutions:**
- Effort Score (1-10): Implementation complexity
- Impact Score (1-10): Potential effect
- Priority Score: Auto-calculated (Impact × 10 - Effort × 5)
- Completion %: Implementation progress

### 4. **Evidence & Validation**

Every claim can be backed by evidence:
- Interview transcripts
- Survey results
- Analytics data
- Observations
- Research findings

Evidence affects confidence scores automatically.

### 5. **Ripple Effects**

Changes cascade through relationships:

```
Example Ripple Effects:

1. Pain Severity Increased to 9/10
   → Flag all related solutions for priority review
   → Increase confidence in audience segments experiencing this pain
   → Notify team of critical change

2. Audience Marked as "Invalid"
   → Reduce confidence in all related pain points
   → Flag solutions targeting only this audience
   → Trigger re-evaluation of market size

3. Solution Completed
   → Update pain point status to "addressed"
   → Increase confidence in solution-audience fit
   → Trigger success metrics tracking
```

## Database Schema

### Core Tables
- `pain_points` - Hierarchical problem tree
- `audience_segments` - Customer segment hierarchy  
- `solutions` - Solution/feature hierarchy

### Relationship Tables
- `pain_audience_relationships` - M:M pain-audience mappings
- `solution_pain_relationships` - M:M solution-pain mappings
- `solution_audience_relationships` - M:M solution-audience mappings

### Supporting Tables
- `evidence_entries` - Validation data
- `change_events` - Audit trail
- `ripple_rules` - Automated cascade rules

## Key Features

### 1. **Hierarchical Queries**
- Get all children of a pain point
- Find root causes of symptoms
- Aggregate scores up the hierarchy

### 2. **Relationship Analysis**
- Find underserved audiences (high pain, few solutions)
- Identify over-engineered solutions (low pain, high effort)
- Discover solution gaps (validated pain, no solutions)

### 3. **Confidence Tracking**
- Every entity has a confidence score
- Evidence increases/decreases confidence
- Relationships inherit confidence from their entities

### 4. **Change Management**
- Full audit trail of all changes
- Ripple effects tracked and visualized
- Rollback capabilities

## Usage Examples

### Creating a Pain Point Hierarchy
```typescript
// Create root problem
const rootPain = await pmfService.createPainPoint(projectId, {
  title: "Inventory management is complex",
  pain_type: "root_problem",
  severity: 8,
  urgency: 7
});

// Add symptom
const symptom = await pmfService.createPainPoint(projectId, {
  parent_id: rootPain.id,
  title: "Can't predict demand",
  pain_type: "symptom",
  severity: 7
});
```

### Linking Entities
```typescript
// Connect pain to audience with relationship details
await pmfService.linkPainToAudience(painId, audienceId, {
  intensity: 8,
  frequency: 'often',
  evidence_notes: 'From user interviews...',
  confidence_score: 0.8
});
```

### Adding Evidence
```typescript
// Add evidence that affects confidence
await pmfService.addEvidence({
  project_id: projectId,
  entity_type: 'pain_point',
  entity_id: painId,
  evidence_type: 'interview',
  source: 'Customer Interview #23',
  content: 'User mentioned this problem 5 times...',
  confidence_impact: 0.15 // Increases confidence
});
```

## Benefits

1. **Complete Traceability**: Every assumption can be traced to evidence
2. **Automatic Updates**: Ripple effects maintain consistency
3. **Flexible Hierarchy**: Organize information naturally
4. **Quantified Relationships**: Not just connections, but measured ones
5. **Evolution Tracking**: See how understanding changes over time

## Next Steps

1. Implement UI components for hierarchical visualization
2. Create ripple effect rules based on your PMF methodology
3. Build analytics dashboards using the dimensional data
4. Add bulk import for existing PMF research