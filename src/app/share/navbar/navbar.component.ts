import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { TokenService } from '../../services/token.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isMobileMenuOpen = false;
  isMobile = false;
  avatarUrl: string | null = null;
  username: string | null = null;
  userId: string | null = null;

  private router = inject(Router);
  private tokenService = inject(TokenService);
  private userService = inject(UserService);
  private authSubscription!: Subscription;

  ngOnInit(): void {
    this.authSubscription = this.tokenService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;

      if (isAuthenticated) {
        this.userId = this.tokenService.getUUID();

        if (this.userId) {
          this.userService.getUserPublicProfile(this.userId).subscribe((res) => {
            this.avatarUrl = res.avatarUrl
              ? 'http://localhost:8080' + res.avatarUrl
              : '/default.jpg';
            this.username = res.username;
          });
        } else {
          this.avatarUrl = null;
        }
      }
    });
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
    if (!this.isMobile) {
      this.isMobileMenuOpen = false;
    }
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  logout(): void {
    this.tokenService.clear();
    this.isLoggedIn = false;
    this.closeMobileMenu();
    this.router.navigate(['auth/login']);
  }
}
