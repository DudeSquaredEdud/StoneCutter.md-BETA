import { Component, viewChildren } from '@angular/core';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-section-container-and-handler',
  imports: [SectionComponent],
  templateUrl: './section-container-and-handler.component.html',
  styleUrl: './section-container-and-handler.component.css'
})
export class SectionContainerAndHandlerComponent {

  // Dynamic ID setting
  id = {
    currentSelected: 0,
    
    setID: function(section: SectionComponent){
      section.elements().id = this.currentSelected;
      this.currentSelected++;
    },

    setAllID: function(components: SectionComponent[]){
      this.currentSelected = 0;
      components.forEach(sec => {
        this.setID(sec);
      });
    },
  }

  sectionComponents = viewChildren(SectionComponent);

  sections = {
    count: 1,
    components: this.sectionComponents,
    range: function() {
      let r = [];
      for (let i = 0; i < this.count; i++) {
        r.push(i);
      }
      return r;
    },
    newSection: function(event: MouseEvent) {
      this.count++;
    },
    delete: (id: number) => { // Use an arrow function to preserve `this`
      if (this.sections.count > 1) { // Ensure there's always at least one section
        // Remove the section with the specified ID
        this.sections.count--;
        // Reassign IDs after deletion
        const mutableComponents = [...this.sectionComponents()]; // Create a mutable copy
        this.id.setAllID(mutableComponents);
      }
    },
  }

  ngAfterViewInit(): void {
    // Ensure IDs are set correctly after view initialization
    const mutableComponents = [...this.sectionComponents()]; // Create a mutable copy
    this.id.setAllID(mutableComponents);
  }
}