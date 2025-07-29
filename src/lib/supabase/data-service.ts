import { createClient } from './client';
import type { Database } from './types';

type Project = Database['public']['Tables']['pmf_projects']['Row'];
type ProjectInsert = Database['public']['Tables']['pmf_projects']['Insert'];
type ProjectData = Database['public']['Tables']['pmf_project_data']['Row'];
// type ProjectDataInsert = Database['public']['Tables']['pmf_project_data']['Insert'];

export class DataService {
  private supabase = createClient();

  // Get or create active project for user
  async getActiveProject(userId: string): Promise<Project | null> {
    if (!this.supabase) return null;
    
    const { data, error } = await this.supabase
      .from('pmf_projects')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') { // Not found error
      console.error('Error fetching active project:', error);
      return null;
    }

    return data;
  }

  // Create a new project
  async createProject(project: Omit<ProjectInsert, 'user_id'>, userId: string): Promise<Project | null> {
    if (!this.supabase) return null;
    
    // First, set all other projects as inactive
    await this.supabase
      .from('pmf_projects')
      .update({ is_active: false })
      .eq('user_id', userId);

    const { data, error } = await this.supabase
      .from('pmf_projects')
      .insert({ ...project, user_id: userId })
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }

    return data;
  }

  // Update project
  async updateProject(projectId: string, updates: Partial<Project>): Promise<boolean> {
    const { error } = await this.supabase
      .from('pmf_projects')
      .update(updates)
      .eq('id', projectId);

    if (error) {
      console.error('Error updating project:', error);
      return false;
    }

    return true;
  }

  // Get project data for a specific version
  async getProjectData(projectId: string, version: 'v2' | 'v3'): Promise<ProjectData | null> {
    const { data, error } = await this.supabase
      .from('pmf_project_data')
      .select('*')
      .eq('project_id', projectId)
      .eq('version', version)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching project data:', error);
      return null;
    }

    return data;
  }

  // Save project data
  async saveProjectData(
    projectId: string,
    userId: string,
    version: 'v2' | 'v3',
    data: Record<string, unknown>,
    foundationStatus: string
  ): Promise<boolean> {
    // Check if data already exists
    const existing = await this.getProjectData(projectId, version);

    if (existing) {
      // Update existing data
      const { error } = await this.supabase
        .from('pmf_project_data')
        .update({ data, foundation_status: foundationStatus })
        .eq('id', existing.id);

      if (error) {
        console.error('Error updating project data:', error);
        return false;
      }
    } else {
      // Insert new data
      const { error } = await this.supabase
        .from('pmf_project_data')
        .insert({
          project_id: projectId,
          user_id: userId,
          version,
          data,
          foundation_status: foundationStatus
        });

      if (error) {
        console.error('Error inserting project data:', error);
        return false;
      }
    }

    return true;
  }

  // Export all user data
  async exportUserData(userId: string): Promise<Record<string, unknown>> {
    const { data: projects } = await this.supabase
      .from('pmf_projects')
      .select(`
        *,
        pmf_project_data (*)
      `)
      .eq('user_id', userId);

    return {
      exported_at: new Date().toISOString(),
      projects
    };
  }
}