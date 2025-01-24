import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { routes } from './app.routes';  // Ak máš routing nastavený v tomto súbore
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';  // Importuj ListsComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ButtonModule,
    CommonModule,
    ListsComponent  // Zabezpeč, že ListsComponent je tu
  ]
})
export class AppComponent {
  title = 'ToDoListProject';
}

// Konfigurácia bootstrapApplication pre správny routing
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule, RouterModule.forRoot(routes)),
    provideAnimations(),
  ]
}).catch(err => console.error(err));
