# EMU PMF Journey - Detailed Action Log
*Every database entry and decision documented*

## Initial Setup

### Action 1: Create Project and Initialize Phase
**Table:** `pmf_projects`
```sql
INSERT INTO pmf_projects (
  name: "EMU - Early-stage Market Understanding Tool",
  category: "B2B SaaS",
  stage: "idea",
  description: "Systematic PMF validation platform",
  target_problem: "Startups fail to achieve PMF due to lack of systematic approach"
)
-- Returns: project_id = "proj_001"
```
**Why:** Need a project container for all PMF activities

**Table:** `pmf_phases`
```sql
INSERT INTO pmf_phases (
  project_id: "proj_001",
  current_phase: "customer_discovery"
)
-- Returns: phase_id = "phase_001"
```
**Why:** Start in discovery phase per Customer Development methodology

---

## PHASE 1: CUSTOMER DISCOVERY

### Action 2: Define Problem Hypotheses
**Date:** Week 1, Day 1
**Actor:** Sarah Chen, Senior Marketer

**Table:** `problems`
```sql
-- ROOT PROBLEM
INSERT INTO problems (
  project_id: "proj_001",
  title: "Startups fail to achieve PMF systematically",
  problem_type: "root_cause",
  severity_score: 9,
  description: "70% of startups fail due to no market need (CB Insights)",
  validation_status: "hypothesis"
)
-- Returns: problem_id = "prob_001"
```
**Why:** Start with the big picture problem backed by industry data

```sql
-- SYMPTOM 1
INSERT INTO problems (
  project_id: "proj_001",
  parent_id: "prob_001",
  title: "Teams rely on gut feeling over data",
  problem_type: "symptom",
  severity_score: 8,
  frequency: "frequent",
  validation_status: "hypothesis"
)
-- Returns: problem_id = "prob_002"
```
**Why:** This is an observable symptom of the root problem

```sql
-- SYMPTOM 2
INSERT INTO problems (
  project_id: "proj_001",
  parent_id: "prob_001",
  title: "No structured process for validation",
  problem_type: "symptom",
  severity_score: 8,
  frequency: "constant",
  validation_status: "hypothesis"
)
-- Returns: problem_id = "prob_003"
```
**Why:** Another symptom that we can validate through interviews

```sql
-- JOB TO BE DONE
INSERT INTO problems (
  project_id: "proj_001",
  parent_id: "prob_002",
  title: "Know if my product idea will succeed before building",
  problem_type: "job_to_be_done",
  urgency_level: "immediate",
  validation_status: "hypothesis"
)
-- Returns: problem_id = "prob_004"
```
**Why:** Jobs-to-be-Done framework - what outcome do they want?

### Action 3: Define Initial Market Segments
**Date:** Week 1, Day 2

**Table:** `market_segments`
```sql
-- PRIMARY SEGMENT
INSERT INTO market_segments (
  project_id: "proj_001",
  name: "Seed-Stage B2B SaaS Founders",
  segment_type: "early_adopter",
  persona_details: {
    "role": "Founder/CEO",
    "company_size": "5-20 employees",
    "funding_stage": "Pre-seed to Seed",
    "age_range": "28-40",
    "technical_background": "Mixed",
    "previous_experience": "0-1 prior startups"
  },
  problem_awareness: "solution_aware",
  buying_readiness: 8
)
-- Returns: segment_id = "seg_001"
```
**Why:** Early adopters most likely to try new solution, have acute pain

```sql
-- SECONDARY SEGMENT
INSERT INTO market_segments (
  project_id: "proj_001",
  name: "Growth Stage Product Teams",
  segment_type: "early_adopter",
  persona_details: {
    "role": "Head of Product/CPO",
    "company_size": "50-200 employees",
    "funding_stage": "Series A-C",
    "team_size": "5-15 PMs"
  },
  problem_awareness: "problem_aware",
  buying_readiness: 6
)
-- Returns: segment_id = "seg_002"
```
**Why:** Larger budget but longer sales cycle, may have partial solutions

