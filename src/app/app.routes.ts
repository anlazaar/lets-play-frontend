import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { ProductPage } from './pages/products/products';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth/login', component: Login, canActivate: [AuthGuard] },
  { path: 'auth/register', component: Register, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductPage },
  // { path: 'products', component: Products },
];
