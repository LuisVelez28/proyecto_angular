import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { routes } from './app.routes';
import { DestinoViajeApiClient } from './models/destino-api-client.model';
import { DestinosViajesState, reducerDestinosViajes, DestinosViajesEffects } from './models/destinos-viajes-state.model';

const destinosReducer = (state: DestinosViajesState | undefined, action: Action) =>
  reducerDestinosViajes(state, action as any);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ destinos: destinosReducer }),
    provideEffects(DestinosViajesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false, autoPause: true }),
    DestinoViajeApiClient
  ]
};
