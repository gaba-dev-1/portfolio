export const person = {
  name: 'Sébastien Gimenez',
  alias: 'Gaba',
  role: 'Software Engineer',
  location: 'Montréal, QC',
  bio: `Welcome to my portfolio.`,
  tagline: `Building interfaces for productivity & gaming. Working on both open source projects and enterprise solutions.`,
  skills: [
    { name: 'React', level: 'Advanced' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Jakarta EE', level: 'Advanced' },
    { name: 'Symfony', level: 'Advanced' },
    { name: 'Django', level: 'Intermediate' },
    { name: 'Three.js', level: 'Intermediate' },
    { name: 'PostgreSQL', level: 'Advanced' },
    { name: 'Redis', level: 'Intermediate' },
    { name: 'Git', level: 'Advanced' },
    { name: 'IPFS', level: 'Intermediate' },
    { name: 'Unity', level: 'Beginner' }
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "Gabadev",
      duration: "2024 - Present",
      description: "Building web apps and games. Working on integration solutions."
    },
    {
      title: "Software Engineer",
      company: "Xdemat",
      duration: "2019 - 2024",
      description: "Built web applications for enterprise clients. Led data management and UI improvements."
    },
    {
      title: "Junior Developer",
      company: "Xdemat",
      duration: "2016 - 2019",
      description: "Developed web applications and worked on various client projects. Learned modern development workflows."
    }
  ],
  education: {
    degree: "Bachelor of Computer Science",
    university: "Luminy University",
    location: "Marseille, FR",
    year: "2015"
  }
};

// UPDATED: Removed gameguru and decibells
export const projects = [
  {
    id: 'metaforge',
    title: 'MetaForge',
    tagline: 'Tools for Tacticians',
    description: 'TeamFight Tactics analytics & testing tool in which users vote on comps and strategies.',
    longDescription: `MetaForge is a TFT analytics & prediction platform where users vote on comps & techs. Features dual ranking systems - League Points (LP) for competitive performance and Prediction Points (PP) for forecasting accuracy.

Built with React, TypeScript, Node.js, and PostgreSQL. Provides real-time analytics and performance tracking.`,
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    link: 'https://metaforge.lol',
    github: 'https://github.com/gaba-dev/metaforge',
    images: [
      '/images/metaforge_screen1.png',
      '/images/metaforge_screen2.png',
      '/images/metaforge_screen3.png',
    ],
    features: [
      'Dual ranking system (LP and PP)',
      'Real-time analytics',
      'Competitive forecasting',
      'Team composition voting',
      'Performance tracking'
    ],
    color: 'primary'
  },
  {
    id: 'mosaik',
    title: 'Mosaïk',
    tagline: 'Workspace Tool',
    description: 'Workspace organizer that adapts to user workflows. Built with React, Python, and Docker for productivity automation.',
    longDescription: `Mosaïk is a workspace organizer that adapts to user workflows. Using pattern recognition and automation, it optimizes workspace layouts for productivity.

Built with React for the frontend, Python for workflow analysis, and Docker for containerization. Learns from user behavior to suggest improvements.`,
    tags: ['React', 'Python', 'Docker'],
    link: 'https://mosaïk.com',
    github: 'https://github.com/gaba-dev/mosaik',
    images: [
      '/images/mosaik_screen1.png',
      '/images/mosaik_screen2.png',
      '/images/mosaik_screen3.png',
    ],
    features: [
      'Adaptive layouts',
      'Workflow automation',
      'Productivity optimization',
      'Cross-platform support',
      'Pattern recognition'
    ],
    color: 'purple-dark'
  },
  {
    id: 'dropdate',
    title: 'Dropdate',
    tagline: 'Gaming Calendar',
    description: 'Gaming calendar tracking releases, events and community milestones. Built with Next.js, TailwindCSS, and MongoDB.',
    longDescription: `Dropdate is a gaming calendar that tracks game releases, patches, events, and community milestones. Users can personalize their feed and get notifications for gaming events.

Built with Next.js for performance, TailwindCSS for styling, and MongoDB for data storage. Integrates with popular calendar apps.`,
    tags: ['Next.js', 'TailwindCSS', 'MongoDB'],
    link: 'https://dropdate.net',
    github: 'https://github.com/gaba-dev/dropdate',
    images: [
      '/images/dropdate_screen1.png',
      '/images/dropdate_screen2.png',
      '/images/dropdate_screen3.png',
    ],
    features: [
      'Gaming calendar',
      'Event tracking',
      'Community milestones',
      'Notifications',
      'Calendar integration'
    ],
    color: 'purple-lighter'
  }
];

// Simple, realistic freelance services
export const services = [
  {
    id: 'websites',
    title: 'Websites',
    description: 'Clean, fast websites that work on all devices.',
    price: '$800 - $3,000',
    duration: '1-3 weeks',
    features: [
      'Responsive design',
      'Contact forms',
      'Basic SEO',
      'Fast loading',
      'Mobile-friendly',
      'Easy to update'
    ],
    color: 'primary'
  },
  {
    id: 'web-apps',
    title: 'Web Apps',
    description: 'Interactive web applications with databases.',
    price: '$2,000 - $8,000',
    duration: '3-8 weeks',
    features: [
      'User accounts',
      'Database setup',
      'Admin panel',
      'API integration',
      'Payment processing',
      'Real-time features'
    ],
    color: 'purple-light'
  },
  {
    id: 'fixes-updates',
    title: 'Fixes & Updates',
    description: 'Bug fixes, feature additions, and improvements.',
    price: '$100/hour',
    duration: 'As needed',
    features: [
      'Bug fixes',
      'New features',
      'Performance improvements',
      'Security updates',
      'Code cleanup',
      'Quick turnaround'
    ],
    color: 'purple-dark'
  }
];

export const contact = {
  email: 'contact@gabadev.com',
  github: 'github.com/gaba-dev',
  twitter: '@MetaForgeLol',
  discord: 'https://discord.gg/gY5PsymH',
  linkedin: 'linkedin.com/in/sébastien-gimenez-ab8b9233a/',
  website: 'gabadev.com',
  location: 'Montréal, QC 🍁',
  availability: 'Open to projects',
  preferredContact: 'Discord'
};
