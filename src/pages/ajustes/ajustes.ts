import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';

/**
 * Generated class for the AjustesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  nocturno: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public setting: SettingsProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjustesPage');
  }

  cambiarModo() {
    if (!this.nocturno) {
      this.setting.cambiarTema('dark-theme');
      this.nocturno = true;
    } else {
      this.setting.cambiarTema('light-theme');
      this.nocturno = false;
    }
    this.setting.seleccionarTema().then((data) => console.log(data));
  }
}
