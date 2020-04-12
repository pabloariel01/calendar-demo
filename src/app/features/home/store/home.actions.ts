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
export class UpdateAppointment {
  static readonly type = '[Home] updateAppointment';
  constructor(public appointment: IAppointment) {}
}
export class DeleteAppointment {
  static readonly type = '[Home] deleteAppointment';
  constructor(public appointment: IAppointment) {}
}
