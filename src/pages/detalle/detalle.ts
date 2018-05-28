import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  juego: Juego;
  positivo: number = 0;
  negativo: number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, public bbddJuegos: BbddJuegosProvider, public setting: ConfiguracionProvider) {
    this.id = navParams.get('ID');
    bbddJuegos.cargaJuego(this.id).subscribe(resultado => { this.juego = resultado[0]; console.log(this.juego); });
    bbddJuegos.recogerVotos(this.id).subscribe((res) => {
      for (const punt of res) {
        Number(punt.puntuacion) > 0 ? this.positivo++ : this.negativo++;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePage');
  }

  votar(voto) {
    if (this.setting.getUsuario() !== null) {
      console.log('click');
      this.bbddJuegos.votar(this.id, voto).subscribe();
    }
  }
}
