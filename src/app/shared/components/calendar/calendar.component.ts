import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import * as moment from 'moment';
import { IAppointment } from '@home/home.component';
import { isNull } from 'util';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//move to interfaces
export interface ICalendarCell<T> {
  date: moment.Moment;
  isSelected?: boolean;
  isToday?: boolean;
  isDisabled?: boolean; //future implementation
  appointments?: T[];
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
  public weeks: Array<ICalendarCell<any>[]> = [];
  public selectedDate: string;
  public monthlyAppointments: IAppointment[] = [];

  @Input() public selected;
  @Input() public appointments$: Observable<IAppointment[]>;

  @Output() public daySelected: EventEmitter<moment.Moment> = new EventEmitter();  
  @Output() public appointmentSelected: EventEmitter<IAppointment> = new EventEmitter();
  @Output() public monthChanged: EventEmitter<moment.Moment> = new EventEmitter();


  private localeData = moment.localeData();
  private destroy: Subject<boolean> = new Subject<boolean>();
  y;
  constructor() {}


  ngOnInit() {
    this.days = this.localeData.weekdays();
    this.today = moment();
    this.selectedDate = moment(this.today).format('DD/MM/YYYY');
    this.monthChanged.emit(this.today);

    this.appointments$.pipe(takeUntil(this.destroy)).subscribe((appointments) => {
      this.monthlyAppointments = appointments;
      this.renderCalendar();
    });
  }

  private renderCalendar(): void {
    //transforms plain array to array of weeks
    const dates = this.draw(this.today);

    //get appointments

    this.transformIntoWeeks(dates);
  }

  private transformIntoWeeks(dates: ICalendarCell<any>[]): void {
    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  private draw(currentMoment: moment.Moment): ICalendarCell<any>[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const lastOfMonth = moment(currentMoment).endOf('month').day();

    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    // it would be 35 days,*(7 days, 5 weeks, but it cuts off some months)
    const lastDayOfGrid = moment(currentMoment)
      .endOf('month')
      .subtract(lastOfMonth, 'days')
      .add(7, 'days');
    const startCalendar = firstDayOfGrid.date();

    const nmbrOfDays = startCalendar - startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days');
    const daySlots: ICalendarCell<any>[] = new Array(nmbrOfDays).fill(0);

    return daySlots
      .map((_, i) => i + startCalendar)
      .map((date) => {
        const newDate = moment(firstDayOfGrid).date(date);
        const isOffMonth = this.isOffMonth(newDate);
        // refactor

        return {
          today: this.isToday(newDate),
          isSelected: this.isSelected(newDate),
          date: newDate,
          appointments: this.hasAppointments(newDate),
          classNames: {
            weekend: this.isWeekend(newDate) && !isOffMonth,
            offMonth: isOffMonth,
            today: this.isToday(newDate),
            selected: this.isSelected(newDate)
          }
        };
      });
  }

 
  private hasAppointments(date: moment.Moment): IAppointment[] {
    const day = moment(date).format('DD');
    let todayAppoinments: IAppointment[] = this.monthlyAppointments[day];
    if (!todayAppoinments) return [];
    todayAppoinments.sort((a, b) => a.date.valueOf() - b.date.valueOf());

    return todayAppoinments;
  }

  private isOffMonth(date: moment.Moment): boolean {
    return this.localeData.months(date) !== this.today.format('MMMM');
  }

  private isWeekend(date: moment.Moment): boolean {
    const weekends = ['Saturday', 'Sunday'];
    const todayDay = this.localeData.weekdays(date);

    return weekends.indexOf(todayDay) !== -1;
  }
  private isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  private isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format('DD/MM/YYYY');
  }

  public prevMonth(): void {
    this.today = moment(this.today).subtract(1, 'months');
    this.monthChanged.emit(this.today);
    this.renderCalendar();
  }

  public nextMonth(): void {
    this.today = moment(this.today).add(1, 'months');
    this.monthChanged.emit(this.today);
    this.renderCalendar();
  }

  public selectDate(date: ICalendarCell<any>): void {
    this.selectedDate = moment(date.date).format('DD/MM/YYYY');
    this.daySelected.emit(date.date);
    this.renderCalendar();
  }

  public selectAppointment(appointment:IAppointment):void{
    this.appointmentSelected.emit(appointment);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
