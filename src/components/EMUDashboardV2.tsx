'use client';

import React, { useState } from 'react';
import { Target, Sparkles, RefreshCw, Edit2, Lock, Unlock, AlertCircle, CheckCircle2, Loader2, ChevronRight, Search, Lightbulb, TrendingUp, Award, Zap, Plus, Trash2, Save, X } from 'lucide-react';

const EMUDashboardV2 = () => {
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
  
  type PainPointItem = {
    id: string;
    pain: string;
    severity: number;
    description: string;
    isLocked: boolean;
    isEditing: boolean;
    isGenerating: boolean;
  };

  type AudienceItem = {
    id: string;
    segment: string;
    description: string;
    characteristics: string[];
    isLocked: boolean;
    isEditing: boolean;
    isGenerating: boolean;
  };

  type SolutionItem = {
    id: string;
    solution: string;
    problems: string[];
    isLocked: boolean;
    isEditing: boolean;
    isGenerating: boolean;
  };

  const [painPoints, setPainPoints] = useState<PainPointItem[]>([]);
  const [audiences, setAudiences] = useState<AudienceItem[]>([]);
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [whyItMatters, setWhyItMatters] = useState({
    content: '',
    isLocked: false,
    isEditing: false,
    isGenerating: false
  });

  // Editing states for individual items
  const [editingPainPoint, setEditingPainPoint] = useState<{ id: string; pain: string; severity: number; description: string } | null>(null);
  const [editingAudience, setEditingAudience] = useState<{ id: string; segment: string; description: string; characteristics: string } | null>(null);
  const [editingSolution, setEditingSolution] = useState<{ id: string; solution: string; problems: string } | null>(null);

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
    
    // Mock extraction with individual items
    setPainPoints([
      {
        id: '1',
        pain: "Lack of structured marketing process",
        severity: 8,
        description: "Founders waste 10-15 hours weekly on scattered marketing efforts",
        isLocked: false,
        isEditing: false,
        isGenerating: false
      },
      {
        id: '2',
        pain: "No framework for decision making",
        severity: 7,
        description: "Teams make random marketing choices without data",
        isLocked: false,
        isEditing: false,
        isGenerating: false
      },
      {
        id: '3',
        pain: "Missing critical elements",
        severity: 9,
        description: "Companies launch without proper positioning or strategy",
        isLocked: false,
        isEditing: false,
        isGenerating: false
      }
    ]);

    setAudiences([
      {
        id: '1',
        segment: "Non-marketing founders",
        description: "Technical founders at B2B SaaS startups",
        characteristics: ["1-20 employees", "No marketing hire", "$0-2M ARR"],
        isLocked: false,
        isEditing: false,
        isGenerating: false
      },
      {
        id: '2',
        segment: "Junior marketers",
        description: "First marketing hires lacking senior guidance",
        characteristics: ["0-3 years experience", "Multiple responsibilities", "Need structure"],
        isLocked: false,
        isEditing: false,
        isGenerating: false
      }
    ]);

    setSolutions([
      {
        id: '1',
        solution: "Hiring consultants",
        problems: ["Expensive ($10-30k)", "Knowledge doesn't transfer", "Not scalable"],
        isLocked: false,
        isEditing: false,
        isGenerating: false
      },
      {
        id: '2',
        solution: "Generic templates",
        problems: ["Not customized", "No guidance", "Still requires expertise"],
        isLocked: false,
        isEditing: false,
        isGenerating: false
      }
    ]);

    setWhyItMatters({
      content: "73% of startups fail to achieve PMF due to poor marketing. The average startup wastes $75k and 6 months on ineffective marketing. EMU reduces this to $5k and 6 weeks.",
      isLocked: false,
      isEditing: false,
      isGenerating: false
    });
    
    setFoundationStatus('validating');
  };

  // Helper functions
  const getFoundationProgress = () => {
    if (foundationStatus === 'locked') return 100;
    if (foundationStatus === 'validating') {
      const totalItems = painPoints.length + audiences.length + solutions.length + 1; // +1 for whyItMatters
      const lockedItems = painPoints.filter(p => p.isLocked).length + 
                         audiences.filter(a => a.isLocked).length + 
                         solutions.filter(s => s.isLocked).length + 
                         (whyItMatters.isLocked ? 1 : 0);
      return Math.round((lockedItems / totalItems) * 100);
    }
    return 0;
  };

  const getPhaseProgress = (phase: typeof phases[0]) => {
    if (phase.isFoundation) return getFoundationProgress();
    if (foundationStatus !== 'locked') return 0;
    return 0; // Simplified for demo
  };

  const allFoundationLocked = () => {
    return painPoints.every(p => p.isLocked) && 
           audiences.every(a => a.isLocked) && 
           solutions.every(s => s.isLocked) && 
           whyItMatters.isLocked;
  };

  const lockAllFoundation = () => {
    setPainPoints(prev => prev.map(p => ({ ...p, isLocked: true })));
    setAudiences(prev => prev.map(a => ({ ...a, isLocked: true })));
    setSolutions(prev => prev.map(s => ({ ...s, isLocked: true })));
    setWhyItMatters(prev => ({ ...prev, isLocked: true }));
    setFoundationStatus('locked');
  };

  // Individual item functions
  const regeneratePainPoint = async (id: string) => {
    setPainPoints(prev => prev.map(p => 
      p.id === id ? { ...p, isGenerating: true } : p
    ));

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock new content
    const alternatives = [
      { pain: "Marketing expertise gap", severity: 9, description: "Can't afford senior marketers ($150k+/year)" },
      { pain: "Overwhelming tool landscape", severity: 8, description: "100+ marketing tools, no clear winners" },
      { pain: "No proven playbooks", severity: 7, description: "Every startup reinvents the wheel" }
    ];
    
    const newContent = alternatives[Math.floor(Math.random() * alternatives.length)];
    
    setPainPoints(prev => prev.map(p => 
      p.id === id ? { ...p, ...newContent, isGenerating: false } : p
    ));
  };

  const deletePainPoint = (id: string) => {
    setPainPoints(prev => prev.filter(p => p.id !== id));
  };

  const addPainPoint = () => {
    const newId = Date.now().toString();
    setPainPoints(prev => [...prev, {
      id: newId,
      pain: "New pain point",
      severity: 5,
      description: "Describe the pain point here",
      isLocked: false,
      isEditing: false,
      isGenerating: false
    }]);
  };

  const savePainPointEdit = () => {
    if (!editingPainPoint) return;
    
    setPainPoints(prev => prev.map(p => 
      p.id === editingPainPoint.id 
        ? { ...p, ...editingPainPoint, isEditing: false }
        : p
    ));
    setEditingPainPoint(null);
  };

  // Similar functions for audiences and solutions...
  const regenerateAudience = async (id: string) => {
    setAudiences(prev => prev.map(a => 
      a.id === id ? { ...a, isGenerating: true } : a
    ));

    await new Promise(resolve => setTimeout(resolve, 1000));

    const alternatives = [
      { 
        segment: "Bootstrapped founders", 
        description: "Solo founders building without funding",
        characteristics: ["<$10k MRR", "Doing everything alone", "Need automation"]
      },
      { 
        segment: "Growth-stage startups", 
        description: "Post-PMF companies scaling up",
        characteristics: ["$100k-1M MRR", "5-20 employees", "Ready to invest"]
      }
    ];
    
    const newContent = alternatives[Math.floor(Math.random() * alternatives.length)];
    
    setAudiences(prev => prev.map(a => 
      a.id === id ? { ...a, ...newContent, isGenerating: false } : a
    ));
  };

  const deleteAudience = (id: string) => {
    setAudiences(prev => prev.filter(a => a.id !== id));
  };

  const addAudience = () => {
    const newId = Date.now().toString();
    setAudiences(prev => [...prev, {
      id: newId,
      segment: "New audience segment",
      description: "Describe this segment",
      characteristics: ["Characteristic 1", "Characteristic 2"],
      isLocked: false,
      isEditing: false,
      isGenerating: false
    }]);
  };

  // Solution functions
  const regenerateSolution = async (id: string) => {
    setSolutions(prev => prev.map(s => 
      s.id === id ? { ...s, isGenerating: true } : s
    ));

    await new Promise(resolve => setTimeout(resolve, 1000));

    const alternatives = [
      { 
        solution: "Marketing courses", 
        problems: ["Too theoretical", "Time consuming", "Not actionable"]
      },
      { 
        solution: "Fractional CMOs", 
        problems: ["Still expensive ($5-10k/mo)", "Part-time availability", "May not fit culture"]
      },
      { 
        solution: "DIY with blogs/YouTube", 
        problems: ["Information overload", "Conflicting advice", "No clear path"]
      }
    ];
    
    const newContent = alternatives[Math.floor(Math.random() * alternatives.length)];
    
    setSolutions(prev => prev.map(s => 
      s.id === id ? { ...s, ...newContent, isGenerating: false } : s
    ));
  };

  const deleteSolution = (id: string) => {
    setSolutions(prev => prev.filter(s => s.id !== id));
  };

  const saveSolutionEdit = () => {
    if (!editingSolution) return;
    
    setSolutions(prev => prev.map(s => 
      s.id === editingSolution.id 
        ? { ...s, solution: editingSolution.solution, problems: editingSolution.problems.split(',').map(p => p.trim()), isEditing: false }
        : s
    ));
    setEditingSolution(null);
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
          <div className="bg-gray-900 rounded-lg border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Specific Pain Points</h2>
                <button
                  onClick={addPainPoint}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {painPoints.map((pain) => (
                  <div key={pain.id} className={`bg-gray-800 rounded-lg p-4 ${pain.isLocked ? 'border border-green-600' : ''}`}>
                    {pain.isEditing && editingPainPoint?.id === pain.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingPainPoint.pain}
                          onChange={(e) => setEditingPainPoint({ ...editingPainPoint, pain: e.target.value })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                          placeholder="Pain point title"
                        />
                        <textarea
                          value={editingPainPoint.description}
                          onChange={(e) => setEditingPainPoint({ ...editingPainPoint, description: e.target.value })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                          rows={2}
                          placeholder="Description"
                        />
                        <div className="flex items-center gap-2">
                          <label>Severity:</label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={editingPainPoint.severity}
                            onChange={(e) => setEditingPainPoint({ ...editingPainPoint, severity: parseInt(e.target.value) })}
                            className="w-16 p-2 bg-gray-700 border border-gray-600 rounded"
                          />
                          <button onClick={savePainPointEdit} className="ml-auto px-3 py-1 bg-purple-600 rounded text-sm">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={() => { setPainPoints(prev => prev.map(p => p.id === pain.id ? { ...p, isEditing: false } : p)); setEditingPainPoint(null); }} className="px-3 py-1 bg-gray-700 rounded text-sm">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <div className="flex-1">
                            {pain.isGenerating ? (
                              <div className="flex items-center gap-2 text-gray-400">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Regenerating...
                              </div>
                            ) : (
                              <>
                                <h3 className="font-medium">{pain.pain}</h3>
                                <p className="text-sm text-gray-400 mt-1">{pain.description}</p>
                              </>
                            )}
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="text-2xl font-bold text-red-400">{pain.severity}/10</div>
                            {!pain.isLocked && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => regeneratePainPoint(pain.id)}
                                  className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                                  disabled={pain.isGenerating}
                                >
                                  <RefreshCw className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingPainPoint({ ...pain });
                                    setPainPoints(prev => prev.map(p => p.id === pain.id ? { ...p, isEditing: true } : p));
                                  }}
                                  className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => deletePainPoint(pain.id)}
                                  className="p-1.5 hover:bg-gray-700 rounded transition-colors text-red-400"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                            <button
                              onClick={() => setPainPoints(prev => prev.map(p => p.id === pain.id ? { ...p, isLocked: !p.isLocked } : p))}
                              className={`p-1.5 rounded transition-colors ${pain.isLocked ? 'bg-green-600' : 'hover:bg-gray-700'}`}
                            >
                              {pain.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="bg-gray-900 rounded-lg border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Who Faces This Problem</h2>
                <button
                  onClick={addAudience}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {audiences.map((audience) => (
                  <div key={audience.id} className={`bg-gray-800 rounded-lg p-4 ${audience.isLocked ? 'border border-green-600' : ''}`}>
                    {audience.isGenerating ? (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Regenerating...
                      </div>
                    ) : audience.isEditing && editingAudience?.id === audience.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingAudience.segment}
                          onChange={(e) => setEditingAudience({ ...editingAudience, segment: e.target.value })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                          placeholder="Segment name"
                        />
                        <textarea
                          value={editingAudience.description}
                          onChange={(e) => setEditingAudience({ ...editingAudience, description: e.target.value })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                          rows={2}
                          placeholder="Description"
                        />
                        <textarea
                          value={editingAudience.characteristics}
                          onChange={(e) => setEditingAudience({ ...editingAudience, characteristics: e.target.value })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                          rows={2}
                          placeholder="Characteristics (comma-separated)"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setAudiences(prev => prev.map(a => 
                                a.id === audience.id 
                                  ? { ...a, ...editingAudience, characteristics: editingAudience.characteristics.split(',').map(c => c.trim()), isEditing: false }
                                  : a
                              ));
                              setEditingAudience(null);
                            }}
                            className="px-3 py-1 bg-purple-600 rounded text-sm"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setAudiences(prev => prev.map(a => a.id === audience.id ? { ...a, isEditing: false } : a));
                              setEditingAudience(null);
                            }}
                            className="px-3 py-1 bg-gray-700 rounded text-sm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <div className="flex-1">
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
                        <div className="flex items-start gap-1 ml-4">
                          {!audience.isLocked && (
                            <>
                              <button
                                onClick={() => regenerateAudience(audience.id)}
                                className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                                disabled={audience.isGenerating}
                              >
                                <RefreshCw className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingAudience({ ...audience, characteristics: audience.characteristics.join(', ') });
                                  setAudiences(prev => prev.map(a => a.id === audience.id ? { ...a, isEditing: true } : a));
                                }}
                                className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => deleteAudience(audience.id)}
                                className="p-1.5 hover:bg-gray-700 rounded transition-colors text-red-400"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setAudiences(prev => prev.map(a => a.id === audience.id ? { ...a, isLocked: !a.isLocked } : a))}
                            className={`p-1.5 rounded transition-colors ${audience.isLocked ? 'bg-green-600' : 'hover:bg-gray-700'}`}
                          >
                            {audience.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Solutions */}
          <div className="bg-gray-900 rounded-lg border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Current Solutions</h2>
                <button
                  onClick={() => {
                    const newId = Date.now().toString();
                    setSolutions(prev => [...prev, {
                      id: newId,
                      solution: "New solution",
                      problems: ["Problem 1", "Problem 2"],
                      isLocked: false,
                      isEditing: false,
                      isGenerating: false
                    }]);
                  }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {solutions.map((solution) => (
                  <div key={solution.id} className={`bg-gray-800 rounded-lg p-4 ${solution.isLocked ? 'border border-green-600' : ''}`}>
                    {solution.isEditing && editingSolution?.id === solution.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingSolution.solution}
                          onChange={(e) => setEditingSolution({ ...editingSolution, solution: e.target.value })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                          placeholder="Solution name"
                        />
                        <textarea
                          value={editingSolution.problems}
                          onChange={(e) => setEditingSolution({ ...editingSolution, problems: e.target.value })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                          rows={3}
                          placeholder="Problems (comma-separated)"
                        />
                        <div className="flex gap-2">
                          <button onClick={saveSolutionEdit} className="px-3 py-1 bg-purple-600 rounded text-sm">
                            <Save className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setSolutions(prev => prev.map(s => s.id === solution.id ? { ...s, isEditing: false } : s));
                              setEditingSolution(null);
                            }}
                            className="px-3 py-1 bg-gray-700 rounded text-sm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <div className="flex-1">
                          {solution.isGenerating ? (
                            <div className="flex items-center gap-2 text-gray-400">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Regenerating...
                            </div>
                          ) : (
                            <>
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
                            </>
                          )}
                        </div>
                        <div className="flex items-start gap-1 ml-4">
                          {!solution.isLocked && (
                            <>
                              <button
                                onClick={() => regenerateSolution(solution.id)}
                                className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                                disabled={solution.isGenerating}
                              >
                                <RefreshCw className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingSolution({ ...solution, problems: solution.problems.join(', ') });
                                  setSolutions(prev => prev.map(s => s.id === solution.id ? { ...s, isEditing: true } : s));
                                }}
                                className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => deleteSolution(solution.id)}
                                className="p-1.5 hover:bg-gray-700 rounded transition-colors text-red-400"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setSolutions(prev => prev.map(s => s.id === solution.id ? { ...s, isLocked: !s.isLocked } : s))}
                            className={`p-1.5 rounded transition-colors ${solution.isLocked ? 'bg-green-600' : 'hover:bg-gray-700'}`}
                          >
                            {solution.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <div className={`bg-gray-900 rounded-lg border ${whyItMatters.isLocked ? 'border-green-600' : 'border-gray-800'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Why It Matters</h2>
                <div className="flex items-center gap-2">
                  {!whyItMatters.isLocked && (
                    <>
                      <button 
                        onClick={async () => {
                          setWhyItMatters(prev => ({ ...prev, isGenerating: true }));
                          await new Promise(resolve => setTimeout(resolve, 1000));
                          setWhyItMatters(prev => ({ 
                            ...prev, 
                            content: "Early-stage startups have 6 months to find PMF. Marketing mistakes burn 40% of that time.",
                            isGenerating: false 
                          }));
                        }} 
                        className="p-2 hover:bg-gray-800 rounded-lg"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setWhyItMatters(prev => ({ ...prev, isEditing: !prev.isEditing }))} 
                        className="p-2 hover:bg-gray-800 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setWhyItMatters(prev => ({ ...prev, isLocked: !prev.isLocked }))}
                    className={`p-2 rounded-lg ${whyItMatters.isLocked ? 'bg-green-600' : 'hover:bg-gray-800'}`}
                  >
                    {whyItMatters.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                {whyItMatters.isGenerating ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Regenerating...
                  </div>
                ) : whyItMatters.isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={whyItMatters.content}
                      onChange={(e) => setWhyItMatters(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setWhyItMatters(prev => ({ ...prev, isEditing: false }))}
                        className="px-4 py-2 bg-purple-600 rounded-lg text-sm"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setWhyItMatters(prev => ({ ...prev, isEditing: false }))}
                        className="px-4 py-2 bg-gray-700 rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-300 leading-relaxed">{whyItMatters.content}</p>
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
                        <span className="text-gray-400">Pain Points ({painPoints.length})</span>
                        {painPoints.every(p => p.isLocked) ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-yellow-500">{painPoints.filter(p => p.isLocked).length}/{painPoints.length} locked</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Target Audience ({audiences.length})</span>
                        {audiences.every(a => a.isLocked) ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-yellow-500">{audiences.filter(a => a.isLocked).length}/{audiences.length} locked</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Current Solutions ({solutions.length})</span>
                        {solutions.every(s => s.isLocked) ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-yellow-500">{solutions.filter(s => s.isLocked).length}/{solutions.length} locked</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Why It Matters</span>
                        {whyItMatters.isLocked ? (
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

export default EMUDashboardV2;