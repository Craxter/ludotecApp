import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
    public config: ConfiguracionProvider,
    public loading: LoadingController
  ) {
    this.user = null;
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

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'Cargando usuarios',
    });

    loader.present().then(() => {
      this.config.getUsuario().subscribe((user) => {
        if(user!==null){
          this.user = user;
        }
        this.bbddJuegos.cargaUsuarios().subscribe(usuarios => {
          this.usuarios = usuarios;
          this.usuariosOriginales = usuarios;
          loader.dismiss();
        });
      });
    });
  }
}
