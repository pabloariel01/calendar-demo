import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAppointment } from '@home/home.component';
import * as moment from 'moment';


@Component({
  selector: 'app-appointment-cell',
  templateUrl: './appointment-cell.component.html',
  styleUrls: ['./appointment-cell.component.scss']
})
export class AppointmentCellComponent implements OnInit {
  @Input() appointments: IAppointment;
  @Output() appointmentSelected: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  public pillSelected(e, appointment): void {
    this.appointmentSelected.emit(appointment.id);
    e.stopPropagation();
    e.preventDefault();
  }

  public appointmentInfo(appointment) {
    const time = moment(appointment.date).format('HH-mm');
    return `${appointment.reminder} at ${time} in ${appointment.cityName}`;
  }
}
