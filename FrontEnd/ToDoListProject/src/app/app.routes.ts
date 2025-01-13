import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListsComponent } from './lists/lists.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lists', component: ListsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } ,
  {path:'home', component: HomeComponent },
];
