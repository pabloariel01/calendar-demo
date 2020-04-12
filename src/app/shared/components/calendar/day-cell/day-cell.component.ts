import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAppointment } from '@home/home.component';
import { ICalendarCell } from '../calendar.component';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.scss']
})
export class DayCellComponent implements OnInit {
  @Input() day: ICalendarCell<IAppointment>;
  @Output() eraseAll: EventEmitter<ICalendarCell<IAppointment>> = new EventEmitter();
  @Output() addAppointment: EventEmitter<ICalendarCell<IAppointment>> = new EventEmitter();
  @Output() selectAppointment: EventEmitter<IAppointment> = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  public NewAppointment(event, day): void {
    console.log(day);
    event.preventDefault();
    event.stopPropagation();
    // this.addAppointment.emit()
  }

  public removeAllAppointment(event): void {
    event.preventDefault();
    event.stopPropagation();
    // this.eraseAll.emit()
  }

  public appointmentSelected(id: number): void {
    const appointment = this.day.appointments.find((appointment:IAppointment) => appointment.id == id);
    this.selectAppointment.emit(appointment)
  }
}
