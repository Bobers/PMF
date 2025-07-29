'use client';

import { useState } from 'react';
import EMUDashboardV2 from '@/components/EMUDashboardV2';
import EMUDashboardV3 from '@/components/EMUDashboardV3';
import EMUOnboarding from '@/components/EMUOnboarding';
import { Layers, GitBranch, Sparkles } from 'lucide-react';

interface ProductData {
  name: string;
  category: string;
  stage: string;
  description: string;
  targetProblem: string;
}

export default function Home() {
  const [version, setVersion] = useState<'onboarding' | 'v2' | 'v3' | 'product'>('v2');
  const [v2StartView, setV2StartView] = useState<'onboarding' | 'dashboard'>('dashboard');

  const handleOnboardingComplete = (data: ProductData) => {
    // Product data received from onboarding
    console.log('Product onboarding completed:', data);
    setVersion('v2');
  };

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
      </div>

      {/* Render Selected Version */}
      {version === 'product' ? (
        <EMUOnboarding onComplete={handleOnboardingComplete} />
      ) : version === 'v2' ? (
        <EMUDashboardV2 startView={v2StartView} />
      ) : version === 'v3' ? (
        <EMUDashboardV3 startView="dashboard" />
      ) : (
        <EMUOnboarding onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
}
