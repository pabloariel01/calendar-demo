import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentModule } from './appointment.module';
import { AppointmentComponent } from './appointment.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppointmentModule, NoopAnimationsModule],
      providers: [{ provide: FormBuilder, useValue: fb }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;

    component.reminderForm = fb.group({
      reminder: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentColor: '',
      id: '',
      city: ''
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // funcion setForm(){

  // }

  it('should check reminder  validity', () => {
    let reminder = component.reminderForm.controls.reminder;
    reminder.setValue('');
    expect(reminder.hasError('required')).toBeTruthy();
    reminder.setValue('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    expect(reminder.hasError('maxlength')).toBeTruthy();
  });

  it('should check other fields', () => {
    const date = component.reminderForm.controls.appointmentDate;
    date.setValue('');
    expect(date.hasError('required')).toBeTruthy();
    const time = component.reminderForm.controls.appointmentTime;
    expect(time.hasError('required')).toBeTruthy();
    const color = component.reminderForm.controls.appointmentColor;
    expect(color.hasError('required')).toBeTruthy();
    const city = component.reminderForm.controls.city;
    city.setValue('');
    expect(city.hasError('required')).toBeTruthy();

    const canSave = component.canSave();
    expect(canSave).toBe(false);
  });

  it('shoud create when values are corrects', () => {
    const testValues = {
      reminder: 'walk dog',
      appointmentDate: moment(),
      appointmentTime: '17:30',
      appointmentColor: '#f5f5f5',
      city: 3433955,
      id: ''
    };

    component.appointmentCreated.subscribe((appointment) => {
      const areEquals = _.isEqual(testValues, appointment);
      expect(areEquals).toBeTruthy();
    });

    component.reminderForm.patchValue({ testValues });
    component.submitForm();
  });
  it('shoud return false if form is invalid ', () => {
    const testValues = {
      reminder: '',
      appointmentDate: moment(),
      appointmentTime: '17:30',
      appointmentColor: '#f5f5f5',
      city: 3433955,
      id: 'appoint.id'
    };


    component.reminderForm.patchValue({ testValues });
    
    expect(component.canSave()).toBe(false);
    expect(component.submitForm()).toBeFalsy()
  });

});
