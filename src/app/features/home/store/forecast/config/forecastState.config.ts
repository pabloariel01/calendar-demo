import { ICity, IForecast } from '@core/constants/interfaces/forecast';
import * as moment from 'moment';

export interface IForecastState {
  cities: ICity[];
  city: ICity;
  forecast: IForecast;
  currentDate: moment.Moment;
  image:string
}

export const initialState: IForecastState = {
  cities: null,
  city: null,
  forecast: null,
  currentDate: null,
  image: null,
};
