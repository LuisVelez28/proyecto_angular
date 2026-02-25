import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pruebas } from "./pruebas/pruebas";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Pruebas],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('proyecto_angular');
}
