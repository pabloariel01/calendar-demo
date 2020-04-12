import { Component, OnInit,Input, OnChanges } from '@angular/core';
import { IDaily } from '@core/constants/interfaces/forecast';

@Component({
  selector: 'app-forecast-viewer',
  templateUrl: './forecast-viewer.component.html',
  styleUrls: ['./forecast-viewer.component.scss']
})
export class ForecastViewerComponent implements OnInit,OnChanges {
@Input() public dayForecast:IDaily
@Input() public icon:string
  constructor() { }

  ngOnInit() {
    
  }
  ngOnChanges(){
    console.log(this.icon);

  }
  
  public convertToCelcius(temp){
    return temp - 273.15
  }

}
