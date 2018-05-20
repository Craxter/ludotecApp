import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { JuegosPage } from '../juegos/juegos';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) { }

  verJuegos() {
    this.navCtrl.setRoot(JuegosPage, {}, { animate: true, duration: 250 });
  }
}
