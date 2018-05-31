import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BbddJuegosProvider } from '../../providers/bbdd-juegos/bbdd-juegos';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public backgroundImage = 'assets/imgs/bg.png';

  private user = { nombre: null, pass: null };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public bbddJuegos: BbddJuegosProvider,
    public config: ConfiguracionProvider
  ) {
  }

  ionViewDidLoad() {
  }

  login() {
    this.bbddJuegos.login(this.user.nombre, this.user.pass).subscribe(login => {
      let alert;
      if (login.length > 0) {
        const ID = login[0].ID;
        alert = this.alertCtrl.create({
          title: '¡Sesión iniciada!',
          subTitle: `Has iniciado sesión como ${login[0].nombre}`,
          cssClass: 'alerta',
          buttons: ['Cerrar']
        });
        alert.present().then((x) => {
          this.config.guardarUsuario(login[0]);
          this.navCtrl.setRoot(PerfilPage, { ID });
        });
      } else {
        alert = this.alertCtrl.create({
          title: '¡Error!',
          subTitle: `Usuario o contraseña incorrectos`,
          cssClass: 'alerta',          
          buttons: ['Cerrar']
        }).present();
      }
    });
  }

  validar() {
    let res;
    (this.user.nombre !== null && this.user.nombre.length > 3) && (this.user.pass !== null && this.user.pass.length > 3) ? res = true : res = false;
    return res;
  }
}
