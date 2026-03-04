import { Action } from '@ngrx/store';
import { DestinoViaje } from './destino-viaje.model';

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
  constructor(public destino: DestinoViaje) {}  // Constructor que recibe el destino de viaje a borrar
};

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | BorrarDestinoAction;  // Tipo que agrupa todas las acciones de destinos de viaje

// Reducer

export function reducerDestinosViajes (
  state: DestinosViajesState = initializeDestinosViajeState(),  // Estado inicial de destinos de viaje
  action: DestinosViajesActions  // Acción a procesar
): DestinosViajesState {
  switch (action.type) {
    case DestinosViajesActionTypes.NUEVO_DESTINO:  // Si la acción es agregar un nuevo destino de viaje
      return {
        ...state,
        items: [...state.items, action.destino]  // Agrega el nuevo destino a la lista de destinos de viaje
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
    }
  return state;  // Retorna el estado sin cambios si la acción no coincide con ningún caso
}


