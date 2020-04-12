import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAppointment } from '@home/home.component';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.scss']
})
export class DayCellComponent implements OnInit {
  @Input() day: IAppointment;
  @Output() eraseAll: EventEmitter<IAppointment> = new EventEmitter();
  @Output() addAppointment: EventEmitter<IAppointment> = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  public NewAppointment(event): void {
    event.preventDefault();
    console.log(event);
    // this.addAppointment.emit()
  }

  public removeAllAppointment(event): void {
    event.preventDefault();
    // this.eraseAll.emit()
  }
}
