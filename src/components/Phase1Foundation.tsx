'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  AlertCircle,
  FileText,
  Users,
  Target,
  Brain,
  Search,
  BarChart,
  MessageSquare,
  Lightbulb
} from 'lucide-react';
import AIHypothesisBuilder from './AIHypothesisBuilder';

interface ValidationStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'not-started' | 'in-progress' | 'completed';
  data?: Record<string, unknown>;
}

const initialSteps: ValidationStep[] = [
  {
    id: 1,
    title: "Document Core Hypothesis",
    description: "Define your fundamental belief about why startups fail at PMF",
    icon: <FileText className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 2,
    title: "Define 'Systematic Approach'",
    description: "Create operational definitions for what systematic validation means",
    icon: <Target className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 3,
    title: "List All Assumptions",
    description: "Document assumptions about why startups currently fail at PMF",
    icon: <Brain className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 4,
    title: "Identify Personal Biases",
    description: "Acknowledge your founder's curse and personal biases",
    icon: <AlertCircle className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 5,
    title: "Map Your PMF Journey",
    description: "Document your own pain points as primary research",
    icon: <Users className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 6,
    title: "Research Existing Solutions",
    description: "Analyze competitors, alternatives, and workarounds",
    icon: <Search className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 7,
    title: "Analyze Solution Gaps",
    description: "Understand why existing solutions haven't solved this problem",
    icon: <Lightbulb className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 8,
    title: "Define Success Metrics",
    description: "Quantify what 'achieving PMF' means for your platform",
    icon: <BarChart className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 9,
    title: "Create ICP Hypothesis",
    description: "Define which startups need this solution most",
    icon: <Target className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 10,
    title: "Segment Startup Types",
    description: "Categorize by B2B/B2C, funding, stage, and industry",
    icon: <Users className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 11,
    title: "Identify 50 Prospects",
    description: "Find potential customers matching your ICP hypothesis",
    icon: <Search className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 12,
    title: "Design Interview Script",
    description: "Create problem validation interview questions",
    icon: <MessageSquare className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 13,
    title: "Conduct 20 Interviews",
    description: "Execute problem validation interviews",
    icon: <Users className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 14,
    title: "Synthesize Findings",
    description: "Extract problem themes from interview data",
    icon: <Brain className="w-5 h-5" />,
    status: 'not-started'
  },
  {
    id: 15,
    title: "Validate/Refine Hypothesis",
    description: "Update your core hypothesis based on evidence",
    icon: <CheckCircle2 className="w-5 h-5" />,
    status: 'not-started'
  }
];

