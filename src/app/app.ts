import { Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionReducerMap } from '@ngrx/store';
import { DestinosViajesState, reducerDestinosViajes, initializeDestinosViajeState } from './models/destinos-viajes-state.model';


// redux init
export interface AppState {
  destinos: DestinosViajesState;  // Define la propiedad 'destinos' en el estado de la aplicación, que es de tipo DestinosViajesState
}

const reducers: ActionReducerMap<AppState> = {
  destinos: (state: DestinosViajesState | undefined, action: any) => reducerDestinosViajes(state!, action)  // Asocia el reducer de destinos de viaje con la propiedad 'destinos' en el estado de la aplicación
};

let reducersInitialState = {
  destinos: initializeDestinosViajeState()  // Inicializa el estado de destinos de viaje utilizando la función initializeDestinosViajeState
};

// redux fin init

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('proyecto_angular');
  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
