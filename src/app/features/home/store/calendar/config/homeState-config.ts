import * as moment from 'moment';
import { IDictionary } from '@core/utils/interfaces/dictionary';
import { IAppointment } from '@home/home.component';

export interface ICalendarState {
  years?: IDictionary<IMonth>;
  selectedDay: moment.Moment;
  appointmentNmbr: number;
}
//changed in order to look like a rest api respose and easier to find like 2020.18.3

interface IMonth {
  month?: IDictionary<IDay>[];
}

interface IDay {
  day?: IDictionary<IAppointment>[];
}

const today = moment();

export const initialState: ICalendarState = {
  selectedDay: moment(),
  years: {
    [moment(today).format('YYYY')]: {}
  },
  appointmentNmbr: 0
};
