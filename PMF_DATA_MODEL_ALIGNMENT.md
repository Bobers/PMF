# PMF Framework-Aligned Data Model

## Overview

This data model directly implements the PMF frameworks from the research document, providing a structured approach to systematically achieve Product-Market Fit through measurable components and iterative processes.

## Framework Alignment

### 1. **Four Fits Framework (Brian Balfour)**

The model implements all four fits as separate but interconnected components:

```
┌─────────────────┐     ┌─────────────────┐
│ Market Segments │────▶│    Problems     │  = Market-Product Fit
└─────────────────┘     └─────────────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────┐
         │              │    Solutions    │  = Product Definition
         │              └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│Business Models  │────▶│    Channels     │  = Channel-Model Fit
└─────────────────┘     └─────────────────┘
         │                       │
         └───────────────────────┘
              Model-Market Fit
```

### 2. **Customer Development Methodology (Steve Blank)**

Phases are tracked with specific metrics and gates:

```sql
-- Phase progression with measurable gates
customer_discovery    → 70%+ problem validation rate
customer_validation   → 5+ paying customers (B2B)
customer_creation     → 40%+ Sean Ellis score
company_building      → Sustainable unit economics
```

### 3. **Sean Ellis Test Implementation**

```typescript
interface PMFSurvey {
  very_disappointed_percentage: number;    // 40%+ target
  somewhat_disappointed_percentage: number;
  not_disappointed_percentage: number;
  
  // Superhuman's segmentation approach
  segment_data: {
    [segmentId: string]: {
      very_disappointed: number;
      sample_size: number;
    };
  };
}
```

### 4. **Superhuman's PMF Engine**

The five-step process is built into the data flow:

1. **Survey Users** → `pmf_surveys` table
2. **Segment by Enthusiasm** → `segment_data` within surveys
3. **Analyze Drivers** → `user_feedback` with PMF signal flags
4. **Dual Roadmap** → `solutions` marked as addressing barriers vs. enhancing love
5. **Track Progress** → `pmf_metrics` with time-series data

## Key Metrics Implementation

### Leading Indicators (Pre-Launch)
- **Problem Interview Conversion**: `problems.interview_validation_rate` (70%+ target)
- **Solution Inadequacy**: `problems.current_solution_inadequacy` (8+/10 target)
- **Willingness to Pay**: `problems.willingness_to_pay` boolean flag

### Lagging Indicators (Post-Launch)
- **Retention Rates**: `pmf_metrics.week_1_retention` (>80%), `month_1_retention` (>60%)
- **Organic Growth**: `pmf_metrics.referral_percentage` (>25% target)
- **LTV:CAC Ratio**: `channels.lifetime_value_ratio` (3:1 target)

### Composite PMF Score
```sql
PMF Score = (Sean Ellis × 0.4) + (Retention × 0.3) + (Organic Growth × 0.3)
```

## Data Model Features

### 1. **Hierarchical Problem Decomposition**
```
Problems Table:
├── Root Cause: "Inventory management complexity"
│   ├── Symptom: "Can't track stock levels"
│   │   └── Job-to-be-Done: "Know what to reorder"
│   └── Symptom: "Manual processes"
│       └── Job-to-be-Done: "Automate repetitive tasks"
```

### 2. **Market Segmentation with Economics**
```typescript
interface MarketSegment {
  // Sizing (TAM/SAM/SOM)
  total_addressable_market: number;
  serviceable_addressable_market: number;
  serviceable_obtainable_market: number;
  
  // Unit Economics
  average_revenue_per_user: number;
  lifetime_value: number;
  payback_period_months: number;
  
  // Behavioral Understanding
  jobs_to_be_done: string[];
  current_solutions: Array<{name, satisfaction}>;
  problem_awareness: 'unaware' | 'problem_aware' | 'solution_aware';
}
```

### 3. **Solution Prioritization (90/10 Rule)**
```typescript
interface Solution {
  delivers_90_percent_value: boolean;  // Y Combinator's 90/10 solution
  implementation_effort: number;       // 1-10 scale
  solution_type: 'core_feature' | 'nice_to_have' | 'differentiator';
}
```

