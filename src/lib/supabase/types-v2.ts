// Enhanced types for hierarchical PMF data model

export interface PainPoint {
  id: string;
  project_id: string;
  parent_id: string | null;
  
  // Core attributes
  title: string;
  description: string | null;
  pain_type: 'root_problem' | 'symptom' | 'consequence';
  
  // Dimensions
  severity: number; // 1-10
  frequency: 'constant' | 'frequent' | 'occasional' | 'rare' | null;
  urgency: number; // 1-10
  
  // Validation & Confidence
  confidence_score: number; // 0-1
  evidence_count: number;
  validation_status: 'hypothesis' | 'validated' | 'invalidated';
  
  // Metadata
  created_at: string;
  updated_at: string;
  created_by: string | null;
  
  // Hierarchical data
  path_ids: string[];
  depth: number;
  
  // Relationships (populated via joins)
  audiences?: AudienceRelationship[];
  solutions?: SolutionRelationship[];
  children?: PainPoint[];
  evidence?: Evidence[];
}

export interface AudienceSegment {
  id: string;
  project_id: string;
  parent_id: string | null;
  
  // Core attributes
  name: string;
  description: string | null;
  segment_type: 'primary' | 'secondary' | 'tertiary';
  
  // Demographics & Characteristics
  characteristics: Record<string, any>;
  size_estimate: number | null;
  
  // Behavioral attributes
  behaviors: string[];
  motivations: string[];
  frustrations: string[];
  
  // Business value dimensions
  revenue_potential: number | null; // 1-10
  acquisition_difficulty: number | null; // 1-10
  retention_likelihood: number | null; // 1-10
  
  // Validation
  confidence_score: number; // 0-1
  validation_method: string | null;
  
  // Metadata
  created_at: string;
  updated_at: string;
  created_by: string | null;
  
  // Hierarchical data
  path_ids: string[];
  depth: number;
  
  // Relationships
  pain_points?: PainPointRelationship[];
  solutions?: SolutionRelationship[];
  children?: AudienceSegment[];
  evidence?: Evidence[];
}

export interface Solution {
  id: string;
  project_id: string;
  parent_id: string | null;
  
  // Core attributes
  title: string;
  description: string | null;
  solution_type: 'feature' | 'product' | 'service' | 'process';
  
  // Implementation dimensions
  effort_score: number | null; // 1-10
  impact_score: number | null; // 1-10
  priority_score: number | null; // Calculated
  
  // Status tracking
  status: 'idea' | 'planned' | 'in_progress' | 'completed' | 'deprecated';
  completion_percentage: number;
  
  // Technical details
  technical_requirements: string[];
  dependencies: string[]; // Other solution IDs
  
  // Metadata
  created_at: string;
  updated_at: string;
  created_by: string | null;
  
  // Hierarchical data
  path_ids: string[];
  depth: number;
  
  // Relationships
  pain_points?: PainPointRelationship[];
  audiences?: AudienceRelationship[];
  children?: Solution[];
  evidence?: Evidence[];
}

// Relationship types
export interface PainPointRelationship {
  pain_point_id: string;
  pain_point?: PainPoint;
  intensity?: number; // For audience relationships
  frequency?: 'always' | 'often' | 'sometimes' | 'rarely'; // For audience relationships
  effectiveness?: number; // For solution relationships
  coverage?: 'full' | 'partial' | 'minimal'; // For solution relationships
  is_primary?: boolean;
  confidence_score: number;
}

export interface AudienceRelationship {
  audience_id: string;
  audience?: AudienceSegment;
  intensity?: number; // For pain point relationships
  frequency?: 'always' | 'often' | 'sometimes' | 'rarely'; // For pain point relationships
  value_score?: number; // For solution relationships
  adoption_likelihood?: number; // For solution relationships
  usage_frequency?: 'daily' | 'weekly' | 'monthly' | 'occasional';
  is_primary_audience?: boolean;
}

export interface SolutionRelationship {
  solution_id: string;
  solution?: Solution;
  effectiveness: number;
  coverage: 'full' | 'partial' | 'minimal';
  is_primary: boolean;
  value_score?: number; // For audience relationships
  adoption_likelihood?: number; // For audience relationships
}

// Evidence tracking
export interface Evidence {
  id: string;
  project_id: string;
  entity_type: 'pain_point' | 'audience' | 'solution' | 'relationship';
  entity_id: string;
  evidence_type: 'interview' | 'survey' | 'analytics' | 'observation' | 'research';
  source: string;
  content: string;
  confidence_impact: number; // -1 to 1
  collected_at: string;
  created_by: string | null;
}

// Change tracking
export interface ChangeEvent {
  id: string;
  project_id: string;
  entity_type: string;
  entity_id: string;
  change_type: 'create' | 'update' | 'delete' | 'relationship_change';
  field_changes: Record<string, any>;
  old_values: Record<string, any>;
  new_values: Record<string, any>;
  triggered_by: string | null;
  ripple_depth: number;
  changed_at: string;
  changed_by: string | null;
}

// Ripple effect rules
export interface RippleRule {
  id: string;
  source_entity_type: string;
  source_field: string | null;
  change_condition: Record<string, any>;
  target_entity_type: string;
  target_relationship: string | null;
  action_type: 'update_confidence' | 'flag_review' | 'cascade_delete' | 'notify';
  action_params: Record<string, any>;
  is_active: boolean;
}

// Helper types for UI state
export interface HierarchicalNode<T> {
  data: T;
  children: HierarchicalNode<T>[];
  expanded: boolean;
  selected: boolean;
  loading: boolean;
}

export interface RelationshipMatrix {
  pain_points: PainPoint[];
  audiences: AudienceSegment[];
  solutions: Solution[];
  relationships: {
    pain_audience: Map<string, PainPointRelationship>;
    solution_pain: Map<string, SolutionRelationship>;
    solution_audience: Map<string, AudienceRelationship>;
  };
}