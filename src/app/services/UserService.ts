import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPublicProfileDTO } from '../models/USER/UserPublicProfileDTO';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUserPublicProfile(id: string): Observable<UserPublicProfileDTO> {
    return this.http.get<any>(`${this.api}/${id}/block`);
  }

  patchUser(req: FormData) {
    return this.http.patch<any>(`${this.api}/profile/update/avatar`, req);
  }

  followUser(id: string) {
    return this.http.post(
      `http://localhost:8080/api/subscriptions/${id}/follow`,
      {},
      { withCredentials: true }
    );
  }

  unfollowUser(id: string) {
    return this.http.post(
      `http://localhost:8080/api/subscriptions/${id}/unfollow`,
      {},
      { withCredentials: true }
    );
  }
}
