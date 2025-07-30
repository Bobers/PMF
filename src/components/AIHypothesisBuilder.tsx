'use client';

import React, { useState, useCallback } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Edit2, 
  Trash2, 
  Lock, 
  Unlock,
  ChevronRight,
  Loader2
} from 'lucide-react';

interface HypothesisStep {
  id: string;
  question: string;
  key: string;
}

const steps: HypothesisStep[] = [
  { id: 'who', question: 'Who will use this?', key: 'targetUsers' },
  { id: 'what', question: 'What will it help them do better?', key: 'improvement' },
  { id: 'problem', question: 'What are they struggling with now?', key: 'currentProblem' },
  { id: 'metric', question: 'How will you measure success?', key: 'successMetric' },
  { id: 'impact', question: 'What improvement do you expect?', key: 'expectedImpact' }
];

interface Suggestion {
  id: string;
  content: string;
  isLocked: boolean;
  isEditing: boolean;
}

interface AIHypothesisBuilderProps {
  onComplete: (hypothesis: string, data: Record<string, string>) => void;
}

export default function AIHypothesisBuilder({ onComplete }: AIHypothesisBuilderProps) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<Record<string, Suggestion[]>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFinalHypothesis, setShowFinalHypothesis] = useState(false);
  const [finalHypothesis, setFinalHypothesis] = useState('');

  const currentStep = steps[currentStepIndex];

  // Generate AI suggestions for current step
  const generateSuggestions = useCallback(async (regenerateIndex?: number) => {
    if (!productName || !productDescription) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with contextual suggestions
    setTimeout(() => {
      const newSuggestions = generateContextualSuggestions(
        currentStep.key,
        productName,
        productDescription,
        selectedAnswers,
        regenerateIndex
      );
      
      setSuggestions(prev => ({
        ...prev,
        [currentStep.key]: regenerateIndex !== undefined 
          ? prev[currentStep.key].map((s, i) => i === regenerateIndex ? newSuggestions[0] : s)
          : newSuggestions
      }));
      
      setIsGenerating(false);
    }, 1000);
  }, [currentStep, productName, productDescription, selectedAnswers]);

  // Generate contextual suggestions based on step
  const generateContextualSuggestions = (
    stepKey: string,
    name: string,
    description: string,
    previousAnswers: Record<string, string>,
    regenerateIndex?: number
  ): Suggestion[] => {
    const templates: Record<string, string[]> = {
      targetUsers: [
        `Early-stage B2B SaaS founders (seed to Series A) building their first product`,
        `Product managers at growth-stage startups (50-200 employees) scaling existing products`,
        `Solo entrepreneurs and indie hackers validating new business ideas`
      ],
      improvement: [
        `validate product-market fit 2-3x faster through systematic customer discovery`,
        `reduce time to first paying customer by 50% with structured validation processes`,
        `make data-driven product decisions instead of relying on intuition and guesswork`
      ],
      currentProblem: [
        `wasting 6-12 months building features nobody wants due to lack of customer validation`,
        `getting contradictory feedback from customers without a framework to synthesize insights`,
        `struggling to identify which customer segments to focus on for initial traction`
      ],
      successMetric: [
        `reaching $10k MRR within 6 months of launch`,
        `getting 100 paying customers in the target segment`,
        `achieving 40% of users saying they'd be "very disappointed" without the product`
      ],
      expectedImpact: [
        `2x faster time to product-market fit (3 months vs 6-9 months)`,
        `50% reduction in wasted development time on unused features`,
        `3x higher conversion rate from trial to paid customers`
      ]
    };

    const baseTemplates = templates[stepKey] || [];
    
    if (regenerateIndex !== undefined) {
      // Generate a variation for regeneration
      const variations = [
        baseTemplates[Math.floor(Math.random() * baseTemplates.length)],
      ];
      return variations.map((content, i) => ({
        id: `${stepKey}-regen-${Date.now()}-${i}`,
        content,
        isLocked: false,
        isEditing: false
      }));
    }

    // Return initial 3 suggestions
    return baseTemplates.map((content, i) => ({
      id: `${stepKey}-${i}`,
      content,
      isLocked: false,
      isEditing: false
    }));
  };

  // Handle card actions
  const handleEdit = (stepKey: string, index: number) => {
    setSuggestions(prev => ({
      ...prev,
      [stepKey]: prev[stepKey].map((s, i) => 
        i === index ? { ...s, isEditing: true } : s
      )
    }));
  };

  const handleSaveEdit = (stepKey: string, index: number, newContent: string) => {
    setSuggestions(prev => ({
      ...prev,
      [stepKey]: prev[stepKey].map((s, i) => 
        i === index ? { ...s, content: newContent, isEditing: false } : s
      )
    }));
  };

  const handleDelete = (stepKey: string, index: number) => {
    setSuggestions(prev => ({
      ...prev,
      [stepKey]: prev[stepKey].filter((_, i) => i !== index)
    }));
  };

  const handleLock = (stepKey: string, index: number) => {
    setSuggestions(prev => ({
      ...prev,
      [stepKey]: prev[stepKey].map((s, i) => 
        i === index ? { ...s, isLocked: !s.isLocked } : s
      )
    }));
  };

  const handleSelectSuggestion = (content: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentStep.key]: content
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Generate final hypothesis
      const hypothesis = generateFinalHypothesis(selectedAnswers);
      setFinalHypothesis(hypothesis);
      setShowFinalHypothesis(true);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const generateFinalHypothesis = (answers: Record<string, string>) => {
    // Create a more sophisticated hypothesis that connects all elements
    const problem = answers.currentProblem?.toLowerCase().replace(/^(they\s+are\s+|they\s+)/, '');
    const improvement = answers.improvement?.toLowerCase().replace(/^(they\s+can\s+|they\s+)/, '');
    const metric = answers.successMetric?.toLowerCase();
    const impact = answers.expectedImpact?.toLowerCase();
    
    return `We believe that ${answers.targetUsers} who are ${problem} will achieve ${metric} by using our product to ${improvement}. We expect this will result in ${impact}, validating our assumption that systematic validation processes are the key bottleneck preventing startups from finding product-market fit efficiently.`;
  };

  const handleCompleteHypothesis = () => {
    onComplete(finalHypothesis, { 
      productName,
      productDescription,
      ...selectedAnswers,
      hypothesis: finalHypothesis 
    });
  };

  const canProceed = selectedAnswers[currentStep?.key] || currentStepIndex === 0;

  return (
    <div className="space-y-6">
      {/* Product Input */}
      {currentStepIndex === 0 && !showFinalHypothesis && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-100">Tell us about your product</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Emu"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Product Description
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="e.g., A systematic PMF validation platform that helps startups find product-market fit faster"
              className="w-full h-24 px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => {
              if (productName && productDescription) {
                generateSuggestions();
                setCurrentStepIndex(1);
              }
            }}
            disabled={!productName || !productDescription}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generate AI Suggestions
          </button>
        </div>
      )}

      {/* Current Step */}
      {currentStepIndex > 0 && currentStep && !showFinalHypothesis && (
        <>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              {currentStep.question}
            </h3>
            
            {/* Generate suggestions if not already present */}
            {!suggestions[currentStep.key] && (
              <button
                onClick={() => generateSuggestions()}
                className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-purple-500 hover:text-purple-400 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Generate Suggestions
              </button>
            )}

            {/* Loading state */}
            {isGenerating && (
              <div className="flex items-center justify-center py-8 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Generating AI suggestions...
              </div>
            )}

            {/* Suggestion Cards */}
            {suggestions[currentStep.key] && !isGenerating && (
              <div className="space-y-3 mt-4">
                {suggestions[currentStep.key].map((suggestion, index) => (
                  <div
                    key={suggestion.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer
                      ${selectedAnswers[currentStep.key] === suggestion.content 
                        ? 'border-purple-500 bg-purple-900/20' 
                        : 'border-gray-700 hover:border-gray-600 bg-gray-900'}`}
                    onClick={() => handleSelectSuggestion(suggestion.content)}
                  >
                    {suggestion.isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          value={suggestion.content}
                          onChange={(e) => e.stopPropagation()}
                          onBlur={(e) => handleSaveEdit(currentStep.key, index, e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 focus:ring-2 focus:ring-purple-500"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-300">{suggestion.content}</p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              generateSuggestions(index);
                            }}
                            className="p-1.5 text-gray-500 hover:text-purple-400 hover:bg-gray-700 rounded"
                            title="Regenerate"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(currentStep.key, index);
                            }}
                            className="p-1.5 text-gray-500 hover:text-purple-400 hover:bg-gray-700 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(currentStep.key, index);
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-700 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLock(currentStep.key, index);
                            }}
                            className={`p-1.5 rounded ${
                              suggestion.isLocked 
                                ? 'text-green-400 bg-green-900/20' 
                                : 'text-gray-500 hover:text-green-400 hover:bg-gray-700'
                            }`}
                            title={suggestion.isLocked ? 'Unlock' : 'Lock'}
                          >
                            {suggestion.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-gray-400 hover:text-gray-200 flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {currentStepIndex < steps.length - 1 ? 'Next' : 'Generate Hypothesis'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {/* Final Hypothesis */}
      {showFinalHypothesis && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-100">Your Problem Hypothesis</h3>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 leading-relaxed">{finalHypothesis}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-300">Key Components:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-gray-500">Target Users:</span>
                <span className="text-gray-300">{selectedAnswers.targetUsers}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Current Problem:</span>
                <span className="text-gray-300">{selectedAnswers.currentProblem}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Expected Improvement:</span>
                <span className="text-gray-300">{selectedAnswers.improvement}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Success Metric:</span>
                <span className="text-gray-300">{selectedAnswers.successMetric}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Expected Impact:</span>
                <span className="text-gray-300">{selectedAnswers.expectedImpact}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowFinalHypothesis(false);
                setCurrentStepIndex(1);
              }}
              className="px-4 py-2 text-gray-400 hover:text-gray-200 border border-gray-600 rounded-lg"
            >
              Refine Answers
            </button>
            <button
              onClick={handleCompleteHypothesis}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              Accept Hypothesis
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {currentStepIndex > 0 && !showFinalHypothesis && (
        <div className="flex justify-center gap-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`w-2 h-2 rounded-full transition-all ${
                index < currentStepIndex ? 'bg-purple-600' :
                index === currentStepIndex ? 'bg-purple-400' :
                'bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}