import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Juego } from '../../models/juego';
import { BbddJuegosProvider } from '../../providers/bbdd-juegos/bbdd-juegos';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public bbddJuegos: BbddJuegosProvider) {
    this.id = navParams.get('ID');
    bbddJuegos.cargaJuego(this.id).subscribe(resultado => {this.juego = resultado[0];console.log(this.juego);});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePage');
  }

}
