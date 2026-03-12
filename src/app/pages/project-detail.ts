import { Component, OnInit, ElementRef, viewChild, afterNextRender, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Project } from '../data';
import { DataService } from '../services/data.service';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { GlassCard } from '../components/glass-card';
import { AnimatedButton } from '../components/animated-button';
import { MatIconModule } from '@angular/material/icon';
import { animate, stagger } from 'motion';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [Navbar, Footer, GlassCard, AnimatedButton, MatIconModule, RouterLink],
  template: `
    <app-navbar></app-navbar>
    
    <main class="pt-32 pb-24 min-h-screen" #pageContent>
      @if (project) {
        <div class="max-w-5xl mx-auto px-6 md:px-12">
          
          <a routerLink="/" class="inline-flex items-center gap-2 text-white/50 hover:text-[#00f0ff] transition-colors mb-8 animate-item">
            <mat-icon>arrow_back</mat-icon> Back to Portfolio
          </a>
          
          <h1 class="font-display text-4xl md:text-6xl font-bold mb-6 animate-item">{{ project.title }}</h1>
          
          <div class="flex flex-wrap gap-3 mb-10 animate-item">
            @for (tech of project.technologies; track tech) {
              <span class="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-[#00f0ff]">{{ tech }}</span>
            }
          </div>
          
          <div class="aspect-video rounded-2xl overflow-hidden mb-16 animate-item shadow-[0_0_40px_rgba(0,240,255,0.1)]">
            <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div class="lg:col-span-2 flex flex-col gap-8 animate-item">
              <section>
                <h2 class="font-display text-2xl font-bold mb-4">Overview</h2>
                <p class="text-white/70 leading-relaxed text-lg font-light">{{ project.fullDescription }}</p>
              </section>
              
              <section>
                <h2 class="font-display text-2xl font-bold mb-4">Architecture</h2>
                <p class="text-white/70 leading-relaxed text-lg font-light">{{ project.architecture }}</p>
              </section>
            </div>
            
            <div class="flex flex-col gap-6 animate-item">
              <app-glass-card customClass="!p-6">
                <h3 class="font-display text-xl font-bold mb-6">Links</h3>
                <div class="flex flex-col gap-4">
                  <a [href]="project.liveUrl" target="_blank" class="w-full">
                    <app-animated-button variant="secondary" customClass="w-full">
                      Live Demo <mat-icon class="text-sm">open_in_new</mat-icon>
                    </app-animated-button>
                  </a>
                  <a [href]="project.githubUrl" target="_blank" class="w-full">
                    <app-animated-button variant="outline" customClass="w-full">
                      GitHub Repo <mat-icon class="text-sm">code</mat-icon>
                    </app-animated-button>
                  </a>
                </div>
              </app-glass-card>
            </div>
          </div>
          
          <section class="animate-item">
            <h2 class="font-display text-2xl font-bold mb-8">Gallery</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              @for (img of project.gallery; track img) {
                <div class="aspect-video rounded-xl overflow-hidden glass-panel">
                  <img [src]="img" alt="Gallery Image" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerpolicy="no-referrer" />
                </div>
              }
            </div>
          </section>
          
        </div>
      } @else {
        <div class="flex items-center justify-center h-[50vh]">
          <h2 class="text-2xl font-display">Project not found</h2>
        </div>
      }
    </main>
    
    <app-footer></app-footer>
  `
})
export class ProjectDetailPage implements OnInit {
  project: Project | undefined;
  pageContent = viewChild<ElementRef>('pageContent');
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  constructor() {
    afterNextRender(() => {
      window.scrollTo(0, 0);
      const content = this.pageContent()?.nativeElement;
      if (content) {
        const items = content.querySelectorAll('.animate-item');
        animate(
          items,
          { opacity: [0, 1], y: [30, 0] },
          { delay: stagger(0.1), duration: 0.6, ease: 'easeOut' }
        );
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.project = this.dataService.projects().find(p => p.id === id);
  }
}
