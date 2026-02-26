export class DestinoViaje {
  private static nextId = 1;

  nombre: string;
  imagenUrl: string;

  constructor(n: string, u: string) {
    this.nombre = n;
    this.imagenUrl = u;
  }
}
