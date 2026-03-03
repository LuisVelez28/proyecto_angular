import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from './../models/destino-viaje.models';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViajeComponent, FormDestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.scss',
})
export class ListaDestinos implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  destinos: DestinoViaje[] = [];

  constructor() {
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit(): void {}

  agregado(d: DestinoViaje): boolean {
    this.destinos.push(d);
    this.onItemAdded.emit(d);
    return false;
  }

  elegido(destino: DestinoViaje) {
    this.destinos.forEach(function (x) { x.setSelected(false); });
    destino.setSelected(true);
  }
}
