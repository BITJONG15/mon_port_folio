import { Component, signal, HostListener, afterNextRender, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate } from 'motion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <!-- Desktop Navbar -->
    <nav #navRef [class]="'fixed top-0 left-0 w-full z-50 transition-all duration-300 hidden md:block ' + (scrolled() ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6')">
      <div class="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a routerLink="/" class="font-display text-2xl font-bold tracking-tighter">
          DEV<span class="text-gradient">.</span>
        </a>

        <div class="flex items-center gap-8">
          <a href="/#about" class="text-sm font-medium text-white/70 hover:text-white transition-colors">About</a>
          <a href="/#skills" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Skills</a>
          <a href="/#projects" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Projects</a>
          <a href="/#experience" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Experience</a>
          <a href="/#contact" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Mobile Top Bar (Just Logo) -->
    <div class="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 py-4 px-6 md:hidden">
      <a routerLink="/" class="font-display text-2xl font-bold tracking-tighter">
        DEV<span class="text-gradient">.</span>
      </a>
    </div>

    <!-- Mobile Bottom Navbar -->
    <nav class="fixed bottom-0 left-0 w-full z-50 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 py-3 px-6 md:hidden pb-[env(safe-area-inset-bottom,1rem)]">
      <div class="flex items-center justify-between">
        <a href="/#about" class="flex flex-col items-center gap-1 text-white/70 hover:text-[#00f0ff] transition-colors">
          <mat-icon>person</mat-icon>
          <span class="text-[10px] font-medium">About</span>
        </a>
        <a href="/#skills" class="flex flex-col items-center gap-1 text-white/70 hover:text-[#00f0ff] transition-colors">
          <mat-icon>build</mat-icon>
          <span class="text-[10px] font-medium">Skills</span>
        </a>
        <a href="/#projects" class="flex flex-col items-center gap-1 text-white/70 hover:text-[#00f0ff] transition-colors">
          <mat-icon>work</mat-icon>
          <span class="text-[10px] font-medium">Projects</span>
        </a>
        <a href="/#experience" class="flex flex-col items-center gap-1 text-white/70 hover:text-[#00f0ff] transition-colors">
          <mat-icon>timeline</mat-icon>
          <span class="text-[10px] font-medium">Exp</span>
        </a>
        <a href="/#contact" class="flex flex-col items-center gap-1 text-white/70 hover:text-[#00f0ff] transition-colors">
          <mat-icon>mail</mat-icon>
          <span class="text-[10px] font-medium">Contact</span>
        </a>
      </div>
    </nav>
  `
})
export class Navbar {
  scrolled = signal(false);
  navRef = viewChild<ElementRef>('navRef');

  constructor() {
    afterNextRender(() => {
      const nav = this.navRef()?.nativeElement;
      if (nav) {
        animate(nav, { y: [-100, 0], opacity: [0, 1] }, { duration: 0.8, ease: 'easeOut' });
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 50);
  }
}
