import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const features = [
    { icon: Lightbulb, text: 'AI-powered idea generation' },
    { icon: Target, text: 'Matched to your skills' },
    { icon: Zap, text: 'Market-ready concepts' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary/10 flex items-center justify-center glow-primary"
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        >
          <span className="text-foreground">Discover Your Next</span>
          <br />
          <span className="text-gradient">AI Microapp Idea</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
        >
          Answer a few questions and let AI craft personalized, marketable app ideas 
          tailored to your skills, interests, and available time.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <feature.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="px-8 py-6 text-lg rounded-xl bg-primary text-primary-foreground glow-primary hover:opacity-90 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Discovery
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Takes about 2 minutes
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
