import { ICity } from '@core/constants/interfaces/forecast';
import * as moment from 'moment';

export class SetWeather {
  static readonly type = '[Weather] setWeather';
}

export class SetCity {
  static readonly type = '[Weather] setCity';
  constructor(public city: ICity) {}
}

export class SetCurrentDay {
  static readonly type = '[Weather] setCurrentDay';
  constructor(public currentDate: moment.Moment) {}
}

export class FetchCities {
  static readonly type = '[Weather] fetchCities';

}
export class Complete {
  static readonly type = '[Weather] complete';

}
export class SetImage {
  static readonly type = '[Weather] setImage';
  constructor(public image: string) {}
  
}
