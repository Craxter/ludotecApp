import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Juego } from "../../models/juego";
import { BbddJuegosProvider } from "../../providers/bbdd-juegos/bbdd-juegos";
import { DetallePage } from '../detalle/detalle';

@IonicPage()
@Component({
  selector: 'page-juegos',
  templateUrl: 'juegos.html',
})
export class JuegosPage {

  juegos: Juego[];
  juegosOriginales: Juego[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public bbddJuegos: BbddJuegosProvider) {
    bbddJuegos.cargaJuegos().subscribe(juegos => {
      this.juegos = juegos;
      this.juegosOriginales = juegos;
    });
  }

  verDetalles(ID: string) {
    this.navCtrl.push(DetallePage, { ID });
  }

  buscar(searchEvent) {
    let busqueda: String = searchEvent.target.value;
    if (busqueda.trim() === '') {
      this.juegos = this.juegosOriginales;
    } else {
      this.bbddJuegos.buscaJuegos(busqueda).subscribe(res => this.juegos = res);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegosPage');
  }

}
