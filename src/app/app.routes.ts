import { Routes } from '@angular/router';
import { ListaDestinos } from './lista-destinos/lista-destinos';
import { DestinoDetalle } from './destino-detalle/destino-detalle';

export const routes: Routes = [
  { path: 'home', component: ListaDestinos },
  { path: 'destino', component: DestinoDetalle },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
