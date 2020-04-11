import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { DateGridComponent } from './date-grid/date-grid.component';
import { EventComponent } from './event/event.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DayCellComponent } from './day-cell/day-cell.component';

@NgModule({
  declarations: [CalendarComponent, DateGridComponent, EventComponent, DayCellComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CalendarComponent]
})
export class CalendarModule {}
