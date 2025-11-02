import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './styles';
import { routes } from './app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptor/jwt-interceptor';
import { loadingInterceptor } from './core/interceptor/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          // darkModeSelector: null
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    MessageService,
    ConfirmationService,
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([loadingInterceptor])),
 //       provideHttpClient(withInterceptors([jwtInterceptor, loadingInterceptor]))
  ]
};
