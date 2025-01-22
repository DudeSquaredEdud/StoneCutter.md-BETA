import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-github-token-modal',
  templateUrl: './github-token-modal.component.html',
  styleUrls: ['./github-token-modal.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule], 
})
export class GithubTokenModalComponent {
  @Output() tokenSaved = new EventEmitter<string>();
  tokenForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tokenForm = this.fb.group({
      token: ['', Validators.required],
    });
  }

  saveToken(): void {
    if (this.tokenForm.valid) {
      const token = this.tokenForm.value.token;
      localStorage.setItem('githubToken', token); // Save token to localStorage
      this.tokenSaved.emit(token); // Notify parent component
      this.closeModal();
    }
  }

  closeModal(): void {
    this.tokenForm.reset();
    // Add logic to close the modal (e.g., using a service or *ngIf)
  }
}