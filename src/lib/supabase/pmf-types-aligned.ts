// TypeScript types aligned with PMF frameworks

// ==========================================
// CUSTOMER DEVELOPMENT PHASES
// ==========================================

export interface PMFPhase {
  id: string;
  project_id: string;
  current_phase: 'customer_discovery' | 'customer_validation' | 'customer_creation' | 'company_building';
  
  // Phase progression
  discovery_completed_at: string | null;
  validation_completed_at: string | null;
  creation_completed_at: string | null;
  
  // Phase metrics
  problem_interviews_count: number;
  solution_interviews_count: number;
  paying_customers_count: number;
  
  // Go/No-Go Decision
  pmf_decision: 'not_assessed' | 'green_light' | 'yellow_light' | 'red_light';
  decision_date: string | null;
  decision_rationale: string | null;
  
  created_at: string;
  updated_at: string;
}

// ==========================================
// PROBLEM-SOLUTION FIT
// ==========================================

export interface Problem {
  id: string;
  project_id: string;
  parent_id: string | null;
  
  // Core attributes
  title: string;
  description: string | null;
  problem_type: 'root_cause' | 'symptom' | 'job_to_be_done';
  
  // Validation metrics
  severity_score: number | null; // 1-10
  frequency: 'constant' | 'frequent' | 'occasional' | 'rare' | null;
  current_solution_inadequacy: number | null; // 8+/10 target
  
  // Discovery validation
  interview_validation_rate: number | null; // 70%+ target
  unprompted_mentions: number;
  has_workarounds: boolean;
  workaround_description: string | null;
  
  // Willingness indicators
  willingness_to_pay: boolean;
  urgency_level: 'immediate' | 'near_term' | 'nice_to_have' | 'future' | null;
  
  // Metadata
  created_at: string;
  updated_at: string;
  validation_status: 'hypothesis' | 'validated' | 'invalidated';
  
  // Hierarchy
  path_ids: string[];
  depth: number;
}

// ==========================================
// MARKET SEGMENTS
// ==========================================

export interface MarketSegment {
  id: string;
  project_id: string;
  parent_id: string | null;
  
  // Definition
  name: string;
  description: string | null;
  segment_type: 'early_adopter' | 'mainstream' | 'laggard';
  persona_details: Record<string, any>;
  
  // Market sizing
  total_addressable_market: number | null;
  serviceable_addressable_market: number | null;
  serviceable_obtainable_market: number | null;
  
  // Economics
  average_revenue_per_user: number | null;
  lifetime_value: number | null;
  payback_period_months: number | null;
  
  // Behavioral patterns
  jobs_to_be_done: string[];
  current_solutions: Array<{
    name: string;
    satisfaction: number;
    switching_difficulty: number;
  }>;
  switching_barriers: string[];
  
  // PMF indicators
  problem_awareness: 'unaware' | 'problem_aware' | 'solution_aware' | 'product_aware' | null;
  buying_readiness: number | null; // 1-10
  
  // Metadata
  created_at: string;
  updated_at: string;
  
  // Hierarchy
  path_ids: string[];
  depth: number;
}

// ==========================================
// SOLUTIONS & MVP
// ==========================================

export interface Solution {
  id: string;
  project_id: string;
  parent_id: string | null;
  
  // Definition
  title: string;
  description: string | null;
  solution_type: 'core_feature' | 'nice_to_have' | 'differentiator' | 'table_stakes';
  
  // MVP alignment (90/10 rule)
  delivers_90_percent_value: boolean;
  implementation_effort: number | null; // 1-10
  
  // Value prop
  value_proposition: string | null;
  unique_insight: string | null;
  
  // Status
  development_status: 'concept' | 'prototype' | 'mvp' | 'beta' | 'launched' | 'deprecated';
  
  // Success metrics
  adoption_rate: number | null;
  feature_retention: number | null;
  
  // Dependencies
  technical_dependencies: string[];
  solution_dependencies: string[];
  
  // Metadata
  created_at: string;
  updated_at: string;
  
  // Hierarchy
  path_ids: string[];
  depth: number;
}

// ==========================================
// CHANNELS (Product-Channel Fit)
// ==========================================

