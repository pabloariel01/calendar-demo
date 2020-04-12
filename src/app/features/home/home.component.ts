import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ICalendarCell } from 'src/app/shared/components/calendar/calendar.component';

import * as moment from 'moment';
import { Store, Select } from '@ngxs/store';
import { HomesState } from './store/home.state';
import { SelectDate, AddAppointment } from './store/home.actions';
import { map, takeUntil, delay } from 'rxjs/operators';
import { Observable, Subscription, Subject } from 'rxjs';
export interface IAppointment {
  id?: number;
  date: moment.Moment;
  cityId: number;
  reminder: string;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public selected: moment.Moment;
  public appointments$: Observable<IAppointment[]>;
  public monthlyAppointments;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(public store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.store
      .select(HomesState.GetSelectedDate)
      .subscribe((date: moment.Moment) => (this.selected = date));
  }

  public DaySelected(date): void {
    this.store.dispatch(new SelectDate(date));
    //this.selected = date;
  }

  public appointmentCreated(appointment: IAppointment) {
    this.store.dispatch(new AddAppointment(appointment));
    console.log(appointment);
  }

  public monthChanged(date): void {
    this.destroy.next(true);
    const keys = moment(date).format('YYYY-MM').split('-');
    this.appointments$ = this.store.select(HomesState.findMonthAppointments).pipe(
      takeUntil(this.destroy),
      delay(0),
      map((filterFn) => filterFn(keys[0], keys[1]))
    );
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
