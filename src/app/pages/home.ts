import { Component } from '@angular/core';
import { Navbar } from '../components/navbar';
import { HeroSection } from '../sections/hero';
import { AboutSection } from '../sections/about';
import { SkillsSection } from '../sections/skills';
import { ProjectsSection } from '../sections/projects';
import { ExperienceSection } from '../sections/experience';
import { ContactSection } from '../sections/contact';
import { Footer } from '../components/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Navbar,
    HeroSection,
    AboutSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    ContactSection,
    Footer
  ],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-skills></app-skills>
      <app-projects></app-projects>
      <app-experience></app-experience>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
  `
})
export class HomePage {}
