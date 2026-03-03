import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje';
import { DestinoViajeApiClient } from '../models/destino-api-client.model';
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
  updates: String[] = [];
  destinos: DestinoViaje[] = [];

  constructor(@Inject(DestinoViajeApiClient) private destinosApiClient: DestinoViajeApiClient) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }

  ngOnInit(): void {
    this.destinos = this.destinosApiClient.getAll();
  }

  agregado(d: DestinoViaje): boolean {
    this.destinosApiClient.add(d);
    this.destinos = this.destinosApiClient.getAll();
    this.onItemAdded.emit(d);
    return false;
  }

  elegido(e: DestinoViaje) {
    this.destinosApiClient.elegir(e);
  }
}
