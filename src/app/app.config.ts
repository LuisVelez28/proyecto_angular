import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { routes } from './app.routes';
import { DestinoViajeApiClient } from './models/destino-api-client.model';
import { DestinosViajesState, reducerDestinosViajes, DestinosViajesEffects } from './models/destinos-viajes-state.model';
import {
  RESERVAS_CONFIG,
  RESERVAS_CONFIG_VALUE,
  RESERVAS_API_ALIAS,
  ReservasApiClient,
  ReservasApiClientDecorated
} from './reservas/reservas-api-client';

const destinosReducer = (state: DestinosViajesState | undefined, action: Action) =>
  reducerDestinosViajes(state, action as any);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ destinos: destinosReducer }),
    provideEffects(DestinosViajesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false, autoPause: true }),
    DestinoViajeApiClient,

    // Providers globales de reservas
    { provide: RESERVAS_CONFIG, useValue: RESERVAS_CONFIG_VALUE },
    { provide: ReservasApiClient, useClass: ReservasApiClientDecorated },
    { provide: RESERVAS_API_ALIAS, useExisting: ReservasApiClient }
  ]
};
