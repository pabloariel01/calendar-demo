import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { DateGridComponent } from './date-grid/date-grid.component';
import { DayComponent } from './day/day.component';
import { EventComponent } from './event/event.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalendarComponent, DateGridComponent, DayComponent, EventComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CalendarComponent]
})
export class CalendarModule {}
