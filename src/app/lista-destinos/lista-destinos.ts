import { Component } from '@angular/core';
import { DestinoViaje } from '../destino-viaje/destino-viaje';

@Component({
  selector: 'app-lista-destinos',
  imports: [DestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.scss',
})
export class ListaDestinos {
  destinos: string[];

  constructor() {
    this.destinos = ['Manizales', 'Bogota', 'Cali', 'Medellin', 'Cartagena'];
  }
}
