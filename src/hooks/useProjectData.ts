'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { DataService } from '@/lib/supabase/data-service';

interface ProjectData {
  name: string;
  category: string;
  stage: string;
  description: string;
  targetProblem: string;
}

export function useProjectData(userId: string | null) {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const dataService = new DataService();
  const supabase = createClient();

  // Load existing project on mount
  useEffect(() => {
    if (!userId || !supabase) {
      setLoading(false);
      return;
    }

    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const loadProject = async () => {
    if (!userId) return;
    
    try {
      const project = await dataService.getActiveProject(userId);
      if (project) {
        setProjectId(project.id);
        setProjectData({
          name: project.name,
          category: project.category,
          stage: project.stage,
          description: project.description,
          targetProblem: project.target_problem
        });
      }
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (data: ProjectData) => {
    if (!userId || !supabase) return false;
    
    setSaving(true);
    try {
      if (projectId) {
        // Update existing project
        const success = await dataService.updateProject(projectId, {
          name: data.name,
          category: data.category,
          stage: data.stage,
          description: data.description,
          target_problem: data.targetProblem
        });
        if (success) {
          setProjectData(data);
        }
        return success;
      } else {
        // Create new project
        const project = await dataService.createProject({
          name: data.name,
          category: data.category,
          stage: data.stage,
          description: data.description,
          target_problem: data.targetProblem
        }, userId);
        
        if (project) {
          setProjectId(project.id);
          setProjectData(data);
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error('Error saving project:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    projectData,
    projectId,
    loading,
    saving,
    saveProject,
    loadProject
  };
}