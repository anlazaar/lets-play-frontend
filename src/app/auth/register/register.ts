import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ApiService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
  providers: [ApiService],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  faGoogle = faGoogle;
  faGithub = faGithub;

  private auth = inject(ApiService);
  private router = inject(Router);

  private fb = inject(FormBuilder);

  registerForm = this.fb.group(
    {
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      form.get('repeatPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('repeatPassword')?.setErrors(null);
    }

    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { repeatPassword, ...dataToSend } = this.registerForm.value;

    this.auth.apiCommunicator('/register', dataToSend).subscribe({
      next: (res) => {
        console.log('REGISTER SUCCESS', res);
        localStorage.setItem('token', res.token);
        if (!res.isCompleted) {
          this.router.navigate(['profile/update']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => console.error(err),
    });
  }
}
