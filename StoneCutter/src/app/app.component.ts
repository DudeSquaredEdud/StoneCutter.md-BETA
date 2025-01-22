import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {SectionContainerAndHandlerComponent} from './section-container-and-handler/section-container-and-handler.component';
import { ThemeService } from './services/theme.service';
import { ThemeMenuComponent } from './theme-menu/theme-menu.component';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, SectionContainerAndHandlerComponent, ThemeMenuComponent, NgClass,],  
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentTheme: string = 'default';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
      console.log('Current Theme:', this.currentTheme); // Debugging: Log the current theme
    });
  }
}