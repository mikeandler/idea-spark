import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Question, QuestionOption } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  selectedValues: string | string[];
  onSelect: (value: string) => void;
}

export function QuestionCard({ question, selectedValues, onSelect }: QuestionCardProps) {
  const isSelected = (optionId: string) => {
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(optionId);
    }
    return selectedValues === optionId;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-semibold text-foreground mb-3"
        >
          {question.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          {question.subtitle}
        </motion.p>
        {question.type === 'multi' && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block mt-2 text-sm text-primary"
          >
            Select multiple options
          </motion.span>
        )}
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <OptionCard
            key={option.id}
            option={option}
            index={index}
            isSelected={isSelected(option.id)}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface OptionCardProps {
  option: QuestionOption;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

function OptionCard({ option, index, isSelected, onClick }: OptionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      onClick={onClick}
      className={`
        question-option w-full p-4 md:p-5 rounded-xl border text-left
        flex items-center gap-4 group
        ${isSelected 
          ? 'selected border-primary bg-primary/5' 
          : 'border-border bg-card hover:border-primary/30'
        }
      `}
    >
      {option.icon && (
        <span className="text-2xl">{option.icon}</span>
      )}
      <div className="flex-1">
        <span className="font-medium text-foreground block">
          {option.label}
        </span>
        {option.description && (
          <span className="text-sm text-muted-foreground mt-0.5 block">
            {option.description}
          </span>
        )}
      </div>
      <div
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${isSelected 
            ? 'border-primary bg-primary' 
            : 'border-muted-foreground/30 group-hover:border-primary/50'
          }
        `}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check className="w-3.5 h-3.5 text-primary-foreground" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
