import { Component, signal } from '@angular/core';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DestinosViajesState } from './models/destinos-viajes-state.model';
import { VuelosComponent } from './components/vuelos/vuelos-component/vuelos-component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component';

export interface AppState {
  destinos: DestinosViajesState;
}

export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponent },
  { path: 'mas-info', component: VuelosMasInfoComponent },
  { path: 'detalle/:id', component: VuelosDetalleComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, AsyncPipe, UpperCasePipe, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('proyecto_angular');
  readonly langs = ['es', 'en', 'fr'];
  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  constructor(private translate: TranslateService) {
    this.translate.use('es');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
