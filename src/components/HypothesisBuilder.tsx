'use client';

import React, { useState } from 'react';
import { ChevronRight, Lightbulb, RefreshCw } from 'lucide-react';

interface HypothesisQuestion {
  id: number;
  question: string;
  placeholder: string;
  hint: string;
  valueKey: string;
}

const questions: HypothesisQuestion[] = [
  {
    id: 1,
    question: "What have you built (or planning to build)?",
    placeholder: "e.g., Emu - a systematic PMF validation platform",
    hint: "Start with your solution - we'll work backwards from here",
    valueKey: "solution"
  },
  {
    id: 2,
    question: "Who do you think will use this?",
    placeholder: "e.g., Startups, founders, product managers",
    hint: "Be specific about your target users",
    valueKey: "who"
  },
  {
    id: 3,
    question: "What will it help them do better?",
    placeholder: "e.g., Find product-market fit faster",
    hint: "What's the main improvement they'll experience?",
    valueKey: "what"
  },
  {
    id: 4,
    question: "What are they struggling with now?",
    placeholder: "e.g., No systematic approach to validation",
    hint: "What problem exists without your solution?",
    valueKey: "problem"
  },
  {
    id: 5,
    question: "How will you measure success?",
    placeholder: "e.g., They hit $10k MRR, 100 active users",
    hint: "What metric shows they've succeeded?",
    valueKey: "metric"
  },
  {
    id: 6,
    question: "What improvement do you expect?",
    placeholder: "e.g., 2x faster, 50% less time, 3x more revenue",
    hint: "Quantify the expected impact",
    valueKey: "improvement"
  }
];

interface HypothesisBuilderProps {
  onComplete: (hypothesis: string, data: Record<string, string>) => void;
  initialData?: Record<string, string>;
}

export default function HypothesisBuilder({ onComplete, initialData }: HypothesisBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>(initialData || {});
  const [currentAnswer, setCurrentAnswer] = useState('');

  const currentQuestion = questions.find(q => q.id === currentStep);

  const handleNext = () => {
    if (currentAnswer.trim() && currentQuestion) {
      const newAnswers = { ...answers, [currentQuestion.valueKey]: currentAnswer.trim() };
      setAnswers(newAnswers);
      
      if (currentStep < questions.length) {
        setCurrentStep(currentStep + 1);
        setCurrentAnswer(newAnswers[questions[currentStep]?.valueKey] || '');
      } else {
        // Generate final hypothesis
        const hypothesis = generateHypothesis(newAnswers);
        onComplete(hypothesis, newAnswers);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      const prevQuestion = questions[currentStep - 2];
      setCurrentAnswer(answers[prevQuestion.valueKey] || '');
    }
  };

  const generateHypothesis = (data: Record<string, string>) => {
    // Build hypothesis from the answers
    const { who, what, problem, metric, improvement } = data;
    
    return `${who} currently struggle with ${problem}. Our solution will help them ${what}, 
    enabling them to reach ${metric} ${improvement} compared to current approaches.`;
  };

  const getEvolvingHypothesis = () => {
    const parts = [];
    
    if (answers.solution) parts.push(answers.solution);
    if (answers.who) parts.push(`will help ${answers.who}`);
    if (answers.what) parts.push(answers.what);
    if (answers.problem) parts.push(`who struggle with ${answers.problem}`);
    if (answers.metric) parts.push(`achieve ${answers.metric}`);
    if (answers.improvement) parts.push(answers.improvement);
    
    return parts.length > 0 ? parts.join(' ') : 'Your hypothesis will appear here...';
  };

  const progress = (currentStep / questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Building your hypothesis</span>
          <span>{currentStep} of {questions.length}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Question */}
      {currentQuestion && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {currentQuestion.question}
              </h3>
              <p className="text-sm text-gray-600">{currentQuestion.hint}</p>
            </div>
          </div>

          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleNext()}
            placeholder={currentQuestion.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {currentStep < questions.length ? 'Next' : 'Complete'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Evolving Hypothesis */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-4 h-4 text-blue-600" />
          <h4 className="font-semibold text-gray-900">Your Evolving Hypothesis</h4>
        </div>
        <p className="text-gray-700 italic">
          {getEvolvingHypothesis()}
        </p>
      </div>

      {/* Previous Answers */}
      {Object.keys(answers).length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Your answers so far:</h4>
          <div className="space-y-2">
            {questions.slice(0, currentStep - 1).map(q => (
              <div key={q.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{q.question}</span>
                <span className="text-gray-900 font-medium">{answers[q.valueKey]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}