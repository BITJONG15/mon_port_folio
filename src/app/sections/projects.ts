import { Component, ElementRef, viewChild, afterNextRender, inject } from '@angular/core';
import { SectionContainer } from '../components/section-container';
import { GlassCard } from '../components/glass-card';
import { DataService } from '../services/data.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { inView, animate, stagger } from 'motion';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionContainer, GlassCard, MatIconModule, RouterLink],
  template: `
    <app-section-container id="projects" title="Selected Works">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" #projectsGrid>
        @for (project of dataService.projects(); track project.id) {
          <app-glass-card customClass="project-card !p-0 overflow-hidden flex flex-col group cursor-pointer" [routerLink]="['/project', project.id]">
            <div class="relative h-60 overflow-hidden">
              <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerpolicy="no-referrer" />
              
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end p-6">
                <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 text-[#00f0ff] font-medium">
                  View Details <mat-icon>arrow_forward</mat-icon>
                </div>
              </div>
            </div>
            
            <div class="p-6 flex-1 flex flex-col">
              <h3 class="font-display font-bold text-2xl mb-2 group-hover:text-[#00f0ff] transition-colors">{{ project.title }}</h3>
              <p class="text-white/60 text-sm mb-6 flex-1">{{ project.shortDescription }}</p>
              
              <div class="flex flex-wrap gap-2 mt-auto">
                @for (tech of project.technologies.slice(0, 3); track tech) {
                  <span class="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded">{{ tech }}</span>
                }
                @if (project.technologies.length > 3) {
                  <span class="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded">+{{ project.technologies.length - 3 }}</span>
                }
              </div>
            </div>
          </app-glass-card>
        }
      </div>
    </app-section-container>
  `
})
export class ProjectsSection {
  dataService = inject(DataService);
  projectsGrid = viewChild<ElementRef>('projectsGrid');

  constructor() {
    afterNextRender(() => {
      const grid = this.projectsGrid()?.nativeElement;
      if (grid) {
        const cards = grid.querySelectorAll('.project-card');
        inView(grid, () => {
          animate(
            cards,
            { opacity: [0, 1], y: [50, 0] },
            { delay: stagger(0.15), duration: 0.7, ease: [0.22, 1, 0.36, 1] }
          );
        }, { margin: '-100px' });
      }
    });
  }
}
