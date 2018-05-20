import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { JuegosPage } from '../pages/juegos/juegos';
import { DetallePage } from '../pages/detalle/detalle';
import { UsuariosPage } from "../pages/usuarios/usuarios";
import { PerfilPage } from '../pages/perfil/perfil';
import { AjustesPage } from '../pages/ajustes/ajustes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BbddJuegosProvider } from '../providers/bbdd-juegos/bbdd-juegos';
import { SettingsProvider } from '../providers/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    JuegosPage,
    DetallePage,
    UsuariosPage,
    PerfilPage,
    AjustesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    JuegosPage,
    DetallePage,
    UsuariosPage,
    PerfilPage,
    AjustesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BbddJuegosProvider,
    SettingsProvider
  ]
})
export class AppModule { }
