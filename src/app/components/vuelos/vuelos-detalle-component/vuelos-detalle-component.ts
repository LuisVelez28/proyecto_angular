import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vuelos-detalle-component',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './vuelos-detalle-component.html',
  styleUrl: './vuelos-detalle-component.scss',
})
export class VuelosDetalleComponent implements OnInit {
  id: string = '';
  vueloDetalle: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    // Simular carga de datos según el ID recibido por URL
    this.cargarDetalle(this.id);
  }

  cargarDetalle(id: string) {
    // Simulación de datos según ID
    const vuelos: any = {
      '1': { id: 1, destino: 'Madrid', precio: 350, salida: '10:00', llegada: '12:30' },
      '2': { id: 2, destino: 'París', precio: 280, salida: '14:00', llegada: '16:15' },
      '3': { id: 3, destino: 'Londres', precio: 420, salida: '08:30', llegada: '11:00' }
    };
    this.vueloDetalle = vuelos[id] || { destino: 'Desconocido' };
  }
}
