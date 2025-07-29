'use client';

import React, { useState } from 'react';
import { Target, Sparkles, AlertCircle, CheckCircle2, GitBranch, TrendingDown, Brain, History } from 'lucide-react';

interface EMUDashboardV3Props {
  startView?: 'onboarding' | 'dashboard';
}

const EMUDashboardV3 = ({ startView = 'onboarding' }: EMUDashboardV3Props) => {
  // Navigation State
  const [view, setView] = useState<'onboarding' | 'dashboard' | 'foundation-detail' | 'pivot-wizard'>(startView); // 'onboarding', 'dashboard', 'foundation-detail', 'pivot-wizard'
  
  // Product State
  const [productInfo, setProductInfo] = useState({
    name: '',
    category: '',
    stage: '',
    description: '',
    targetProblem: ''
  });

  // Foundation Versioning System
  const [currentFoundationVersion, setCurrentFoundationVersion] = useState(1);
  const [foundationHistory, setFoundationHistory] = useState<Array<{
    version: number;
    created: Date;
    status: 'active' | 'pivoted' | 'archived';
    pivotReason?: string;
    confidence: number;
    data: {
      painPoints: PainPointItem[];
      audiences: AudienceItem[];
      solutions: SolutionItem[];
      whyItMatters: typeof whyItMatters;
    };
  }>>([]);

  // Pivot System State
  const [pivotWizardStep, setPivotWizardStep] = useState(0);
  const [pivotData, setPivotData] = useState({
    reason: '',
    keepElements: [] as string[],
    changeElements: [] as string[],
    newInsights: ''
  });

  // Foundation State with Confidence Scoring
  const [, setFoundationStatus] = useState('pending'); // 'pending', 'extracting', 'validating', 'locked', 'uncertain'
  const [foundationConfidence, setFoundationConfidence] = useState({
    overall: 0,
    painPoints: 0,
    audiences: 0,
    solutions: 0,
    whyItMatters: 0
  });
  
  // Learning Trail
  const [learnings, setLearnings] = useState<Array<{
    id: string;
    phase: string;
    insight: string;
    impact: 'low' | 'medium' | 'high';
    date: Date;
    triggeredPivot?: boolean;
  }>>([]);

  type PainPointItem = {
    id: string;
    pain: string;
    severity: number;
    description: string;
    isLocked: boolean;
    isEditing: boolean;
    isGenerating: boolean;
    confidence: number;
    validatedBy?: string[];
    challengedBy?: string[];
  };

  type AudienceItem = {
    id: string;
    segment: string;
    description: string;
    characteristics: string[];
    isLocked: boolean;
    isEditing: boolean;
    isGenerating: boolean;
    confidence: number;
    validatedBy?: string[];
    challengedBy?: string[];
  };

  type SolutionItem = {
    id: string;
    solution: string;
    problems: string[];
    isLocked: boolean;
    isEditing: boolean;
    isGenerating: boolean;
    confidence: number;
    validatedBy?: string[];
    challengedBy?: string[];
  };

  const [painPoints, setPainPoints] = useState<PainPointItem[]>([]);
  const [audiences, setAudiences] = useState<AudienceItem[]>([]);
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [whyItMatters, setWhyItMatters] = useState({
    content: '',
    isLocked: false,
    isEditing: false,
    isGenerating: false,
    confidence: 0,
    validatedBy: [] as string[],
    challengedBy: [] as string[]
  });



  // Foundation extraction logic
  const extractFoundation = async () => {
    setFoundationStatus('extracting');
    setView('dashboard');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extraction with confidence scores
    const newPainPoints = [
      {
        id: '1',
        pain: "Lack of structured marketing process",
        severity: 8,
        description: "Founders waste 10-15 hours weekly on scattered marketing efforts",
        isLocked: false,
        isEditing: false,
        isGenerating: false,
        confidence: 0.7,
        validatedBy: ['Product description analysis'],
        challengedBy: []
      },
      {
        id: '2',
        pain: "No framework for decision making",
        severity: 7,
        description: "Teams make random marketing choices without data",
        isLocked: false,
        isEditing: false,
        isGenerating: false,
        confidence: 0.6,
        validatedBy: ['Industry context'],
        challengedBy: []
      },
      {
        id: '3',
        pain: "Missing critical elements",
        severity: 9,
        description: "Companies launch without proper positioning or strategy",
        isLocked: false,
        isEditing: false,
        isGenerating: false,
        confidence: 0.8,
        validatedBy: ['Target problem description'],
        challengedBy: []
      }
    ];

    setPainPoints(newPainPoints);

    setAudiences([
      {
        id: '1',
        segment: "Non-marketing founders",
        description: "Technical founders at B2B SaaS startups",
        characteristics: ["1-20 employees", "No marketing hire", "$0-2M ARR"],
        isLocked: false,
        isEditing: false,
        isGenerating: false,
        confidence: 0.65,
        validatedBy: ['Category selection: B2B SaaS'],
        challengedBy: []
      },
      {
        id: '2',
        segment: "Junior marketers",
        description: "First marketing hires lacking senior guidance",
        characteristics: ["0-3 years experience", "Multiple responsibilities", "Need structure"],
        isLocked: false,
        isEditing: false,
        isGenerating: false,
        confidence: 0.5,
        validatedBy: [],
        challengedBy: []
      }
    ]);

    setSolutions([
      {
        id: '1',
        solution: "Hiring consultants",
        problems: ["Expensive ($10-30k)", "Knowledge doesn't transfer", "Not scalable"],
        isLocked: false,
        isEditing: false,
        isGenerating: false,
        confidence: 0.75,
        validatedBy: ['Market research'],
        challengedBy: []
      },
      {
        id: '2',
        solution: "Generic templates",
        problems: ["Not customized", "No guidance", "Still requires expertise"],
        isLocked: false,
        isEditing: false,
        isGenerating: false,
        confidence: 0.6,
        validatedBy: [],
        challengedBy: []
      }
    ]);

    setWhyItMatters({
      content: "73% of startups fail to achieve PMF due to poor marketing. The average startup wastes $75k and 6 months on ineffective marketing. EMU reduces this to $5k and 6 weeks.",
      isLocked: false,
      isEditing: false,
      isGenerating: false,
      confidence: 0.4,
      validatedBy: [],
      challengedBy: ['Needs market validation']
    });

    // Calculate overall confidence
    const overallConfidence = (0.7 + 0.65 + 0.75 + 0.4) / 4;
    setFoundationConfidence({
      overall: overallConfidence,
      painPoints: 0.7,
      audiences: 0.65,
      solutions: 0.75,
      whyItMatters: 0.4
    });
    
    setFoundationStatus('validating');
    
    // Create initial foundation version
    setFoundationHistory([{
      version: 1,
      created: new Date(),
      status: 'active',
      confidence: overallConfidence,
      data: {
        painPoints: newPainPoints,
        audiences: audiences,
        solutions: solutions,
        whyItMatters: whyItMatters
      }
    }]);
  };

  // Pivot System Functions
  const triggerPivot = (reason: string) => {
    setPivotData(prev => ({ ...prev, reason }));
    setView('pivot-wizard');
    setPivotWizardStep(0);
  };

  const addLearning = (insight: string, impact: 'low' | 'medium' | 'high', phase: string) => {
    const newLearning = {
      id: Date.now().toString(),
      phase,
      insight,
      impact,
      date: new Date(),
      triggeredPivot: impact === 'high'
    };
    
    setLearnings(prev => [...prev, newLearning]);
    
    // High impact learnings suggest a pivot
    if (impact === 'high') {
      setFoundationStatus('uncertain');
    }
  };

  const executePivot = () => {
    // Archive current version
    setFoundationHistory(prev => prev.map(f => 
      f.version === currentFoundationVersion 
        ? { ...f, status: 'pivoted' as const, pivotReason: pivotData.reason }
        : f
    ));

    // Create new version
    const newVersion = currentFoundationVersion + 1;
    setCurrentFoundationVersion(newVersion);
    
    // Reset confidence for changed elements
    if (pivotData.changeElements.includes('painPoints')) {
      setPainPoints(prev => prev.map(p => ({ ...p, confidence: 0.3 })));
    }
    if (pivotData.changeElements.includes('audiences')) {
      setAudiences(prev => prev.map(a => ({ ...a, confidence: 0.3 })));
    }
    if (pivotData.changeElements.includes('solutions')) {
      setSolutions(prev => prev.map(s => ({ ...s, confidence: 0.3 })));
    }
    if (pivotData.changeElements.includes('whyItMatters')) {
      setWhyItMatters(prev => ({ ...prev, confidence: 0.3 }));
    }

    // Add new foundation version
    setFoundationHistory(prev => [...prev, {
      version: newVersion,
      created: new Date(),
      status: 'active',
      confidence: 0.3, // Start low after pivot
      data: {
        painPoints,
        audiences,
        solutions,
        whyItMatters
      }
    }]);

    // Add pivot learning
    addLearning(`Pivoted: ${pivotData.reason}`, 'high', 'Foundation');
    
    setFoundationStatus('validating');
    setView('foundation-detail');
    
    // Reset pivot state
    setPivotData({ reason: '', keepElements: [], changeElements: [], newInsights: '' });
    setPivotWizardStep(0);
  };



  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return 'text-green-400';
    if (confidence >= 0.4) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.7) return CheckCircle2;
    if (confidence >= 0.4) return AlertCircle;
    return TrendingDown;
  };

  // Pivot Wizard Component
  if (view === 'pivot-wizard') {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-8">
            <GitBranch className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-3xl font-bold">Foundation Pivot</h1>
              <p className="text-gray-400 mt-1">Update your foundation based on new learnings</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            {/* Step Progress */}
            <div className="flex items-center mb-6">
              {[0, 1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= pivotWizardStep ? 'bg-purple-600' : 'bg-gray-700'
                  }`}>
                    {step + 1}
                  </div>
                  {step < 3 && <div className={`w-16 h-1 ${
                    step < pivotWizardStep ? 'bg-purple-600' : 'bg-gray-700'
                  }`} />}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {pivotWizardStep === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">What triggered this pivot?</h2>
                <div className="space-y-2">
                  {[
                    "Customer interviews revealed different problem",
                    "Solution isn&apos;t technically feasible", 
                    "Market has changed significantly",
                    "Found better opportunity",
                    "Competitive landscape shifted",
                    "User feedback contradicts assumptions"
                  ].map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setPivotData({ ...pivotData, reason })}
                      className={`w-full p-3 text-left rounded-lg border transition-all ${
                        pivotData.reason === reason
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setPivotWizardStep(1)}
                    disabled={!pivotData.reason}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {pivotWizardStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">What do you want to keep?</h2>
                <p className="text-gray-400">Select the foundation elements that are still valid:</p>
                <div className="space-y-3">
                  {[
                    { id: 'painPoints', label: 'Pain Points', confidence: foundationConfidence.painPoints },
                    { id: 'audiences', label: 'Target Audiences', confidence: foundationConfidence.audiences },
                    { id: 'solutions', label: 'Current Solutions', confidence: foundationConfidence.solutions },
                    { id: 'whyItMatters', label: 'Why It Matters', confidence: foundationConfidence.whyItMatters }
                  ].map((element) => (
                    <label key={element.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pivotData.keepElements.includes(element.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPivotData({
                              ...pivotData,
                              keepElements: [...pivotData.keepElements, element.id],
                              changeElements: pivotData.changeElements.filter(ce => ce !== element.id)
                            });
                          } else {
                            setPivotData({
                              ...pivotData,
                              keepElements: pivotData.keepElements.filter(ke => ke !== element.id),
                              changeElements: [...pivotData.changeElements, element.id]
                            });
                          }
                        }}
                      />
                      <div className="flex-1">
                        <span className="font-medium">{element.label}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-sm ${getConfidenceColor(element.confidence)}`}>
                            {Math.round(element.confidence * 100)}% confidence
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setPivotWizardStep(0)}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setPivotWizardStep(2)}
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {pivotWizardStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Share your new insights</h2>
                <p className="text-gray-400">What did you learn that&apos;s driving this pivot?</p>
                <textarea
                  value={pivotData.newInsights}
                  onChange={(e) => setPivotData({ ...pivotData, newInsights: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                  rows={4}
                  placeholder="e.g., Customer interviews revealed they don&apos;t want another tool - they want guidance and coaching instead..."
                />
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setPivotWizardStep(1)}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setPivotWizardStep(3)}
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Review Impact
                  </button>
                </div>
              </div>
            )}

            {pivotWizardStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Impact Analysis</h2>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-medium text-green-400 mb-2">Keeping ({pivotData.keepElements.length})</h3>
                      <ul className="text-sm space-y-1">
                        {pivotData.keepElements.map(element => (
                          <li key={element} className="text-green-300">✓ {element.replace(/([A-Z])/g, ' $1').toLowerCase()}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-yellow-400 mb-2">Changing ({pivotData.changeElements.length})</h3>
                      <ul className="text-sm space-y-1">
                        {pivotData.changeElements.map(element => (
                          <li key={element} className="text-yellow-300">⚠ {element.replace(/([A-Z])/g, ' $1').toLowerCase()}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {pivotData.newInsights && (
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-medium mb-2">New Insights:</h4>
                      <p className="text-sm text-gray-300">{pivotData.newInsights}</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <p className="text-sm text-yellow-300">
                      This will create Foundation v{currentFoundationVersion + 1} and reset confidence scores for changed elements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setPivotWizardStep(2)}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setView('foundation-detail')}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executePivot}
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Execute Pivot
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Onboarding Screen
  if (view === 'onboarding') {
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

  // Foundation Detail View would go here - simplified for length
  // Main Dashboard View would go here - simplified for length

  // For now, return a simple placeholder to show the concept
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-3xl font-bold">EMU Dashboard V3</h1>
              <p className="text-gray-400 mt-1">Adaptive Foundation with Pivot Protocol</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Foundation v{currentFoundationVersion}</span>
            <button
              onClick={() => triggerPivot('Testing pivot system')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4" />
              Test Pivot
            </button>
          </div>
        </div>

        {/* Foundation Health */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <h2 className="text-xl font-semibold mb-4">Foundation Health</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Pain Points', confidence: foundationConfidence.painPoints },
              { label: 'Audiences', confidence: foundationConfidence.audiences },
              { label: 'Solutions', confidence: foundationConfidence.solutions },
              { label: 'Why It Matters', confidence: foundationConfidence.whyItMatters }
            ].map((item) => {
              const ConfidenceIcon = getConfidenceIcon(item.confidence);
              return (
                <div key={item.label} className="text-center">
                  <ConfidenceIcon className={`w-8 h-8 mx-auto mb-2 ${getConfidenceColor(item.confidence)}`} />
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className={`text-xs ${getConfidenceColor(item.confidence)}`}>
                    {Math.round(item.confidence * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Overall Confidence</span>
              <span className={`font-bold ${getConfidenceColor(foundationConfidence.overall)}`}>
                {Math.round(foundationConfidence.overall * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Learning Trail */}
        {learnings.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Learning Trail
            </h2>
            <div className="space-y-3">
              {learnings.slice(-3).map((learning) => (
                <div key={learning.id} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    learning.impact === 'high' ? 'bg-red-400' :
                    learning.impact === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{learning.phase}</span>
                      {learning.triggeredPivot && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">Pivot Trigger</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{learning.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Foundation History */}
        {foundationHistory.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <History className="w-5 h-5" />
              Foundation Evolution
            </h2>
            <div className="space-y-3">
              {foundationHistory.map((version) => (
                <div key={version.version} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    version.status === 'active' ? 'bg-green-600' :
                    version.status === 'pivoted' ? 'bg-yellow-600' : 'bg-gray-600'
                  }`}>
                    v{version.version}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Foundation v{version.version}</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        version.status === 'active' ? 'bg-green-500/20 text-green-300' :
                        version.status === 'pivoted' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {version.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {version.created.toLocaleDateString()} • {Math.round(version.confidence * 100)}% confidence
                      {version.pivotReason && ` • ${version.pivotReason}`}
                    </div>
                  </div>
                  {version.status === 'active' && (
                    <button
                      onClick={() => triggerPivot('Manual pivot request')}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
                    >
                      Pivot
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMUDashboardV3;