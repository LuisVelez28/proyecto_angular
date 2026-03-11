import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Map as MapLibreMap, Marker, Popup } from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino-detalle.html',
  styleUrl: './destino-detalle.scss',
})
export class DestinoDetalle implements OnInit, AfterViewInit, OnDestroy {
  private http = inject(HttpClient);
  private appConfig = inject(APP_CONFIG);
  private map?: MapLibreMap;

  @ViewChild('mapContainer', { static: true })
  private mapContainer!: ElementRef<HTMLDivElement>;

  destinos: string[] = [];
  loading = true;
  error: string | null = null;
  style: StyleSpecification = {
    sources: {
      world: {
        type: 'geojson' as const,
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#eef3fb'
      }
    }, {
      id: 'countries',
      type: 'fill',
      source: 'world',
      layout: {},
      paint: {
        'fill-color': '#4f72d8',
        'fill-opacity': 0.75
      }
    }]
  };
  mapCenter: [number, number] = [-74.006, 40.7128];
  mapZoom = 2;
  markerMessage = 'Hola desde el marker';

  ngOnInit() {
    this.cargarDestinos();
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap() {
    this.map = new MapLibreMap({
      container: this.mapContainer.nativeElement,
      style: this.style,
      center: this.mapCenter,
      zoom: this.mapZoom
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
      `<div style="font-weight:600;color:#1f3a5f;">${this.markerMessage}</div>`
    );

    new Marker({ element: markerElement })
      .setLngLat(this.mapCenter)
      .setPopup(popup)
      .addTo(this.map);
  }

  cargarDestinos() {
    this.loading = true;
    this.http.get<string[]>(`${this.appConfig.apiEndpoint}/mydestinos`)
      .subscribe({
        next: (data) => {
          this.destinos = data;
          this.loading = false;
          console.log('Destinos cargados:', data);
        },
        error: (err) => {
          this.error = 'Error al cargar destinos';
          this.loading = false;
          console.error('Error:', err);
        }
      });
  }

  recargar() {
    this.error = null;
    this.cargarDestinos();
  }
}
