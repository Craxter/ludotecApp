import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BbddJuegosProvider } from '../../providers/bbdd-juegos/bbdd-juegos';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';

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
      console.log(login);
      const alert = this.alertCtrl.create({
        title: '¡Sesión iniciada!',
        subTitle: `${login.ID}: ${login.nombre}`,
        buttons: ['Cerrar']
      });
      alert.present();
    });
  }

  validar() {
    let res;
    if(this.user.nombre !== null)
    console.log(this.user.nombre.length);
    
    (this.user.nombre !== null && this.user.nombre.length > 3) && (this.user.pass !== null && this.user.pass.length > 3) ? res = true : res = false;
    return res;
  }
}
