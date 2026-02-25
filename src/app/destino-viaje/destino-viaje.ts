import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destino-viaje',
  imports: [],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.scss',
})
export class DestinoViaje {
  @Input() nombre: string = '';

}
