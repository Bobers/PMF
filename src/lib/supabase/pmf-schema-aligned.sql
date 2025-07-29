-- PMF Framework-Aligned Data Schema
-- Based on Four Fits Framework, Sean Ellis Test, and Customer Development methodology

-- ==========================================
-- PROJECT PHASES (Customer Development)
-- ==========================================

CREATE TABLE IF NOT EXISTS pmf_phases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  
  -- Current phase tracking
  current_phase TEXT CHECK (current_phase IN (
    'customer_discovery',     -- Searching for problem-solution fit
    'customer_validation',    -- Confirming fit through early orders
    'customer_creation',      -- Building scalable PMF
    'company_building'        -- Transition from search to execution
  )) DEFAULT 'customer_discovery',
  
  -- Phase progression
  discovery_completed_at TIMESTAMPTZ,
  validation_completed_at TIMESTAMPTZ,
  creation_completed_at TIMESTAMPTZ,
  
  -- Phase-specific metrics
  problem_interviews_count INTEGER DEFAULT 0,
  solution_interviews_count INTEGER DEFAULT 0,
  paying_customers_count INTEGER DEFAULT 0,
  
  -- Go/No-Go Decision
  pmf_decision TEXT CHECK (pmf_decision IN ('not_assessed', 'green_light', 'yellow_light', 'red_light')) DEFAULT 'not_assessed',
  decision_date TIMESTAMPTZ,
  decision_rationale TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ENHANCED PROBLEM-SOLUTION FIT
-- ==========================================

-- Problems remain hierarchical but with framework alignment
CREATE TABLE IF NOT EXISTS problems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES problems(id) ON DELETE CASCADE,
  
  -- Core attributes
  title TEXT NOT NULL,
  description TEXT,
  problem_type TEXT CHECK (problem_type IN ('root_cause', 'symptom', 'job_to_be_done')) DEFAULT 'symptom',
  
  -- Problem validation metrics (from framework)
  severity_score INTEGER CHECK (severity_score BETWEEN 1 AND 10),
  frequency TEXT CHECK (frequency IN ('constant', 'frequent', 'occasional', 'rare')),
  current_solution_inadequacy INTEGER CHECK (current_solution_inadequacy BETWEEN 1 AND 10), -- 8+/10 target
  
  -- Customer discovery validation
  interview_validation_rate DECIMAL(3,2), -- 70%+ target
  unprompted_mentions INTEGER DEFAULT 0,
  has_workarounds BOOLEAN DEFAULT false,
  workaround_description TEXT,
  
  -- Willingness to pay/switch
  willingness_to_pay BOOLEAN DEFAULT false,
  urgency_level TEXT CHECK (urgency_level IN ('immediate', 'near_term', 'nice_to_have', 'future')),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  validation_status TEXT CHECK (validation_status IN ('hypothesis', 'validated', 'invalidated')) DEFAULT 'hypothesis',
  
  -- Hierarchical path
  path_ids UUID[] DEFAULT ARRAY[]::UUID[],
  depth INTEGER DEFAULT 0
);

-- ==========================================
-- MARKET SEGMENTS (Enhanced Audiences)
-- ==========================================

CREATE TABLE IF NOT EXISTS market_segments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES market_segments(id) ON DELETE CASCADE,
  
  -- Segment definition
  name TEXT NOT NULL,
  description TEXT,
  segment_type TEXT CHECK (segment_type IN ('early_adopter', 'mainstream', 'laggard')) DEFAULT 'early_adopter',
  persona_details JSONB DEFAULT '{}',
  
  -- Market sizing (TAM/SAM/SOM)
  total_addressable_market BIGINT,
  serviceable_addressable_market BIGINT,
  serviceable_obtainable_market BIGINT,
  
  -- Segment economics
  average_revenue_per_user DECIMAL(10,2),
  lifetime_value DECIMAL(10,2),
  payback_period_months INTEGER,
  
  -- Behavioral patterns
  jobs_to_be_done JSONB DEFAULT '[]',
  current_solutions JSONB DEFAULT '[]',
  switching_barriers JSONB DEFAULT '[]',
  
  -- PMF indicators
  problem_awareness TEXT CHECK (problem_awareness IN ('unaware', 'problem_aware', 'solution_aware', 'product_aware')),
  buying_readiness INTEGER CHECK (buying_readiness BETWEEN 1 AND 10),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Hierarchical path
  path_ids UUID[] DEFAULT ARRAY[]::UUID[],
  depth INTEGER DEFAULT 0
);

