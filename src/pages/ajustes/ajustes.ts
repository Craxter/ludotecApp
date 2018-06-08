import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  tema: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
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
  }
  
  recogerModo() {
    this.setting.seleccionarTema().subscribe((res) => {
      let mensaje = 'Modo nocturno';
      res === 'dark-theme' ? mensaje += ' activado' : mensaje += ' desactivado';
      this.toast.crearToast(mensaje);
    });
  }
}
