import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<string>('default');
  currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {}

  // Set the current theme
  setTheme(theme: string): void {
    this.currentThemeSubject.next(theme);
  }

  // Get the current theme
  getCurrentTheme(): string {
    return this.currentThemeSubject.value;
  }
}