import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import * as moment from 'moment';
import { Store } from '@ngxs/store';
import { HomesState } from './store/calendar/home.state';
import {
  SelectDate,
  AddAppointment,
  UpdateAppointment,
  DeleteAppointment
} from './store/calendar/home.actions';
import { map, takeUntil, delay } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ForecastService } from '@core/services/forecast.service';
import { FetchCities, SetCity, SetCurrentDay, SetImage } from './store/forecast/forecast.actions';
import { ICity, IDaily } from '@core/constants/interfaces/forecast';
import { ForecastState } from './store/forecast/forecast.state';
export interface IAppointment {
  id?: number;
  date: moment.Moment;
  cityId: number;
  reminder: string;
  color: string;
  cityName?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public selected: moment.Moment;

  public selectedAppointment: IAppointment;
  public cities: ICity[] = [];
  public dayForecast: IDaily;
  public forecastIcon: string;
  public monthlyAppointments: IAppointment[];
  public refresh: boolean;
  public refresh$:Observable<IAppointment[]>;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    public store: Store,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.store
      .select(HomesState.GetSelectedDate)
      .pipe(takeUntil(this.destroy))
      .subscribe((date: moment.Moment) => (this.selected = date));

    this.store.dispatch(new FetchCities());
    this.store.select(ForecastState.GetCities).subscribe((cities) => (this.cities = cities));
    this.store
      .select(ForecastState.GetDayForecast)
      .pipe(takeUntil(this.destroy))
      .subscribe((dayForecast: any) => {
        if (!!dayForecast.dt) {
          this.dayForecast = dayForecast;
          //todo: add wheather icon
          // const icon = dayForecast.weather[0].icon;
          // this.store.dispatch(new SetImage(icon));
        }
      });

    this.store
      .select(ForecastState.GetIcon)
      .pipe(takeUntil(this.destroy))
      .subscribe((icon: string) => {
        this.forecastIcon = icon;
      });
  }

  public cityChanged(city: ICity): void {
    this.store.dispatch(new SetCity(city));
  }

  public appointmentCreated(appointment: IAppointment) {
    if (!!appointment.id) {
      // updates

      this.store.dispatch(new UpdateAppointment(appointment));
    } else {
      //creates
      this.store.dispatch(new AddAppointment(appointment));
    }
    this.calendarDaySelected(appointment.date);
  }

  public appointmentRemoved(appointment: IAppointment): void {
    this.store.dispatch(new DeleteAppointment(appointment));
    this.calendarDaySelected(appointment.date);
  }

  public calendarDaySelected(date): void {
    this.store.dispatch(new SelectDate(date));
    this.store.dispatch(new SetCurrentDay(date));
    this.selectedAppointment = null;
  }

  public calendarAppointmentSelected(appointment: IAppointment) {
    this.store.dispatch(new SelectDate(appointment.date));
    this.store.dispatch(new SetCurrentDay(appointment.date));
    this.selectedAppointment = appointment;
  }

  public calendarMonthChanged(date): void {
    this.monthlyAppointments = null;
    const keys = moment(date).format('YYYY-MM').split('-');
    this.refresh$ =this.store
      .select(HomesState.findMonthAppointments)
      .pipe(
        takeUntil(this.destroy),
        delay(0),
        map((filterFn) => filterFn(keys[0], keys[1]))
      );

      this.refresh$.subscribe((month) => {
        this.monthlyAppointments = month;
      });
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
