import { Injectable } from '@angular/core';
import { IAppointment } from '@home/home.component';
import { Observable, of } from 'rxjs';
import { cities } from './cities';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentNmbr;
  constructor() {}

  //should be replaced with api post, second param is added to simulate backend response
  createAppointment(appointment: IAppointment, id: number): Observable<IAppointment> {
    appointment.id = id;
    const city = cities.find((city) => city.id == appointment.cityId);
    appointment.cityName = city.name;
    return of(appointment);
  }
}
