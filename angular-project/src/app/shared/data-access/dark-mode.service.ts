import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public darkMode = signal(true);

  constructor() { }

  public applyTheme(): void {
    const saved = localStorage.getItem('isDark');
    const prefersDark = saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.darkMode.set(prefersDark);

    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  public toggleTheme(): void {
    this.darkMode.set(!this.darkMode());
    localStorage.setItem('isDark', JSON.stringify(this.darkMode()));
    document.documentElement.classList.toggle('dark');
  }
}
