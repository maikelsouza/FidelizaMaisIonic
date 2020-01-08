import { AlertaService } from './../../common/service/alerta.service';
import { UsuarioService } from './../shared/services/usuario.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/models/usuario';

@Component({
  selector: 'app-usuario-meu-perfil',
  templateUrl: './usuario-meu-perfil.component.html',
  styleUrls: ['./usuario-meu-perfil.component.scss'],
})
export class UsuarioMeuPerfilComponent implements OnInit {

  private formulario : FormGroup;  
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertService: AlertaService) { }

  ngOnInit() {
    this.montarCamposTela();
  }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      id : [null], senha: [null], confirmarSenha: [null]
    });
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
        let usuario : Usuario = new Usuario();
        usuario.senha = this.formulario.get("senha").value;
        console.log(this.formulario.get("id").value);
        let resultado = await this.usuarioService.atualizar(this.formulario.get("id").value,usuario);  
        if (resultado.success){
          this.alertService.toast('Senha atualizada com sucesso!');
        }
      }else{
        this.alertService.toast('O campo senha e confirmar senha estão diferentes');
      }
    } catch (error) {
        console.log('Erro ao atualizar a senha', error);    
    }
  }   
}