-- ==========================================
-- SOLUTIONS WITH MVP TRACKING
-- ==========================================

CREATE TABLE IF NOT EXISTS solutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES solutions(id) ON DELETE CASCADE,
  
  -- Solution definition
  title TEXT NOT NULL,
  description TEXT,
  solution_type TEXT CHECK (solution_type IN ('core_feature', 'nice_to_have', 'differentiator', 'table_stakes')) DEFAULT 'core_feature',
  
  -- MVP alignment (90/10 rule)
  delivers_90_percent_value BOOLEAN DEFAULT false,
  implementation_effort INTEGER CHECK (implementation_effort BETWEEN 1 AND 10),
  
  -- Value proposition
  value_proposition TEXT,
  unique_insight TEXT,
  
  -- Development status
  development_status TEXT CHECK (development_status IN (
    'concept',
    'prototype',
    'mvp',
    'beta',
    'launched',
    'deprecated'
  )) DEFAULT 'concept',
  
  -- Success metrics
  adoption_rate DECIMAL(3,2),
  feature_retention DECIMAL(3,2),
  
  -- Dependencies
  technical_dependencies JSONB DEFAULT '[]',
  solution_dependencies UUID[] DEFAULT ARRAY[]::UUID[],
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Hierarchical path
  path_ids UUID[] DEFAULT ARRAY[]::UUID[],
  depth INTEGER DEFAULT 0
);

-- ==========================================
-- CHANNELS (Product-Channel Fit)
-- ==========================================

CREATE TABLE IF NOT EXISTS channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  
  -- Channel definition
  name TEXT NOT NULL,
  channel_type TEXT CHECK (channel_type IN (
    'paid_search',
    'paid_social', 
    'organic_search',
    'content_marketing',
    'social_media',
    'email',
    'sales',
    'partnerships',
    'referral',
    'viral',
    'community',
    'marketplace'
  )) NOT NULL,
  
  -- Channel economics
  customer_acquisition_cost DECIMAL(10,2),
  lifetime_value_ratio DECIMAL(5,2), -- LTV:CAC target 3:1
  payback_period_months INTEGER,
  
  -- Performance metrics
  conversion_rate DECIMAL(5,4),
  monthly_growth_rate DECIMAL(5,4),
  channel_saturation DECIMAL(3,2),
  
  -- Channel-specific attributes
  audience_quality_score INTEGER CHECK (audience_quality_score BETWEEN 1 AND 10),
  scalability_score INTEGER CHECK (scalability_score BETWEEN 1 AND 10),
  
  -- Testing status
  test_budget DECIMAL(10,2),
  test_start_date DATE,
  test_end_date DATE,
  test_status TEXT CHECK (test_status IN ('planned', 'testing', 'validated', 'rejected')) DEFAULT 'planned',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- BUSINESS MODEL (Model-Market Fit)
-- ==========================================

