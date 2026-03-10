import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface DestinoPersistido {
  id?: number;
  nombre: string;
  imagenUrl: string;
}

@Injectable({ providedIn: 'root' })
export class DexieService extends Dexie {
  destinos!: Dexie.Table<DestinoPersistido, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl'
    });
    this.version(2).stores({
      destinos: '++id, nombre, imagenUrl'
    });
    this.destinos = this.table('destinos');

  }
}
