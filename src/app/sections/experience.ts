import { Component, ElementRef, viewChild, afterNextRender, inject } from '@angular/core';
import { SectionContainer } from '../components/section-container';
import { GlassCard } from '../components/glass-card';
import { DataService } from '../services/data.service';
import { inView, animate, stagger } from 'motion';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionContainer, GlassCard],
  template: `
    <app-section-container id="experience" title="Experience & Education">
      <div class="relative max-w-4xl mx-auto" #timeline>
        <!-- Vertical Line -->
        <div class="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00f0ff] via-[#8a2be2] to-transparent -translate-x-1/2 opacity-30"></div>
        
        <div class="flex flex-col gap-12">
          @for (item of dataService.experience(); track item.year; let i = $index) {
            <div class="timeline-item relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group">
              
              <!-- Dot -->
              <div class="absolute left-[15px] md:left-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#00f0ff] -translate-x-1/2 mt-6 md:mt-0 z-10 group-hover:bg-[#00f0ff] group-hover:shadow-[0_0_15px_#00f0ff] transition-all duration-300"></div>
              
              <!-- Left Content (Empty on mobile, alternating on desktop) -->
              <div class="hidden md:block w-5/12 text-right pr-8" [class.md:order-1]="i % 2 !== 0">
                @if (i % 2 === 0) {
                  <div class="font-mono text-[#00f0ff] font-medium mb-2">{{ item.year }}</div>
                  <h4 class="font-display text-xl font-bold">{{ item.role }}</h4>
                  <div class="text-white/50 text-sm mb-4">{{ item.company }}</div>
                }
              </div>
              
              <!-- Right Content (Full width on mobile, alternating on desktop) -->
              <div class="w-full md:w-5/12 pl-12 md:pl-8" [class.md:order-3]="i % 2 !== 0" [class.md:text-right]="i % 2 !== 0">
                <!-- Mobile Only Header -->
                <div class="md:hidden mb-4">
                  <div class="font-mono text-[#00f0ff] font-medium mb-1">{{ item.year }}</div>
                  <h4 class="font-display text-xl font-bold">{{ item.role }}</h4>
                  <div class="text-white/50 text-sm">{{ item.company }}</div>
                </div>
                
                <!-- Desktop alternating header -->
                @if (i % 2 !== 0) {
                  <div class="hidden md:block">
                    <div class="font-mono text-[#00f0ff] font-medium mb-2">{{ item.year }}</div>
                    <h4 class="font-display text-xl font-bold">{{ item.role }}</h4>
                    <div class="text-white/50 text-sm mb-4">{{ item.company }}</div>
                  </div>
                }
                
                <app-glass-card customClass="!p-5 text-left">
                  <p class="text-white/70 text-sm leading-relaxed">{{ item.description }}</p>
                </app-glass-card>
              </div>
              
            </div>
          }
        </div>
      </div>
    </app-section-container>
  `
})
export class ExperienceSection {
  dataService = inject(DataService);
  timeline = viewChild<ElementRef>('timeline');

  constructor() {
    afterNextRender(() => {
      const container = this.timeline()?.nativeElement;
      if (container) {
        const items = container.querySelectorAll('.timeline-item');
        inView(container, () => {
          animate(
            items,
            { opacity: [0, 1], x: [0, 0] }, // Using simple fade to avoid complex x transforms with flex layout
            { delay: stagger(0.2), duration: 0.8, ease: 'easeOut' }
          );
        }, { margin: '-100px' });
      }
    });
  }
}
