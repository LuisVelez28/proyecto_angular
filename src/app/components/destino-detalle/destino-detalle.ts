import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReservasApiClient,
  RESERVAS_CONFIG,
  RESERVAS_API_ALIAS,
  type ReservasConfig,
  type ReservaApi
} from '../../reservas/reservas-api-client';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino-detalle.html',
  styleUrl: './destino-detalle.scss',
  // NO definimos providers aquí - heredamos los globales
})
export class DestinoDetalle {
  // Inyectamos los MISMOS servicios que usa ReservasListado

  // 1) InjectionToken - hereda la config global
  private readonly config = inject(RESERVAS_CONFIG);

  // 2) El servicio decorado (porque está en providedIn: 'root')
  private readonly reservasApi = inject(ReservasApiClient);

  // 3) El alias (mismo token que en reservas)
  private readonly reservasAlias = inject(RESERVAS_API_ALIAS);

  // Obtenemos las MISMAS reservas que en el otro componente
  reservas: ReservaApi[] = this.reservasApi.getAll();

  // Info de las inyecciones heredadas
  inyeccionesInfo = [
    {
      tipo: '🔑 InjectionToken heredado',
      valor: this.config.apiEndpoint,
      detalles: `Timeout: ${this.config.timeout}ms`,
      descripcion: 'Token global definido en app.config',
      color: '#667eea'
    },
    {
      tipo: '⭐ Servicio global (providedIn: root)',
      valor: 'ReservasApiClient',
      detalles: `${this.reservas.length} reservas compartidas`,
      descripcion: 'Instancia singleton compartida',
      color: '#f59e0b'
    },
    {
      tipo: '🔗 Alias compartido',
      valor: 'RESERVAS_API_ALIAS',
      detalles: `Refs idénticas: ${this.reservasApi === this.reservasAlias}`,
      descripcion: 'Apunta al mismo servicio',
      color: '#10b981'
    }
  ];

  // Datos adicionales para demostrar la herencia
  componenteOrigen = 'AppConfig (global)';
  componenteActual = 'DestinoDetalle (standalone)';
  compartiendo = true;
}
