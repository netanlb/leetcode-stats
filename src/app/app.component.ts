import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DarkModeService } from './shared/data-access/dark-mode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'leet-code-stats';
  public darkModeService = inject(DarkModeService);

  ngOnInit() {
    this.darkModeService.applyTheme();
  }
}
