import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { AlertaService } from 'src/app/common/service/alerta.service';
import { AutenticadorService } from 'src/app/common/service/autenticador.service';
import { Usuario } from '../shared/models/usuario';
import { UsuarioService } from '../shared/services/usuario.service';

@Component({
  selector: 'app-usuario-atualizar-senha',
  templateUrl: './usuario-atualizar-senha.component.html',
  styleUrls: ['./usuario-atualizar-senha.component.scss'],
})
export class UsuarioAtualizarSenhaComponent implements OnInit {

  formulario : FormGroup;  

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertaService,
    private usuarioService: UsuarioService,
    private navController: NavController
  ) { }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({      
      senha: [null,Validators.required], 
      confirmarSenha: [null, Validators.required],       
    });
  }

  public get senha() {return this.formulario.get('senha')}
  public get confirmarSenha() {return this.formulario.get('confirmarSenha')}

  ngOnInit() {
    console.info("ngOnInit - usuario-atualizar-senha");   
    this.montarCamposTela();
  }

  private validarSenha(): Boolean{
    if (this.formulario.get("senha").value == this.formulario.get("confirmarSenha").value){
      return true;
    }else{
      return false;
    }
  }

  async onSubmit(): Promise<void>{
    try { 
      if (this.validarSenha()){        
        const usuarioLogado: Usuario = AutenticadorService.UsuarioLogado;              
        let resultado = await this.usuarioService.atualizarSenha(usuarioLogado[0].id,this.formulario.value);
        if (resultado.success){
          this.navController.navigateRoot('/principal');          
          this.alertService.toast('Senha atualizada com sucesso!');          
        }       
      }else{
        this.alertService.alert('Campos Diferentes','O campo senha e confirmar senha estão diferentes');
      }
    } catch (error) {
        console.log('Erro ao atualizar a senha', error);    
    }
  } 
  
  ngOnDestroy(){         
    console.info("ngOnDestroy - usuario-atualizar-senha");
  }

}
