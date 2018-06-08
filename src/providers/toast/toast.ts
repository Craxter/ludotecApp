import { Injectable } from '@angular/core';
import { ToastController, Toast } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  toast: Toast;

  constructor(public toastCtrl: ToastController) { }

  crearToast(text: string): void {
    let toastData = {
      message: text,
      duration: 3000,
      position: 'bottom'
    }
    this.mostrarToast(toastData);
  }

  private mostrarToast(toast: any): void {
    this.toast ? this.toast.dismiss() : false;
    this.toast = this.toastCtrl.create(toast);
    this.toast.present();
  }
}
