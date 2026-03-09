import { Injectable, InjectionToken, Inject } from '@angular/core';

// 1) InjectionToken propio para configuración
export interface ReservasConfig {
  apiEndpoint: string;
  timeout: number;
}

export const RESERVAS_CONFIG = new InjectionToken<ReservasConfig>('reservas.config');

export const RESERVAS_CONFIG_VALUE: ReservasConfig = {
  apiEndpoint: 'https://api.reservas.com',
  timeout: 5000
};

export interface ReservaApi {
  id: number;
  pasajero: string;
  destino: string;
  fecha: string;
  estado: 'Confirmada' | 'Pendiente';
}

@Injectable({
  providedIn: 'root',
})
export class ReservasApiClient {

  getAll(): ReservaApi[] {
    return [
      {
        id: 201,
        pasajero: 'Ana Torres',
        destino: 'Madrid',
        fecha: '2026-03-15 19:00',
        estado: 'Confirmada',
      },
      {
        id: 202,
        pasajero: 'Luis Vega',
        destino: 'Lima',
        fecha: '2026-03-20 20:00',
        estado: 'Pendiente',
      },
      {
        id: 203,
        pasajero: 'Carla Nunez',
        destino: 'Bogota',
        fecha: '2026-03-28 18:30',
        estado: 'Confirmada',
      }
    ];
  }
}

// 2) Clase decorada para usar con useClass
@Injectable()
export class ReservasApiClientDecorated extends ReservasApiClient {
  private config: ReservasConfig;

  constructor(@Inject(RESERVAS_CONFIG) config: ReservasConfig) {
    super();
    this.config = config;
  }

  override getAll(): ReservaApi[] {
    console.log('🎯 Llamando por la clase decorada!');
    console.log('📡 Config endpoint:', this.config.apiEndpoint);
    console.log('⏱️ Timeout:', this.config.timeout);

    const reservas = super.getAll();
    // Agregamos info extra a las reservas
    return reservas.map(r => ({
      ...r,
      pasajero: `${r.pasajero} [VIP]`
    }));
  }
}

// 3) InjectionToken para el alias (useExisting)
export const RESERVAS_API_ALIAS = new InjectionToken<ReservasApiClient>('reservas.api.alias');
