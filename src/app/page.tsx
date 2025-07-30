'use client';

import { useState, useEffect } from 'react';
import EMUDashboardV2 from '@/components/EMUDashboardV2';
import EMUDashboardV3 from '@/components/EMUDashboardV3';
import EMUDashboardV4 from '@/components/EMUDashboardV4';
import EMUDashboardV5 from '@/components/EMUDashboardV5';
import EMUOnboarding from '@/components/EMUOnboarding';
import Auth from '@/components/Auth';
import UserMenu from '@/components/UserMenu';
import { createClient } from '@/lib/supabase/client';
import { useProjectData } from '@/hooks/useProjectData';
import { Layers, GitBranch, Sparkles, Grid3X3, FileCheck } from 'lucide-react';

interface ProductData {
  name: string;
  category: string;
  stage: string;
  description: string;
  targetProblem: string;
}

export default function Home() {
  const [version, setVersion] = useState<'onboarding' | 'v2' | 'v3' | 'v4' | 'v5' | 'product'>('product');
  const [v2StartView, setV2StartView] = useState<'onboarding' | 'dashboard'>('dashboard');
  const [user, setUser] = useState<{id: string; email?: string} | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();
  const { projectData, loading: projectLoading, saveProject } = useProjectData(user?.id || null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Check for existing session
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.auth.getSession().then((response: any) => {
      setUser(response.data.session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: authListener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // No auto-redirect - let users control navigation manually

  const handleOnboardingComplete = async (data: ProductData) => {
    // Save product data to database
    const saved = await saveProject(data);
    if (saved) {
      setV2StartView('dashboard');
      setVersion('v2');
    } else {
      alert('Failed to save project. Please try again.');
    }
  };

  if (loading || (user && projectLoading)) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user && supabase) {
    return <Auth onAuthStateChange={setUser} />;
  }

  return (
    <div>
      {/* Version Switcher */}
      <div className="fixed top-4 right-4 z-50 bg-gray-900 rounded-lg border border-gray-800 p-2 flex items-center gap-2">
        <button
          onClick={() => setVersion('product')}
          className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${
            version === 'product'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Product
        </button>
        <div className="w-px h-6 bg-gray-700" />
        <button
          onClick={() => {
            setVersion('v2');
            setV2StartView('dashboard');
          }}
          className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${
            version === 'v2'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          V2
        </button>
        <button
          onClick={() => setVersion('v3')}
          className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${
            version === 'v3'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          V3
        </button>
        <button
          onClick={() => setVersion('v4')}
          className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${
            version === 'v4'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
          V4
        </button>
        <button
          onClick={() => setVersion('v5')}
          className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${
            version === 'v5'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          V5
        </button>
        {user && (
          <>
            <div className="w-px h-6 bg-gray-700" />
            <UserMenu user={user} onSignOut={() => setUser(null)} projectName={projectData?.name} />
          </>
        )}
      </div>

      {/* Render Selected Version */}
      {version === 'product' ? (
        <EMUOnboarding 
          onComplete={handleOnboardingComplete} 
          initialData={projectData}
        />
      ) : version === 'v2' ? (
        <EMUDashboardV2 startView={v2StartView} productData={projectData} />
      ) : version === 'v3' ? (
        <EMUDashboardV3 startView="dashboard" productData={projectData} />
      ) : version === 'v4' ? (
        <EMUDashboardV4 />
      ) : version === 'v5' ? (
        <EMUDashboardV5 />
      ) : (
        <EMUOnboarding onComplete={handleOnboardingComplete} initialData={projectData} />
      )}
    </div>
  );
}
