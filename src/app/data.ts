export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  technologies: string[];
  architecture: string;
  githubUrl: string;
  liveUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'nexus-ecommerce',
    title: 'Nexus E-Commerce',
    shortDescription: 'A high-performance headless e-commerce platform.',
    fullDescription: 'Nexus is a modern headless e-commerce solution built for speed and scalability. It features a custom storefront, real-time inventory management, and seamless payment integration.',
    image: 'https://picsum.photos/seed/ecommerce/800/600',
    gallery: [
      'https://picsum.photos/seed/ecommerce1/800/600',
      'https://picsum.photos/seed/ecommerce2/800/600'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    architecture: 'Microservices architecture with a GraphQL API gateway. The frontend is statically generated and revalidated on demand.',
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 'aether-analytics',
    title: 'Aether Analytics',
    shortDescription: 'Real-time data visualization dashboard.',
    fullDescription: 'Aether provides deep insights into user behavior with real-time analytics, custom reporting, and predictive modeling using machine learning.',
    image: 'https://picsum.photos/seed/analytics/800/600',
    gallery: [
      'https://picsum.photos/seed/analytics1/800/600',
      'https://picsum.photos/seed/analytics2/800/600'
    ],
    technologies: ['Vue.js', 'Python', 'Django', 'MongoDB'],
    architecture: 'Event-driven architecture using Apache Kafka for data ingestion and ClickHouse for fast analytical queries.',
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 'nova-social',
    title: 'Nova Social App',
    shortDescription: 'Decentralized social networking platform.',
    fullDescription: 'Nova is a privacy-first social network that gives users full control over their data. It features end-to-end encrypted messaging and decentralized content hosting.',
    image: 'https://picsum.photos/seed/social/800/600',
    gallery: [
      'https://picsum.photos/seed/social1/800/600',
      'https://picsum.photos/seed/social2/800/600'
    ],
    technologies: ['React Native', 'Node.js', 'Firebase', 'WebRTC'],
    architecture: 'Peer-to-peer network topology for messaging, with a distributed hash table (DHT) for user discovery.',
    githubUrl: '#',
    liveUrl: '#'
  }
];

export const SKILLS = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Flutter', 'React Native', 'Ionic', 'Angular'],
  backend: ['Node.js', 'PHP', 'Django', 'Express', 'NestJS'],
  database: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Firebase'],
  tools: ['Git', 'VS Code', 'Docker', 'Figma', 'AWS']
};

export const EXPERIENCE = [
  {
    year: '2023 - Present',
    role: 'Senior Full Stack Engineer',
    company: 'TechNova Inc.',
    description: 'Leading the development of enterprise-grade web applications. Architected a microservices backend that improved system scalability by 40%.'
  },
  {
    year: '2021 - 2023',
    role: 'Frontend Developer',
    company: 'Creative Digital',
    description: 'Developed interactive user interfaces for high-profile clients. Implemented complex animations and optimized web performance.'
  },
  {
    year: '2019 - 2021',
    role: 'Software Engineering Intern',
    company: 'Innovate Solutions',
    description: 'Assisted in building internal tools and RESTful APIs. Gained hands-on experience with agile methodologies and CI/CD pipelines.'
  },
  {
    year: '2015 - 2019',
    role: 'B.S. Computer Science',
    company: 'University of Technology',
    description: 'Graduated with honors. Specialized in software engineering and human-computer interaction.'
  }
];
