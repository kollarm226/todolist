import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService} from './auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: AuthService, useClass: AuthService },
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideAnimationsAsync(),

  ]
};
