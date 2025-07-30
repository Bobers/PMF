'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home, Users, Target, Lightbulb, Building, TrendingUp, Rocket } from 'lucide-react';

// Types
interface ChunkNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  value?: string;
  children?: ChunkNode[];
  description?: string;
}

interface NavigationState {
  currentPath: string[];
  selectedValues: Map<string, string>;
  currentView: 'foundation' | 'section' | 'chunk';
}

// Navigation Data
const navigationTree: Record<string, ChunkNode> = {
  personas: {
    id: 'personas',
    label: 'Personas',
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        id: 'who',
        label: 'Who',
        icon: <Users className="w-4 h-4" />,
        description: 'Identity & characteristics',
        children: [
          {
            id: 'role',
            label: 'Role',
            icon: <Building className="w-4 h-4" />,
            children: [
              {
                id: 'title',
                label: 'Title',
                children: [
                  { id: 'ceo', label: 'CEO/Executive', value: 'ceo' },
                  { id: 'founder', label: 'Founder', value: 'founder' },
                  { id: 'director', label: 'Director/VP', value: 'director' }
                ]
              },
              {
                id: 'focus',
                label: 'Focus',
                children: [
                  { id: 'growth', label: 'Growth', value: 'growth' },
                  { id: 'operations', label: 'Operations', value: 'operations' },
                  { id: 'strategy', label: 'Strategy', value: 'strategy' }
                ]
              },
              {
                id: 'tenure',
                label: 'Tenure',
                children: [
                  { id: 'new', label: '0-2 years', value: '0-2' },
                  { id: 'experienced', label: '2-5 years', value: '2-5' },
                  { id: 'veteran', label: '5+ years', value: '5+' }
                ]
              }
            ]
          },
          {
            id: 'resources',
            label: 'Resources',
            icon: <TrendingUp className="w-4 h-4" />,
            children: [
              {
                id: 'budget',
                label: 'Budget',
                children: [
                  { id: 'small', label: '<$10k', value: '<10k' },
                  { id: 'medium', label: '$10-100k', value: '10-100k' },
                  { id: 'large', label: '$100k+', value: '100k+' }
                ]
              },
              {
                id: 'team',
                label: 'Team',
                children: [
                  { id: 'solo', label: 'Solo', value: 'solo' },
                  { id: 'small-team', label: 'Small (2-10)', value: 'small' },
                  { id: 'large-team', label: 'Large (10+)', value: 'large' }
                ]
              },
              {
                id: 'authority',
                label: 'Authority',
                children: [
                  { id: 'full', label: 'Full decision', value: 'full' },
                  { id: 'partial', label: 'Partial input', value: 'partial' },
                  { id: 'influencer', label: 'Influencer only', value: 'influencer' }
                ]
              }
            ]
          },
          {
            id: 'stage',
            label: 'Stage',
            icon: <Rocket className="w-4 h-4" />,
            children: [
              {
                id: 'company',
                label: 'Company',
                children: [
                  { id: 'startup', label: 'Startup', value: 'startup' },
                  { id: 'scaleup', label: 'Scale-up', value: 'scaleup' },
                  { id: 'enterprise', label: 'Enterprise', value: 'enterprise' }
                ]
              },
              {
                id: 'revenue',
                label: 'Revenue',
                children: [
                  { id: 'prerev', label: 'Pre-revenue', value: 'pre-revenue' },
                  { id: 'sub1m', label: '<$1M', value: '<1M' },
                  { id: 'plus1m', label: '$1M+', value: '1M+' }
                ]
              },
              {
                id: 'employees',
                label: 'Employees',
                children: [
                  { id: 'small-co', label: '1-10', value: '1-10' },
                  { id: 'mid-co', label: '10-50', value: '10-50' },
                  { id: 'large-co', label: '50+', value: '50+' }
                ]
              }
            ]
          }
        ]
      },
      // Where and Why would follow the same pattern...
    ]
  },
  problems: {
    id: 'problems',
    label: 'Problems',
    icon: <Target className="w-5 h-5" />,
    children: []
  },
  solution: {
    id: 'solution',
    label: 'Solution',
    icon: <Lightbulb className="w-5 h-5" />,
    children: []
  }
};

