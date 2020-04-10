import * as moment from 'moment';
import { IAppointment } from '../home.component';

export class SelectDate {
  static readonly type = '[Home] setDate';
  constructor(public date: moment.Moment) {}
}

export class AddEvent {
  static readonly type = '[Home] addEvent';
  constructor(public appointment: IAppointment) {}
}
