import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { PostPage } from './pages/post/post';
import { AuthGuard } from './core/guards/auth.guard';
import { UpdateProfile } from './pages/updateProfile/updateProfile';
import { ProfilePage } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth/login', component: Login, canActivate: [AuthGuard] },
  { path: 'auth/register', component: Register, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostPage },
  { path: 'profile/:id/block', component: ProfilePage },
  { path: 'profile/update', component: UpdateProfile },
];