export default function EMUDashboardV4() {
  const [navState, setNavState] = useState<NavigationState>({
    currentPath: [],
    selectedValues: new Map(),
    currentView: 'foundation'
  });


  // Get current node based on path
  const getCurrentNode = (): ChunkNode | null => {
    if (navState.currentPath.length === 0) return null;
    
    let current = navigationTree[navState.currentPath[0]];
    for (let i = 1; i < navState.currentPath.length; i++) {
      const child = current.children?.find(c => c.id === navState.currentPath[i]);
      if (!child) return null;
      current = child;
    }
    return current;
  };

  // Navigate to a chunk
  const navigateToChunk = (chunkId: string) => {
    if (navState.currentView === 'foundation') {
      setNavState({
        ...navState,
        currentPath: [chunkId],
        currentView: 'section'
      });
    } else {
      setNavState({
        ...navState,
        currentPath: [...navState.currentPath, chunkId]
      });
    }
  };

  // Navigate back
  const navigateBack = () => {
    if (navState.currentPath.length <= 1) {
      setNavState({
        ...navState,
        currentPath: [],
        currentView: 'foundation'
      });
    } else {
      setNavState({
        ...navState,
        currentPath: navState.currentPath.slice(0, -1)
      });
    }
  };

  // Select atomic value
  const selectValue = (path: string[], value: string) => {
    const newValues = new Map(navState.selectedValues);
    newValues.set(path.join('.'), value);
    setNavState({
      ...navState,
      selectedValues: newValues
    });
  };

  // Foundation sections
  const foundationSections = [
    { id: 'personas', label: 'Personas', icon: <Users className="w-8 h-8" />, color: 'blue' },
    { id: 'problems', label: 'Pain Points', icon: <Target className="w-8 h-8" />, color: 'red' },
    { id: 'solution', label: 'Solution', icon: <Lightbulb className="w-8 h-8" />, color: 'yellow' },
    { id: 'market', label: 'B2B/B2C', icon: <Building className="w-8 h-8" />, color: 'purple' },
    { id: 'metrics', label: 'Metrics', icon: <TrendingUp className="w-8 h-8" />, color: 'green' },
    { id: 'gtm', label: 'GTM', icon: <Rocket className="w-8 h-8" />, color: 'orange' }
  ];

  const currentNode = getCurrentNode();

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Navigation Board - Top Right */}
      <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-2 z-50">
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => setNavState({ ...navState, currentPath: [], currentView: 'foundation' })}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Home className="w-4 h-4" />
          </button>
          {navState.currentPath.map((segment, index) => (
            <React.Fragment key={segment}>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <button
                onClick={() => {
                  const newPath = navState.currentPath.slice(0, index + 1);
                  setNavState({ ...navState, currentPath: newPath });
                }}
                className="px-2 py-1 hover:bg-gray-100 rounded text-gray-700"
              >
                {segment}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pt-16">
        <AnimatePresence mode="wait">
          {navState.currentView === 'foundation' ? (
            // Foundation View
            <motion.div
              key="foundation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">PMF Navigator</h1>
              <p className="text-gray-600 mb-8">Navigate through your Product-Market Fit journey</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {foundationSections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigateToChunk(section.id)}
                    className={`p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow
                      border-2 border-transparent hover:border-${section.color}-200`}
                  >
                    <div className={`text-${section.color}-500 mb-3`}>
                      {section.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{section.label}</h3>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            // Chunk Navigation View
            <motion.div
              key="chunks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              {currentNode && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentNode.label}
                    </h2>
                    {currentNode.description && (
                      <p className="text-gray-600">{currentNode.description}</p>
                    )}
                  </div>

                  {/* Three Chunk Display */}
                  {currentNode.children && currentNode.children.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {currentNode.children.map((child) => (
                        <motion.div
                          key={child.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-white rounded-xl shadow-md p-6 cursor-pointer
                            hover:shadow-lg transition-shadow"
                          onClick={() => {
                            if (child.value) {
                              selectValue([...navState.currentPath, child.id], child.value);
                            } else {
                              navigateToChunk(child.id);
                            }
                          }}
                        >
                          {child.icon && (
                            <div className="text-blue-500 mb-3">{child.icon}</div>
                          )}
                          <h3 className="font-semibold text-gray-900 mb-1">{child.label}</h3>
                          {child.value && (
                            <p className="text-sm text-gray-500">Click to select</p>
                          )}
                          {navState.selectedValues.get([...navState.currentPath, child.id].join('.')) && (
                            <div className="mt-2 text-xs text-green-600 font-medium">
                              ✓ Selected
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    // Atomic Selection View
                    <div className="bg-white rounded-xl shadow-md p-8">
                      <h3 className="text-lg font-semibold mb-4">Select {currentNode.label}</h3>
                      <div className="space-y-2">
                        {/* This would show final selection options */}
                        <p className="text-gray-600">Final selection interface here</p>
                      </div>
                    </div>
                  )}

                  {/* Back Button */}
                  <button
                    onClick={navigateBack}
                    className="mt-8 px-6 py-2 text-gray-600 hover:text-gray-900
                      flex items-center space-x-2 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span>Back</span>
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary Panel - Shows selected values */}
      {navState.selectedValues.size > 0 && (
        <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Current Selections</h4>
          <div className="space-y-1 text-xs text-gray-600">
            {Array.from(navState.selectedValues.entries()).map(([path, value]) => (
              <div key={path}>
                {path}: <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}