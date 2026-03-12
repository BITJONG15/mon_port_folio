import { Component, inject } from '@angular/core';
import { SectionContainer } from '../components/section-container';
import { GlassCard } from '../components/glass-card';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionContainer, GlassCard, MatIconModule],
  template: `
    <app-section-container id="about" [title]="dataService.about().title">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-5 relative">
          <div class="aspect-[4/5] rounded-2xl overflow-hidden relative group">
            <div class="absolute inset-0 bg-gradient-to-tr from-[#8a2be2]/40 to-transparent mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
            <img [src]="dataService.about().image" alt="Developer Portrait" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerpolicy="no-referrer" />
          </div>
          <!-- Floating badge -->
          <app-glass-card customClass="absolute -bottom-6 -right-6 !p-4 flex items-center gap-4 animate-[bounce_4s_infinite]">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#8a2be2] flex items-center justify-center">
              <mat-icon class="text-white">code</mat-icon>
            </div>
            <div>
              <div class="font-bold text-xl">{{ dataService.about().stats[0]?.value || '8+' }}</div>
              <div class="text-xs text-white/70 uppercase tracking-wider">{{ dataService.about().stats[0]?.label || 'Years Exp.' }}</div>
            </div>
          </app-glass-card>
        </div>
        
        <div class="lg:col-span-7 flex flex-col gap-6">
          <p class="text-white/70 leading-relaxed text-lg font-light whitespace-pre-wrap">{{ dataService.about().description }}</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <app-glass-card customClass="!p-5 flex items-start gap-4">
              <mat-icon class="text-[#00f0ff]">architecture</mat-icon>
              <div>
                <h4 class="font-medium mb-1">Architecture</h4>
                <p class="text-sm text-white/60">Designing scalable and resilient systems.</p>
              </div>
            </app-glass-card>
            <app-glass-card customClass="!p-5 flex items-start gap-4">
              <mat-icon class="text-[#8a2be2]">design_services</mat-icon>
              <div>
                <h4 class="font-medium mb-1">UI/UX</h4>
                <p class="text-sm text-white/60">Crafting intuitive and beautiful interfaces.</p>
              </div>
            </app-glass-card>
          </div>
        </div>
      </div>
    </app-section-container>
  `
})
export class AboutSection {
  dataService = inject(DataService);
}
