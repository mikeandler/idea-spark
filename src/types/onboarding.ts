export interface OnboardingAnswer {
  questionId: string;
  value: string | string[];
}

export interface OnboardingData {
  interests: string[];
  skillLevel: string;
  timeCommitment: string;
  existingTools: string[];
  targetAudience: string;
  primaryGoal: string;
}

export interface GeneratedIdea {
  title: string;
  description: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  keyFeatures: string[];
  techStack: string[];
  monetization: string;
}
