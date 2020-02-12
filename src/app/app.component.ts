import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './login/shared/services/login.service';
import { Usuario } from './usuarios/shared/models/usuario';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  mostrarMenu: boolean = false;
  usuarioLogado: Usuario;

  public appPages = [
    { // 0
      title: 'Meu Perfil',
      url: '/usuarios/meuPerfil',
      icon: 'home',
      exibir: 'true'
    },
    
    { // 1
      title: 'Estabelecimento',
      url: '/estabelecimentos',
      icon: 'home',
      exibir: 'true'      
    },

    { // 2
      title: 'Usuário',
      url: '/usuarios',
      icon: 'home',
      exibir: 'false'           
    },
   /* {
      title: 'Login',
      url: '/login',
      icon: 'home',
      exibir: 'false'     
    },*/

    { // 3
      title: 'Cartão Fidelidade',
      url: '/cartaoFidelidade',
      icon: 'home',
      exibir: 'false'     
    },

    { // 4
      title: 'Programa Fidelidade',
      url: '/programaFidelidade',
      icon: 'home',     
      exibir: 'false'     
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

    this.loginService.mostrarItemMenuEmitter.subscribe(
      usuario => this.usuarioLogado = usuario
    );     
    
  }


}
