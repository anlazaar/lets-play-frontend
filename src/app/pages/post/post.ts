import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostResponse } from '../../models/global.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-post-page',
  imports: [CommonModule, FontAwesomeModule],
  providers: [PostService],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class PostPage {
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;

  postId!: string;
  post!: PostResponse;
  loading = true;

  postService = inject(PostService);

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  toggleLike(post: PostResponse) {
    if (post.likedByCurrentUser) {
      this.postService.unlikePost(post.id).subscribe(() => {
        post.likedByCurrentUser = false;
        post.likeCount--;
      });
    } else {
      this.postService.likePost(post.id).subscribe(() => {
        post.likedByCurrentUser = true;
        post.likeCount++;
      });
    }
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id')!;
          return this.postService.getPostById(id);
        })
      )
      .subscribe({
        next: (res) => {
          this.post = res;
          console.log('POST CONTENT', this.post);
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;

          console.log(err);
        },
      });
  }
}
