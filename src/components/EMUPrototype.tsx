'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, ChevronRight, ChevronDown, Search, Lightbulb, TrendingUp, Award, Clock, FileText, BookOpen, ExternalLink, BarChart3, Download, Edit2 } from 'lucide-react';

const EMUPrototype = () => {
  // Product Setup State
  const [productDefined, setProductDefined] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: '',
    category: '',
    stage: '',
    description: '',
    targetProblem: ''
  });

  // Progress Tracking State
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [taskOutputs, setTaskOutputs] = useState<Record<string, string>>({});

  // EMU Phases with Jobs-to-be-Done
  const phases = [
    {
      id: 'foundation',
      name: 'Marketing Foundation & Research',
      icon: Search,
      color: 'from-purple-600 to-blue-600',
      description: 'Understand your market, customers, and competition',
      estimatedTime: '2-3 weeks',
      jobs: [
        {
          id: 'target-customer',
          title: 'Define Your Target Customer',
          description: 'Create detailed personas of your ideal early adopters',
          tasks: [
            { id: 'tc1', text: 'Identify 3 potential customer segments', required: true },
            { id: 'tc2', text: 'Create detailed personas for each segment', required: true },
            { id: 'tc3', text: 'Conduct 5 interviews per segment', required: true },
            { id: 'tc4', text: 'Document key pain points and goals', required: true },
            { id: 'tc5', text: 'Validate personas with real customers', required: false }
          ],
          definitionOfDone: {
            criteria: [
              '3 detailed personas documented',
              'Based on 15+ customer interviews',
              'Includes demographics, behaviors, goals, and pain points',
              'Validated by 3+ customers ("yes, that\'s me!")'
            ],
            deliverable: 'Customer Persona Deck'
          },
          resources: [
            { type: 'template', name: 'Persona Interview Guide' },
            { type: 'example', name: 'B2B SaaS Persona Example' },
            { type: 'tool', name: 'Persona Builder Canvas' }
          ]
        },
        {
          id: 'competition',
          title: 'Analyze the Competition',
          description: 'Map competitive landscape and find your positioning gap',
          tasks: [
            { id: 'c1', text: 'List 5-10 direct and indirect competitors', required: true },
            { id: 'c2', text: 'Create feature comparison matrix', required: true },
            { id: 'c3', text: 'Analyze competitor pricing strategies', required: true },
            { id: 'c4', text: 'Identify positioning gaps in the market', required: true },
            { id: 'c5', text: 'Document your unique advantages', required: true }
          ],
          definitionOfDone: {
            criteria: [
              'Competitive landscape map created',
              'Feature/pricing comparison table complete',
              '3+ differentiation points identified',
              'Positioning gap clearly defined'
            ],
            deliverable: 'Competitive Analysis Report'
          },
          resources: [
            { type: 'template', name: 'Competitive Analysis Matrix' },
            { type: 'guide', name: 'How to Find Positioning Gaps' },
            { type: 'example', name: 'SaaS Competitive Analysis' }
          ]
        },
        {
          id: 'problem-validation',
          title: 'Validate the Problem',
          description: 'Confirm the problem is worth solving',
          tasks: [
            { id: 'pv1', text: 'Create problem validation survey', required: true },
            { id: 'pv2', text: 'Collect 50+ survey responses', required: true },
            { id: 'pv3', text: 'Score problem severity (1-10 scale)', required: true },
            { id: 'pv4', text: 'Confirm willingness to pay for solution', required: true },
            { id: 'pv5', text: 'Calculate market size (TAM/SAM/SOM)', required: false }
          ],
          definitionOfDone: {
            criteria: [
              'Problem severity score ≥7/10',
              '40%+ say problem is "very painful"',
              '30%+ willing to pay for solution',
              'Market size justifies investment'
            ],
            deliverable: 'Problem Validation Report'
          },
          resources: [
            { type: 'template', name: 'Problem Validation Survey' },
            { type: 'calculator', name: 'Market Size Calculator' },
            { type: 'guide', name: 'TAM/SAM/SOM Explained' }
          ]
        }
      ]
    },
    {
      id: 'strategy',
      name: 'Strategy Development',
      icon: Lightbulb,
      color: 'from-blue-600 to-green-600',
      description: 'Define your positioning, messaging, and go-to-market approach',
      estimatedTime: '1-2 weeks',
      jobs: [
        {
          id: 'positioning',
          title: 'Create Positioning Strategy',
          description: 'Define how you\'ll be perceived in the market',
          tasks: [
            { id: 'p1', text: 'Write positioning statement', required: true },
            { id: 'p2', text: 'Define key differentiators', required: true },
            { id: 'p3', text: 'Create value proposition canvas', required: true },
            { id: 'p4', text: 'Test positioning with target customers', required: true }
          ],
          definitionOfDone: {
            criteria: [
              'Clear positioning statement written',
              '3 unique differentiators defined',
              'Value prop resonates with 70%+ of targets',
              'Clearly different from competitors'
            ],
            deliverable: 'Positioning Strategy Doc'
          },
          resources: [
            { type: 'template', name: 'Positioning Statement Template' },
            { type: 'canvas', name: 'Value Proposition Canvas' },
            { type: 'example', name: 'Great B2B Positioning Examples' }
          ]
        },
        {
          id: 'messaging',
          title: 'Develop Core Messaging',
          description: 'Create compelling messages that resonate',
          tasks: [
            { id: 'm1', text: 'Write elevator pitch (30 seconds)', required: true },
            { id: 'm2', text: 'Create messaging hierarchy', required: true },
            { id: 'm3', text: 'Develop proof points for each message', required: true },
            { id: 'm4', text: 'A/B test key messages', required: true }
          ],
          definitionOfDone: {
            criteria: [
              'Elevator pitch memorizable',
              '3-5 core messages defined',
              'Each message has 2+ proof points',
              'Best message has 40%+ engagement'
            ],
            deliverable: 'Messaging Framework'
          },
          resources: [
            { type: 'template', name: 'Messaging Hierarchy Template' },
            { type: 'guide', name: 'Writing Compelling B2B Messages' },
            { type: 'tool', name: 'Message Testing Framework' }
          ]
        },
        {
          id: 'pricing',
          title: 'Define Pricing Strategy',
          description: 'Set pricing that captures value and drives adoption',
          tasks: [
            { id: 'pr1', text: 'Research competitor pricing', required: true },
            { id: 'pr2', text: 'Calculate value-based pricing', required: true },
            { id: 'pr3', text: 'Design pricing tiers/packages', required: true },
            { id: 'pr4', text: 'Test pricing with target customers', required: true }
          ],
          definitionOfDone: {
            criteria: [
              'Pricing model defined',
              '3 tiers/packages created',
              'Price anchored to value delivered',
              '25%+ customers choose middle tier'
            ],
            deliverable: 'Pricing Strategy'
          },
          resources: [
            { type: 'calculator', name: 'SaaS Pricing Calculator' },
            { type: 'guide', name: 'Value-Based Pricing Guide' },
            { type: 'example', name: 'B2B SaaS Pricing Models' }
          ]
        }
      ]
    },
    {
      id: 'execution',
      name: 'Execution Planning',
      icon: TrendingUp,
      color: 'from-green-600 to-yellow-600',
      description: 'Plan your channels, campaigns, and resources',
      estimatedTime: '1-2 weeks',
      jobs: [
        {
          id: 'channels',
          title: 'Select Marketing Channels',
          description: 'Choose the right channels to reach your audience',
          tasks: [
            { id: 'ch1', text: 'Map where your customers spend time', required: true },
            { id: 'ch2', text: 'Prioritize channels by ROI potential', required: true },
            { id: 'ch3', text: 'Create channel-specific strategies', required: true },
            { id: 'ch4', text: 'Define success metrics per channel', required: true }
          ],
          definitionOfDone: {
            criteria: [
              '3-5 primary channels selected',
              'ROI model for each channel',
              'Channel strategies documented',
              'KPIs defined for each channel'
            ],
            deliverable: 'Channel Strategy Plan'
          },
          resources: [
            { type: 'framework', name: 'Channel Selection Matrix' },
            { type: 'calculator', name: 'Channel ROI Calculator' },
            { type: 'guide', name: 'B2B Marketing Channels Guide' }
          ]
        },
        {
          id: 'content',
          title: 'Plan Content Strategy',
          description: 'Create content that educates and converts',
          tasks: [
            { id: 'co1', text: 'Map content to buyer journey', required: true },
            { id: 'co2', text: 'Create editorial calendar', required: true },
            { id: 'co3', text: 'Define content types and formats', required: true },
            { id: 'co4', text: 'Plan distribution strategy', required: true }
          ],
          definitionOfDone: {
            criteria: [
              'Content mapped to each stage',
              '3-month editorial calendar',
              '5+ content pieces planned',
              'Distribution plan created'
            ],
            deliverable: 'Content Strategy'
          },
          resources: [
            { type: 'template', name: 'Editorial Calendar Template' },
            { type: 'guide', name: 'B2B Content Marketing Playbook' },
            { type: 'examples', name: 'High-Converting Content Examples' }
          ]
        }
      ]
    },
    {
      id: 'launch',
      name: 'Launch & Optimization',
      icon: Award,
      color: 'from-yellow-600 to-red-600',
      description: 'Execute your plan and optimize based on data',
      estimatedTime: 'Ongoing',
      jobs: [
        {
          id: 'launch-plan',
          title: 'Create Launch Plan',
          description: 'Orchestrate a successful market entry',
          tasks: [
            { id: 'l1', text: 'Define launch goals and success metrics', required: true },
            { id: 'l2', text: 'Create launch timeline and checklist', required: true },
            { id: 'l3', text: 'Prepare launch assets and materials', required: true },
            { id: 'l4', text: 'Plan launch communication strategy', required: true }
          ],
          definitionOfDone: {
            criteria: [
              'Launch goals quantified',
              'Complete launch checklist',
              'All assets ready to deploy',
              'Day 1-30 plan detailed'
            ],
            deliverable: 'Launch Playbook'
          },
          resources: [
            { type: 'checklist', name: 'Product Launch Checklist' },
            { type: 'template', name: 'Launch Communication Plan' },
            { type: 'timeline', name: '30-60-90 Day Template' }
          ]
        },
        {
          id: 'measure',
          title: 'Measure & Optimize',
          description: 'Track performance and iterate based on data',
          tasks: [
            { id: 'mo1', text: 'Set up analytics and tracking', required: true },
            { id: 'mo2', text: 'Create performance dashboards', required: true },
            { id: 'mo3', text: 'Run weekly optimization reviews', required: true },
            { id: 'mo4', text: 'Document learnings and iterate', required: true }
          ],
          definitionOfDone: {
            criteria: [
              'Analytics fully implemented',
              'Dashboard updating daily',
              'Weekly optimization rhythm',
              'Improving key metrics'
            ],
            deliverable: 'Performance Reports'
          },
          resources: [
            { type: 'dashboard', name: 'KPI Dashboard Template' },
            { type: 'framework', name: 'A/B Testing Framework' },
            { type: 'guide', name: 'Growth Metrics Guide' }
          ]
        }
      ]
    }
  ];

  const handleProductSubmit = () => {
    if (productInfo.name && productInfo.category && productInfo.stage && productInfo.description && productInfo.targetProblem) {
      setProductDefined(true);
      setEditingProduct(false);
    }
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getPhaseProgress = (phase: typeof phases[0]) => {
    const allTasks = phase.jobs.flatMap(job => job.tasks.map(t => t.id));
    const completedCount = allTasks.filter(taskId => completedTasks[taskId]).length;
    return Math.round((completedCount / allTasks.length) * 100);
  };

  const getJobProgress = (job: typeof phases[0]['jobs'][0]) => {
    const taskIds = job.tasks.map(t => t.id);
    const completedCount = taskIds.filter(taskId => completedTasks[taskId]).length;
    return Math.round((completedCount / taskIds.length) * 100);
  };

  const isJobComplete = (job: typeof phases[0]['jobs'][0]) => {
    const requiredTasks = job.tasks.filter(t => t.required);
    return requiredTasks.every(task => completedTasks[task.id]);
  };

  const getOverallProgress = () => {
    const allTasks = phases.flatMap(phase => 
      phase.jobs.flatMap(job => job.tasks.map(t => t.id))
    );
    const completedCount = allTasks.filter(taskId => completedTasks[taskId]).length;
    return Math.round((completedCount / allTasks.length) * 100);
  };

  // Product Setup Screen
  if (!productDefined || editingProduct) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-3xl font-bold">EMU - Evolving Marketing Understanding</h1>
              <p className="text-gray-400 mt-1">Your step-by-step guide to finding Product-Market Fit</p>
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
                placeholder="Enter your product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['B2B SaaS', 'B2C App', 'Marketplace', 'Developer Tool', 'E-commerce', 'Enterprise'].map((category) => (
                  <button
                    key={category}
                    type="button"
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

            {productInfo.category && (
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
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Product Description</label>
              <textarea
                value={productInfo.description}
                onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                rows={3}
                placeholder="Briefly describe what your product does"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Problem</label>
              <textarea
                value={productInfo.targetProblem}
                onChange={(e) => setProductInfo({ ...productInfo, targetProblem: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                rows={2}
                placeholder="What problem are you trying to solve?"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleProductSubmit}
                className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                Start EMU Journey
                <ChevronRight className="w-5 h-5" />
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={() => setEditingProduct(false)}
                  className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main EMU Dashboard
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
                <p className="text-sm text-gray-400">Overall Progress</p>
                <p className="text-2xl font-bold">{getOverallProgress()}%</p>
              </div>
              <button
                onClick={() => setEditingProduct(true)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Product Info */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold">{productInfo.name}</h2>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                  {productInfo.category}
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                  {productInfo.stage}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{productInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Phase Progress Timeline */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Your PMF Journey</h3>
          <div className="flex items-center justify-between">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      getPhaseProgress(phase) === 100
                        ? 'bg-green-600'
                        : getPhaseProgress(phase) > 0
                        ? `bg-gradient-to-br ${phase.color}`
                        : 'bg-gray-800'
                    }`}
                    onClick={() => {
                      setExpandedPhase(index);
                    }}
                  >
                    {getPhaseProgress(phase) === 100 ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <phase.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs mt-2 text-center max-w-[100px]">{phase.name}</span>
                  <span className="text-xs text-gray-500 mt-1">{getPhaseProgress(phase)}%</span>
                </div>
                {index < phases.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-800 mx-2">
                    <div
                      className="h-full bg-green-600 transition-all duration-500"
                      style={{ width: `${getPhaseProgress(phase)}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Phase Details */}
        <div className="space-y-4">
          {phases.map((phase, phaseIndex) => (
            <div
              key={phase.id}
              className={`bg-gray-900 rounded-lg border transition-all ${
                expandedPhase === phaseIndex ? 'border-purple-500' : 'border-gray-800'
              }`}
            >
              <button
                onClick={() => setExpandedPhase(expandedPhase === phaseIndex ? null : phaseIndex)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${phase.color}`}>
                    <phase.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">{phase.name}</h3>
                    <p className="text-sm text-gray-400">{phase.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {phase.estimatedTime}
                      </span>
                      <span className="text-xs text-gray-500">
                        {phase.jobs.length} Jobs to Complete
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold">{getPhaseProgress(phase)}%</p>
                    <p className="text-xs text-gray-500">Complete</p>
                  </div>
                  {expandedPhase === phaseIndex ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedPhase === phaseIndex && (
                <div className="border-t border-gray-800 p-6 space-y-4">
                  {phase.jobs.map((job) => (
                    <div key={job.id} className="bg-gray-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isJobComplete(job) ? 'bg-green-600' : 'bg-gray-700'
                          }`}>
                            {isJobComplete(job) ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-gray-400">{job.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400">{getJobProgress(job)}%</span>
                          {expandedJob === job.id ? (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {expandedJob === job.id && (
                        <div className="border-t border-gray-700 p-4 space-y-4">
                          {/* Tasks */}
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-gray-300 mb-2">Tasks to Complete:</h5>
                            {job.tasks.map((task) => (
                              <label
                                key={task.id}
                                className="flex items-start gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={completedTasks[task.id] || false}
                                  onChange={() => toggleTask(task.id)}
                                  className="mt-1"
                                />
                                <span className={`text-sm ${completedTasks[task.id] ? 'line-through text-gray-500' : ''}`}>
                                  {task.text}
                                  {task.required && <span className="text-red-400 ml-1">*</span>}
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* Definition of Done */}
                          <div className="bg-gray-900 rounded-lg p-4">
                            <h5 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Definition of Done
                            </h5>
                            <ul className="text-sm text-gray-400 space-y-1">
                              {job.definitionOfDone.criteria.map((criterion, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-green-400 mt-0.5">✓</span>
                                  {criterion}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3 pt-3 border-t border-gray-800">
                              <p className="text-sm">
                                <span className="text-gray-500">Deliverable:</span>{' '}
                                <span className="text-purple-400 font-medium">{job.definitionOfDone.deliverable}</span>
                              </p>
                            </div>
                          </div>

                          {/* Resources */}
                          <div className="bg-gray-900 rounded-lg p-4">
                            <h5 className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Resources & Templates
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {job.resources.map((resource, index) => (
                                <button
                                  key={index}
                                  className="flex items-center justify-between p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors text-sm"
                                >
                                  <span className="flex items-center gap-2">
                                    <FileText className="w-3 h-3 text-gray-400" />
                                    {resource.name}
                                  </span>
                                  <ExternalLink className="w-3 h-3 text-gray-400" />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Output Section */}
                          <div className="bg-gray-900 rounded-lg p-4">
                            <h5 className="text-sm font-medium text-yellow-400 mb-2">Your Output</h5>
                            <textarea
                              value={taskOutputs[job.id] || ''}
                              onChange={(e) => setTaskOutputs({ ...taskOutputs, [job.id]: e.target.value })}
                              placeholder="Document your findings and deliverables here..."
                              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-yellow-500 focus:outline-none"
                              rows={4}
                            />
                            <div className="flex gap-2 mt-2">
                              <button className="text-sm px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                                Save Draft
                              </button>
                              <button className="text-sm px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded transition-colors">
                                Mark as Complete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <button className="bg-purple-600 hover:bg-purple-700 p-4 rounded-full shadow-lg transition-all hover:scale-110 group">
            <Download className="w-5 h-5" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Export Progress
            </span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-full shadow-lg transition-all hover:scale-110 group">
            <BarChart3 className="w-5 h-5" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              View Analytics
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EMUPrototype;