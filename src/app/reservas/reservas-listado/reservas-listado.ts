import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ReservasApiClient,
  type ReservaApi,
  RESERVAS_CONFIG,
  type ReservasConfig,
  RESERVAS_API_ALIAS
} from '../reservas-api-client';

@Component({
  selector: 'app-reservas-listado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservas-listado.html',
  styleUrl: './reservas-listado.scss',
})
export class ReservasListado {
  // Probando las 3 inyecciones:

  // 1) InjectionToken
  private readonly config = inject(RESERVAS_CONFIG);

  // 2) useClass - recibe la clase decorada automáticamente
  private readonly reservasApiClient = inject(ReservasApiClient);

  // 3) useExisting - inyecta el alias que apunta al mismo servicio
  private readonly reservasApiAlias = inject(RESERVAS_API_ALIAS);

  // Info para mostrar en el HTML
  injectionInfo = [
    `✅ 1) InjectionToken: ${this.config.apiEndpoint} (timeout: ${this.config.timeout}ms)`,
    `✅ 2) useClass: ReservasApiClientDecorated (clase decorada activa)`,
    `✅ 3) useExisting: Alias apunta al mismo servicio (${this.reservasApiClient === this.reservasApiAlias})`
  ];

  reservas: ReservaApi[] = this.reservasApiClient.getAll();
}
