'use client';

import React, { useState } from 'react';
import { Target, Sparkles, RefreshCw, Edit2, Lock, Unlock, AlertCircle, CheckCircle2, Loader2, ChevronRight, Search, Lightbulb, TrendingUp, Award, Zap } from 'lucide-react';

const EMUDashboard = () => {
  // Navigation State
  const [view, setView] = useState('onboarding'); // 'onboarding', 'dashboard', 'foundation-detail'
  
  // Product State
  const [productInfo, setProductInfo] = useState({
    name: '',
    category: '',
    stage: '',
    description: '',
    targetProblem: ''
  });

  // Foundation State
  const [foundationStatus, setFoundationStatus] = useState('pending'); // 'pending', 'extracting', 'validating', 'locked'
  
  type PainPoint = { pain: string; severity: number; description: string };
  type Audience = { segment: string; description: string; characteristics: string[] };
  type Solution = { solution: string; problems: string[] };
  
  const [extractedData, setExtractedData] = useState<{
    painPoints: {
      content: string | PainPoint[];
      isLocked: boolean;
      isEditing: boolean;
      editContent: string;
    };
    targetAudience: {
      content: string | Audience[];
      isLocked: boolean;
      isEditing: boolean;
      editContent: string;
    };
    currentSolutions: {
      content: string | Solution[];
      isLocked: boolean;
      isEditing: boolean;
      editContent: string;
    };
    whyItMatters: {
      content: string;
      isLocked: boolean;
      isEditing: boolean;
      editContent: string;
    };
  }>({
    painPoints: {
      content: [] as PainPoint[],
      isLocked: false,
      isEditing: false,
      editContent: ''
    },
    targetAudience: {
      content: [] as Audience[],
      isLocked: false,
      isEditing: false,
      editContent: ''
    },
    currentSolutions: {
      content: [] as Solution[],
      isLocked: false,
      isEditing: false,
      editContent: ''
    },
    whyItMatters: {
      content: '',
      isLocked: false,
      isEditing: false,
      editContent: ''
    }
  });


  // EMU Phases (locked until foundation is complete)
  const phases = [
    {
      id: 'foundation',
      name: 'Foundation',
      icon: Zap,
      color: 'from-purple-600 to-pink-600',
      description: 'Extract and validate core problem elements',
      estimatedTime: '30 minutes',
      isFoundation: true
    },
    {
      id: 'research',
      name: 'Market Research',
      icon: Search,
      color: 'from-blue-600 to-cyan-600',
      description: 'Understand your market, customers, and competition',
      estimatedTime: '2-3 weeks',
      jobs: [
        {
          id: 'target-customer',
          title: 'Define Your Target Customer',
          tasks: ['Interview 15 customers', 'Create 3 personas', 'Validate with real users']
        },
        {
          id: 'competition',
          title: 'Analyze Competition',
          tasks: ['Map 10 competitors', 'Identify positioning gaps', 'Define differentiation']
        }
      ]
    },
    {
      id: 'strategy',
      name: 'Strategy Development',
      icon: Lightbulb,
      color: 'from-green-600 to-emerald-600',
      description: 'Define positioning and messaging',
      estimatedTime: '1-2 weeks',
      jobs: [
        {
          id: 'positioning',
          title: 'Create Positioning',
          tasks: ['Write positioning statement', 'Test with customers', 'Refine based on feedback']
        }
      ]
    },
    {
      id: 'execution',
      name: 'Execution Planning',
      icon: TrendingUp,
      color: 'from-yellow-600 to-orange-600',
      description: 'Plan channels and campaigns',
      estimatedTime: '1-2 weeks',
      jobs: [
        {
          id: 'channels',
          title: 'Select Channels',
          tasks: ['Evaluate channel fit', 'Create channel strategy', 'Define success metrics']
        }
      ]
    },
    {
      id: 'launch',
      name: 'Launch & Optimize',
      icon: Award,
      color: 'from-red-600 to-pink-600',
      description: 'Execute and iterate',
      estimatedTime: 'Ongoing',
      jobs: [
        {
          id: 'launch-plan',
          title: 'Launch Strategy',
          tasks: ['Create launch timeline', 'Prepare assets', 'Execute launch']
        }
      ]
    }
  ];

  // Foundation extraction logic
  const extractFoundation = async () => {
    setFoundationStatus('extracting');
    setView('dashboard');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockExtraction = {
      painPoints: {
        content: [
          {
            pain: "Lack of structured marketing process",
            severity: 8,
            description: "Founders waste 10-15 hours weekly on scattered marketing efforts"
          },
          {
            pain: "No framework for decision making",
            severity: 7,
            description: "Teams make random marketing choices without data"
          },
          {
            pain: "Missing critical elements",
            severity: 9,
            description: "Companies launch without proper positioning or strategy"
          }
        ],
        isLocked: false,
        isEditing: false,
        editContent: ''
      },
      targetAudience: {
        content: [
          {
            segment: "Non-marketing founders",
            description: "Technical founders at B2B SaaS startups",
            characteristics: ["1-20 employees", "No marketing hire", "$0-2M ARR"]
          },
          {
            segment: "Junior marketers",
            description: "First marketing hires lacking senior guidance",
            characteristics: ["0-3 years experience", "Multiple responsibilities", "Need structure"]
          }
        ],
        isLocked: false,
        isEditing: false,
        editContent: ''
      },
      currentSolutions: {
        content: [
          {
            solution: "Hiring consultants",
            problems: ["Expensive ($10-30k)", "Knowledge doesn't transfer", "Not scalable"]
          },
          {
            solution: "Generic templates",
            problems: ["Not customized", "No guidance", "Still requires expertise"]
          }
        ],
        isLocked: false,
        isEditing: false,
        editContent: ''
      },
      whyItMatters: {
        content: "73% of startups fail to achieve PMF due to poor marketing. The average startup wastes $75k and 6 months on ineffective marketing. EMU reduces this to $5k and 6 weeks.",
        isLocked: false,
        isEditing: false,
        editContent: ''
      }
    };
    
    setExtractedData(mockExtraction);
    setFoundationStatus('validating');
  };

  // Helper functions
  const getFoundationProgress = () => {
    if (foundationStatus === 'locked') return 100;
    if (foundationStatus === 'validating') {
      const locked = Object.values(extractedData).filter(section => section.isLocked).length;
      return Math.round((locked / 4) * 100);
    }
    return 0;
  };

  const getPhaseProgress = (phase: typeof phases[0]) => {
    if (phase.isFoundation) return getFoundationProgress();
    if (foundationStatus !== 'locked') return 0;
    // Calculate based on completed tasks
    return 0; // Simplified for demo
  };

  const allFoundationLocked = () => {
    return Object.values(extractedData).every(section => section.isLocked);
  };

  const lockAllFoundation = () => {
    setExtractedData(prev => ({
      painPoints: { ...prev.painPoints, isLocked: true },
      targetAudience: { ...prev.targetAudience, isLocked: true },
      currentSolutions: { ...prev.currentSolutions, isLocked: true },
      whyItMatters: { ...prev.whyItMatters, isLocked: true }
    }));
    setFoundationStatus('locked');
  };

  // Re-roll section
  const rerollSection = async (section: keyof typeof extractedData) => {
    if (extractedData[section].isLocked) return;
    
    setExtractedData(prev => ({
      ...prev,
      [section]: { ...prev[section], content: '...generating...' }
    }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock new content
    type ContentType = typeof extractedData[keyof typeof extractedData]['content'];
    const newContent: Record<string, ContentType> = {
      painPoints: [{
        pain: "Marketing expertise gap",
        severity: 9,
        description: "Can't afford senior marketers ($150k+/year)"
      }],
      targetAudience: [{
        segment: "Bootstrapped founders",
        description: "Solo founders building without funding",
        characteristics: ["<$10k MRR", "Doing everything alone"]
      }],
      currentSolutions: [{
        solution: "Marketing courses",
        problems: ["Too theoretical", "Time consuming", "Not actionable"]
      }],
      whyItMatters: "Early-stage startups have 6 months to find PMF. Marketing mistakes burn 40% of that time."
    };
    
    setExtractedData(prev => ({
      ...prev,
      [section]: { ...prev[section], content: newContent[section] || prev[section].content }
    }));
  };

  // Toggle functions
  const toggleEdit = (section: keyof typeof extractedData) => {
    if (extractedData[section].isLocked) return;
    
    const isCurrentlyEditing = extractedData[section].isEditing;
    
    setExtractedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        isEditing: !isCurrentlyEditing,
        editContent: !isCurrentlyEditing 
          ? JSON.stringify(prev[section].content, null, 2)
          : prev[section].editContent
      }
    }));
  };

  const saveEdit = (section: keyof typeof extractedData) => {
    try {
      const parsed = JSON.parse(extractedData[section].editContent);
      setExtractedData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          content: parsed,
          isEditing: false,
          editContent: ''
        }
      }));
    } catch {
      alert('Invalid JSON format');
    }
  };

  const toggleLock = (section: keyof typeof extractedData) => {
    setExtractedData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        isLocked: !prev[section].isLocked,
        isEditing: false
      }
    }));
    
    // Check if all locked
    setTimeout(() => {
      if (allFoundationLocked()) {
        setFoundationStatus('locked');
      }
    }, 100);
  };

  // Onboarding Screen
  if (view === 'onboarding') {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-3xl font-bold">EMU - Evolving Marketing Understanding</h1>
              <p className="text-gray-400 mt-1">AI-powered PMF validation for non-marketers</p>
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
              onClick={extractFoundation}
              disabled={!productInfo.name || !productInfo.category || !productInfo.stage}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Start EMU Journey
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Foundation Detail View (Zoomed In)
  if (view === 'foundation-detail') {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setView('dashboard')}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <div>
                  <h1 className="text-xl font-bold">Foundation Validation</h1>
                  <p className="text-sm text-gray-400">Review and refine the extracted elements</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Progress</p>
                  <p className="text-2xl font-bold">{getFoundationProgress()}%</p>
                </div>
                {allFoundationLocked() && (
                  <button
                    onClick={() => setView('dashboard')}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
          {/* Pain Points */}
          <div className={`bg-gray-900 rounded-lg border ${extractedData.painPoints.isLocked ? 'border-green-600' : 'border-gray-800'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Specific Pain Points</h2>
                <div className="flex items-center gap-2">
                  {!extractedData.painPoints.isLocked && !extractedData.painPoints.isEditing && (
                    <>
                      <button onClick={() => rerollSection('painPoints')} className="p-2 hover:bg-gray-800 rounded-lg">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleEdit('painPoints')} className="p-2 hover:bg-gray-800 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => toggleLock('painPoints')}
                    className={`p-2 rounded-lg ${extractedData.painPoints.isLocked ? 'bg-green-600' : 'hover:bg-gray-800'}`}
                  >
                    {extractedData.painPoints.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {extractedData.painPoints.isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={extractedData.painPoints.editContent}
                    onChange={(e) => setExtractedData(prev => ({
                      ...prev,
                      painPoints: { ...prev.painPoints, editContent: e.target.value }
                    }))}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm"
                    rows={10}
                  />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit('painPoints')} className="px-4 py-2 bg-purple-600 rounded-lg">
                      Save
                    </button>
                    <button onClick={() => setExtractedData(prev => ({
                      ...prev,
                      painPoints: { ...prev.painPoints, isEditing: false }
                    }))} className="px-4 py-2 bg-gray-700 rounded-lg">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {typeof extractedData.painPoints.content === 'string' ? (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Regenerating...
                    </div>
                  ) : (
                    (extractedData.painPoints.content as PainPoint[]).map((pain, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{pain.pain}</h3>
                            <p className="text-sm text-gray-400 mt-1">{pain.description}</p>
                          </div>
                          <div className="text-2xl font-bold text-red-400">{pain.severity}/10</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Target Audience */}
          <div className={`bg-gray-900 rounded-lg border ${extractedData.targetAudience.isLocked ? 'border-green-600' : 'border-gray-800'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Who Faces This Problem</h2>
                <div className="flex items-center gap-2">
                  {!extractedData.targetAudience.isLocked && (
                    <>
                      <button onClick={() => rerollSection('targetAudience')} className="p-2 hover:bg-gray-800 rounded-lg">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleEdit('targetAudience')} className="p-2 hover:bg-gray-800 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => toggleLock('targetAudience')}
                    className={`p-2 rounded-lg ${extractedData.targetAudience.isLocked ? 'bg-green-600' : 'hover:bg-gray-800'}`}
                  >
                    {extractedData.targetAudience.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {typeof extractedData.targetAudience.content === 'string' ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Regenerating...
                  </div>
                ) : (
                  (extractedData.targetAudience.content as Audience[]).map((audience, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <h3 className="font-medium text-purple-400">{audience.segment}</h3>
                      <p className="text-sm text-gray-300 mt-1">{audience.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {audience.characteristics.map((char, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs">
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Current Solutions */}
          <div className={`bg-gray-900 rounded-lg border ${extractedData.currentSolutions.isLocked ? 'border-green-600' : 'border-gray-800'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Current Solutions</h2>
                <div className="flex items-center gap-2">
                  {!extractedData.currentSolutions.isLocked && (
                    <>
                      <button onClick={() => rerollSection('currentSolutions')} className="p-2 hover:bg-gray-800 rounded-lg">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleEdit('currentSolutions')} className="p-2 hover:bg-gray-800 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => toggleLock('currentSolutions')}
                    className={`p-2 rounded-lg ${extractedData.currentSolutions.isLocked ? 'bg-green-600' : 'hover:bg-gray-800'}`}
                  >
                    {extractedData.currentSolutions.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {typeof extractedData.currentSolutions.content === 'string' ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Regenerating...
                  </div>
                ) : (
                  (extractedData.currentSolutions.content as Solution[]).map((solution, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <h3 className="font-medium text-yellow-400">{solution.solution}</h3>
                      <p className="text-xs text-gray-500 mt-2 mb-1">Problems:</p>
                      <ul className="space-y-1">
                        {solution.problems.map((problem, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span>
                            {problem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <div className={`bg-gray-900 rounded-lg border ${extractedData.whyItMatters.isLocked ? 'border-green-600' : 'border-gray-800'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Why It Matters</h2>
                <div className="flex items-center gap-2">
                  {!extractedData.whyItMatters.isLocked && (
                    <>
                      <button onClick={() => rerollSection('whyItMatters')} className="p-2 hover:bg-gray-800 rounded-lg">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleEdit('whyItMatters')} className="p-2 hover:bg-gray-800 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => toggleLock('whyItMatters')}
                    className={`p-2 rounded-lg ${extractedData.whyItMatters.isLocked ? 'bg-green-600' : 'hover:bg-gray-800'}`}
                  >
                    {extractedData.whyItMatters.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                {typeof extractedData.whyItMatters.content === 'string' && extractedData.whyItMatters.content === '...generating...' ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Regenerating...
                  </div>
                ) : (
                  <p className="text-gray-300 leading-relaxed">{extractedData.whyItMatters.content}</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {!allFoundationLocked() && (
            <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-300">Lock all sections to continue</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Make sure you&apos;re satisfied with each section before locking. This foundation will guide your entire PMF journey.
                  </p>
                </div>
                <button
                  onClick={lockAllFoundation}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm transition-colors"
                >
                  Lock All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main Dashboard View (Zoomed Out)
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Target className="w-6 h-6 text-purple-500" />
              <div>
                <h1 className="text-xl font-bold">EMU</h1>
                <p className="text-xs text-gray-400">Evolving Marketing Understanding</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-400">Product</p>
                <p className="font-medium">{productInfo.name}</p>
              </div>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your PMF Journey</h2>
            <div className="text-2xl font-bold">
              {foundationStatus === 'locked' ? '20%' : `${Math.round(getFoundationProgress() / 5)}%`}
            </div>
          </div>
          <div className="space-y-3">
            {phases.map((phase) => (
              <div key={phase.id} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    getPhaseProgress(phase) === 100
                      ? 'bg-green-600'
                      : getPhaseProgress(phase) > 0
                      ? `bg-gradient-to-br ${phase.color}`
                      : 'bg-gray-800'
                  }`}
                >
                  {getPhaseProgress(phase) === 100 ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <phase.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{phase.name}</span>
                    <span className="text-sm text-gray-500">{getPhaseProgress(phase)}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full mt-1">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        phase.isFoundation && foundationStatus === 'extracting'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse'
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${getPhaseProgress(phase)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Foundation Phase Card */}
        <div className={`bg-gray-900 rounded-lg border mb-4 ${
          foundationStatus === 'validating' ? 'border-purple-500' : 
          foundationStatus === 'locked' ? 'border-green-600' : 'border-gray-800'
        }`}>
          <button
            onClick={() => foundationStatus === 'validating' && setView('foundation-detail')}
            className={`w-full p-6 text-left ${
              foundationStatus === 'validating' ? 'hover:bg-gray-800/50 cursor-pointer' : ''
            } transition-colors`}
            disabled={foundationStatus !== 'validating'}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600`}>
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Foundation</h3>
                  <p className="text-sm text-gray-400 mt-1">Extract and validate core problem elements</p>
                  
                  {foundationStatus === 'extracting' && (
                    <div className="flex items-center gap-2 mt-3 text-purple-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Analyzing your inputs with AI...</span>
                    </div>
                  )}
                  
                  {foundationStatus === 'validating' && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Pain Points</span>
                        {extractedData.painPoints.isLocked ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-yellow-500">Needs review</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Target Audience</span>
                        {extractedData.targetAudience.isLocked ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-yellow-500">Needs review</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Current Solutions</span>
                        {extractedData.currentSolutions.isLocked ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-yellow-500">Needs review</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Why It Matters</span>
                        {extractedData.whyItMatters.isLocked ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-yellow-500">Needs review</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {foundationStatus === 'locked' && (
                    <div className="mt-4 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-green-300">Foundation validated and locked</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {foundationStatus === 'validating' && (
                  <>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{getFoundationProgress()}%</p>
                      <p className="text-xs text-gray-500">Complete</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </>
                )}
                {foundationStatus === 'locked' && (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Other Phases (Locked until foundation complete) */}
        {phases.slice(1).map((phase) => (
          <div
            key={phase.id}
            className={`bg-gray-900 rounded-lg border mb-4 ${
              foundationStatus !== 'locked' ? 'opacity-50' : 'border-gray-800'
            }`}
          >
            <button
              className="w-full p-6 text-left"
              disabled={foundationStatus !== 'locked'}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    foundationStatus !== 'locked' 
                      ? 'bg-gray-800' 
                      : `bg-gradient-to-br ${phase.color}`
                  }`}>
                    <phase.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{phase.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{phase.description}</p>
                    {foundationStatus !== 'locked' && (
                      <div className="flex items-center gap-2 mt-2">
                        <Lock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Unlock by completing Foundation</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">{phase.estimatedTime}</span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EMUDashboard;