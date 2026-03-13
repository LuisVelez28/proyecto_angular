import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import type { StyleSpecification } from 'maplibre-gl';
import { APP_CONFIG } from '../../app.config';
import { Reconocimiento } from '../../reconocimiento';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [CommonModule, Reconocimiento],
  templateUrl: './destino-detalle.html',
  styleUrl: './destino-detalle.scss',
})
export class DestinoDetalle implements OnInit {
  private http = inject(HttpClient);
  private appConfig = inject(APP_CONFIG);

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
