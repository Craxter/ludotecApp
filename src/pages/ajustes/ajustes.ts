import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';
import { ToastProvider } from '../../providers/toast/toast';
import { Usuario } from '../../models/usuario';
import { BbddJuegosProvider } from '../../providers/bbdd-juegos/bbdd-juegos';

@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  tema: String;
  user: Usuario = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastProvider,
    public setting: ConfiguracionProvider,
    public bbddJuegos: BbddJuegosProvider,
    public alertCtrl: AlertController
  ) {
    this.setting.seleccionarTema().subscribe((res) => { this.tema = res; });
    this.recogerModo();
    this.setting.getUsuario().subscribe((user) => { this.user = user; });
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

  cambiarPass() {
    this.alertCtrl.create({
      title: 'Cambiar contraseña',
      subTitle: `¿Está seguro que desea cambiar la contraseña?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => { } },
        {
          text: 'Aceptar',
          handler: () => {
            this.alertCtrl.create({
              title: 'Cambiar contraseña',
              inputs: [{
                name: 'pass',
                placeholder: 'Escriba su nueva contraseña',
                type: 'password'
              }],
              buttons: [
                { text: 'Cancelar', role: 'cancel', handler: data => { } },
                {
                  text: 'Guardar',
                  handler: data => {
                    this.bbddJuegos.cambiarPass(data.pass).subscribe((res) => {
                      this.toast.crearToast('Contraseña guardada con éxito');
                    }, (error) => {
                      this.toast.crearToast('Error al guardar la contraseña');
                    });
                  }
                }
              ]
            }).present();
          }
        }
      ]
    }).present();
  }
}
