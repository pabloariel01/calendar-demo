import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CalendarModule } from 'src/app/shared/components/calendar/calendar.module';
import { AppointmentModule } from 'src/app/shared/components/appointment/appointment.module';
import { DayScheduleModule } from 'src/app/shared/components/day-schedule/day-schedule.module';
import { NgxsModule } from '@ngxs/store';
import { HomesState } from './store/home.state';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CalendarModule,
    AppointmentModule,
    DayScheduleModule,
    NgxsModule.forFeature([HomesState])
  ]
})
export class HomeModule {}
