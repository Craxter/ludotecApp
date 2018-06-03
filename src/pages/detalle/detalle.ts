import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Juego } from '../../models/juego';
import { BbddJuegosProvider } from '../../providers/bbdd-juegos/bbdd-juegos';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';

/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  id: string;
  idUser: string;
  propietario: boolean;
  juego: Juego;
  positivo: number = 0;
  negativo: number = 0;
  voto: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bbddJuegos: BbddJuegosProvider,
    public setting: ConfiguracionProvider,
    public toastCtrl: ToastController
  ) {
    this.id = navParams.get('ID');
    this.propietario = false;
    bbddJuegos.cargaJuego(this.id).subscribe(resultado => { this.juego = resultado[0] });
    bbddJuegos.recogerVotos(this.id).subscribe((res) => {
      for (const punt of res) {
        if (Number(punt.puntuacion) > 0) { this.positivo++ }
        if (Number(punt.puntuacion) < 0) { this.negativo++ }
      }
    });
    this.setting.getUsuario().subscribe((res) => {
      if (res !== null) {
        this.idUser = res.ID
        bbddJuegos.cargaJuegosUsuario(res.ID).subscribe((juegos) => {
          for (const juego of juegos) {
            if (juego.j_ID === this.id) {
              this.propietario = true;
              break;
            }
          }
        });
      } else {
        this.idUser = null
      }
    });
    if (this.idUser !== null) {
      bbddJuegos.votosUsuario(this.idUser).subscribe((res) => {
        for (const puntuacion of res) {
          if (puntuacion.IDJuego === this.id) {
            this.voto = puntuacion.puntuacion;
            break;
          }
        }
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePage');
  }

  votar(voto) {
    if (this.idUser !== null) {
      if (this.voto !== voto) {
        voto > 0 ? this.positivo++ : this.negativo++;
        if (this.voto !== 0) {
          this.voto > 0 ? this.positivo-- : this.negativo--;
        }
        this.voto = voto;
      } else {
        voto > 0 ? this.positivo-- : this.negativo--;
        this.voto = 0;
      }
      this.bbddJuegos.votar(this.id, this.voto).subscribe((res) => {
        this.toastCtrl.create({
          message: 'Valoración enviada correctamente',
          duration: 3000
        }).present();
      });
    }
  }

  agregarJuego() {
    console.log('entra');
    if (!this.propietario) {
      console.log('guarda');
      this.bbddJuegos.guardarJuegoColeccion(this.id).subscribe((res) => this.propietario = true);
    } else {
      console.log('borra');
      this.bbddJuegos.borrarJuegoColeccion(this.id).subscribe((res) => this.propietario = false);
    }
  }
}