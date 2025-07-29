'use client';

import React, { useState } from 'react';
import { Target, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (productInfo: {
    name: string;
    category: string;
    stage: string;
    description: string;
    targetProblem: string;
  }) => void;
  initialData?: {
    name: string;
    category: string;
    stage: string;
    description: string;
    targetProblem: string;
  } | null;
}

const EMUOnboarding: React.FC<OnboardingProps> = ({ onComplete, initialData }) => {
  const [productInfo, setProductInfo] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    stage: initialData?.stage || '',
    description: initialData?.description || '',
    targetProblem: initialData?.targetProblem || ''
  });

  const handleSubmit = () => {
    if (productInfo.name && productInfo.category && productInfo.stage) {
      onComplete(productInfo);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Target className="w-8 h-8 text-purple-500" />
          <div>
            <h1 className="text-3xl font-bold">EMU - Evolving Marketing Understanding</h1>
            <p className="text-gray-400 mt-1">AI-powered PMF validation with adaptive learning</p>
          </div>
        </div>
        
        <div className="space-y-6 bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              value={productInfo.name}
              onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
              placeholder="e.g., EMU"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['B2B SaaS', 'B2C App', 'Marketplace', 'Developer Tool', 'E-commerce', 'Enterprise'].map((category) => (
                <button
                  key={category}
                  onClick={() => setProductInfo({ ...productInfo, category })}
                  className={`p-3 rounded-lg border transition-all ${
                    productInfo.category === category
                      ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Stage</label>
            <select
              value={productInfo.stage}
              onChange={(e) => setProductInfo({ ...productInfo, stage: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            >
              <option value="">Select stage</option>
              <option value="idea">Idea Stage</option>
              <option value="prototype">Prototype Built</option>
              <option value="beta">Beta Testing</option>
              <option value="launched">Recently Launched</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Product Description</label>
            <textarea
              value={productInfo.description}
              onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
              rows={3}
              placeholder="What does your product do?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Problem</label>
            <textarea
              value={productInfo.targetProblem}
              onChange={(e) => setProductInfo({ ...productInfo, targetProblem: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
              rows={2}
              placeholder="What problem are you solving?"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!productInfo.name || !productInfo.category || !productInfo.stage}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {initialData ? 'Update & Continue' : 'Start EMU Journey'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EMUOnboarding;