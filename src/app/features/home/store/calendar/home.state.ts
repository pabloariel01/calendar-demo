import { State, Action, StateContext, createSelector, Selector } from '@ngxs/store';
import { AddAppointment, SelectDate, UpdateAppointment, DeleteAppointment } from './home.actions';
import { initialState, ICalendarState } from './config/homeState-config';
import { AppointmentService } from '@core/services/appointment.service';

import * as moment from 'moment';
import * as _ from 'lodash';
import { isNull } from 'util';
import { IAppointment } from '@home/home.component';

@State<ICalendarState>({
  name: 'home',
  defaults: initialState
})
export class HomesState {
  constructor(private appointmentService: AppointmentService) {}

  @Selector()
  static findMonthAppointments(state: ICalendarState) {
    return (year: string, month: string) => {
      const events = _.get(state.years, `${[year]}.${[month]}`, null);
      return !!events ? events : [];
    };
  }

  static findAppointmentInDay(year: number, month: number, day: number, id: number) {
    return createSelector([HomesState], (state: ICalendarState) => {
      const events: IAppointment[] = _.get(state, `${[year]}.${[month]}.${[day]}`, []);
      if (events.length) {
        return events.find((evt: IAppointment) => evt.id == id);
      }
      return null;
    });
  }

  @Selector()
  public static GetSelectedDate(state: ICalendarState): moment.Moment {
    return state.selectedDay;
  }

  @Action(SelectDate)
  selectDate({ patchState, getState }: StateContext<ICalendarState>, { date }: SelectDate) {
    const state: ICalendarState = getState();
    patchState({
      selectedDay: date
    });
    return state;
  }

  @Action(AddAppointment)
  addEvent(
    { patchState, getState }: StateContext<ICalendarState>,
    { appointment }: AddAppointment
  ) {
    const state: ICalendarState = getState();
    const appointmentNmbr = state.appointmentNmbr ? state.appointmentNmbr : 1;

    const position = moment(appointment.date).format('YYYY-MM-DD').split('-');

    let events = _.get(state.years, `${[position[0]]}.${[position[1]]}.${[position[2]]}`, null);

    this.appointmentService
      .createAppointment(appointment, appointmentNmbr)
      .subscribe((newAppointment) => {
        if (isNull(events)) {
          _.set(state.years, `${[position[0]]}.${[position[1]]}.${[position[2]].toString()}`, [
            newAppointment
          ]);
        } else {
          events.push(newAppointment);
          _.set(
            state.years,
            `${[position[0]]}.${[position[1]]}.${[position[2]].toString()}`,
            events
          );
        }
        patchState({ years: state.years });
        patchState({ appointmentNmbr: appointmentNmbr + 1 });
      });
  }

  @Action(UpdateAppointment)
  updateEvent(
    { patchState, getState }: StateContext<ICalendarState>,
    { appointment }: UpdateAppointment
  ) {
    const state: ICalendarState = getState();

    const position = moment(appointment.date).format('YYYY-MM-DD').split('-');

    let appointments = _.get(
      state.years,
      `${[position[0]]}.${[position[1]]}.${[position[2]]}`,
      null
    );

    appointments = appointments.filter((appointments) => appointments.id !== appointment.id);
    appointments.push(appointment);
    _.set(
      state.years,
      `${[position[0]]}.${[position[1]]}.${[position[2]].toString()}`,
      appointments
    );

    patchState({ years: state.years });
  }

  getAppointmentDay(state, date) {
    const position = moment(date).format('YYYY-MM-DD').split('-');

    const day = _.get(state.years, `${[position[0]]}.${[position[1]]}.${[position[2]]}`, null);

    return { day, position };
  }

  @Action(DeleteAppointment)
  deleteAppointment(
    { patchState, getState }: StateContext<ICalendarState>,
    { appointment }: UpdateAppointment
  ) {
    const state: ICalendarState = getState();
    const result =this.getAppointmentDay(state, appointment.date);
    let dayAppointments = result.day;
    let position= result.position;
    // const position = this.getAppointmentDay(state,appointment.date).position;
    dayAppointments = dayAppointments.filter((appt) => appt.id != appointment.id);
    _.set(
      state.years,
      `${[position[0]]}.${[position[1]]}.${[position[2]].toString()}`,
      dayAppointments
    );
    patchState({ years: state.years });
  }
}
