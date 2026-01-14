import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';

import { DeviceService } from '../../services/device';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  templateUrl: './device-form.html',
  styleUrl: './device-form.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceForm {

  private fb = inject(FormBuilder);
  private deviceService = inject(DeviceService);

  constructor(private router: Router) {}


  deviceForm = this.fb.group({
    name: ['', Validators.required],
    type: ['outro', Validators.required],   
    location: ['', Validators.required],
    purchase_date: [null],                  
    in_use: [false]                         
  });

  onSubmit(): void {

    if (this.deviceForm.invalid) {
      alert('Formulário inválido');
      return;
    }

    this.deviceService.createDevice(this.deviceForm.value as any)
      .subscribe({
        next: () => {
          alert('Device salvo com sucesso');
          this.deviceForm.reset({
            in_use: false,
            type: 'outro'
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro backend:', err.error);
          alert('Erro ao salvar device');
        }
      });
  }
}
