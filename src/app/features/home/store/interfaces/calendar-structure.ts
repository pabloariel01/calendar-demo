import * as moment from 'moment';
import { IAppointment } from '../../home.component';

export interface ICalendarState {
  selectedDay: moment.Moment;
  years?: IYear[];
}

interface IYear {
  id: number;
  months?: IMonth[] | [];
}

interface IMonth {
  id: number;
  appointment: IAppointment[];
}

const today = moment();

export const initialState: ICalendarState = {
  selectedDay: moment(),
  years: [
    {
      id: +moment(today).format('YYYY'),
      months: []
    }
  ]
};
