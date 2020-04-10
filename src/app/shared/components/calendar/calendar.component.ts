import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

//move to interfaces
export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public today: moment.Moment;

  public days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  public weeks: Array<CalendarDate[]> = [];
  public selectedDate;

  constructor() {}

  ngOnInit() {
    this.today = moment();
    this.selectedDate = moment(this.today).format('DD/MM/YYYY');
    this.generateCalendar();
  }

  private generateCalendar(): void {
    const dates = this.fillDates(this.today);
    const weeks = [];
    //cange to hight order function
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  private fillDates(currentMoment: moment.Moment) {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const lastOfMonth = moment(currentMoment).endOf('month').day();

    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    //it would be 35 days,*(7 days, 5 weeks, but it cuts off some months)
    const lastDayOfGrid = moment(currentMoment)
      .endOf('month')
      .subtract(lastOfMonth, 'days')
      .add(7, 'days');
    const startCalendar = firstDayOfGrid.date();

    const nmbrOfDays = startCalendar - startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days');
    const daySlots = new Array(nmbrOfDays).fill(0);

    return daySlots
      .map((_, i) => i + startCalendar)
      .map((date) => {
        const newDate = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(newDate),
          selected: this.isSelected(newDate),
          mDate: newDate
        };
      });
  }

  private isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  private isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format('DD/MM/YYYY');
  }

  public prevMonth(): void {
    this.today = moment(this.today).subtract(1, 'months');
    this.generateCalendar();
  }

  public nextMonth(): void {
    this.today = moment(this.today).add(1, 'months');
    this.generateCalendar();
  }

  public selectDate(date: CalendarDate) {
    this.selectedDate = moment(date.mDate).format('DD/MM/YYYY');
    this.generateCalendar();
  }
  public isSelectedMonth(date: moment.Moment): boolean {
    const today = moment();
    return moment(date).isSame(this.today, 'month') && moment(date).isSameOrBefore(today);
  }
}
