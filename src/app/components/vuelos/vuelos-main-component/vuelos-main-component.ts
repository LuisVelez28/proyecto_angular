import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vuelos-main-component',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './vuelos-main-component.html',
  styleUrl: './vuelos-main-component.scss',
})
export class VuelosMainComponent {
  vuelos = [
    { id: 1, destino: 'Madrid', precio: 350 },
    { id: 2, destino: 'París', precio: 280 },
    { id: 3, destino: 'Londres', precio: 420 }
  ];
}
