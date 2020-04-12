import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { IAppointment } from '@home/home.component';

@Component({
  selector: 'app-appointment-cell',
  templateUrl: './appointment-cell.component.html',
  styleUrls: ['./appointment-cell.component.scss']
})
export class AppointmentCellComponent implements OnInit {
  @Input() appointments: IAppointment;
  @Output() appointmentSelected:EventEmitter<number>=new EventEmitter()
  constructor() {}

  ngOnInit() {
  }
  public pillSelected(e,appointment):void{
    this.appointmentSelected.emit(appointment.id)
  }
}
