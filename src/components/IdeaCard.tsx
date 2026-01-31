import { motion } from 'framer-motion';
import { Clock, Layers, DollarSign, Sparkles } from 'lucide-react';
import type { GeneratedIdea } from '@/types/onboarding';

interface IdeaCardProps {
  idea: GeneratedIdea;
  index: number;
}

const complexityColors = {
  beginner: 'text-green-500 bg-green-500/10',
  intermediate: 'text-amber-500 bg-amber-500/10',
  advanced: 'text-red-500 bg-red-500/10',
};

export function IdeaCard({ idea, index }: IdeaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="glass-card p-6 md:p-8 group hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <span className="text-xs font-medium text-primary mb-2 block">
            Idea #{index + 1}
          </span>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-gradient transition-all duration-300">
            {idea.title}
          </h3>
        </div>
        <span className={`
          px-3 py-1 rounded-full text-xs font-medium capitalize
          ${complexityColors[idea.complexity]}
        `}>
          {idea.complexity}
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {idea.description}
      </p>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 text-primary" />
          <span>{idea.timeEstimate}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Layers className="w-4 h-4 text-primary" />
          <span>{idea.techStack.slice(0, 3).join(', ')}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign className="w-4 h-4 text-primary" />
          <span>{idea.monetization}</span>
        </div>
      </div>

      {/* Key Features */}
      <div className="border-t border-border pt-5">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Key Features
        </h4>
        <ul className="grid gap-2">
          {idea.keyFeatures.slice(0, 4).map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
