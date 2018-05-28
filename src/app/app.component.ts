import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { JuegosPage } from '../pages/juegos/juegos';
import { UsuariosPage } from '../pages/usuarios/usuarios';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { ConfiguracionProvider } from '../providers/configuracion/configuracion';
import { Usuario } from '../models/usuario';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  selectedTheme: String;

  pages: Array<{ title: string, component: any }>;
  user: Usuario;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public setting: ConfiguracionProvider
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Juegos', component: JuegosPage },
      { title: 'Usuarios', component: UsuariosPage },
      { title: 'Ajustes', component: AjustesPage }
    ];

    this.setting.seleccionarTema().subscribe((data) => this.selectedTheme = data);
    setting.recogerUsuario().then((data) => { this.user = data });
    console.log(this.user);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  inicioSesion() {
    this.menu.close();
    this.nav.push(LoginPage, {}, { animate: true, duration: 500 });
  }

  verPerfil() {
    const ID = this.user.ID;
    this.menu.close();
    this.nav.setRoot(PerfilPage, { ID });
  }
}
