import { ApplicationConfig, provideBrowserGlobalErrorListeners, InjectionToken, APP_INITIALIZER } from '@angular/core';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './services/translate-loader';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { routes } from './app.routes';
import { DestinoViajeApiClient } from './models/destino-api-client.model';
import { DestinosViajesState, reducerDestinosViajes, DestinosViajesEffects, AppLoadService, init_app } from './models/destinos-viajes-state.model';
import {
  RESERVAS_CONFIG,
  RESERVAS_CONFIG_VALUE,
  RESERVAS_API_ALIAS,
  ReservasApiClient,
  ReservasApiClientDecorated
} from './reservas/reservas-api-client';

export interface AppConfig {
  apiEndpoint: string;
}

export const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

const destinosReducer = (state: DestinosViajesState | undefined, action: Action) =>
  reducerDestinosViajes(state, action as any);

const MAPBOX_ACCESS_TOKEN =
  (globalThis as { __env?: { MAPBOX_ACCESS_TOKEN?: string } }).__env?.MAPBOX_ACCESS_TOKEN ?? '';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    provideRouter(routes),
    provideStore({ destinos: destinosReducer }),
    provideEffects(DestinosViajesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false, autoPause: true }),
    DestinoViajeApiClient,
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },

    // Providers globales de reservas
    { provide: RESERVAS_CONFIG, useValue: RESERVAS_CONFIG_VALUE },
    { provide: ReservasApiClient, useClass: ReservasApiClientDecorated },
    { provide: RESERVAS_API_ALIAS, useExisting: ReservasApiClient },
    provideTranslateService({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
};
