import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitService {
  private backendUrl = 'http://localhost:3000'; // Backend server URL

  constructor(private http: HttpClient) {}

  // Fetch the current content of blog.md
  fetchBlogContent(repoUrl: string, branch: string): Observable<string> {
    const body = { repoUrl, branch, filePath: 'blog.md' };
    return this.http.post<{ content: string }>(`${this.backendUrl}/fetch-file`, body).pipe(
      map((response) => response.content),
      catchError((error) => {
        console.error('Failed to fetch blog.md:', error);
        throw error;
      }),
    );
  }

pushToGit(repoUrl: string, branch: string, commitMessage: string, content: string): Observable<any> {
  const token = localStorage.getItem('githubToken'); // Get the token from localStorage
  const body = { repoUrl, branch, commitMessage, content, token }; // Include the token in the request
  return this.http.post(`${this.backendUrl}/push-to-git`, body);
}

  // Append new content to blog.md below the specified section
  appendToBlog(repoUrl: string, branch: string, commitMessage: string, newContent: string): Observable<any> {
    return this.fetchBlogContent(repoUrl, branch).pipe(
      switchMap((blogContent) => {
        // Locate the insertion point (below the specified section)
        const insertionPoint = blogContent.indexOf('---', blogContent.indexOf('# Blog')) + 4; // Find the second `---` after `# Blog`
        if (insertionPoint === -1) {
          throw new Error('Could not find the insertion point in blog.md');
        }

        // Insert the new content
        const updatedContent =
          blogContent.slice(0, insertionPoint) + // Content before the insertion point
          '\n\n' + // Add some spacing
          newContent + // New content
          blogContent.slice(insertionPoint); // Content after the insertion point

        // Push the updated content back to the repository
        return this.pushToGit(repoUrl, branch, commitMessage, updatedContent);
      }),
    );
  }
}