import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ListsComponent } from './lists/lists.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'topbar', component: TopbarComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];
