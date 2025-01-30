import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true, // LONE WOLF COMPONENT HOLY CARP
  imports: [FormsModule],
  selector: 'app-export-menu',
  templateUrl: './export-menu.component.html',
  styleUrls: ['./export-menu.component.css']
})
export class ExportMenuComponent {
  @Input() sections: { title: string, text: string }[] = []; // Input: Sections data
  @Output() closeMenu = new EventEmitter<void>(); // Output: Close the menu

  exportTitle: string = ''; // User input for the title
  markdownPreview: string = ''; // Generated Markdown for preview

  // Generate Markdown from sections
  generateMarkdown(): void {
    let markdown = `# ${this.exportTitle}\n\n`; // Level-1 header for the title
    document.querySelectorAll("div.section-container").forEach((section) => {
      let id = section.getAttribute("id");
      let title = section.querySelector(".section-header")?.textContent;
      let text = section.querySelector(".section-body")?.textContent;
      markdown += `## ${title || `Section ${id}`}\n\n`; // Level-2 header for each section
      markdown += `${text}\n\n`; // Section text
    });
    this.markdownPreview = markdown;
  }

  // Copy Markdown to clipboard
  copyMarkdown(): void {
    navigator.clipboard.writeText(this.markdownPreview).then(() => {
      alert('Markdown copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy Markdown: ', err);
    });
  }

  // Close the menu
  onClose(): void {
    this.closeMenu.emit();
  }
}