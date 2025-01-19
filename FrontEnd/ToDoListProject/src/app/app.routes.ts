import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './AuthGuard';

export const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: '/login'},
];