### Action 4: Link Problems to Segments (Initial Hypothesis)
**Date:** Week 1, Day 3

**Table:** `market_product_fit`
```sql
INSERT INTO market_product_fit (
  segment_id: "seg_001",
  problem_id: "prob_003", -- No structured process
  problem_severity_for_segment: 9,
  validation_method: "hypothesis",
  confidence_score: 0.3
)
```
**Why:** Hypothesis that seed-stage feels this pain most acutely

### Action 5: Start Interview Process
**Date:** Week 2-4

**Table:** `user_feedback` (for each interview)
```sql
-- Interview #1: Failed B2B SaaS Founder
INSERT INTO user_feedback (
  project_id: "proj_001",
  source_type: "interview",
  segment_id: "seg_001",
  user_persona: "Technical founder, 2nd startup",
  feedback_text: "We spent 6 months building features nobody wanted. Had 300 signups but 2% conversion. Wish we had validated demand first.",
  sentiment: "negative",
  related_problems: ["prob_002", "prob_003"],
  shows_product_love: false,
  indicates_must_have: true
)
-- Returns: feedback_id = "feed_001"
```
**Why:** Document exact quotes, map to problem hypotheses

**Table:** `evidence_entries`
```sql
INSERT INTO evidence_entries (
  project_id: "proj_001",
  entity_type: "problem",
  entity_id: "prob_003",
  evidence_type: "interview",
  source: "Interview #1 - Failed founder",
  content: "Built for 6 months without validation",
  confidence_impact: 0.05
)
```
**Why:** Each interview increases/decreases confidence in our hypotheses

### Action 6: Update Problem Validation After Interviews
**Date:** Week 4, Day 5
**After:** 35 total interviews conducted

**Table:** `problems` (UPDATE)
```sql
UPDATE problems
SET 
  interview_validation_rate = 0.77,  -- 27/35 validated this problem
  unprompted_mentions = 19,  -- 19 people mentioned without prompting
  has_workarounds = true,
  workaround_description = "Cobbling together Google Forms, Excel, Notion, and gut feel",
  willingness_to_pay = true,  -- 24/35 said yes
  current_solution_inadequacy = 8.3,  -- Average score
  validation_status = "validated"
WHERE id = "prob_003"
```
**Why:** Problem validated! Exceeds 70% threshold, high inadequacy score

**Table:** `pmf_phases` (UPDATE)
```sql
UPDATE pmf_phases
SET problem_interviews_count = 35
WHERE project_id = "proj_001"
```
**Why:** Track phase progression metrics

### Action 7: Segment Analysis and Sizing
**Date:** Week 5

**Table:** `market_segments` (UPDATE)
```sql
UPDATE market_segments
SET
  total_addressable_market = 50000,  -- Global B2B SaaS startups
  serviceable_addressable_market = 10000,  -- English-speaking
  serviceable_obtainable_market = 500,  -- Realistic year 1
  average_revenue_per_user = 299,  -- Monthly pricing
  lifetime_value = 7176,  -- 24 month average life
  payback_period_months = 3
WHERE id = "seg_001"
```
**Why:** Need market size for go/no-go decision

### Action 8: Check Phase Progression
**Date:** Week 6

**Function Call:**
```sql
SELECT check_phase_progression("proj_001")
-- Returns: "Ready for customer_validation"
```
**Why:** 77% validation rate exceeds 70% threshold

**Table:** `pmf_phases` (UPDATE)
```sql
UPDATE pmf_phases
SET 
  discovery_completed_at = NOW(),
  current_phase = "customer_validation"
WHERE project_id = "proj_001"
```
**Why:** Move to next phase

---

## PHASE 2: CUSTOMER VALIDATION

### Action 9: Define Solution Concepts
**Date:** Week 7, Day 1

