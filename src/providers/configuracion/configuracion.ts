import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/Rx';

const STORAGE_TEMA = 'selected-theme';
const STORAGE_USER = 'userId'
@Injectable()
export class ConfiguracionProvider {

  private tema: BehaviorSubject<String>;

  constructor(public http: HttpClient, public storage: Storage) {
    this.tema = new BehaviorSubject('light-theme');
    this.storage.get(STORAGE_TEMA).then((res) => {
      if (res !== null) {
        this.cambiarTema(res);
      }
    });
  }

  cambiarTema(valor) {
    this.tema.next(valor);
    this.guardarTema(valor);
  }

  seleccionarTema() {
    return this.tema.asObservable();
  }

  guardarTema(valor) {
    this.storage.set(STORAGE_TEMA, valor).then((res) => this.recogerTema());
  }

  recogerTema() {
    this.storage.get(STORAGE_TEMA).then((res) => { console.log(res) })
  }

  recogerUsuario() {
    return this.storage.get(STORAGE_USER);
  }
}
//resto de métodos