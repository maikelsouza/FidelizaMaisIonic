import { Injectable} from '@angular/core';
import { LoadingController} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  

  constructor(
    public loading: LoadingController  
  ) { }
  

  async show(msg? : string) {
    const carregando = await this.loading.create({
      message: msg || 'Carregando...'
    });
    return await carregando.present();
  }

  async hide()  {
     return await this.loading.dismiss();
 }

 
}

  
  
 



