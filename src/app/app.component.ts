import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LoginService } from './login/shared/services/login.service';
import { Usuario } from './usuarios/shared/models/usuario';
import { UsuarioService } from './usuarios/shared/services/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  mostrarMenu: boolean = false;
  usuarioLogado: Usuario;

  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    private navController: NavController
    
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logoff(){
    UsuarioService.RemoverLogin();
    this.navController.navigateRoot('/');      
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