CREATE TABLE IF NOT EXISTS business_models (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  
  -- Model definition
  model_type TEXT CHECK (model_type IN (
    'subscription',
    'transactional',
    'marketplace',
    'freemium',
    'advertising',
    'enterprise',
    'usage_based'
  )) NOT NULL,
  
  -- Pricing strategy
  pricing_model JSONB DEFAULT '{}', -- tiers, features, prices
  average_contract_value DECIMAL(10,2),
  
  -- Unit economics
  gross_margin DECIMAL(3,2), -- Target: SaaS 80-90%, Marketplace 15-30%
  contribution_margin DECIMAL(3,2),
  burn_multiple DECIMAL(5,2), -- Net burn / Net new ARR
  
  -- Growth metrics
  monthly_recurring_revenue DECIMAL(12,2),
  annual_recurring_revenue DECIMAL(12,2),
  revenue_growth_rate DECIMAL(5,4), -- 20%+ monthly target for early stage
  
  -- Retention metrics
  gross_revenue_retention DECIMAL(3,2),
  net_revenue_retention DECIMAL(3,2),
  logo_churn_rate DECIMAL(5,4), -- 5-15% monthly target
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- SEAN ELLIS TEST & SURVEYS
-- ==========================================

CREATE TABLE IF NOT EXISTS pmf_surveys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  
  -- Survey metadata
  survey_type TEXT CHECK (survey_type IN ('sean_ellis', 'nps', 'custom')) DEFAULT 'sean_ellis',
  survey_date DATE NOT NULL,
  respondent_count INTEGER NOT NULL,
  
  -- Sean Ellis Test results
  very_disappointed_percentage DECIMAL(3,2), -- 40%+ target
  somewhat_disappointed_percentage DECIMAL(3,2),
  not_disappointed_percentage DECIMAL(3,2),
  
  -- Segmentation
  segment_data JSONB DEFAULT '{}', -- Results by user segment
  
  -- Additional metrics
  net_promoter_score INTEGER, -- Target >50 for early adopters
  product_market_fit_score DECIMAL(3,2), -- Calculated composite score
  
  -- Qualitative insights
  key_insights TEXT[],
  improvement_themes JSONB DEFAULT '[]',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- USER FEEDBACK & FEATURE REQUESTS
-- ==========================================

CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  
  -- Feedback source
  source_type TEXT CHECK (source_type IN (
    'interview',
    'survey',
    'support_ticket',
    'feature_request',
    'churn_interview',
    'user_testing'
  )) NOT NULL,
  
  -- User segment
  segment_id UUID REFERENCES market_segments(id),
  user_persona TEXT,
  
  -- Feedback content
  feedback_text TEXT NOT NULL,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  
  -- Related entities
  related_problems UUID[],
  related_solutions UUID[],
  
  -- PMF signals
  shows_product_love BOOLEAN DEFAULT false,
  indicates_must_have BOOLEAN DEFAULT false,
  suggests_viral_potential BOOLEAN DEFAULT false,
  
  -- Processing status
  is_processed BOOLEAN DEFAULT false,
  resulted_in_changes UUID[], -- IDs of changes made based on this feedback
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- ==========================================
-- METRICS TRACKING
-- ==========================================

CREATE TABLE IF NOT EXISTS pmf_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  
  -- Time period
  metric_date DATE NOT NULL,
  metric_type TEXT CHECK (metric_type IN ('daily', 'weekly', 'monthly')) DEFAULT 'weekly',
  
  -- Growth metrics
  new_users INTEGER,
  active_users INTEGER,
  paying_customers INTEGER,
  revenue DECIMAL(12,2),
  
  -- Engagement metrics
  daily_active_users INTEGER,
  weekly_active_users INTEGER,
  monthly_active_users INTEGER,
  
  -- Retention cohort (Week 1)
  week_1_retention DECIMAL(3,2), -- Target >80%
  month_1_retention DECIMAL(3,2), -- Target >60%
  
  -- Organic growth
  referral_percentage DECIMAL(3,2), -- Target >25%
  viral_coefficient DECIMAL(3,2),
  
  -- Channel mix
  channel_distribution JSONB DEFAULT '{}', -- % per channel, no channel >50%
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- FOUR FITS RELATIONSHIPS
-- ==========================================

-- Market-Product Fit
CREATE TABLE IF NOT EXISTS market_product_fit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  segment_id UUID REFERENCES market_segments(id) ON DELETE CASCADE NOT NULL,
  problem_id UUID REFERENCES problems(id) ON DELETE CASCADE NOT NULL,
  
  -- Fit strength
  problem_severity_for_segment INTEGER CHECK (problem_severity_for_segment BETWEEN 1 AND 10),
  segment_size_for_problem INTEGER,
  
  -- Validation
  validation_method TEXT,
  confidence_score DECIMAL(3,2),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(segment_id, problem_id)
);

