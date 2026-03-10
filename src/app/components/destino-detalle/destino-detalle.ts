import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../app.config';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino-detalle.html',
  styleUrl: './destino-detalle.scss',
})
export class DestinoDetalle implements OnInit {
  private http = inject(HttpClient);
  private appConfig = inject(APP_CONFIG);
  
  destinos: string[] = [];
  loading = true;
  error: string | null = null;

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
