import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/Rx';
import { Usuario } from '../../models/usuario';

const STORAGE_TEMA = 'selected-theme';
const STORAGE_USER = 'user'
@Injectable()
export class ConfiguracionProvider {

  private tema: BehaviorSubject<String>;
  private user: Usuario;

  constructor(public http: HttpClient, public storage: Storage) {
    this.tema = new BehaviorSubject('light-theme');
    this.recogerTema().then((res) => {
      if (res !== null) {
        this.cambiarTema(res);
      }
    });
    this.recogerUsuario().then((data) => { this.user = data });
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

  recogerTema(): Promise<string> {
    return this.storage.get(STORAGE_TEMA).then((res) => { return res; })
  }

  guardarUsuario(user) {
    this.storage.set(STORAGE_USER, user).then((res) => this.recogerUsuario());
  }

  recogerUsuario() {
    return this.storage.get(STORAGE_USER).then((res) => { return res; })
  }

  getUsuario() {
    return this.user;
  }
}