-- Product-Channel Fit
CREATE TABLE IF NOT EXISTS product_channel_fit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  solution_id UUID REFERENCES solutions(id) ON DELETE CASCADE NOT NULL,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE NOT NULL,
  
  -- Fit assessment
  message_channel_fit INTEGER CHECK (message_channel_fit BETWEEN 1 AND 10),
  audience_product_fit INTEGER CHECK (audience_product_fit BETWEEN 1 AND 10),
  
  -- Performance
  conversion_rate DECIMAL(5,4),
  customer_quality_score INTEGER CHECK (customer_quality_score BETWEEN 1 AND 10),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(solution_id, channel_id)
);

-- Channel-Model Fit
CREATE TABLE IF NOT EXISTS channel_model_fit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE NOT NULL,
  model_id UUID REFERENCES business_models(id) ON DELETE CASCADE NOT NULL,
  
  -- Economics alignment
  cac_to_acv_ratio DECIMAL(5,2), -- CAC vs Average Contract Value
  payback_alignment BOOLEAN, -- Does payback period work?
  margin_viability BOOLEAN, -- Do margins support channel cost?
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(channel_id, model_id)
);

-- Model-Market Fit
CREATE TABLE IF NOT EXISTS model_market_fit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id UUID REFERENCES business_models(id) ON DELETE CASCADE NOT NULL,
  segment_id UUID REFERENCES market_segments(id) ON DELETE CASCADE NOT NULL,
  
  -- Market alignment
  pricing_acceptance DECIMAL(3,2),
  value_perception INTEGER CHECK (value_perception BETWEEN 1 AND 10),
  competitive_positioning TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(model_id, segment_id)
);

-- ==========================================
-- EXPERIMENTS & ITERATIONS
-- ==========================================

CREATE TABLE IF NOT EXISTS experiments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  
  -- Experiment design
  hypothesis TEXT NOT NULL,
  experiment_type TEXT CHECK (experiment_type IN (
    'problem_validation',
    'solution_validation',
    'channel_test',
    'pricing_test',
    'messaging_test',
    'feature_test'
  )) NOT NULL,
  
  -- Targets
  success_criteria JSONB NOT NULL, -- Specific metrics and thresholds
  minimum_sample_size INTEGER,
  
  -- Execution
  start_date DATE,
  end_date DATE,
  status TEXT CHECK (status IN ('planned', 'running', 'completed', 'aborted')) DEFAULT 'planned',
  
  -- Results
  results JSONB DEFAULT '{}',
  conclusion TEXT,
  next_steps TEXT,
  
  -- Impact on PMF
  pmf_impact TEXT CHECK (pmf_impact IN ('positive', 'neutral', 'negative')),
  led_to_pivot BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- ==========================================
-- PIVOT TRACKING
-- ==========================================

CREATE TABLE IF NOT EXISTS pivots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  
  -- Pivot type (4Ps framework)
  pivot_type TEXT CHECK (pivot_type IN (
    'persona',    -- Target customer
    'problem',    -- Adjacent needs  
    'promise',    -- Value proposition
    'product'     -- Features/functionality
  )) NOT NULL,
  
  -- Pivot details
  from_description TEXT NOT NULL,
  to_description TEXT NOT NULL,
  rationale TEXT NOT NULL,
  
  -- Trigger metrics
  trigger_metrics JSONB DEFAULT '{}', -- Which metrics drove the pivot
  
  -- Outcome
  pivot_date DATE NOT NULL,
  success_assessment TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================

