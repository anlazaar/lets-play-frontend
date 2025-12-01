import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
  providers: [UserService],
  templateUrl: './updateProfile.html',
  styleUrl: './updateProfile.css',
})
export class UpdateProfile {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public selectedFile: File | null = null;
  public avatarPreview: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.fileError = 'Only images are allowed.';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5 MB limit
      this.fileError = 'File is too large. Max 5MB.';
      return;
    }

    this.fileError = null;
    this.selectedFile = file;

    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  publicInfoForm = this.fb.group({
    bio: ['', [Validators.required, Validators.minLength(10)]],
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
  });

  onSubmit() {
    if (this.publicInfoForm.invalid) return;

    const formData = new FormData();
    formData.append('bio', this.publicInfoForm.get('bio')?.value || '');
    formData.append('firstname', this.publicInfoForm.get('firstname')?.value || '');
    formData.append('lastname', this.publicInfoForm.get('lastname')?.value || '');

    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }

    this.userService.patchUser(formData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error(err),
    });
  }

  skip() {
    this.router.navigate(['/']);
  }
}
