import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayScheduleComponent } from './day-schedule.component';

@NgModule({
  declarations: [DayScheduleComponent],
  imports: [CommonModule],
  exports: [DayScheduleComponent]
})
export class DayScheduleModule {}
