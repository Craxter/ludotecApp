import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Usuario } from '../../models/usuario';
import { Juego } from '../../models/juego';

import { BbddJuegosProvider } from '../../providers/bbdd-juegos/bbdd-juegos';

import { DetallePage } from '../detalle/detalle';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  id: String;
  usuario: Usuario;
  coleccion: Juego[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public bbddJuegos: BbddJuegosProvider) {
    this.id = navParams.get('ID');
    bbddJuegos.cargaUsuario(this.id).subscribe(resultado => this.usuario = resultado[0]);
    bbddJuegos.cargaJuegosUsuario(this.id).subscribe(resultado => this.coleccion = resultado);
  }
  
  verDetalles(ID: String) {
    this.navCtrl.push(DetallePage, { ID });
  }
}
