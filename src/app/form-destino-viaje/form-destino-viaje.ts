import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-form-destino-viaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.scss',
})
export class FormDestinoViaje {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  form;

  constructor(private fb: FormBuilder) {
    this.onItemAdded = new EventEmitter<DestinoViaje>();
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      imagenUrl: ['', [Validators.required]],
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nombre = this.form.value.nombre ?? '';
    const imagenUrl = this.form.value.imagenUrl ?? '';
    this.onItemAdded.emit(new DestinoViaje(nombre, imagenUrl));
    this.form.reset();
  }

}
