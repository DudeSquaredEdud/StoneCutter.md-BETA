import { Component, HostListener, viewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {SectionContainerAndHandlerComponent} from './section-container-and-handler/section-container-and-handler.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SectionContainerAndHandlerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'StoneCutter';
  sectionContainer = viewChild(SectionContainerAndHandlerComponent);


};

