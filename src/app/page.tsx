'use client';

import { useState } from 'react';
import EMUDashboardV2 from '@/components/EMUDashboardV2';
import EMUDashboardV3 from '@/components/EMUDashboardV3';
import EMUOnboarding from '@/components/EMUOnboarding';
import { Layers, GitBranch, Sparkles } from 'lucide-react';

export default function Home() {
  const [version, setVersion] = useState<'onboarding' | 'v2' | 'v3'>('v2');
  const [productData, setProductData] = useState<any>(null);

  const handleOnboardingComplete = (data: any) => {
    setProductData(data);
    setVersion('v2');
  };

  return (
    <div>
      {/* Version Switcher */}
      <div className="fixed top-4 right-4 z-50 bg-gray-900 rounded-lg border border-gray-800 p-2 flex items-center gap-2">
        <button
          onClick={() => setVersion('onboarding')}
          className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${
            version === 'onboarding'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Onboarding
        </button>
        <div className="w-px h-6 bg-gray-700" />
        <button
          onClick={() => setVersion('v2')}
          className={`px-3 py-1.5 rounded flex items-center gap-2 transition-all ${
            version === 'v2'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          V2 (Production)
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
          V3 (Prototype)
        </button>
      </div>

      {/* Render Selected Version */}
      {version === 'onboarding' ? (
        <EMUOnboarding onComplete={handleOnboardingComplete} />
      ) : version === 'v2' ? (
        <EMUDashboardV2 />
      ) : (
        <EMUDashboardV3 />
      )}
    </div>
  );
}
