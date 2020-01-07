import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor( private alertCtrl: AlertController,
               private toastCtrl: ToastController) { }

    
  async toast(title: string) {
    const toast = await this.toastCtrl.create({ message: title, position: 'bottom', duration: 3000 });
    return await toast.present();
  }
  
  async alert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: title,
      message: message,
      buttons: ['Ok']
    });
    return await alert.present();
  }

  async confirm(title: string, message: string, callback: any) {
    const confirm = await this.alertCtrl.create({
      header: 'Confirm!',
      subHeader: title,
      message: message,
      buttons: [
        { text: "Não", role: 'Cancel', handler: () => { console.log('Confirm:Say:No'); } },
        {
          text: "Sim",
          handler: () => {
            callback();
          }
        }
      ]
    });
    await confirm.present();
  } 
}
