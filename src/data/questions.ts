export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: 'single' | 'multi';
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 'interests',
    title: 'What sparks your curiosity?',
    subtitle: 'Select all areas that interest you — the more, the better for unique combinations.',
    type: 'multi',
    options: [
      { id: 'productivity', label: 'Productivity & Organization', icon: '📊' },
      { id: 'creative', label: 'Creative & Design', icon: '🎨' },
      { id: 'health', label: 'Health & Wellness', icon: '🧘' },
      { id: 'finance', label: 'Finance & Business', icon: '💰' },
      { id: 'education', label: 'Education & Learning', icon: '📚' },
      { id: 'social', label: 'Social & Community', icon: '👥' },
      { id: 'entertainment', label: 'Entertainment & Gaming', icon: '🎮' },
      { id: 'developer', label: 'Developer Tools', icon: '💻' },
    ],
  },
  {
    id: 'skillLevel',
    title: 'What\'s your technical comfort zone?',
    subtitle: 'Be honest — we\'ll match ideas to your current abilities while helping you grow.',
    type: 'single',
    options: [
      { id: 'nocode', label: 'No-Code Explorer', description: 'I prefer visual builders and drag-and-drop tools' },
      { id: 'lowcode', label: 'Low-Code Tinkerer', description: 'I can customize code but prefer not to write from scratch' },
      { id: 'midcode', label: 'Comfortable Coder', description: 'I can write and understand code with some help' },
      { id: 'fullstack', label: 'Full-Stack Developer', description: 'I\'m experienced with both frontend and backend' },
      { id: 'architect', label: 'System Architect', description: 'I design complex systems and scalable solutions' },
    ],
  },
  {
    id: 'timeCommitment',
    title: 'How much time can you invest weekly?',
    subtitle: 'We\'ll suggest ideas that match your availability realistically.',
    type: 'single',
    options: [
      { id: 'minimal', label: '1-3 hours', description: 'Quick wins and micro-projects' },
      { id: 'moderate', label: '4-10 hours', description: 'Meaningful progress on weekends' },
      { id: 'dedicated', label: '11-20 hours', description: 'Serious side project energy' },
      { id: 'fulltime', label: '20+ hours', description: 'Full commitment mode' },
    ],
  },
  {
    id: 'existingTools',
    title: 'Which tools do you already use?',
    subtitle: 'We\'ll leverage what you have to reduce friction.',
    type: 'multi',
    options: [
      { id: 'lovable', label: 'Lovable', icon: '💜' },
      { id: 'chatgpt', label: 'ChatGPT / Claude', icon: '🤖' },
      { id: 'figma', label: 'Figma / Design Tools', icon: '🎨' },
      { id: 'notion', label: 'Notion / Docs', icon: '📝' },
      { id: 'github', label: 'GitHub', icon: '🐙' },
      { id: 'vercel', label: 'Vercel / Netlify', icon: '▲' },
      { id: 'supabase', label: 'Supabase / Firebase', icon: '🔥' },
      { id: 'none', label: 'Starting Fresh', icon: '✨' },
    ],
  },
  {
    id: 'targetAudience',
    title: 'Who do you want to build for?',
    subtitle: 'Understanding your audience helps us suggest marketable ideas.',
    type: 'single',
    options: [
      { id: 'myself', label: 'Just Myself', description: 'Personal tools and experiments' },
      { id: 'creators', label: 'Creators & Freelancers', description: 'Content creators, designers, writers' },
      { id: 'smb', label: 'Small Businesses', description: 'Local shops, startups, solopreneurs' },
      { id: 'enterprise', label: 'Enterprise Teams', description: 'Large organizations and corporations' },
      { id: 'developers', label: 'Developers', description: 'Fellow builders and engineers' },
      { id: 'general', label: 'General Public', description: 'Mass market consumer apps' },
    ],
  },
  {
    id: 'primaryGoal',
    title: 'What\'s your main motivation?',
    subtitle: 'This helps us prioritize features that matter most to you.',
    type: 'single',
    options: [
      { id: 'learn', label: 'Learn & Experiment', description: 'Build skills through practice' },
      { id: 'portfolio', label: 'Portfolio Project', description: 'Showcase my abilities' },
      { id: 'revenue', label: 'Generate Revenue', description: 'Build a sustainable income stream' },
      { id: 'problem', label: 'Solve a Problem', description: 'Address a specific pain point' },
      { id: 'fun', label: 'Have Fun', description: 'Enjoy the creative process' },
    ],
  },
];
