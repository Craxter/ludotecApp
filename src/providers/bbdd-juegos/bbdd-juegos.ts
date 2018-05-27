import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Juego } from '../../models/juego';
import { Usuario } from "../../models/usuario";

/*
  Generated class for the BbddJuegosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BbddJuegosProvider {

  origen = 'http://217.217.176.17:3000/api';

  constructor(public http: HttpClient) {
    console.log('Hello BbddJuegosProvider Provider');
  }

  cargaJuegos(): Observable<Juego[]> {
    return this.http.get(`${this.origen}/juegos?_size=99`) as Observable<Juego[]>;
  }
  cargaJuego(id: String): Observable<Juego[]> {
    return this.http.get(`${this.origen}/juegos/${id}`) as Observable<Juego[]>;
  }

  buscaJuegos(campo: String): Observable<Juego[]> {
    return this.http.get(`${this.origen}/juegos?_where=(nombre,like,${campo}~)`) as Observable<Juego[]>;
  }
  cargaUsuarios(): Observable<Usuario[]> {
    return this.http.get(`${this.origen}/propietarios?_size=99`) as Observable<Usuario[]>;
  }

  cargaUsuario(id: String): Observable<Usuario[]> {
    return this.http.get(`${this.origen}/propietarios/${id}`) as Observable<Usuario[]>;
  }

  cargaJuegosUsuario(id: String): Observable<Juego[]>{
    return this.http.get(`${this.origen}/xjoin?_join=j.juegos,_j,pj.propietariosjuegos&_on1=(j.ID,eq,pj.IDJuego)&_fields=j.ID,j.nombre,j.img&_size=99&_where=(IDPropietario,eq,${id})`) as Observable<Juego[]>;
  }

  buscaUsuarios(campo: String): Observable<Usuario[]> {
    return this.http.get(`${this.origen}/propietarios/findOne?_where=(nombre,like,${campo}%)`) as Observable<Usuario[]>;
  }
}
