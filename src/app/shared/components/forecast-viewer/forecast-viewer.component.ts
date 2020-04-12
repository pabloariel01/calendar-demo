import { Component, OnInit,Input, OnChanges } from '@angular/core';
import { IDaily } from '@core/constants/interfaces/forecast';

@Component({
  selector: 'app-forecast-viewer',
  templateUrl: './forecast-viewer.component.html',
  styleUrls: ['./forecast-viewer.component.scss']
})
export class ForecastViewerComponent  {
@Input() public dayForecast:IDaily;
@Input() public icon:string;
private kelvin:number=273.15;


  
  public convertToCelcius(temp){
    return temp - this.kelvin;
  }

}
