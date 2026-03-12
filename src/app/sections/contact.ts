import { Component, inject } from '@angular/core';
import { SectionContainer } from '../components/section-container';
import { GlassCard } from '../components/glass-card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionContainer, GlassCard, MatIconModule, ReactiveFormsModule],
  template: `
    <app-section-container id="contact" title="Get In Touch">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div>
          <h3 class="font-display text-3xl font-bold mb-6">Let's build something amazing together.</h3>
          <p class="text-white/60 mb-10 text-lg font-light">
            Whether you have a project in mind, a question, or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div class="flex flex-col gap-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#00f0ff]">
                <mat-icon>email</mat-icon>
              </div>
              <div>
                <div class="text-sm text-white/50 mb-1">Email</div>
                <a href="mailto:hello@example.com" class="font-medium hover:text-[#00f0ff] transition-colors">hello&#64;example.com</a>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#8a2be2]">
                <mat-icon>location_on</mat-icon>
              </div>
              <div>
                <div class="text-sm text-white/50 mb-1">Location</div>
                <div class="font-medium">San Francisco, CA</div>
              </div>
            </div>
          </div>
          
          <div class="mt-12 flex items-center gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00f0ff] hover:text-black transition-all duration-300">
              <mat-icon class="text-sm">link</mat-icon>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#8a2be2] hover:text-white transition-all duration-300">
              <mat-icon class="text-sm">work</mat-icon>
            </a>
          </div>
        </div>
        
        <app-glass-card>
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-6">
            
            <div class="flex flex-col gap-2">
              <label for="name" class="text-sm font-medium text-white/70">Name</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name"
                class="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] focus:bg-white/10 transition-all duration-300"
                placeholder="John Doe"
              />
            </div>
            
            <div class="flex flex-col gap-2">
              <label for="email" class="text-sm font-medium text-white/70">Email</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email"
                class="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] focus:bg-white/10 transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>
            
            <div class="flex flex-col gap-2">
              <label for="message" class="text-sm font-medium text-white/70">Message</label>
              <textarea 
                id="message" 
                formControlName="message"
                rows="5"
                class="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] focus:bg-white/10 transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button type="submit" class="w-full mt-2 relative overflow-hidden rounded-full font-medium tracking-wide transition-all duration-300 group bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] text-white px-6 py-3 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
              <span class="relative z-10 flex items-center justify-center gap-2">
                Send Message <mat-icon class="text-sm">send</mat-icon>
              </span>
              <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full"></div>
            </button>
            
          </form>
        </app-glass-card>
        
      </div>
    </app-section-container>
  `
})
export class ContactSection {
  contactForm;
  private fb = inject(FormBuilder);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Reset form or show success message
      this.contactForm.reset();
      alert('Message sent successfully! (Mock)');
    }
  }
}
