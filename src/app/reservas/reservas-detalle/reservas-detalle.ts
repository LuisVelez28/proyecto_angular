import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface ReservaDetalle {
  id: number;
  pasajero: string;
  destino: string;
  fecha: string;
  estado: string;
  asiento: string;
}

@Component({
  selector: 'app-reservas-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservas-detalle.html',
  styleUrl: './reservas-detalle.scss',
})
export class ReservasDetalle implements OnInit {
  id = '';
  reserva?: ReservaDetalle;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.reserva = this.buscarReserva(this.id);
  }

  private buscarReserva(id: string): ReservaDetalle {
    const datos: Record<string, ReservaDetalle> = {
      '101': { id: 101, pasajero: 'Ana Torres', destino: 'Madrid', fecha: '2026-03-15', estado: 'Confirmada', asiento: '12A' },
      '102': { id: 102, pasajero: 'Luis Vega', destino: 'Lima', fecha: '2026-03-20', estado: 'Pendiente', asiento: '08C' },
      '103': { id: 103, pasajero: 'Carla Núñez', destino: 'Bogotá', fecha: '2026-03-28', estado: 'Confirmada', asiento: '15F' }
    };

    return datos[id] ?? {
      id: Number(id) || 0,
      pasajero: 'No encontrado',
      destino: 'No encontrado',
      fecha: '-',
      estado: 'Sin datos',
      asiento: '-'
    };
  }

}
