import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';

import { JuegosPageModule } from '../pages/juegos/juegos.module';
import { DetallePageModule } from '../pages/detalle/detalle.module';
import { AjustesPageModule } from '../pages/ajustes/ajustes.module';
import { LoginPageModule } from '../pages/login/login.module';
import { UsuariosPageModule } from '../pages/usuarios/usuarios.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BbddJuegosProvider } from '../providers/bbdd-juegos/bbdd-juegos';
import { ConfiguracionProvider } from '../providers/configuracion/configuracion';
import { ToastProvider } from '../providers/toast/toast';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    JuegosPageModule,
    DetallePageModule,
    AjustesPageModule,
    LoginPageModule,
    UsuariosPageModule,
    PerfilPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BbddJuegosProvider,
    ConfiguracionProvider,
    ToastProvider
  ]
})
export class AppModule { }
