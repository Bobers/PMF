'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2, ChevronRight, ArrowLeft, Shuffle, Save, Edit2, Trash2, CheckSquare, BarChart3, Lightbulb, Search, UserCheck, ThumbsUp, Repeat } from 'lucide-react';

interface ProductInfo {
  name: string;
  category: string;
  stage: string;
  description: string;
  targetProblem: string;
}

interface SlotState {
  problem: string;
  solution: string;
  customer: string;
  metric: string;
}

interface ValidationResult {
  status: string;
  timestamp: string;
  configuration: SlotState;
}

interface ValidationResults {
  problemValidation: ValidationResult | null;
  solutionValidation: ValidationResult | null;
  customerValidation: ValidationResult | null;
  valueValidation: ValidationResult | null;
}

interface ValidationData {
  id: number;
  timestamp: string;
  product: ProductInfo;
  slots: SlotState;
  results: ValidationResults;
  phase: string;
}

const PMFValidator = () => {
  // STATE MANAGEMENT
  const [productDefined, setProductDefined] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: '',
    category: '',
    stage: '',
    description: '',
    targetProblem: ''
  });

  // PMF Validation States
  const [currentPhase, setCurrentPhase] = useState(0);
  const [validationResults, setValidationResults] = useState<ValidationResults>({
    problemValidation: null,
    solutionValidation: null,
    customerValidation: null,
    valueValidation: null
  });
  
  // Slot machine states for PMF dimensions
  const [slots, setSlots] = useState({
    problem: 'Job to be Done',
    solution: 'MVP Feature',
    customer: 'Early Adopter',
    metric: 'Engagement Signal'
  });
  
  const [isSpinning, setIsSpinning] = useState({
    problem: false,
    solution: false,
    customer: false,
    metric: false
  });

  const [savedValidations, setSavedValidations] = useState<ValidationData[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  // PMF Validation Phases
  const phases = [
    { name: 'Problem Discovery', icon: Search, color: 'from-red-600 to-orange-600' },
    { name: 'Solution Hypothesis', icon: Lightbulb, color: 'from-orange-600 to-yellow-600' },
    { name: 'Customer Validation', icon: UserCheck, color: 'from-yellow-600 to-green-600' },
    { name: 'Value Confirmation', icon: ThumbsUp, color: 'from-green-600 to-emerald-600' }
  ];

  // PMF Slot Variations
  const slotVariations = {
    problem: {
      'B2B SaaS': ['Job to be Done', 'Process Inefficiency', 'Missing Capability', 'Integration Pain', 'Compliance Need', 'Cost Reduction'],
      'B2C App': ['Daily Frustration', 'Unmet Need', 'Time Waster', 'Social Problem', 'Entertainment Gap', 'Convenience Issue'],
      'Marketplace': ['Supply-Demand Gap', 'Trust Issue', 'Discovery Problem', 'Transaction Friction', 'Quality Variance', 'Pricing Opacity'],
      'Developer Tool': ['Workflow Bottleneck', 'Learning Curve', 'Integration Hell', 'Performance Issue', 'Documentation Gap', 'Debugging Pain'],
      'E-commerce': ['Shopping Friction', 'Selection Problem', 'Trust Barrier', 'Delivery Issue', 'Return Hassle', 'Price Discovery']
    },
    solution: {
      'B2B SaaS': ['MVP Feature', 'Automation', 'Dashboard', 'API Integration', 'Workflow Tool', 'Analytics'],
      'B2C App': ['Core Loop', 'Social Feature', 'Gamification', 'Personalization', 'Content Feed', 'Notification'],
      'Marketplace': ['Matching Algorithm', 'Review System', 'Payment Flow', 'Search & Filter', 'Messaging', 'Escrow'],
      'Developer Tool': ['CLI Tool', 'IDE Plugin', 'API Endpoint', 'Documentation', 'Starter Kit', 'Monitoring'],
      'E-commerce': ['Product Discovery', 'Checkout Flow', 'Recommendation', 'Reviews', 'Wishlist', 'Comparison']
    },
    customer: {
      'B2B SaaS': ['Early Adopter', 'Tech Startup', 'SMB Owner', 'Enterprise IT', 'Department Head', 'Power User'],
      'B2C App': ['Gen Z User', 'Millennial Pro', 'Parent', 'Student', 'Hobbyist', 'Influencer'],
      'Marketplace': ['Side Hustler', 'Small Merchant', 'Bargain Hunter', 'Quality Seeker', 'Bulk Buyer', 'Niche Collector'],
      'Developer Tool': ['Indie Hacker', 'Startup CTO', 'Open Source Dev', 'Enterprise Dev', 'Student Dev', 'DevOps Engineer'],
      'E-commerce': ['Impulse Buyer', 'Research Shopper', 'Brand Loyalist', 'Deal Hunter', 'Gift Giver', 'Subscription Fan']
    },
    metric: {
      'B2B SaaS': ['Daily Active Use', 'Feature Adoption', 'Retention Rate', 'Expansion Revenue', 'Support Tickets', 'Time to Value'],
      'B2C App': ['Engagement Signal', 'Session Length', 'Return Rate', 'Viral Coefficient', 'User Generated Content', 'Completion Rate'],
      'Marketplace': ['Transaction Volume', 'Repeat Purchase', 'Cross-Platform', 'Listing Quality', 'Match Rate', 'Review Score'],
      'Developer Tool': ['GitHub Stars', 'Weekly Downloads', 'Pull Requests', 'Documentation Views', 'Community Posts', 'Integration Count'],
      'E-commerce': ['Conversion Rate', 'Cart Value', 'Return Customer', 'Browse to Buy', 'Review Rate', 'Referral Rate']
    }
  } as const;

  const handleProductSubmit = () => {
    if (productInfo.name && productInfo.category && productInfo.stage && productInfo.description && productInfo.targetProblem) {
      setProductDefined(true);
      setEditingProduct(false);
      // Initialize slots based on category
      const category = productInfo.category as keyof typeof slotVariations.problem;
      setSlots({
        problem: slotVariations.problem[category]?.[0] || 'Job to be Done',
        solution: slotVariations.solution[category]?.[0] || 'MVP Feature',
        customer: slotVariations.customer[category]?.[0] || 'Early Adopter',
        metric: slotVariations.metric[category]?.[0] || 'Engagement Signal'
      });
    }
  };

  const spinSlot = (slotType: keyof typeof slots) => {
    const category = productInfo.category as keyof typeof slotVariations.problem;
    const variations = slotVariations[slotType][category] || slotVariations[slotType]['B2B SaaS'];
    
    setIsSpinning({ ...isSpinning, [slotType]: true });
    
    let count = 0;
    const interval = setInterval(() => {
      setSlots(prev => ({
        ...prev,
        [slotType]: variations[Math.floor(Math.random() * variations.length)]
      }));
      count++;
      if (count > 10) {
        clearInterval(interval);
        setIsSpinning({ ...isSpinning, [slotType]: false });
      }
    }, 100);
  };

  const spinAll = () => {
    Object.keys(slots).forEach(slotType => spinSlot(slotType as keyof typeof slots));
  };

  const validatePhase = (phase: number) => {
    const validationTypes = ['problemValidation', 'solutionValidation', 'customerValidation', 'valueValidation'] as const;
    setValidationResults(prev => ({
      ...prev,
      [validationTypes[phase]]: {
        status: 'validated',
        timestamp: new Date().toISOString(),
        configuration: { ...slots }
      }
    }));
  };

  const saveValidation = () => {
    const newValidation = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      product: productInfo,
      slots: { ...slots },
      results: { ...validationResults },
      phase: phases[currentPhase].name
    };
    setSavedValidations([...savedValidations, newValidation]);
    setShowSummary(true);
  };

  const loadValidation = (validation: ValidationData) => {
    setSlots(validation.slots);
    setValidationResults(validation.results);
    setCurrentPhase(phases.findIndex(p => p.name === validation.phase) || 0);
    setShowSummary(false);
  };

  const deleteValidation = (id: number) => {
    setSavedValidations(savedValidations.filter(v => v.id !== id));
  };

  // Product Onboarding Page
  if (!productDefined || editingProduct) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold">Product-Market Fit Validator</h1>
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
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(slotVariations.problem).map((category) => (
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
                  required
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
                required
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
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleProductSubmit}
                className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start PMF Validation
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

  // PMF Validation Builder Page
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold">PMF Validation Lab</h1>
          </div>
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            {showSummary ? 'Hide' : 'Show'} Summary
          </button>
        </div>

        {/* Product Info Card */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold">{productInfo.name}</h2>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                  {productInfo.category}
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                  {productInfo.stage}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{productInfo.description}</p>
              <p className="text-gray-500 text-sm">
                <span className="font-medium">Target Problem:</span> {productInfo.targetProblem}
              </p>
            </div>
            <button
              onClick={() => setEditingProduct(true)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Validation Phase Timeline */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Validation Journey</h3>
          <div className="flex items-center justify-between">
            {phases.map((phase, index) => (
              <div key={index} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      index === currentPhase
                        ? `bg-gradient-to-br ${phase.color} shadow-lg`
                        : index < currentPhase
                        ? 'bg-green-600'
                        : 'bg-gray-800'
                    }`}
                  >
                    {index < currentPhase ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <phase.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs mt-2 text-center">{phase.name}</span>
                  {validationResults[Object.keys(validationResults)[index] as keyof typeof validationResults] && (
                    <span className="text-xs text-green-400 mt-1">✓ Validated</span>
                  )}
                </div>
                {index < phases.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-800 mx-2">
                    <div
                      className={`h-full transition-all duration-500 ${
                        index < currentPhase ? 'bg-green-600' : 'bg-transparent'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PMF Slot Machine */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">PMF Hypothesis Generator</h3>
            <button
              onClick={spinAll}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              Spin All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Problem Slot */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-red-400">Problem</span>
                <button
                  onClick={() => spinSlot('problem')}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  disabled={isSpinning.problem}
                >
                  <Repeat className={`w-4 h-4 ${isSpinning.problem ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="h-20 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-700">
                <span className={`text-center px-2 transition-all ${isSpinning.problem ? 'blur-sm' : ''}`}>
                  {slots.problem}
                </span>
              </div>
            </div>

            {/* Solution Slot */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-yellow-400">Solution</span>
                <button
                  onClick={() => spinSlot('solution')}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  disabled={isSpinning.solution}
                >
                  <Repeat className={`w-4 h-4 ${isSpinning.solution ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="h-20 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-700">
                <span className={`text-center px-2 transition-all ${isSpinning.solution ? 'blur-sm' : ''}`}>
                  {slots.solution}
                </span>
              </div>
            </div>

            {/* Customer Slot */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-green-400">Customer</span>
                <button
                  onClick={() => spinSlot('customer')}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  disabled={isSpinning.customer}
                >
                  <Repeat className={`w-4 h-4 ${isSpinning.customer ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="h-20 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-700">
                <span className={`text-center px-2 transition-all ${isSpinning.customer ? 'blur-sm' : ''}`}>
                  {slots.customer}
                </span>
              </div>
            </div>

            {/* Metric Slot */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-blue-400">Success Metric</span>
                <button
                  onClick={() => spinSlot('metric')}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  disabled={isSpinning.metric}
                >
                  <Repeat className={`w-4 h-4 ${isSpinning.metric ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="h-20 flex items-center justify-center bg-gray-900 rounded-lg border border-gray-700">
                <span className={`text-center px-2 transition-all ${isSpinning.metric ? 'blur-sm' : ''}`}>
                  {slots.metric}
                </span>
              </div>
            </div>
          </div>

          {/* Validation Actions */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => validatePhase(currentPhase)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                <CheckSquare className="w-4 h-4" />
                Validate {phases[currentPhase].name}
              </button>
              {currentPhase < phases.length - 1 && (
                <button
                  onClick={() => setCurrentPhase(currentPhase + 1)}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                >
                  Next Phase
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={saveValidation}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Hypothesis
            </button>
          </div>
        </div>

        {/* Current Hypothesis Summary */}
        {!showSummary && (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Current PMF Hypothesis</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">
                For <span className="text-green-400 font-medium">{slots.customer}</span> who experience{' '}
                <span className="text-red-400 font-medium">{slots.problem.toLowerCase()}</span>,{' '}
                {productInfo.name} provides <span className="text-yellow-400 font-medium">{slots.solution.toLowerCase()}</span>{' '}
                that will be validated by measuring <span className="text-blue-400 font-medium">{slots.metric.toLowerCase()}</span>.
              </p>
              
              {currentPhase === 0 && (
                <div className="mt-4 p-4 bg-red-950/30 border border-red-800 rounded-lg">
                  <h4 className="font-medium mb-2 text-red-300">Problem Validation Questions:</h4>
                  <ul className="text-sm space-y-1 text-gray-400">
                    <li>• How many potential customers face this {slots.problem.toLowerCase()}?</li>
                    <li>• How painful is this problem on a scale of 1-10?</li>
                    <li>• What are they currently doing to solve it?</li>
                    <li>• How much time/money do they waste on this problem?</li>
                  </ul>
                </div>
              )}
              
              {currentPhase === 1 && (
                <div className="mt-4 p-4 bg-yellow-950/30 border border-yellow-800 rounded-lg">
                  <h4 className="font-medium mb-2 text-yellow-300">Solution Validation Questions:</h4>
                  <ul className="text-sm space-y-1 text-gray-400">
                    <li>• Does {slots.solution.toLowerCase()} directly address the problem?</li>
                    <li>• Can we build an MVP of this in 4-8 weeks?</li>
                    <li>• What&apos;s the minimum feature set needed to test this?</li>
                    <li>• How is this 10x better than current solutions?</li>
                  </ul>
                </div>
              )}
              
              {currentPhase === 2 && (
                <div className="mt-4 p-4 bg-green-950/30 border border-green-800 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-300">Customer Validation Questions:</h4>
                  <ul className="text-sm space-y-1 text-gray-400">
                    <li>• Where do {slots.customer} hang out online/offline?</li>
                    <li>• What&apos;s their willingness to try new solutions?</li>
                    <li>• Can we get 10 of them to test our MVP this week?</li>
                    <li>• What would make them recommend this to others?</li>
                  </ul>
                </div>
              )}
              
              {currentPhase === 3 && (
                <div className="mt-4 p-4 bg-blue-950/30 border border-blue-800 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-300">Value Confirmation Questions:</h4>
                  <ul className="text-sm space-y-1 text-gray-400">
                    <li>• What {slots.metric.toLowerCase()} threshold indicates PMF?</li>
                    <li>• How quickly can we measure this metric?</li>
                    <li>• What&apos;s our baseline and target for this metric?</li>
                    <li>• Will customers pay for sustained access to this value?</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Saved Validations Summary */}
        {showSummary && savedValidations.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Validation History</h3>
            <div className="space-y-3">
              {savedValidations.map((validation) => (
                <div key={validation.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium">{validation.phase}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(validation.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {validation.slots.customer} × {validation.slots.problem} → {validation.slots.solution}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Metric: {validation.slots.metric}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadValidation(validation)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteValidation(validation.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {Object.entries(validation.results).map(([key, value], index) => (
                      value && (
                        <span key={key} className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">
                          {phases[index].name} ✓
                        </span>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PMFValidator;