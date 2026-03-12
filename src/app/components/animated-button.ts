import { Component, input } from '@angular/core';

@Component({
  selector: 'app-animated-button',
  standalone: true,
  template: `
    <button [class]="'relative overflow-hidden rounded-full font-medium tracking-wide transition-all duration-300 group ' + getVariantClasses() + ' ' + customClass()">
      <span class="relative z-10 flex items-center justify-center gap-2">
        <ng-content></ng-content>
      </span>
      <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full"></div>
    </button>
  `
})
export class AnimatedButton {
  variant = input<'primary' | 'secondary' | 'outline'>('primary');
  customClass = input<string>('');

  getVariantClasses(): string {
    switch (this.variant()) {
      case 'primary':
        return 'bg-white text-black px-6 py-3 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]';
      case 'secondary':
        return 'bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] text-white px-6 py-3 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]';
      case 'outline':
        return 'border border-white/20 bg-transparent text-white px-6 py-3 hover:border-white/50';
      default:
        return '';
    }
  }
}
