export interface Database {
  public: {
    Tables: {
      pmf_projects: {
        Row: {
          id: string
          user_id: string
          name: string
          category: string
          stage: string
          description: string
          target_problem: string
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: string
          stage: string
          description: string
          target_problem: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          category?: string
          stage?: string
          description?: string
          target_problem?: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      pmf_project_data: {
        Row: {
          id: string
          project_id: string
          user_id: string
          version: 'v2' | 'v3'
          data: Record<string, unknown> // JSON data for pain points, audiences, solutions, etc.
          foundation_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          version: 'v2' | 'v3'
          data: Record<string, unknown>
          foundation_status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          version?: 'v2' | 'v3'
          data?: Record<string, unknown>
          foundation_status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}