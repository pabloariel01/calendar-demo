import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { DayCellComponent } from './day-cell/day-cell.component';
import { AngularMaterialModule } from '@shared/material/material.module';
import { AppointmentCellComponent } from './appointment-cell/appointment-cell.component';
@NgModule({
  declarations: [CalendarComponent,  DayCellComponent, AppointmentCellComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [CalendarComponent]
})
export class CalendarModule {}
