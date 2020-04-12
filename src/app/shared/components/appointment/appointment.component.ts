import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { ICalendarCell } from '../calendar/calendar.component';
import { IAppointment } from 'src/app/features/home/home.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNull } from 'util';
import * as moment from 'moment';
import { ICity, IDaily } from '@core/constants/interfaces/forecast';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit, OnChanges {
  @Input() public cities: ICity[] = [];
  @Input() public selectedAppointment: IAppointment;
  @Input() public selectedDate: moment.Moment;


  @Output() public appointmentCreated: EventEmitter<IAppointment> = new EventEmitter();
  @Output() public appointmentRemoved: EventEmitter<IAppointment> = new EventEmitter();
  @Output() public cityChanged: EventEmitter<ICity> = new EventEmitter();
  public reminderForm: FormGroup;

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges() {
    if (this.reminderForm && this.selectedDate && !this.selectedAppointment) {
      this.reminderForm.reset();
      this.reminderForm.patchValue({ appointmentDate: this.selectedDate.toISOString() });
    } else if (this.selectedAppointment) {
      this.fillEvent();
    }
  }

  private initForm(): void {
    this.reminderForm = this.fb.group({
      reminder: ['', [Validators.required, Validators.maxLength(30)]],
      appointmentDate: [moment(this.selectedDate).toISOString(), [Validators.required]],
      appointmentTime: ['', [Validators.required]],
      appointmentColor: ['', [Validators.required]],
      id: [''],
      city: ['0', [Validators.required]]
    });
  }

  public hasErrors(control: string) {
    return !isNull(this.reminderForm.controls[control].errors);
  }

  public setDate(e): void {
    const parsedDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.reminderForm.get('appointmentDate').setValue(parsedDate, {
      onlyself: true
    });
  }

  private fillEvent(): void {
    const appoint = this.selectedAppointment;
    this.reminderForm.reset();
    const date = moment(appoint.date).toISOString();
    const time = moment(appoint.date).format('HH:mm');
    this.reminderForm.patchValue({
      reminder: appoint.reminder,
      appointmentDate: date,
      appointmentTime: time,
      appointmentColor: appoint.color,
      city: appoint.cityId,
      id: appoint.id
    });
  }

  public canSave(): boolean {
    return this.reminderForm.valid && this.reminderForm.dirty;
  }

 
  public removeAppointment() {
    // this.reminderForm.reset();
        
    this.appointmentRemoved.emit(this.selectedAppointment);
  }

  public cityCHanged(newValue): void {
    const id = newValue.value;
    const city = this.cities.find((city) => city.id == id);
    this.cityChanged.emit(city);
  }

  public canRemove():boolean {
    return !!this.reminderForm.value.id;    
  }

  public submitForm() {

    let appointmetMoment =
      this.reminderForm.value.appointmentDate.substring(0, 10) +
      'T' +
      this.reminderForm.value.appointmentTime +
      ':00';

    //todo: fix city , change to factory
    if (this.reminderForm.valid && this.reminderForm.dirty) {
      this.appointmentCreated.emit({
        date: moment(appointmetMoment),
        cityId: 0,
        reminder: this.reminderForm.value.reminder,
        color: this.reminderForm.value.appointmentColor,
        id: this.reminderForm.value.id
      });
      this.reminderForm.reset();
    } else {
      //TODO: change and remove alert
      return false
    }
  }
}
