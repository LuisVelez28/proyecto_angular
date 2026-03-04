export class DestinoViaje {
  private selected: boolean = false;
  public servicios: string[];
  public votos: number = 0;
  constructor(public nombre: string, public imagenUrl: string) {
    this.servicios = ['pasajes', 'alojamiento', 'traslados', 'tours'];
    }
  isSelected(): boolean {
    return this.selected;
  }
  setSelected(s:boolean) {
    this.selected = s;
  }
}
