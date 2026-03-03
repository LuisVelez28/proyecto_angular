import { BehaviorSubject, Subject } from "rxjs";
import { DestinoViaje } from "./destino-viaje.model";

export class DestinoViajeApiClient {
  destinos: DestinoViaje[] = [];
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null as any);
  constructor() {
    this.destinos = [];
  }
  add(d: DestinoViaje) {
    this.destinos.push(d);
  }

  getAll() {
    return this.destinos;
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
