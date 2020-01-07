//import { LoadingController } from '@ionic-angular';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  //private spinner: Loadin = null;

  constructor(//public loading: LoadingController
    ) { 

  }
/*
  Show(message: string): void {
    if (this.spinner == null) {
      this.spinner = this.loading.create({ content: (message || 'Carregando...') });
      this.spinner.present();
    }
    else {
      this.spinner.data.content = message;
    }
  }
*/
  /*
  Hide(): void {
    if (this.spinner != null) {
      this.spinner.dismiss();
      this.spinner = null;
    }
  }
*/

}
