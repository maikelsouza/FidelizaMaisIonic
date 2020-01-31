import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './login/shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  mostrarMenu: boolean = false;

  public appPages = [
    {
      title: 'Meu Perfil',
      url: '/usuarios/meuPerfil',
      icon: 'home'      
    },
    
    {
      title: 'Estabelecimento',
      url: '/estabelecimentos',
      icon: 'home'
    },
     {
      title: 'Usuário',
      url: '/usuarios',
      icon: 'home'     
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'home'     
    },
    {
      title: 'Cartão Fidelidade',
      url: '/cartaoFidelidade',
      icon: 'home'     
    },
    {
      title: 'Programa Fidelidade',
      url: '/programaFidelidade',
      icon: 'home'     
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(){
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );  
  }
}
