import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ICalendarCell } from '../calendar/calendar.component';
import { IAppointment } from 'src/app/features/home/home.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNull } from 'util';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit, OnChanges {
  //TODO: needs to recieve a ICallcell in order to update
  // @Input() public selected: ICalendarCell<IAppointment>;
  @Input() public selected: moment.Moment;
  @Output() public appointment: EventEmitter<IAppointment> = new EventEmitter();
  public reminderForm: FormGroup;

  constructor(public fb: FormBuilder) {}

  public citiesArray: any = ['NYC', 'New Mexico', 'Buenos Aires', 'Bogota', 'Quito'];

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges() {
    if (this.reminderForm && this.selected) {
      this.reminderForm.patchValue({ appointmentDate: this.selected.toISOString() });
    }
  }

  initForm() {
    this.reminderForm = this.fb.group({
      reminder: ['', [Validators.required, Validators.maxLength(10)]],
      appointmentDate: [moment(this.selected).toISOString(), [Validators.required]],
      appointmentTime: ['', [Validators.required]],
      appointmentColor: ['', [Validators.required]],
      city: ['']
    });
  }

  public hasErrors(control: string) {
    return !isNull(this.reminderForm.controls[control].errors);
  }

  public setDate(e): void {
    const parsedDate = new Date(e.target.value).toISOString().substring(0, 10);
    console.log(parsedDate);
    this.reminderForm.get('appointmentDate').setValue(parsedDate, {
      onlyself: true
    });
  }

  submitForm() {
    console.log(this.reminderForm.value);
    let appointmetMoment =
      this.reminderForm.value.appointmentDate.substring(0, 10) +
      'T' +
      this.reminderForm.value.appointmentTime +
      ':00';
    console.log(moment(appointmetMoment));

    //todo: fix city , change to factory
    this.appointment.emit({
      date: moment(appointmetMoment),
      cityId: 0,
      reminder: this.reminderForm.value.reminder,
      color: this.reminderForm.value.appointmentColor
    });
  }
}
