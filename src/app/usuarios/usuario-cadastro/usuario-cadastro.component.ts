import { AlertaService } from './../../common/service/alerta.service';
import { UsuarioService } from './../shared/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
export class UsuarioCadastroComponent implements OnInit {

  private formulario : FormGroup;  
  private tipoUsuario : string;
  inscricao: Subscription;
  

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertService: AlertaService,
    private route: ActivatedRoute
    
  ) { }

  private montarCamposTela() {
    this.formulario = this.formBuilder.group({
      id : [null], 
      nome: [null, Validators.required], ativo: [true], 
      cpf: [null], email: [null, [Validators.required, Validators.email]],
      sexo: [null, Validators.required],
      dataNascimento: [null], 
      senha: [null,Validators.required], 
      confirmarSenha: [null, Validators.required], 
      grupoUsuarioId: [null]
    });
  }

  public get nome() {return this.formulario.get('nome')}
  public get email() {return this.formulario.get('email')}
  public get sexo() {return this.formulario.get('sexo')}
  public get senha() {return this.formulario.get('senha')}
  public get confirmarSenha() {return this.formulario.get('confirmarSenha')}

  private validarSenha(): Boolean{
    if (this.formulario.get("senha").value == this.formulario.get("confirmarSenha").value){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit() {
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.tipoUsuario = queryParams['tipoUsuario'];
      }
    ); 
    this.montarCamposTela();
  }

  async onSubmit(): Promise<void>{
    try { 
      if (this.validarSenha()){
        this.formulario.value.grupoUsuarioId = this.tipoUsuario;
        let resultado = await this.usuarioService.salvar(this.formulario.value);  
        if (resultado.success){
          this.alertService.toast('Usuário salvo com sucesso!');
        }
      }else{
        this.alertService.alert('Campos Diferentes','O campo senha e confirmar senha estão diferentes');
      }
    } catch (error) {
        console.log('Erro ao salvar um Usuario', error);    
    }
  }   

}
