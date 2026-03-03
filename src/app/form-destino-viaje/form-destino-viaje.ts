import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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
      nombre: ['', Validators.compose([
        Validators.required,
        this.minLengthValidator(3)
      ])],
      imagenUrl: ['', Validators.compose([
        Validators.required,
        this.urlValidator()
      ])],
    });
  }

  // Validador personalizado: mínimo de caracteres
  minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Si está vacío, lo maneja 'required'
      }
      return control.value.length >= minLength ? null : { minLength: { requiredLength: minLength, actualLength: control.value.length } };
    };
  }

  // Validador personalizado: formato URL válido
  urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Si está vacío, lo maneja 'required'
      }
      const urlPattern = /^(http|https):\/\//;
      return urlPattern.test(control.value) ? null : { invalidUrl: true };
    };
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