export interface Channel {
  id: string;
  project_id: string;
  
  // Definition
  name: string;
  channel_type: 
    | 'paid_search' 
    | 'paid_social' 
    | 'organic_search'
    | 'content_marketing'
    | 'social_media'
    | 'email'
    | 'sales'
    | 'partnerships'
    | 'referral'
    | 'viral'
    | 'community'
    | 'marketplace';
  
  // Economics
  customer_acquisition_cost: number | null;
  lifetime_value_ratio: number | null; // LTV:CAC target 3:1
  payback_period_months: number | null;
  
  // Performance
  conversion_rate: number | null;
  monthly_growth_rate: number | null;
  channel_saturation: number | null;
  
  // Quality
  audience_quality_score: number | null; // 1-10
  scalability_score: number | null; // 1-10
  
  // Testing
  test_budget: number | null;
  test_start_date: string | null;
  test_end_date: string | null;
  test_status: 'planned' | 'testing' | 'validated' | 'rejected';
  
  created_at: string;
  updated_at: string;
}

// ==========================================
// BUSINESS MODEL
// ==========================================

export interface BusinessModel {
  id: string;
  project_id: string;
  
  // Model type
  model_type: 
    | 'subscription'
    | 'transactional'
    | 'marketplace'
    | 'freemium'
    | 'advertising'
    | 'enterprise'
    | 'usage_based';
  
  // Pricing
  pricing_model: {
    tiers?: Array<{
      name: string;
      price: number;
      features: string[];
    }>;
    base_price?: number;
    usage_rates?: Record<string, number>;
  };
  average_contract_value: number | null;
  
  // Unit economics
  gross_margin: number | null; // Target: SaaS 80-90%
  contribution_margin: number | null;
  burn_multiple: number | null;
  
  // Growth
  monthly_recurring_revenue: number | null;
  annual_recurring_revenue: number | null;
  revenue_growth_rate: number | null; // 20%+ monthly target
  
  // Retention
  gross_revenue_retention: number | null;
  net_revenue_retention: number | null;
  logo_churn_rate: number | null; // 5-15% monthly target
  
  created_at: string;
  updated_at: string;
}

// ==========================================
// SEAN ELLIS TEST & SURVEYS
// ==========================================

export interface PMFSurvey {
  id: string;
  project_id: string;
  
  // Survey info
  survey_type: 'sean_ellis' | 'nps' | 'custom';
  survey_date: string;
  respondent_count: number;
  
  // Sean Ellis results
  very_disappointed_percentage: number | null; // 40%+ target
  somewhat_disappointed_percentage: number | null;
  not_disappointed_percentage: number | null;
  
  // Segmentation
  segment_data: {
    [segmentId: string]: {
      very_disappointed: number;
      somewhat_disappointed: number;
      not_disappointed: number;
      sample_size: number;
    };
  };
  
  // Additional metrics
  net_promoter_score: number | null; // Target >50
  product_market_fit_score: number | null;
  
  // Insights
  key_insights: string[];
  improvement_themes: Array<{
    theme: string;
    frequency: number;
    priority: 'high' | 'medium' | 'low';
  }>;
  
  created_at: string;
}

// ==========================================
// USER FEEDBACK
// ==========================================

export interface UserFeedback {
  id: string;
  project_id: string;
  
  // Source
  source_type: 
    | 'interview'
    | 'survey'
    | 'support_ticket'
    | 'feature_request'
    | 'churn_interview'
    | 'user_testing';
  
  // User info
  segment_id: string | null;
  user_persona: string | null;
  
  // Content
  feedback_text: string;
  sentiment: 'positive' | 'neutral' | 'negative' | null;
  
  // Related entities
  related_problems: string[];
  related_solutions: string[];
  
  // PMF signals
  shows_product_love: boolean;
  indicates_must_have: boolean;
  suggests_viral_potential: boolean;
  
  // Processing
  is_processed: boolean;
  resulted_in_changes: string[];
  
  created_at: string;
  created_by: string | null;
}

// ==========================================
// METRICS TRACKING
// ==========================================

export interface PMFMetrics {
  id: string;
  project_id: string;
  
  // Time
  metric_date: string;
  metric_type: 'daily' | 'weekly' | 'monthly';
  
