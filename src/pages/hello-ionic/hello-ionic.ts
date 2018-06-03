import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { JuegosPage } from '../juegos/juegos';
import { LoginPage } from '../login/login';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  private user;

  constructor(public navCtrl: NavController, public setting: ConfiguracionProvider) {
    this.setting.recogerUsuario().then((res) => this.user = res);
  }

  verJuegos() {
    this.navCtrl.setRoot(JuegosPage, {}, { animate: true, duration: 250 });
  }

  inicioSesion() {
    this.navCtrl.push(LoginPage, {}, { animate: true, duration: 500 });
  }
}
