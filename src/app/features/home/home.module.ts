import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CalendarModule } from '@shared/components/calendar/calendar.module';
import { AppointmentModule } from '@shared/components/appointment/appointment.module';
import { DayScheduleModule } from '@shared/components/day-schedule/day-schedule.module';
import { ForecastViewerModule } from '@shared/components/forecast-viewer/forecast-viewer.module';
import { NgxsModule } from '@ngxs/store';
import { HomesState } from './store/calendar/home.state';
import { ForecastState } from './store/forecast/forecast.state';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CalendarModule,
    AppointmentModule,
    DayScheduleModule,
    ForecastViewerModule,
    NgxsModule.forFeature([HomesState, ForecastState])
  ]
})
export class HomeModule {}
