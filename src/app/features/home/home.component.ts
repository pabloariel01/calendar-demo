import { Component, OnInit } from '@angular/core';
import { ICalendarCell } from 'src/app/shared/components/calendar/calendar.component';

import * as moment from 'moment';
import { Store } from '@ngxs/store';
import { HomesState } from './store/home.state';
import { SelectDate } from './store/home.actions';
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
export class HomeComponent implements OnInit {
  public selected: moment.Moment;
  constructor(public store: Store) {}

  ngOnInit() {
    this.store
      .select(HomesState.GetSelectedDate)
      .subscribe((date: moment.Moment) => (this.selected = date));
  }

  public DaySelected(date): void {
    this.store.dispatch(new SelectDate(date));
    //this.selected = date;
  }

  public appointmentCreated(appointment) {
    console.log(appointment);
  }
}
