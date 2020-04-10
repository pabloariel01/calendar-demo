import { State, Action, StateContext, createSelector, Select, Selector } from '@ngxs/store';
import { AddEvent, SelectDate } from './home.actions';
import { ICalendarState, initialState } from './interfaces/calendar-structure';
import * as moment from 'moment';

@State<ICalendarState>({
  name: 'home',
  defaults: initialState
})
export class HomesState {
  static findAppointments(year: number, month: number) {
    return createSelector([HomesState], (state: ICalendarState) => {
      const events = state.years
        .filter((yrs) => yrs.id === year)
        .filter((months) => months.id === month);
      return events.length > 0 ? events : [];
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

  @Action(AddEvent)
  addEvent({ patchState, getState }: StateContext<ICalendarState>, { appointment }: AddEvent) {
    const state: ICalendarState = getState();

    console.log({ appointment, state });
  }
}
