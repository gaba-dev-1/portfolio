export const person = {
  name: 'Sébastien Gimenez',
  alias: 'Gaba',
  role: 'Software Engineer',
  location: 'Montréal, QC',
  bio: `Building tailored interfaces to enhance gamers experience. Multi-platform customizable tools designed for seamless ingame usability.`,
  skills: [
    { name: 'React', level: 'Advanced' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'Jakarta EE', level: 'Advanced' },
    { name: 'Symfony', level: 'Advanced' },
    { name: 'Django', level: 'Intermediate' },
    { name: 'Git', level: 'Advanced' },
    { name: 'Docker', level: 'Intermediate' },
    { name: 'AWS', level: 'Advanced' },
    { name: 'Alfresco', level: 'Intermediate' }
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "Gabadev",
      duration: "2024 - Present",
      description: "Creating tailored applications focused on enhancing gamers experience with seamless integration."
    },
    {
      title: "Software Engineer",
      company: "Xdemat",
      duration: "2019 - 2024",
      description: "Developed and maintained client projects, focusing on web applications and data management."
    },
    {
      title: "Junior Developer",
      company: "Xdemat",
      duration: "2016 - 2019",
      description: "Assisted in building web applications, learning best practices and growing technical skills ."
    }
  ],
  education: [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'Luminy University',
      location: 'Marseille, FR',
      year: '2015'
    }
  ]
};

export const projects = [
  {
    id: 'metaforge',
    title: 'MetaForge',
    tagline: 'Tools For Tacticians',
    description: 'Analytics platform for competitive gaming, providing real-time insights, recommendations, and performance tracking for players.',
    longDescription: `MetaForge helps gamers improve by providing real-time analytics and data-driven insights. Players can track their performance, analyze patterns, and receive personalized recommendations.

The platform processes match data to identify effective strategies and builds for each game adapting to each player's unique playstyle.`,
    tags: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Analytics'],
    link: 'https://metaforge.lol',
    github: 'https://github.com/gaba-dev-1/metaforge',
    images: [
      '/images/metaforge-1.png',
      '/images/metaforge-2.png',
      '/images/metaforge-3.png',
    ],
    features: [
      'Latest games analytics dashboard',
      'Performance tracking and visualization',
      'Data-based build recommendations',
      'Dynamic team-building'
    ],
    color: 'accent'
  },
  {
    id: 'dropdate',
    title: 'Dropdate',
    tagline: 'Never Miss a Launch',
    description: 'Unified gaming calendar aggregating release dates, patches, events, and streams from across the gaming ecosystem in one customizable interface.',
    longDescription: `Dropdate solves the problem of fragmented information in the gaming industry by centralizing release dates, patches, events, and streams in a single, customizable interface.

Users can personalize their feed to follow specific games, developers, or content creators, and receive notifications for important events. The platform also integrates with calendar apps for seamless planning.`,
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Firebase'],
    link: 'https://dropdate.gg',
    github: 'https://github.com/gaba-dev-1/dropdate',
    images: [
      '/images/gaba.png',
      '/images/gaba.png',
      '/images/gaba.png',
    ],
    features: [
      'Personalized gaming calendar',
      'Customizable notification system',
      'Calendar app integrations',
      'Developer and content creator tracking',
      'Unified launch countdown timers'
    ],
    color: 'accent'
  },
  {
    id: 'gameguru',
    title: 'GameGuru',
    tagline: 'Your In-Game Assistant',
    description: 'Low-latency desktop overlay using computer vision to surface contextual gaming tips, lore summaries, and performance insights without alt-tabbing.',
    longDescription: `GameGuru enhances the gaming experience by providing contextual assistance without disrupting gameplay. Using computer vision and machine learning, it recognizes in-game situations and provides relevant information through a non-intrusive overlay.

The app can deliver tips, lore summaries, and performance insights specific to the current game state, helping players make better decisions and enjoy a more immersive experience.`,
    tags: ['Electron', 'React', 'Python', 'Computer Vision'],
    link: 'https://gameguru.com',
    github: 'https://github.com/gaba-dev-1/gameguru',
    images: [
      '/images/gaba.png',
      '/images/gaba.png',
      '/images/gaba.png',
    ],
    features: [
      'Real-time game state recognition',
      'Contextual tips and guides',
      'Performance monitoring',
      'Voice-activated commands',
      'Game lore integration'
    ],
    color: 'accent'
  }
];

export const contact = {
  email: 'contact@gabadev.com',
  github: 'github.com/gaba-dev-1',
  twitter: '@MetaForgeLol',
  discord: 'Gaba#1234',
  discordServer: 'https://discord.gg/gY5PsymH',
  linkedin: 'linkedin.com/in/s%C3%A9bastien-gimenez-ab8b9233a/',
  phone: '+1 (438) 529-2211',
  location: 'Montréal, QC, Canada',
  availability: 'Available for new projects',
  preferredContact: 'Discord'
};
