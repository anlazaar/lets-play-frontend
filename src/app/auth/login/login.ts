import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ApiService } from '../../services/auth.service';
import { MaterialImports } from '../../material-imports';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, ...MaterialImports],
  providers: [ApiService],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  faGoogle = faGoogle;
  faGithub = faGithub;
  errorMessage = '';

  private auth = inject(ApiService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private tokenService = inject(TokenService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.auth.apiCommunicator('/login', this.loginForm.value).subscribe({
      next: (res) => {
        console.log('LOGIN SUCCESS', res);
        this.tokenService.setToken(res.token);
        this.router.navigate(['/']);
        if (!res.isCompleted) {
          this.router.navigate(['profile/update']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.log('LOGIN ERROR :', err);

        if (err.error?.error) {
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = 'something went wrong';
        }
      },
    });
  }
}
