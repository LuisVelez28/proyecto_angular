import { Routes } from '@angular/router';
import { ListaDestinos } from './components/lista-destinos/lista-destinos';
import { DestinoDetalle } from './components/destino-detalle/destino-detalle';
import { Login } from './components/login/login/login';
import { Protected } from './components/protected/protected/protected';
import { usuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'home', component: ListaDestinos },
  { path: 'destino', component: DestinoDetalle },
  { path: 'protected', component: Protected, canActivate: [usuarioLogueadoGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
