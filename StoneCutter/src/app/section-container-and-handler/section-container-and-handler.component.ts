import { Component, ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-section-container-and-handler',
  templateUrl: './section-container-and-handler.component.html',
  styleUrl: './section-container-and-handler.component.css',
  imports: [SectionComponent],
})
export class SectionContainerAndHandlerComponent implements AfterViewChecked {
  // Track section components
  @ViewChildren(SectionComponent) sectionComponents!: QueryList<SectionComponent>;

  // Array to track sections with unique IDs
  sections: { id: number }[] = [{ id: 0 }]; // Start with one section

  // Counter for generating unique IDs
  private nextId = 1;

  // Add a new section
  newSection(): void {
    this.sections = [...this.sections, { id: this.nextId++ }];
  }

  // Delete a section by its unique ID
  deleteSection(id: number): void {
    if (this.sections.length > 1) {
      // Remove the section with the specified ID
      this.sections = this.sections.filter(section => section.id !== id);
      // Reassign IDs after the DOM updates
      this.reassignSectionIDs();
    }
  }

  // Reassign IDs sequentially after changes
  private reassignSectionIDs(): void {
    setTimeout(() => { // Ensure DOM has updated
      this.sectionComponents.forEach((section, index) => {
        section.elements().id = index;
      });
    });
  }

  // Track sections by their unique ID
  trackBySectionId(index: number, section: { id: number }): number {
    return section.id;
  }

  ngAfterViewChecked(): void {
    // Ensure IDs are updated after Angular's change detection
    this.reassignSectionIDs();
  }
}