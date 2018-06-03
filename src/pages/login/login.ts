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

  validado: boolean = false;

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
          buttons: ['Cerrar']
        }).present();
      }
    });
  }

  signup() {
    this.bbddJuegos.comprobarUsuario(this.user.nombre).subscribe(res => {
      let alert;
      console.log(res);
      if (res.length === 0) {
        this.bbddJuegos.signup(this.user.nombre, this.user.pass).subscribe((login) => {
          alert = this.alertCtrl.create({
            title: '¡Bienvenido a bordo!',
            subTitle: `Usuario registrado con éxito`,
            buttons: ['Cerrar']
          }).present().then((x) => {
            this.bbddJuegos.login(this.user.nombre, this.user.pass).subscribe(login => {
              const ID = login[0].ID;
              this.config.guardarUsuario(login[0]);
              this.navCtrl.setRoot(PerfilPage, { ID });
            });
          });
        });
      } else {
        alert = this.alertCtrl.create({
          title: '¡Error!',
          subTitle: `El usuario ya existe, prueba con otro nombre`,
          buttons: ['Cerrar']
        }).present();
      }
    });
  }

  validar() {
    this.validado = (this.user.nombre !== null && this.user.nombre.length > 3) && (this.user.pass !== null && this.user.pass.length > 3);
  }
}
