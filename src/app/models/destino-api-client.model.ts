import { BehaviorSubject, Observable, Subject } from "rxjs";
import { DestinoViaje } from "./destino-viaje.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { APP_CONFIG } from "../app.config";
import { tap } from "rxjs/operators";
import { DexieService } from "../services/dexie.service";
import { Store } from "@ngrx/store";
import { DestinosViajesState, ElegidoFavoritoAction, NuevoDestinoAction } from "./destinos-viajes-state.model";

@Injectable()
export class DestinoViajeApiClient {
  private http = inject(HttpClient);
  private appConfig = inject(APP_CONFIG);
  private dexieService = inject(DexieService);
  private store = inject(Store<{ destinos: DestinosViajesState }>);
  destinos: DestinoViaje[] = [];
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null as any);

  constructor() {}

  add(d: DestinoViaje): Observable<any> {
    this.destinos.push(d);
    const headers = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    return this.http.post(`${this.appConfig.apiEndpoint}/mydestinos`, { nuevo:d.nombre }, { headers: headers }).pipe(
      tap(() => {
        this.store.dispatch(new NuevoDestinoAction(d));
        this.store.dispatch(new ElegidoFavoritoAction(d));
        void this.dexieService.destinos.add({ nombre: d.nombre, imagenUrl: d.imagenUrl });
      })
    );
  }

  getAll(): Observable<string[]> {
    const headers = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    return this.http.get<string[]>(`${this.appConfig.apiEndpoint}/mydestinos`, { headers });
  }

  getById(id: String): DestinoViaje {
    return this.destinos.filter((d) => (d as any).id === id)[0];
  }

  elegir(d: DestinoViaje) {
    this.destinos.forEach(x => x.setSelected(false));
    d.setSelected(true);
    this.current.next(d);
  }

  subscribeOnChange(fn: (value: DestinoViaje) => void) {
    this.current.subscribe(fn);
  }
}
