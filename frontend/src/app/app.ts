import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoggedIn = false;
  currentUser: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to authentication status changes
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      if (isAuthenticated) {
        this.currentUser = this.authService.getCurrentUser();
      } else {
        this.currentUser = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}