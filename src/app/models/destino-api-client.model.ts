import { BehaviorSubject, Observable, Subject } from "rxjs";
import { DestinoViaje } from "./destino-viaje.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { APP_CONFIG } from "../app.config";

@Injectable()
export class DestinoViajeApiClient {
  private http = inject(HttpClient);
  private appConfig = inject(APP_CONFIG);
  destinos: DestinoViaje[] = [];
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null as any);

  constructor() {}

  add(d: DestinoViaje): Observable<any> {
    this.destinos.push(d);
    const headers = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    return this.http.post(`${this.appConfig.apiEndpoint}/mydestinos`, { nuevo:d.nombre }, { headers: headers });
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
