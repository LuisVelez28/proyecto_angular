import { Directive, ElementRef, OnDestroy, OnInit, input } from '@angular/core';
import { Map as MapLibreMap, Marker, Popup } from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';

@Directive({
  selector: '[appReconocimiento]',
  standalone: true,
})
export class Reconocimiento implements OnInit, OnDestroy {
  mapStyle = input<StyleSpecification | null>(null);
  mapCenter = input<[number, number]>([-74.006, 40.7128]);
  mapZoom = input(2);
  markerMessage = input('Hola desde el marker');

  private map?: MapLibreMap;

  constructor(private hostElement: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    console.log('Reconocimiento: ngOnInit ejecutado');

    const style = this.mapStyle();
    if (!style) {
      return;
    }

    this.initializeMap(style);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }

    console.log('Reconocimiento: ngOnDestroy ejecutado');
  }

  private initializeMap(style: StyleSpecification): void {
    this.map = new MapLibreMap({
      container: this.hostElement.nativeElement,
      style,
      center: this.mapCenter(),
      zoom: this.mapZoom()
    });

    const markerElement = document.createElement('button');
    markerElement.type = 'button';
    markerElement.setAttribute('aria-label', 'Mostrar informacion del destino');
    markerElement.style.width = '24px';
    markerElement.style.height = '24px';
    markerElement.style.borderRadius = '50%';
    markerElement.style.background = '#ff4d6d';
    markerElement.style.border = '3px solid #fff';
    markerElement.style.boxShadow = '0 3px 10px rgba(0,0,0,0.25)';
    markerElement.style.cursor = 'pointer';

    const popup = new Popup({ closeOnClick: false, offset: 20 }).setHTML(
      `<div style="font-weight:600;color:#1f3a5f;">${this.markerMessage()}</div>`
    );

    new Marker({ element: markerElement })
      .setLngLat(this.mapCenter())
      .setPopup(popup)
      .addTo(this.map);
  }

}
