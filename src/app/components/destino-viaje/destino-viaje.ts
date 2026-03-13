import { Component, Input, HostBinding, EventEmitter, Output, Inject } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { DestinoViaje as DestinoViajeModel } from '../../models/destino-viaje.model';
import { RouterLink } from "@angular/router";
import { AppState } from '../../app';
import { VotoArribaAction, VotoAbajoAction } from '../../models/destinos-viajes-state.model';
import { TrackearClick } from '../../trackear-click';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.scss',
  imports: [RouterLink, CommonModule, TrackearClick],
  standalone: true,
  animations: [
    // Trigger 1: cambia el estilo visual según el estado isSelected
    trigger('estadoDestino', [
      state('no-seleccionado', style({
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transform: 'scale(1)'
      })),
      state('seleccionado', style({
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        boxShadow: '0 8px 16px rgba(76, 175, 80, 0.3)',
        transform: 'scale(1.05)'
      })),
      // Animación diferida con keyframes: la selección ocurre en pasos intermedios
      transition('no-seleccionado => seleccionado', [
        animate('500ms ease-in-out', keyframes([
          style({ transform: 'scale(1)',    backgroundColor: 'rgba(255,255,255,1)', offset: 0 }),
          style({ transform: 'scale(1.1)', backgroundColor: 'rgba(76,175,80,0.05)', offset: 0.4 }),
          style({ transform: 'scale(1.03)', backgroundColor: 'rgba(76,175,80,0.08)', offset: 0.7 }),
          style({ transform: 'scale(1.05)', backgroundColor: 'rgba(76,175,80,0.1)',  offset: 1 })
        ]))
      ]),
      // Transición de vuelta: simple con retardo de 100ms antes de iniciar
      transition('seleccionado => no-seleccionado', [
        animate('350ms 100ms ease-in-out')
      ])
    ]),

    // Trigger 2: animación diferida de entrada al aparecer la tarjeta en el DOM
    trigger('entradaTarjeta', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        // 200ms de retardo antes de iniciar → animación diferida
        animate('450ms 200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        animate('300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        )
      ])
    ])
  ]
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
