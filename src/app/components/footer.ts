import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <footer class="border-t border-white/10 py-12 mt-24">
      <div class="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="font-display text-2xl font-bold tracking-tighter">
          DEV<span class="text-gradient">.</span>
        </div>
        
        <div class="flex items-center gap-6">
          <a href="#" class="text-white/50 hover:text-white transition-colors">
            <mat-icon>code</mat-icon>
          </a>
          <a href="#" class="text-white/50 hover:text-white transition-colors">
            <mat-icon>work</mat-icon>
          </a>
          <a href="#" class="text-white/50 hover:text-white transition-colors">
            <mat-icon>mail</mat-icon>
          </a>
        </div>
        
        <p class="text-white/50 text-sm">
          &copy; {{ currentYear }} Developer Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  `
})
export class Footer {
  currentYear = new Date().getFullYear();
}
