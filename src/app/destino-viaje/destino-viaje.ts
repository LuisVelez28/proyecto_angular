import { Component, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje as DestinoViajeModel } from './../models/destino-viaje.models';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.scss',
  imports: [RouterLink],
})
export class DestinoViajeComponent {
  @Input() destino: DestinoViajeModel | undefined;
  @Input('idx') position: number | undefined;
  @HostBinding('class') clase: string = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViajeModel>;

  constructor() {
    this.clicked = new EventEmitter();
  }

  ir() {
    this.clicked.emit( this.destino);
    return false;
}
}
