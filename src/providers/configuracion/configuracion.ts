import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/Rx';
import { Usuario } from '../../models/usuario';
import { Observable } from 'rxjs/observable';

const STORAGE_TEMA = 'selected-theme';
const STORAGE_USER = 'user'
@Injectable()
export class ConfiguracionProvider {

  private tema: BehaviorSubject<String>;
  private user: BehaviorSubject<Usuario>;
  private votos;

  constructor(public http: HttpClient, public storage: Storage) {
    this.tema = new BehaviorSubject('light-theme');
    this.user = new BehaviorSubject(null);
    this.recogerTema().then((res) => {
      if (res !== null) {
        this.cambiarTema(res);
      }
    });
    this.recogerUsuario().then((data) => { this.cambiarUsuario(data) });
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
    this.storage.set(STORAGE_USER, user).then((res) => {
      this.cambiarUsuario(res);
      this.recogerUsuario();
    });
  }

  recogerUsuario() {
    return this.storage.get(STORAGE_USER).then((res) => { return res; })
  }

  cambiarUsuario(user) {
    this.user.next(user);
  }

  getUsuario() {
    return this.user.asObservable();
  }

  getVotos() {
    return this.votos;
  }
}