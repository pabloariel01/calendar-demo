import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forRoot([]), NgxsReduxDevtoolsPluginModule.forRoot()]
})
export class CoreModule {}
