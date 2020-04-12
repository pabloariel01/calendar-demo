export interface ICityCoordinates {
  lon: number;
  lat: number;
}

export interface ICity {
  id: number;
  name: string;
  country: string;
  coord: ICityCoordinates;
}

export interface IForecast {
  lat: number;
  lon: number;
  daily: IDaily[];
}

interface IDaily {
  dt: number;
  temp: number;
  weather: IWeather[];
}

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ITemp {
  day: number;
}
