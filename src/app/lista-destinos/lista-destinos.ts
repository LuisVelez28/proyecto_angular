import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, distinctUntilChanged, filter, map } from 'rxjs';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje';
import { DestinoViajeApiClient } from '../models/destino-api-client.model';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { AppState } from '../app';
import { NuevoDestinoAction, ElegidoFavoritoAction, BorrarDestinoAction, ResetVotosAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViajeComponent, FormDestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.scss',
})
export class ListaDestinos implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[] = [];
  destinos$: Observable<DestinoViaje[]>;
  favorito$: Observable<DestinoViaje | null>;

  constructor(@Inject(DestinoViajeApiClient) private destinosApiClient: DestinoViajeApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinos$ = this.store.select(state => state.destinos.items);
    this.favorito$ = this.store.select(state => state.destinos.favorito);
    this.store.select(state => state.destinos.favorito)
      .pipe(
        filter((favorito): favorito is DestinoViaje => favorito !== null),
        distinctUntilChanged()
      )
      .subscribe(favorito => {
        this.updates.push('Se ha elegido a ' + favorito.nombre);
      });
  }

  ngOnInit(): void {
    this.destinosApiClient.getAll().forEach(destino => {
      this.store.dispatch(new NuevoDestinoAction(destino));
    });
  }

  agregado(d: DestinoViaje): boolean {
    this.onItemAdded.emit(d);
    this.updates.push('Se agregó a ' + d.nombre);
    this.store.dispatch( new NuevoDestinoAction(d) );
    this.store.dispatch( new ElegidoFavoritoAction(d) );
    return false;
  }

  elegido(e: DestinoViaje) {
    this.store.dispatch( new ElegidoFavoritoAction(e) );
  }

  borrar(e: DestinoViaje) {
    this.store.dispatch( new BorrarDestinoAction(e) );
    this.updates.push('Se borró a ' + e.nombre);
  }

  resetVotos() {
    this.store.dispatch(new ResetVotosAction());
    this.updates.push('🔄 Se reiniciaron todos los votos');
  }
}
