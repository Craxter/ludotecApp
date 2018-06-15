import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JuegosPage } from './juegos';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    JuegosPage
  ],
  imports: [
    IonicPageModule.forChild(JuegosPage),
    DirectivesModule
  ],
})
export class JuegosPageModule {}
