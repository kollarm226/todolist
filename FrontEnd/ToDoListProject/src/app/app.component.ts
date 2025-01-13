import { Component, importProvidersFrom } from '@angular/core';
import {RouterOutlet, RouterModule, RouterLink} from '@angular/router';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {ListsComponent} from './lists/lists.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    RouterModule,
    CommonModule
  ]
})
export class AppComponent {
  title = 'ToDoListProject';
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule, RouterModule.forRoot(routes)),
    provideAnimations(),
  ]
}).catch(err => console.error());
