import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.css']
})
export class ThemeMenuComponent {
  themes = ['default', 'dark-wavy-acidic']; // List of available themes

  constructor(private themeService: ThemeService) {}

  // Change the theme
  changeTheme(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const theme = selectElement.value; // Get the selected theme value
    this.themeService.setTheme(theme);
  }
}