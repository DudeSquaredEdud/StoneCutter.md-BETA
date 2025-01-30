import { Component, ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionComponent } from '../section/section.component';
import { ExportMenuComponent } from '../export-menu/export-menu.component';
import { GitService } from '../services/git.service';
import { HttpClientModule } from '@angular/common/http'; 
import { GithubTokenModalComponent } from '../github-token-modal/github-token-modal.component';
import { tsnt } from '../tsnt';

@Component({
  selector: 'app-section-container-and-handler',
  templateUrl: './section-container-and-handler.component.html',
  styleUrl: './section-container-and-handler.component.css',
  imports: [SectionComponent, ExportMenuComponent, FormsModule, HttpClientModule, GithubTokenModalComponent],
  providers: [GitService]
})
export class SectionContainerAndHandlerComponent {
  @ViewChildren(SectionComponent) sectionComponents!: QueryList<SectionComponent>;

  nextId = 0;
  sections: { id: number }[] = [{ id: this.nextId }];

  title: string = "New Post";

  showExportMenu = false;
  showGitPushModal = false; // Control visibility of the Git push modal

  repoUrl: string = ''; // Git repository URL
  branch: string = 'main'; // Git branch
  commitMessage: string = ''; // Commit message

  constructor(private gitService: GitService) {}

  // Open the Git push modal
  openGitPushModal(): void {
    this.showGitPushModal = true;
  }

  // Close the Git push modal
  closeGitPushModal(): void {
    this.showGitPushModal = false;
  }

// Push content to Git
pushToGit(): void {
  const sectionData = this.getSectionData();

  // Combine all sections into a single Markdown string
  let markdownContent =  () => {
    let markdown = `# ${document.querySelector("#title")?.textContent}\n\n`; // Level-1 header for the title
    document.querySelectorAll("div.section-container").forEach((section) => {
      let id = section.getAttribute("id");
      let title = section.querySelector(".section-header")?.textContent;
      let text = section.querySelector(".section-body")?.textContent;
      markdown += `## ${title || `Section ${id}`}\n\n`; // Level-2 header for each section
      markdown += `${text}\n\n`; // Section text
    });
    return markdown;
  }

  // Push the combined Markdown content to GitHub
  this.gitService
    .appendToBlog(this.repoUrl, this.branch, this.commitMessage, markdownContent())
    .subscribe({
      next: (response) => {
        alert('Content pushed to Git successfully!');
      },
      error: (error) => {
        alert('Failed to push content to Git: ' + error.error?.details || error.message);
      },
    });
}

showTokenModal = false;

  openTokenModal(): void {
    this.showTokenModal = true;
  }

  onTokenSaved(token: string): void {
    this.showTokenModal = false;
    // Optionally, notify the user that the token was saved
    console.log('GitHub token saved:', token);
  }

// Get section data for export
  getSectionData(): { title: string; text: string }[] {
  return this.sectionComponents.map((section) => {
    const titleElement = section.elements().title;
    const textElement = section.elements().text;

    return {
      title: titleElement?.textContent || `Section ${section.elements().id + 1}`, // Fallback title
      text: textElement?.textContent || '', // Fallback text
    };
  });
}

  // Add a new section
  newSection(): void {
    this.sections = [...this.sections, { id: ++this.nextId }];
    console.log(this.sections);
  }

  // Delete a section by its unique ID
  deleteSection(id: number): void {
    if (this.sections.length > 1) {
      this.sections = this.sections.filter(section => section.id !== id);
    }
  }

  // Open the export menu
  openExportMenu(): void {
    this.showExportMenu = true;
  }

  // Close the export menu
  closeExportMenu(): void {
    this.showExportMenu = false;
  }

  getNextId(): number {
    return this.nextId++;
  }
}
