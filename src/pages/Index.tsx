import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { QuestionCard } from '@/components/QuestionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { NavigationButtons } from '@/components/NavigationButtons';
import { ResultsScreen } from '@/components/ResultsScreen';
import { LoadingScreen } from '@/components/LoadingScreen';
import { questions } from '@/data/questions';
import type { OnboardingData, GeneratedIdea } from '@/types/onboarding';

type AppState = 'welcome' | 'onboarding' | 'loading' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleStart = () => {
    setAppState('onboarding');
  };

  const handleSelectOption = (optionId: string) => {
    const question = questions[currentQuestionIndex];
    
    if (question.type === 'multi') {
      const currentValues = (answers[question.id] as string[]) || [];
      const newValues = currentValues.includes(optionId)
        ? currentValues.filter(id => id !== optionId)
        : [...currentValues, optionId];
      setAnswers(prev => ({ ...prev, [question.id]: newValues }));
    } else {
      setAnswers(prev => ({ ...prev, [question.id]: optionId }));
    }
  };

  const canProceed = () => {
    const answer = answers[currentQuestion?.id];
    if (!answer) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    return true;
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Generate ideas
      await generateIdeas();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const generateIdeas = useCallback(async () => {
    setAppState('loading');
    setIsLoading(true);

    try {
      const onboardingData: OnboardingData = {
        interests: (answers.interests as string[]) || [],
        skillLevel: (answers.skillLevel as string) || 'nocode',
        timeCommitment: (answers.timeCommitment as string) || 'minimal',
        existingTools: (answers.existingTools as string[]) || [],
        targetAudience: (answers.targetAudience as string) || 'myself',
        primaryGoal: (answers.primaryGoal as string) || 'learn',
      };

      const { data, error } = await supabase.functions.invoke('generate-ideas', {
        body: { onboardingData },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedIdeas(data.ideas || []);
      setAppState('results');
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to generate ideas. Please try again.'
      );
      setAppState('onboarding');
    } finally {
      setIsLoading(false);
    }
  }, [answers]);

  const handleRestart = () => {
    setAppState('welcome');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setGeneratedIdeas([]);
  };

  const handleRegenerate = () => {
    generateIdeas();
  };

  return (
    <div className="min-h-screen bg-background dark">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}

        {appState === 'onboarding' && currentQuestion && (
          <div key="onboarding" className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-2xl mb-12">
              <ProgressBar current={currentQuestionIndex} total={questions.length} />
            </div>
            
            <QuestionCard
              question={currentQuestion}
              selectedValues={answers[currentQuestion.id] || (currentQuestion.type === 'multi' ? [] : '')}
              onSelect={handleSelectOption}
            />
            
            <NavigationButtons
              onBack={handleBack}
              onNext={handleNext}
              canGoBack={currentQuestionIndex > 0}
              canGoNext={canProceed()}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
              isLoading={isLoading}
            />
          </div>
        )}

        {appState === 'loading' && (
          <LoadingScreen key="loading" />
        )}

        {appState === 'results' && (
          <ResultsScreen
            key="results"
            ideas={generatedIdeas}
            onRestart={handleRestart}
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
