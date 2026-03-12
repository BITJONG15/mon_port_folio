import { Component, ElementRef, viewChild, afterNextRender, inject } from '@angular/core';
import { SectionContainer } from '../components/section-container';
import { GlassCard } from '../components/glass-card';
import { DataService } from '../services/data.service';
import { MatIconModule } from '@angular/material/icon';
import { inView, animate, stagger } from 'motion';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionContainer, GlassCard, MatIconModule],
  template: `
    <app-section-container id="skills" title="Technical Arsenal">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" #skillsGrid>
        
        <!-- Frontend -->
        <app-glass-card customClass="skill-card flex flex-col h-full">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-white/5 text-[#00f0ff]">
              <mat-icon>web</mat-icon>
            </div>
            <h3 class="font-display font-semibold text-xl">Frontend</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            @for (skill of dataService.skills().frontend; track skill) {
              <span class="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                {{ skill }}
              </span>
            }
          </div>
        </app-glass-card>

        <!-- Backend -->
        <app-glass-card customClass="skill-card flex flex-col h-full">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-white/5 text-[#8a2be2]">
              <mat-icon>dns</mat-icon>
            </div>
            <h3 class="font-display font-semibold text-xl">Backend</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            @for (skill of dataService.skills().backend; track skill) {
              <span class="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                {{ skill }}
              </span>
            }
          </div>
        </app-glass-card>

        <!-- Database -->
        <app-glass-card customClass="skill-card flex flex-col h-full">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-white/5 text-[#00f0ff]">
              <mat-icon>storage</mat-icon>
            </div>
            <h3 class="font-display font-semibold text-xl">Database</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            @for (skill of dataService.skills().database; track skill) {
              <span class="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                {{ skill }}
              </span>
            }
          </div>
        </app-glass-card>

        <!-- Tools -->
        <app-glass-card customClass="skill-card flex flex-col h-full">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-white/5 text-[#8a2be2]">
              <mat-icon>build</mat-icon>
            </div>
            <h3 class="font-display font-semibold text-xl">Tools</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            @for (skill of dataService.skills().tools; track skill) {
              <span class="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                {{ skill }}
              </span>
            }
          </div>
        </app-glass-card>

      </div>
    </app-section-container>
  `
})
export class SkillsSection {
  dataService = inject(DataService);
  skillsGrid = viewChild<ElementRef>('skillsGrid');

  constructor() {
    afterNextRender(() => {
      const grid = this.skillsGrid()?.nativeElement;
      if (grid) {
        const cards = grid.querySelectorAll('.skill-card');
        inView(grid, () => {
          animate(
            cards,
            { opacity: [0, 1], scale: [0.9, 1], y: [30, 0] },
            { delay: stagger(0.1), duration: 0.6, ease: 'easeOut' }
          );
        }, { margin: '-50px' });
      }
    });
  }
}
