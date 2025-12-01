import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/UserService';
import { UserPublicProfileDTO } from '../../models/USER/UserPublicProfileDTO';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.css'],
})
export class ProfilePage implements OnInit {
  user!: UserPublicProfileDTO;
  isCurrentUser: boolean = false;

  tokenService = inject(TokenService);

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  toggleFollow() {
    if (this.user.following) {
      this.userService.unfollowUser(this.user.id).subscribe({
        next: (res) => {
          this.user.following = false;
          this.user.followersCount--;
          console.log(res);
        },
        error: (err) => {
          console.log('ERROR UNFOLLOWING USER :', err);
        },
      });
    } else {
      this.userService.followUser(this.user.id).subscribe({
        next: (res) => {
          this.user.following = true;
          this.user.followersCount++;
          console.log(res);
        },
        error: (err) => {
          console.log('ERROR FOLLOWING USER :', err);
        },
      });
    }
  }

  ngOnInit(): void {
    // Subscribe to route param changes
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id')!;
          this.isCurrentUser = this.tokenService.getUUID() === id;
          return this.userService.getUserPublicProfile(id);
        })
      )
      .subscribe({
        next: (data) => {
          this.user = data;
          console.log('USER', this.user);
          this.user.avatarUrl = this.user.avatarUrl
            ? 'http://localhost:8080' + this.user.avatarUrl
            : '/default.jpg';
        },
        error: (err) => console.log(err),
      });
  }
}
