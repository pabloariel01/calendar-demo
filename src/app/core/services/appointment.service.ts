import { Injectable } from '@angular/core';
import { IAppointment } from '@home/home.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentNmbr;
  constructor() {}

  //should be replaced with api post, second param is added to simulate backend response
  createAppointment(appointment: IAppointment, id: number): Observable<IAppointment> {
    appointment.id = id;
    return of(appointment);
  }
}
