import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pqrsdf',
  templateUrl: './pqrsdf.component.html',
  styleUrls: ['./pqrsdf.component.css']
})
export class PqrsdfComponent implements OnInit {

  pqrsdfForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pqrsdfForm = this.fb.group({
      tipoCaso: ['', Validators.required],
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      area: ['', Validators.required],
      aceptoDatos: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.pqrsdfForm.valid) {
      // console.log('Datos enviados:', this.pqrsdfForm.value);
      alert('Formulario enviado con éxito. Pronto te contactaremos.');
      this.pqrsdfForm.reset();
    } else {
      this.pqrsdfForm.markAllAsTouched();
    }
  }
}
