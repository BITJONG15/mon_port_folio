import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService, PortfolioData } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { GlassCard } from '../components/glass-card';
import { AnimatedButton } from '../components/animated-button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, GlassCard, AnimatedButton],
  template: `
    <div class="min-h-screen bg-[#050505] text-white p-6 md:p-12 pt-24 pb-32">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h1 class="font-display text-3xl font-bold flex items-center gap-3">
            <mat-icon class="text-[#00f0ff]">admin_panel_settings</mat-icon>
            Portfolio Admin
          </h1>
          <a routerLink="/" class="text-white/50 hover:text-white transition-colors flex items-center gap-2">
            <mat-icon>arrow_back</mat-icon> Back to Site
          </a>
        </div>

        <app-glass-card customClass="!p-6 mb-8">
          <p class="text-white/70 mb-4">
            Edit your portfolio data in JSON format below. Make sure the JSON is valid before saving.
          </p>
          
          @if (errorMsg()) {
            <div class="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-4">
              {{ errorMsg() }}
            </div>
          }
          @if (successMsg()) {
            <div class="bg-green-500/20 border border-green-500/50 text-green-200 p-4 rounded-lg mb-4">
              {{ successMsg() }}
            </div>
          }

          <textarea 
            [(ngModel)]="jsonData" 
            class="w-full h-[500px] bg-[#0a0a0a] border border-white/10 rounded-xl p-4 font-mono text-sm text-white/90 focus:outline-none focus:border-[#00f0ff] transition-colors resize-y"
            spellcheck="false"
          ></textarea>

          <div class="flex flex-wrap gap-4 mt-6">
            <app-animated-button (click)="saveData()">
              <mat-icon class="text-sm">save</mat-icon> Save Changes
            </app-animated-button>
            
            <app-animated-button variant="outline" (click)="resetData()">
              <mat-icon class="text-sm">restart_alt</mat-icon> Reset to Default
            </app-animated-button>
          </div>
        </app-glass-card>
      </div>
    </div>
  `
})
export class AdminPage {
  private dataService = inject(DataService);
  
  jsonData = signal<string>('');
  errorMsg = signal<string>('');
  successMsg = signal<string>('');

  constructor() {
    this.loadCurrentData();
  }

  loadCurrentData() {
    const currentData: PortfolioData = {
      hero: this.dataService.hero(),
      about: this.dataService.about(),
      projects: this.dataService.projects(),
      skills: this.dataService.skills(),
      experience: this.dataService.experience()
    };
    this.jsonData.set(JSON.stringify(currentData, null, 2));
  }

  saveData() {
    try {
      this.errorMsg.set('');
      this.successMsg.set('');
      const parsed = JSON.parse(this.jsonData());
      this.dataService.saveData(parsed);
      this.successMsg.set('Portfolio data saved successfully!');
      setTimeout(() => this.successMsg.set(''), 3000);
    } catch (e: any) {
      this.errorMsg.set('Invalid JSON format: ' + e.message);
    }
  }

  resetData() {
    if (confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      this.dataService.resetData();
      this.loadCurrentData();
      this.successMsg.set('Data reset to defaults.');
      setTimeout(() => this.successMsg.set(''), 3000);
    }
  }
}
