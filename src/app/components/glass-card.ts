import { Component, input } from '@angular/core';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  template: `
    <div [class]="'glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_0_rgba(0,240,255,0.15)] ' + customClass()">
      <ng-content></ng-content>
    </div>
  `
})
export class GlassCard {
  customClass = input<string>('');
}
