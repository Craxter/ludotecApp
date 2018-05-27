import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { JuegosPage } from '../juegos/juegos';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) { }

  verJuegos() {
    this.navCtrl.setRoot(JuegosPage, {}, { animate: true, duration: 250 });
  }

  inicioSesion(){
    this.navCtrl.push(LoginPage, {}, {animate: true, duration: 500});
  }
}
