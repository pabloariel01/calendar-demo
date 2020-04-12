import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { cities } from './cities';
import { of, Observable } from 'rxjs';
import { ICityCoordinates, ICity, IForecast } from '@core/constants/interfaces/forecast';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private weatherApiUrl: string = 'https://api.openweathermap.org/data/';
  private weatherImageUrl: string = 'http://openweathermap.org/img/wn/';
  private wheatherApiVersion: string = '2.5';
  constructor(private http: HttpClient) {}

  //since it doesnt have an endpoint and no backend optimization, a reduced version is used
  public getLocations(): Observable<ICity[]> {
    return of(cities);
  }

  //Daily forecast for 7 days
  public getWeatherPrediction(coordinates: ICityCoordinates): Observable<IForecast> {
    return this.http.get<IForecast>(
      `${this.weatherApiUrl}${this.wheatherApiVersion}` +
        `/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${environment.weatherApiKey}`
    );
  }

  public getForecastIcon(icon: string):string {
    return `${this.weatherImageUrl}${icon}@2x.png`;
  }
}
