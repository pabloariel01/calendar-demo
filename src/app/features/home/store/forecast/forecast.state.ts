import { State, Selector, Action, StateContext } from '@ngxs/store';
import { IForecastState, initialState } from './config/forecastState.config';
import { ForecastService } from '@core/services/forecast.service';
import {
  FetchCities,
  SetCity,
  SetWeather,
  SetCurrentDay,
  SetImage,
  Complete
} from './forecast.actions';
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
  public static GetIcon(state: IForecastState) {
    return state.image;
  }

  @Selector()
  static GetDayForecast(state: IForecastState) {
    
    //chec for forecast
    const today = moment();
    const daysRange = 7;

    const maxDay = moment().add(daysRange, 'days');
    const selected = state.currentDate;
    if (
      moment().isSame(selected, 'days') ||
      (moment().isBefore(selected) && maxDay.isAfter(selected))
    ) {
      const forecastDayPos = daysRange - maxDay.diff(selected, 'days') ;
      if (state.forecast) {
          const dayforecast=state.forecast.daily[forecastDayPos]
        return dayforecast;
      }
    }
    return [];
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
  public setCity({ patchState, dispatch }: StateContext<IForecastState>, { city }: SetCity) {
    patchState({ city });
    return dispatch(new SetWeather());
  }

  @Action(SetWeather)
  public setWeather({ dispatch, getState, patchState }: StateContext<IForecastState>): SetWeather {
    const stateCity: ICity = getState().city;
    return this.forecastService.getWeatherPrediction(stateCity.coord).subscribe((forecast) => {
      patchState({ forecast });
      return dispatch(new Complete());
    });
  }
  @Action(Complete)
  public complete() {}

  @Action(SetImage)
  public setImage({  patchState }: StateContext<IForecastState> ,{image}:SetImage): SetImage {
    const iconPath= this.forecastService.getForecastIcon(image)
    return patchState({ image: iconPath });
  }
}