**Table:** `solutions`
```sql
-- CORE SOLUTION 1
INSERT INTO solutions (
  project_id: "proj_001",
  title: "Guided PMF Validation Workflow",
  description: "Step-by-step process with templates and analytics",
  solution_type: "core_feature",
  delivers_90_percent_value: true,  -- This alone would solve main problem
  implementation_effort: 6,
  value_proposition: "Transform chaotic validation into systematic progress",
  unique_insight: "PMF is engineering problem, not discovery problem",
  development_status: "concept"
)
-- Returns: solution_id = "sol_001"
```
**Why:** Directly addresses "no structured process" problem

```sql
-- DIFFERENTIATOR
INSERT INTO solutions (
  project_id: "proj_001",
  parent_id: "sol_001",
  title: "AI Interview Analyzer",
  solution_type: "differentiator",
  delivers_90_percent_value: false,
  implementation_effort: 8,
  development_status: "concept"
)
-- Returns: solution_id = "sol_002"
```
**Why:** Nice to have, but not essential for MVP

### Action 10: Solution Validation Interviews
**Date:** Week 7-8

**Table:** `user_feedback`
```sql
INSERT INTO user_feedback (
  project_id: "proj_001",
  source_type: "solution_interview",
  segment_id: "seg_001",
  feedback_text: "The workflow is exactly what I need. Skip the AI stuff for now.",
  sentiment: "positive",
  related_solutions: ["sol_001"],
  shows_product_love: true,
  indicates_must_have: true
)
```
**Why:** Validate which solutions to build

### Action 11: Begin Channel Testing
**Date:** Week 9

**Table:** `channels`
```sql
-- CHANNEL 1: Content Marketing
INSERT INTO channels (
  project_id: "proj_001",
  name: "PMF Guide Content Marketing",
  channel_type: "content_marketing",
  test_budget: 5000,
  test_start_date: NOW(),
  test_status: "testing"
)
-- Returns: channel_id = "chan_001"
```
**Why:** Educational content for educational product

```sql
-- CHANNEL 2: LinkedIn Ads
INSERT INTO channels (
  project_id: "proj_001",
  name: "LinkedIn B2B Founder Targeting",
  channel_type: "paid_social",
  test_budget: 3000,
  test_start_date: NOW(),
  test_status: "testing"
)
-- Returns: channel_id = "chan_002"
```
**Why:** Direct access to target persona

### Action 12: Build MVP
**Date:** Week 9-10

**Table:** `solutions` (UPDATE)
```sql
UPDATE solutions
SET 
  development_status = "mvp",
  technical_dependencies = ["Next.js", "Supabase", "Stripe"]
WHERE id = "sol_001"
```
**Why:** MVP complete, ready for early customers

### Action 13: First Paying Customer!
**Date:** Week 11, Day 3

**Table:** `pmf_phases` (UPDATE)
```sql
UPDATE pmf_phases
SET paying_customers_count = 1
WHERE project_id = "proj_001"
```
**Why:** Critical validation milestone

**Table:** `experiments`
```sql
INSERT INTO experiments (
  project_id: "proj_001",
  hypothesis: "Founders will pay $299/month for structured PMF process",
  experiment_type: "pricing_test",
  success_criteria: [
    {"metric": "conversion_rate", "threshold": 0.02, "comparison": "greater"},
    {"metric": "paying_customers", "threshold": 5, "comparison": "greater"}
  ],
  status: "running"
)
```
**Why:** Test pricing hypothesis with real money

### Action 14: Channel Performance Updates
**Date:** Week 12

**Table:** `channels` (UPDATE)
```sql
-- Content performing well
UPDATE channels
SET
  customer_acquisition_cost = 67,
  conversion_rate = 0.034,  -- 3.4% visitor to trial
  lifetime_value_ratio = 107.1,  -- Excellent!
  monthly_growth_rate = 0.15,
  audience_quality_score = 9
WHERE id = "chan_001"

-- LinkedIn expensive but quality
UPDATE channels
SET
  customer_acquisition_cost = 312,
  conversion_rate = 0.021,
  lifetime_value_ratio = 23.0,  -- Still profitable
  audience_quality_score = 8
WHERE id = "chan_002"
```
**Why:** Data shows content marketing is our winner

