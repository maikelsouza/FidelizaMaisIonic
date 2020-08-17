import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { UsuarioService } from './../../usuarios/shared/services/usuario.service';
import { LoginService } from './../shared/services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private formulario : FormGroup;  

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,        
    private navController: NavController,
    private route: Router
  ) { }
 
  ngOnInit() {
    this.montarCamposTela();   
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      login: [null, [Validators.required, Validators.email]], 
      senha: [null, Validators.required]
    });
  }

  
  public get login() {return this.formulario.get('login')}
  public get senha() {return this.formulario.get('senha')}
  

  async onSubmit(): Promise<void>{
    try {       
        let login = this.formulario.get("login").value;
        let senha = this.formulario.get("senha").value;
        let resultado = await this.loginService.autenticar(login,senha);          
        if (resultado.success){
          UsuarioService.RegistrarLogin(resultado.data);
          const clientes = 'CLIENTES';    
          if (resultado.data.usuario[0].GrupoUsuario.nome === clientes){            
            this.route.navigate(['/estabelecimento/lista'], { queryParams: { tipoUsuario: clientes } });          
          }else{
         //   this.route.navigate(['/principal']);          
            this.navController.navigateRoot('/principal'); 
          }
        }      
    } catch (error) {
        console.log('Erro ao logar um Usuário', error);    
    }
  }   


}
