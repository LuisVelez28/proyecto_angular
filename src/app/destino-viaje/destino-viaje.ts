import { Component, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje as DestinoViajeModel } from '../models/destino-viaje.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.scss',
  imports: [RouterLink],
})
export class DestinoViajeComponent {
  @Input() destino: DestinoViajeModel | undefined;
  @Input() isSelected: boolean = false;
  @Input('idx') position: number | undefined;
  @HostBinding('class') clase: string = 'd-block h-100';
  @Output() clicked: EventEmitter<DestinoViajeModel>;

  constructor() {
    this.clicked = new EventEmitter();
  }

  ir(event: Event) {
    event.preventDefault();
    if (this.destino) {
      this.clicked.emit(this.destino);
    }
    return false;
}
}
