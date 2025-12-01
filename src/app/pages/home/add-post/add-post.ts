import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [PostService],
  templateUrl: './add-post.html',
  styleUrls: ['./add-post.css'],
})
export class AddPost {
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private postService = inject(PostService);

  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    mediaType: ['IMAGE', [Validators.required]],
  });

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      const mediaType = this.postForm.get('mediaType')?.value;
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (mediaType === 'IMAGE' && !isImage) {
        this.errorMessage = 'Please select an image file';
        return;
      }

      if (mediaType === 'VIDEO' && !isVideo) {
        this.errorMessage = 'Please select a video file';
        return;
      }

      // Validate file size (10MB for images, 50MB for videos)
      const maxSize = mediaType === 'IMAGE' ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
      if (file.size > maxSize) {
        this.errorMessage = `File size must be less than ${maxSize / (1024 * 1024)}MB`;
        return;
      }

      this.selectedFile = file;
      this.errorMessage = '';

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onMediaTypeChange() {
    // Clear file selection when media type changes
    this.selectedFile = null;
    this.previewUrl = null;
  }

  onSubmit() {
    if (this.postForm.invalid) return;
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a media file';
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();

    formData.append('title', this.postForm.get('title')?.value || '');
    formData.append('description', this.postForm.get('description')?.value || '');
    formData.append('mediaType', this.postForm.get('mediaType')?.value || 'IMAGE');
    formData.append('media', this.selectedFile);

    this.postService.addPost(formData).subscribe({
      next: (res) => {
        this.successMessage = 'Post added successfully!';
        this.errorMessage = '';
        this.isSubmitting = false;
        setTimeout(() => {
          this.onClose();
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to add post';
        this.successMessage = '';
        this.isSubmitting = false;
        console.error(err);
      },
    });
  }

  onClose() {
    this.postForm.reset({ mediaType: 'IMAGE' });
    this.selectedFile = null;
    this.previewUrl = null;
    this.successMessage = '';
    this.errorMessage = '';
    this.close.emit();
  }
}
