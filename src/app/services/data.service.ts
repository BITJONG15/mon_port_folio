import { Injectable, signal, computed } from '@angular/core';
import { PROJECTS, SKILLS, EXPERIENCE, Project } from '../data';

export interface PortfolioData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    availability: string;
  };
  about: {
    title: string;
    description: string;
    image: string;
    stats: { label: string; value: string }[];
  };
  projects: Project[];
  skills: typeof SKILLS;
  experience: typeof EXPERIENCE;
}

const DEFAULT_HERO = {
  title: 'Crafting Digital',
  subtitle: 'Experiences',
  description: "I'm a Full Stack Developer specializing in building exceptional digital experiences with modern technologies and elegant design.",
  availability: 'Available for new opportunities'
};

const DEFAULT_ABOUT = {
  title: 'About Me',
  description: "Hello! I'm a passionate software engineer who enjoys building things that live on the internet. My interest in web development started back in 2015 when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS taught me a lot about HTML & CSS!\n\nFast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.",
  image: 'https://picsum.photos/seed/developer/800/1000',
  stats: [
    { label: 'Years Experience', value: '8+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly STORAGE_KEY = 'portfolio_data';
  
  private dataSignal = signal<PortfolioData>(this.loadData());

  hero = computed(() => this.dataSignal().hero || DEFAULT_HERO);
  about = computed(() => this.dataSignal().about || DEFAULT_ABOUT);
  projects = computed(() => this.dataSignal().projects);
  skills = computed(() => this.dataSignal().skills);
  experience = computed(() => this.dataSignal().experience);

  private loadData(): PortfolioData {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse portfolio data from localStorage', e);
        }
      }
    }
    return {
      hero: DEFAULT_HERO,
      about: DEFAULT_ABOUT,
      projects: PROJECTS,
      skills: SKILLS,
      experience: EXPERIENCE
    };
  }

  saveData(newData: PortfolioData) {
    this.dataSignal.set(newData);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newData));
    }
  }

  resetData() {
    const defaultData = {
      hero: DEFAULT_HERO,
      about: DEFAULT_ABOUT,
      projects: PROJECTS,
      skills: SKILLS,
      experience: EXPERIENCE
    };
    this.saveData(defaultData);
  }
}
