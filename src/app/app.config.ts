import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './styles';
import { routes } from './app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptor/jwt-interceptor';
import { loadingInterceptor } from './core/interceptor/loading-interceptor';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { Language } from './core/service/language';

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
    provideHttpClient(withInterceptors([jwtInterceptor, loadingInterceptor])), provideHttpClient(), provideTransloco({
        config: { 
          availableLangs: ['pt-BR', 'es', 'en'],
          defaultLang: 'pt-BR',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
  ]
};
