import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ReservasApiClient,
  ReservasApiClientDecorated,
  type ReservaApi,
  RESERVAS_CONFIG,
  type ReservasConfig,
  RESERVAS_API_PORT,
  type ReservasApiPort
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
  private readonly config = inject<ReservasConfig>(RESERVAS_CONFIG);

  // 2) useClass con contrato: token -> clase concreta
  private readonly reservasApiPort = inject<ReservasApiPort>(RESERVAS_API_PORT);

  // Clase base resuelta a implementación concreta
  private readonly reservasApiClient = inject(ReservasApiClient);

  // 3) useExisting clase-a-clase compatible
  private readonly reservasApiDecorated = inject(ReservasApiClientDecorated);

  // Info para mostrar en el HTML
  injectionInfo = [
    `✅ 1) InjectionToken: ${this.config.apiEndpoint} (timeout: ${this.config.timeout}ms)`,
    `✅ 2) useClass: RESERVAS_API_PORT -> ReservasApiClientDecorated`,
    `✅ 3) useExisting: ReservasApiClientDecorated reutiliza ReservasApiClient (${this.reservasApiClient === this.reservasApiDecorated})`
  ];

  reservas: ReservaApi[] = this.reservasApiPort.getAll();
}
