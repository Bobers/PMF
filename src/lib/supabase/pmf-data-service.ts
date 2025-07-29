import { createClient } from './client';
import type { 
  PainPoint, 
  AudienceSegment, 
  Solution, 
  Evidence,
  ChangeEvent,
  RippleRule 
} from './types-v2';

export class PMFDataService {
  private supabase = createClient();

  // ==========================================
  // PAIN POINTS
  // ==========================================

  async getPainPoints(projectId: string, includeRelationships = false) {
    let query = this.supabase
      .from('pain_points')
      .select(includeRelationships ? `
        *,
        audiences:pain_audience_relationships(
          audience_id,
          intensity,
          frequency,
          confidence_score,
          audience:audience_segments(*)
        ),
        solutions:solution_pain_relationships(
          solution_id,
          effectiveness,
          coverage,
          is_primary,
          solution:solutions(*)
        )
      ` : '*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async createPainPoint(
    projectId: string,
    painPoint: Omit<PainPoint, 'id' | 'project_id' | 'created_at' | 'updated_at' | 'path_ids' | 'depth'>
  ) {
    const { data, error } = await this.supabase
      .from('pain_points')
      .insert({
        ...painPoint,
        project_id: projectId,
        created_by: (await this.supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    
    // Trigger ripple effects
    await this.processRippleEffects('pain_points', data.id, 'create', {}, data);
    
    return data;
  }

  async updatePainPoint(id: string, updates: Partial<PainPoint>) {
    // Get old values for ripple effect processing
    const { data: oldData } = await this.supabase
      .from('pain_points')
      .select('*')
      .eq('id', id)
      .single();

    const { data, error } = await this.supabase
      .from('pain_points')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Process ripple effects
    await this.processRippleEffects('pain_points', id, 'update', oldData, data);

    return data;
  }

  // ==========================================
  // AUDIENCES
  // ==========================================

  async getAudiences(projectId: string, includeRelationships = false) {
    let query = this.supabase
      .from('audience_segments')
      .select(includeRelationships ? `
        *,
        pain_points:pain_audience_relationships(
          pain_point_id,
          intensity,
          frequency,
          confidence_score,
          pain_point:pain_points(*)
        ),
        solutions:solution_audience_relationships(
          solution_id,
          value_score,
          adoption_likelihood,
          usage_frequency,
          is_primary_audience,
          solution:solutions(*)
        )
      ` : '*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async createAudience(
    projectId: string,
    audience: Omit<AudienceSegment, 'id' | 'project_id' | 'created_at' | 'updated_at' | 'path_ids' | 'depth'>
  ) {
    const { data, error } = await this.supabase
      .from('audience_segments')
      .insert({
        ...audience,
        project_id: projectId,
        created_by: (await this.supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ==========================================
  // SOLUTIONS
  // ==========================================

  async getSolutions(projectId: string, includeRelationships = false) {
    let query = this.supabase
      .from('solutions')
      .select(includeRelationships ? `
        *,
        pain_points:solution_pain_relationships(
          pain_point_id,
          effectiveness,
          coverage,
          is_primary,
          pain_point:pain_points(*)
        ),
        audiences:solution_audience_relationships(
          audience_id,
          value_score,
          adoption_likelihood,
          usage_frequency,
          is_primary_audience,
          audience:audience_segments(*)
        )
      ` : '*')
      .eq('project_id', projectId)
      .order('priority_score', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async createSolution(
    projectId: string,
    solution: Omit<Solution, 'id' | 'project_id' | 'created_at' | 'updated_at' | 'path_ids' | 'depth' | 'priority_score'>
  ) {
    const { data, error } = await this.supabase
      .from('solutions')
      .insert({
        ...solution,
        project_id: projectId,
        created_by: (await this.supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ==========================================
  // RELATIONSHIPS
  // ==========================================

  async linkPainToAudience(
    painPointId: string,
    audienceId: string,
    relationship: {
      intensity: number;
      frequency: 'always' | 'often' | 'sometimes' | 'rarely';
      evidence_notes?: string;
      confidence_score?: number;
    }
  ) {
    const { data, error } = await this.supabase
      .from('pain_audience_relationships')
      .insert({
        pain_point_id: painPointId,
        audience_id: audienceId,
        ...relationship,
        created_by: (await this.supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    
    // Update confidence scores based on new relationship
    await this.updateConfidenceScores(painPointId, 'pain_point');
    await this.updateConfidenceScores(audienceId, 'audience');
    
    return data;
  }

  async linkSolutionToPain(
    solutionId: string,
    painPointId: string,
    relationship: {
      effectiveness: number;
      coverage: 'full' | 'partial' | 'minimal';
      is_primary?: boolean;
    }
  ) {
    const { data, error } = await this.supabase
      .from('solution_pain_relationships')
      .insert({
        solution_id: solutionId,
        pain_point_id: painPointId,
        ...relationship,
        created_by: (await this.supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async linkSolutionToAudience(
    solutionId: string,
    audienceId: string,
    relationship: {
      value_score: number;
      adoption_likelihood: number;
      usage_frequency?: 'daily' | 'weekly' | 'monthly' | 'occasional';
      is_primary_audience?: boolean;
    }
  ) {
    const { data, error } = await this.supabase
      .from('solution_audience_relationships')
      .insert({
        solution_id: solutionId,
        audience_id: audienceId,
        ...relationship,
        created_by: (await this.supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ==========================================
  // EVIDENCE & VALIDATION
  // ==========================================

  async addEvidence(evidence: Omit<Evidence, 'id' | 'collected_at' | 'created_by'>) {
    const { data, error } = await this.supabase
      .from('evidence_entries')
      .insert({
        ...evidence,
        created_by: (await this.supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;

    // Update confidence score of the related entity
    await this.updateConfidenceScores(evidence.entity_id, evidence.entity_type);

    return data;
  }

  private async updateConfidenceScores(entityId: string, entityType: string) {
    // Get all evidence for this entity
    const { data: evidence } = await this.supabase
      .from('evidence_entries')
      .select('confidence_impact')
      .eq('entity_id', entityId)
      .eq('entity_type', entityType);

    if (!evidence) return;

    // Calculate new confidence score
    const baseConfidence = 0.5;
    const totalImpact = evidence.reduce((sum, e) => sum + e.confidence_impact, 0);
    const newConfidence = Math.max(0, Math.min(1, baseConfidence + totalImpact));

    // Update the entity's confidence score
    const table = entityType === 'pain_point' ? 'pain_points' : 
                  entityType === 'audience' ? 'audience_segments' : 
                  'solutions';

    await this.supabase
      .from(table)
      .update({ 
        confidence_score: newConfidence,
        evidence_count: evidence.length 
      })
      .eq('id', entityId);
  }

  // ==========================================
  // RIPPLE EFFECTS
  // ==========================================

  private async processRippleEffects(
    entityType: string,
    entityId: string,
    changeType: 'create' | 'update' | 'delete',
    oldValues: any,
    newValues: any
  ) {
    // Record the change event
    const { data: changeEvent } = await this.supabase
      .from('change_events')
      .insert({
        project_id: newValues?.project_id || oldValues?.project_id,
        entity_type: entityType,
        entity_id: entityId,
        change_type: changeType,
        old_values: oldValues || {},
        new_values: newValues || {},
        changed_by: (await this.supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    // Get applicable ripple rules
    const { data: rules } = await this.supabase
      .from('ripple_rules')
      .select('*')
      .eq('source_entity_type', entityType)
      .eq('is_active', true);

    if (!rules) return;

    // Process each rule
    for (const rule of rules) {
      if (this.evaluateRuleCondition(rule.change_condition, oldValues, newValues)) {
        await this.executeRippleAction(rule, entityId, changeEvent.id);
      }
    }
  }

  private evaluateRuleCondition(condition: any, oldValues: any, newValues: any): boolean {
    // Simplified condition evaluation
    // In real implementation, this would be more sophisticated
    for (const [field, check] of Object.entries(condition)) {
      const oldVal = oldValues?.[field];
      const newVal = newValues?.[field];
      
      if (check.op === '>' && !(newVal > check.value)) return false;
      if (check.op === '<' && !(newVal < check.value)) return false;
      if (check.op === 'changed' && oldVal === newVal) return false;
    }
    
    return true;
  }

  private async executeRippleAction(rule: RippleRule, sourceEntityId: string, changeEventId: string) {
    switch (rule.action_type) {
      case 'update_confidence':
        // Update confidence scores of related entities
        await this.updateRelatedConfidence(rule, sourceEntityId);
        break;
        
      case 'flag_review':
        // Flag related entities for review
        await this.flagForReview(rule, sourceEntityId);
        break;
        
      case 'notify':
        // Send notifications (implement based on your notification system)
        console.log('Notification triggered:', rule.action_params);
        break;
    }
  }

  private async updateRelatedConfidence(rule: RippleRule, sourceEntityId: string) {
    // This would update confidence scores of related entities
    // based on the rule's target specifications
    console.log('Updating related confidence scores');
  }

  private async flagForReview(rule: RippleRule, sourceEntityId: string) {
    // This would flag related entities for manual review
    console.log('Flagging entities for review');
  }

  // ==========================================
  // HIERARCHICAL OPERATIONS
  // ==========================================

  async getHierarchicalTree(
    entityType: 'pain_points' | 'audience_segments' | 'solutions',
    projectId: string
  ) {
    const { data, error } = await this.supabase
      .from(entityType)
      .select('*')
      .eq('project_id', projectId)
      .order('depth', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Build tree structure
    const tree = this.buildTree(data);
    return tree;
  }

  private buildTree(items: any[]): any[] {
    const itemMap = new Map(items.map(item => [item.id, { ...item, children: [] }]));
    const roots: any[] = [];

    items.forEach(item => {
      if (item.parent_id) {
        const parent = itemMap.get(item.parent_id);
        if (parent) {
          parent.children.push(itemMap.get(item.id));
        }
      } else {
        roots.push(itemMap.get(item.id));
      }
    });

    return roots;
  }

  // ==========================================
  // ANALYTICS & INSIGHTS
  // ==========================================

  async getProjectInsights(projectId: string) {
    // Get counts and statistics
    const [painPoints, audiences, solutions] = await Promise.all([
      this.supabase.from('pain_points').select('id, severity, confidence_score', { count: 'exact' }).eq('project_id', projectId),
      this.supabase.from('audience_segments').select('id, revenue_potential, confidence_score', { count: 'exact' }).eq('project_id', projectId),
      this.supabase.from('solutions').select('id, status, priority_score', { count: 'exact' }).eq('project_id', projectId)
    ]);

    // Calculate insights
    return {
      totalPainPoints: painPoints.count || 0,
      avgPainSeverity: this.calculateAverage(painPoints.data || [], 'severity'),
      totalAudiences: audiences.count || 0,
      avgRevenuePotential: this.calculateAverage(audiences.data || [], 'revenue_potential'),
      totalSolutions: solutions.count || 0,
      solutionsByStatus: this.groupBy(solutions.data || [], 'status'),
      overallConfidence: this.calculateOverallConfidence([
        ...(painPoints.data || []),
        ...(audiences.data || []),
        ...(solutions.data || [])
      ])
    };
  }

  private calculateAverage(items: any[], field: string): number {
    if (items.length === 0) return 0;
    const sum = items.reduce((acc, item) => acc + (item[field] || 0), 0);
    return sum / items.length;
  }

  private groupBy(items: any[], field: string): Record<string, number> {
    return items.reduce((acc, item) => {
      const key = item[field] || 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }

  private calculateOverallConfidence(items: any[]): number {
    if (items.length === 0) return 0;
    const sum = items.reduce((acc, item) => acc + (item.confidence_score || 0.5), 0);
    return sum / items.length;
  }
}