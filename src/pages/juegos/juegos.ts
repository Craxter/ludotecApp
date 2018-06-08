import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';

import { Juego } from "../../models/juego";
import { BbddJuegosProvider } from "../../providers/bbdd-juegos/bbdd-juegos";
import { DetallePage } from '../detalle/detalle';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-juegos',
  templateUrl: 'juegos.html',
})
export class JuegosPage {

  juegos: Juego[];
  juegosOriginales: Juego[];
  idsJuegosUsuario: number[];
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public loading: LoadingController,
    public navParams: NavParams,
    public bbddJuegos: BbddJuegosProvider,
    public config: ConfiguracionProvider,
    public toast: ToastProvider
  ) {
    this.idsJuegosUsuario = [];
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'Cargando juegos',
    });
    loader.present().then(() => {
      this.config.getUsuario().subscribe((user) => {
        if (user !== null) {
          this.bbddJuegos.cargaJuegosUsuario(user.ID).subscribe((coleccion) => {
            for (const juego of coleccion) {
              this.idsJuegosUsuario.push(Number(juego.j_ID));
            }
          });
        }
        this.bbddJuegos.cargaJuegos().subscribe(juegos => {
          this.juegos = juegos;
          this.juegosOriginales = juegos;
          loader.dismiss();
        }, (error) => {
          this.toast.crearToast('Ha habido un error al cargar los juegos');
          loader.dismiss();
        });
      });
    });
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
      if (user !== null) {
        this.bbddJuegos.cargaJuegosUsuario(user.ID).subscribe((coleccion) => {
          for (const juego of coleccion) {
            this.idsJuegosUsuario.push(Number(juego.j_ID));
          }
        });
      }
      this.bbddJuegos.cargaJuegos().subscribe(juegos => {
        this.juegos = juegos;
        this.juegosOriginales = juegos;
        refresher.complete();
      }, (error) => {
        this.toast.crearToast('Ha habido un error al cargar los juegos');
        refresher.complete();
      });
    });
  }

  subir() {
    this.content.scrollToTop();
  }
}