### 4. **Channel Testing Framework**
- Test 3-5 channels simultaneously (`channels` table)
- Track CAC, conversion, quality per channel
- No single channel >50% of acquisition
- LTV:CAC ratio tracking per channel

### 5. **Business Model Validation**
```typescript
interface BusinessModel {
  // Unit Economics (Framework targets)
  gross_margin: number;        // SaaS: 80-90%, Marketplace: 15-30%
  logo_churn_rate: number;     // 5-15% monthly target
  revenue_growth_rate: number; // 20%+ monthly for early stage
  
  // Pricing Strategy
  pricing_model: {
    tiers: Array<{name, price, features}>;
  };
}
```

## Experiment & Pivot Tracking

### Experiment Framework
```typescript
interface Experiment {
  hypothesis: string;
  success_criteria: Array<{
    metric: string;
    threshold: number;
  }>;
  results: Record<string, any>;
  pmf_impact: 'positive' | 'neutral' | 'negative';
  led_to_pivot: boolean;
}
```

### 4Ps Pivot Framework
```typescript
type PivotType = 
  | 'persona'   // Change target customer
  | 'problem'   // Address adjacent need
  | 'promise'   // Adjust value proposition
  | 'product';  // Modify features/functionality
```

## Workflow Examples

### 1. **Problem Discovery Phase**
```sql
-- Create problem hypothesis
INSERT INTO problems (title, problem_type, severity_score)
VALUES ('Manual inventory tracking', 'root_cause', 8);

-- Validate through interviews
UPDATE problems 
SET interview_validation_rate = 0.75,
    unprompted_mentions = 12,
    validation_status = 'validated'
WHERE id = ?;

-- Link to segments
INSERT INTO market_product_fit (segment_id, problem_id, problem_severity_for_segment)
VALUES (segment_id, problem_id, 9);
```

### 2. **Channel Testing**
```sql
-- Set up channel test
INSERT INTO channels (name, channel_type, test_budget, test_status)
VALUES ('Google Ads', 'paid_search', 5000, 'testing');

-- Track performance
UPDATE channels
SET customer_acquisition_cost = 150,
    lifetime_value_ratio = 3.5,
    conversion_rate = 0.024
WHERE id = ?;

-- Validate channel-model fit
INSERT INTO channel_model_fit (channel_id, model_id, margin_viability)
VALUES (channel_id, model_id, true);
```

### 3. **PMF Assessment**
```sql
-- Run Sean Ellis test
INSERT INTO pmf_surveys (
  survey_type,
  very_disappointed_percentage,
  somewhat_disappointed_percentage,
  net_promoter_score
) VALUES ('sean_ellis', 0.38, 0.25, 52);

-- Check phase progression
SELECT check_phase_progression(project_id);
-- Returns: 'Ready for customer_creation'

-- Calculate composite PMF score
SELECT calculate_pmf_score(project_id);
-- Returns: 0.41 (above 40% threshold)
```

## Benefits of This Approach

1. **Systematic Validation**: Every assumption has a place in the schema
2. **Measurable Progress**: Built-in thresholds from the frameworks
3. **Clear Decision Points**: Phase gates with specific criteria
4. **Experiment Tracking**: Learn from both successes and failures
5. **Pivot Support**: Track what changed and why
6. **Four Fits Integration**: See how changes in one area affect others

## Next Steps

1. **Implement UI Components**: 
   - Phase progression tracker
   - Four Fits dashboard
   - Experiment design wizard
   - PMF score visualization

2. **Automate Insights**:
   - Flag when metrics fall below thresholds
   - Suggest next experiments based on weak areas
   - Alert when ready for phase progression

3. **Integration Points**:
   - Analytics tools for automatic metric collection
   - Survey tools for Sean Ellis test
   - CRM for customer feedback

This data model provides the foundation for systematically engineering Product-Market Fit rather than hoping to discover it.