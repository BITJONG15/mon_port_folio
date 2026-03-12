import { Component, ElementRef, viewChild, afterNextRender, inject } from '@angular/core';
import { AnimatedButton } from '../components/animated-button';
import { DataService } from '../services/data.service';
import { animate, stagger } from 'motion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AnimatedButton, MatIconModule],
  template: `
    <section class="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#8a2be2]/20 to-[#00f0ff]/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center text-center" #heroContent>
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium mb-8 hero-item">
          <span class="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
          {{ dataService.hero().availability }}
        </div>
        
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 hero-item" [innerHTML]="dataService.hero().title + '<br /><span class=\\'text-gradient\\'>' + dataService.hero().subtitle + '</span>'">
        </h1>
        
        <p class="text-lg md:text-xl text-white/70 max-w-2xl mb-10 hero-item font-light">
          {{ dataService.hero().description }}
        </p>
        
        <div class="flex flex-col sm:flex-row items-center gap-4 hero-item">
          <a href="#projects">
            <app-animated-button variant="secondary">
              View Projects <mat-icon class="text-sm">arrow_forward</mat-icon>
            </app-animated-button>
          </a>
          <a href="#contact">
            <app-animated-button variant="outline">
              Contact Me
            </app-animated-button>
          </a>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span class="text-xs tracking-widest uppercase">Scroll</span>
        <mat-icon>keyboard_arrow_down</mat-icon>
      </div>
    </section>
  `
})
export class HeroSection {
  dataService = inject(DataService);
  heroContent = viewChild<ElementRef>('heroContent');

  constructor() {
    afterNextRender(() => {
      const content = this.heroContent()?.nativeElement;
      if (content) {
        const items = content.querySelectorAll('.hero-item');
        animate(
          items,
          { opacity: [0, 1], y: [40, 0] },
          { delay: stagger(0.15, { startDelay: 0.2 }), duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        );
      }
    });
  }
}
