import { Component, Input, HostBinding } from '@angular/core';
import { DestinoViaje as DestinoViajeModel } from './../models/destino-viaje.models';

@Component({
  selector: 'app-destino-viaje',
  imports: [],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.scss',
})
export class DestinoViajeComponent {
  @Input() destino: DestinoViajeModel | undefined;
  @HostBinding('class') clase: string = 'col-md-4';
}