### Action 15: Define Business Model
**Date:** Week 13

**Table:** `business_models`
```sql
INSERT INTO business_models (
  project_id: "proj_001",
  model_type: "subscription",
  pricing_model: {
    "tiers": [
      {
        "name": "Startup",
        "price": 299,
        "features": ["100 interviews", "Core workflow", "Email support"]
      },
      {
        "name": "Growth",
        "price": 999,
        "features": ["Unlimited", "Team seats", "API", "Slack support"]
      }
    ]
  },
  average_contract_value: 358.80,  -- Annual value
  gross_margin: 0.92,
  revenue_growth_rate: 0.20  -- 20% MoM
)
-- Returns: model_id = "mod_001"
```
**Why:** High margin SaaS model validated by early customers

### Action 16: Test Four Fits
**Date:** Week 14

**Table:** `product_channel_fit`
```sql
INSERT INTO product_channel_fit (
  solution_id: "sol_001",
  channel_id: "chan_001",
  message_channel_fit: 9,  -- Educational content → Educational product
  audience_product_fit: 8,
  conversion_rate: 0.034,
  customer_quality_score: 9
)
```
**Why:** Validate that channel brings right customers

**Table:** `channel_model_fit`
```sql
INSERT INTO channel_model_fit (
  channel_id: "chan_001",
  model_id: "mod_001",
  cac_to_acv_ratio: 0.019,  -- $67 CAC / $3588 ACV
  payback_alignment: true,  -- 2.2 month payback
  margin_viability: true  -- 92% margins support content
)
```
**Why:** Ensure unit economics work

---

## PHASE 3: CUSTOMER CREATION

### Action 17: Sean Ellis Test
**Date:** Week 17

**Table:** `pmf_surveys`
```sql
INSERT INTO pmf_surveys (
  project_id: "proj_001",
  survey_type: "sean_ellis",
  survey_date: NOW(),
  respondent_count: 73,
  very_disappointed_percentage: 0.42,  -- 42% PASS!
  somewhat_disappointed_percentage: 0.31,
  not_disappointed_percentage: 0.27,
  segment_data: {
    "seg_001": {  -- Seed stage
      "very_disappointed": 0.58,
      "somewhat_disappointed": 0.25,
      "not_disappointed": 0.17,
      "sample_size": 31
    },
    "seg_002": {  -- Growth stage
      "very_disappointed": 0.31,
      "somewhat_disappointed": 0.36,
      "not_disappointed": 0.33,
      "sample_size": 42
    }
  },
  net_promoter_score: 67,
  key_insights: [
    "Seed stage loves us (58%), growth stage lukewarm (31%)",
    "Main value: 'Finally have a process'",
    "Biggest complaint: 'Want more automation'"
  ]
)
```
**Why:** Official PMF measurement, segment breakdown crucial

### Action 18: Weekly Metrics Tracking
**Date:** Week 18

**Table:** `pmf_metrics`
```sql
INSERT INTO pmf_metrics (
  project_id: "proj_001",
  metric_date: NOW(),
  metric_type: "weekly",
  new_users: 142,
  active_users: 186,
  paying_customers: 28,
  revenue: 11644,  -- MRR
  daily_active_users: 89,
  weekly_active_users: 142,
  week_1_retention: 0.83,  -- Excellent!
  month_1_retention: 0.68,
  referral_percentage: 0.31,  -- Word of mouth working
  viral_coefficient: 0.42,
  channel_distribution: {
    "content": 0.42,
    "referral": 0.31,
    "paid": 0.19,
    "direct": 0.08
  }
)
```
**Why:** All metrics exceeding targets, especially retention

### Action 19: Strategic Pivot Decision
**Date:** Week 20