  // Growth
  new_users: number | null;
  active_users: number | null;
  paying_customers: number | null;
  revenue: number | null;
  
  // Engagement
  daily_active_users: number | null;
  weekly_active_users: number | null;
  monthly_active_users: number | null;
  
  // Retention
  week_1_retention: number | null; // Target >80%
  month_1_retention: number | null; // Target >60%
  
  // Organic growth
  referral_percentage: number | null; // Target >25%
  viral_coefficient: number | null;
  
  // Channel mix
  channel_distribution: {
    [channelName: string]: number; // percentage, no channel >50%
  };
  
  created_at: string;
}

// ==========================================
// FOUR FITS RELATIONSHIPS
// ==========================================

export interface MarketProductFit {
  id: string;
  segment_id: string;
  problem_id: string;
  
  problem_severity_for_segment: number; // 1-10
  segment_size_for_problem: number | null;
  
  validation_method: string | null;
  confidence_score: number | null;
  
  created_at: string;
}

export interface ProductChannelFit {
  id: string;
  solution_id: string;
  channel_id: string;
  
  message_channel_fit: number; // 1-10
  audience_product_fit: number; // 1-10
  
  conversion_rate: number | null;
  customer_quality_score: number | null; // 1-10
  
  created_at: string;
}

export interface ChannelModelFit {
  id: string;
  channel_id: string;
  model_id: string;
  
  cac_to_acv_ratio: number | null;
  payback_alignment: boolean | null;
  margin_viability: boolean | null;
  
  created_at: string;
}

export interface ModelMarketFit {
  id: string;
  model_id: string;
  segment_id: string;
  
  pricing_acceptance: number | null;
  value_perception: number | null; // 1-10
  competitive_positioning: string | null;
  
  created_at: string;
}

// ==========================================
// EXPERIMENTS & PIVOTS
// ==========================================

export interface Experiment {
  id: string;
  project_id: string;
  
  // Design
  hypothesis: string;
  experiment_type: 
    | 'problem_validation'
    | 'solution_validation'
    | 'channel_test'
    | 'pricing_test'
    | 'messaging_test'
    | 'feature_test';
  
  // Criteria
  success_criteria: {
    metric: string;
    threshold: number;
    comparison: 'greater' | 'less' | 'equal';
  }[];
  minimum_sample_size: number | null;
  
  // Execution
  start_date: string | null;
  end_date: string | null;
  status: 'planned' | 'running' | 'completed' | 'aborted';
  
  // Results
  results: Record<string, any>;
  conclusion: string | null;
  next_steps: string | null;
  
  // Impact
  pmf_impact: 'positive' | 'neutral' | 'negative' | null;
  led_to_pivot: boolean;
  
  created_at: string;
  created_by: string | null;
}

export interface Pivot {
  id: string;
  project_id: string;
  
  // 4Ps framework
  pivot_type: 'persona' | 'problem' | 'promise' | 'product';
  
  // Details
  from_description: string;
  to_description: string;
  rationale: string;
  
  // Triggers
  trigger_metrics: {
    metric_name: string;
    value: number;
    threshold: number;
  }[];
  
  // Outcome
  pivot_date: string;
  success_assessment: string | null;
  
  created_at: string;
  created_by: string | null;
}

// ==========================================
// DASHBOARD & ANALYTICS TYPES
// ==========================================

export interface PMFDashboard {
  phase: PMFPhase;
  pmf_score: number;
  key_metrics: {
    sean_ellis_score: number | null;
    retention_rate: number | null;
    organic_growth: number | null;
    ltv_cac_ratio: number | null;
  };
  four_fits_status: {
    market_product: 'strong' | 'moderate' | 'weak' | 'unknown';
    product_channel: 'strong' | 'moderate' | 'weak' | 'unknown';
    channel_model: 'strong' | 'moderate' | 'weak' | 'unknown';
    model_market: 'strong' | 'moderate' | 'weak' | 'unknown';
  };
  next_actions: string[];
  risk_factors: string[];
}

export interface PhaseChecklist {
  phase: string;
  completed_items: string[];
  pending_items: string[];
  blockers: string[];
  readiness_score: number; // 0-100%
}