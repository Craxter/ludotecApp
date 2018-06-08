import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JuegosPage } from './juegos';
import { HideFabTopDirective } from '../../directives/hide-fab-top/hide-fab-top';

@NgModule({
  declarations: [
    JuegosPage,
    HideFabTopDirective
  ],
  imports: [
    IonicPageModule.forChild(JuegosPage),
  ],
})
export class JuegosPageModule {}
