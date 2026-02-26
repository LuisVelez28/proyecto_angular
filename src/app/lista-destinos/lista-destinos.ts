import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from './../models/destino-viaje.models';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje';

@Component({
  selector: 'app-lista-destinos',
  imports: [CommonModule, DestinoViajeComponent],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.scss',
})
export class ListaDestinos {
  destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
  }

  guardar(nombre: string, url: string): boolean {
    this.destinos.push(new DestinoViaje(nombre, url));
    console.log(this.destinos);
    return false;
  }
}
