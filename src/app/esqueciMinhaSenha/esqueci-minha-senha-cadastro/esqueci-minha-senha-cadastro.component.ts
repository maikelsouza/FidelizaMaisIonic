import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/usuarios/shared/services/usuario.service';
import { AlertaService } from 'src/app/common/service/alerta.service';
//const md5 = require('md5');

@Component({
  selector: 'app-esqueci-minha-senha-cadastro',
  templateUrl: './esqueci-minha-senha-cadastro.component.html',
  styleUrls: ['./esqueci-minha-senha-cadastro.component.scss'],
})
export class EsqueciMinhaSenhaCadastroComponent implements OnInit {

  private formulario : FormGroup;  
  
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertSrv: AlertaService,
  ) { }

  ngOnInit() {
    this.montarCamposTela();
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      email: [null,[Validators.required, Validators.email]]
    });
  }
  
  async onSubmit(): Promise<void>{
    try {       
      const email = this.formulario.get("email").value;
      const usuarioResultado = await this.usuarioService.buscarPorEmail(email);
      
      if (usuarioResultado.success){
        if (usuarioResultado.data == null){
          this.alertSrv.alert('Email não cadastrado!',`O email: ${email} não foi encontrado no sistema.`);        
        }else{
          usuarioResultado.data.senha = this.gerarNovaSenha();          
          this.usuarioService.atualizar(usuarioResultado.data.id,usuarioResultado.data);
          // IMPLEMENTAR ENVIO DE EMAIL
          this.alertSrv.toast('Você recebera um e-mail com a nova senha');        
        }
      }
    } catch (error) {
        console.log('Erro ao buscar um usuário por email', error);    
    }
  }   

  public get email() {return this.formulario.get('email')}
  
  private gerarNovaSenha() : string{        
    const novaSenhaStr = new String(Math.random());    
    return novaSenhaStr.substring(2,8);
  }
}
