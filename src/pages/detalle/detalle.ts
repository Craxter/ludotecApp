import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Juego } from '../../models/juego';
import { BbddJuegosProvider } from '../../providers/bbdd-juegos/bbdd-juegos';
import { ConfiguracionProvider } from '../../providers/configuracion/configuracion';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  id: string;
  juego: Juego;
  idUser: string;
  propietario: boolean;
  positivo: number = 0;
  negativo: number = 0;
  voto: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bbddJuegos: BbddJuegosProvider,
    public setting: ConfiguracionProvider,
    public toast: ToastProvider,
    public loading: LoadingController
  ) {
    this.id = navParams.get('ID');
    this.propietario = false;
    this.idUser = null;

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
        bbddJuegos.votosUsuario(this.idUser).subscribe((res) => {
          for (const puntuacion of res) {
            if (puntuacion.IDJuego === this.id) {
              this.voto = puntuacion.puntuacion;
              break;
            }
          }
        });
      }
    });
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'Cargando detalles del juego',
    });
    loader.present().then(() => {
      this.bbddJuegos.cargaJuego(this.id).subscribe((res) => {
        this.juego = res[0]
        loader.dismiss();
      }, (error) => {
        loader.dismiss();
      });
    });
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
        this.toast.crearToast('Valoración enviada correctamente');
      }, (error) => {
        this.toast.crearToast("Ha habido un problema al guardar la votacion");
      });
    }
  }

  agregarJuego() {
    console.log('entra');
    if (!this.propietario) {
      console.log('guarda');
      this.bbddJuegos.guardarJuegoColeccion(this.id).subscribe((res) => {
        this.propietario = true;
        this.toast.crearToast('Juego añadido a la colección');
      }, (error) => {
        this.toast.crearToast('Error al añadir a la colección');
      });
    } else {
      console.log('borra');
      this.bbddJuegos.borrarJuegoColeccion(this.id).subscribe((res) => {
        this.propietario = false
        this.toast.crearToast('Juego eliminado de la colección');
      }, (error) => {
        this.toast.crearToast('Error al eliminar de la colección');
      });
    }
  }
}