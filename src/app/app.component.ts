import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';

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
  pages: Array<{ title: string, component: any, icon: string }>;
  user: Usuario = null;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public setting: ConfiguracionProvider,
    public alertCtrl: AlertController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Juegos', component: JuegosPage, icon: 'clipboard' },
      { title: 'Usuarios', component: UsuariosPage, icon: 'people' },
      { title: 'Ajustes', component: AjustesPage, icon: 'settings' }
    ];

    this.setting.seleccionarTema().subscribe((data) => this.selectedTheme = data);
    this.setting.getUsuario().subscribe((data) => this.user = data);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.hideSplashScreen();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  inicioSesion() {
    console.log(this.user, this.setting.getUsuario());
    this.menu.close();
    this.nav.push(LoginPage, {}, { animate: true, duration: 500 });
  }

  verPerfil() {
    const ID = this.user.ID;
    this.menu.close();
    this.nav.setRoot(PerfilPage, { ID });
  }

  logout() {
    this.alertCtrl.create({
      title: 'Cerrar sesión',
      subTitle: `¿Está seguro que desea cerrar la sesión?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operacion cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.menu.close();
            this.setting.guardarUsuario(null);
            this.nav.setRoot(HelloIonicPage);
          }
        }
      ]
    }).present();
  }

  hideSplashScreen() {
    if (this.splashScreen) {
     setTimeout(() => {
       this.splashScreen.hide();
     }, 100);
    }
   }   
}
