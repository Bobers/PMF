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
        `Validate product-market fit 2-3x faster through systematic customer discovery`,
        `Reduce time to first paying customer by 50% with structured validation processes`,
        `Make data-driven product decisions instead of relying on intuition and guesswork`
      ],
      currentProblem: [
        `Wasting 6-12 months building features nobody wants due to lack of customer validation`,
        `Getting contradictory feedback from customers without a framework to synthesize insights`,
        `Struggling to identify which customer segments to focus on for initial traction`
      ],
      successMetric: [
        `Reaching $10k MRR within 6 months of launch`,
        `Getting 100 paying customers in the target segment`,
        `Achieving 40% of users saying they'd be "very disappointed" without the product`
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
      onComplete(hypothesis, selectedAnswers);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const generateFinalHypothesis = (answers: Record<string, string>) => {
    return `${answers.targetUsers} currently struggle with ${answers.currentProblem}. 
    Our solution will help them ${answers.improvement}, 
    enabling them to achieve ${answers.successMetric} with ${answers.expectedImpact}.`;
  };

  const canProceed = selectedAnswers[currentStep?.key] || currentStepIndex === 0;

  return (
    <div className="space-y-6">
      {/* Product Input */}
      {currentStepIndex === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Tell us about your product</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Emu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="e.g., A systematic PMF validation platform that helps startups find product-market fit faster"
              className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generate AI Suggestions
          </button>
        </div>
      )}

      {/* Current Step */}
      {currentStepIndex > 0 && currentStep && (
        <>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentStep.question}
            </h3>
            
            {/* Generate suggestions if not already present */}
            {!suggestions[currentStep.key] && (
              <button
                onClick={() => generateSuggestions()}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Generate Suggestions
              </button>
            )}

            {/* Loading state */}
            {isGenerating && (
              <div className="flex items-center justify-center py-8 text-gray-500">
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
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => handleSelectSuggestion(suggestion.content)}
                  >
                    {suggestion.isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          value={suggestion.content}
                          onChange={(e) => e.stopPropagation()}
                          onBlur={(e) => handleSaveEdit(currentStep.key, index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700">{suggestion.content}</p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              generateSuggestions(index);
                            }}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="Regenerate"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(currentStep.key, index);
                            }}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(currentStep.key, index);
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
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
                                ? 'text-green-600 bg-green-50' 
                                : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
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
              className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {currentStepIndex < steps.length - 1 ? 'Next' : 'Complete'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {/* Progress indicator */}
      {currentStepIndex > 0 && (
        <div className="flex justify-center gap-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`w-2 h-2 rounded-full transition-all ${
                index < currentStepIndex ? 'bg-blue-600' :
                index === currentStepIndex ? 'bg-blue-400' :
                'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}