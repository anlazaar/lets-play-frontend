import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  imports: [FontAwesomeModule],
  styleUrls: ['./theme-toggle.css', '../navbar/navbar.component.css'],
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode: boolean = false;
  faSun = faSun;
  faMoon = faMoon;

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateBodyClass();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    this.updateBodyClass();
  }

  private updateBodyClass(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