export default function Phase1Foundation() {
  const [steps, setSteps] = useState<ValidationStep[]>(initialSteps);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hypothesis, setHypothesis] = useState('');
  const [definitions, setDefinitions] = useState('');
  const [assumptions, setAssumptions] = useState<string[]>(['']);
  const [biases, setBiases] = useState<string[]>(['']);

  const updateStepStatus = (stepId: number, status: 'not-started' | 'in-progress' | 'completed') => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ));
  };

  const saveStepData = (stepId: number, data: Record<string, unknown>) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, data, status: 'completed' } : step
    ));
    // Auto-advance to next step
    if (stepId < 15) {
      setActiveStep(stepId + 1);
      updateStepStatus(stepId + 1, 'in-progress');
    }
  };

  const addListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const updateListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => prev.map((item, i) => i === index ? value : item));
  };

  const removeListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const getCompletionPercentage = () => {
    const completed = steps.filter(s => s.status === 'completed').length;
    return Math.round((completed / steps.length) * 100);
  };

  const renderStepContent = () => {
    const currentStep = steps.find(s => s.id === activeStep);
    if (!currentStep) return null;

    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Build Your Core Hypothesis</h3>
            <p className="text-gray-400">
              AI will help you reverse-engineer your problem hypothesis from your product idea.
            </p>
            <AIHypothesisBuilder
              onComplete={(hypothesis, data) => {
                setHypothesis(hypothesis);
                saveStepData(1, { hypothesis, ...data });
              }}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Define &apos;Systematic Approach&apos;</h3>
            <p className="text-gray-600">
              Create specific, operational definitions for what a systematic validation process means.
            </p>
            <textarea
              value={definitions}
              onChange={(e) => setDefinitions(e.target.value)}
              placeholder="Example: A systematic approach includes: 1) Documented hypotheses, 2) Measurable validation criteria, 3) Structured interview processes, 4) Data-driven decision making..."
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => saveStepData(2, { definitions })}
              disabled={!definitions.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save & Continue
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">List All Assumptions</h3>
            <p className="text-gray-600">
              Document your assumptions about why startups currently fail at PMF.
            </p>
            <div className="space-y-2">
              {assumptions.map((assumption, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={assumption}
                    onChange={(e) => updateListItem(setAssumptions, index, e.target.value)}
                    placeholder={`Assumption ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {assumptions.length > 1 && (
                    <button
                      onClick={() => removeListItem(setAssumptions, index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => addListItem(setAssumptions)}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              + Add Assumption
            </button>
            <button
              onClick={() => saveStepData(3, { assumptions: assumptions.filter(a => a.trim()) })}
              disabled={!assumptions.some(a => a.trim())}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save & Continue
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Identify Personal Biases</h3>
            <p className="text-gray-600">
              Acknowledge your founder&apos;s curse and personal biases that might affect your judgment.
            </p>
            <div className="space-y-2">
              {biases.map((bias, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={bias}
                    onChange={(e) => updateListItem(setBiases, index, e.target.value)}
                    placeholder={`Bias ${index + 1}: e.g., "I assume all founders struggle with the same problems I did"`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {biases.length > 1 && (
                    <button
                      onClick={() => removeListItem(setBiases, index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => addListItem(setBiases)}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              + Add Bias
            </button>
            <button
              onClick={() => saveStepData(4, { biases: biases.filter(b => b.trim()) })}
              disabled={!biases.some(b => b.trim())}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save & Continue
            </button>
          </div>
        );

      // Add more step content for steps 5-15...
      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{currentStep.title}</h3>
            <p className="text-gray-600">{currentStep.description}</p>
            <div className="p-8 bg-gray-50 rounded-lg text-center text-gray-500">
              Step content for &quot;{currentStep.title}&quot; coming soon...
            </div>
            <button
              onClick={() => saveStepData(activeStep, {})}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Mark as Complete
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Phase 1: Foundation & Problem Validation</h1>
              <p className="text-gray-400 mt-1">Complete all 15 steps before moving to personas</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Progress</p>
                <p className="text-2xl font-bold text-purple-500">{getCompletionPercentage()}%</p>
              </div>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-600 transition-all duration-300"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Steps List */}
          <div className="col-span-4">
            <div className="bg-gray-900 rounded-lg border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-semibold text-gray-100">Validation Steps</h2>
              </div>
              <div className="p-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition-all
                      ${activeStep === step.id ? 'bg-purple-900/20 text-purple-400' : 'hover:bg-gray-800'}`}
                  >
                    <div className="flex-shrink-0">
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : step.status === 'in-progress' ? (
                        <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        activeStep === step.id ? 'text-purple-400' : 'text-gray-200'
                      }`}>
                        {step.id}. {step.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{step.description}</p>
                    </div>
                    {activeStep === step.id && (
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="col-span-8">
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              {renderStepContent()}
            </div>

            {/* Saved Data Preview */}
            {steps.filter(s => s.status === 'completed').length > 0 && (
              <div className="mt-6 bg-gray-900 rounded-lg border border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Completed Steps Summary</h3>
                <div className="space-y-4">
                  {steps.filter(s => s.status === 'completed').map(step => (
                    <div key={step.id} className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium text-gray-200">{step.title}</h4>
                      <pre className="text-sm text-gray-400 mt-1 whitespace-pre-wrap">
                        {JSON.stringify(step.data, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}