import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Reserva {
  id: number;
  pasajero: string;
  destino: string;
  fecha: string;
  estado: 'Confirmada' | 'Pendiente';
}

@Component({
  selector: 'app-reservas-listado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservas-listado.html',
  styleUrl: './reservas-listado.scss',
})
export class ReservasListado {
  reservas: Reserva[] = [
    { id: 101, pasajero: 'Ana Torres', destino: 'Madrid', fecha: '2026-03-15', estado: 'Confirmada' },
    { id: 102, pasajero: 'Luis Vega', destino: 'Lima', fecha: '2026-03-20', estado: 'Pendiente' },
    { id: 103, pasajero: 'Carla Núñez', destino: 'Bogotá', fecha: '2026-03-28', estado: 'Confirmada' }
  ];
}
