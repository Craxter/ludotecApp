import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PerfilPage } from "../perfil/perfil";

import { Usuario } from "../../models/usuario";

import { BbddJuegosProvider } from "../../providers/bbdd-juegos/bbdd-juegos";
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  usuarios: Usuario[];
  usuariosOriginales: Usuario[];
  user: Usuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bbddJuegos: BbddJuegosProvider,
    public config: ConfiguracionProvider
  ) {
    config.getUsuario().subscribe((user) => {
      this.user = user;
      bbddJuegos.cargaUsuarios().subscribe(usuarios => {
        this.usuarios = usuarios;
        this.usuariosOriginales = usuarios;
      });
    });
  }

  perfilUsuario(ID: String) {
    this.navCtrl.push(PerfilPage, { ID });
  }

  buscar(searchEvent) {
    let busqueda: String = searchEvent.target.value;
    if (busqueda === undefined || busqueda.trim() === '') {
      this.usuarios = this.usuariosOriginales;
    } else {
      this.bbddJuegos.buscaUsuarios(busqueda).subscribe(res => this.usuarios = res);
    }
  }
}
