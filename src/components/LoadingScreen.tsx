import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const loadingMessages = [
  'Analyzing your preferences...',
  'Matching ideas to your skills...',
  'Exploring market opportunities...',
  'Crafting unique concepts...',
  'Finalizing your personalized ideas...',
];

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-primary/10 flex items-center justify-center glow-primary"
        >
          <Sparkles className="w-12 h-12 text-primary" />
        </motion.div>

        {/* Loading Text */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Generating Your Ideas
        </h2>

        {/* Animated Messages */}
        <div className="h-8 overflow-hidden">
          <motion.div
            animate={{ y: [0, -32, -64, -96, -128, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
          >
            {loadingMessages.map((message, index) => (
              <p key={index} className="h-8 text-muted-foreground">
                {message}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-muted rounded-full mt-8 overflow-hidden mx-auto">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-full w-1/2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
