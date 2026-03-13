import { Directive, ElementRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState, TrackClickAction } from './models/destinos-viajes-state.model';

@Directive({
  selector: '[appTrackearClick]',
  standalone: true,
})
export class TrackearClick {
  appTrackearClick = input<string>('');

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly store = inject<Store<AppState>>(Store);

  constructor() {
    fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click')
      .pipe(
        map(() => this.obtenerTrackingTag()),
        filter((tag): tag is string => tag.length > 0),
        takeUntilDestroyed()
      )
      .subscribe((tag) => {
        this.store.dispatch(new TrackClickAction(tag));
      });
  }

  private obtenerTrackingTag(): string {
    const host = this.elementRef.nativeElement;
    const tagPorInput = this.appTrackearClick().trim();
    if (tagPorInput.length > 0) {
      return tagPorInput;
    }

    const tagPorAtributo = host.getAttribute('data-tracking-tag')?.trim() ?? '';
    if (tagPorAtributo.length > 0) {
      return tagPorAtributo;
    }

    const fallback = host.getAttribute('aria-label')?.trim() || host.id?.trim() || host.tagName.toLowerCase();
    return fallback;
  }

}
