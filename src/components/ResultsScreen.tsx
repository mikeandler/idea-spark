import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IdeaCard } from '@/components/IdeaCard';
import type { GeneratedIdea } from '@/types/onboarding';

interface ResultsScreenProps {
  ideas: GeneratedIdea[];
  onRestart: () => void;
  onRegenerate: () => void;
  isLoading?: boolean;
}

export function ResultsScreen({ ideas, onRestart, onRegenerate, isLoading }: ResultsScreenProps) {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center glow-primary"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Your Personalized Ideas
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Based on your answers, here are AI-crafted microapp concepts tailored just for you.
          </p>
        </motion.div>

        {/* Ideas Grid */}
        <div className="grid gap-6 mb-12">
          {ideas.map((idea, index) => (
            <IdeaCard key={index} idea={idea} index={index} />
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            variant="outline"
            onClick={onRestart}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Start Over
          </Button>
          <Button
            onClick={onRegenerate}
            disabled={isLoading}
            className="gap-2 bg-primary text-primary-foreground glow-primary hover:opacity-90"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Regenerating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Generate More Ideas
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
