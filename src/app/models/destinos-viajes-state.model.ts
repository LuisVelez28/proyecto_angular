import { Action } from '@ngrx/store';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

// Estado
export interface DestinosViajesState {  // Interfaz que define el estado de destinos de viaje
  items: DestinoViaje[]; // Lista de destinos de viaje
  loading: boolean;  // Indica si se están cargando los destinos
  favorito: DestinoViaje | null;  // Destino de viaje favorito seleccionado
}

export const initializeDestinosViajeState = function() {  // Función para inicializar el estado de destinos de viaje
  return {
    items: [],  // Lista inicial vacía de destinos de viaje
    loading: false,  // No se están cargando destinos inicialmente
    favorito: null  // No hay un destino favorito seleccionado inicialmente
  };
};

// Acciones
export enum DestinosViajesActionTypes {  // Enum que define los tipos de acciones para destinos de viaje
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo Destino',  // Acción para agregar un nuevo destino de viaje
  BORRAR_DESTINO = '[Destinos Viajes] Borrar Destino',  // Acción para borrar un destino de viaje
  ELEGIDO_FAVORITO = '[Destinos Viajes] Elegido Favorito',  // Acción para seleccionar un destino de viaje como favorito
  VOTO_ARRIBA = '[Destinos Viajes] Voto Arriba',  // Acción para incrementar votos de un destino
  VOTO_ABAJO = '[Destinos Viajes] Voto Abajo',  // Acción para decrementar votos de un destino
  RESET_VOTOS = '[Destinos Viajes] Reset Votos',  // Acción para reiniciar todos los votos a 0
  INIT_MY_DATA = '[Destinos Viajes] Init My Data',  // Acción para inicializar datos desde API
};

export class NuevoDestinoAction implements Action {  // Clase que representa la acción de agregar un nuevo destino de viaje
  type = DestinosViajesActionTypes.NUEVO_DESTINO;  // Tipo de acción
  constructor(public destino: DestinoViaje) {}  // Constructor que recibe el destino de viaje a agregar
};

export class ElegidoFavoritoAction implements Action {  // Clase que representa la acción de seleccionar un destino de viaje como favorito
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;  // Tipo de acción
  constructor(public destino: DestinoViaje) {}  // Constructor que recibe el destino de viaje seleccionado como favorito
};

export class BorrarDestinoAction implements Action {  // Clase que representa la acción de borrar un destino de viaje
  type = DestinosViajesActionTypes.BORRAR_DESTINO;  // Tipo de acción
  constructor(public destino: DestinoViaje) {}  // Constructor que recibe el destino a borrar
};

export class VotoArribaAction implements Action {
  type = DestinosViajesActionTypes.VOTO_ARRIBA;
  constructor(public destino: DestinoViaje) {}
};

export class VotoAbajoAction implements Action {
  type = DestinosViajesActionTypes.VOTO_ABAJO;
  constructor(public destino: DestinoViaje) {}
};

export class ResetVotosAction implements Action {
  type = DestinosViajesActionTypes.RESET_VOTOS;
};

export class InitMyDataAction implements Action {
  type = DestinosViajesActionTypes.INIT_MY_DATA;
  constructor(public destinos: DestinoViaje[]) {}
};

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | BorrarDestinoAction | VotoArribaAction | VotoAbajoAction | ResetVotosAction | InitMyDataAction;

// Reducer

export function reducerDestinosViajes (
  state: DestinosViajesState = initializeDestinosViajeState(),  // Estado inicial de destinos de viaje
  action: DestinosViajesActions  // Acción a procesar
): DestinosViajesState {
  switch (action.type) {
    case DestinosViajesActionTypes.NUEVO_DESTINO:  // Si la acción es agregar un nuevo destino de viaje
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]  // Agrega el nuevo destino a la lista de destinos de viaje
      };
    case DestinosViajesActionTypes.BORRAR_DESTINO: {
      const destinoABorrar = (action as BorrarDestinoAction).destino;
      const mismoDestino = (a: DestinoViaje | null, b: DestinoViaje | null) => {
        if (a === null || b === null) {
          return false;
        }
        return a.nombre === b.nombre && a.imagenUrl === b.imagenUrl;
      };
      return {
        ...state,
        items: state.items.filter(item => !mismoDestino(item, destinoABorrar)),
        favorito: mismoDestino(state.favorito, destinoABorrar) ? null : state.favorito
      };
    }
    case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
      return {
        ...state,
        favorito: (action as ElegidoFavoritoAction).destino
      };
    }
    case DestinosViajesActionTypes.VOTO_ARRIBA: {
      const destinoVoto = (action as VotoArribaAction).destino;
      return {
        ...state,
        items: state.items.map(item =>
          item.nombre === destinoVoto.nombre && item.imagenUrl === destinoVoto.imagenUrl
            ? { ...item, votos: (item.votos || 0) + 1 } as DestinoViaje
            : item
        )
      };
    }
    case DestinosViajesActionTypes.VOTO_ABAJO: {
      const destinoVoto = (action as VotoAbajoAction).destino;
      return {
        ...state,
        items: state.items.map(item =>
          item.nombre === destinoVoto.nombre && item.imagenUrl === destinoVoto.imagenUrl
            ? { ...item, votos: Math.max((item.votos || 0) - 1, 0) } as DestinoViaje
            : item
        )
      };
    }
    case DestinosViajesActionTypes.RESET_VOTOS: {
      return {
        ...state,
        items: state.items.map(item => ({ ...item, votos: 0 } as DestinoViaje))
      };
    }
    case DestinosViajesActionTypes.INIT_MY_DATA: {
      return {
        ...state,
        items: (action as InitMyDataAction).destinos
      };
    }
  }
  return state;  // Retorna el estado sin cambios si la acción no coincide con ningún caso
}

// Effects
@Injectable()
export class DestinosViajesEffects {
  private actions$ = inject(Actions);

  guardarVotos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          DestinosViajesActionTypes.VOTO_ARRIBA,
          DestinosViajesActionTypes.VOTO_ABAJO,
          DestinosViajesActionTypes.RESET_VOTOS
        ),
        tap((action) => {
          console.log('📊 Acción de voto registrada:', action.type);
        })
      ),
    { dispatch: false }
  );
}

// APP_INITIALIZER
export interface AppState {
  destinos: DestinosViajesState;
}

@Injectable()
export class AppLoadService {
  private store = inject(Store<AppState>);
  private http = inject(HttpClient);

  async intializeDestinosViajesState(): Promise<void> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const response = await firstValueFrom(
      this.http.get<string[]>('http://localhost:3000/mydestinos', { headers })
    );
    const destinos = (response || []).map(
      (nombre) => new DestinoViaje(nombre, 'assets/images/default.jpg')
    );
    this.store.dispatch(new InitMyDataAction(destinos));
  }
}

export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.intializeDestinosViajesState();
}

