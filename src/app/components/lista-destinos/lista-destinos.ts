import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, distinctUntilChanged, filter, map } from 'rxjs';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje';
import { DestinoViajeApiClient } from '../../models/destino-api-client.model';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { AppState } from '../../app';
import { ElegidoFavoritoAction, BorrarDestinoAction, ResetVotosAction } from '../../models/destinos-viajes-state.model';
import { TrackearClick } from '../../trackear-click';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViajeComponent, FormDestinoViaje, TrackearClick],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.scss',
})
export class ListaDestinos implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[] = [];
  destinos$: Observable<DestinoViaje[]>;
  favorito$: Observable<DestinoViaje | null>;
  trackingTagsRanking$: Observable<Array<{ tag: string; count: number }>>;

  constructor(@Inject(DestinoViajeApiClient) private destinosApiClient: DestinoViajeApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinos$ = this.store.select(state => state.destinos.items);
    this.favorito$ = this.store.select(state => state.destinos.favorito);
    this.trackingTagsRanking$ = this.store.select(state => state.destinos.trackingTagsCount).pipe(
      map((counts) =>
        Object.entries(counts)
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count)
      )
    );
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
    // La carga inicial se hace con APP_INITIALIZER.
  }

  agregado(d: DestinoViaje): boolean {
    this.onItemAdded.emit(d);
    this.updates.push('Se agregó a ' + d.nombre);

    // Guardar en el servidor
    this.destinosApiClient.add(d).subscribe({
      next: (response) => {
        console.log('✅ Destino guardado en servidor:', response);
      },
      error: (err) => {
        console.error('❌ Error al guardar en servidor:', err);
      }
    });
    
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
