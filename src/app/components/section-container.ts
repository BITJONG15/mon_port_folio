import { Component, input, ElementRef, afterNextRender, viewChild } from '@angular/core';
import { inView, animate } from 'motion';

@Component({
  selector: 'app-section-container',
  standalone: true,
  template: `
    <section [id]="id()" class="py-24 relative" #sectionRef>
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        @if (title()) {
          <div class="mb-16" #headerRef>
            <h2 class="font-display text-4xl md:text-5xl font-bold mb-4">{{ title() }}</h2>
            <div class="h-1 w-20 bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] rounded-full"></div>
          </div>
        }
        <div #contentRef>
          <ng-content></ng-content>
        </div>
      </div>
    </section>
  `
})
export class SectionContainer {
  id = input<string>('');
  title = input<string>('');
  
  sectionRef = viewChild<ElementRef>('sectionRef');
  headerRef = viewChild<ElementRef>('headerRef');
  contentRef = viewChild<ElementRef>('contentRef');

  constructor() {
    afterNextRender(() => {
      const header = this.headerRef()?.nativeElement;
      const content = this.contentRef()?.nativeElement;

      if (header) {
        inView(header, () => {
          animate(header, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, ease: 'easeOut' });
        }, { margin: '-100px' });
      }

      if (content) {
        inView(content, () => {
          animate(content, { opacity: [0, 1], y: [40, 0] }, { duration: 0.8, delay: 0.2, ease: 'easeOut' });
        }, { margin: '-100px' });
      }
    });
  }
}
