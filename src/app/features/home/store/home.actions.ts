import * as moment from 'moment';
import { IAppointment } from '../home.component';

export class SelectDate {
  static readonly type = '[Home] setDate';
  constructor(public date: moment.Moment) {}
}

export class AddAppointment {
  static readonly type = '[Home] addAppointment';
  constructor(public appointment: IAppointment) {}
}