**Table:** `pivots`
```sql
INSERT INTO pivots (
  project_id: "proj_001",
  pivot_type: "persona",
  from_description: "All early-stage startups (seed + growth)",
  to_description: "Seed-stage B2B SaaS founders exclusively",
  rationale: "58% PMF score in seed vs 31% in growth. Seed has higher urgency, faster decisions, better word-of-mouth. Focus wins.",
  trigger_metrics: [
    {"metric_name": "sean_ellis_seed", "value": 0.58, "threshold": 0.40},
    {"metric_name": "sean_ellis_growth", "value": 0.31, "threshold": 0.40},
    {"metric_name": "cac_seed", "value": 67, "threshold": 100},
    {"metric_name": "sales_cycle_seed_days", "value": 7, "threshold": 14}
  ],
  pivot_date: NOW()
)
```
**Why:** Data clearly shows where to focus

### Action 20: Update Experiments Based on Learning
**Date:** Week 21

**Table:** `experiments` (UPDATE)
```sql
UPDATE experiments
SET
  results = {
    "conversion_rate": 0.023,
    "paying_customers": 28,
    "avg_time_to_purchase": "7 days"
  },
  conclusion: "Hypothesis validated. Founders will pay $299/month.",
  pmf_impact: "positive",
  status = "completed"
WHERE hypothesis LIKE '%$299/month%'
```
**Why:** Close out successful experiment

### Action 21: Calculate PMF Score
**Date:** Week 22

**Function Call:**
```sql
SELECT calculate_pmf_score("proj_001")
-- Returns: 0.52 (52%)
-- Calculation:
-- Sean Ellis: 0.42 × 0.4 = 0.168
-- Retention: 0.68 × 0.3 = 0.204  
-- Referral: 0.31 × 0.3 = 0.093
-- Total: 0.465 → 0.52
```
**Why:** Composite score shows strong PMF

### Action 22: Phase Progression Decision
**Date:** Week 23

**Table:** `pmf_phases` (UPDATE)
```sql
UPDATE pmf_phases
SET
  creation_completed_at = NOW(),
  current_phase = "company_building",
  pmf_decision = "green_light",
  decision_date = NOW(),
  decision_rationale = "42% Sean Ellis (58% in target segment), 68% M1 retention, 31% referral rate, CAC $67 with 2.2mo payback. Strong PMF achieved with seed-stage B2B SaaS."
WHERE project_id = "proj_001"
```
**Why:** All indicators green, ready to scale

---

## PHASE 4: COMPANY BUILDING

### Action 23: Plan Scaling Experiments
**Date:** Week 24

**Table:** `experiments`
```sql
INSERT INTO experiments (
  project_id: "proj_001",
  hypothesis: "Founder communities (Indie Hackers, r/startups) will convert 5x better than cold traffic",
  experiment_type: "channel_test",
  success_criteria: [
    {"metric": "conversion_rate", "threshold": 0.05, "comparison": "greater"},
    {"metric": "cac", "threshold": 100, "comparison": "less"}
  ],
  minimum_sample_size: 1000,
  status: "planned"
)
```
**Why:** Test scaling channels while maintaining economics

### Action 24: Monitor Ongoing Metrics
**Date:** Ongoing

**Table:** `pmf_metrics` (Weekly inserts)
```sql
-- Weekly tracking to ensure PMF maintains during scaling
INSERT INTO pmf_metrics (...)
```
**Why:** PMF can be lost during scaling if not monitored

---

## Summary Statistics

**Total Database Actions:**
- Problems created: 4
- Segments defined: 2  
- Solutions designed: 2
- Channels tested: 5 (2 shown)
- Experiments run: 3
- Surveys conducted: 1
- User feedback entries: 35+
- Metrics tracked: Weekly

**Key Decision Points:**
1. Problem validated → Proceed to validation (Week 6)
2. First customer → Validate pricing (Week 11)
3. Sean Ellis 42% → Achieve PMF (Week 17)
4. Segment analysis → Pivot to seed-only (Week 20)
5. All metrics green → Scale (Week 23)

**Time to PMF:** 23 weeks (5.5 months)