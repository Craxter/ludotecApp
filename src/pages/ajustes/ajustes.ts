import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast } from 'ionic-angular';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';

@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  tema: String;
  toast: Toast;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public setting: ConfiguracionProvider
  ) {
    this.setting.seleccionarTema().subscribe((res) => this.tema = res);
    this.recogerModo();
  }

  cambiarModo() {
    if (this.tema === 'light-theme') {
      this.setting.cambiarTema('dark-theme');
    } else {
      this.setting.cambiarTema('light-theme');
    }
    this.toast.present();
  }

  recogerModo() {
    this.setting.seleccionarTema().subscribe((res) => {
      let mensaje = 'Modo nocturno';
      res === 'dark-theme' ? mensaje += ' activado' : mensaje += ' desactivado';
      this.toast = this.toastCtrl.create({
        message: mensaje,
        duration: 3000
      });
    });
  }
}