CREATE INDEX idx_problems_project ON problems(project_id);
CREATE INDEX idx_problems_validation ON problems(validation_status, interview_validation_rate);
CREATE INDEX idx_segments_project ON market_segments(project_id);
CREATE INDEX idx_solutions_project ON solutions(project_id);
CREATE INDEX idx_solutions_status ON solutions(development_status);
CREATE INDEX idx_channels_project ON channels(project_id);
CREATE INDEX idx_channels_test ON channels(test_status);
CREATE INDEX idx_surveys_project_date ON pmf_surveys(project_id, survey_date DESC);
CREATE INDEX idx_feedback_project ON user_feedback(project_id, created_at DESC);
CREATE INDEX idx_metrics_project_date ON pmf_metrics(project_id, metric_date DESC);
CREATE INDEX idx_experiments_project ON experiments(project_id, status);

-- ==========================================
-- HELPER FUNCTIONS
-- ==========================================

-- Calculate PMF Score based on multiple inputs
CREATE OR REPLACE FUNCTION calculate_pmf_score(
  p_project_id UUID
) RETURNS DECIMAL AS $$
DECLARE
  sean_ellis_score DECIMAL;
  retention_score DECIMAL;
  organic_growth_score DECIMAL;
  total_score DECIMAL;
BEGIN
  -- Get latest Sean Ellis score
  SELECT very_disappointed_percentage 
  INTO sean_ellis_score
  FROM pmf_surveys
  WHERE project_id = p_project_id 
    AND survey_type = 'sean_ellis'
  ORDER BY survey_date DESC
  LIMIT 1;
  
  -- Get latest retention metrics
  SELECT month_1_retention
  INTO retention_score
  FROM pmf_metrics
  WHERE project_id = p_project_id
  ORDER BY metric_date DESC
  LIMIT 1;
  
  -- Get organic growth percentage
  SELECT referral_percentage
  INTO organic_growth_score
  FROM pmf_metrics
  WHERE project_id = p_project_id
  ORDER BY metric_date DESC
  LIMIT 1;
  
  -- Weight and combine scores
  total_score = (
    COALESCE(sean_ellis_score, 0) * 0.4 +
    COALESCE(retention_score, 0) * 0.3 +
    COALESCE(organic_growth_score, 0) * 0.3
  );
  
  RETURN total_score;
END;
$$ LANGUAGE plpgsql;

-- Check if ready for next phase
CREATE OR REPLACE FUNCTION check_phase_progression(
  p_project_id UUID
) RETURNS TEXT AS $$
DECLARE
  current_phase TEXT;
  problem_validation_rate DECIMAL;
  paying_customers INTEGER;
  pmf_score DECIMAL;
BEGIN
  -- Get current phase
  SELECT current_phase INTO current_phase
  FROM pmf_phases
  WHERE project_id = p_project_id;
  
  CASE current_phase
    WHEN 'customer_discovery' THEN
      -- Check problem validation rate
      SELECT AVG(interview_validation_rate)
      INTO problem_validation_rate
      FROM problems
      WHERE project_id = p_project_id;
      
      IF problem_validation_rate >= 0.7 THEN
        RETURN 'Ready for customer_validation';
      END IF;
      
    WHEN 'customer_validation' THEN
      -- Check paying customers
      SELECT paying_customers_count
      INTO paying_customers
      FROM pmf_phases
      WHERE project_id = p_project_id;
      
      IF paying_customers >= 5 THEN -- B2B threshold
        RETURN 'Ready for customer_creation';
      END IF;
      
    WHEN 'customer_creation' THEN
      -- Check PMF score
      pmf_score = calculate_pmf_score(p_project_id);
      
      IF pmf_score >= 0.4 THEN
        RETURN 'Ready for company_building';
      END IF;
  END CASE;
  
  RETURN 'Not ready for progression';
END;
$$ LANGUAGE plpgsql;