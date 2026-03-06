import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasListado } from '../reservas-listado/reservas-listado';
import { ReservasDetalle } from '../reservas-detalle/reservas-detalle';

const routes: Routes = [
  { path: 'reservas', component: ReservasListado },
  { path: 'reservas/:id', component: ReservasDetalle }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
