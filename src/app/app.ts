import {ChangeDetectionStrategy, Component, HostListener, inject} from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class App {
  private router = inject(Router);

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === '5') {
      event.preventDefault();
      this.router.navigate(['/admin']);
    }
  }
}
