import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  isLoading?: boolean;
}

export function NavigationButtons({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  isLastQuestion,
  isLoading,
}: NavigationButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex justify-between items-center w-full max-w-2xl mx-auto mt-10"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        disabled={!canGoBack}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <Button
        onClick={onNext}
        disabled={!canGoNext || isLoading}
        className={`
          gap-2 px-6 py-2.5 rounded-xl font-medium
          transition-all duration-300
          ${isLastQuestion 
            ? 'bg-primary text-primary-foreground glow-primary hover:opacity-90' 
            : 'bg-primary text-primary-foreground hover:opacity-90'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Generating...
          </>
        ) : isLastQuestion ? (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Ideas
          </>
        ) : (
          <>
            Continue
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </motion.div>
  );
}
