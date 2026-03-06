import { Component, Input, HostBinding, EventEmitter, Output, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { DestinoViaje as DestinoViajeModel } from '../../models/destino-viaje.model';
import { RouterLink } from "@angular/router";
import { AppState } from '../../app';
import { VotoArribaAction, VotoAbajoAction } from '../../models/destinos-viajes-state.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.scss',
  imports: [RouterLink, CommonModule],
  standalone: true
})
export class DestinoViajeComponent {
  @Input() destino: DestinoViajeModel | undefined;
  @Input() isSelected: boolean = false;
  @Input('idx') position: number | undefined;
  @HostBinding('class') clase: string = 'd-block h-100';
  @Output() clicked: EventEmitter<DestinoViajeModel>;

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
  }

  ir(event: Event) {
    event.preventDefault();
    if (this.destino) {
      this.clicked.emit(this.destino);
    }
    return false;
  }

  voteUp() {
    if (this.destino) {
      this.store.dispatch(new VotoArribaAction(this.destino));
    }
    return false;
  }

  voteDown() {
    if (this.destino) {
      this.store.dispatch(new VotoAbajoAction(this.destino));
    }
    return false;
  }
}
