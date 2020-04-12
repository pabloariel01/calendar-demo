import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { HomesState } from '@home/store/calendar/home.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([]),
    NgxsStoragePluginModule.forRoot({key:HomesState}),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ]
})
export class CoreModule {}
