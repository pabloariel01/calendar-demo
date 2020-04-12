import { State, Selector, Action, StateContext } from '@ngxs/store';
import { IForecastState, initialState } from './config/forecastState.config';
import { ForecastService } from '@core/services/forecast.service';
import { FetchCities, SetCity, SetWeather, SetCurrentDay } from './forecast.actions';
import { ICity } from '@core/constants/interfaces/forecast';
import * as moment from 'moment';

@State<IForecastState>({
  name: 'forecast',
  defaults: initialState
})
export class ForecastState {
  constructor(private forecastService: ForecastService) {}

  @Selector()
  public static GetCities(state: IForecastState) {
    return state.cities;
  }
  @Selector()
  public static GetForecast(state: IForecastState) {
    return state.forecast;
  }
  @Selector()
  static GetDayForecast(state: IForecastState) {
    console.log(state);
    // return (date:moment.Moment ) => {
    // console.log(state)
    //   const events = _.get(state.years, `${[year]}.${[month]}`, null);
    //   return !!events ? events : [];
    // };
  }

  @Action(SetCurrentDay)
  public setCurrentDay(
    { patchState }: StateContext<IForecastState>,
    { currentDate }: SetCurrentDay
  ): SetCurrentDay {
    return patchState({ currentDate });
  }

  @Action(FetchCities)
  public fetchCities({ patchState }: StateContext<IForecastState>): FetchCities {
    return this.forecastService.getLocations().subscribe((locations) => {
      return patchState({ cities: locations });
    });
  }

  @Action(SetCity)
  public setCity(
    { patchState, dispatch }: StateContext<IForecastState>,
    { city }: SetCity
  ): SetWeather {
    patchState({ city });
    return dispatch(new SetWeather());
  }

  @Action(SetWeather)
  public setWeather({ getState, patchState }: StateContext<IForecastState>): SetWeather {
    const stateCity: ICity = getState().city;
    return this.forecastService.getWeatherPrediction(stateCity.coord).subscribe((forecast) => {
      return patchState({ forecast });
    });
  }
}
