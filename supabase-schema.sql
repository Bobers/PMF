-- Create pmf_projects table
CREATE TABLE IF NOT EXISTS pmf_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  stage TEXT NOT NULL,
  description TEXT NOT NULL,
  target_problem TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create pmf_project_data table
CREATE TABLE IF NOT EXISTS pmf_project_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES pmf_projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  version TEXT CHECK (version IN ('v2', 'v3')) NOT NULL,
  data JSONB NOT NULL,
  foundation_status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_pmf_projects_user_id ON pmf_projects(user_id);
CREATE INDEX idx_pmf_project_data_project_id ON pmf_project_data(project_id);
CREATE INDEX idx_pmf_project_data_user_id ON pmf_project_data(user_id);

-- Enable Row Level Security
ALTER TABLE pmf_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pmf_project_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own projects
CREATE POLICY "Users can view own projects" ON pmf_projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON pmf_projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON pmf_projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON pmf_projects
  FOR DELETE USING (auth.uid() = user_id);

-- Users can only see their own project data
CREATE POLICY "Users can view own project data" ON pmf_project_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own project data" ON pmf_project_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own project data" ON pmf_project_data
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own project data" ON pmf_project_data
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_pmf_projects_updated_at BEFORE UPDATE ON pmf_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pmf_project_data_updated_at BEFORE UPDATE ON pmf_project_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();