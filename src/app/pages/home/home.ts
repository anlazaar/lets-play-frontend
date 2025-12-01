import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { AddPost } from './add-post/add-post';
import { RouterLink } from '@angular/router';
import { PostResponse } from '../../models/global.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AddPost, RouterLink],
  providers: [PostService],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  posts: PostResponse[] = [];
  loading = false;
  isAdmin = false;
  token: string | null = '';

  showAddPost = false;

  constructor(private postService: PostService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.isAdmin = this.tokenService.isAdmin();

    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('POSTS', data);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  toggleAddPost() {
    this.showAddPost = !this.showAddPost;
  }
}
