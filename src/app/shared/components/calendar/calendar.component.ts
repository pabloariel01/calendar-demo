import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

//move to interfaces
export interface ICalendarCell {
  date: moment.Moment;
  isSelected?: boolean;
  isToday?: boolean;

  isDisabled?: boolean; //future implementation
  classNames?: ICellClasses;
}

export interface ICellClasses {
  weekEnd?: boolean;
  offMonth: boolean;
  today: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public today: moment.Moment;

  public days: string[];
  public weeks: Array<ICalendarCell[]> = [];
  public selectedDate;

  private localeData = moment.localeData();

  constructor() {}

  ngOnInit() {
    this.days = this.localeData.weekdays();
    this.today = moment();
    this.selectedDate = moment(this.today).format('DD/MM/YYYY');

    this.renderCalendar();
  }

  private renderCalendar(): void {
    const dates = this.draw(this.today);
    const weeks = [];
    //cange to hight order function
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  private draw(currentMoment: moment.Moment): ICalendarCell[] {
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
    const daySlots: ICalendarCell[] = new Array(nmbrOfDays).fill(0);

    return daySlots
      .map((_, i) => i + startCalendar)
      .map((date) => {
        const newDate = moment(firstDayOfGrid).date(date);
        const isOffMonth = this.isOffMonth(newDate);
        //refactor
        return {
          today: this.isToday(newDate),
          isSelected: this.isSelected(newDate),
          date: newDate,
          classNames: {
            weekend: this.isWeekend(newDate) && !isOffMonth,
            offMonth: isOffMonth,
            today: this.isToday(newDate),
            selected: this.isSelected(newDate)
          }
        };
      });
  }

  private isOffMonth(date: moment.Moment): boolean {
    return this.localeData.months(date) !== this.today.format('MMMM');
  }

  private isWeekend(date: moment.Moment): boolean {
    const weekends = ['Saturday', 'Sunday'];
    const todayDay = this.localeData.weekdays(date);

    return weekends.indexOf(todayDay) != -1;
  }
  private isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  private isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format('DD/MM/YYYY');
  }

  public prevMonth(): void {
    this.today = moment(this.today).subtract(1, 'months');
    this.renderCalendar();
  }

  public nextMonth(): void {
    this.today = moment(this.today).add(1, 'months');
    this.renderCalendar();
  }

  public selectDate(date: ICalendarCell): void {
    this.selectedDate = moment(date.date).format('DD/MM/YYYY');
    this.renderCalendar();
  }
}
