//import { LoadingController } from '@ionic-angular';
import { Injectable } from '@angular/core';
import { LoadingController} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinner: HTMLIonLoadingElement = null; 
   

  constructor(public loading: LoadingController
    ) { }
  

  async show() {
  /*   if (this.spinner == null){
      this.spinner = await this.loading.create({
        message: 'Carregando...'
       // duration: 1000
      });
      await this.spinner.present();
    }     */
  }

  async hide()  {
   /*  if (this.spinner != null){
      await this.spinner.dismiss();
      this.spinner = null;
    } */
  }

}

  //async  Show(message: string): {
   // const loading = await this.loading.create();

    /*if (this.spinner == null) {
      { content: (message || 'Carregando...') }
      this.spinner = this.loading.create({ content: (message || 'Carregando...') });
      this.spinner.present();
    }
    else {
      this.spinner.data.content = message;
    }
  }*/

  
 



