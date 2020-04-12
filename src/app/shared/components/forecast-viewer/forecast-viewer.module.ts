import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastViewerComponent } from './forecast-viewer.component';



@NgModule({
  declarations: [ForecastViewerComponent],
  imports: [
    CommonModule
  ],exports:[ForecastViewerComponent]
})
export class ForecastViewerModule { }
