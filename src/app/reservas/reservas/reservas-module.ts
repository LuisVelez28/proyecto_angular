import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReservasRoutingModule } from './../reservas/reservas-routing-module';
import { ReservasListado } from '../reservas-listado/reservas-listado';
import { ReservasDetalle } from '../reservas-detalle/reservas-detalle';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReservasRoutingModule,
    ReservasListado,
    ReservasDetalle
  ],
})
export class ReservasModule { }
