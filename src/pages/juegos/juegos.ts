import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Juego } from "../../models/juego";
import { BbddJuegosProvider } from "../../providers/bbdd-juegos/bbdd-juegos";
import { DetallePage } from '../detalle/detalle';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';

@IonicPage()
@Component({
  selector: 'page-juegos',
  templateUrl: 'juegos.html',
})
export class JuegosPage {

  juegos: Juego[];
  juegosOriginales: Juego[];
  idsJuegosUsuario: number[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bbddJuegos: BbddJuegosProvider,
    public config: ConfiguracionProvider
  ) {
    this.idsJuegosUsuario = [];
    config.getUsuario().subscribe((user) => {
      bbddJuegos.cargaJuegosUsuario(user.ID).subscribe((coleccion) => {
        for (const juego of coleccion) {
          this.idsJuegosUsuario.push(Number(juego.j_ID));
        }
        bbddJuegos.cargaJuegos().subscribe(juegos => {
          this.juegos = juegos;
          this.juegosOriginales = juegos;
        });
      })
    })
  }

  verDetalles(ID: string) {
    this.navCtrl.push(DetallePage, { ID });
  }

  buscar(searchEvent) {
    let busqueda: String = searchEvent.target.value;
    if (busqueda === undefined || busqueda.trim() === '') {
      this.juegos = this.juegosOriginales;
    } else {
      this.bbddJuegos.buscaJuegos(busqueda).subscribe(res => this.juegos = res);
    }
  }

  actualizar(refresher) {
    this.config.getUsuario().subscribe((user) => {
      this.bbddJuegos.cargaJuegosUsuario(user.ID).subscribe((coleccion) => {
        for (const juego of coleccion) {
          this.idsJuegosUsuario.push(Number(juego.j_ID));
        }
        this.bbddJuegos.cargaJuegos().subscribe(juegos => {
          this.juegos = juegos;
          this.juegosOriginales = juegos;
          refresher.complete();
        });
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegosPage');
  }

}
