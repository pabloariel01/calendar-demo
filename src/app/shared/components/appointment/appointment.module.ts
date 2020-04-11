import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './appointment.component';
import { AngularMaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppointmentComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [AppointmentComponent]
})
export class AppointmentModule {}
