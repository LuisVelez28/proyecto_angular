import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { AppState } from '../models/destinos-viajes-state.model';

@Injectable({ providedIn: 'root' })
export class TrackingTagsLoggerService {
  private readonly store = inject<Store<AppState>>(Store);
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'http://localhost:3000/tracking-tags';

  start(): void {
    this.store
      .select((state) => state.destinos.trackingTagsCount)
      .pipe(
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      )
      .subscribe((trackingTagsCount) => {
        console.log('[TrackingTags] conteo actualizado:', trackingTagsCount);

        this.http
          .post(this.endpoint, {
            timestamp: new Date().toISOString(),
            trackingTagsCount
          })
          .subscribe({
            error: (err) => {
              console.warn('[TrackingTags] no se pudo notificar al servidor:', err);
            }
          });
      });
  }
}

export function init_tracking_tags_logger(service: TrackingTagsLoggerService): () => void {
  return () => service.start();
}
